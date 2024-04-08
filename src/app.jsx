import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import RetroHeader from './retroheader';
import RetroFooter from './retrofooter';

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
    <div className='body bg-dark text-light'>

        <RetroHeader isLoggedIn={isLoggedIn}/>
        App will display here
        <RetroFooter />
    
    </div>
  );
}