const Synxreview = require("../../models/customreview");


const getUserReviews = async (req, res) => {
    try {
      const { user } = req.body;
      console.log(req.body)
      const userReviews = await Synxreview.find({ user:user._id });
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
    getUserReviews
}
