const EmailTemplate=require("../../models/emailtemp")
const ReviewLink=require("../../models/reviewLink")
const MonthlyLimit=require("../../models/monthlylimit")
const twilio = require('twilio');
const nodemailer = require("nodemailer");
const Etemplate=require("../../models/template")


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

const sms=async (req, res) => {
    const {user,contacts} = req.body
    console.log("keri")
    const userData=JSON.parse(user)
    const emailtemp=await EmailTemplate.findOne({user:userData._id})
    const linkdata= await ReviewLink.findOne({user:userData._id})
    // const monthlydata=await MonthlyLimit.findOne({user:userData._id})


    // if(monthlydata.phone>contacts.length){
    //     return res.status(400).send({ msg: 'it seems more than monthly limit' });
    // }
    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).send({ error: 'Invalid contacts data' });
    }

  
    const results = [];
  
    for (const q of contacts) {
      const { name, contact } = q;
      console.log(q)
  
      if (!contact) {
        results.push({ name, status: 'Failed', error: 'Invalid phone number' });
        continue;
      }
  
      try {
        const message = await client.messages.create({
          body: `Hi ${name}, ${emailtemp.message} ${linkdata.link}`,
          from: "+14159430799", 
          to: contact
        });
        
        results.push({ name, status: 'Sent', messageSid: message.sid });
      } catch (error) {
        results.push({ name, status: 'Failed', error: error.message });
      }
      // let count=monthlydata.phone;
      // count--;
      // const monthlycount= await MonthlyLimit.findOneAndUpdate(
      //   { user: userData._id }, 
      //   { phone:count},
      //   { new: true, upsert: true } 
      // );
    }
    console.log(results)
    return res.status(200).json({msg:"sms sent "});
  }
 
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

const email=async (req, res) => {
    const {user,email} = req.body
    console.log("keri",req.body)
    const userData=JSON.parse(user)
    const emailtemp=await Etemplate.findOne({user:userData._id})
    const linkdata= await ReviewLink.findOne({user:userData._id})
    // const monthlydata=await MonthlyLimit.findOne({user:userData._id})


    // if(monthlydata.phone>contacts.length){
    //     return res.status(400).send({ msg: 'it seems more than monthly limit' });
    // }
    if (!email || !Array.isArray(email)) {
      return res.status(400).send({ error: 'Invalid contacts data' });
    }

  
    const results = [];
  
    for (const mail of email) {
      const { name, contact } = mail;
      console.log(mail)
  
      if (!contact) {
        results.push({ name, status: 'Failed', error: 'Invalid mail id' });
        continue;
      }
  
      try {
        const mailOptions = {
            from: 'fito.kripp@gmail.com',
            to: contact,
            subject: `Hi ${name}`,
            text: `Hi ${name}, ${emailtemp.message} ${linkdata.link}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               console.log("kitteela",error)
                results.push({name, msg: "Error sending OTP email" });
            } else {
              console.log("kitty")
                results.push({name, msg: "sent to your email",info:info.response});
            }
          });
        
      } catch (error) {
        results.push({ name, status: 'Failed', error: error.message });
      }
      // let count=monthlydata.phone;
      // count--;
      // const monthlycount= await MonthlyLimit.findOneAndUpdate(
      //   { user: userData._id }, 
      //   { phone:count},
      //   { new: true, upsert: true } 
      // );
    }
    console.log(results)
    return res.status(200).json({msg:"email sent "});
  }


  module.exports={
    sms,email
  }