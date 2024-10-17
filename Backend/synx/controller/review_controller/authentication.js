const User = require("../../models/user");
const generateOtp = require("../../components/generateOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); 
const crypto = require("crypto"); 
const { generateToken, verifyRefreshToken, generateRefreshToken } = require("../../utils/authUtils");
const otpStore = {}; 
const Razorpay = require('razorpay');
const Subscription = require('../../models/subscription');
const cron=require("node-cron")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY, // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_SECRET, // Replace with your Razorpay Secret
});


const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  encryption: "SSL",
  port: 465,
  auth: {
    user:process.env.NODEMAILER_USER,
    pass:process.env.NODEMAILER_PASS,
  },
});


const signup = async (req, res) => {
  console.log('req.body',req.body)
  const { firstname, lastname, email,companyname, phonenumber, password } = req.body;
  console.log('1')
  try {
   
    let user = await User.findOne({ email:email, isVerified:true });
    console.log('2')
    if (user) {
      console.log('user is already exit mahn')
      return res.status(401).json({ msg: "User already exists. Please login." });
    }else{
      console.log('3')
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { otp, creationTime } = generateOtp();
    console.log('4')
   
    console.log('5')
    await User.updateOne(
      { email: email, isVerified: false },  // Query for users with the given email and not verified
      {
        $set: {
          name: `${firstname} ${lastname}`,
          mobile: phonenumber,
          password: hashedPassword,
          otp: otp,
          companyname: companyname
        }
      },
      { upsert: true }  // If no matching document, insert a new one
    );

    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Generate dynamic email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Static Template</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
          <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://i.postimg.cc/j5pr82Jq/black-370118-1920.png); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
            <header>
              <table style="width: 100%;">
                <tbody>
                  <tr style="height: 0;">
                    <td>
                      <img alt="Logo" src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=210,fit=crop,q=95/A0xVOQqjK4S17GrG/untitled-design-86-mv0jGPqKXZhKz4k8.png" height="100px" />
                    </td>
                    <td style="text-align: right;">
                      <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${currentDate}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>

            <main>
              <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;">Your OTP</h1>
                  <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500;">
                    Hey ${firstname} ${lastname},
                  </p>
                  <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                    Thank you for choosing Synx+ Review Management. Use the following OTP to complete the procedure to create your synx account. OTP is valid for <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>. Do not share this code with others.
                  </p>
                  <p style="margin: 0; margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f;">
                    ${otp}
                  </p>
                </div>
              </div>
              <p style="max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #8c8c8c;">
                Need help? Ask at <a href="mailto:hello@synxautomate.com" style="color: #499fb6; text-decoration: none;">hello@synxautomate.com</a> or visit our <a href="" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
              </p>
            </main>

            <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Synx Automation Pvt Ltd</p>
              <p style="margin: 0; margin-top: 8px; color: #434343;"> Registered Address- 77 Spaces, Kumarapuram, Trivandrum, India, 695011

Registered as Synx Automation Private Limited under the Govt. Of India.
        </p>
              <div style="margin: 0; margin-top: 16px;">
                <a href="" target="_blank" style="display: inline-block;">
                  <img width="36px" alt="Facebook" src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-icon-download-in-svg-png-gif-file-formats--logo-fb-social-media-font-awesome-pack-user-interface-icons-44662.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Instagram" src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-icon-download-in-svg-png-gif-file-formats--logo-facebook-social-media-network-ios-apps-and-settings-pack-user-interface-icons-1570217.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="X" src="https://cdn.iconscout.com/icon/free/png-256/free-x-logo-icon-download-in-svg-png-gif-file-formats--twitter-facebook-social-media-pack-logos-icons-9823103.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="LinkedIn" src="https://cdn.iconscout.com/icon/free/png-256/free-linkedin-logo-icon-download-in-svg-png-gif-file-formats--social-media-brand-logos-pack-icons-1239440.png?f=webp&w=256" />
                </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">
                Copyright © 2024 Company. All rights reserved.
              </p>
            </footer>
          </div>
        </body>
      </html>
      `;


    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Your OTP Code",
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ msg: "Error sending OTP email" });
      } else {
        console.log("OTP email sent:", info.response);
        res.status(200).json({ msg: "OTP sent to your email" });
      }
    });
  }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



const validateOtp = async (req, res) => {
  const {otp,email} = req.body;
  console.log('the otp is', otp)
   const user = await User.findOne({email:email})
  try {
    if(user){
      console.log('userOtp', user.otp)
      const userotp= parseInt(otp.join(''))
      if (user.otp === userotp) { 
        console.log('userserwesr')

        const customer = await razorpay.customers.create({
          name: user.name, 
          email: user.email,
          contact: user.mobile, 
        });

         user.isVerified = true;
         user.customerId=customer.id;
        await user.save();
        const startDate = new Date();

    
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);
  
       
        const subscriptionData = {
          userId: user._id,
          subscriptionType: "FREE",
          startDate: startDate,
          endDate: endDate,
          status: 'active',
        };

        
        // Use findOneAndUpdate to either update or create a subscription
        const subscription = await Subscription.findOneAndUpdate(
          { userId: user._id }, // Match by userId
          subscriptionData, // Data to update or create
          { new: true, upsert: true } // Options: new returns the updated document; upsert creates if not found
        );

        console.log('subscription',subscription)
        res.status(200).json({ msg: "Signup successful. Please login." });
      } else {
        res.status(400).json({ msg: "Invalid or expired OTP." });
      }
    }else{
      res.status(400).json({ msg: "Invalid or expired OTP." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const validateOtpforgotten = async (req, res) => {
  const {otp,email} = req.body;
  console.log('the otp is', otp,req.body)
   const user = await User.findOne({email:email})
  try {
    if(user){
      console.log('userOtp', user.otp)
      const userotp= parseInt(otp.join(''))
      if (user.otp === userotp) { 
        console.log('userserwesr')
         user.isVerified = true
        await user.save();
        res.status(200).json({ msg: " successful. Please login." });
      } else {
        res.status(400).json({ msg: "Invalid or expired OTP." });
      }
    }else{
      res.status(400).json({ msg: "Invalid or expired OTP." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
   
    const newUser = req.session.newUser;
    if (!newUser || newUser.email !== email) {
      return res.status(400).json({ msg: "No pending signup found for this email." });
    }

   
    const { otp, creationTime } = generateOtp();

  
    req.session.otp = otp;
    req.session.otpCreationTime = creationTime;

   
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Your New OTP Code",
      text: `Your new OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error resending OTP email:", error);
        return res.status(500).json({ msg: "Error resending OTP email" });
      } else {
        console.log("New OTP email sent:", info.response);
        res.status(200).json({ msg: "New OTP sent to your email" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
   
    if (!user.isVerified) {
      return res.status(403).json({ msg: "Account is not verified. Please verify your account first." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    console.log('user', user)
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log('token',token);
    console.log('refreshToken',refreshToken);
   
    res.status(200).json({ msg: "Login successful. Redirecting to dashboard...",token,refreshToken,user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const refreshToken = async (req, res)=> {
  const { refreshToken } = req.body;
  console.log('refreshToken is',refreshToken)
  if (!refreshToken) {
      return res.status(401).json({ msg: 'Refresh token required' });
  }

  try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = { _id: decoded.id, email: decoded.email };
      const newAccessToken = generateToken(user);
      res.json({ accessToken: newAccessToken });
  } catch (error) {
      res.status(401).json({ msg: 'Invalid refresh token' });
  }
}




const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  // console.log('email',email)

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const { otp, creationTime } = generateOtp();
    user.otp = otp;
    await user.save();
    const currentDate = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Generate dynamic email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Static Template</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
          <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://i.postimg.cc/j5pr82Jq/black-370118-1920.png); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
            <header>
              <table style="width: 100%;">
                <tbody>
                  <tr style="height: 0;">
                    <td>
                      <img alt="Logo" src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=210,fit=crop,q=95/A0xVOQqjK4S17GrG/untitled-design-86-mv0jGPqKXZhKz4k8.png" height="100px" />
                    </td>
                    <td style="text-align: right;">
                      <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${currentDate}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>

            <main>
              <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;">Your OTP</h1>
                  <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500;">
                    Hey ${user.name},
                  </p>
                  <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                    Thank you for choosing Synx+ Review Management. Use the following OTP to complete the procedure to create your synx account. OTP is valid for <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>. Do not share this code with others.
                  </p>
                  <p style="margin: 0; margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f;">
                    ${otp}
                  </p>
                </div>
              </div>
              <p style="max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #8c8c8c;">
                Need help? Ask at <a href="mailto:hello@synxautomate.com" style="color: #499fb6; text-decoration: none;">hello@synxautomate.com</a> or visit our <a href="" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
              </p>
            </main>

            <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Synx Automation Pvt Ltd</p>
              <p style="margin: 0; margin-top: 8px; color: #434343;"> Registered Address- 77 Spaces, Kumarapuram, Trivandrum, India, 695011

Registered as Synx Automation Private Limited under the Govt. Of India.
        </p>
              <div style="margin: 0; margin-top: 16px;">
                <a href="" target="_blank" style="display: inline-block;">
                  <img width="36px" alt="Facebook" src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-icon-download-in-svg-png-gif-file-formats--logo-fb-social-media-font-awesome-pack-user-interface-icons-44662.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Instagram" src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-icon-download-in-svg-png-gif-file-formats--logo-facebook-social-media-network-ios-apps-and-settings-pack-user-interface-icons-1570217.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="X" src="https://cdn.iconscout.com/icon/free/png-256/free-x-logo-icon-download-in-svg-png-gif-file-formats--twitter-facebook-social-media-pack-logos-icons-9823103.png?f=webp&w=256" />
                </a>
                <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="LinkedIn" src="https://cdn.iconscout.com/icon/free/png-256/free-linkedin-logo-icon-download-in-svg-png-gif-file-formats--social-media-brand-logos-pack-icons-1239440.png?f=webp&w=256" />
                </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">
                Copyright © 2024 Company. All rights reserved.
              </p>
            </footer>
          </div>
        </body>
      </html>
      `;


    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Password Reset OTP",
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset OTP email:", error);
        return res.status(500).json({ msg: "Error sending OTP email" });
      } else {
        console.log("Password reset OTP email sent:", info.response);
        res.status(200).json({ msg: "OTP sent to your email for password reset" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

  
const googleCallback = async (req, res) => {
    try {
        console.log('Google callback is working');

        if (req.user) {
            let user = req.user;
            let { _id, email } = user;
            let token = generateToken({ _id, email });
            let refresh_token = generateRefreshToken({ _id, email })

            console.log('Token:', token);
            console.log('refreshToken:', refresh_token);

            const userData = encodeURIComponent(JSON.stringify(req.user));
            const tokenData = encodeURIComponent(token);
            const refreshToken = encodeURIComponent(refresh_token);
            res.redirect(`https://synx-review.synxautomate.com/login?user=${userData}&token=${tokenData}&refreshToken=${refreshToken}`);
        } else {
            res.redirect("https://synx-review.synxautomate.com/login");
        }
    } catch (error) {
        console.error("Error during Google callback:", error);
        res.redirect("https://synx-review.synxautomate.com/error");
    }
};



const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log("heeeeee", email,password)
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email address." });
    }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.otp = null; // Clear OTP after successful reset
      await user.save();
      res.status(200).json({ msg: "Password reset successful. Please login with your new password." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  
};

// cronjob.......................

cron.schedule('0 0 * * *', async () => {
  try {
    
    const users = await User.find({ newuser: true });

    for (const user of users) {
     
      const subscription = await Subscription.findOne({ userId: user._id });

      if (subscription) {
        
        if (new Date() > subscription.endDate) {
          
          user.newuser = false;
          await user.save();

          console.log(`User ${user.email}'s subscription has expired. Updated newuser to false.`);
        }
      }
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
});

// end..........................................


module.exports = {
  signup,
  login,
  refreshToken,
  validateOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  googleCallback, 
  validateOtpforgotten 
};
