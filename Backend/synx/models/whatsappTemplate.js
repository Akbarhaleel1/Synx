const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const whatsapTemplate = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    name: {
      type: String
    },
    message: {
      type: String,
    }
  });
  
  const whatsapTemp = mongoose.model("whatsapTemplate", whatsapTemplate);
  
  module.exports = whatsapTemp;