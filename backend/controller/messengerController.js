// const User = require('../models/authModel');
// const messageModel = require('../models/messageModel');
// const formidable = require('formidable');
// const fs = require('fs');


// const getLastMessage = async(myId, fdId) => {
//      const msg = await messageModel.findOne({
//           $or: [{
//                $and: [{
//                     senderId : {
//                         $eq: myId
//                     }
//                },{
//                     reseverId : {
//                         $eq : fdId 
//                     }
//                }]
//           }, {
//                $and : [{
//                     senderId : {
//                          $eq : fdId
//                     } 
//                },{
//                     reseverId : {
//                          $eq : myId
//                     }
//                }]
//           }]

//      }).sort({
//           updatedAt : -1
//      });
//      return msg;
// }

// module.exports.getFriends = async (req, res) => {
//      const myId = req.myId;
//      let fnd_msg = [];
//      try{
//           const friendGet = await User.find({
//                _id: {
//                    $ne: myId
//                }
//           });
//           for (let i = 0; i < friendGet.length; i++ ){
//                let lmsg = await getLastMessage(myId,friendGet[i].id);
//                fnd_msg = [...fnd_msg, {
//                     fndInfo : friendGet[i],
//                     msgInfo : lmsg
//                }]
               
//           }

//           // const filter = friendGet.filter(d=>d.id !== myId );
//           res.status(200).json({success:true, friends : fnd_msg})

//      }catch (error) {
//           res.status(500).json({
//                error: {
//                     errorMessage :'Internal Sever Error'
//                }
//           })
//      } 
// }

// module.exports.messageUploadDB = async (req, res) =>{

//      const {
//           senderName,
//           reseverId,
//           message
//      } = req.body
//      const senderId = req.myId;

//      try{
//           const insertMessage = await messageModel.create({
//                senderId : senderId,
//                senderName : senderName,
//                reseverId : reseverId,
//                message : {
//                     text: message,
//                     image : ''
//                }
//           })
//           res.status(201).json({
//                success : true,
//                message: insertMessage
//           })

//      }catch (error){
//           res.status(500).json({
//                error: {
//                     errorMessage : 'Internal Sever Error'
//                }
//           })
//      }

     
// }
// module.exports.messageGet = async(req,res) => {
//      const myId = req.myId;
//      const fdId = req.params.id;

//      try{
//           let getAllMessage = await messageModel.find({
               
//                $or: [{
//                     $and: [{
//                          senderId : {
//                              $eq: myId
//                          }
//                     },{
//                          reseverId : {
//                              $eq : fdId 
//                          }
//                     }]
//                }, {
//                     $and : [{
//                          senderId : {
//                               $eq : fdId
//                          } 
//                     },{
//                          reseverId : {
//                               $eq : myId
//                          }
//                     }]
//                }]
//           })
          
//           // getAllMessage = getAllMessage.filter(m=>m.senderId === myId && m.reseverId === fdId || m.reseverId ===  myId && m.senderId === fdId );
          
//           res.status(200).json({
//                success: true,
//                message: getAllMessage
//           })

//      }catch (error){
//           res.status(500).json({
//                error: {
//                     errorMessage : 'Internal Server error'
//                }
//           })

//      }
      
// }


// module.exports.ImageMessageSend = (req,res) => {
//      const senderId = req.myId;
//      const form = formidable();

//      form.parse(req, (err, fields, files) => {
//           const {
//               senderName,
//               reseverId,
//               imageName 
//           } = fields;

//           const newPath = __dirname + `../../../frontend/public/image/${imageName}`
//           files.image.originalFilename = imageName;

//           try{
//                fs.copyFile(files.image.filepath, newPath, async (err)=>{
//                     if(err){
//                          res.status(500).json({
//                               error : {
//                                    errorMessage: 'Image upload fail'
//                               }
//                          })
//                     } else{
//                          const insertMessage = await messageModel.create({
//                               senderId : senderId,
//                               senderName : senderName,
//                               reseverId : reseverId,
//                               message : {
//                                    text: '',
//                                    image : files.image.originalFilename
//                               }
//                          })
//                          res.status(201).json({
//                               success : true,
//                               message: insertMessage
//                          })

//                     }
//                } )

//           }catch (error){
//                res.status(500).json({
//                     error : {
//                          errorMessage: 'Internal Sever Error'
//                     }
//                })

//           }


//      })
// }

// module.exports.messageSeen = async (req,res) => {
//      const messageId = req.body._id;

//      await messageModel.findByIdAndUpdate(messageId, {
//          status : 'seen' 
//      })
//      .then(() => {
//           res.status(200).json({
//                success : true
//           })
//      }).catch(() => {
//           res.status(500).json({
//                error : {
//                     errorMessage : 'Internal Server Error'
//                }
//           })
//      })
// }


// module.exports.delivaredMessage = async (req,res) => {
//      const messageId = req.body._id;

//      await messageModel.findByIdAndUpdate(messageId, {
//          status : 'delivared' 
//      })
//      .then(() => {
//           res.status(200).json({
//                success : true
//           })
//      }).catch(() => {
//           res.status(500).json({
//                error : {
//                     errorMessage : 'Internal Server Error'
//                }
//           })
//      })
// }












// import User from "../models/authModal.js";
import User from "../models/authModel.js";
import messageModel from "../models/messageModel.js";
import formidable from "formidable";
import * as url from 'url';                 //for dirname
import fs from "fs";




const getLastMessage=async(myId, fdId)=>{              
     const msg=await messageModel.findOne({ $or: [{       //list in which me is sender or reciever.
          $and: [{
               senderId : {
                   $eq: myId
               }
          },{
               reseverId : {
                   $eq : fdId 
               }
          }]
     }, {
          $and : [{
               senderId : {
                    $eq : fdId
               } 
          },{
               reseverId : {
                    $eq : myId
               }
          }]
     }]}).sort({
          updatedAt:-1
     });




return msg;
}

export const getFriends = async (req, res) => {
     const myId=req.myId;
     let fnd_msg = [];
     try{
          const friendGet = await User.find({      
           
                    _id:{
                         $ne:myId
                    }
            
          });
          // console.log("fnd msg is ;.....1");
          
          for(let i=0; i<friendGet.length; i++){       // for showing last message of every user in leftmost friendlist.
               // console.log("fnd msg is ;.....4");
               let lmsg=await getLastMessage(myId, friendGet[i].id);
     //     console.log(lmsg);

               fnd_msg=[                                  // for showing last message of every user in leftmost friendlist.
                    ...fnd_msg,{
                         fndInfo:friendGet[i],
                         msgInfo:lmsg
                    }
               ]
               // console.log("fnd msg is ;.....2");
               // console.log(fnd_msg);
          }


          

          // const friendGet=friendGet.friendGet(d=>d.id!==myId);
          res.status(200).json({success:true, friends : fnd_msg});

     }catch (error) {
          console.log(error);
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     }
}



export const messageUploadDB = async (req, res) => {
const{
     senderName,
     reseverId,
     message
} =req.body

const senderId=req.myId;

try{
const insertMessage=await messageModel.create({
     senderId:senderId,
     senderName:senderName,
     reseverId:reseverId,
     message:{
          text:message,
          image:'',

     }
})
res.status(201).json({
     success:true,
     message:insertMessage
})




}catch(error){
res.status(500).json({
     error:{
          errorMessage:"Internal Server Error"
     }
})
}
}

export const messageGet=async(req, res)=>{
    const myId=req.myId;
    const fdId=req.params.id;
//     console.log(myId);
//     console.log(fdId);
//     console.log(fdId);
//     console.log();
    
try{
     let getAllMessage=await messageModel.find({    
          $or: [{
               $and: [{
                    senderId : {
                        $eq: myId
                    }
               },{
                    reseverId : {
                        $eq : fdId 
                    }
               }]
          }, {
               $and : [{
                    senderId : {
                         $eq : fdId
                    } 
               },{
                    reseverId : {
                         $eq : myId
                    }
               }]
          }]
     });

     


     // getAllMessage=getAllMessage.filter((m)=> (m.senderId===myId && m.reseverId===fdId) || (m.reseverId===myId && m.senderId===fdId));
     res.status(200).json({                 //this res.josn is out put send to that get method of axios
          success: true,
          message: getAllMessage
     })
}
catch(error){
res.status(500).json({
     error:{
          errorMessage:"Internal Server error"
     }
})
}
}



export const ImageMessageSend= async(req, res)=>{
const senderId=req.myId;
const form=formidable();

form.parse(req, (error, fields, files)=>{
   let {senderName, imageName, reseverId}=fields;
//    console.log("in messengercontroller imagename is"+imageName[0]);
//    console.log("in messengercontroller imagename is2"+imageName);

   senderName=senderName;
   imageName=imageName.replace(/\s/g, "");
   reseverId=reseverId;



   const newPath=url.fileURLToPath(new URL(`../../frontend/public/image/${imageName}`, import.meta.url));    //suppose this image is present in the image folder now it is creating path for that image
//newPath is the path created by us and using fs.copy we are giving path of uploaded image in our newPath so that our image will get stored in this newPath and we have also chaned the Original name of image from below line,
//  In this way image has been stored in our db. 
   files.image.originalFilename=imageName.replace(/\s/g, "");

   try{

     fs.copyFile(files.image.filepath, newPath, async(error)=>{

          if(error){

             res.status(500).json({

               error:{
                    errorMessage:'Image upload fail'
               }
             })  
          }else{

               const insertMessage=await messageModel.create({
                   
                    senderId:senderId,
                    senderName:senderName,
                    reseverId:reseverId,
                    message:{
                         text:'',
                         image:files.image.originalFilename,
               
                    }
               })
              
               res.status(201).json({
                    success:true,
                    message:insertMessage
               })


          }
     })

   }catch{

res.status(500).json({
     error:{
          errorMessage:'Internal Server Error In storing Image'
     }
})
   }


})
}

export const messageSeen=async(req, res)=>{               //for showing seen unseen functionality
     const messageId=req.body._id;
     // console.log(req.body);
console.log(messageId);
     await messageModel.findByIdAndUpdate(messageId, {
          status:'seen'
     }).then(()=>{
          res.status(200).json({
               success:true
          })
     }).catch(()=>{
          res.status(500).send({
               error:{
                    errorMessage:"Internal Server Error"
               }
          })
     })
}




export const delivaredMessage=async(req, res)=>{           //for showing seen unseen functionality
     const messageId=req.body._id;                         //req.body has message i.e socket msg i.e last message sent and it is what we sent earlier to redux which is response of api
                                                           // messageSend means that resposne is of what we store in db therefore it will have id same as store in db.
     await messageModel.findByIdAndUpdate(messageId, {
          status:'delivared'
     }).then(()=>{
          res.status(200).json({
               success:true
          })
     }).catch(()=>{
          res.status(500).send({
               error:{
                    errorMessage:"Internal Server Error"
               }
          })
     })
}



export const deleteMineMessage=async(req, res)=>{
    try{
     const msgId=req.body.msgId;
     const myId=req.body.myId;

     const data=await messageModel.findByIdAndUpdate(msgId,{deleMsgMine:myId});



// console.log("data is aa"+data);



     if(data){
          res.status(201).json({
               msg:"success"
          })
     }else{
          res.status(500).send({
               error:{
                    errorMessage:"Internal Server Error"
               }
          })
     }
    }catch(err){
console.log("error in deleteMineMessageController is"+err);
    }
}







export const deleteBothMsg=async(req, res)=>{
     try{
      const msgId=req.body.msgId;
    
 
      const data=await messageModel.findByIdAndDelete(msgId);
 
 if(data){
           res.status(201).json({
                msg:"success"
           })
      }else{
           res.status(500).send({
                error:{
                     errorMessage:"Internal Server Error"
                }
           })
      }
     }catch(err){
 console.log("error in deleteMineMessageController is"+err);
     }
 }













//this file i.e this middleware is created to remove logged in user from friends list and many more.