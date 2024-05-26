import React,{useEffect} from 'react'
import LogOut from '../../assets/turn-off.png';
import Setting from '../../assets/setting.png';
import Logo from '../../assets/nitlogo.png';
import Bell from '../../assets/bell.png';
import './index.css';
import userActionTypes from '../../redux/user/userActionTypes';
import {useDispatch,useSelector} from 'react-redux';
import {getLoggedUser} from '../../redux/user/userSelector';
import { useNavigate } from 'react-router-dom';

function DashBoardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getLoggedUser);

  function handleLogOut(event){
    dispatch({type:userActionTypes.SIGN_OUT});
  }

  useEffect(()=>{
    if(!user){
      navigate('/');
    }
  })

  return (
    <div className='dashBoardHeader'>
        <div className='dashBoardLeft'>
            <img src={Logo} style={{width:'3rem',height:'3rem',marginLeft:'30px'}}/>
        <div>DashBoard</div>
        </div>
        <div className='dashBoardRight'>
            {/* <img src={Setting} style={{width:'2rem',height:'2rem',marginLeft:'40px'}}/> */}
            {/* <img src={Bell} style={{width:'2rem',height:'2rem',marginLeft:'40px'}}/> */}
            <img src={LogOut} onClick={handleLogOut} style={{width:'2rem',height:'2rem',marginLeft:'40px'}}/>
        </div>
    </div>
  )
}

export default DashBoardHeader