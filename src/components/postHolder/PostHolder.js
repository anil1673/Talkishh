import React,{useContext, useEffect, useState} from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import defaultuser from "../../defaultUser/defaultuser.png"
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { padding } from '@mui/system';
import { setPosts } from '../../redux';
import Post from '../post/Post';


const PostHolder = () => {
    // console.log(postdata)
    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    const token=useSelector((state)=>state.token);

    const getPosts=async()=>{
        await axios.get("/post",{headers:{Authorization:"Bearer "+token}}).then((res)=>{
             const p=res.data;
            dispatch(setPosts({posts:p}))
        }).catch((err)=>{
            console.log("getting post error")
        })
    }

    useEffect(()=>{
      getPosts();
    },[])

   
  return (
    <>
      {
        posts.map(({_id,userId,firstName,lastName,description,location,picturePath,userPicturePath,likes,comments,createdAt})=>(
            <Post 
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}

            />
        )
        )
      }
        </>
  )
}

export default PostHolder