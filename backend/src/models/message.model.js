import mongoose from 'mongoose';
import User from "./user.model.js"; 
const userSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        receiverId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
            default:"",
        },

    },
    {timestamps:true}
)
const Message = mongoose.model("Message",userSchema);            
export default  Message ;
