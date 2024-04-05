// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';


const Login = () => {

    const [activeForm, setActiveForm] = useState('login');

    const toggleForm = (formType) => {
        setActiveForm(formType);
      };

    return (
        <>
            <div id="login">
                <div className="form-container">
                    <div className="button-container" class="row justify-content-md-center">
                        <nav id="navbar" className="navbar navbar-expand-lg navbar-light justify-content-center" >
                            <ul className='navbar-nav flex-row'>
                            <li className='nav-item active'>
                                <a className='nav-link' href='#signup' onClick={() => toggleForm('signup')} style={activeForm === 'signup'?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}}>Sign Up</a>
                            </li>
                            <li className='nav-item active'>
                                <a className='nav-link' href='#login' onClick={() => toggleForm('login')} style={activeForm === 'login'?{fontWeight: "bolder", color: "Highlight"}:{fontWeight: "bolder"}}>Login</a>
                            </li>
                            </ul>
                        </nav>
                    </div>

                    {activeForm === 'signup' && (
                        <div className="signup">
                        <h2>Sign Up</h2>
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
                    )}

                    {activeForm === 'login' && (
                        <div className="login">
                        <h2>Login</h2>
                        <form>
                            <input type="text" id="loginUsername" name="loginUsername" placeholder="Username" required />
                            <br />
                            <input type="password" id="loginPassword" name="loginPassword" placeholder="Password" required />
                            <br />
                            <input type="submit" value="Login" />
                        </form>
                        </div>
                    )}
                </div>            
            </div>
        </>
    );
}

export default Login;