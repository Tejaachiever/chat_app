const mongoose= require("mongoose");

const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            min:3,
            max:20,
            unique:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            max:20,

        },
        password:{
            type:String,
            
            required:true,
            min:2,
            max:50,
        },
        is_profile_image_set:{
            type:Boolean,
            default:false,

        },
        profile_image:{
            type:String,
            default:"",

        },
    }

);

module.exports= mongoose.model("Users",userSchema);