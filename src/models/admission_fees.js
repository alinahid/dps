const mongoose=require('mongoose');
 


var admissionFeesSchema= mongoose.Schema({
   payment:{
    type:Boolean,
    default:false
   },
    email:{
        type:String
    } ,
    order:{
        type:String
    }
  });
  const admissionFees = mongoose.model("admissionFees", admissionFeesSchema);
  module.exports = admissionFees