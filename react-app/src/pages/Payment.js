import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, ListGroup, Form, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap';

// Hard code data
const CartData = [
    [1, "Table", 20, 2, "Made with the rare oak wood found in India, the finest table that you..."],
    [2, "Washing machine", 2000, 1, "Assist with AI production line, a washing machine for life."]
];

const CardPayment = ({ onSubmit }) => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
    });
    
    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cardDetails);
    };
    return (
        <Row>
            <Col className="col-6">
                <Card style={{ padding: '20px' }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                        type="text"
                        name="cardNumber"
                        placeholder="Card number"
                        value={cardDetails.cardNumber}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="cardHolderName"
                        placeholder="Cardholder name"
                        value={cardDetails.cardHolderName}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>

                    <Form.Label>Expiry Date</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="MM"
                        name="expiryMonth"
                        value={cardDetails.expiryMonth}
                        onChange={handleChange}
                        style={{ maxWidth: '70px' }}
                        required
                        />
                        <FormControl
                        placeholder="YY"
                        name="expiryYear"
                        value={cardDetails.expiryYear}
                        onChange={handleChange}
                        style={{ maxWidth: '70px' }}
                        required
                        />
                        <FormControl
                        placeholder="CVV"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleChange}
                        style={{ maxWidth: '70px' }}
                        required
                        />
                    </InputGroup>

                    <Button variant="primary" type="submit" className="me-2">
                        Pay Now
                    </Button>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col className="col-6">
                <img className="img-fluid" src={"/img/payment/credit_card_cvv.png"} />
            </Col>
        </Row>
    );
};

const PayPalPayment = () => {
    return (
        <div>
        <h4>PayPal Payment</h4>
        </div>
    );
};

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePaymentSubmit = (paymentDetails) => {
        setIsLoading(true);
        console.log(paymentDetails);

        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
        }, 3000); // 3s delay simulating payment loading
    };

    const renderPaymentInterface = () => {
        switch (paymentMethod) {
            case 'Card':
                return <CardPayment onSubmit={handlePaymentSubmit} />;
            case 'PayPal':
                return <PayPalPayment />;
            default:
                return <p>Please select a payment method</p>;
        }
    };

    if (isLoading) {
        return (
            <div className="text-center my-5">
                <h5>Payment in progress... Please do NOT leave this page or close the browser</h5>
                <Spinner animation="border" role="status"></Spinner>
            </div>
        );
    }

    if (showSuccess) {
        const orderId = "ORD123456";
        const orderCreationTime = new Date().toLocaleString();
        const amountPaid = 340;
        return (
            <Container className="text-center my-5">
                <img src="/img/payment/payment_success.png" alt="Success" style={{ width: '200px', height: '200px' }} />
                <h2>Payment Success!</h2>
                <p>Your order has been successfully placed.</p>
                <div className="my-3">
                    <strong>Order ID:</strong> {orderId}<br/>
                    <strong>Order Time:</strong> {orderCreationTime}<br/>
                    <strong>Amount Paid:</strong> ${amountPaid}
                </div>
                <Button variant="primary" onClick={() => navigate('/orderlist')}>
                    Proceed to My Orders
                </Button>
            </Container>
        );
    }

    return (
        <div>
        <Container>
            <h2 className="my-3">Payment</h2>
            <p className="my-3">Amount to be paid: ${340}</p>
            <Form className="my-3">
                <Form.Group controlId="paymentMethodSelect">
                <Form.Label><strong>Payment Method</strong></Form.Label>
                <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Choose...</option>
                    <option value="Card">Credit Card / Debit Card</option>
                    <option value="PayPal">PayPal</option>
                </Form.Select>
                </Form.Group>
            </Form>
            {renderPaymentInterface()}
            <Button className="my-3" variant="secondary" type="button" onClick={() => {navigate('/cart')}}>
                    Back to Cart
            </Button>
        </Container>
        </div>
    );
};

export default Payment;
