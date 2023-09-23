import React, {useState, useEffect} from "react";
import httpClient from "../httpClient";
import { User } from '../types'

const Chat = () => {
    const [user, setUser] = useState<User | null>(null);
    const [message, updateMessage] = useState<string>("");

    const proceed_request = async () => {
        try {
            const answer = await httpClient.post('//localhost:5000/analyze_input', {
                message,
            });
            console.log(answer.data)
        }
        catch (e) {
            if (e.response.status === 401) {
                alert('Invalid credentials.');
            }
            else {
                console.log(e)
            }
        }
    };

    const logoutUser = async () => {
        const response = await httpClient.post('//localhost:5000/logout');
        location.reload();
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@me');
                
                setUser(response.data);
            } catch (error) {
                console.log('Not authenticated');
            }
        })();
    }, []);

    if (user != null) {
        return (
            <div>
                <button onClick={logoutUser}>Logout</button>
            </div>
        );
    }
    else {
        return (
            <div className="content">
                <div className="chat">
                    <div className="frame-4">
                        <div className="welcome">
                            Welcome to StudyMate
                        </div>
                        <div className="text">
                            We provide unique live chat training to help you achieve your goals and 
                            learn conveniently and efficiently.
                        </div>
                    </div>
                </div>
                <form className="message-input layout">
                    <input 
                        className="input"
                        type="text" 
                        onChange={(e) => updateMessage(e.target.value)}
                        placeholder='You can ask me anything! I am here to help.'
                    />
                    <button className="button-icon" type='button' onClick={() => proceed_request()}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9.73088 14.2692L19.2337 4.76642M5.48667 7.99807L17.1349 4.11532C18.8344 3.54883 20.4512 5.16564 19.8847 6.8651L16.002 18.5134C15.3895 20.3507 12.8614 20.5304 11.9952 18.7981L10.0549 14.9174C9.84451 14.4967 9.50338 14.1555 9.08267 13.9452L5.20192 12.0048C3.46966 11.1387 3.64933 8.61052 5.48667 7.99807Z" stroke="#CDCECF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

export default Chat;
