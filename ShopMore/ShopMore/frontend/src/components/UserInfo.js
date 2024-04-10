// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const login = username !== null;

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    alert('Logout successful');
    // Redirect after successful logout
    navigate('/login');
  };

  // Display root element
  return (
    <>
      <div id="userInfo">
        {login ? (
          <div>
            <p id="intro">You are logged in as </p>
            <p id="name">{username}</p>
          </div>
        ) : (
          <div>
            <p id="name-warn">You are not logged in.</p>
            <button type="text" onClick={() => navigate('/login')}>Log in</button>
          </div>
        )}
        {login ? (
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
          <div></div>
        )}
      </div>
    </>
  );
};

export default UserInfo;