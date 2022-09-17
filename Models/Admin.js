const mongoose=require('mongoose');
const User=require('../Models/User');
const schemaAdmin=new mongoose.Schema(
    {picture : {
    type:String,
},
});
module.exports=User.discriminator('Admin',schemaAdmin)