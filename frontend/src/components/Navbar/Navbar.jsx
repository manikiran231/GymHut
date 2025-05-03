import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <div className="navbar-container">
                <div className="logo">
                    <Link to="/">
                        <span>Gym</span><span className="highlight">Hut</span>
                    </Link>
                </div>


                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/login">Membership</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;