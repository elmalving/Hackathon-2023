import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Schedule from './components/Schedule';
import Progress from './components/Progress';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './pages/NotFound';
import { User } from './types'
import httpClient from "./httpClient";
import './css/main.css'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Roote />}>
                <Route index element={<Chat />} />
                <Route path='/schedule' element={<Schedule />} />
                <Route path='/progress' element={<Progress />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        )
    )
    return (
        <RouterProvider router={router} />
    );
}

const Roote = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const currentPage = useLocation()['pathname'];

    // const logoutUser = async () => {
    //     try {
    //         await httpClient.post('//localhost:5000/logout');
    //         location.reload();
    //     } catch (error) {
    //         console.log('Server error.');
    //     }
    // }
    // <div>
    //     <button onClick={logoutUser}>Logout</button>
    // </div>
    useEffect(() => {
        user === null && currentPage != '/register' && navigate('/login');
        (async () => {
            try {
                const response = await httpClient.get('//localhost:5000/@me');

                setUser(response.data);
            } catch (error) {
                console.log('Not authenticated');
            }
        })();
    }, []);

    return (
        <div className='container'>
            {user === null ? (
                <Outlet />
            ) : (
                <>
                <Navbar />
                <Outlet />
                </> 
            )}
        </div>
    );
}

export default App;
