const CustomReview = require("../../models/customreview");
const ReviewLink = require("../../models/reviewLink");
const Analytics = require("../../models/analise");

const reviewPage = async (req, res) => {
  try {

    const {  email, name, phone, review, endpoint,stars,qrpoint} = req.body.formData;
    console.log(req.body.formData)
    const reviewLink = await ReviewLink.findOne({ endpoint: endpoint });
    let analytics = await Analytics.findOne({ user: reviewLink.user });

    if (!analytics) {
      analytics = new Analitics({
        user: reviewLink.user,
        qr: [],
        visitCount: [],
      });
    }

    if (qrpoint!='null') {
      analytics.visitCount.push({ date: new Date() });
      analytics.qr.push({ date: new Date() });
    } else {
      analytics.visitCount.push({ date: new Date() });
    }

    await analytics.save();

    if (!reviewLink) {
      return res.status(404).json({ message: "Review link not found" });
    }

    
    const newReview = new CustomReview({
      user:reviewLink.user,
      email,
      name,
      phone,
      review,
      stars,
      date: new Date(),
    });

   
    await newReview.save();
    console.log('data saved successfully');

    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving the review" });
  }
};

module.exports = {
    reviewPage
};
