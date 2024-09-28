const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const reviewLinkSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    endpoint:{
      type:String,
    },
    title:{
        type:String,
        required:true
    },
    starFilter:{
        type:String,
        required:true
    }

  });
  
  const reviewLink = mongoose.model("reviewLinkSchema", reviewLinkSchema);
  
  module.exports = reviewLink  ;