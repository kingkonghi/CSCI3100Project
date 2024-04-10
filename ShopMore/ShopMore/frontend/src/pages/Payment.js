import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, ListGroup, Form, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap';

const authToken = 'Token b09782e294306013522c0610bbbe5e601e021b3b';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

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

const PayPalPayment = ({ onSubmit , total}) => {
    const navigate = useNavigate();
    const handlePayPalPayment = async () => {
        const paymentDetails = {
            amount: total,
            description: "Payment for items in cart",
        };
        axios.post('http://127.0.0.1:8000/create_payment/', paymentDetails, {
            headers: { Authorization: authToken },
        }).then(response => {
            // Redirect to PayPal using the URL provided by your backend
            window.location.href = response.data.redirectUrl;
        }).catch(error => {
            console.error("Error during PayPal payment creation:", error);
            // Handle error
        });
    };

    return (
        <div>
            <h4>PayPal Payment</h4>
            <Button onClick={handlePayPalPayment}>Pay with PayPal</Button>
        </div>
    );
};


const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [apiCallCompleted, setApiCallCompleted] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    const userID = localStorage.getItem('userid');
    let query = useQuery();

    useEffect(() => {
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

        fetchCart();
        fetchProducts();
        
        let status = query.get("status");
        setShowSuccess(status);
    }, [userID]);

    useEffect(() => {
        if (showSuccess) {
            // Convert cartItems to the required string format for the API call
            let orderItemsStr = cartItems.map(item => `"${item.itemID}":${item.quantity}`).join(',');
            orderItemsStr = "{" + orderItemsStr + "}";
            console.log(orderItemsStr);
    
            // Calculate total amount again for clarity, though it could be reused from `amount`
            const totalAmount = calculateTotal();
    
            const createOrder = async () => {
                try {
                    // Here we assume userID is available in this scope as before
                    const response = await axios.get(`http://127.0.0.1:8000/order/add/${userID}/${orderItemsStr}/${totalAmount}/`, {
                        headers: {
                            Authorization: authToken
                        }
                    });
    
                    setOrderId(response.data[0]); // Set the order ID state
                    setApiCallCompleted(true); // Indicate that the API call has completed
                    
                } catch (error) {
                    console.error('Order creation API call failed', error);
                    setShowSuccess(false); // Optionally revert the success state if the order creation fails
                }
            };
    
            createOrder();
        }
    }, [showSuccess]);

    const calculateTotal = () => {
        const total = cartItems.reduce((acc, cartItem) => {
            const product = products.find(p => p.itemID.toString() === cartItem.itemID);
            return acc + (product ? product.itemPrice * cartItem.quantity : 0);
        }, 0);
        return total + 50; // Adding delivery fee
    };

    const amount = calculateTotal();

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
                return <PayPalPayment onSubmit={handlePaymentSubmit} total={amount} />;
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

    if (showSuccess && apiCallCompleted) {
        const orderIdStr = `ORD${orderId.toString().padStart(4, '0')}`;
        const orderCreationTime = new Date().toLocaleString();
        return (
            <Container className="text-center my-5">
                <img src="/img/payment/payment_success.png" alt="Success" style={{ width: '200px', height: '200px' }} />
                <h2>Payment Success!</h2>
                <p>Your order has been successfully placed.</p>
                <div className="my-3">
                    <strong>Order ID:</strong> {orderIdStr}<br/>
                    <strong>Order Time:</strong> {orderCreationTime}<br/>
                    <strong>Amount Paid:</strong> ${amount}
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
            <p className="my-3">Amount to be paid: ${amount}</p>
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
