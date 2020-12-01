const mongoose=require('mongoose')


var noticeSchema = mongoose.Schema({

    title: {
      type: String,
      require: true
    },
    name:{
      type: String,
      require: true
    }
  
  });
  const Notice = mongoose.model("Notice", noticeSchema);
  module.exports = Notice