import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components.css";

import {
    FaLeaf,
    FaHome,
    FaTachometerAlt,
    FaSeedling,
    FaCloudSun,
    FaUserCircle,
    FaSignInAlt,
    FaRobot
} from "react-icons/fa";

import { GiPlantRoots } from "react-icons/gi";

const Navbar = ({ transparent = false }) => {

    const [scroll, setScroll] = useState(false);

    useEffect(() => {

        if (!transparent) return;

        const handleScroll = () => {
            const heroHeight = window.innerHeight - 80;
            setScroll(window.scrollY >= heroHeight);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [transparent]);

    const navbarClass = transparent
        ? (scroll ? "homeNavbar scrolled" : "homeNavbar")
        : "homeNavbar scrolled";

    return (

        <nav className={navbarClass}>

            <div className="logo">
                <FaLeaf className="logoIcon" />
                <span>AgriSmart</span>
            </div>

            <ul className="navLinks">

                <li>
                    <Link to="/">
                        <FaHome />
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/dashboard">
                        <FaTachometerAlt />
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/crops">
                        <GiPlantRoots />
                        Crop Records
                    </Link>
                </li>

                <li>
                    <Link to="/schemes">
                        <FaSeedling />
                        Schemes
                    </Link>
                </li>

                <li>
                    <Link to="/weather">
                        <FaCloudSun />
                        Weather
                    </Link>
                </li>

                <li>
                    <Link to="/chatbot">
                        <FaRobot />
                        AI Chatbot
                    </Link>
                </li>

                <li>
                    <Link to="/profile">
                        <FaUserCircle />
                        Profile
                    </Link>
                </li>

                <li className="loginBtn">
                    <Link to="/login">
                        <FaSignInAlt />
                        Login
                    </Link>
                </li>

            </ul>

        </nav>

    );
};

export default Navbar;