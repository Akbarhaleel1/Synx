const CustomReview=require("../../models/customreview")
const ReviewLink=require("../../models/reviewLink")

const reviewPage=async (req,res)=>{
    try {
        const {endpoint}=req.query.name;
        const review=await ReviewLink.findOne({endpoint:endpoint}).populate("review")

    } catch (error) {
        
    }
}