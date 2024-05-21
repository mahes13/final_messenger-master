
import {PROFILE_IMG_CHANGE} from "../types/authType";
import {FRIEND_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS,SOCKET_MESSAGE,UPDATE_FRIEND_MESSAGE,MESSAGE_SEND_SUCCESS_CLEAR,SEEN_MESSAGE,DELIVARED_MESSAGE,UPDATE,MESSAGE_GET_SUCCESS_CLEAR,SEEN_ALL} from "../types/messengerType";
import deCodeToken from 'jwt-decode';

const messengerState = {
     friends : [],
     message : [],
     mesageSendSuccess : false,
     message_get_success : false,
     themeMood : '',
     new_user_add : ''
}





export const messengerReducer = (state=messengerState,action) => {
     const {type,payload} = action;



     // const tokenDecode = (token) =>{
     //      const tokenDecoded = deCodeToken(token);
     //      const expTime = new Date(tokenDecoded.exp*1000);
     //      if(new Date() > expTime){
     //           return null;
     //      }
     //      return tokenDecoded;
     
     // }

     if(type === 'THEME_GET_SUCCESS' || type === 'THEME_SET_SUCCESS'){
          return {
               ...state,
               themeMood : payload.theme
          }
     }





     if(type === FRIEND_GET_SUCCESS){
          return {
               ...state,
               friends : payload.friends
          }
     }

     if(type === MESSAGE_GET_SUCCESS){
          return {
               ...state,
               message_get_success : true,
               message : payload.message
          }
     }

     if(type === MESSAGE_SEND_SUCCESS){
          return {
               ...state,
               mesageSendSuccess : true,
               message : [...state.message,payload.message]
          }
     }

     if(type === SOCKET_MESSAGE){
          return {
               ...state,
               message : [...state.message,payload.message]
          }
     }

     if(type === UPDATE_FRIEND_MESSAGE){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId);
          state.friends[index].msgInfo = payload.msgInfo;
          state.friends[index].msgInfo.status = payload.status;
          return state;
     }


//      if(type===PROFILE_IMG_CHANGE){
// let token=tokenDecode(payload.token);

// console.log("here I am in mes");
//           const index = state.friends.findIndex(f=>f.fndInfo._id === token._id);
//           state.friends[index].msgInfo.image = token.image;
//          console.log(index);
//           return state;


//      }

     
     if(type === MESSAGE_SEND_SUCCESS_CLEAR){
          return {
               ...state,
               mesageSendSuccess : false               
          }
     }


     if(type === SEEN_MESSAGE){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId);
          state.friends[index].msgInfo.status = 'seen';
         return {
              ...state
         };
     }

     if(type === DELIVARED_MESSAGE){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.msgInfo.reseverId || f.fndInfo._id === payload.msgInfo.senderId);
          state.friends[index].msgInfo.status = 'delivared';
         return {
              ...state
         };
     }


     if(type === UPDATE){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.id);
          if(state.friends[index].msgInfo){
               state.friends[index].msgInfo.status = 'seen';
          }
          return {
               ...state
          }
     }

     if(type === MESSAGE_GET_SUCCESS_CLEAR){
          return {
               ...state,
               message_get_success : false
          }
     }

     if(type === 'SEEN_ALL'){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.reseverId);
          state.friends[index].msgInfo.status = 'seen';
          return {
               ...state
          }
     }

     if(type === 'LOGOUT_SUCCESS'){
          return {
               ...state,
               friends : [],
               message : [],
               mesageSendSuccess : false,
               message_get_success : false,
              
          }
     }

     if(type === 'NEW_USER_ADD'){
          return{
               ...state,
               new_user_add : payload.new_user_add
          }
     }

     if(type === 'NEW_USER_ADD_CLEAR'){
          return{
               ...state,
               new_user_add : ''
          }
     }
 

     if(type==='INSERT_PROFILE_IMG'){
          const index = state.friends.findIndex(f=>f.fndInfo._id === payload.myId);
          state.friends[index].msgInfo.status = 'seen';
          return {
               ...state
          }
     }


     if(type==='DELETE_MINE_MSG_SUCCESS'){


          const index=state.message.findIndex(m=>m._id===payload.message);
          state.message[index].deleMsgMine=payload.message2;
         
          return{
               ...state, 

          }
     }

     if(type==='DELETE_BOTH_MSG_SUCCESS'){
          const index = state.message.findIndex(m => m._id === payload.message);

          if (index !== -1) {
            const updatedMessages = [...state.message];
            updatedMessages.splice(index, 1);
          
            return {
              ...state,
              message: updatedMessages,
            };
          } else {
            // Handle case where the message is not found
            return {...state} // Or some appropriate action based on your app logic
          }
     }


     if(type==='GET_MESSAGE_AFTER_MSG_DELETION'){
          console.log("get message after deletion");
          return {
               ...state
          }
     }




     return state;
}










//updatedMessages.splice(index, 1);  learn how this splice works