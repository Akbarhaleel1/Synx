const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

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