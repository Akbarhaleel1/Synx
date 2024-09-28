const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const montlylimitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    email:{
      type:Number,
    },
    phone:{
      type:Number,
    },
    whatsapp:{
      type:Number,
    }
  });
  
  const monthlylimit = mongoose.model("monthlylimit", montlylimitSchema);
  
  module.exports = monthlylimit;