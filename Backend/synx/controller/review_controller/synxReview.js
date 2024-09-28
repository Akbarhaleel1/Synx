const Synxreview = require("../../models/customreview");

const getReview = async (req, res) => {
  try {
    const { user, email, name, phone, review, date } = req.body;
    
    const newReview = new Synxreview({
      user,
      email,
      name,
      phone,
      review,
      date: date || new Date()
    });

    const savedReview = await newReview.save();
    
    res.status(201).json({
      message: "Review successfully saved",
      data: savedReview
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save review",
      error: error.message
    });
  }
};

const getUserReviews = async (req, res) => {
    try {
      const { user } = req.body;
  
      const userReviews = await Synxreview.find({ user });
  
      res.status(200).json({
        message: "User reviews fetched successfully",
        data: userReviews
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user reviews",
        error: error.message
      });
    }
  };

module.exports = {
    getReview,
    getUserReviews
}
