// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

const User = () => {
  const initialFormValues = {
    username: '',
    email: '',
    phoneNo: '',
    address: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  
  const handleFormReset = () => {
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const token = 'Token '+ localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      const response = await api.post('user/', {
        userID: userid
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      const userData = response.data.fields[0];
      console.log(response.data.fields[0])
      setFormValues({
        username: userData.username,
        email: userData.email,
        phoneNo: userData.phoneNo,
        address: userData.address,
        password: userData.password
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        
        if (name === 'phoneNo') {
          processedValue = value.replace(/\D/g, '');
        }
        
        setFormValues((prevValues) => ({ ...prevValues, [name]: processedValue }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const token = 'Token ' + localStorage.getItem('token');
          const userid = localStorage.getItem('userid');
      
          const response = await api.post(
            'user/edit_info/',
            {
              userID: userid,
              username: formValues.username,
              email: formValues.email,
              phoneNo: formValues.phoneNo,
              address: formValues.address,
              password: formValues.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            }
          );
      
          // Handle the response or perform any additional actions
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const handlePopupSubmit = (event) => {
        event.preventDefault();
    
        const { oldPassword, newPassword, confirmPassword } = event.target.elements;
    
        if (oldPassword.value !== formValues.password) {
          alert('Original password is incorrect.');
          return;
        }
    
        if (newPassword.value !== confirmPassword.value) {
          alert('New password and confirm password do not match.');
          return;
        }
    
        // Update the password in the state
        setFormValues((prevValues) => ({
          ...prevValues,
          password: newPassword.value,
          newPassword: '',
          confirmPassword: '',
        }));
    
        // Send a request to update the password in the database
        updatePassword(newPassword.value);
      };
    
      const updatePassword = async (newPassword) => {
        try {
          const token = 'Token ' + localStorage.getItem('token');
          const userid = localStorage.getItem('userid');
    
          const response = await api.post(
            'user/edit_info/',
            {
              userID: userid,
              username: formValues.username,
              email: formValues.email,
              phoneNo: formValues.phoneNo,
              address: formValues.address,
              password: newPassword,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            }
          );
    
          // Handle the response or perform any additional actions
          alert('Password changed.');
          
        } catch (error) {
          console.log(error);
        }
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
                <form id="general" onSubmit={handleSubmit} onReset={handleFormReset}>
                    <p id="row">
                        <label for="name" class="cell label">User Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            name="username" 
                            placeholder="User Name" 
                            value={formValues.username} 
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
                          name="phoneNo"
                          placeholder="Contact Number"
                          value={formValues.phoneNo}
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
                              <form id="changepw" style={{ display: 'table' }} onSubmit={handlePopupSubmit}>
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
                    <br />
                    <p id="ButtonContainer">
                        <input type="reset" value="Cancel"/>
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