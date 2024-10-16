const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://synx:rqDj0r106Ev7a7gg@cluster0.md73f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscriptionType: {
    type: String,
    enum: ["FREE","SILVER", "GOLD", "DIAMOND"],
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  razorpayPaymentId: {
    type: String,
    
  },
  razorpaySubscriptionId: {
    type: String,
    
  },
  signature: {
    type: String,
    
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  msgLimit: {
    type: Number,
    required: true,
    default: function () {
      switch (this.subscriptionType) {
        case 'free':
          return 50;
        case 'SILVER':
          return 20;
        case 'GOLD':
          return 30;
        case 'DIAMOND':
            return 50;
        default:
          return 1;
      }
    }
  },
  whatsappLimit: {
    type: Number,
    required: true,
    default: function () {
      switch (this.subscriptionType) {
        case 'free':
          return 30;
        case 'SILVER':
          return 50;
        case 'GOLD':
          return 500;
        case 'DIAMOND':
            return 1000;
        default:
          return 50;
      }
    }
  },
  integrationLimit: {
    type: Number,
    required: true,
    default: function () {
      switch (this.subscriptionType) {
        case 'free':
          return 5;
        case 'SILVER':
          return 5;
        case 'GOLD':
          return 5;
        case 'DIAMOND':
            return 10;
        default:
          return 1;
      }
    }
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
