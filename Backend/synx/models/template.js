const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

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