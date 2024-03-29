// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import { Outlet } from 'react-router-dom'
import React from 'react';

// import React components
import "../index.scss"

const Root = ({ nav, home }) => {
    
    const content = <div id='main-container'><Outlet /></div>

    //display root element
    return (
        <>
            <div>
                {home ? content : <header>
                    <div id='titleBar'>Title Bar</div>
                    {nav ? <div><div id='navBar'>Nav BAR</div>{content}</div> : content}
                </header>}
            </div>
        </>
    )
}
export default Root
