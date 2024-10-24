const express = require("express");
const cors = require("cors");
require('dotenv').config();
const passport = require("passport");
const passportConfig = require('../synx/auth/passport')
const Route = require("./routes/router");
const session = require('express-session');
const app = express();
passportConfig();

app.use(session({
    secret: '89093789021', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [process.env.DOMAIN,'https://review.synxautomate.com'];

console.log(allowedOrigins)

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.use("/", Route);




app.listen(port, () => {
    console.log(`Server is running and you can listen from this port: http://localhost:${port}`);
}); 