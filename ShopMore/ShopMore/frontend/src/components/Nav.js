// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';

// import React components
import "../index.scss"
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const accountType = localStorage.getItem('accountType');

    function search(){
        const navSearch = document.getElementById("navSearch")
        navigate("/search/" + navSearch.value + "&&0-5000")
    }

    const renderLinksBasedOnAccountType = () => {
        // Not logged in, accountType is null
        if(accountType === null) {
            return (
                <p><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home Page</Link></p>
            );
        // Admin user, accountType is 1
        } else if(accountType === "1") {
            return (
                <>
                    <p><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home Page</Link></p>
                    <p><Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>My Shopping Cart</Link></p>
                    <p><Link to="/favourite" style={{ textDecoration: 'none', color: 'inherit' }}>My Favorite Product</Link></p>
                    <p><Link to="/orderlist" style={{ textDecoration: 'none', color: 'inherit' }}>My Order</Link></p>
                    <p><Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin CRUD</Link></p>
                </>
            );
        // Regular user, accountType is 0
        } else {
            return (
                <>
                    <p><Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home Page</Link></p>
                    <p><Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>My Shopping Cart</Link></p>
                    <p><Link to="/favourite" style={{ textDecoration: 'none', color: 'inherit' }}>My Favorite Product</Link></p>
                    <p><Link to="/orderlist" style={{ textDecoration: 'none', color: 'inherit' }}>My Order</Link></p>
                </>
            );
        }
    };

    // Display root element with conditional links
    return (
        <>
            <div id="navBar">
                {renderLinksBasedOnAccountType()}
                <div id="searchBar">
                    <input id="navSearch" type="text" placeholder="Search product..."/>
                    <FaSearch onClick={() => search()} />
                </div>
            </div>
        </>
    )
}
export default Nav
