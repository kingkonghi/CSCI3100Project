// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  // Get the username from localStorage
  const username = localStorage.getItem('username');
  // Get the navigate function from useNavigate hook
  const navigate = useNavigate();
  // Check if the user is logged in
  const login = username !== null;

  // Function to handle logout
  const handleLogout = (event) => {
    event.preventDefault();

    // Remove user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('phoneNo');
    localStorage.removeItem('accountType');
    
    // Display logout successful message
    alert('Logout successful');
    
    // Redirect to the login page after successful logout
    navigate('/login');
  };

  // Display root element
  return (
    <>
      <div id="userInfo">
        {login ? (
          // If user is logged in
          <div>
            <p id="intro">You are logged in as </p>
            <p id="name">{username}</p>
          </div>
        ) : (
          // If user is not logged in
          <div>
            <p id="name-warn">You are not logged in.</p>
            <button type="text" onClick={() => navigate('/login')}>Log in</button>
          </div>
        )}
        {login ? (
          // If user is logged in
          <div>
            <hr />
            <button type="text" onClick={() => navigate('/user')}>
              View personal info
            </button>
            <hr />
            <button type="text" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          // If user is not logged in, render an empty div
          <div></div>
        )}
      </div>
    </>
  );
};

export default UserInfo;