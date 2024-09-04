const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); 
const crypto = require("crypto"); 
const otpStore = {}; 


const sendOtpEmail = async (email, otp) => {
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

 
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for registration',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };


  await transporter.sendMail(mailOptions);
};


const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    
    const otp = crypto.randomInt(100000, 999999);
    otpStore[email] = { otp, expires: Date.now() + 600000, userData: { name, email, password } }; 

  
    await sendOtpEmail(email, otp);

    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
      return res.status(400).json({ msg: "OTP expired or not found" });
    }

    if (storedOtpData.otp !== parseInt(otp)) {
      return res.status(400).json({ msg: "Incorrect OTP" });
    }

 
    const { name, password } = storedOtpData.userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   
    delete otpStore[email];

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User registered successfully",
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }


    const otp = crypto.randomInt(100000, 999999);
    otpStore[email] = { otp, expires: Date.now() + 600000, userData: otpStore[email].userData }; 

    
    await sendOtpEmail(email, otp);

    res.json({ msg: "New OTP sent to your email" });
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
      return res.status(400).json({ msg: "Invalid user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password entered" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  signup,
  login,
  verifyOtp,
  resendOtp,
};
