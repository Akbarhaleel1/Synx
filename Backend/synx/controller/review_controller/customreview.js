const CustomReview = require("../../models/customreview");
const ReviewLink = require("../../models/reviewLink");
const Analytics = require("../../models/analise");

const reviewPage = async (req, res) => {
  try {

    const {  email, name, phone, review, endpoint,stars,qrpoint} = req.body.formData;
    console.log(req.body.formData)
    const reviewLink = await ReviewLink.findOne({ endpoint: endpoint });
    console.log("annaaaaaaaaaaaaaaaaaaa",reviewLink)
    let analytics = await Analytics.findOne({ user: reviewLink.user });


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

    console.log('data saved successfully')

    
    analytics.negative.push({ date: new Date() });
    
    await analytics.save();
    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving the review" });
  }
};

// const feedback = async (req, res) => {
//   try {
//     const { qrPoint, endpoint } = req.body;
//     console.log('Request Body:', req.body);

//     const reviewLink = await ReviewLink.findOne({ endpoint: endpoint });
//     if (!reviewLink) {
//       return res.status(404).json({ message: "Review link not found" });
//     }

//     let analytics = await Analytics.findOne({ user: reviewLink.user });
//     console.log('Review Link:', reviewLink);
//     console.log('Analytics:', analytics);

//     if (!analytics) {
//       analytics = new Analytics({
//         user: reviewLink.user,
//         qr: [],
//         visitCount: [],
//       });
//     }

//     const currentDate = new Date();
//     analytics.visitCount.push({ date: currentDate });
    
//     if (qrPoint != null) {
//       analytics.qr.push({ date: currentDate });
//     } else {
//       console.log("QR point is null, logging visit count only.");
//     }

//     await analytics.save();
    
//     return res.status(200).json({ message: "Feedback recorded successfully." });
    
//   } catch (error) {
//     console.error('Error in feedback function:', error);
//     return res.status(500).json({ message: "An error occurred while processing feedback." });
//   }
// };



const feedback = async (req, res) => {
  try {
    const { qrPoint, endpoint } = req.body;
    console.log('Request Body:', req.body);

    const reviewLink = await ReviewLink.findOne({ endpoint: endpoint });
    if (!reviewLink) {
      return res.status(404).json({ message: "Review link not found" });
    }

    console.log('Review Link:', reviewLink);

    const currentDate = new Date();
    const update = {
      $push: {
        visitCount: { date: currentDate },
        ...(qrPoint != null && { qr: { date: currentDate } }),
      },
    };

    const analytics = await Analytics.findOneAndUpdate(
      { user: reviewLink.user },
      update,
      { new: true, upsert: true }
    );

    console.log('Analytics:', analytics);

    return res.status(200).json({ message: "Feedback recorded successfully." ,reviewLink});
    
  } catch (error) {
    console.error('Error in feedback function:', error);
    return res.status(500).json({ message: "An error occurred while processing feedback." });
  }
};

module.exports = {
    reviewPage,feedback
};
