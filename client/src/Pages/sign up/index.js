import React, { useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import './index.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userActionTypes from "../../redux/user/userActionTypes";

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const repasswordRef=useRef();
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);

    function handleSubmit(event) {
      event.preventDefault();
      dispatch({type:userActionTypes.SIGN_UP_START
        ,payload:{email:emailRef.current.value,
          password:passwordRef.current.value,
          repassword:repasswordRef.current.value
        }});
    }

    useEffect(()=>{
      if(user){
        navigate('/dashboard');
      }
    });
  
    function handleClick(event){
        navigate('/login');
    }

    return (
      <div style={{
        boxSizing: 'border-box',
        margin: '0px'
      }}>
        <NavBar />
  
        <div className='SignUpContainer'>
  
          <h2>Sign Up</h2>
  
          {/* <button>
            <div></div>
            <span>Sign Up With Google</span>
          </button> */}
  
          <form onSubmit={handleSubmit}>
            <div className='SignUpForm'>
              {/* <div className='SignUpRole'>
                <div>
                <input type='radio' name='role' required value='student'/>
                <label for='student'>Student</label>
                </div>
                <div>
                <input type='radio' name='role' required value='coordinator' />
                <label for='coordinator'>Co-ordinator</label>
                </div>
              </div> */}

              <label>Email</label>
              <input placeholder='xyz@gmail.com' ref={emailRef} type='email' required />
  
              <label>Password</label>
              <input placeholder='password' ref={passwordRef} type='password' required />
  
              <label>Re-Password</label>
              <input placeholder='password' type='password' ref={repasswordRef} required />
              {/* <div className='loginRemember'>
                
              </div> */}
  
              <button type='submit'>Submit</button>
  
              <h6>Already have an account? <a onClick={handleClick}>Sign In</a></h6>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default SignUp