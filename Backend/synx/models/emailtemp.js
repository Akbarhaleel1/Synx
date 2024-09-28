const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const emailTemplate = new mongoose.Schema({
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
  
  const emailTemp = mongoose.model("email", emailTemplate);
  
  module.exports = emailTemp;