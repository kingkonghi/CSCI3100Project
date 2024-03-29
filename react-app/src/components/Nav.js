// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';

// import React components
import "../index.scss"
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Nav = () => {

    //display root element
    return (
        <>
            <div id="navBar">
                <p><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home Page</Link></p>
                <p><Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>My Shopping Cart</Link></p>
                <p><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>My Favorite Product</Link></p>
                <p><Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>My Order</Link></p>
                <p><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login (temp)</Link></p>
                <div id="searchBar">
                    <input type="text" placeholder="Search product..."/>
                    <FaSearch />
                </div>
            </div>
        </>
    )
}
export default Nav