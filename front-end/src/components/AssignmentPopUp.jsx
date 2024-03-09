import React, { useRef, useState, useEffect } from "react";
import httpClient from "../httpClient.jsx";
import '../css/popUp.css';

const AssignmentPopUp = (args) => {
    const containerRef = useRef(null);
    const [subject, setSubject] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [task, setTask] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        const container = containerRef.current;

        const checkBoundaries = () => {
            const containerRect = container.getBoundingClientRect();
            if (containerRect.top < 0) {
                container.style.position = 'absolute';
                container.style.top = 0;
                container.style.left = `${containerRect.left}px`;
            }
            if (containerRect.right > innerWidth) {
                container.style.position = 'absolute';
                container.style.top = `${containerRect.top}px`;
                container.style.left = `${innerWidth - containerRect.width}px`;
            }
        };
        checkBoundaries();

        window.addEventListener('resize', checkBoundaries);
    
        return () => {
          window.removeEventListener('resize', checkBoundaries);
        };
    }, []);

    const createTask = async () => {
        if (subject == '' || difficulty == '' || task == '') {
            return;
        }
        try {
            await httpClient.post('//localhost:5000/add_assignment', {
                subject,
                difficulty,
                task,
                url,
                rectId: args.rectId
            });

            location.reload();
        }
        catch (e) {
            if (e.response.status === 409) {
                alert(e.response.data.error);
            }
        }
    }

    return (
        <div id="popUp" ref={containerRef} className="popUp-container">
            <div className="align-right">
                <button onClick={args.onClose} className="close">x</button>
            </div>
        
            <form className="login-form">
                <div className="row-gap">
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="subject">Subject</label>
                        <div className="select-container">
                            <select
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="select"
                                required
                                >
                                <option defaultValue={''} disabled hidden></option>
                                <option value="Math">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Czech Language">Czech Language</option>
                                <option value="Geography">Geography</option>
                            </select>
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="difficulty">Difficulty</label>
                        <div className="select-container">
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="select"
                                required
                                >
                                <option defaultValue={''} disabled hidden></option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className="column-container column-gap">
                        <label className="column-label align-left" htmlFor="task">Task</label>
                        <div className="input-container">
                            <input
                                id="task"
                                placeholder="Task text"
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="input login-input"
                                required
                            />
                        </div>
                    </div>
                    <div className="column-container column-gap">
                        <label className="column-label align-left" htmlFor="url">Exercise Link</label>
                        <div className="input-container">
                            <input
                                id="url"
                                placeholder="URL to the exercise (if necessary)"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="input login-input"
                            />
                        </div>
                    </div>
                </div>
                <button className='submit-button submit-label' type='button' onClick={createTask}>
                    Create task
                </button>
            </form>
        </div>
    );
}

export default AssignmentPopUp;