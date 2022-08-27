const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const inventorymodel = new mongoose.Schema( {
    inventorytitle: { 
        type:String,
        required:true
         },
    body: {
     type:String,
     required :true
    },
    rationId: {
        type:ObjectId,
        required:true,
        ref:"rationModel"
    },
    tags: { 
        type:[String]
    },
    category: {
        type:[],
         required:true
    },
    subcategory: {
        type:[]
        
    },
    isDeleted: { 
        type:Boolean,
         default: false 
        },
    deletedAt :{
        type:Date,
        default : Date.now()
       
    },
    isPublished: {
        type:Boolean,
         default: false 
    },
    publishedAt:{
        type:Date,
        default : Date.now()
    }
   
    

}, { timestamps: true });   
   
module.exports = mongoose.model('Inventories', inventorymodel)