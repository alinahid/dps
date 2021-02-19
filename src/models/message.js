const mongoose=require('mongoose');
 


var messageSchema= mongoose.Schema({
    name:{
        type:String
    },
    principal: {
       heading:{
           type:String
       },
       body:{
           typr:String
       }
    } ,
    director:{
        heading:{
            type:String
        },
        body:{
            typr:String
        }
    } 
  });
  const Message = mongoose.model("Message", messageSchema);
  module.exports = Message