const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const customReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    stars:{
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