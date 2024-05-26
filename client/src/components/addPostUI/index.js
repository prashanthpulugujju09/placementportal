import React, { useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import postActionTypes from '../../redux/post/postActionTypes';

function AddPostUI({handleClick}) {
    const hRef= useRef();
    const dRef = useRef();
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch();
    

    function handleSubmit(event){
        event.preventDefault();
        const temp = {
            data:{
                heading:hRef.current.value,
                description:dRef.current.value,
                createdBy:user.name
            },
            email:user.email
        };
        dispatch({type:postActionTypes.CREATE_POST_START,
        payload:{data:temp,token:user.token}});
        handleClick();
    }

  return (
    <div className='addPostContainer'>
            <div className='addPost'>
                <h4>Add Post 
                    <button className='apSubmit' style={{margin:'0px'}} onClick={handleClick}>Cancel</button>
                </h4>
                <form onSubmit={handleSubmit}>
                    <table className='apTable'>
                        <tr>
                            <td className='apLeft'>Heading:</td>
                            <td><input
                                type='text'
                                ref={hRef}
                                required /></td>
                        </tr>
                        <tr>
                            <td className='apLeft'>Description:</td>
                            <td><input
                                type='textarea'
                                ref={dRef}
                                required /></td>
                        </tr>
                    </table>
                    <div className='apSubmitHolder'><input className='apSubmit' type='submit' defaultValue='Save' /></div> 
                </form>
            </div>
            
        </div>
  )
}

export default AddPostUI