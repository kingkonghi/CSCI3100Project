// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import React, { useState } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";



// import React components
import "../index.scss"

const UserInfo = ({login}) => {

    const username = "givemelenggradepls"
    //display root element
    return (
        <>
            <div id='userInfo'>
                {login?<div><p id='intro'>You are logged in as </p><p id='name'>{username}</p></div>:<div><p id='name-warn'>You are not logged in.</p><button type='text'>Log in</button></div>}
                {login? <div>
                            <hr/>
                            <button type='text'>View personal info</button>
                            <hr/>
                            <button type='text'>Log out</button>
                        </div>:<div></div>}
            </div>
        </>
    )
}
export default UserInfo
