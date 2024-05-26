import React, { useEffect, useRef, useState } from 'react'
import './JobDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { jobRequest } from '../../httpRequests';
import Delete from '../../assets/bin.png';
import jobActionTypes from '../../redux/job/jobActionTypes';
import userActionTypes from '../../redux/user/userActionTypes';

function JobDetails({handleChange,companyLogo,companyName,location,position,category,salary,eligibility,description,course,deadline,_id}) {
    const user = useSelector((state)=>state.user);
    const disable = user.resume.length===0;
    const isEligible = eligibility.filter((item)=>item===course);
    const val = new Date() >new Date(deadline);
    const [d,setD] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();
    const withDraw = user? user.applications.filter((item)=>item.application === _id).length>0 :false;
    console.log(withDraw);
    // console.log(deadline);

    function changeVisibility(event){
        setD((prev)=>!prev);
    }

    async function handleDelete(event){
        const endpoint ='jobprofiles/delete';
        const temp = {
            email:user.email,
            _id
        };
        const response = await jobRequest(temp,user.token,endpoint,'POST');
        console.log(response);
        if (response.status === 'ok') {
            const parent=document.querySelector('.jobDetails');
            parent.style.display='none';
            handleChange();
            dispatch({type:jobActionTypes.SUCCESS,payload:response.data});
        }  
    }

    function handleClick(event){
        const parent=document.querySelector('.jobDetails');
        if(event.target===parent){
            parent.style.display='none';
            handleChange();
        }
    }

    async function applyToJob(event){
        console.log(ref.current.value);
        console.log(ref);
        if(ref.current.value){
            const endpoint ='jobprofiles/apply';
        const temp = {
            email:user.email,
            userId:user._id,
            jobId:_id,
            resumeId:ref.current.value
        }
        const response = await jobRequest(temp,user.token,endpoint,'POST');
        console.log(response);
        if (response.status === 'ok') {
            const parent=document.querySelector('.jobDetails');
            parent.style.display='none';
            handleChange();
            dispatch({type:userActionTypes.EDIT_DETAILS_SUCCESS,payload:response.data});
        }  
        }
    }

  return (
    <div className='jobDetails' onClick={handleClick}>
        <div className='jobDetailsCard'>
            <div className='jDRow'>
            <img src={companyLogo} style={{width:'50px',height:'50px',borderRadius:'50%',marginRight:'30px'}} />
            <div>
                <div className='jRole'>{position}</div>
                <div className='jCompany'>{companyName}</div>
                <div className='jCompany'>{location}</div>
            </div>
            </div>
            <div className='jDRow'><span>Category</span>  <span>{category}</span></div>
            <div className='jDRow'><span> Salary</span>  <span>{salary} INR</span></div>
            <div className='jDRow' style={{cursor:'pointer'}} onClick={changeVisibility}><span>Description</span> <span className='jDlimit'> {description?.slice(0,10)+"...."}</span> </div>
            {
                d?
                <div className='jDDes'>
                    {description} 
                    </div>
                    :<></>
            }
            <div className='jDRow'><span>Eligibility</span><span className={`${isEligible?'eligible':'notEligible'}`}>{isEligible?'Eligible':'notEligible'}</span></div>
            {isEligible && !val && !withDraw? 
            <div className='jDRow' style={{boxShadow:'none',marginBottom:'0px'}}>
                <button className={`jdApply ${disable?'jdDisable':''}`} onClick={applyToJob} disabled={disable }>Apply</button>
                {
                    user && user.resume.length>0?
                    <select ref={ref} style={{width:'8rem',height:'2rem',color:'black'}} required>
                        {
                            user.resume.map((item)=>{
                                return <option value={item._id} key={item._id}>{item.name}</option>
                            })
                        }
                    </select>
                    :<span  style={{width:'7rem'}}>Update your resume to apply</span> 
                }
                </div>
                :<></>
            }
            {
                withDraw?
                <div className='jdAA'>Already Applied</div>
                :<></>
            }
            {
                user&&user.role!=='student'?
                    <div className='jdDelete' onClick={handleDelete}>
                        <img src={Delete}  style={{width:'100%',height:'100%'}}/>
                        </div>
                        :<></>
            }
        </div>
    </div>
  )
}

export default JobDetails