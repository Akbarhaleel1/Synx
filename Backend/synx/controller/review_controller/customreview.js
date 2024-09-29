const CustomReview = require("../../models/customreview");
const ReviewLink = require("../../models/reviewLink");

const reviewPage = async (req, res) => {
  try {
    const {  email, name, phone, review, endpoint,stars } = req.body.formData;
    console.log(req.body.formData)

  
    const reviewLink = await ReviewLink.findOne({ endpoint: endpoint });

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
