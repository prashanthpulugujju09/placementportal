import './index.css';
import React, { useState } from 'react';
import {RxCross1} from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const NavBar=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const navigate = useNavigate();
    
    function handleHamBurgerClick(event){
        setIsOpen((prev)=>{
            return !prev;
        });
    }

    function handleClick(event){
        const val=event.target.innerText;
        if(val==='Login')
            navigate('/login')
        else if(val==='Home')
            navigate('/')
        else if(val==='Register')
            navigate('/register')
    }

    return (
        <>
        <div className='NavBar'>
            <div className='logo'>
            </div>

                <ul className='centerNavigation'>
                    <li onClick={handleClick}>Home</li>
                    <li onClick={handleClick}>Login</li>
                    <li onClick={handleClick}>Register</li>
                    {/* <li onClick={handleClick}>Contact</li> */}
                </ul>
                <div className='NavEnding'>
                {/* <button className='faq'> FAQ</button> */}
                <div className='hamburger-icon' onClick={handleHamBurgerClick}>

                </div>
                </div>
        </div>
        {
            isOpen?
            <div className='NavBarMobile'>
                    <ul className='NavMenuItem'>
                        <li>Home</li>
                        <li>Login</li>
                        <li>Register</li>
                        {/* <li>Contact</li> */}
                    </ul>
                    <RxCross1 style={{width:'30px'
                    ,height:'30px',
                    color:'white',
                    marginTop:'2rem',
                    marginRight:'1rem',
                    cursor:'pointer'}}
                    onClick={handleHamBurgerClick}
                    />
                </div>
                :<></>
        }
        </>
    );
}

export default NavBar;