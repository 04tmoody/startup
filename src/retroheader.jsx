import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './login.js';

export default function RetroHeader({isLoggedIn}) {
    return (
        <header>
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a style={{padding: 0}} className="navbar-brand" href="index.html"><img src="fulllogo.png" width="200"/></a>
                </div>
                <ul className="navbar-form navbar-left">
                <li>
                    <form className="settings">
                    <label htmlFor="color">Color:</label>
                    <input className='square' type="color" id="color" name="color" defaultValue="#ff0000" />
                    <label htmlFor="grid">Grid:</label>
                    <input className='square' type="checkbox" id="grid" name="grid" defaultChecked />
                    </form>
                </li>
                </ul>
                <ul className="nav navbar-nav navbar-right" id="login" style={{display: isLoggedIn ? "none" : "block"}}>
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Login <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li>
                        <form className="login" action="index.html" method="get" onSubmit={login(event)}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Username" id="username" name="username" required />
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Password" id="password" name="password" required />
                        <p id="error" style={{padding: 0, margin: 0, fontSize: "11px", color:"red", display:"none"}}>Invalid Username/Password</p>
                        <button type="submit" className="submit">Login</button>
                        </form>
                    </li>
                    <li><a href="join.html"><i>Or Create Account</i></a></li>
                    </ul>
                </li>
                </ul>
                <button className="nav navbar-nav navbar-right logout" id="logout" style={{display: isLoggedIn ? "none" : "block"}}>
                Logout
                </button>
            </div>
            </nav> 
        </header>
    );
}