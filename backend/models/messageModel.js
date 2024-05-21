import mongoose from 'mongoose';
const {model,Schema}=mongoose;
const messageSchema = new Schema({
     senderId : {
          type : String,
          required : true
     },
     senderName : {
          type: String,
          required : true
     },
     reseverId : {
          type: String,
          required : true          
     },
     message : {
          text : {
               type: String,
               default : ''
          },
          image : {
               type : String,
               default : ''
          }           
     },
     deleMsgMine:{
          type:String,
          default:''
     },
     status :{
          type : String,
          default : 'unseen'
     }
},{timestamps : true});

export default model('message',messageSchema);