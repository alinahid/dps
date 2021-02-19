const mongoose=require('mongoose')


var categorySchema = mongoose.Schema({

    title: {
      type: String,
      require: true
    },
    picname:{
      type: String,
      require: true
    }
  
  });
  const category = mongoose.model("category", categorySchema);
  module.exports = category;