import mongoose from 'mongoose';
const {model,Schema}=mongoose;

const registerSchema = new Schema({
     userName : {
          type : String,
          required : true
     },
     email : {
          type: String,
          required : true
     },
     password : {
          type: String,
          required : true,
          select : false
     },
     image : {
          type: String,
          required : true
     }
},{timestamps : true});

// module.exports = model('user',registerSchema);
export default model('user',registerSchema); 
// export {Schema};