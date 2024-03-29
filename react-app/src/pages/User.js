// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';

const User = () => {

    let username = "givemelenggradepls"
    let fullname = "Joe Go"
    let email = "sleepy@gmail.com"
    let contactno = null
    let password = "newpw"
    let defaultpay = "huh"
    let creditcard = ""

    return (
        <>
            <div id="profile">
            <button type="button" className="directButton">Log out</button>

                <div className="form-container">
                    <div class="icon-container">
                        <i class="bi bi-person-circle"></i>
                        <h4>{username}</h4>
                    </div>

                    <hr />
                    <div className="signup">
                    <h3>Edit User Information</h3>
                    <form>
                        <input type="text" id="signupUsername" name="signupUsername" placeholder="Username" required />
                        <br />
                        <input type="email" id="signupEmail" name="signupEmail" placeholder="Email" required />
                        <br />
                        <input type="password" id="signupPassword" name="signupPassword" placeholder="Password" required />
                        <br />
                        <input type="password" id="signupconPassword" name="signupconPassword" placeholder="Confirm Password" required />
                        <br />
                        <input type="submit" value="Sign Up" />
                    </form>
                    </div>

                </div>            
            </div>
        </>
    );
}

export default User;