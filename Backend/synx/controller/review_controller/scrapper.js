const cron = require("node-cron");
const Scrapper = require("../../models/scrapper");
const review = require("../../components/reviewscrapper");
const ScrapData = require("../../models/review");
const IntegratedSite = require("../../models/integration");
const analytics = require("../../components/analytics");
const AnalyticsDB=require("../../models/analytics");


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
                case 'goibibo':
                    reviews = await review.goibibo(pageLink);
                    break;
                case 'google':
                    reviews = await review.google(pageLink);
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
            return res.status(500).json({ msg: "Invalid reviews data is not found." ,reviews:reviews});
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
      //  const data = await createanalytics(user,pageLink,platform)
      //  if(!data){
      //   res.status(200).json({ msg: "Integration unsuccessful.", data });
      //   return
      //  }
        // Successful Integration Response
        res.status(200).json({ msg: "Integration successful." });
        console.log("Integration completed successfully.");

    } catch (error) {
        console.error('Unhandled Server Error:', error);
        res.status(502).send("Bad Gateway: Server encountered an error.");
    }
};
async function createanalytics(user,url,platform){
  try{
    let result;

    // Switch case to call the correct scraping function based on platform
    switch (platform) {
        case 'booking.com':
            result = await analytics.booking(url);  // Scrape Booking.com data
            break;
        case 'agoda':
            result = await analytics.agoda(url);  // Scrape Agoda data
            break;
        case 'trustpilot':
            result = await analytics.trustpilot(url);  // Scrape Trustpilot data
            break;
        case 'makemytrip':
            result = await analytics.makemytrip(url);  // Scrape MakeMyTrip data
            break;
        default:
            return res.status(400).json({ message: 'Platform not supported' });
    }
    if(result){
      await saveAnalyticsData(user, platform, result.averageRating, result.totalReviews);
    }

  }catch(err){

  }
}
// async function saveAnalyticsData(user, platform, averageRating, totalReviews){
//   try{
//    let analyticsdata=await AnalyticsDB.findOne({userid:user._id});
//    let currentData=new Date()
//    let count;
//    if(analyticsdata){
//      count=analyticsdata.reviewCount;
//     count.push({date:currentData,count:totalReviews})
//    }else{
//     count={
//       date:currentData,
//       count:totalReviews
//     }
//    }
//    let data=await AnalyticsDB.findOneAndUpdate(
//     {userid:user._id,platform},
//     {$set:{
//       averagerating:averageRating,
//       reviewCount:count
//     }},{
//       upsert:true
//     }
//   )
//   return data

//   }catch (err){
//   }
// }

async function saveAnalyticsData(user, platform, averageRating, totalReviews) {
  try {
    let analyticsdata = await AnalyticsDB.findOne({ userid: user._id, platform });
    let currentDate = new Date();
    let count = [];

    // If analytics data exists, append to the reviewCount array
    if (analyticsdata) {
      count = analyticsdata.reviewCount || []; // Ensure it's an array
      count.push({ date: currentDate, count: totalReviews });
    } else {
      count.push({ date: currentDate, count: totalReviews });
    }

    // Update or create new analytics data
    let data = await AnalyticsDB.findOneAndUpdate(
      { userid: user._id, platform },
      { 
        $set: {
          averagerating: averageRating,
          reviewCount: count
        }
      },
      { upsert: true, new: true }
    );
    
    return data;

  } catch (err) {
    console.error('Error saving analytics data:', err);
    throw err; // rethrow the error after logging or handle it as needed
  }
}

const integratepage = async (req, res) => {
  const { user } = req.body;
  const userData = JSON.parse(user);
  console.log(userData);
  const reviewLink = await Scrapper.find({ user: userData._id });
  try {
    if (reviewLink) {
      res.status(200).json({ msg: "integrated items is working mahhhh", reviewLink });
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
        case "goibibo":
          reviews = await review.goibibo(scrapper.link);
          break;
        case "google":
            reviews = await review.google(scrapper.link);
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

const googleautomate = async () => {
  try {
    const scrappers = await Scrapper.find();

    for (let scrapper of scrappers) {
      let reviews;

      switch (scrapper.platform) {
       case "google":
            reviews = await review.google(scrapper.link);
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

cron.schedule("*/30 * * * *", async () => {
  console.log("Running the review scraping cron job every 30 minutes.");
  await automate();
});
setInterval(async () => {
  console.log("Running the google review fetch job every 30 seconds.");
  await googleautomate();
}, 5 * 1000); 
module.exports = {
  integrate,
  integratepage,
  deleteLink,
};
