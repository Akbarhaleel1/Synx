const EmailTemplate=require("../../models/emailtemp")
const ReviewLink=require("../../models/reviewLink")
const MonthlyLimit=require("../../models/monthlylimit")
const plivo = require('plivo');
const nodemailer = require("nodemailer");
const Etemplate=require("../../models/template")
const axios = require('axios');
const whatsapTemplate=require("../../models/whatsappTemplate")
const Subscription = require('../../models/subscription');
const analitics = require("../../models/analise");


const plivoClient = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);
const sms = async (req, res) => {
  const { user, contacts } = req.body;
  console.log("keri" ,req.body);
  const userData = JSON.parse(user);
  const emailtemp = await EmailTemplate.findOne({ user: userData._id });
  const linkdata = await ReviewLink.findOne({ user: userData._id });
  if(!linkdata){
    return res.status(200).send({ msg: 'end data node available' });
  }
  console.log('Linkdata is',linkdata?.user)
  console.log('emailtemp',emailtemp)
  console.log('emailtemp',linkdata)
  console.log('userDatassssssssssssssssssssssssss',userData)

  const monthlydata = await Subscription.findOne({ userId: userData._id });
  console.log('monthlydata',monthlydata)

  if(monthlydata.msgLimit < contacts.length) {
    console.log('monthlydata msg liimit is missing')
    return res.status(200).send({ msg: 'it seems more than monthly limit' });
  }
  console.log('monthlydata.msgLimit is working',monthlydata.msgLimit )

  if (!contacts || !Array.isArray(contacts)) {
    return res.status(400).send({ error: 'Invalid contacts data' });
  }

  console.log('contacts is working',contacts)


  const results = [];
  let count = monthlydata.msgLimit;
  console.log('first count',count)
  for (const q of contacts) {
    const { name, contact } = q;
    console.log(q);
    console.log('1')

    if (!contact) {
      results.push({ name, status: 'Failed', error: 'Invalid phone number' });
      console.log('Invalid phone number')
      continue;
    }
    console.log('2')
    try {
      const response = await plivoClient.messages.create(
        process.env.PLIVO_NUM, // Sender's phone number
        contact, // Receiver's phone number
        `Hi ${name}, ${emailtemp.message} ${linkdata.link}`
      );
      console.log('3')

      results.push({ name, status: 'Sent', messageUuid: response.messageUuid });
    } catch (error) {
      results.push({ name, status: 'Failed', error: error.message });
    }
    console.log('4')
    // Usage:
const currentDate = new Date();
const update = {
  $push: {
    linksentcount: { date: currentDate },
  },
};

const analytics = await analitics.findOneAndUpdate(
  { user: linkdata.user },
  update,
  { new: true, upsert: true } 
);
    
    count--;

    console.log('second count',count)

    const monthlycount = await Subscription.findOneAndUpdate(
      { userId: userData._id },
      { msgLimit: count },
      { new: true, upsert: true }
    );
  }
  console.log('5')
  console.log(results);
  return res.status(200).json({ msg: "sms sent " });
};
 
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  encryption: "SSL",
  port: 465,
  auth: {
    user:process.env.NODEMAILER_USER,
    pass:process.env.NODEMAILER_PASS,
  },
});

const email= async (req, res) => {
    const {user,email} = req.body
    console.log("keri",req.body)
    const userData=JSON.parse(user)
    const emailtemp=await Etemplate.findOne({user:userData._id})
    const linkdata=await ReviewLink.findOne({user:userData._id})
    console.log(linkdata)
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
      const emailTemplate = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Email Template</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #f4f4f4; font-family: 'Montserrat', Arial, sans-serif; }
    table { max-width: 600px; width: 100%; background-color: #fff; margin: 0 auto; border-spacing: 0; border-collapse: collapse; }
    .header, .footer { background-image: url(https://i.postimg.cc/j5pr82Jq/black-370118-1920.png); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center;; color: #ffffff; padding: 20px; text-align: center; }
    .header{display: flex;justify-content:space-between ;}
    .header img { height: 50px; }
    .content { padding: 30px 20px; text-align: center; }
    h1 { font-size: 24px; color: #2A3C51; margin: 0 0 20px; }
    p {  font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
    .button { display: inline-block; padding: 12px 25px; background-color: #ED3A4B; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 16px; }
    .footer p { font-size: 12px; margin: 10px 0 0; color: #ffffff; }
    @media only screen and (max-width: 600px) {
      .content { padding: 20px; }
      h1 { font-size: 20px; }
      .button { font-size: 14px; padding: 10px 20px; }
    }
  </style>
</head>
<body>
  <table role="presentation">
    <!-- Header Section -->
    <tr>
      <td class="header">
        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=210,fit=crop,q=95/A0xVOQqjK4S17GrG/untitled-design-86-mv0jGPqKXZhKz4k8.png" alt="Logo">
        <p></p>
      </td>
    </tr>
    
    <!-- Body Content -->
    <tr>
      <td class="content">
        <h1>Hello, ${name}!</h1>
        <p>${emailtemp.message}</p>
        <a href="${linkdata.link}" class="button">review link</a>
      </td>
    </tr>

    <!-- Footer Section -->
    <tr>
      <td class="footer">
       <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #f4f4f4;">Synx Automation Pvt Ltd</p>
              <p style="margin: 0; margin-top: 8px; color: #f4f3f3;"> Disclaimer: This email was sent via Synx+ on behalf of ${emailtemp.name}. Synx+ is a brand under Synx Automation Private Limited. For more information, visit ${linkdata.link}. Synx+ is not responsible for the content. To unsubscribe, please contact ${emailtemp.name} directly.
         </p>
              <p style="margin: 0; margin-top: 16px; color: #b6b3b3;">
                Copyright © 2024 Company. All rights reserved.
              </p>
            </footer>
      </td>
    </tr>
  </table>
</body>
</html>

      `;
  console.log(emailtemp)
      try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: contact,
            subject: `Hi ${name}`,
            html: emailTemplate,
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
          const currentDate = new Date();
const update = {
  $push: {
    linksentcount: { date: currentDate },
  },
};

const analytics = await analitics.findOneAndUpdate(
  { user: linkdata.user },
  update,
  { new: true, upsert: true } 
);
        
      } catch (error) {
        console.log(error)
        results.push({ name, status: 'Failed', error: error.message });
      }
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

const accessToken ="EAAfzoIo8iDEBO6WAAHAkErmPLKsDeMc1mTqsWu4tWEdZCv4rSfvWmzKjlAMSEcfATKTk6N6ZC5EMKxZB04d1jwI5gED3r3CCFHdjzIg2yR8B1A4McD01RLdZAi1bJho3mBIVZA4nSkP7ZCxGLk1Ai8fPReZAV3XaUUfXTV7NBpJp2vLFxsHOiPaBqX3ZBcoGAubj" //process.env.META_WHATSAPP_ACCESS_TOKEN; // Your Meta WhatsApp API Access Token
const phoneNumberId ="426089207257238" //process.env.WHATSAPP_PHONE_NUMBER_ID; // Your WhatsApp phone number ID

  const sendWhatsAppMessages = async (req, res) => {
    const { user, contacts } = req.body;
    console.log('user is', user)
    console.log(req.body)
    const userData = JSON.parse(user);
    const whatsaptemp = await whatsapTemplate.findOne({ user: userData._id });
    const linkdata = await ReviewLink.findOne({ user: userData._id });
    const monthlydata = await Subscription.findOne({ userId: userData._id });

    if(monthlydata.whatsappLimit < contacts.length) {
      return res.status(200).send({ message: 'it seems more than monthly limit' });
    }
  
    if (!contacts || !Array.isArray(contacts)) {
      return res.status(200).send({ error: 'Invalid contacts data' });
    }
  
    const results = [];
    let count = monthlydata.whatsappLimit;
    for (const q of contacts) {
      const { name, number } = q;
      console.log(q)
      console.log(`${whatsaptemp.message},${linkdata.link}`)
  
      if (!number) {
        results.push({ name, status: 'Failed', error: 'Invalid phone number' });
        continue;
      }
  
      try {
       
        const response = await axios.post(
          `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
          {
            messaging_product: "whatsapp",
            to: number, 
            type: "template",
            template: {
              name: "synx_plus",
              language: {
                code: "en_US"
              },
              components: [
                {
                  type: "header", 
                  parameters: [
                    {
                      type: "text",
                      text: name 
                    }
                  ]
                },
                {
                  type: "body", 
                  parameters: [
                    {
                      type: "text",
                      text: `${whatsaptemp.message},${linkdata.link}` // Provide dynamic text for body placeholder
                    }
                  ]
                }
              ]
            }
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
              'Content-Type': 'application/json', 
            },
          }
        );
        console.log(response.data)
        results.push({ name, status: 'Sent', messageId: response.data.messages[0].id });
      } catch (error) {
        results.push({ name, status: 'Failed', error: error.response ? error.response.data : error.message });
      }
      const currentDate = new Date();
const update = {
  $push: {
    linksentcount: { date: currentDate },
  },
};

const analytics = await analitics.findOneAndUpdate(
  { user: linkdata.user },
  update,
  { new: true, upsert: true } 
);
      
    count--;
    const monthlycount = await Subscription.findOneAndUpdate(
      { userId: userData._id },
      { whatsappLimit: count },
      { new: true, upsert: true }
    );
    }
  
    console.log(results);
    return res.status(200).json({ message: 'WhatsApp messages sent', results });
  };
  
  module.exports={
    sms,email,sendWhatsAppMessages
  }