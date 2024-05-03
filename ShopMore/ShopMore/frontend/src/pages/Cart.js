// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss";
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, ListGroup, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    // State variables for cart items, product details, user's address, and quantity errors
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [quantityErrors, setQuantityErrors] = useState({ itemID: null, message: '' });

    // Using react router navigation
    const navigate = useNavigate();

    // Get user ID from localStorage
    const userID = localStorage.getItem('userid');
    const authToken = 'Token b09782e294306013522c0610bbbe5e601e021b3b';

    // Fetch cart, product details, and user details on component mount
    useEffect(() => {
        fetchCart();
        fetchProducts();
        fetchUserDetails();
    }, []);

    // Debounce function to limit rapid API calls on cart quantity updates (to avoid "jumping" quantity numbers)
    const debounce = (fn, delay) => {
        let timeoutId;
        return function(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    // Update quantity in the cart and fetch updated cart
    const updateQuantity = async (itemID, quantity) => {
        await axios.get(`http://127.0.0.1:8000/cart/edit/${userID}/${itemID}/${quantity}/`, {
            headers: {
                Authorization: authToken
            }
        }).then(() => fetchCart());
    };

    // Create a debounced function for quantity update
    const debouncedUpdateQuantity = debounce(updateQuantity, 500);

    // Handle quantity changes including error handling for unavailable stock
    const handleQuantityChange = (itemID, quantity, availableQuantity) => {
        if (quantity > availableQuantity) {
            // Immediately show an error and revert the quantity after 3 seconds
            setQuantityErrors(errors => ({ ...errors, [itemID]: 'Quantity exceeds available stock' }));
            setTimeout(() => {
                setQuantityErrors(errors => {
                    const newErrors = { ...errors };
                    delete newErrors[itemID];
                    return newErrors;
                });
                // Revert the UI quantity
                setCartItems(currentItems =>
                    currentItems.map(item =>
                        item.itemID === itemID ? { ...item, quantity: item.quantity } : item
                    )
                );
            }, 3000);
        } else {
            setQuantityErrors(errors => {
                const newErrors = { ...errors };
                delete newErrors[itemID];
                return newErrors;
            });
            // Update the quantity in the local state and debounce the backend update
            setCartItems(currentItems =>
                currentItems.map(item =>
                    item.itemID === itemID ? { ...item, quantity: quantity } : item
                )
            );
            debouncedUpdateQuantity(itemID, quantity);
        }
    };

    // Fetch cart details from the server
    const fetchCart = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/cart/${userID}/`, {
            headers: {
                Authorization: authToken
            }
        });
        if (response.data && response.data.cart.length > 0) {
            setCartItems(Object.entries(response.data.cart[0].itemlist).map(([itemID, quantity]) => ({ itemID, quantity })));
        }
    };

    // Fetch all product details
    const fetchProducts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/product/', {
            headers: {
                Authorization: authToken
            }
        });
        setProducts(response.data.item);
    };

    // Fetch user details and update address state
    const fetchUserDetails = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/', {userID: userID}, {
            headers: {
                Authorization: authToken
            }
        });
        if (response.data.fields.length > 0) {
            setUserAddress(response.data.fields[0].address);
        }
    };

    // Calculate the total cost of items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((acc, cartItem) => {
            const product = products.find(p => p.itemID.toString() === cartItem.itemID);
            return acc + (product ? product.itemPrice * cartItem.quantity : 0);
        }, 0);
    };

    // Remove an item from the cart
    const removeItem = async (itemID) => {
        await axios.delete(`http://127.0.0.1:8000/cart/remove/${userID}/${itemID}/`, {
            headers: {
                Authorization: authToken
            }
        });
        fetchCart();
    };

    // Redirect user to the edit user info page
    const handleAddressChange = (e) => {
        const value = e.target.value;
        if (value === "edit-address") {
            navigate('/user');
        }
    };

    return (
        <Container>
            <Row>
                <h3 className="my-3">Shopping Cart</h3>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {cartItems.map((cartItem, index) => {
                            const product = products.find(p => p.itemID.toString() === cartItem.itemID);
                            if (!product) return null;
                            return (
                                <ListGroup.Item key={index}>
                                    <strong>{product.itemName}</strong> (${product.itemPrice})
                                    <p>{product.itemDescription}</p>
                                    <img height="100" src={"/photo/"+product.itemImage} alt={product.itemName} />
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Qty</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={cartItem.quantity}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value, 10);
                                                handleQuantityChange(cartItem.itemID, newQuantity, product.itemQuantity);
                                            }}
                                        />
                                        <Button variant="outline-danger" onClick={() => removeItem(cartItem.itemID)}>
                                            Remove
                                        </Button>
                                    </InputGroup>
                                    {quantityErrors[cartItem.itemID] && (
                                        <Alert variant="danger">{quantityErrors[cartItem.itemID]}</Alert>
                                    )}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
                <Col>
                    <Card className="mb-3">
                    <Card.Header>Summary</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between">
                            <div>Order Total</div>
                            <div>$ {calculateTotal()}</div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between">
                            <div>Discount</div>
                            <div>$ {0}</div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between">
                            <div>Delivery Fee</div>
                            <div>$ {50}</div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between">
                            <strong>Total Payment</strong>
                            <strong>$ {calculateTotal() + 50}</strong>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card className="mb-3">
                        <Card.Header>Delivery Schedule</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <div>Estimated delivery by 1-3 days.</div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Form>
                        <Form.Group className="mb-3" controlId="formAddressSelect">
                            <Form.Label>Select Address</Form.Label>
                            <Form.Select
                                value={userAddress}
                                onChange={handleAddressChange}
                            >
                                <option value={userAddress}>{userAddress}</option>
                                <option value="edit-address">Edit Address...</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {navigate('/payment')}}>
                            Checkout
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
