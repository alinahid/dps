const mongoose=require('mongoose')


var picSchema = mongoose.Schema({

    category: {
      type: String,
    },
    picname:{
      type: String,
    }
  
  });
  const pic = mongoose.model("pic", picSchema);
  module.exports = pic;