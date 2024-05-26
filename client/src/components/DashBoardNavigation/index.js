import React, { useEffect, useState } from 'react'
import JobProfile from '../../assets/job-profile.png';
import User from '../../assets/user.png';
import Resume from '../../assets/user-profile.png';
import DashBoard from '../../assets/dashboard.png';
import Interview from '../../assets/interview.png';
import './index.css';

function DashBoardNavigation({selectComp}) {
    const [selectedItem,setSelectedItem] = useState(0);

    function handleClick(val){
        setSelectedItem(val);
        selectComp(val)
    }



    return (
        <div className='dashBoardNav'>
             
                    <div className={`dashBoardNavItem ${selectedItem===0?'dashHighlight':''}`} onClick={()=>handleClick(0)}>
                        <img src={DashBoard} style={{width:'2rem',height:'2rem',marginBottom:'10px'}}/>
                        <h6>Dashboard</h6>
                    </div>
                 
                 
                    <div className={`dashBoardNavItem ${selectedItem===1?'dashHighlight':''}`} onClick={()=>handleClick(1)}>
                        <img src={JobProfile} style={{width:'2rem',height:'2rem',marginBottom:'10px'}} />
                        <h6>Job Profiles</h6>
                    </div>
                 
                 
                    <div className={`dashBoardNavItem ${selectedItem===2?'dashHighlight':''}`} onClick={()=>handleClick(2)}>
                        <img src={User} style={{width:'2rem',height:'2rem',marginBottom:'10px'}}/>
                        <h6>My Profile</h6>
                    </div>
                 
                 
                    <div className={`dashBoardNavItem ${selectedItem===3?'dashHighlight':''}`} onClick={()=>handleClick(3)}>
                        <img src={Resume} style={{width:'2rem',height:'2rem',marginBottom:'10px'}}/>
                        <h6>Resume</h6>
                    </div>
                 
             
        </div>
    )
}

export default DashBoardNavigation