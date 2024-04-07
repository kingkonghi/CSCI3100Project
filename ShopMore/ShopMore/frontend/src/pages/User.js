// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Card, Container, Row, Col, ListGroup, Form, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap';


const User = () => {
    const [formValues, setFormValues] = useState({
      username: 'givemelenggradepls',
      fullname: 'Joe Go',
      email: 'sleepy@gmail.com',
      contactno: '',
      address: '',
      password: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    const renderPaymentInterface = () => {
      switch (paymentMethod) {
          case 'Card':
              return <CardPayment />;
          case 'PayPal':
              return <PayPalPayment />;
          default:
              return <></>;
      }
  };
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        
        if (name === 'contactno') {
          processedValue = value.replace(/\D/g, '');
        }
        
        setFormValues((prevValues) => ({ ...prevValues, [name]: processedValue }));
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform form submission logic here
      console.log(formValues);
    };
  
    return (
      <>
        <div id="profile">
          <div className="form-container">
            <div className="icon-container">
              <i className="bi bi-person-circle"></i>
              <h4>{formValues.username}</h4>
            </div>
            <hr />

            <h3>Edit User Information</h3>
            <div className="editinfo">
                <form id="general" onSubmit={handleSubmit}>
                    <p id="row">
                        <label for="name" class="cell label">Full Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            name="fullname" 
                            placeholder="Full Name" 
                            value={formValues.fullname} 
                            onChange={handleInputChange}
                            required
                        />
                    </p>
                    <br/>
                    <p id="row">
                        <label for="email" class="cell label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                            required
                        />
                    </p>
                    <br/>
                    <p id="row">
                        <label for="phone" class="cell label">Contact Number (+852)</label>
                        <input
                            id="phone"
                            type="tel"
                            name="contactno"
                            placeholder="Contact Number"
                            value={formValues.contactno}
                            onChange={handleInputChange}
                            pattern="[0-9]{8}"
                            required
                        />
                    </p>
                    <br/>
                    <p id="row">
                        <label for="address" class="cell label">Address</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            required
                        />
                    </p>
                    <br/>
                    <p id="row">
                      <label className="cell label">Change Password</label>
                      <Popup
                        trigger={
                          <p className='nav-link' style={{ color: "Highlight", textDecoration: "underline" }}>Set a new password</p>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="changepw">
                            <div className='content' style={{ maxWidth: '400px', margin: '0 auto' }}>
                              <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Set New Password</h3>
                              <form id="changepw" style={{ display: 'table' }}>
                                <p style={{ display: 'table-row' }}>
                                  <label htmlFor="oldPassword" className="cell label" 
                                  style={{ display: 'table-cell', paddingRight: '20px' }}>Original Password</label>
                                  <input type="password" id="oldPassword" name="oldPassword" required style={{ display: 'table-cell' }} />
                                </p>
                                <br/>
                                <p style={{ display: 'table-row' }}>
                                  <label htmlFor="newPassword" className="cell label" 
                                  style={{ display: 'table-cell', paddingRight: '20px' }}>New Password</label>
                                  <input type="password" id="newPassword" name="newPassword" required style={{ display: 'table-cell' }} />
                                </p>
                                <br/>
                                <p style={{ display: 'table-row' }}>
                                  <label htmlFor="confirmPassword" className="cell label" 
                                  style={{ display: 'table-cell', paddingRight: '20px' }}>Confirm Password</label>
                                  <input type="password" id="confirmPassword" name="confirmPassword" required style={{ display: 'table-cell' }} />
                                </p>
                              </form>
                              <div style={{ textAlign: "center" }}>
                                <button onClick={() => close()} style={{ marginRight: '30px', marginTop: '20px' }}>Cancel</button>
                                <button type="submit" form="changepw">Change</button>
                              </div>
                            </div>
                            </div>
                        )}
                      </Popup>
                    </p>

                    <br/>
                    <Form className="my-3">
                        <Form.Group controlId="paymentMethodSelect">
                        <Form.Label><strong>Default Payment Method</strong></Form.Label>
                        <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="">Choose...</option>
                            <option value="Card">Credit Card / Debit Card</option>
                            <option value="PayPal">PayPal</option>
                        </Form.Select>
                        </Form.Group>
                    </Form>
                    {renderPaymentInterface()}
                    <br />
                    <p id="ButtonContainer">
                        <input type="submit" value="Cancel"/>
                        <input type="submit" value="Save Changes" />
                    </p>
                </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CardPayment = () => {
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
    
    return (
          <div className="default-card">
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
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
          </div>
    );
};

const PayPalPayment = () => {
  return (
      <div>
      <p>Default PayPal Payment</p>
      </div>
  );
};

export default User;