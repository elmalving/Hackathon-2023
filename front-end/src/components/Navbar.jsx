import { Link } from 'react-router-dom';
import '../css/style.css'

const Navbar = () => {
    return (
        <div className='nav layout'>
            <div className="workspace nav-item-border">
                <div className="logo"></div>
            </div>
            <div className='general nav-item-border'>
                <Link to={'/'}>Chat</Link>
                <Link to={'/progress'}>Progress</Link>
                <Link to={'/schedule'}>Schedule</Link>
            </div>
            <div className='subject'></div>
            <div className='footer'></div>
        </div>
    );
}

export default Navbar;
