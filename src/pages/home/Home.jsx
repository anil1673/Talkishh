import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/navbar/Navbar.jsx'
import defaultuser from '../../defaultUser/defaultuser.png'
import gallery from "../../components/Images/gallery.png"
import SendIcon from '@mui/icons-material/Send';
import Left from "../../components/homeleft/Left"
import "./Home.css"
import { setPosts } from '../../redux/index.js';
import PostHolder from '../../components/postHolder/PostHolder.js';
import FriendsList from '../../components/friendsList/FriendsList.jsx';
const LINK=process.env.REACT_APP_LINK;

const postData = { caption: "", image: "" };

const Home = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token)
  const data = new FormData();
const registerFormData=new FormData();
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit, handelBlur, setFieldValue } = useFormik({
    initialValues: postData,
    onSubmit: async (values, errors) => {
      console.log(values.image)

      

        data.append("file",values.image);
        data.append("upload_preset","talkkish");
        data.append("cloud_name","dancvkguq")

        fetch("https://api.cloudinary.com/v1_1/dancvkguq/image/upload",{
          method:"POST",
          body:data
        }).then((res)=>res.json()).then(async(data)=>{
        console.log(data)  ;
        registerFormData.append("caption", values.caption);
        registerFormData.append("image", data.url);
        registerFormData.append("userId", user._id)
        console.log(values)
        
        if(data.url){
          await axios.post( `${LINK}/post/posts`,registerFormData, { headers: { Authorization: "Bearer " + token } }).then((res)=>{
            console.log(res.data)
            values.caption = '';
            values.image = ''
            console.log("111", res.data)
            const p = res.data;
            dispatch(setPosts({ posts: p }));
          }).catch((error)=>{
            console.log("post add error",error)
          })
        }else{
          console.log(data.url)
        }
        }).catch((err)=>{
          console.log(err)
        });

      

    }
  })


  return (
    <>
      <div className='homeContainer'>
        <Navbar />
        <div className="display">
          <div className="left"><Left /></div>
          <div className="middle">

            <form className="postAdd" onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="img">
                <img src={`${user.picturePath}`} />
              </div>

              <div className="fieldSide">

                <input className='caption' type="text" placeholder="what's on your mind ?" name="caption" value={values.caption} onChange={handleChange} />

                <input className="file" type="file" name="image" accept=".jpg, .png, .jpeg" id="file" onChange={(e) => setFieldValue("image", e.target.files[0])} />
                <label for="file"> <img src={gallery} alt="" style={{ width: "30px", height: "30px" }} />
                </label>

              </div>
              <input type="submit" value="Send" />
              {/* <button onClick={handlePostSubmit}><SendIcon/></button> */}

            </form>

            <div className="postContainer">
              <PostHolder />
            </div>
          </div>

          <div className="right">
            <FriendsList userId={user._id}/>
          </div>
        </div>

      </div>


    </>
  )
}

export default Home