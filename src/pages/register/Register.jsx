import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useFormik} from "formik";
import { registerFormValidation } from '../../validation';
import Dropzone from "react-dropzone"
import ImageIcon from '@mui/icons-material/Image';
import registerImgg from "../../components/Images/registerImgg.png"
import { useEffect } from 'react';
require("./register.css");
const LINK=process.env.REACT_APP_LINK;

const registerData={
    firstName:"",lastName:"",email:"",password:"",location:"",occupation:"",picturePath:""
}

const Register = () => {
  const [url,setUrl]=useState("");


    

    const user=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const data=new FormData();
    const registerFormData=new FormData();

    const {values,errors,handleBlur,handleChange,handleSubmit,setFieldValue}=useFormik({
        initialValues:registerData,
        validationSchema:registerFormValidation,
        onSubmit:async(values,errors)=>{
        const {picturePath}=values;
        data.append("file",values.picturePath);
        data.append("upload_preset","talkkish");
        data.append("cloud_name","dancvkguq")

        fetch("https://api.cloudinary.com/v1_1/dancvkguq/image/upload",{
          method:"POST",
          body:data
        }).then((res)=>res.json()).then(async(data)=>{
        console.log(data)  ;
        registerFormData.append("firstName",values.firstName);
        registerFormData.append("lastName",values.lastName);
        registerFormData.append("email",values.email);
        registerFormData.append("password",values.password);
        registerFormData.append("location",values.location);
        registerFormData.append("occupation",values.occupation);
        registerFormData.append("imgUrl",data.url)
        console.log(values)
        
        if(data.url){
          await axios.post( `${LINK}/auth/register`,registerFormData).then((res)=>{
            console.log(res.data)
              navigate("/");
          }).catch((error)=>{
            console.log("register error",error)
          })
        }else{
          console.log(url)
        }
        }).catch((err)=>{
          console.log(err)
        });

        
       
        
        
      
        }
    })


    

   
  return (
    <div className="registerContainer">
      <div className="info">
        <h1>Talkishh</h1>
        <h5>Start Your Journey With New Environment</h5>
        <img src={registerImgg} alt="" />
      </div>
        <form className="registerBox" onSubmit={handleSubmit} encType="multipart/form-data" >
           <div className='2div'>
            <div>
              <input type="text" placeholder='first name' name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
              <p>{errors.firstName}</p>
            </div>
            <div>
              <input type="text" placeholder='last name' name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
              <p>{errors.lastName}</p>
            </div>
           </div> 
            

            
        <div className='2div'>
          <div>
            <input type="text" placeholder='email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.email}</p>
          </div>
          <div>
            <input type="password" placeholder='password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.password}</p>
          </div>
        </div>
        
        <div className='2div'>
          <div>
            <input type="text" placeholder='occupation' name="occupation" value={values.occupation} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.occupation}</p>
          </div>
          <div>
            <input type="text"placeholder='location' name="location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
            <p>{errors.location}</p>
          </div>
          
          
        </div>
        <div className='2div'>  
          <div>
           
            <label htmlFor="picturePath"><ImageIcon/> Photo</label>
            <input id='picturePath' type="file"placeholder='Profile picture' accept=".jpg, .png, .jpeg" name="picturePath"  onChange={(e)=>setFieldValue("picturePath", e.target.files[0])} onBlur={handleBlur}/>
            
            <p>{errors.picturePath}</p>
          </div>
            
            
        </div>

        <hr />
            
            <input type='submit' value="Register" className='registerButton'/>
            <div className='pageChange'>
                <span><b>Already have an account?  
                    <NavLink to="/"> Login</NavLink>
                    </b></span>
            </div>
        </form>
    </div>
  )
}

export default Register