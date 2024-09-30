
const { generateQRCode } = require('../../components/qrcode');
const ReviewLink=require("../../models/reviewLink")
const EmailTemplate=require("../../models/emailtemp")
const Etemplate=require("../../models/template")

const generateqr= async (req, res) => {
  const {user}=req.body
  const userData=JSON.parse(user)
  console.log(userData)
  try {
    const linkdata= await ReviewLink.findOne({user:userData._id})
    
    let link=`${linkdata.link}&qr=qr`
    const qrCodeDataURL = await generateQRCode(link);


    return res.status(200).send({msg:"qrcode",qrCodeDataURL,link});
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
};


const saveOrUpdateEmailTemplate = async (req, res) => {
  const { user, companyName, message } = req.body;
  const userData = JSON.parse(user);

  try {
    console.log('req.body', req.body);
    
    const existingTemplate = await EmailTemplate.findOneAndUpdate(
      { user: userData._id }, 
      { name:companyName, message },
      { new: true, upsert: true } 
    );
    const emailtemp=await EmailTemplate.findOne({user:userData._id})
   console.log(emailtemp)
    if (existingTemplate) {
      res.status(200).json({ message: "Email template updated successfully",email:existingTemplate });
    } else {
      res.status(201).json({ message: "Email template created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save or update email template" });
  }
};

const emailpage=async(req,res)=>{
  const user =req.body.user
  const userData=JSON.parse(user)
  console.log(req.body)
  try {
    const emailtemp=await EmailTemplate.findOne({user:userData._id})
    const linkdata= await ReviewLink.findOne({user:userData._id})
    console.log('emailtemp',emailtemp)
    return res.status(200).send({msg:"emailpage",email:emailtemp,link:linkdata.link})
  } catch (error) {
    
  }
}

const saveOrUpdateETemplate = async (req, res) => {
  const { user, companyName, emailContent } = req.body;
  const userData = JSON.parse(user);

  try {
    console.log('req.body', req.body);
    
    const existingTemplate = await Etemplate.findOneAndUpdate(
      { user: userData._id }, 
      { name:companyName, message:emailContent },
      { new: true, upsert: true } 
    );
    
   
    if (existingTemplate) {
      res.status(200).json({ message: "Email template updated successfully",email:existingTemplate });
    } else {
      res.status(201).json({ message: "Email template created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save or update email template" });
  }
};
const epage=async(req,res)=>{
  const user =req.body.user
  const userData=JSON.parse(user)
  console.log(req.body)
  try {
    const emailtemp=await Etemplate.findOne({user:userData._id})
    const linkdata= await ReviewLink.findOne({user:userData._id})
    console.log('emailtemp',emailtemp)
    return res.status(200).send({msg:"emailpage",email:emailtemp,link:linkdata.link})
  } catch (error) {
    
  }
}

 module.exports={
    generateqr,saveOrUpdateEmailTemplate,emailpage,saveOrUpdateETemplate,epage
 }