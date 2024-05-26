import React, { useEffect, useRef } from 'react'
import NavBar from '../../components/NavBar'
import './login.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import userActionTypes from '../../redux/user/userActionTypes';
import { getLoggedUser } from '../../redux/user/userSelector';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const user = useSelector(getLoggedUser);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const inputData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
  };
  dispatch({ type: userActionTypes.SIGN_IN_START, payload: inputData });
  }

  function handleClick(event){
    navigate('/register');
}

useEffect(() => {
  if (user) {
      navigate('/dashboard');
  }
}, [user])

  return (
    <div style={{
      boxSizing: 'border-box',
      margin: '0px'
    }}>
      <NavBar />

      <div className='loginContainer'>

        <h2>Login</h2>

        {/* <button>
          <div></div>
          <span>Sign In With Google</span>
        </button> */}

        <form onSubmit={handleSubmit}>
          <div className='loginForm'>
            <label>Email</label>
            <input ref={emailRef} placeholder='xyz@gmail.com' type='email' required />

            <label>Password</label>
            <input ref={passwordRef} placeholder='password' type='password' required />

            {/* <div className='loginRemember'>
              
            </div> */}

            <h4><a>Forgot Password?</a></h4>
            
            <button type='submit'>Submit</button>

            <h6>Don't have an account? <a onClick={handleClick}>Sign Up</a></h6>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login