import React from 'react';
import { FaCaretSquareDown,FaEdit,FaSistrix } from "react-icons/fa";

const FriendInfo = ({currentfriend,activeUser,message}) => {
  return (
       <div className='friend-info'>
            <input type="checkbox" id='gallery' />
            <div className='image-name'>
                 <div className='image'>
                 <a href={`./image/${currentfriend.image}`}><img src={`./image/${currentfriend.image}`} alt='' /></a>
                 </div>
                 {
           activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === currentfriend._id) ? <div className='active-user'>Active</div> : ''
      }     

                

     <div className='name' style={{color:'white', marginBottom:'15px'}}>           
          <h3>{currentfriend.userName} </h3>
     </div>
            </div>


     <div className='others'>
     <div className='custom-chat'>
          <h3>Coustomise Chat </h3>
          <FaCaretSquareDown/>
     </div>

     <div className='privacy'>
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown/>
     </div>

     <div className='media'>
          <h3>Shared Media </h3>
        <label htmlFor='gallery'> <FaCaretSquareDown/> </label> 
     </div>
     </div>
 
     <div className='gallery'>
     {
          message && message.length>0 ? message.map((m,index)=>m.message.image && <a href={`./image/${m.message.image}`}><img key={index} src={`./image/${m.message.image}`} /></a>) : ''
     }
     </div> 

       </div>
  )
};

export default FriendInfo;
