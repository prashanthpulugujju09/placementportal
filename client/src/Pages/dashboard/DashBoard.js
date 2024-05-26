import React, { useEffect, useState } from 'react'
import './DashBoard.css'
import DashBoardNavigation from '../../components/DashBoardNavigation'
import DashBoardHeader from '../../components/DashBoardHeader'
import DashboardCard from '../../components/dashboardCard'
import JobProfile from '../job profile/JobProfile'
import UserProfile from '../../components/userProfile'
import ResumeCard from '../../components/resumeCard'
import AddJob from '../../components/addJobUI/AddJob'
import { useDispatch, useSelector } from 'react-redux'
import postActionTypes from '../../redux/post/postActionTypes'
import AddPostUI from '../../components/addPostUI'
import userActionTypes from '../../redux/user/userActionTypes'

function DashBoard() {
  const [select,setSelect] = useState(0);
  const posts = useSelector(state=>state.posts);
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  console.log(posts);
  const [showPostUI,setPostUI] = useState(false);

  function handleClick(val){
      setSelect(val);
  }

  useEffect(()=>{
    dispatch({type:userActionTypes.FETCH_USER,payload:{token:user.token}})
    dispatch({type:postActionTypes.FETCH_ALL_POSTS_START,payload:{token:user.token}});
  },[])

  function handlePostJob(){
    // console.log('clicked',showPostUI);  
     setPostUI((prev)=>!prev);
  }


  return (
    <div className='dashboard'>
        <DashBoardHeader />
        <DashBoardNavigation selectComp={handleClick} />
        {
          select===0?
          <>
          <div className='dbcHolder'>
          {
            posts.map((item)=>
            <DashboardCard handleClick={handleClick} key={item._id} {...item} />
            )
          }

          <div className='dbcinv'></div>
          </div>
          {
            user&&user.role!=='student'?
          <div className='dbAdd' onClick={handlePostJob}>
  
          </div>
            :<></>
          }
          {
            showPostUI?
              <AddPostUI handleClick={handlePostJob}/>
              :<></>
          }
          </>
          : select===1?
          <JobProfile />
          : select === 2?
          <UserProfile />
          :select===3?
          <ResumeCard />
          : <></>
        }
       
    </div>
  )
}

export default DashBoard