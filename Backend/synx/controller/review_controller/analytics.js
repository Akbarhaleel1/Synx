
const Analytics = require("../../models/analise");

const getAnalytics= async (req,res)=>{
    try {
        const{user}=req.body
        console.log(user)
        const data=await Analytics.findOne({user:user._id});
        return res.status(200).send({msg:"data send successfully",data})
    } catch (error) {
        return res.status(500).send({msg:"error",error})
    }
}

module.exports={
    getAnalytics,
}