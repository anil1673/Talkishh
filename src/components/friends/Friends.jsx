import React from 'react'
import "./Friends.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import axios from 'axios';
import { setFriends } from '../../redux';

const Friends = ({friendId,name,occupation,userPicturePath}) => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user);
  const token=useSelector((state)=>state.token);
  const friends=useSelector((state)=>state.user.friends);

  const isFriends=friends.find((friend)=>friend._id===friendId);

  const patchFriend=async()=>{
    await axios.patch(`/user/${user._id}/${friendId}`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
      const f=res.data
      dispatch(setFriends({friends:f}))
    }).catch((err)=>{
      console.log("error in patchFriend")
    })
  }



  return (
    <>
      <div className="friend">
            <div className="profile">
            <div className="imgBox">
              <img src="" alt="" />
            </div>
            <p>Anil Jaiswal</p>
            </div>
            <div className="friendSign" onClick={()=>patchFriend()}>+</div>
          </div>
    </>
  )
}

export default Friends