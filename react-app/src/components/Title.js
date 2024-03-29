// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";



// import React components
import "../index.scss"

const Title = () => {

    //display root element
    return (
        <>
            <div id='titleBar'>
                <MdOutlineKeyboardArrowUp />
                CUHK Shopping Mall
                <div id='user'><FaRegUserCircle/></div>
            </div>
        </>
    )
}
export default Title
