import React from 'react';

export function Join() {
  const createAccount = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username2').value;
    const password = document.getElementById('password2').value;
    const endpoint = '/api/auth/create';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, password: password })
        });
        if (response.ok) {
            localStorage.setItem("username", username);
            window.location.href = '/'; // Redirect to home page after successful account creation
        } else {
            document.getElementById("error2").style.display = "block";
        }
    } catch (error) {
        console.error('Error creating account:', error);
    }
};

return (
  <main className="join-main">
      <form className="join" onSubmit={createAccount}>
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