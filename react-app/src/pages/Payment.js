import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const CardPayment = () => {
    return (
      <div>
        <h3>Card Payment</h3>
      </div>
    );
};

const PayPalPayment = () => {
    return (
        <div>
        <h3>PayPal Payment</h3>
        {/* Add PayPal integration or instructions here */}
        </div>
    );
};

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const renderPaymentInterface = () => {
    switch (paymentMethod) {
      case 'Credit Card':
        return <CardPayment />;
      case 'PayPal':
        return <PayPalPayment />;
      default:
        return <p>Please select a payment method</p>;
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="paymentMethodSelect">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </Form.Select>
        </Form.Group>
      </Form>
      {renderPaymentInterface()}
    </div>
  );
};

export default Payment;
