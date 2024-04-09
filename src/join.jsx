import React from 'react';

export function Join() {
  return (
    <main className="join-main">
        <form className="join" action="index.html" method="get" onsubmit="create(event)">
            <h1 style={{color: "black", fontFamily: 'Press Start 2P', fontSize: "20px"}}>Create<br/>Account</h1><br/><br/>
            <label htmlFor="username2">Username:</label>
            <input type="text" id="username2" placeholder="Username"  name="username2" required/><br/>
            <label htmlFor="password2">Password:</label>
            <input type="password" id="password2" placeholder="Password" name="password2" required/><br/>
            <p id="error2" style={{padding: 0, margin: 0, fontSize: "11px", color:"red", display:"none"}}>Username Taken</p>
            <input type="submit" className="submit" value="Create Account"/>
        </form>
    </main>
  );
}