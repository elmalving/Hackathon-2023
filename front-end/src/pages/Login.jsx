import React, { useState } from 'react';
import httpClient from '../httpClient';
import { Link } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logInUser = async () => {
        try {
            await httpClient.post('//localhost:5000/login', {
                email,
                password,
            });

            window.location.href = '/';
        } catch (e) {
            if (!e.response) {
                alert('Database is down.');
                return;
            }
            if (e.response.status === 401) {
                alert('Invalid credentials.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="content">
                <div className="align-left">
                    <img src="./brand.svg" className="logo" />
                </div>
                <div className="column-container">
                    <div className="align-center login-content">
                        <div className="row-gap">
                            <div className="login-welcome">
                                Welcome to&nbsp;
                                <span style={{ fontWeight: '700' }}>
                                    StudyMate!
                                </span>
                            </div>
                            <div className="login-welcome-text">
                                Log in to StudyMate to start your learning
                                adventure today. Let's achieve your learning
                                goals together!
                            </div>
                        </div>
                        <form className="login-form">
                            <div className="row-gap">
                                <div className="input-container">
                                    <div className="hint">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 18"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 6L10 12M20 6L14 12M10 12L10.5858 12.5858C11.3668 13.3668 12.6332 13.3668 13.4142 12.5858L14 12M10 12L3.87868 18.1213M14 12L20.1213 18.1213M20.1213 18.1213C20.6642 17.5784 21 16.8284 21 16V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V16C3 16.8284 3.33579 17.5784 3.87868 18.1213M20.1213 18.1213C19.5784 18.6642 18.8284 19 18 19H6C5.17157 19 4.42157 18.6642 3.87868 18.1213"
                                                stroke="#686B6E"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="input input-placeholder"
                                    />
                                </div>
                                <div className="input-container">
                                    <div className="hint">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M8 10V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V10M12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15ZM12 15V17M7 20H17C18.1046 20 19 19.1046 19 18V12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12V18C5 19.1046 5.89543 20 7 20Z"
                                                stroke="#686B6E"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="input input-placeholder"
                                    />
                                </div>
                            </div>
                            <div className="input-misc">
                                <div className="remember-container">
                                    <input
                                        type="checkbox"
                                        id="remember-checkbox"
                                        name="remember"
                                    />
                                    <label
                                        className="remember-label"
                                        htmlFor="remember-checkbox"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a className="font-gradient" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                className="submit-button submit-label"
                                type="button"
                                onClick={() => logInUser()}
                            >
                                Log in
                            </button>
                            <div className="space-between">
                                <div className="divide-line"></div>
                                <div className="divider-label">
                                    or continue with
                                </div>
                                <div className="divide-line"></div>
                            </div>
                            <div className="space-between">
                                <button
                                    className="social-container"
                                    type="button"
                                    id="g_id_onload"
                                    data-client_id=""
                                    data-context="signin"
                                    data-ux_mode="popup"
                                    data-callback="googleSignIn"
                                    data-auto_prompt="true"
                                >
                                    <div className="social-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 20"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_607_6672)">
                                                <path
                                                    d="M10.7041 8.18182V12.0546H16.1958C15.9546 13.3 15.231 14.3546 14.1456 15.0637L17.4573 17.5819C19.3868 15.8365 20.5 13.2728 20.5 10.2274C20.5 9.51831 20.4351 8.83642 20.3145 8.18193L10.7041 8.18182Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M4.98548 11.9034L4.23857 12.4637L1.59473 14.4819C3.27377 17.7455 6.71509 20.0001 10.7039 20.0001C13.459 20.0001 15.7688 19.1092 17.4572 17.5819L14.1455 15.0637C13.2364 15.6637 12.0768 16.0274 10.7039 16.0274C8.05089 16.0274 5.79677 14.2729 4.98965 11.9092L4.98548 11.9034Z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M1.59479 5.51822C0.899092 6.86363 0.500244 8.38184 0.500244 10C0.500244 11.6182 0.899092 13.1364 1.59479 14.4818C1.59479 14.4908 4.99004 11.9 4.99004 11.9C4.78596 11.3 4.66533 10.6636 4.66533 9.9999C4.66533 9.33617 4.78596 8.69984 4.99004 8.09984L1.59479 5.51822Z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M10.7042 3.98184C12.207 3.98184 13.5428 4.49092 14.6096 5.47275L17.5316 2.60914C15.7598 0.990976 13.4593 0 10.7042 0C6.7153 0 3.27377 2.24546 1.59473 5.51822L4.98988 8.10005C5.79688 5.73638 8.0511 3.98184 10.7042 3.98184Z"
                                                    fill="#EA4335"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <span className="font-social">
                                        Google Account
                                    </span>
                                </button>
                                <button
                                    className="social-container"
                                    type="button"
                                >
                                    <div className="social-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                        >
                                            <path
                                                d="M21.4144 8.1816C21.2752 8.2896 18.8176 9.6744 18.8176 12.7536C18.8176 16.3152 21.9448 17.5752 22.0384 17.6064C22.024 17.6832 21.5416 19.332 20.3896 21.012C19.3624 22.4904 18.2896 23.9664 16.6576 23.9664C15.0256 23.9664 14.6056 23.0184 12.7216 23.0184C10.8856 23.0184 10.2328 23.9976 8.74 23.9976C7.2472 23.9976 6.2056 22.6296 5.008 20.9496C3.6208 18.9768 2.5 15.912 2.5 13.0032C2.5 8.3376 5.5336 5.8632 8.5192 5.8632C10.1056 5.8632 11.428 6.9048 12.424 6.9048C13.372 6.9048 14.8504 5.8008 16.6552 5.8008C17.3392 5.8008 19.7968 5.8632 21.4144 8.1816ZM15.7984 3.8256C16.5448 2.94 17.0728 1.7112 17.0728 0.4824C17.0728 0.312 17.0584 0.1392 17.0272 0C15.8128 0.0456 14.368 0.8088 13.4968 1.8192C12.8128 2.5968 12.1744 3.8256 12.1744 5.0712C12.1744 5.2584 12.2056 5.4456 12.22 5.5056C12.2968 5.52 12.4216 5.5368 12.5464 5.5368C13.636 5.5368 15.0064 4.8072 15.7984 3.8256Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-social">
                                        Apple Account
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="align-left font-social">
                    Don't have an account?&nbsp;
                    <Link className="font-gradient" to={'/register'}>
                        Sign Up
                    </Link>
                </div>
            </div>
            <div className="bg-image sunset"></div>
        </div>
    );
};

export default Login;
