const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/synxplus");

const userBase = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  membership: [
    {
      type: {
        type: String,
        enum: ["free", "silver", "gold", "premium"],
      },
      dateFrom: {
        type: Date,
      },
      dateTo: {
        type: Date,
      },
    },
  ],
});
