// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';


// Hard code data
const CartData = [
    [1, "Table", 20, 2, "Made with the rare oak wood found in India, the finest table that you..."],
    [2, "Washing machine", 2000, 1, "Assist with AI production line, a washing machine for life."]
]; // id, name, price, quantity_in_cart, desc

const SavedAddress = [
    "19 ABC Road, Kwun Tong",
    "15/F, Tai Fai Building, Wan Chai"
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(CartData);
    const [selectedAddress, setSelectedAddress] = useState('');

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item[2] * item[3]), 0);
    };

    const updateQuantity = (index, quantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index][3] = quantity;
        setCartItems(updatedCartItems);
    };

    const removeItem = (index) => {
        const updatedCartItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    return (
        <Container>
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
                    <h4>Grand Total: ${calculateTotal()}</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formAddressSelect">
                            <Form.Label>Select Address</Form.Label>
                            <Form.Select
                                value={selectedAddress}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                            >
                                <option value="">Choose...</option>
                                {SavedAddress.map((address, index) => (
                                    <option key={index} value={address}>{address}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPaymentMethod">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select>
                                <option>Credit Card/Debit Card</option>
                                <option>PayPal</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Checkout
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;