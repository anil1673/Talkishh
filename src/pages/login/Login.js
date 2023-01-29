import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { setLogin } from '../../redux';
import {useFormik} from "formik"
import { loginFormValidation } from '../../validation';
import loginImg from "../../components/Images/loginImg.png"
require("./login.css");

const loginData={email:"",password:""}

const Login = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [emailWrong,setEmailWrong]=useState(false);
    const [passWrong,setPassWrong]=useState(false)

    const {values,errors,handleChange,handleSubmit,handleBlur}=useFormik({
        initialValues:loginData,
        validationSchema:loginFormValidation,
        onSubmit:async(values)=>{
            await axios.post("/auth/login",values).then((res)=>{
                dispatch(setLogin({
                    user:res.data.user,
                    token:res.data.token
                }));
                navigate("/home")
            }).catch((err)=>{
                console.log(err.response.data.type)
                switch(err.response.data.type){
                    case 1:
                        return setEmailWrong(true);
                    case 2:
                        
                        return setPassWrong(true);
                    default:
                        return null;
                }
                
    
            })
        }
    })

  return (
    <div className="loginContainer">
        <div className="info">
        <h1>Talkishh</h1>
        <h4>Stay Connected With Virtual World.</h4>
        <img src={loginImg} alt="" />
      </div>
        <form className="loginBox" onSubmit={handleSubmit}>
            <div className="emailField">
                <input type="text"placeholder='email' name="email" value={values.email} onChange={handleChange} onClick={()=>setEmailWrong(false)}/>
                {emailWrong && <p>* Email doesnot exist</p>}
                <p>{errors.email}</p>
            </div>

            <div className="passField">
                <input type="text" placeholder='password' name="password" value={values.password} onChange={handleChange} onClick={()=>setPassWrong(false)}/>
                {passWrong && <p>* Password is Worng</p>}
                <p>{errors.password}</p>
            </div>

            <hr />

            <div>
                <input type='submit' value="Login" className='loginSubmit'/>
                <p style={{textAlign:"center",cursor:"pointer",marginTop:"10px"}}><b>Forget Password?</b></p>
            </div>
            <div className='pageChange'>
                <span><b>Don't have an account?  
                    <NavLink to="/register"> Register</NavLink>
                    </b></span>
            </div>
        </form>
    </div>
  )
}

export default Login