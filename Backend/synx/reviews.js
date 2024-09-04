// const express = require("express");
// const app = express();
// const axios = require("axios");
// const jsdom = require("jsdom");

// const { JSDOM } = jsdom;

// const url = "https://dk.trustpilot.com/review/www.lomax.dk";

// async function getTrustpilotJSONLD() {
//   try {
//     const response = await axios.get(url);
//     const html = response.data; 

//     const dom = new JSDOM(html);
//     const scriptTag = dom.window.document.querySelector(
//       'script[type="application/ld+json"][data-business-unit-json-ld="true"]'
//     );

//     if (scriptTag) {
//       const jsonData = scriptTag.textContent;
//       return JSON.parse(jsonData); // Parse the JSON-LD data
//     } else {
//       console.error("Script tag not found");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching data", error);
//     return null;
//   }
// }

// (async () => {
//   const trustpilotData = await getTrustpilotJSONLD();
//   console.log(trustpilotData);
// })();
// const puppeteer = require('puppeteer');

// async function booking(url) {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.setViewport({width: 1080, height: 1024});
//   let allReviews = []; 
//   try {
//     await page.goto(url, { waitUntil: 'networkidle2' });
 
   
//     while( await page.$('button[aria-label="Next page"]')){
//       await page.waitForSelector('div[data-testid="review-card"]');
      

     
//     const reviews = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('div[data-testid="review-card"]')).map(element => ({
//         platform:"booking.com",
//         image: element.querySelector('div[data-testid="review-avatar"] img[loading="lazy"]')?.src || null,
//         date: element.querySelector('span[data-testid="review-date"]')?.textContent.trim() || null,
//         name: element.querySelector('div[data-testid="review-avatar"] div')?.textContent.trim() || null,
//         title: element.querySelector('div[data-testid="review-title"]')?.textContent.trim() || null,
//         review: element.querySelector('div[data-testid="review-positive-text"]')?.textContent.trim() || null,
//         rating: element.querySelector('div[data-testid="review-score"]')?.textContent || null,
//       }));
//     });

//     console.log("reviiiiiiiiiiiiiiiii",reviews)
//     allReviews = allReviews.concat(reviews)
//   setTimeout( async ()=>{
//       await page.click('button[aria-label="Next page"]')

//     },500)
    
//    }

//   console.log(allReviews); 
//     // function transformReviews(reviews) {
//     //   return reviews.map(review => {
        
//     //     const [day, month, year] = review.date.match(/(\d{1,2}) (\w+) (\d{4})/).slice(1);
//     //     const date = new Date(`${month} ${day}, ${year}`);
//     //     const formattedDate = date.toDateString();
        
        
//     //     const ratingMatch = review.rating.match(/Scored (\d+(\.\d+)?) (\d+(\.\d+)?)/);
//     //     if (ratingMatch) {
//     //       const rating = parseFloat(ratingMatch[1]);
//     //       const normalizedRating = Math.round(rating / 2);
          
//     //       return {
//     //         ...review,
//     //         date: formattedDate,
//     //         rating: normalizedRating
//     //       };
//     //     }
    
//     //     return {
//     //       ...review,
//     //       date: formattedDate,
//     //       rating: null
//     //     };
//     //   });
//     // }
//     // const filteredReview=transformReviews(reviews)
//     // console.log(filteredReview);

//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//   } finally {
//     await browser.close();
//   }
// }
// const url = 'https://www.booking.com/hotel/in/vip-garden-resort.en-gb.html?#tab-reviews';
// booking(url).then(() => {
//   console.log("Fetch completed");
// });
