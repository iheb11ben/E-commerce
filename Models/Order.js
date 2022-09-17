const mongoose = require('mongoose')
const ItemOrderProductShema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    qte: { type: Number, required: true },
    price: {
        type: String,
        required: true,
    },

})
const SchemaOrder = new mongoose.Schema({
    
    customer: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
    },
    ref: {
        type: String,
        required: true,
    },
    priceTotal: {
        type: String,
        required: true
    },
    qteTotal: {
        type: Number,
        required: true,
    },
    pay: {
        type: Boolean,
        default: false
    },
    product: [ItemOrderProductShema],
} ,
{timestamps:true}


)
module.exports=mongoose.model('Order',SchemaOrder);