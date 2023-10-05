import React, { useState } from "react";
import httpClient from "../httpClient";
import '../css/login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = async () => {
        try {
            const response = await httpClient.post('//localhost:5000/login', {
                email,
                password,
            });

            window.location.href = '/';
        }
        catch (e) {
            if (e.response.status === 401) {
                alert('Invalid credentials.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="content">
                <div className="align-left">
                    <img src='./brand.svg' className="padding logo"/>
                </div>
                <div className="align-center">
                    <div className="login-content">
                        <div className="row-gap">
                            <div className="login-welcome">
                                Welcome to <span style={{ fontWeight: '700' }}>StudyMate!</span>
                            </div>
                            <div className="login-welcome-text">
                                Log in to StudyMate to start your learning adventure today. Let's achieve your learning goals together!
                            </div>
                        </div>
                        <form className="login-form">
                            <div className="row-gap">
                                <div className="input-container">
                                    <div className="hint">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 18" fill="none">
                                            <path d="M4 6L10 12M20 6L14 12M10 12L10.5858 12.5858C11.3668 13.3668 12.6332 13.3668 13.4142 12.5858L14 12M10 12L3.87868 18.1213M14 12L20.1213 18.1213M20.1213 18.1213C20.6642 17.5784 21 16.8284 21 16V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V16C3 16.8284 3.33579 17.5784 3.87868 18.1213M20.1213 18.1213C19.5784 18.6642 18.8284 19 18 19H6C5.17157 19 4.42157 18.6642 3.87868 18.1213" stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="Email"
                                        type="text" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input login-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <div className="hint">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M8 10V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V10M12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15ZM12 15V17M7 20H17C18.1046 20 19 19.1046 19 18V12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12V18C5 19.1046 5.89543 20 7 20Z" stroke="#686B6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="Password"
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input login-input"
                                    />
                                </div>
                            </div>
                            <button className='submit-button submit-label' type='button' onClick={() => logInUser()}>
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="sunset"></div>
        </div>
    );
}

export default Login;
