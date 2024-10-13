const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);
const AnalyticsSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    enum: ['airbnb', 'agoda', 'trustpilot', 'booking.com', 'tripadvisor', 'makemytrip', 'gobigo',"google"], 
    required: true,
  },
  averagerating: {
    type: Number,
    required: true,
  },
  reviewCount: [{
    date: {
      type: Date,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
