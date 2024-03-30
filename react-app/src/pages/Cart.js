import "../index.scss";
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Hard code data
const CartData = [
    [1, "Table", 20, 2, "Made with the rare oak wood found in India, the finest table that you..."],
    [2, "Washing machine", 2000, 1, "Assist with AI production line, a washing machine for life."]
];

const SavedAddress = [
    "19 ABC Road, Kwun Tong",
    "15/F, Tai Fai Building, Wan Chai"
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(CartData);
    const [selectedAddress, setSelectedAddress] = useState(SavedAddress[0]);
    const navigate = useNavigate();

    useEffect(() => {
        if (SavedAddress.length > 0 && !selectedAddress) {
            setSelectedAddress(SavedAddress[0]);
        }
    }, [selectedAddress]);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item[2] * item[3]), 0);
    };

    const updateQuantity = (index, quantity) => {
        let updatedQuantity = quantity;
        if (quantity === '' || quantity < 1 || isNaN(quantity)) {
            updatedQuantity = 1;
        }
        const updatedCartItems = [...cartItems];
        updatedCartItems[index][3] = updatedQuantity;
        setCartItems(updatedCartItems);
    };

    const removeItem = (index) => {
        const updatedCartItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        if (value === "add-new") {
            navigate('/add-address');
        } else {
            setSelectedAddress(value);
        }
    };

    return (
        <div id="mainBGColor">
        <Container>
            <Row>
                <h3 className="my-3">Shopping Cart</h3>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{item[1]}</strong> (${item[2]})
                                <p>{item[4]}</p>
                                <img height="100" src={"/photo/"+item[0]+".png"} alt={item[1]} />
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Qty</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={item[3]}
                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                    />
                                    <Button variant="outline-danger" onClick={() => removeItem(index)}>
                                        Remove
                                    </Button>
                                </InputGroup>
                            </ListGroup.Item>
                        ))}
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
                                value={selectedAddress}
                                onChange={handleAddressChange}
                            >
                                {SavedAddress.map((address, index) => (
                                    <option key={index} value={address}>{address}</option>
                                ))}
                                <option value="add-new">Add New Address...</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {navigate('/payment')}}>
                            Checkout
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Cart;
