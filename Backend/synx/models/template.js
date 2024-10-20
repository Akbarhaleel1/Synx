const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const Etemplate = new mongoose.Schema({
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
  
  const emailTemps = mongoose.model("template", Etemplate);
  
  module.exports = emailTemps;