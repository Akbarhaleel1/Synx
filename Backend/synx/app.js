const express = require("express");
const cors = require("cors");
require('dotenv').config();
const passport = require("passport");
const passportConfig = require('../synx/auth/passport')
const Route = require("./routes/router");
const session = require('express-session');
const app = express();

app.use(session({
    secret: '89093789021', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

passportConfig();
app.use(passport.initialize());
app.use(passport.session());




// app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true, 
//   allowedHeaders: ['Authorization', 'Content-Type'] 
// }));

const allowedOrigins = [process.env.DOMAIN];

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