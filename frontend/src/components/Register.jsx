import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import { userRegister } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
import {Button, TextField} from "@mui/material";



const Register = () => {

     const navigate = useNavigate();
     const alert = useAlert();

     const {loading,authenticate,error,successMessage,myInfo} = useSelector(state=>state.auth);
     console.log(myInfo);

     const dispatch = useDispatch();

     const [state,setstate] = useState({
          userName : '',
          email:'',
          password:'',
          confirmPassword : '',
          image : ''
     })

     const [loadImage, setLoadImage] = useState('');

     const inputHendle = e => {
          e.target.style.color = 'white'; // Replace with your desired color
          setstate({
               ...state,
               [e.target.name] : e.target.value 
          })
     }

     const fileHendle = e =>{
          if(e.target.files.length !==0){
               setstate({
                    ...state,
                    [e.target.name] : e.target.files[0]
               })
          }

          const reader = new FileReader();
          reader.onload = () => {
               // setLoadImage(reader.result);
               setLoadImage(URL.createObjectURL(e.target.files[0]));          //  for handling video file.
               console.log(URL.createObjectURL(e.target.files[0]));
          }    
          reader.readAsDataURL(e.target.files[0]);
          
     }

     const register = e =>{

          const {userName,email,password,confirmPassword, image} = state;
          e.preventDefault();

          const formData = new FormData();

          formData.append('userName',userName);
          formData.append('email',email);
          formData.append('password',password);
          formData.append('confirmPassword',confirmPassword);
          formData.append('image',image);

          dispatch(userRegister(formData)); 
          dispatch({type:'TEMPORARY_EMAIL',
     payload:{
          temp_email:email,
     }});         
     }

     useEffect(()=>{
          if(authenticate){
               navigate('/messenger/otp');
          }
          if(authenticate){
               navigate('/');
          }
          if(successMessage){
               alert.success(successMessage);
               dispatch({type : SUCCESS_MESSAGE_CLEAR })
          }
          if(error){
               error.map(err=>alert.error(err));
               dispatch({type : ERROR_CLEAR })
          }

     },[successMessage,error])
     


//    const  colorInput = document.querySelectorAll('.form-control');


//      colorInput[0].addEventListener('input', (event) => {
//        const inputText = event.target.value;
//        colorInput.style.color = 'yellow'; // Replace with your desired color
//      });


  return (

<div className='register'>
          <div className='card'>
               <div className='card-header'>
          <h2>Register</h2>
               </div>

     <div className='card-body'>
          <form onSubmit={register}>
               <div className='form-group'>
                    {/* <label htmlFor='username'>User Name</label> */}
               <TextField  type="text" label="username" variant="filled" color="" focused onChange={inputHendle} name="userName" value={state.userName} 
               style={{}}    className='form-control'  id='username' /> 

               </div>

               <div className='form-group'>
                    {/* <label htmlFor='email'>Email</label> */}
               <TextField  type="email" label="email" variant="filled" color="" focused  onChange={inputHendle} name="email" value={state.email}  className='form-control' id='email' /> 
               </div>

               <div className='form-group'>
                    {/* <label htmlFor='password'>Password</label> */}
               <TextField  style={{color:'white'}} label="password" variant="filled" color="" focused type="password"  onChange={inputHendle} name="password" value={state.password}  className='form-control' id='password' /> 
               </div>


               <div className='form-group'>
                    {/* <label htmlFor='confirmPassword'>Confirm Password</label> */}
               <TextField   label="confirm password" variant="filled" color="" focused type="password"  onChange={inputHendle} name="confirmPassword" value={state.confirmPassword} className='form-control'  id='confirmPassword' /> 
               </div>

               <div className='form-group'>
                  <div className='file-image'>
                         <div className='image'>
     {/* {loadImage ? <video src={loadImage} /> : ''  }                          */}
     {loadImage ? <img src={loadImage} controls width="200" height="150" /> : ''}
                         </div>
               <div className='file'>
               <label  style={{color:'#318be3'}} htmlFor='image'>Select Image</label>
               <TextField   type="file"  label="select file" variant="filled" color="" focused onChange={fileHendle}  name="image" className='form-control' id='image' />
               </div>

             </div>
               </div>

               <div className='form-group'>
               
               {/* <input type="submit" value="register" className='btn'/> */}
               <Button type='submit' className='btn' variant="contained">Register</Button>

               </div>

              

               <div className='form-group'>
     <span><Link to="/messenger/login"> Login Your Account </Link></span>
               </div>  
          </form> 
     </div>


               </div> 

     </div>

     )
};

export default Register;