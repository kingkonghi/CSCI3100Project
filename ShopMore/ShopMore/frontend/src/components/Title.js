// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";



// import React components
import "../index.scss"
import Nav from "./Nav.js"
import UserInfo from "./UserInfo.js"

const Title = ({login, nav}) => {
    
    const [showUser, setShowUser] = useState(false)
    const [showNav, setShowNav] = useState(nav)

    function changeStat(){
        if (showUser === false){
            setShowUser(true);
        } else {
            setShowUser(false);
        }
    }

    function changeNav(){
        if (nav === true && showNav === false){
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }

    //display root element
    return (
        <>
            <div id='titleBar'>
                {login && showNav? <MdOutlineKeyboardArrowUp onClick={()=>changeNav()}/>:<div></div>}
                {login && !showNav? <MdOutlineKeyboardArrowDown onClick={()=>changeNav()} />:<div></div>}
                ShopMore
                {login? <div id='user'><FaRegUserCircle onClick={()=>changeStat()}/></div>:<div></div>}
                {showUser? <div><UserInfo login={login}/></div>:<div></div>}
            </div>
            {showNav? <Nav />:<div></div>}
        </>
    )
}
export default Title
