import React, { useEffect,useState } from 'react';
import './JobProfile.css';
import JobCard from '../../components/jobCard';
import { useDispatch, useSelector } from 'react-redux';
import jobActionTypes from '../../redux/job/jobActionTypes';
import AddJob from '../../components/addJobUI/AddJob';

function JobProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const jobs = useSelector((state)=>state.job);
  const [showJobUI,setJobUI] = useState(false);
  console.log(jobs);

  function handleAddJob(event){
    console.log('clicked');
     setJobUI((prev)=>!prev);
  }

  useEffect(()=>{
    dispatch({type:jobActionTypes.FETCH_ALL_JOBS_START,payload:{token:user.token}})
  },[]);

  useEffect(()=>{

  },[jobs]);

  return (

    <div className='jobprofile'>
        <table className='jpTable'>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Deadline</th>
              <th>Location</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs?jobs.map((job,idx)=>{
                return <JobCard {...job}  key={idx}/>
              })
              :<></>
            }
            
          </tbody>
        </table>
        {
          user&&user.role!=='student'?
        <div className='jpAdd' onClick={handleAddJob}>

        </div>
          :<></>
        }
        {
          showJobUI?
            <AddJob handleClick={handleAddJob}/>
            :<></>
        }
    </div>
  )
}

export default JobProfile