import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function RetroFooter() {
    return (
    <footer className="footer">
        <a href="about.html">About</a><br/>
        <span className="lined">Created by Travis Moody</span><br/>
        <a href="https://github.com/04tmoody/startup">GitHub</a><br/>
    </footer>
    );
}