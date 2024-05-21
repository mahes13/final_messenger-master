
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import * as math from 'mathjs';
import dotenv from 'dotenv';
dotenv.config({
     path : 'backend/config/config.env'
})
// const {nodemailer}=pkg;

export const  authMiddleware = async(req,res,next) => {
     const {authToken} = req.cookies;
     if(authToken){
          const deCodeToken = await jwt.verify(authToken,process.env.SECRET);
          req.myId = deCodeToken.id;
          next();
     }else{
          res.status(400).json({
               error:{
                    errorMessage: ['Please Loing First']
               }
          })
     } 
}


export const sendOtpEmail=async(req, res, next)=>{
     console.log("hii come from send otp");

const email=req.body.body;
const otp=math.round(math.random()*(9000-1000)+1000);


console.log("otp is "+otp);

     try{
     //      const transporter=nodemailer.createTransport({
     //        host:"smtp.gmail.com",
     //        port:587,
     //        secure:false,
     //        requireTLS:true,
     //        auth:{
     //            user:process.env.EMAIL,
     //            pass:'rdms yfmr gjts zkcr'
     //        }
     //      })
        
     //    const options={
     //        from:process.env.EMAIL,
     //        to:email,
     //        subject:'For verification of '+email,
     //        html:"<p>Your One Time Password(OTP) is</p>"+otp
     //    }
        
     //    transporter.sendMail(options, function(err, content){
     //      if(err){
     //        console.log(err);
        
     //        }else{
     //           res.status(201).json({
     //                otp,
     //                status:'OTP_SEND_SUCCESS'
     //           })
     //      //     console.log("successfully send an email Wait to complete varification");
     //        }
     //      });
     
        }
        catch(err){
      console.log(err);
        }

}