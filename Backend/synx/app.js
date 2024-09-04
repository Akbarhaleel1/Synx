const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const Route = require("./routes/router");

const app = express();

dotenv.config();


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.use("/", Route);


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running and you can listen from this port: http://localhost:${port}');
});