// Student Name : Chu Tsz Chim James, Chow Ka Shing, Fong Kwai Yiu, Lee Ho Kan
// Student ID : 1155142348, 1155160080, 1155160139, 1155157376

import { Outlet } from 'react-router-dom'
import React from 'react';

// import React components
import "../index.scss"

const Root = ({ nav, home }) => {
    
    const content = <div id='main-container'><Outlet /></div>

    //display root element
    return (
        <>
            <div className='fixed-top'>
                {home ? content : <header id="Title">
                    <div id='title'>This is title bar</div>
                    {nav ? <div>This is nav bar{content}</div> : content}
                </header>}
            </div>
        </>
    )
}
export default Root