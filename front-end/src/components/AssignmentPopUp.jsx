import React, { useRef, useState, useEffect } from "react";
import httpClient from "../httpClient.jsx";
import '../css/popUp.css';

const AssignmentPopUp = (args) => {
    const assignment = args.assignment;
    const containerRef = useRef(null);
    const [subject, setSubject] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [task, setTask] = useState('');
    const [url, setUrl] = useState('');
    const [answer, setAnswer] = useState('');
    const [comment, setComment] = useState('');
    const [grade, setGrade] = useState('');
    
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

    const submitGrade = async () => {
        if (grade == '') {
            return;
        }
        try {
            await httpClient.post('//localhost:5000/add_grade', {
                grade,
                comment,
                email: args.email,
                rectId: args.rectId
            });

            args.loadAssignments();
            args.onClose();
        }
        catch (e) {
            if (e.response.status === 409) {
                alert(e.response.data.error);
            }
        }
    }

    const submitAnswer = async () => {
        if (answer == '') {
            return;
        }
        try {
            await httpClient.post('//localhost:5000/add_answer', {
                answer,
                rectId: args.rectId
            });

            args.loadAssignments();
            args.onClose();
        }
        catch (e) {
            if (e.response.status === 409) {
                alert(e.response.data.error);
            }
        }
    } 

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
                email: args.email,
                rectId: args.rectId
            });
            
            args.loadAssignments();
            args.onClose();
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
            {assignment ? (
            <div>
                <div className="row-gap">
                    <div className="column-container">
                        <label className="column-label align-left">Subject</label>
                        <div className="value-container">
                            <div className="value-box">
                                {assignment.subject}
                            </div>
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left">Difficulty</label>
                        <div style={{backgroundColor: `${args.color}90`}} className="value-container">
                            <div className="value-box">
                                {args.assignment.difficulty.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left">Task</label>
                        <div className="value-container">
                            <div className="value-box">
                                {assignment.text}
                            </div>
                        </div>
                    </div>
                    {assignment.url &&
                    <div className="column-container">
                        <label className="column-label align-left">Exercise Link</label>
                        <div className="value-container url">
                            <div className="value-box">
                                <a target="_blank" href={assignment.url}>{assignment.url}</a>
                            </div>
                        </div>
                    </div>}
                    <div className="column-container">
                        <label className="column-label align-left">Date Assigned</label>
                        <div className="value-container">
                            <div className="value-box">
                                {assignment.assigned_date}
                            </div>
                        </div>
                    </div>
                    {assignment.answer && args.userEmail === args.admin ? (
                    <>
                    <div className="column-container">
                        <label className="column-label align-left">Answer</label>
                        <div className="value-container">
                            <div className="value-box">
                                {assignment.answer}
                            </div>
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="comment">Comment</label>
                        <div className="input-container">
                            <textarea
                                id="comment"
                                placeholder="Write a comment (if necessary)"
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="textarea input-placeholder"
                            />
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="grade">Grade</label>
                        <div className="input-container">
                            <select
                                id="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="select"
                                required
                                >
                                <option defaultValue={''} disabled hidden></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <button className='submit-button submit-label' type='button' onClick={submitGrade}>
                        Evaluate
                    </button>
                    </>
                    ) : (args.userEmail != args.admin &&
                    <>
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="answer">Answer</label>
                        <div className="input-container">
                            <textarea
                                id="answer"
                                placeholder="Write an answer for the given task"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="textarea input-placeholder"
                                required
                            />
                        </div>
                    </div>
                    <button className='submit-button submit-label' type='button' onClick={submitAnswer}>
                        Submit answer
                    </button>
                    </>
                    )}
                </div>
            </div>
            ) : (
            <form>
                <div className="row-gap">
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="subject">Subject</label>
                        <div className="input-container">
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
                        <div className="input-container">
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
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="task">Task</label>
                        <div className="input-container">
                            <textarea
                                id="task"
                                placeholder="Task text"
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="textarea input-placeholder"
                                required
                            />
                        </div>
                    </div>
                    <div className="column-container">
                        <label className="column-label align-left" htmlFor="url">Exercise Link</label>
                        <div className="input-container">
                            <input
                                id="url"
                                placeholder="URL to the exercise (if necessary)"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="input input-placeholder"
                            />
                        </div>
                    </div>
                    <button className='submit-button submit-label' type='button' onClick={createTask}>
                        Create task
                    </button>
                </div>
            </form>
            )}
        </div>
    );
}

export default AssignmentPopUp;