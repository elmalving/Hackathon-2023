import React, { useState } from "react";
import httpClient from "../httpClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = async () => {
        console.log(email, password);

        const response = await httpClient.post('//localhost:5000/login', {
            email,
            password,
        });

        console.log(response.data);
    }

    return (
        <div>
            <h1>Log Into Your Account</h1>
            <form>
                <div>
                    <label>Email: </label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        id=''
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        id=''
                    />
                </div>
                <button type='button' onClick={() => logInUser()}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
