import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navbar.css';

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">MyApp</Link>
            </div>
            <div className='menu'>
                <div>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/devices">
                        Devices
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
