import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,PROFILE_CHANGE_SUCCESS,PROFILE_CHANGE_FAIL,PROFILE_IMG_CHANGE,OTP_SENT} from "../types/authType";
import {getFriends} from "./messengerAction.js";
export const userRegister = (data) => {
     return async (dispatch) => {

          const config = {
               headers: {
                'Content-Type': 'multipart/form-data'
               } 
          }
          try{
               const response = await axios.post('/api/messenger/user-register',data,config);
               localStorage.setItem('authToken',response.data.token);

               dispatch({
                    type : REGISTER_SUCCESS,
                    payload:{
                         successMessage: response.data.successMessage,
                         token : response.data.token
                    }
               })

          } catch(error){
                dispatch({
                    type: REGISTER_FAIL,
                    payload:{
                         error : error.response.data.error.errorMessage 
                    }
                })
          }

     }
}

export const userLogin = (data) => {
    return async (dispath) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('/api/messenger/user-login', data, config);
            localStorage.setItem('authToken', response.data.token);
            dispath({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            dispath({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}

export const userLogout = () => async(dispatch) => {
     try{
         const response = await axios.post('/api/messenger/user-logout');
         if(response.data.success){
             localStorage.removeItem('authToken');
             dispatch({
                 type : 'LOGOUT_SUCCESS'
             })
         }

     }catch (error) {

     }
}


export const deleteMyAccount=(data)=>async(dispatch)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
try{
   
    const response=await axios.post(`/api/messenger/deleteMyAccount`, {
       
        body: data
      });
  
}catch(error){
console.log(error);
}
}


export const profileImgUpdate=(data)=>async(dispatch)=>{
    
        const config = {
             headers: {
              'Content-Type': 'multipart/form-data'
             } 
        }
        try{console.log(data);
         
             const response = await axios.post('/api/messenger/user-profile_img_update',data,config);
             localStorage.setItem('authToken',response.data.token);
            //  console.log(response);
             dispatch({
                  type : PROFILE_CHANGE_SUCCESS,
                  payload:{
                    successMessage: response.data.successMessage,
                    token : response.data.token
               }
             })

               dispatch(getFriends());
       




        } catch(error){
          
              dispatch({
                  type: PROFILE_CHANGE_FAIL,
                  payload:{
                       error : error.response.data.error.errorMessage 
                  }
              })
        }
}





export const sendOtpEmail=(data)=>async(dispatch)=>{

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log("data is"+data);
    try {
        console.log("data is"+data);
        const response = await axios.post('/api/messenger/sendotp', {
            body:data
        });
        if(response.data.status==='OTP_SEND_SUCCESS'){
dispatch({type:OTP_SENT,
           payload:{
            payload_otp:response.data.otp
           }})
        }
      
    } catch (error) {
        
    }




}