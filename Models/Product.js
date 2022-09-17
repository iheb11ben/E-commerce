const mongoose=require('mongoose');


const GalleryShema=new mongoose.Schema({
    name: {
    trim:true,
    type:String,
    required:true, 
    
},
description:{
    type:String,
    required:false,}

})

const schemaProduct=new mongoose.Schema(
    {
        ref: {
            type:String,
            required:true, 
            
        },
        description:{
            type:String,
            required:false,
        },
        price: {
            type:String,
            required:true, 
        },
        qte:{
            type:Number,
            required:true,
        },
        gallery:[GalleryShema],
        Subcategory:{  //  relation one
            type:mongoose.Types.ObjectId,
            ref:'SubCategory',
            required:false,
        }
    },
    {timestamps:true} //pour ajouter createdat et updatedat des models
);
module.exports=mongoose.model('Product',schemaProduct);