const mongoose=require('mongoose');
const schemaCategory=new mongoose.Schema(
    {
        name: {
            type:String,
            required:true, 
            unique:true,
            minlenght:4,
            trim :true,
        },
        description:{
            type:String,
            required:true,
        },
        subCategories :[{
            type:mongoose.Types.ObjectId,
            ref:'SubCategory'
        },],
    },
    {timestamps:true}
);
module.exports=mongoose.model('Category',schemaCategory);