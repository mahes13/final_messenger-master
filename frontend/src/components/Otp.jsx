// import React, { useState, useRef } from 'react';
// import {useDispatch,useSelector} from "react-redux"
// import { userRegister } from '../store/actions/authAction';
// import { sendOtpEmail } from '../store/actions/authAction.js';


// import { Link,useNavigate } from 'react-router-dom';


// import { useAlert } from 'react-alert';
// import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';



// // const jwt=require("jsonwebtoken");
// // import nodemailer from 'nodemailer';

// // import './Otp.css';

// const Otp = () => {
//  const [whole, setWhole]=useState(['']);        //for storing whole otp

//   const navigate = useNavigate();
//      const alert = useAlert();

//      const {loading,authenticate,error,successMessage,myInfo, originalOtp} = useSelector(state=>state.auth);
//      console.log(myInfo);

//      const dispatch = useDispatch();

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const refs = [useRef(), useRef(), useRef(), useRef()];
// const [wholeOtp,setWholeOtp]=useState('');

// ///nodemailer start
// const sendingOtp=async()=>{
// try{
// dispatch(sendOtpEmail());
// if(originalOtp!=='' && originalOtp==wholeOtp){

//   if(authenticate){
//     navigate('/');
// }
// if(successMessage){
//     alert.success(successMessage);
//     dispatch({type : SUCCESS_MESSAGE_CLEAR })
// }
// if(error){
//     error.map(err=>alert.error(err));
//     dispatch({type : ERROR_CLEAR })
// }

// }

// }catch{

// }

// }

// ///nodemailer end

//   const handleInputChange = (index, event) => {
    
//     const { value } = event.target;
//     const newOtp = [...otp];
//     newOtp[index] = value;

// //  setWhole([...whole,event.target.value]);
 
// //  if(index===3){
// //   whole.map((value, ind)=>{
// //     console.log("index is "+ind);
// // console.log(value);
// //   })


//  }

// //     setWhole(whole+event.target.value);
// // console.log(whole);
// // console.log(whole.length);

//     setOtp(newOtp);

//     if (value === '') {
//       if (index > 0) {
//         refs[index - 1].current.focus();
//       }
//     } else if (value !== '') {
//       if (index < refs.length - 1) {
//         refs[index + 1].current.focus();
//       }
//     }
//   };

//  const handleInputPaste = (event) => {
//     event.preventDefault();
//  const pasteData = event.clipboardData.getData('Text').slice(0, 4);

//     const newOtp = [...otp];
//     for (let i = 0; i < pasteData.length; i++) {
//       newOtp[i] = pasteData[i];
//     }
    
    

//     setOtp(newOtp);
//   };

//   const submitOtp=(event)=>{
//     event.preventDefault();
//     let tempotp=wholeOtp;
//     console.log(tempotp);
//     if(tempotp.length===4){

//       console.log(wholeOtp);
//     }
//   }





//   return (
// <div className='otp_page'>
//     <div className="otp-card">
//       <h2>OTP Verification</h2>
//       <p>Please enter the OTP sent to gmail.</p>
//       <div className="otp-inputs">
//         {otp.map((value, index) => (
//           <input
//             key={index}
//             type="text"
//             maxLength="1"
//             value={value}
//             onChange={(e) => handleInputChange(index, e)}
//             onPaste={handleInputPaste}
//             ref={refs[index]}
//           />
//         ))}
//       </div>
//       <button type='submit' onClick={submitOtp}>Submit Otp</button>
//         <p>didn't receive the otp? <span onClick={sendingOtp}>resend it.</span></p>
//     </div>
//     </div>
//   );
// };

// export default Otp;





import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from '../store/actions/authAction';
import { sendOtpEmail } from '../store/actions/authAction.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
import { MdEmail } from 'react-icons/md';
import Button from '@mui/material/Button';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import '../sass/components/_Otp.scss';


const Otp = () => {
  const [wholeOtp, setWholeOtp]=useState();
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const { loading, authenticate, error, successMessage, myInfo, originalOtp , temp_email} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value === '' && index > 0) {
      refs[index - 1].current.focus();
    } else if (value !== '' && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const handleInputPaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('Text').slice(0, 4);

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);
  };





const submitOtpAndLogin=(event)=>{
  
  // if (originalOtp!=='' && event===originalOtp) {
    if (true) {
//     if (authenticate) {
//       alert("hii");
//       navigate('/');
//     }else{
// localStorage.clear('authToken');
// let name='authToken';
// document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//     }
navigate('/');
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR })
    }
    if (error) {
      error.map(err => alert.error(err));
      dispatch({ type: ERROR_CLEAR })
    }
  }
}



  const submitOtp = (event) => {
    event.preventDefault();
    let completeOtp = otp.join(""); // Join array elements to form complete OTP
   
    completeOtp = parseInt(completeOtp);
    console.log(typeof completeOtp);
setWholeOtp(completeOtp);

    // Now you can use 'completeOtp' for further processing
    // For example, dispatching an action or sending it to the server
    submitOtpAndLogin(completeOtp);
  };





  const sendingOtp = async () => {
    try {
      
      document.querySelector('.otp_image').classList.add('otp_image_rotate');
      dispatch(sendOtpEmail(temp_email));

     
    } catch (error) {
      // Handle the error
    }
  };









  return (
    <div className='otp_page' style={{height:'100vh', display:'flex', flexDirection:'column',justifyContent:'center', textAlign:'center' }}>


<div style={{backgroundColor:'', border:'', widht:'30%', height:'70%',display:'flex', flexDirection:'column',justifyContent:'space-around', textAlign:''}}>

<div  style={{height:'30px', widht:'20px' , color:'black'}}>
  <div className='otp_image'>
<img  src={'/image/otp_image.png'} width={'150px'}/>
  </div>
</div>

      <div className="otp-card" style={{color:'#318be3', height:'40%', display:'flex',flexDirection:'column', justifyContent:'space-around', textAlign:'center'}}>
        <h2>OTP Verification</h2>
        <p>Please enter the OTP sent to your email.</p>
        <div className="otp-inputs" style={{backgroundColor:'', height:'30px',display:'flex',flexDirection:'row', justifyContent:'center'}}>
          <div className="input_child_otp" style={{backgroundColor:'', width:'20%',display:'flex',flexDirection:'row', justifyContent:'space-around' }}>

          {otp.map((value, index) => (
            <input  style={{width:'50px',height:'30px'}} className='otp_input'
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(index, e)}
            onPaste={handleInputPaste}
            ref={refs[index]}
            />
            ))}
            </div>
        </div>
        <div style={{width:'100%'}}>

        <Button variant="contained" color="primary" style={{width:'7rem', textAlign:'center'}} type='submit' onClick={submitOtp}>Submit</Button>
        </div>
       
        <p id="resend">didn't receive the otp? <span onClick={sendingOtp}>send/resend it.</span></p>
      </div>
      </div>
    </div>
  );
};

export default Otp;