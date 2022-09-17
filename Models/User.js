const mongoose=require('mongoose');

const schemaUser=new mongoose.Schema(
    {
        fullname: {
            type:String,
            required:true, 
            trim :true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },  
        phone:{
            type:Number,
            required:true,
        },
        verified:{
            type:Boolean,
            default:false,
        },
        verificationcode:{
            type:String,
            required:false,
        },
        resetpassword:{
            data:String,
            default:"",
        }
    }
);
module.exports=mongoose.model('User',schemaUser);