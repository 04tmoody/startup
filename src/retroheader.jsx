import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function RetroHeader() {
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
                    <label for="color">Color:</label>
                    <input className='square' type="color" id="color" name="color" value="#ff0000" />
                    <label for="grid">Grid:</label>
                    <input className='square' type="checkbox" id="grid" name="grid" checked />
                    </form>
                </li>
                </ul>
                <ul className="nav navbar-nav navbar-right" id="login">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Login <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li>
                        <form className="login" action="index.html" method="get" onsubmit="login(event)">
                        <label for="username">Username:</label>
                        <input type="text" placeholder="Username" id="username" name="username" required />
                        <label for="password">Password:</label>
                        <input type="password" placeholder="Password" id="password" name="password" required />
                        <p id="error" style={{padding: 0, margin: 0, fontSize: "11px", color:"red", display:"none"}}>Invalid Username/Password</p>
                        <button type="submit" className="submit">Login</button>
                        </form>
                    </li>
                    <li><a href="join.html"><i>Or Create Account</i></a></li>
                    </ul>
                </li>
                </ul>
                <button className="nav navbar-nav navbar-right logout" id="logout" style={{display:"none"}}>
                Logout
                </button>
            </div>
            </nav> 
        </header>
    );
}