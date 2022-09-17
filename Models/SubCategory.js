const mongoose=require('mongoose');
const schemaSubCategory=new mongoose.Schema(
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
    
        category:{  // premiere etape relation one
            type:mongoose.Types.ObjectId,
            ref:'Category',
            required:true,
        }
    },
    {timestamps:true}
);
module.exports=mongoose.model('SubCategory',schemaSubCategory);