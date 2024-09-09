const ReviewLink=require("../../models/reviewLink")

const createOrUpdateReviewLink = async (req, res) => {
    const { user, data } = req.body;
   console.log('endpoint',data)
  
    try {
      
      const reviewLinkData = {
        user: user._id,
        link: `http://localhost:5173/HotelReview?name=${data.endpoint}`,
        endpoint: data.endpoint,
        title: data.linkTitle,
        starFilter: data.initialPage,
      };
        const reviewLink = await ReviewLink.findOneAndUpdate(
          { user: user._id }, 
          reviewLinkData, 
          {
            new: true, 
            upsert: true, 
          }
        );

        return res.status(201).json({ message: "Review link created successfully", reviewLink });
      
    } catch (error) {
      console.error("Error creating or updating review link:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports={
    createOrUpdateReviewLink
}