import React, { useEffect, useState } from 'react'
import "./Left.css"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GroupIcon from '@mui/icons-material/Group';
import defaultuser from "../../defaultUser/defaultuser.png"
import group from "../Images/group.png"
import market from "../Images/market.png"
import watch from "../Images/watch.png"
import saved from "../Images/saved.png"
import memories from "../Images/memories.png"
import pages from "../Images/pages.png"
import friend from "../Images/friend.png"
import anil from "../Images/anil.jpg"
import CloseIcon from '@mui/icons-material/Close';
import axios, { all } from "axios"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import { setUserSuggestions,setUserFollowers,setUserFollowings } from '../../redux';


const Left = () => {
    const [showFriend,setShowFriend]=useState(false);
    const [friendBox,setFriendBox]=useState(1);
    const user=useSelector((state)=>state.user)
    const token=useSelector((state)=>state.token)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userSuggestions=useSelector((state)=>state.user.suggestions)
    const useFollowers=useSelector((state)=>state.user.followers)
    const userFollowings=useSelector((state)=>state.user.followings)
    
    


    


   

    

     

    const getAllSuggestion=async()=>{
        await axios.get("/user",{userId:user._id},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            const s=res.data;
            console.log(s)
            
            dispatch(setUserSuggestions({suggestions:s}))
        }).catch((err)=>{
            console.log("error while fetching suggestion")
        })
    }

    const setSuggestion=()=>{
        setFriendBox(1)
    }

    const setFollower=()=>{
        setFriendBox(2)
    }

    const setFollowing=async()=>{
        
        // fetchAllSentRequest();
        setFriendBox(3)

        
    }

    useEffect(()=>{
        getAllSuggestion();
    })
  


  return (
    <>
        <ul>
            <li>
                <div className='leftImgUser'>
                    <img src={`http://localhost:5000/public/assets/${user.picturePath}`} alt="" />
                </div>
                <h5 style={{textTransform:"capitalize"}}>{user.name}</h5>
            </li>
            <li onClick={()=>setShowFriend(!showFriend)}>
                <div className='leftImg' ><img src={friend} alt="" /></div>
                <h5>Friends</h5>
               
            </li>
            
            {showFriend && <li className='friendListBox'>
                    <div className="boxControl">
                        <div className="div" onClick={setSuggestion} >Suggestion</div>
                        <div className="div" onClick={setFollowing}>Following</div>
                        <div className="div" onClick={setFollower}>Followers</div>
                    </div>
                    <div className="friendList">
                        {/* all user */}
                        {friendBox === 1 &&(
                            <>

                            </>
                            // allUser.map((u)=>
                            // (<></>)
                            // // (<Friend data={u} key={u._id}/>)
                                
                            // )
                        )}

                       {/* request recived */}
                        {friendBox === 2 && (<></>)}
                       
                       {/* request sent */}
                        {friendBox=== 3  && (
                           <></>
                                // <SentRequest/>
                        )}
                    </div>
                </li>}
            <li>
                <div className='leftImg'><img src={group} alt="" /></div>
                <h5>Groups</h5>
            </li>
            <li>
                <div className='leftImg'><img src={market} alt="" /></div>
                <h5>Market Place</h5>
            </li>
            <li>
                <div className='leftImg'><img src={watch} alt="" /></div>
                <h5>Watch</h5>
            </li>
            <li>
                <div className='leftImg'><img src={memories} alt="" /></div>
                <h5>Memories</h5>
            </li>
            <li>
                <div className='leftImg'><img src={saved} alt="" /></div>
                <h5>Saved</h5>
            </li>
            <li>
                <div className='leftImg'><img src={pages} alt="" /></div>
                <h5>Pages</h5>
            </li>
            <li>
                {/* <div className='leftImg'><img src={pages} alt="" /></div> */}
                <h5 onClick={()=>{navigate("/subscribe")}}>Subscribe</h5>
            </li>
          
           
            

        </ul>
    </>
  )
}

export default Left