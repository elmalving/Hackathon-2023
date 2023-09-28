import React, {useRef, useState, useEffect} from "react";
import httpClient from "../httpClient";
import { User } from '../types'

const Chat = () => {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setInput('');
    }

    const proceed_request = async () => {
        if (message) {
            try {
                setIsVisible(false);
                setMessages(prev => [...prev, message]);
                const answer = await httpClient.post('//localhost:5000/analyze_input', {
                    message,
                });
                setMessages(prev => [...prev, answer.data['answer']]);
                if (answer.data['answer'] != 'Bot was unable to provide a satisfactory answer.') {
                    answer.data['material'].forEach((e) => {
                        setMessages(prev => [...prev, e]);
                    }
                )};
                setInput('');
            }
            catch (e) {
                if (e.response) {
                    if (e.response.status === 401) {
                        alert('Invalid credentials.');
                    }
                    else {
                        console.log('Server error.')
                    }
                }
                else {
                    console.log('Server is currently down.')
                }
            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const logoutUser = async () => {
        try {
            await httpClient.post('//localhost:5000/logout');
            location.reload();
        } catch (error) {
            console.log('Server error.');
        }
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
                    {isVisible ? (
                        <div className="frame-4">
                            <div className="welcome">
                                Welcome to StudyMate
                            </div>
                            <div className="welcome-text">
                                We provide unique live chat training to help you achieve your goals and 
                                learn conveniently and efficiently.
                            </div>
                        </div>
                    ) : (
                        <div className="chat-content-container">
                            <div className="chat-content">
                                {messages.map((i, index) => (
                                    <div className="text" key={index}>
                                        {i}
                                    </div>
                                ))}
                                <div ref={messagesEndRef}></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="form-container">
                    <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="message-input">
                            <input
                                className="input"
                                type="text"
                                value={message}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='You can ask me anything! I am here to help.'
                            />
                            <button className="button-icon" type='submit' onClick={() => proceed_request()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.73088 14.2692L19.2337 4.76642M5.48667 7.99807L17.1349 4.11532C18.8344 3.54883 20.4512 5.16564 19.8847 6.8651L16.002 18.5134C15.3895 20.3507 12.8614 20.5304 11.9952 18.7981L10.0549 14.9174C9.84451 14.4967 9.50338 14.1555 9.08267 13.9452L5.20192 12.0048C3.46966 11.1387 3.64933 8.61052 5.48667 7.99807Z" stroke="#CDCECF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Chat;
