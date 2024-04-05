// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, ListGroup, Form, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap';


const User = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
      username: 'givemelenggradepls',
      fullname: 'Joe Go',
      email: 'sleepy@gmail.com',
      contactno: '',
      address: '',
      password: '',
      creditcard: '',
      cardholdername: '',
      cardnumber: '',
      expirydate: '',
      paymenttype: 'debit',
    });
  
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
                        <label class="cell label">Change Password</label>
                        <a href="#" onclick="document.getElementById('changepw').style.display='block'">Set a new password</a>
                    </p>
                    <br/>
                    <Form className="my-3">
                        <Form.Group controlId="paymentMethodSelect">
                        <Form.Label><strong>Default Payment Method</strong></Form.Label>
                        <Form.Select>
                            <option value="">Choose...</option>
                            <option value="Card">Credit Card / Debit Card</option>
                            <option value="PayPal">PayPal</option>
                        </Form.Select>
                        </Form.Group>
                    </Form>
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

export default User;