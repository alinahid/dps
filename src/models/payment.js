const mongoose=require('mongoose');
 


var paymentSchema= mongoose.Schema({

    name: {
      type: String,
      require: true
    },
    class:{
      type: String,
      require: true
    },
    ad_no:{
        type: String
    },
    email:{
        type: String
    },
    order_id :{
        type:String
    }
  
  });
  const Payment = mongoose.model("Payment", paymentSchema);
  module.exports = Payment