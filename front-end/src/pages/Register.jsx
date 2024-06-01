import React, { useState } from 'react';
import httpClient from '../httpClient';
import { Link } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [degree, setDegree] = useState('');
    const [termsChecked, setTerms] = useState(false);

    const signUpUser = async () => {
        if (
            !termsChecked ||
            email == '' ||
            password == '' ||
            firstName == '' ||
            lastName == '' ||
            degree == ''
        ) {
            return;
        }
        try {
            await httpClient.post('//localhost:5000/register', {
                email,
                password,
                firstName,
                lastName,
                degree,
            });

            window.location.href = '/';
        } catch (e) {
            if (e.response.status === 409) {
                alert(e.response.data.error);
            }
        }
    };

    return (
        <div className="register-page">
            <div className="content">
                <div className="studymate-container">
                    <div className="align-left">
                        <img src="./brand.svg" className="logo" />
                    </div>
                    <div className="align-right align-middle">
                        <Link className="font-gradient" to={'/login'}>
                            Log In
                        </Link>
                    </div>
                </div>
                <div className="column-container">
                    <div className="login-content align-center">
                        <div className="row-gap">
                            <div className="login-welcome">
                                Welcome aboard! Let's start your educational
                                journey together.
                            </div>
                        </div>
                        <form className="login-form">
                            <div className="row-gap">
                                <div className="column-gap">
                                    <div className="column-container">
                                        <label
                                            className="column-label align-left"
                                            htmlFor="firstName"
                                        >
                                            First Name
                                        </label>
                                        <div className="input-container">
                                            <input
                                                id="firstName"
                                                placeholder="First Name"
                                                type="text"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setfirstName(e.target.value)
                                                }
                                                className="input input-placeholder"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="column-container">
                                        <label
                                            className="column-label align-left"
                                            htmlFor="lastName"
                                        >
                                            Last Name
                                        </label>
                                        <div className="input-container">
                                            <input
                                                id="lastName"
                                                placeholder="Last Name"
                                                type="text"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setlastName(e.target.value)
                                                }
                                                className="input input-placeholder"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row-gap">
                                <div className="column-gap">
                                    <div className="column-container">
                                        <label
                                            className="column-label align-left"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <div className="input-container">
                                            <input
                                                id="email"
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="input input-placeholder"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="column-container">
                                        <label
                                            className="column-label align-left"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="input-container">
                                            <input
                                                id="password"
                                                placeholder="Password"
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="input input-placeholder"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row-gap">
                                <div className="column-container">
                                    <label
                                        className="column-label align-left"
                                        htmlFor="degree"
                                    >
                                        Current Degree
                                    </label>
                                    <div className="input-container">
                                        <select
                                            id="degree"
                                            value={degree}
                                            onChange={(e) =>
                                                setDegree(e.target.value)
                                            }
                                            className="select"
                                            required
                                        >
                                            <option
                                                defaultValue={''}
                                                disabled
                                                hidden
                                            ></option>
                                            <option value="Elementary">
                                                Elementary education
                                            </option>
                                            <option value="Upper">
                                                Upper secondary education
                                            </option>
                                            <option value="Tertiary">
                                                Tertiary or university education
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-misc">
                                <div className="remember-container">
                                    <input
                                        type="checkbox"
                                        id="remember-checkbox"
                                        onChange={() => setTerms(!termsChecked)}
                                        checked={termsChecked}
                                        required
                                    />
                                    <label
                                        className="remember-label"
                                        htmlFor="remember-checkbox"
                                    >
                                        I agree with&nbsp;
                                        <a
                                            className="font-gradient"
                                            target="_blank"
                                            href="https://github.com/elmalving/Hackathon-2023/blob/main/LICENSE"
                                        >
                                            Terms and conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                className="submit-button submit-label"
                                type="button"
                                onClick={() => signUpUser()}
                            >
                                Create an account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-image illustration"></div>
        </div>
    );
};

export default Register;
