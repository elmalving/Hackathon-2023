import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Assignment } from "../types.ts";
import httpClient from "../httpClient.jsx";
import '../css/subject.css';

const Subject = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const subject = useLocation().state;

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@assignment');
                
                setAssignments(response.data.assignments);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        })();
    }, []);

    return (
        <div className="content">
            {assignments.map((assignment, index) => (assignment.subject === subject && assignment.grade &&
            <div key={index} className="assignment-item text">
                <div className="difficulty">Difficulty: {assignment.difficulty.toUpperCase()}</div>
                <div className="date-assigned">Date assigned: {assignment.assigned_date}</div>
                <div className="comment">Comment: sdaasddsasdasdasdasdasdsddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddd{assignment.comment}</div>
                <div className="grade">Grade: {assignment.grade}</div>
            </div>
            ))}
        </div>
    );
}

export default Subject;
