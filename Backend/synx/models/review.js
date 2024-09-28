const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

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


const reviewSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    platform: {
        type: String,
        enum: ['airbnb', 'agoda', 'trustpilot', 'booking.com', 'tripadvisor', 'makemytrip', 'gobigo'],
        // required: true
    },
    image: {
        type: String,
        default: null
    },
    date: {
        type: String,
    },
    name: {
        type: String,
    },
    title: {
        type: String,
        default: null
    },
    review: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
    },
    link: {
        type: String,
    }
});


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
