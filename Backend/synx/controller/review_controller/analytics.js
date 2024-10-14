
const Analytics = require("../../models/analise");

const getAnalytics= async (req,res)=>{
    try {
        const{user}=req.body
        console.log(user)
        const data=await Analytics.findOne({user:user._id});
        console.log('Analytics data is this',data)
        return res.status(200).json({msg:"data send successfully",data})
    } catch (error) {
        return res.status(500).json({msg:"error",error})
    }
}

module.exports={
    getAnalytics,
}