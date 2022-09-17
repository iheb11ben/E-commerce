const mongoose=require('mongoose');
const User =require('../Models/User');
const schemaCustomer=new mongoose.Schema(
    {
        picture: {
            type:String,
        },
        adress:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
            
        },  
        cin:{
            type:String,
            required:true, },
    },
  
);
module.exports=User.discriminator('Customer',schemaCustomer);