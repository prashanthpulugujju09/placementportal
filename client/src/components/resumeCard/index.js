import React, { useRef } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { uploadResume } from '../../httpRequests';
import userActionTypes from '../../redux/user/userActionTypes';

function ResumeCard() {
    const user = useSelector(state=>state.user);
    const ref1= useRef();
    const ref2 = useRef();
    const dispatch = useDispatch();
   async function handleSubmit(event){
        event.preventDefault();
        const endpoint = 'resume/add';
        const temp = {
            email:user.email,
            data:{
                name:ref1.current.value,
                url:ref2.current.value
            }
        }
        const response = await uploadResume(temp,user.token,endpoint);
        console.log(response);
        if (response.status === 'ok') {
            ref1.current.value='';
            ref2.current.value='';
            dispatch({type:userActionTypes.EDIT_DETAILS_SUCCESS,payload:response.data});
        }
    }
  return (
    <>
   
    <div className='resumeCard'>
        <form onSubmit={handleSubmit}>
            <table>
                 <tr>
                    <td className='rcLeft'>Resume Name</td>
                    <td><input ref={ref1} placeholder='resume-1'  type='text' required/></td>
                </tr>
                <tr>
                    <td className='rcLeft'>Resume Link</td>
                    <td><input ref={ref2}  placeholder='url' type='text' required/></td>
                </tr>
            </table>
            <button type='submit'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default ResumeCard