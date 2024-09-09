const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const integrationSchema = new mongoose.Schema({
    image: {
      type: String
    },
    platform: {
      type: String,
    },
    link: {
      type: String,
    },
  });
  
  const integration = mongoose.model("integration", integrationSchema);
  
  module.exports = integration;