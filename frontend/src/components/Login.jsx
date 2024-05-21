import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { userLogin } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import {useDispatch,useSelector} from "react-redux"
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
import { TextField,Button } from '@mui/material';

const Login = () => {

     const navigate = useNavigate();

     const alert = useAlert();

     const {loading,authenticate,error,successMessage,myInfo} = useSelector(state=>state.auth);


     const dispatch = useDispatch();

     const [state, setState] = useState({
          email: '',
          password : ''
     });

     const inputHendle = e => {
e.target.style.color="white";

          setState({
               ...state,
               [e.target.name] : e.target.value 
          })
     }

     const login = (e) => {
          e.preventDefault();
          dispatch(userLogin(state))
     }

     useEffect(()=>{
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

     return (
          <div className='register'>
          <div className='card'>
               <div className='card-header'>
          <h2>Login</h2>
               </div>

     <div className='card-body'>
          <form onSubmit={login}>
                

               <div className='form-group'>
                    {/* <label htmlFor='email'>Email</label> */}
               <TextField type="email" label="email" variant="filled"focused  onChange={inputHendle} name="email" value={state.email} className='form-control' id='email' /> 

               </div>

               <div className='form-group' style={{marginBottom:'15px'}}>
                    {/* <label htmlFor='password'>Password</label> */}
               <TextField type="password"  label="password" variant="filled" focused onChange={inputHendle} name="password" value={state.password} className='form-control' id='password' /> 
               </div> 


               <div className='form-group'>
               {/* <TextField type="submit"  value="login" className='btn' /> */}
               <Button type='submit' className='btn' variant="contained">Login</Button>
              
               </div>



               <div className='form-group'>
     <span><Link to="/messenger/register"> Don't have any Account </Link></span>
               </div>

               <div className='form-group' style={{}}>
     <span style={{fontSize:'12px'}}><Link to="/messenger/login">forgot password</Link></span>
               </div>  
             
          </form> 
     </div>


               </div> 

     </div>
     
          )
};

export default Login;
