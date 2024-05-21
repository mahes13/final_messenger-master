import React,{ useEffect,useState,useRef } from 'react';
import { FaEllipsisH,FaEdit,FaSistrix,FaSignOutAlt,FaTrash,FaUserCircle,FaCameraRetro,FaCloudUploadAlt} from "react-icons/fa";
import {Link} from "react-router-dom";


import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {useDispatch ,useSelector } from 'react-redux';
import { getFriends,messageSend,getMessage,ImageMessageSend,seenMessage,updateMessage,getTheme,themeSet } from '../store/actions/messengerAction';
import {userLogout, deleteMyAccount,profileImgUpdate} from '../store/actions/authAction';

import toast,{Toaster} from 'react-hot-toast';
import {io} from 'socket.io-client';
import useSound from 'use-sound';
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3';
import { blue } from '@mui/material/colors';
import { colors } from '@mui/material';






const Messenger = () => {


const [profileImg, setprofileImg]=useState({
     uid:'',
     iurl:''
});




 const [notificationSPlay] = useSound(notificationSound);   
 const [sendingSPlay] = useSound(sendingSound);  

const [profileImgSocket, setProfileImgSocket]=useState('');





 const scrollRef = useRef();
 const socket = useRef();


 const {friends,message,mesageSendSuccess,message_get_success,themeMood,new_user_add} = useSelector(state => state.messenger );
 const {myInfo} = useSelector(state => state.auth);

 const [currentfriend, setCurrentFriend] = useState('');
 const [newMessage, setNewMessage] = useState('');

 const [activeUser, setActiveUser] = useState([]);
 const [socketMessage, setSocketMessage] = useState('');
 const [typingMessage, setTypingMessage] = useState('');

 useEffect(() => {
    socket.current = io('ws://localhost:8000');
    socket.current.on('getMessage',(data) => {
        setSocketMessage(data);
    })

    socket.current.on('typingMessageGet',(data) => {
     setTypingMessage(data);
 })

 socket.current.on('msgSeenResponse', msg => {
     dispatch({
          type : 'SEEN_MESSAGE',
          payload : {
               msgInfo : msg
          }
     })
 })

 socket.current.on('msgDelivaredResponse', msg => {
     dispatch({
          type : 'DELIVARED_MESSAGE',
          payload : {
               msgInfo : msg
          }
     })
 })

 socket.current.on('seenSuccess', data => {
      dispatch({
           type : 'SEEN_ALL',
           payload : data
      })
 })








},[]);






useEffect(()=>{
     console.log('socket for profile img update called');
     socket.current.on('profileImgChangeSocketGet', msg=>{
          dispatch(getFriends());
     })
},[profileImgSocket])



useState(()=>{

},[myInfo])




useEffect(() => {
    if(socketMessage && currentfriend){
         if(socketMessage.senderId === currentfriend._id && socketMessage.reseverId === myInfo.id){
              dispatch({
                   type: 'SOCKET_MESSAGE',
                   payload : {
                        message: socketMessage
                   }
              })
              dispatch(seenMessage(socketMessage));
              socket.current.emit('messageSeen',socketMessage);
              dispatch({
               type: 'UPDATE_FRIEND_MESSAGE',
               payload : {
                    msgInfo : socketMessage,
                    status : 'seen'
               }
          })
         }
    }
    setSocketMessage('')
 },[socketMessage]);



useEffect(() => {
     socket.current.emit('addUser', myInfo.id, myInfo)
 },[]);

 useEffect(() => {
     socket.current.on('getUser', (users)=>{
          const filterUser = users.filter(u => u.userId !== myInfo.id)
          setActiveUser(filterUser);
     })

     socket.current.on('new_user_add',data => {
          dispatch({
               type : 'NEW_USER_ADD',
               payload : {
                    new_user_add : data
               }
          })
     })



 },[]);

 useEffect(() => {
      if(socketMessage && socketMessage.senderId !== currentfriend._id && socketMessage.reseverId === myInfo.id){
           notificationSPlay();
           toast.success(`${socketMessage.senderName} Send a New Message`)
           dispatch(updateMessage(socketMessage));
           socket.current.emit('delivaredMessage',socketMessage);
           dispatch({
            type: 'UPDATE_FRIEND_MESSAGE',
            payload : {
                 msgInfo : socketMessage,
                 status : 'delivared'
            }
       })

      }
 },[socketMessage]);


 

 const inputHendle = (e) => {
     setNewMessage(e.target.value);

     socket.current.emit('typingMessage',{
          senderId : myInfo.id,
          reseverId : currentfriend._id,
          msg : e.target.value
     })

 }
 
 const sendMessage = (e) => {
     e.preventDefault();
     sendingSPlay();
     const data = {
          senderName : myInfo.userName,
          reseverId : currentfriend._id,
          message : newMessage ? newMessage : '❤'
     }

     
     socket.current.emit('typingMessage',{
          senderId : myInfo.id,
          reseverId : currentfriend._id,
          msg : ''
     })

     dispatch(messageSend(data));
     setNewMessage('')
 }

const [count, setCount]=useState(0);


const changepic=async(e)=>{
setCount(1);
     if(e.target.files.length !==0){
          setprofileImg({
          "uid":myInfo.id,
               [e.target.name] : e.target.files[e.target.files.length-1]
          })
     }
    


     // const reader = new FileReader();
     // reader.onload = () => {
       
          
     //   setprofileImg({uid:myInfo.id,
     //           iurl:reader.result});
     //      }
     //   reader.readAsDataURL(e.target.files[0]);
          
          
          
          
          
}


const SubmitImg=(e)=>{
setCount(count+1);

     e.preventDefault();
const {uid, iurl} = profileImg;


const formData = new FormData();

formData.append('uid', uid);
formData.append('iurl',iurl);

setProfileImgSocket({'uid':uid,
'iurl':iurl});

 dispatch(profileImgUpdate(formData));

 

socket.current.emit('profileImgChangeSocket', {reseverId:myInfo.id,
senderId:currentfriend._id});
}











 useEffect(() => {
      if(mesageSendSuccess){
          socket.current.emit('sendMessage', message[message.length -1 ]);
          dispatch({
               type: 'UPDATE_FRIEND_MESSAGE',
               payload : {
                    msgInfo : message[message.length -1]
               }
          })
          dispatch({
               type: 'MESSAGE_SEND_SUCCESS_CLEAR'
          })
      }
},[mesageSendSuccess]);



  



     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(getFriends());
          dispatch({type:'NEW_USER_ADD_CLEAR'})
     },[new_user_add]);

     useEffect(() => {
         if(friends && friends.length > 0)
         setCurrentFriend(friends[0].fndInfo)
       
     },[friends]);


     useEffect(() => {
          dispatch(getMessage(currentfriend._id));
          if(friends.length > 0){
              
          }
      },[ currentfriend?._id]);


      useEffect(() => {
           if(message.length > 0){
                if(message[message.length -1].senderId !== myInfo.id && message[message.length -1].status !== 'seen'){
                    dispatch({
                         type: 'UPDATE',
                         payload : {
                              id : currentfriend._id
                         }
                    })
                     socket.current.emit('seen', { senderId: currentfriend._id, reseverId: myInfo.id })
                dispatch(seenMessage({ _id: message[message.length -1]._id }))
               }
           }
           dispatch ({
                type: 'MESSAGE_GET_SUCCESS_CLEAR'
           })
           
      },[ message_get_success]);


 
      useEffect(() => {
          scrollRef.current?.scrollIntoView({behavior: 'smooth'}) 
      },[ message]);
 

     const emojiSend = (emu) => {
          setNewMessage(`${newMessage}`+  emu);
          socket.current.emit('typingMessage',{
               senderId : myInfo.id,
               reseverId : currentfriend._id,
               msg : emu
          })
     }

     const ImageSend = (e) => {

          if(e.target.files.length !== 0){
               sendingSPlay();
               const imagename = e.target.files[0].name;
               let newImageName = Date.now()+imagename;
               newImageName=newImageName.replace(/\s/g, "");
               console.log("new imagename is messenger is"+newImageName);

               // socket.current.emit('sendMessage',{         //it was sending image twice therefore commented out
               //      senderId: myInfo.id,
               //      senderName: myInfo.userName,
               //      reseverId: currentfriend._id,
               //      time: new Date(),
               //      message : {
               //           text : '',
               //           image : newImageName
               //      }
               // })

               const formData = new FormData();

               formData.append('senderName',myInfo.userName);
               formData.append('imageName',newImageName);
               formData.append('reseverId',currentfriend._id);
               formData.append('image', e.target.files[0]);
               dispatch(ImageMessageSend(formData));
                
          } 
         
     }

     const [hide, setHide] = useState(true);
     const [phide, setpHide]=useState(true);

     const logout = () => {
          dispatch(userLogout());
          socket.current.emit('logout', myInfo.id);
     }

     const deleteAccount=()=>{
   if(window.confirm("Are you sure you want to delete❌ your account")){
     dispatch(deleteMyAccount(myInfo.id));
     logout();
   }else{
     alert("Thanks for staying here 😊")
   }
        
     }



     useEffect(() => {
         dispatch(getTheme());
      },[ ]);
 
      const search = (e) => {

          const getFriendClass = document.getElementsByClassName('hover-friend');
          const frienNameClass = document.getElementsByClassName('Fd_name');
          for (var i = 0; i < getFriendClass.length, i < frienNameClass.length; i++) {
              let text = frienNameClass[i].innerText.toLowerCase();
              if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                  getFriendClass[i].style.display = '';
              } else {
                  getFriendClass[i].style.display = 'none';
              }
          }
      }


  return (
       <div className={themeMood === 'dark' ? 'messenger theme' : 'messenger' }>
            <Toaster
            position={'top-right'}
            reverseOrder = {false}
            toastOptions={{
                 style : {
                      fontSize : '18px'
                 }
            }}
            
            />


<div className='row'>
     <div className='col-3'>
          <div className='left-side'>
               <div className='top'>
                    <div className='image-name'>
                         <div className='image' onClick={()=>{setpHide(!phide)}}>
                              <img src={`./image/${myInfo.image}`} alt='' />

                         </div>

<div>
     {phide? <p></p>:     
     
     <div className={phide?  'theme_logout dp_change_hide' : 'theme_logout show dp_change'} style={{ color:"white", position:'absolute'}}>
     <div className='on dp_change_child' style={{}}>
           
<form onSubmit={SubmitImg}>
                 <div className='logout'>
          
                 <FaUserCircle/>  <a href={`./image/${myInfo.image}`} style={{color:'white'}}>View Pic</a>
                 </div>
                 
              {count===0 || count===3?   <div className='logout'>



               <input onChange={changepic} name="iurl" className='custom-file-input' type="file" id="changepic" display={{textDecoration:'none'}}/>
               <FaCameraRetro/> <label htmlFor="changepic">Change Pic</label>
             
                 </div>
                 
                 
                 :<div className='logout'>
               
            
               <input  className='custom-file-input' type="submit" id="changepic2" display={{textDecoration:'none'}}/>
              <FaCloudUploadAlt/> <label htmlFor="changepic2">Submit</label>
             
                 </div>}
            </form>
            </div>
            
            </div>
            }


</div>


                         <div className='name'>
                         <h3>{myInfo.userName} </h3>
                         </div>
                       </div>

                       <div className='icons'>
  <div onClick={()=> setHide(!hide) }  className='icon'>
                              <FaEllipsisH />
                            </div>
                            <div className='icon'>
                                  <FaEdit/> 
                            </div>

            <div className={hide ? 'theme_logout' : 'theme_logout show'}>
                 <h3>Dark Mode </h3>
            <div className='on'>
                 <label htmlFor='dark'>ON</label>
                 <input onChange={(e) => dispatch(themeSet(e.target.value)) } type="radio" value="dark" name="theme" id="dark" />
                 </div>

                 <div className='of'>
                 <label htmlFor='white'>OFF</label>
                 <input onChange={(e) => dispatch(themeSet(e.target.value)) } type="radio" value="white" name="theme" id="white" />
                 </div>

                 <div onClick={logout} className='logout'>
                 
               <FaSignOutAlt /> Logout
                 </div>
                 <div onClick={deleteAccount} className='logout'>
               <FaTrash/> Delete My Account
                 </div>
            </div>








                       </div>
               </div>

               <div className='friend-search'>
                    <div className='search'>
                    <button> <FaSistrix /> </button>
  <input onChange={search} type="text" placeholder='Search' className='form-control' />
                    </div>
               </div>

               {/* <div className='active-friends'>
     {
        activeUser && activeUser.length > 0 ? activeUser.map(u =>  <ActiveFriend setCurrentFriend = {setCurrentFriend} user={u} />) : ''  
     }
                        
               </div> */}

               <div className='friends'>
     {
          friends && friends.length>0 ? friends.map((fd) => <div onClick={()=> setCurrentFriend(fd.fndInfo)} className={currentfriend._id === fd.fndInfo._id ? 'hover-friend active' : 'hover-friend' }> 
          <Friends activeUser= {activeUser} myId = {myInfo.id}  friend={fd} />
          </div> ) : 'No Friend'
     } 
                    
                    

               </div>

          </div>
                      
                 </div>

     {
          currentfriend ?  <RightSide 
          currentfriend={currentfriend}
          inputHendle={inputHendle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          message={message}
          scrollRef= {scrollRef}
          emojiSend = {emojiSend}
          ImageSend= {ImageSend}
          activeUser = {activeUser}
          typingMessage = {typingMessage}
          /> : 'Please Select your Friend'
     }
                

            </div>

       </div>
  )
};

export default Messenger;
