import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function GetStarted() {
  const navigate = useNavigate();

  function handleClick(event){
    navigate('/login'); 
  }

  return (
    <div className='GetStarted'>
        <div className='GetStartedImage'>

        </div>

        <h1>Welcome to Placement Cell,<span>NIT Kurukshetra</span> </h1>
        <button onClick={handleClick}>Get Started</button>
    </div>
  )
}

export default GetStarted;