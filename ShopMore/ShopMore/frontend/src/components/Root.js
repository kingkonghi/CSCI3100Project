// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import { Outlet } from 'react-router-dom'
import React from 'react';

// import React components
import Nav from "./Nav.js"
import Title from "./Title.js"
import "../index.scss"

const Root = ({ nav, home }) => {
    
    const content = <div id='main-container'><Outlet /></div>

    const loggedIn = true

    //display root element
    return (
        <>
            <div>
                {home ? content : <header>
                    <Title login={loggedIn} nav={nav}/>
                    {content}
                </header>}
            </div>
        </>
    )
}
export default Root
