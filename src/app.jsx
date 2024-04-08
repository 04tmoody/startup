import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { RetroHeader } from './retroheader';
import { RetroFooter } from './retrofooter';
import { Main } from './main';
import { Join } from './join';
import { About } from './about';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Function to check localStorage and update isLoggedIn state
        const updatePage = () => {
        const user = localStorage.getItem("username");
        setIsLoggedIn(user ? true : false);
    };

    // Call the updatePage function when the component mounts
    updatePage();

    // Subscribe to changes in localStorage
    window.addEventListener("storage", updatePage);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("storage", updatePage);
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <div className='body'>

        <RetroHeader isLoggedIn={isLoggedIn}/>
        
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<h1>404: Not Found</h1>} />
        </Routes>

        <RetroFooter />
    
    </div>
  );
}