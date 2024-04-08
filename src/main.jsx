import React from 'react';
import './log.js';

export function Main() {
  return (
    <main className="container">
      <div id="sidebar">
        <span id="yourname">{localStorage.getItem('username') ? localStorage.getItem('username') : "Log In to Draw"}</span>
        <div id="message-log">
        <ul style={{listStyleType: 'none', padding: 0}} id="messages">
            <li>Message Log<br/>-----------</li>
          </ul>
        </div>
      </div>
      <div id="canvas-container">
        <canvas id="canvas" width="400px" height="400px"></canvas>
      </div>
    </main>
  );
}