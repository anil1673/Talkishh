import React,{useContext, useEffect, useState} from 'react'
import "./Post.css"
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
import { setPost, setPosts } from '../../redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'


const Post = ({
            postId,
            postUserId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            createdAt,
            comments,
}) => {

    const [isComments,setIsComments]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loggedInUser=useSelector((state)=>state.user._id);
    const token=useSelector((state)=>state.token);
    const likeCount=Object.keys(likes).length;
    const isLiked=Boolean(likes[loggedInUser]);

    const patchLike=async()=>{
        const data=new FormData();
        data.append("userId",loggedInUser)
         await axios.patch(`post/${postId}/like`,{userId:loggedInUser},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            const updatedPost=res.data
            dispatch(setPost({post:updatedPost}))
        }).catch((err)=>{
            console.log("patch like eror"+err)
        })
    }

    const handleComment=()=>{

    }

   
   
  return (
    <>
      
        <div className="post">
            <div className='userInfo'>
                <div className="img">
                    <img src={userPicturePath==""?defaultuser:`https://talkishh-api.onrender.com/public/assets/${userPicturePath}`} alt="" />
                </div>
                
                <div className='user'>
                    <div className='name'><b>{firstName}</b></div>
                    <div className="time">{(moment(createdAt).format(" DD/MM/YYYY"))}</div>
                </div>
                
            </div>

            <div className="caption">
                <p className='desc'>{description}</p>

            </div>
            <div className="content">
                <img src={picturePath==""?"":`https://talkishh-api.onrender.com/public/assets/${picturePath}`} alt="post image" />
            </div>

            <div className="react">
                <div className="like" onClick={patchLike}><span>{likeCount }</span>{isLiked?<FavoriteOutlinedIcon style={{color:"red"}}/>:<FavoriteBorderOutlinedIcon/>}</div>
                <div className="comment" onClick={()=>setIsComments(!isComments)}> <span>  </span> <ChatBubbleOutlineOutlinedIcon/></div>
                <div className="share"><span> </span><ShareIcon/> </div>

            </div>
           
                {
                    isComments && <>
                    <div className="commentDisplay">
                    
                    {
    
                       
                        comments.map((cmt)=>{
                            console.log(cmt.commenterId.name)
                            return(
                                   <> 
                                   
                                     <div className="commentBox" style={{margin:"8px 0"}}>
                                         <div className="img"><img src={cmt.commenterId.profileImage==""?defaultuser:`https://talkishh-api.onrender.com/${cmt.commenterId.profileImage}`} alt="" /></div>
                                         <div className="cmtDisp">
                                             <h5 className="commenter" >{cmt.commenterId.name}</h5>
                                             <span className="comment" style={{fontSize:"14px"}}>{cmt.text}</span>
                                         </div>
                                     </div>
                                 </>
                                 )
                                
                        })
                    }            
    
                </div>
                    </>
                }
                 
        </div>
    </>
  )
}

export default Post