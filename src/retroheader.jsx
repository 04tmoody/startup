import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

export function RetroHeader({ isLoggedIn, controls }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Initialize Bootstrap dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', function () {
                const menu = this.nextElementSibling;
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'block';
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (event) {
            const dropdowns = document.querySelectorAll('.dropdown-toggle');
            dropdowns.forEach((dropdown) => {
                const menu = dropdown.nextElementSibling;
                if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
                    menu.style.display = 'none';
                }
            });
        });

        // Cleanup event listeners
        return () => {
            dropdowns.forEach((dropdown) => {
                dropdown.removeEventListener('click');
            });
            document.removeEventListener('click');
        };
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ name: username, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (response.ok) {
                localStorage.setItem("username", username);
                window.location.href = "index.html";
            } else {
                setError("Invalid Username/Password");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("An error occurred during login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        fetch(`/api/auth/logout`, {
            method: 'DELETE',
        }).then(() => (window.location.href = '/'));
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <header>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink style={{ padding: 0 }} className="navbar-brand" to="/">
                            <img src="fulllogo.png" width="200" alt="Logo" />
                        </NavLink>
                    </div>
                    <ul className="navbar-form navbar-left" style={{ display: controls ? "block" : "none" }}>
                        <li>
                            <form className="settings">
                                <label htmlFor="color">Color:</label>
                                <input className='square' type="color" id="color" name="color" defaultValue="#ff0000" />
                                <label htmlFor="grid">Grid:</label>
                                <input className='square' type="checkbox" id="grid" name="grid" defaultChecked />
                            </form>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right" style={{ display: isLoggedIn ? "none" : "block" }}>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Login <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <form className="login" onSubmit={handleLogin}>
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                                        <p style={{ padding: 0, margin: 0, fontSize: "11px", color: "red", display: error ? "block" : "none" }}>{error}</p>
                                        <button type="submit" className="submit">Login</button>
                                    </form>
                                </li>
                                <li><NavLink to="/join" activeClassName="active"><i>Or Create Account</i></NavLink></li>
                            </ul>
                        </li>
                    </ul>
                    <button className="nav navbar-nav navbar-right logout" onClick={handleLogout} style={{ display: isLoggedIn ? "block" : "none" }}>
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
}