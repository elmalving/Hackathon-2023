import React, { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Outlet,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Schedule from './pages/Schedule';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Subject from './pages/Subject';
import { User } from './types';
import httpClient from './httpClient';
import './css/main.css';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Roote />}>
                <Route index element={<Chat />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/subject" element={<Subject />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

const Roote = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const currentPage = useLocation()['pathname'];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@me');
                if (currentPage == '/login' || currentPage == '/register') {
                    window.location.href = '/';
                }
                setUser(response.data);
            } catch (error) {
                if (currentPage != '/register') {
                    navigate('/login');
                }
                console.log('Not authenticated');
            }
            setLoading(false);
        })();
    }, []);

    return (
        <div className="container">
            {loading ? (
                <></>
            ) : user === null ? (
                <Outlet />
            ) : (
                <>
                    <Navbar />
                    <Outlet />
                </>
            )}
        </div>
    );
};

export default App;
