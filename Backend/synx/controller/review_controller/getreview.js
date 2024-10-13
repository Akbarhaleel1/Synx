
const { generateQRCode } = require('../../components/qrcode');
const ReviewLink=require("../../models/reviewLink")
const EmailTemplate=require("../../models/emailtemp")
const Etemplate=require("../../models/template")
const WhatsapTemplate=require("../../models/whatsappTemplate")

const generateqr= async (req, res) => {
  const {user}=req.body
  const userData=JSON.parse(user)
  console.log(userData)
  try {
    const linkdata= await ReviewLink.findOne({user:userData._id})
    
    let link=`${linkdata.link}&qr=qr`
    const qrCodeDataURL = await generateQRCode(link);

    if(!linkdata){
      return res.status(200).send({status:false})
    }
    return res.status(200).send({msg:"qrcode",qrCodeDataURL,link,status:true});
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
    if(!emailtemp||!linkdata){
      return res.status(200).send({status:false})
    }
    console.log('emailtemp',emailtemp)
    return res.status(200).send({msg:"emailpage",email:emailtemp,link:linkdata.link,status:true})
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

    if(!emailtemp||!linkdata){
      return res.status(200).send({msg:'emailtemp and linkdata is not difined'})
    }
    return res.status(200).send({msg:"emailpage",email:emailtemp,link:linkdata.link,status:true})
  } catch (error) {
    
  }
}

const saveOrUpdateWhatsappTemplate = async (req, res) => {
  const { user, companyName, messageTemplate } = req.body;
  console.log(req.body)
  const userData = JSON.parse(user);

  try {
    console.log('req.body', req.body);
    
    const existingTemplate = await WhatsapTemplate.findOneAndUpdate(
      { user: userData._id }, 
      { name:companyName, message:messageTemplate },
      { new: true, upsert: true } 
    );
    
   
    if (existingTemplate) {
      res.status(200).json({ message: "whatsapp template updated successfully",email:existingTemplate });
    } else {
      res.status(201).json({ message: "whatsapp template created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save or update email template" });
  }
};

const wpage=async(req,res)=>{
  const user =req.body.user
  const userData=JSON.parse(user)
  console.log(req.body)
  try {
    const whatsaptemp=await WhatsapTemplate.findOne({user:userData._id})
    const linkdata= await ReviewLink.findOne({user:userData._id})
    console.log('whatsapp',whatsaptemp);
    console.log('linkdata',linkdata);
    if(!whatsaptemp||!linkdata){
      return res.status(200).send({status:false})
    }
    return res.status(200).json({msg:"whatspage",whatsap:whatsaptemp,link:linkdata.link,status:true})
  } catch (error) {
    return res.status(500).json({msg:"error "})
  }
};

 module.exports={
    generateqr,saveOrUpdateEmailTemplate,emailpage,saveOrUpdateETemplate,epage,saveOrUpdateWhatsappTemplate,wpage,
 }