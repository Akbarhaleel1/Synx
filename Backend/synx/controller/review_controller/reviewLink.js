const ReviewLink=require("../../models/reviewLink")
const IntegratedSite = require("../../models/integration");
const createOrUpdateReviewLink = async (req, res) => {
    const { user, data } = req.body;
   console.log('endpoint',data)
  
    try {
      
      const reviewLinkData = {
        user: user._id,
        link: `https://synx-frontend-hosting-9kae.vercel.app/HotelReview?endpoint=${data.endpoint}`,
        endpoint: data.endpoint,
        title: data.linkTitle,
        starFilter: data.initialPage,
      };
      console.log('reviewLinkData',reviewLinkData)
        const reviewLink = await ReviewLink.findOneAndUpdate(
          { user: user._id }, 
          reviewLinkData, 
          {
            new: true,  
            upsert: true, 
          }
        );
        console.log('reviewLink',reviewLink)
        return res.status(200).json({ message: "Review link created successfully", reviewLink });
      
    } catch (error) {
      console.error("Error creating or updating review link:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

const reviewlink= async(req,res)=>{
  try {
    const {user}=req.body
    console.log(user)
    console.log("reviewlinkkkkkkkkkkkkkkkkkkkkkkk",req.body)
    const integratedpage=await IntegratedSite.find({user:user._id})
    const link= await ReviewLink.findOne({user:user._id})
    return res.status(200).json({ message: "Review link created successfully",link ,integratedpage:integratedpage});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
module.exports={
    createOrUpdateReviewLink,reviewlink
}