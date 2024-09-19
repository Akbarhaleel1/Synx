const express = require("express");
const cors = require("cors");
require('dotenv').config();
const Route = require("./routes/router");
const session = require('express-session');

const app = express();

app.use(session({
    secret: '89093789021', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.use("/", Route);



app.listen(port, () => {
    console.log(`Server is running and you can listen from this port: http://localhost:${port}`);
});