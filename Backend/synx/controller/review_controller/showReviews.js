const ScrapperData=require("../../models/review")

const showReview=async(req,res)=>{
    const{user}=req.body
    console.log(req.body)
    try {
        const userData=JSON.parse(user)
        const review=await ScrapperData.find({user:userData._id})
        return res.status(200).json({msg:"reviews get successfully",review,status:true})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

module.exports={
    showReview
}