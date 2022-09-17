const mongoose=require('mongoose');
const User = require('../Models/User');

const schemaProvider=new mongoose.Schema(
    {
        picture: {
            type:String,
        },
        matricule: {
            type:String,
            required:true, 
            unique:true,
            minlenght:4,
            trim :true,
        },
        company:{
            type:String,
            required:true,
        },
        service:{
            type:String,
            required:true,
        },  
     
    },
    
);
module.exports=User.discriminator('Provider',schemaProvider);