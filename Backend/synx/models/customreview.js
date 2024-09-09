const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const customReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviewLinkSchema",
        required: true,
      },
    email:{
      type:String,
    },
    name:{
      type:String,
    },
    phone:{
      type:Number,
    },
    review:{
        type:String,
      },
      date:{
        type:Date,
        
      }
  });
  
  const customreview = mongoose.model("customreview", customReviewSchema);
  
  module.exports = customreview;