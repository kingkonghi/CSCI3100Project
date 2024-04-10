// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  });

const Login = () => {
    const [activeForm, setActiveForm] = useState('login');
    const navigate = useNavigate();
  
    const toggleForm = (formType) => {
      setActiveForm(formType);
    };
  
    const handleSignUp = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const username = formData.get('signupUsername');
      const email = formData.get('signupEmail');
      const password = formData.get('signupPassword');
      const confirmPassword = formData.get('signupconPassword');
  
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
  
      try {
        const { data } = await api.post('register/', { username, password, email });
        localStorage.setItem('token', data.token);
        alert('Registration successful');
        toggleForm('login')
      } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed');
      }
    };
  
    const handleLogin = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const username = formData.get('loginUsername');
      const password = formData.get('loginPassword');
  
      try {
        const { data } = await api.post('login/', { username, password });
        localStorage.setItem('token', data.token);
        alert('Login successful');
        // Redirect after successful login based on user ID
        if (username === "admin1") {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Login failed', error);
        alert('Login failed');
      }
    };
  
    return (
      <>
        <div id="login">
          <div className="form-container">
            <div className="button-container row justify-content-md-center">
              <nav id="navbar" className="navbar navbar-expand-lg navbar-light justify-content-center" >
                <ul className='navbar-nav flex-row'>
                  <li className='nav-item active'>
                    <a className='nav-link' onClick={() => toggleForm('signup')} style={activeForm === 'signup'?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}}>Sign Up</a>
                  </li>
                  <li className='nav-item active'>
                    <a className='nav-link' onClick={() => toggleForm('login')} style={activeForm === 'login'?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}}>Login</a>
                  </li>
                </ul>
              </nav>
            </div>
  
            {activeForm === 'signup' ? (
              <div className="signup">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                  <input type="text" id="signupUsername" name="signupUsername" placeholder="Username" required />
                  <br />
                  <input type="email" id="signupEmail" name="signupEmail" placeholder="Email" required />
                  <br />
                  <input type="password" id="signupPassword" name="signupPassword" placeholder="Password" required />
                  <br />
                  <input type="password" id="signupconPassword" name="signupconPassword" placeholder="Confirm Password" required />
                  <br />
                  <input type="submit" value="Sign Up" />
                </form>
              </div>
            ) : (
              <div className="login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input type="text" id="loginUsername" name="loginUsername" placeholder="Username" required />
                  <br />
                  <input type="password" id="loginPassword" name="loginPassword" placeholder="Password" required />
                  <br />
                  <input type="submit" value="Login" />
                </form>
              </div>
            )}
  
          </div>            
        </div>
      </>
    );
  }
  
  export default Login;
  