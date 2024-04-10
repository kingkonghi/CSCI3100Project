import "../index.scss";
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const navigate = useNavigate();
    const userID = localStorage.getItem('userid');
    const authToken = 'Token b09782e294306013522c0610bbbe5e601e021b3b';

    useEffect(() => {
        fetchCart();
        fetchProducts();
        fetchUserDetails();
    }, []);

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

    const fetchProducts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/product/', {
            headers: {
                Authorization: authToken
            }
        });
        setProducts(response.data.item);
    };

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

    const calculateTotal = () => {
        return cartItems.reduce((acc, cartItem) => {
            const product = products.find(p => p.itemID.toString() === cartItem.itemID);
            return acc + (product ? product.itemPrice * cartItem.quantity : 0);
        }, 0);
    };

    const updateQuantity = async (itemID, quantity) => {
        await axios.get(`http://127.0.0.1:8000/cart/edit/${userID}/${itemID}/${quantity}/`, {
            headers: {
                Authorization: authToken
            }
        });
        fetchCart();
    };

    const removeItem = async (itemID) => {
        await axios.get(`http://127.0.0.1:8000/cart/remove/${userID}/${itemID}/`, {
            headers: {
                Authorization: authToken
            }
        });
        fetchCart();
    };

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
                                            max={product.itemQuantity}
                                            value={cartItem.quantity}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                if (newQuantity > 0 && newQuantity <= product.itemQuantity) {
                                                    updateQuantity(cartItem.itemID, newQuantity);
                                                }
                                            }}
                                        />
                                        <Button variant="outline-danger" onClick={() => removeItem(cartItem.itemID)}>
                                            Remove
                                        </Button>
                                    </InputGroup>
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
