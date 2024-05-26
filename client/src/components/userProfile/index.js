import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelector';
import { useNavigate } from 'react-router-dom';
import { editUserDetails } from '../../httpRequests';
import userActionTypes from '../../redux/user/userActionTypes';

function UserProfile({handleClick}) {
    const [edit,setEdit] = useState(false);
    const user = useSelector(getLoggedUser);
    const navigate = useNavigate();
    const nameRef= useRef();
    const emailRef=useRef();
    const dobRef=useRef();
    const genderRef=useRef();
    const collegeRef=useRef();
    const courseRef=useRef();
    const batchRef=useRef();
    const rollNumberRef=useRef();
    const addressRef=useRef();
    const cgpaRef=useRef();
    const mobileNumberRef=useRef();
    const dispatch= useDispatch();

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            name:nameRef.current.value,
            dob:dobRef.current.value,
            gender:genderRef.current.value,
            college:collegeRef.current.value,
            course:courseRef.current.value,
            batch:batchRef.current.value,
            rollNumber:rollNumberRef.current.value,
            address:addressRef.current.value,
            cgpa:cgpaRef.current.value,
            mobileNumber:mobileNumberRef.current.value
        }
        const toSend = {
            data:data,
            email:emailRef.current.value,
        }
        dispatch({type:userActionTypes.EDIT_DETAILS_START,payload:{data:toSend,token:user.token}});
        handleCancel();
    }

    function handleCancel(event){
        setEdit((prev)=>!prev);
    }   

    useEffect(()=>{
        if(!user)
            navigate('/');
    })

  return (
    <div className='userProfile'>
        <div className='upAbout'>
            <h4>About 
                {
                    !edit?<button onClick={handleCancel}>Edit</button>:<button onClick={handleCancel}>Cancel</button>
                }
                </h4>
                <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td className='upLeft'>Full Name:</td>
                    <td><input 
                    defaultValue={user &&user.name?user.name:''} 
                    type='text'
                    disabled={!edit}
                    ref={nameRef}
                    required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Date of Birth:</td>
                    <td><input defaultValue={user && user.dob?new Date(user.dob).toISOString().split('T')[0]
:''} 
                    type='date'
                     disabled={!edit} 
                     ref={dobRef}
                     style={{cursor:'pointer'}}
                     required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Gender:</td>
                    <td><select ref={genderRef} disabled={!edit} required>
                        <option defaultValue='Male' selected={user&&user.course==='Male'}>Male</option>
                        <option defaultValue='Female' selected={user&&user.course==='Female'}>Female</option>
                        <option defaultValue='Others' selected={user&&user.course==='Others'}>Others</option>
                        </select></td>
                </tr>
                <tr>
                    <td className='upLeft'>Current College:</td>
                    <td><input ref={collegeRef} defaultValue={user && user.college?user.college:''} type='text' disabled={!edit} required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Current Course:</td>
                    <td><select ref={courseRef} disabled={!edit} required>
                        <option defaultValue='Computer Engineering' selected={user&&user.course==='Computer Engineering'}>Computer Engineering</option>
                        <option defaultValue='Civil Engineering' selected={user&&user.course==='Civil Engineering'}>Civil Engineering</option>
                        <option defaultValue='Electronics and Communication Engineering' selected={user&&user.course==='Electronics and Communication Engineering'}>Electronics and Communication Engineering</option>
                        <option defaultValue='Electrical Engineering' selected={user&&user.course==='Electrical Engineering'}>Electrical Engineering</option>
                        <option defaultValue='Mechanical Engineering' selected={user&&user.course==='Mechanical Engineering'}>Mechanical Engineering</option>
                        <option defaultValue='Production and Industrial Engineering' selected={user&&user.course==='Production and Industrial Engineering'}>Production and Industrial Engineering</option>
                        <option defaultValue='Information Technology' selected={user&&user.course==='Information Technology'}>Information Technology</option>
                        </select></td>
                </tr>
                <tr>
                    <td className='upLeft'>Batch:</td>
                    <td><input ref={batchRef} defaultValue={user && user.batch?user.batch:''} type='number' maxLength='4' disabled={!edit} required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Roll Number:</td>
                    <td><input ref={rollNumberRef} defaultValue={user && user.rollNumber?user.rollNumber:''} type='number' disabled={!edit} maxLength='8' required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Address:</td>
                    <td><input ref={addressRef} disabled={!edit} defaultValue={user && user.address?user.address:''} required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>CGPA</td>
                    <td><input ref={cgpaRef} disabled={!edit} defaultValue={user&&user.cgpa?user.cgpa.$numberDecimal:0} step='.001' type='decimal' maxLength='5' max='10' min='0' required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Email</td>
                    <td><input ref={emailRef} disabled={true} defaultValue={user && user.email?user.email:''}  type='email' required/></td>
                </tr>
                <tr>
                    <td className='upLeft'>Mobile Number</td>
                    <td><input ref={mobileNumberRef} disabled={!edit} defaultValue={user && user.mobileNumber?user.mobileNumber:''} type='number' minLength='10' maxLength='10' required/></td>
                </tr>
            </table>
                
            {edit?<div className='upSubmitHolder'><input className='upSubmit'  type='submit'  defaultValue='Save'/></div>:<></>}
                </form>
        </div>
    </div>
  )
}

export default UserProfile