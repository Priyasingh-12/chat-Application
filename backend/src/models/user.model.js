import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        profilePicture:{
            type:String,
            default:"",
        },

    },
    {timestamps:true}
)
const User = mongoose.model("User",userSchema);            //Users saved in mongodb atlas
export default  User ;
