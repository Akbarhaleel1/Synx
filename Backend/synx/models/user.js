const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;

// Event for successful connection
db.on("connected", () => {
  console.log("MongoDB connected successfully!");
});

// Event for connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Event for disconnection
db.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});


const userBase = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  otp:{
    type: Number
  },
  isVerified:{
    type: Boolean,
    default:false
  },
  customerId:{
    type:String,
    required:true
  },
  companyname:{
    type:String
  }
});
const User = mongoose.model('User', userBase);

module.exports = User;