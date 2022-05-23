import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
//importing splash screen image
import SplashScreenImage from "../splashscreenlogo.jpg";

import '../App.css';


const App = () => {
  const navigate = useNavigate();
  //loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

return isLoading ?

  <><Fragment><h1 class="logoCaption">Loading...</h1></Fragment>
   
    <img src={SplashScreenImage} isLoading={isLoading} class="splash" alt="SplashScreen" /></> :
 //display splash screen image for 2 seconds
//main page (player entry screen)
  <>
   
    {navigate("/entryscreen")}</>
}

export default App;
