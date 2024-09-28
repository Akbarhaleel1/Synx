const User = require("../../models/user");
const generateOtp = require("../../components/generateOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); 
const crypto = require("crypto"); 
const { generateToken, verifyRefreshToken, generateRefreshToken } = require("../../utils/authUtils");
const otpStore = {}; 


const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});


const signup = async (req, res) => {
  const { firstname, lastname, email, phonenumber, password } = req.body;

  
  try {
   
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists. Please login." });
    }else{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { otp, creationTime } = generateOtp();

    const userData = new User({
      name: `${firstname} ${lastname}`,
      email: email,
      mobile: phonenumber,
      password: hashedPassword,
      otp: otp
    });

    console.log('userData',userData)

    await userData.save();

    const mailOptions = {
      from: 'fito.kripp@gmail.com',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
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
         user.isVerified = true
        await user.save();
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
      from: 'fito.kripp@gmail.com',
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
   
    res.status(200).json({ msg: "Login successful. Redirecting to dashboard...",token,refreshToken });
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

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const { otp, creationTime } = generateOtp();
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: 'fito.kripp@gmail.com',
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
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

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email address." });
    }

    const userOtp = parseInt(otp.join(''));
    if (user.otp === userOtp) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.otp = null; // Clear OTP after successful reset
      await user.save();

      res.status(200).json({ msg: "Password reset successful. Please login with your new password." });
    } else {
      res.status(400).json({ msg: "Invalid or expired OTP." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


module.exports = {
  signup,
  login,
  refreshToken,
  validateOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
};
