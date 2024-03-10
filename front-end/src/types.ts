export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Assignment {
    id: string;
    subject: string;
    difficulty: string;
    text: string;
    url: string;
    assigned_date: string;
    rect: number;
    answer: string;
    comment: string;
    grade: number;
}