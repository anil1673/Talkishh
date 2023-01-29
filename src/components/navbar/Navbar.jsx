import React, { useContext, useState } from 'react'
import "./Navbar.css";
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import Profileimage from "../Images/profile.jpg"
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom'
import defaultuser from '../../defaultUser/defaultuser.png'
import { useDispatch, useSelector } from 'react-redux';
import logo from "../Images/logo.png"
import { setLogout } from '../../redux';


const Navbar=()=> {
  const [mobile,setMobile]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const user=useSelector((state)=>state)

  const logoutControl=()=>{
    dispatch(setLogout())
    navigate("/")
    
  }


  window.addEventListener("resize",()=>{
    if(window.innerWidth>800){
               setMobile(false);
  
          }
  })


// ********************************************ON PAGE CHANGE*******************************
  window.addEventListener("reload",()=>{
    console.log("rendered");
  })


  
// ***************************************ON WINDOW SCROLL***********************************

  window.addEventListener("scroll",()=>{
    if(window.scrollY>50){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  })


  return (
    <div className='mainNavbar'>
          <div className='LogoContainer'>
                    <div className="logo" style={{}}>
                      <img src={logo} alt="" />
                    </div>
          </div>
          <div>
                    <div className='searchInputContainer'>
                              <img src={`${searchIcon}`} className="searchIcon" alt="" />
                              <input type="text" className='searchInput' placeholder='search your friends' name="" id="" />
                    </div>
          </div>
          <div className='IconsContainer'>
                    <NotificationsIcon className='icons' />
                    <MessageIcon className='icons' />
                    
                    
                    <NavLink to="/about">
                      <div  className='photoContainer'>
                                <img src={user.picturePath===""?defaultuser:`http://localhost:5000/public/assets/${user.user.picturePath}`} className="ProfileImage" alt="" />
                                {/* <img src={defaultuser} className="ProfileImage"/> */}
                      </div>
                    </NavLink>
                   
                    <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} >
                      <p onClick={logoutControl}><LogoutIcon/></p>
                    </div>
          </div>
    </div>
  )
}

export default Navbar