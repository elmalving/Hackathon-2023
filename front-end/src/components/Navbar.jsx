import { Link } from 'react-router-dom';
import '../css/style.css'

const Navbar = () => {
    return (
        <div>
            <div className='nav'>
                <Link to={'/'}>Chat</Link>
                <Link to={'/progress'}>Progress</Link>
                <Link to={'/schedule'}>Schedule</Link>
            </div>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
        </div>
    );
}

export default Navbar;
