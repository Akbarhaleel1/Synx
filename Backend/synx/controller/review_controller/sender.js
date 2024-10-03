const EmailTemplate=require("../../models/emailtemp")
const ReviewLink=require("../../models/reviewLink")
const MonthlyLimit=require("../../models/monthlylimit")
const plivo = require('plivo');
const nodemailer = require("nodemailer");
const Etemplate=require("../../models/template")
const axios = require('axios');
const whatsapTemplate=require("../../models/whatsappTemplate")

const sms = async (req, res) => {
  const plivoClient = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
  const { user, contacts } = req.body;
  console.log("keri");
  const userData = JSON.parse(user);
  const emailtemp = await EmailTemplate.findOne({ user: userData._id });
  const linkdata = await ReviewLink.findOne({ user: userData._id });
  // const monthlydata = await MonthlyLimit.findOne({ user: userData._id });

  // if(monthlydata.phone > contacts.length) {
  //   return res.status(400).send({ msg: 'it seems more than monthly limit' });
  // }

  if (!contacts || !Array.isArray(contacts)) {
    return res.status(400).send({ error: 'Invalid contacts data' });
  }

  const results = [];

  for (const q of contacts) {
    const { name, contact } = q;
    console.log(q);

    if (!contact) {
      results.push({ name, status: 'Failed', error: 'Invalid phone number' });
      continue;
    }
    try {
      const response = await plivoClient.messages.create(
        process.env.PLIVO_NUM, // Sender's phone number
        contact, // Receiver's phone number
        `Hi ${name}, ${emailtemp.message} ${linkdata.link}`
      );

      results.push({ name, status: 'Sent', messageUuid: response.messageUuid });
    } catch (error) {
      results.push({ name, status: 'Failed', error: error.message });
    }

    // let count = monthlydata.phone;
    // count--;
    // const monthlycount = await MonthlyLimit.findOneAndUpdate(
    //   { user: userData._id },
    //   { phone: count },
    //   { new: true, upsert: true }
    // );
  }

  console.log(results);
  return res.status(200).json({ msg: "sms sent " });
};
 
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

const email= async (req, res) => {
    const {user,email} = req.body
    console.log("keri",req.body)
    const userData=JSON.parse(user)
    const emailtemp=await Etemplate.findOne({user:userData._id})
    const linkdata=await ReviewLink.findOne({user:userData._id})
    console.log(linkdata)
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
      console.log(name)
  
      if (!contact) {
        results.push({ name, status: 'Failed', error: 'Invalid mail id' });
        continue;
      }
  console.log(emailtemp)
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
        console.log(error)
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


// const email = async (req, res) => {
//   const { user, email } = req.body;
//   console.log("keri", req.body);
//   const userData = JSON.parse(user);
//   const emailtemp = await Etemplate.findOne({ user: userData._id });
//   const linkdata = await ReviewLink.findOne({ user: userData._id });

//   if (!email || !Array.isArray(email)) {
//       return res.status(400).send({ error: 'Invalid contacts data' });
//   }

//   if (!emailtemp) {
//       return res.status(404).send({ error: 'Email template not found' });
//   }

//   if (!linkdata) {
//       return res.status(404).send({ error: 'Link data not found' });
//   }

//   const results = [];

//   for (const mail of email) {
//       const { name, contact } = mail;
//       console.log(mail);

//       if (!contact) {
//           results.push({ name, status: 'Failed', error: 'Invalid mail id' });
//           continue;
//       }

//       try {
//           const mailOptions = {
//               from: 'fito.kripp@gmail.com',
//               to: contact,
//               subject: `Hi ${name}`,
//               text: `Hi ${name}, ${emailtemp.message} ${linkdata.link}`,
//           };
//           transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                   console.log("kitteela", error);
//                   results.push({ name, msg: "Error sending OTP email" });
//               } else {
//                   console.log("kitty");
//                   results.push({ name, msg: "sent to your email", info: info.response });
//               }
//           });
//       } catch (error) {
//           results.push({ name, status: 'Failed', error: error.message });
//       }
//   }

//   console.log(results);
//   return res.status(200).json({ msg: "email sent ", results });
// };

// const email = async (req, res) => {
//   try {
//     const { user, email } = req.body;
//     console.log('req.body',req.body)
//     if (!user || !email || !Array.isArray(email)) {
//       return res.status(400).send({ error: 'Invalid input data' });
//     }

//     const userData = JSON.parse(user);
//     const emailtemp = await Etemplate.findOne({ user: userData._id });
//     const linkdata = await ReviewLink.findOne({ user: userData._id });

//     if (!emailtemp) {
//       return res.status(404).send({ error: 'Email template not found' });
//     }

//     if (!linkdata) {
//       return res.status(404).send({ error: 'Link data not found' });
//     }

//     // Function to promisify the transporter.sendMail
//     const sendMailAsync = (mailOptions) => {
//       return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(info);
//           }
//         });
//       });
//     };

//     // Process emails in parallel
//     const emailPromises = email.map(async (mail) => {
//       const { name, contact } = mail;

//       if (!contact) {
//         return { name, status: 'Failed', error: 'Invalid email id' };
//       }

//       try {
//         const mailOptions = {
//           from: 'fito.kripp@gmail.com',
//           to: contact,
//           subject: `Hi ${name}`,
//           text: `Hi ${name}, ${emailtemp.message} ${linkdata.link}`,
//         };
//         const info = await sendMailAsync(mailOptions);
//         return { name, msg: "Email sent successfully", info: info.response };
//       } catch (error) {
//         return { name, status: 'Failed', error: error.message };
//       }
//     });

//     const results = await Promise.all(emailPromises);

//     return res.status(200).json({ msg: "Email processing complete", results });

//   } catch (error) {
//     console.error('Error processing emails:', error);
//     return res.status(500).send({ error: 'An error occurred while processing emails' });
//   }
// };


  const sendWhatsAppMessages = async (req, res) => {
    const accessToken ="EAAfzoIo8iDEBO7CtVoDZBneS2a1fqvmWKiMwLZC2ZCMjVJRSZBwT87BXZACZAamc68hvJxrGZCSJhQj5ZAkIaonqFBiviaaOd52U32UZClWaXbanc2MytyZA0OhlKVHjqZBL8DZBaaLlbegmjRaRpVTMZCZBsMvfuwE6jMMESKf54zEF6C03QYRaGOQ8lcbw6IptI9ERAXo1oZCvszQmZBioIcvc8xHbBypIqkgTP68lSxwZD" //process.env.META_WHATSAPP_ACCESS_TOKEN; // Your Meta WhatsApp API Access Token
    const phoneNumberId ="426089207257238" //process.env.WHATSAPP_PHONE_NUMBER_ID; // Your WhatsApp phone number ID
    const { user, contacts } = req.body;
  
    const userData = JSON.parse(user);
    const whatsaptemp = await whatsapTemplate.findOne({ user: userData._id });
    const linkdata = await ReviewLink.findOne({ user: userData._id });
  
    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).send({ error: 'Invalid contacts data' });
    }
  
    const results = [];
  
    for (const q of contacts) {
      const { name, contact } = q;
  
      if (!contact) {
        results.push({ name, status: 'Failed', error: 'Invalid phone number' });
        continue;
      }
  
      try {
        // Sending WhatsApp message using Meta API
        const response = await axios.post(
          `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
          {
              messaging_product: 'whatsapp',
              to: contact,
              type: 'template',
              template: {
                  name: 'hello_world', 
                  language: {
                      code: 'en_US'
                  }
              }
          },
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              },
          }
      );
  
        results.push({ name, status: 'Sent', messageId: response.data.messages[0].id });
      } catch (error) {
        results.push({ name, status: 'Failed', error: error.response ? error.response.data : error.message });
      }
    }
  
    console.log(results);
    return res.status(200).json({ msg: 'WhatsApp messages sent', results });
  };
  
  module.exports={
    sms,email,sendWhatsAppMessages
  }