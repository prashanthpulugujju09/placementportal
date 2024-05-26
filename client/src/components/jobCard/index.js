import React, { useState } from 'react'
import './index.css'
import JobDetails from '../jobDetails/JobDetails';

function JobCard(props) {
  const {companyLogo,companyName,position,location,deadline}=props;
  const [select,setSelect] = useState(false);
  const val = new Date() >new Date(deadline);
  const date = new Date(deadline).toDateString();
  // console.log();

  function handleClick(){
    setSelect((prev)=>!prev);
  }

  return (
    <>
    <tr onClick={handleClick}>
        <td><div><img src={companyLogo} style={{width:'30px',height:'30px',borderRadius:'50%'}}/> {companyName}</div></td>
        <td>{position}</td>
        <td>{date}</td>
        <td>{location}</td>
        <td><button disabled={val} >{val? 'Applications Closed':'Applications Open'}</button></td>
    </tr>
    {
      select?<JobDetails {...props}  handleChange={handleClick} />:<></>
    }
    </>
  )
}

export default JobCard