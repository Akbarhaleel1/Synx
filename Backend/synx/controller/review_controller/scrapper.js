const cron = require("node-cron");
const Scrapper = require("../../models/scrapper");
const review = require("../../components/reviewscrapper");
const ScrapData = require("../../models/review");
const IntegratedSite = require("../../models/integration");

// const integrate = async (req, res) => {
// const { user, platform, pageLink } = req.body;
//   console.log(req.body);
// //   const userData = JSON.parse(user);
// const userData = typeof user === 'string' ? JSON.parse(user) : user;
//   console.log("userData", userData);
//   try {
//     const scrapperData = {
//       user: userData._id,
//       platform: platform,
//       link: pageLink,
//     };
//     const scrapperSchema = await Scrapper.findOneAndUpdate(
//       { user: userData._id, platform: platform },
//       scrapperData,
//       {
//         new: true,
//         upsert: true,
//       }
//     );

//     let reviews;

//     switch (platform) {
//       case "airbnb":
//         reviews = await review.airbnb(pageLink);
//         break;
//       case "agoda":
//         reviews = await review.agoda(pageLink);
//         break;
//       case "trustpilot":
//         reviews = await review.trustpilot(pageLink);
//         break;
//       case "booking.com":
//         reviews = await review.booking(pageLink);
//         break;
//       case "tripadvisor":
//         reviews = await review.tripadvisor(pageLink);
//         break;
//       case "makemytrip":
//         reviews = await review.makemytrip(pageLink);
//         break;
//       case "gobigo":
//         reviews = await review.gobigo(pageLink);
//         break;
//       default:
//         return res.status(400).json({ msg: "Unsupported platform" });
//     }
//     console.log("hellollo", reviews);
//     const reviewEntries = reviews.map((reviewData) => ({
//       user: userData._id,
//       platform: reviewData.platform,
//       image: reviewData.image,
//       date: reviewData.date,
//       name: reviewData.name,
//       title: reviewData.title,
//       review: reviewData.review,
//       rating: reviewData.rating,
//       link: pageLink,
//     }));

//     try {
//       await ScrapData.insertMany(reviewEntries);
//       console.log("All reviews saved successfully.");
//     } catch (error) {
//       console.error("Error saving reviews:", error);
//     }

//     res.status(200).json({ msg: "integrated successful" });
//     console.log("sususus");
//   } catch (error) {
//     res.status(502).send("Server error");
//   }
// };


const integrate = async (req, res) => {
    const { user, platform, pageLink } = req.body;

    // Enhanced Logging
    console.log('Request Body:', req.body);

    let userData;
    try {
        userData = typeof user === 'string' ? JSON.parse(user) : user;
        console.log('Parsed User Data:', userData);
    } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        return res.status(400).json({ msg: "Invalid user data format." });
    }

    try {
        // Update or Create Scrapper Data
        const scrapperData = {
            user: userData._id,
            platform: platform,
            link: pageLink,
        };

        const scrapperSchema = await Scrapper.findOneAndUpdate(
            { user: userData._id, platform: platform },
            scrapperData,
            { new: true, upsert: true }
        ); 

        console.log('Scrapper Schema Updated:', scrapperSchema);

        let reviews;

        // Fetch Reviews Based on Platform
        try {
            switch (platform.toLowerCase()) {
                case 'airbnb':
                    reviews = await review.airbnb(pageLink);
                    break;
                case 'agoda':
                    reviews = await review.agoda(pageLink);
                    break;
                case 'trustpilot':
                    reviews = await review.trustpilot(pageLink);
                    break;
                case 'booking.com':
                    reviews = await review.booking(pageLink);
                    break;
                case 'tripadvisor':
                    reviews = await review.tripadvisor(pageLink);
                    break;
                case 'makemytrip':
                    reviews = await review.makemytrip(pageLink);
                    break;
                case 'gobigo':
                    reviews = await review.gobigo(pageLink);
                    break;
                default:
                    console.warn('Unsupported platform:', platform);
                    return res.status(400).json({ msg: "Unsupported platform" });
            }
            console.log("Fetched Reviews:", reviews);
        } catch (reviewError) {
            console.error('Error fetching reviews:', reviewError);
            return res.status(500).json({ msg: "Error fetching reviews." });
        }

        if (!Array.isArray(reviews)) {
            console.error('Reviews data is not an array:', reviews);
            return res.status(500).json({ msg: "Invalid reviews data." });
        }

        // Prepare Review Entries for Database Insertion
        const reviewEntries = reviews.map(reviewData => ({
            user: userData._id,
            platform: reviewData.platform,
            image: reviewData.image,
            date: reviewData.date,
            name: reviewData.name,
            title: reviewData.title,
            review: reviewData.review,
            rating: reviewData.rating,
            link: pageLink
        }));

        // Insert Reviews into Database
        try {
            await ScrapData.insertMany(reviewEntries);
            console.log('All reviews saved successfully.');
        } catch (dbError) {
            console.error('Error saving reviews:', dbError);
            return res.status(500).json({ msg: "Error saving reviews." });
        }

        // Successful Integration Response
        res.status(200).json({ msg: "Integration successful." });
        console.log("Integration completed successfully.");

    } catch (error) {
        console.error('Unhandled Server Error:', error);
        res.status(502).send("Bad Gateway: Server encountered an error.");
    }
};

  
const integratepage = async (req, res) => {
  const { user } = req.body;
  const userData = JSON.parse(user);
  console.log(userData);
  const reviewLink = await Scrapper.find({ user: userData._id });
  try {
    if (reviewLink) {
      res.status(200).json({ msg: "integrated items", reviewLink });
      console.log(reviewLink);
    }
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

const deleteLink = async (req, res) => {
  const { user, platform } = req.body;
  const userData = JSON.parse(user);
  console.log("delete link", req.body);

  try {
    const scrappers = await Scrapper.findOne({
      user: userData._id,
      platform: platform,
    });

    if (!scrappers) {
      return res.status(404).json({ msg: "Scrapper not found" });
    }
    const deleted = await Scrapper.findByIdAndDelete(scrappers._id);
    await ScrapData.deleteMany({ user: userData._id, platform: platform });
    if (deleted) {
      res.status(200).json({ msg: "Scrapper deleted successfully" });
    } else {
      res.status(400).json({ msg: "Failed to delete the scrapper" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const automate = async () => {
  try {
    const scrappers = await Scrapper.find();

    for (let scrapper of scrappers) {
      let reviews;

      switch (scrapper.platform) {
        case "airbnb":
          reviews = await review.airbnb(scrapper.link);
          break;
        case "agoda":
          reviews = await review.agoda(scrapper.link);
          break;
        case "trustpilot":
          reviews = await review.trustpilot(scrapper.link);
          break;
        case "booking.com":
          reviews = await review.booking(scrapper.link);
          break;
        case "tripadvisor":
          reviews = await review.tripadvisor(scrapper.link);
          break;
        case "makemytrip":
          reviews = await review.makemytrip(scrapper.link);
          break;
        case "gobigo":
          reviews = await review.gobigo(scrapper.link);
          break;
        default:
          console.log("Unsupported platform", scrapper.platform);
          continue;
      }

      console.log("Scraped reviews for platform:", scrapper.platform);

      const reviewEntries = reviews.map((reviewData) => ({
        user: scrapper.user,
        platform: reviewData.platform,
        image: reviewData.image,
        date: reviewData.date,
        name: reviewData.name,
        title: reviewData.title,
        review: reviewData.review,
        rating: reviewData.rating,
        link: scrapper.link,
      }));

      for (let entry of reviewEntries) {
        await ScrapData.updateOne(
          {
            user: entry.user,
            platform: entry.platform,
            name: entry.name,
            link: entry.link,
          },
          { $set: entry },
          { upsert: true }
        );
      }
      console.log("Reviews saved or updated successfully.");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
};

cron.schedule("*/20 * * * *", async () => {
  console.log("Running the review scraping cron job every 20 minutes.");
  await automate();
});
module.exports = {
  integrate,
  integratepage,
  deleteLink,
};