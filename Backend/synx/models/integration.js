const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

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