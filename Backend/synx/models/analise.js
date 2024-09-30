const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const analize = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    qr:[
        {
            date:{
                type:Date
            }
        }
    ]
    ,
    visitCount:[
        {
            date:{
                type:Date
            }
        }
    ]
  });
  
  const analitics = mongoose.model("analize", analize);
  
  module.exports = analitics;