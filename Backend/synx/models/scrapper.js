const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const scrapperSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      type: String,
      enum: ["airbnb","tripadvisor","makemytrip","gobigo", "trustpilot", "booking.com", "agoda","google"],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  });
  
  const scrapper = mongoose.model("scrapper", scrapperSchema);
  
  module.exports = scrapper ;