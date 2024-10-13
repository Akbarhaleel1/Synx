const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const googlereviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  accountId: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  reviews: [
    {
      reviewId: {
        type: String,
        required: true,
      },
      reviewerName: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      reviewDate: {
        type: Date,
        required: true,
      },
      reply: {
        type: String,
      },
      replyDate: {
        type: Date,
      },
    },
  ],
});

const GoogleReviews = mongoose.model("GoogleReviews", googlereviewsSchema);

module.exports
