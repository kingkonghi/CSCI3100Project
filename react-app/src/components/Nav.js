// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';

// import React components
import "../index.scss"
import { FaSearch } from "react-icons/fa";

const Title = () => {

    //display root element
    return (
        <>
            <div id="navBar">
                <p>Home Page</p>
                <p>My Favorite Product</p>
                <p>My Order</p>
                <div id="searchBar">
                    <input type="text" placeholder="Search product..."/>
                    <FaSearch />
                </div>
            </div>
        </>
    )
}
export default Title
