import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export function RetroFooter() {
    return (
    <footer className="footer">
        <NavLink to="about">About</NavLink><br/>
        <span className="lined">Created by Travis Moody</span><br/>
        <a href="https://github.com/04tmoody/startup">GitHub</a><br/>
    </footer>
    );
}