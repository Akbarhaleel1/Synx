// const puppeteer = require('puppeteer');

// function convertToNormalDateAndExtractRating(reviews) {
//     const updatedReviews = reviews.map(review => {

//       if (review.date) {
//         const parsedDate = Date.parse(review.date);
//         if (isNaN(parsedDate)) {

//           const daysAgoMatch = review.date.match(/(\d+)\s+days?\s+ago/);
//           if (daysAgoMatch) {
//             const daysAgo = parseInt(daysAgoMatch[1], 10);
//             const date = new Date();
//             date.setDate(date.getDate() - daysAgo);
//             review.date = date.toDateString();
//           }
//         } else {
//           review.date = new Date(parsedDate).toDateString();
//         }
//       }

//       if (review.rating) {
//         const ratingMatch = review.rating.match(/(\d+(?:\.\d+)?)\s+out\s+of\s+\d+/);
//         if (ratingMatch) {
//           review.rating = parseFloat(ratingMatch[1]);
//         }
//       }

//       return review;
//     });
//     return updatedReviews;
//   }

// // airbnb............
// const airbnb= async (url)=>{
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//       await page.goto(url, { waitUntil: 'networkidle2' });

//       await page.waitForSelector('div[data-review-id] ');

//       const reviews = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('div[data-review-id] ')).map(element => ({
//           platform:"airbnb",
//           image: element.querySelector('a img')?.src || null,
//           date: element.querySelector('div')?.textContent.trim() || "No date available",
//           name: element.querySelector('h2')?.textContent.trim() || "No name available",
//           title: element.querySelector('div[data-testid="review-title"]')?.textContent.trim() || null,
//           review: element.querySelector('span span')?.textContent.trim() || "No review available",
//           rating: element.querySelector('span')?.textContent.trim() || "No rating available",
//         }));
//       });
//       function transformReviews(reviews) {
//         return reviews.map(review => {

//             const dateParts = review.date.split('·').map(part => part.trim());
//             let formattedDate = dateParts.find(part => /[A-Za-z]+\s+\d{4}/.test(part));

//             if (formattedDate) {
//                 formattedDate = new Date(formattedDate);
//                 formattedDate.setDate(1);
//             } else {
//                 formattedDate = new Date();
//             }

//             const ratingMatch = review.rating.match(/(\d+)/);
//             const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;

//             return {
//                 ...review,
//                 date: formattedDate.toDateString(),
//                 rating: rating
//             };
//         });
//     }
//     const filteredReview=transformReviews(reviews)
//       console.log(filteredReview);
//       return filteredReview;

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// // agoda.............
// const agoda=async (url)=> {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//       await page.goto(url, { waitUntil: 'networkidle2' });

//       await page.waitForSelector('div[data-review-id] ');

//       const reviews = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('div[data-review-id] ')).map(element => ({
//           platform:"agoda",
//           image: element.querySelector('a img')?.src || null,
//           date: element.querySelector('.Review-statusBar-date')?.textContent.trim() || null,
//           name: element.querySelector('.Review-comment-reviewer strong')?.textContent.trim() || null,
//           title: element.querySelector('h4[data-testid="review-title"]')?.textContent.trim() || null,
//           review: element.querySelector('.Review-comment-bodyText')?.textContent.trim() || null,
//           rating: element.querySelector('.Review-comment-leftHeader .Review-comment-leftScore')?.textContent.trim() || null,
//         }));
//       });
//       const filteredReviews = reviews
//   .filter(review => Object.values(review).some(value => value !== null))
//   .map(review => {

//     if (review.date) {
//       const dateParts = review.date.match(/Reviewed (\w+ \d{1,2}, \d{4})/);
//       if (dateParts) {
//         const formattedDate = new Date(dateParts[1]).toDateString();
//         review.date = formattedDate;
//       }
//     }

//     if (review.rating) {
//       review.rating = (parseFloat(review.rating) / 2).toFixed(1);
//     }

//     return review;
//   });
//       console.log(filteredReviews);
//       return filteredReviews

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// // trustpilot........
// const trustpilot= async (url) => {

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//       await page.goto(url, { waitUntil: 'networkidle2' });
//       await clickSort(page)
//       await sortrecent(page)

//       async function clickSort(page) {
//         try {
//           const close_btn = await page.waitForSelector('button[name="sort"]', { timeout: 25000, visible: true });
//           console.log("select the button");
//           await close_btn.click();
//           console.log("button clicked the option get");
//         } catch (e) {
//           console.log("Popup didn't appear.");
//         }
//       }
//       async function sortrecent(page) {
//         try {
//           const close_btn = await page.waitForSelector('#recency', { timeout: 25000, visible: true });
//           console.log("select the recency");
//           await close_btn.click();
//           console.log("button clicked the option recency");
//         } catch (e) {
//           console.log("Popup didn't appear.");
//         }
//       }

//       await page.waitForSelector('.styles_reviewCard__9HxJJ ');

//       const reviews = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('.styles_reviewCard__9HxJJ')).map(element => ({
//           platform:"trustpilot",
//           image: element.querySelector('img[data-nimg]')?.src || null,
//           date: element.querySelector('time')?.textContent.trim() || null,
//           name: element.querySelector('span[data-consumer-name-typography]')?.textContent.trim() || null,
//           title: element.querySelector('h2[data-service-review-title-typography]')?.textContent.trim() || null,
//           review: element.querySelector('p[data-service-review-text-typography]')?.textContent.trim() || null,
//           rating: element.querySelector('div[data-service-review-rating] img')?.alt || null,
//         }));
//       });

//       const updatedReviews = convertToNormalDateAndExtractRating(reviews);
//       console.log(updatedReviews);
//       return updatedReviews

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
// }

// // booking.com.........
// const booking= async (url) => {

//     const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
//     const page = await browser.newPage();

//     try {
//       await page.goto(url, { waitUntil: 'networkidle2',timeout: 60000  });

//       await page.waitForSelector('div[data-testid="review-card"]');

//       const reviews = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('div[data-testid="review-card"]')).map(element => ({
//           platform:"booking.com",
//           image: element.querySelector('div[data-testid="review-avatar"] img[loading="lazy"]')?.src || null,
//           date: element.querySelector('span[data-testid="review-date"]')?.textContent.trim() || null,
//           name: element.querySelector('div[data-testid="review-avatar"] div')?.textContent.trim() || null,
//           title: element.querySelector('div[data-testid="review-title"]')?.textContent.trim() || null,
//           review: element.querySelector('div[data-testid="review-positive-text"]')?.textContent.trim() || null,
//           rating: element.querySelector('div[data-testid="review-score"]')?.textContent || null,
//         }));
//       });
//       function transformReviews(reviews) {
//         return reviews.map(review => {

//           const [day, month, year] = review.date.match(/(\d{1,2}) (\w+) (\d{4})/).slice(1);
//           const date = new Date(`${month} ${day}, ${year}`);
//           const formattedDate = date.toDateString();

//           const ratingMatch = review.rating.match(/Scored (\d+(\.\d+)?) (\d+(\.\d+)?)/);
//           if (ratingMatch) {
//             const rating = parseFloat(ratingMatch[1]);
//             const normalizedRating = Math.round(rating / 2);

//             return {
//               ...review,
//               date: formattedDate,
//               rating: normalizedRating
//             };
//           }

//           return {
//             ...review,
//             date: formattedDate,
//             rating: null
//           };
//         });
//       }
//       const filteredReview=transformReviews(reviews)
//       console.log(filteredReview);
//       return filteredReview

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// //tripadvisor..........
// const tripadvisor= async (url)=> {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     try {
//       page.setDefaultNavigationTimeout(60000)
//       await page.goto(url, { waitUntil: 'networkidle2' });

//       await page.waitForSelector('div[data-test-target="HR_CC_CARD"]');

//       const reviews = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('div[data-test-target="HR_CC_CARD"]')).map(element => ({
//           platform:"tripadvisor",
//           image: element.querySelector('img')?.src || null,
//           date: element.querySelector('span span ')?.textContent.trim() || null,
//           name: element.querySelector('span span a')?.textContent.trim() || null,
//           title: element.querySelector('div[data-test-target="review-title"] span')?.textContent.trim() || null,
//           review: element.querySelector('span[data-automation] span')?.textContent.trim() || null,
//           rating: element.querySelector('div[data-test-target="review-rating"] title')?.textContent || null,
//         }));
//       });
//       function transformReviews(reviews) {
//         return reviews.map(review => {
//             // Transform the date
//             const dateMatch = review.date.match(/(?:\w+\s\w+\s)?(\w+)\s(\d{4})/);
//             if (dateMatch) {
//                 const [_, month, year] = dateMatch;
//                 review.date = new Date(`${month} 1, ${year}`).toDateString();
//             }

//             // Transform the rating
//             if (review.rating) {
//                 const ratingMatch = review.rating.match(/(\d+(\.\d+)?)\s*of\s*\d+/);
//                 if (ratingMatch) {
//                     review.rating = parseFloat(ratingMatch[1]);
//                 }
//             }

//             return review;
//         });
//     }
//       const filteredReview=transformReviews(reviews)
//       console.log(filteredReview);

//       return filteredReview

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// // makemytrip.........
// const makemytrip= async (url) =>{
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     let allReviews = [];

//     try {
//       await page.setViewport({width: 1080, height: 1024});
//       page.setDefaultNavigationTimeout(60000);
//       await page.goto(url, { waitUntil: 'networkidle2' });

//         const reviews = await page.evaluate(() => {
//           return Array.from(document.querySelectorAll('.reviewBox ')).map(element => ({
//             platform:"makemytrip",
//             image: element.querySelector('img')?.src || null,
//             date: element.querySelector('.appendTop4')?.textContent.trim() || null,
//             name: element.querySelector('.appendTop4')?.textContent.trim() || null,
//             title: element.querySelector('.reviewBoxLeft p')?.textContent.trim() || null,
//             review: element.querySelector('.font14')?.textContent.trim() || null,
//             rating: element.querySelector('.reviewListingItemRating')?.textContent || null,
//           }));
//         });

//         function transformReviews(reviews) {
//           return reviews.map(review => {

//             const dateMatch = review.date.match(/(\w+\s\d{1,2},\s\d{4})/);
//             const dateFormatted = dateMatch ? new Date(dateMatch[0]).toDateString() : null;

//             const nameMatch = review.name.match(/by\s(.+?)\s\./);
//             const name = nameMatch ? nameMatch[1].trim() : null;

//             const rating = parseFloat(review.rating.trim());

//             return {
//               ...review,
//               date: dateFormatted,
//               name: name,
//               rating: rating,
//             };
//           });
//         }
//         const filteredReview=transformReviews(reviews)
//       console.log(filteredReview);
//       return filteredReview

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// // gobigo.............
// const gobigo=async (url)=> {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     try {
//       await page.setViewport({width: 1080, height: 1024});
//       page.setDefaultNavigationTimeout(60000);
//       await page.goto(url, { waitUntil: 'networkidle2' });

//         await page.waitForSelector('div[itemprop="reviews"]');

//         const reviews = await page.evaluate(() => {
//           return Array.from(document.querySelectorAll('div[itemprop="reviews"]')).map(element => ({
//             platform:"gobigo",
//             image: element.querySelector('img')?.src || null,
//             date: element.querySelector('div span')?.textContent.trim() || null,
//             name: element.querySelector('span[itemprop="name"]')?.textContent.trim() || null,
//             title: element.querySelector('div[data-test-target="review-title"] span')?.textContent.trim() || null,
//             review: element.querySelector('span span span')?.textContent.trim() || null,
//             rating: element.querySelector('span[itemprop="ratingValue"]')?.textContent || null,
//           }));
//         });

//       console.log(reviews);
//       return reviews

//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       await browser.close();
//     }
//   }

// module.exports={
//   airbnb,agoda,trustpilot,makemytrip,gobigo,tripadvisor,booking
// }

// const puppeteer = require('puppeteer');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const axios = require("axios");
const GOOGLE_API_KEY = 'AIzaSyAcn2vA9OW0Kv1dmDhnQrnAdsH4xr65_80';

function convertToNormalDateAndExtractRating(reviews) {
  return reviews.map((review) => {
    if (review.date) {
      const parsedDate = Date.parse(review.date);
      if (isNaN(parsedDate)) {
        const daysAgoMatch = review.date.match(/(\d+)\s+days?\s+ago/);
        if (daysAgoMatch) {
          const daysAgo = parseInt(daysAgoMatch[1], 10);
          const date = new Date();
          date.setDate(date.getDate() - daysAgo);
          review.date = date.toDateString();
        }
      } else {
        review.date = new Date(parsedDate).toDateString();
      }
    }

    if (review.rating) {
      const ratingMatch = review.rating.match(
        /(\d+(?:\.\d+)?)\s+out\s+of\s+\d+/
      );
      if (ratingMatch) {
        review.rating = parseFloat(ratingMatch[1]);
      }
    }

    return review;
  });
}

async function launchBrowser() {
  return await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });
}

async function createPage(browser) {
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  return page;
}

async function navigateToPage(page, url) {
  await page.setDefaultNavigationTimeout(60000);
  await page.goto(url, { waitUntil: "networkidle2" });
}

const airbnb = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await createPage(browser);

  try {
    await navigateToPage(page, url);
    await page.waitForSelector("div[data-review-id]", { timeout: 30000 });

    const reviews = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("div[data-review-id]")).map(
        (element) => ({
          platform: "airbnb",
          image: element.querySelector("a img")?.src || null,
          date:
            element.querySelector("div")?.textContent.trim() ||
            "No date available",
          name:
            element.querySelector("h2")?.textContent.trim() ||
            "No name available",
          title:
            element
              .querySelector('div[data-testid="review-title"]')
              ?.textContent.trim() || null,
          review:
            element.querySelector("span span")?.textContent.trim() ||
            "No review available",
          rating:
            element.querySelector("span")?.textContent.trim() ||
            "No rating available",
        })
      );
    });

    function transformReviews(reviews) {
      return reviews.map((review) => {
        const dateParts = review.date.split("·").map((part) => part.trim());
        let formattedDate = dateParts.find((part) =>
          /[A-Za-z]+\s+\d{4}/.test(part)
        );

        if (formattedDate) {
          formattedDate = new Date(formattedDate);
          formattedDate.setDate(1);
        } else {
          formattedDate = new Date();
        }

        const ratingMatch = review.rating.match(/(\d+)/);
        const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;

        return {
          ...review,
          date: formattedDate.toDateString(),
          rating: rating,
        };
      });
    }

    const filteredReview = transformReviews(reviews);
    return filteredReview;
  } catch (error) {
    console.error("Error fetching Airbnb reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

const agoda = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await createPage(browser);

  try {
    await navigateToPage(page, url);

    await page.select("#review-sort-id", "1");

    await page.waitForSelector("div[data-review-id]", { timeout: 30000 });

    const reviews = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("div[data-review-id]")).map(
        (element) => ({
          platform: "agoda",
          image: element.querySelector("a img")?.src || null,
          date:
            element
              .querySelector(".Review-statusBar-date")
              ?.textContent.trim() || null,
          name:
            element
              .querySelector(".Review-comment-reviewer strong")
              ?.textContent.trim() || null,
          title:
            element
              .querySelector('h4[data-testid="review-title"]')
              ?.textContent.trim() || null,
          review:
            element
              .querySelector(".Review-comment-bodyText")
              ?.textContent.trim() || null,
          rating:
            element
              .querySelector(
                ".Review-comment-leftHeader .Review-comment-leftScore"
              )
              ?.textContent.trim() || null,
        })
      );
    });

    const filteredReviews = reviews
      .filter((review) => Object.values(review).some((value) => value !== null))
      .map((review) => {
        if (review.date) {
          const dateParts = review.date.match(/Reviewed (\w+ \d{1,2}, \d{4})/);
          if (dateParts) {
            const formattedDate = new Date(dateParts[1]).toDateString();
            review.date = formattedDate;
          }
        }

        if (review.rating) {
          review.rating = (parseFloat(review.rating) / 2).toFixed(1);
        }

        return review;
      });

    return filteredReviews;
  } catch (error) {
    console.error("Error fetching Agoda reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

const trustpilot = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await createPage(browser);

  try {
    await navigateToPage(page, url);

    await page.waitForSelector('button[data-sort-button="true"]');
    await page.click('button[data-sort-button="true"]');

    // Wait for the dropdown or options to be visible (assuming some dropdown opens)
    await page.waitForSelector("p.typography_heading-xxs__QKBS8");

    // Check the text inside the <p> element
    const optionText = await page.$eval(
      "p.typography_heading-xxs__QKBS8",
      (el) => el.textContent
    );

    // If the text is 'Most recent', proceed with your selection
    if (optionText.trim() === "Most recent") {
      console.log("The option is Most recent, selecting it...");
      // Perform any action needed after verifying it's 'Most recent'
      // For example, you could click the element again if necessary or do additional processing.
    } else {
      console.log("The option is not Most recent");
    }

    await page.waitForSelector(".styles_reviewCard__9HxJJ", { timeout: 30000 });

    const reviews = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".styles_reviewCard__9HxJJ")
      ).map((element) => ({
        platform: "trustpilot",
        image: element.querySelector("img[data-nimg]")?.src || null,
        date: element.querySelector("time")?.textContent.trim() || null,
        name:
          element
            .querySelector("span[data-consumer-name-typography]")
            ?.textContent.trim() || null,
        title:
          element
            .querySelector("h2[data-service-review-title-typography]")
            ?.textContent.trim() || null,
        review:
          element
            .querySelector("p[data-service-review-text-typography]")
            ?.textContent.trim() || null,
        rating:
          element.querySelector("div[data-service-review-rating] img")?.alt ||
          null,
      }));
    });

    const updatedReviews = convertToNormalDateAndExtractRating(reviews);
    return updatedReviews;
  } catch (error) {
    console.error("Error fetching Trustpilot reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

const booking = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await createPage(browser);

  try {
    await navigateToPage(page, url);

    await page.select(
      'select[data-testid="reviews-sorter-component"]',
      "NEWEST_FIRST"
    );

    await page.waitForSelector('div[data-testid="review-card"]', {
      timeout: 30000,
    });

    const reviews = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('div[data-testid="review-card"]')
      ).map((element) => ({
        platform: "booking.com",
        image:
          element.querySelector(
            'div[data-testid="review-avatar"] img[loading="lazy"]'
          )?.src || null,
        date:
          element
            .querySelector('span[data-testid="review-date"]')
            ?.textContent.trim() || null,
        name:
          element
            .querySelector('div[data-testid="review-avatar"] div')
            ?.textContent.trim() || null,
        title:
          element
            .querySelector('div[data-testid="review-title"]')
            ?.textContent.trim() || null,
        review:
          element
            .querySelector('div[data-testid="review-positive-text"]')
            ?.textContent.trim() || null,
        rating:
          element.querySelector('div[data-testid="review-score"]')
            ?.textContent || null,
      }));
    });

    function transformReviews(reviews) {
      return reviews.map((review) => {
        const [day, month, year] = review.date
          .match(/(\d{1,2}) (\w+) (\d{4})/)
          .slice(1);
        const date = new Date(`${month} ${day}, ${year}`);
        const formattedDate = date.toDateString();

        const ratingMatch = review.rating.match(
          /Scored (\d+(\.\d+)?) (\d+(\.\d+)?)/
        );
        if (ratingMatch) {
          const rating = parseFloat(ratingMatch[1]);
          const normalizedRating = Math.round(rating / 2);

          return {
            ...review,
            date: formattedDate,
            rating: normalizedRating,
          };
        }

        return {
          ...review,
          date: formattedDate,
          rating: null,
        };
      });
    }

    const filteredReview = transformReviews(reviews);
    return filteredReview;
  } catch (error) {
    console.error("Error fetching Booking.com reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

const tripadvisor = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await createPage(browser);

  try {
    await navigateToPage(page, url);
    await page.waitForSelector('div[data-test-target="HR_CC_CARD"]', {
      timeout: 30000,
    });

    const reviews = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('div[data-test-target="HR_CC_CARD"]')
      ).map((element) => ({
        platform: "tripadvisor",
        image: element.querySelector("img")?.src || null,
        date: element.querySelector("span span ")?.textContent.trim() || null,
        name: element.querySelector("span span a")?.textContent.trim() || null,
        title:
          element
            .querySelector('div[data-test-target="review-title"] span')
            ?.textContent.trim() || null,
        review:
          element
            .querySelector("span[data-automation] span")
            ?.textContent.trim() || null,
        rating:
          element.querySelector('div[data-test-target="review-rating"] title')
            ?.textContent || null,
      }));
    });

    function transformReviews(reviews) {
      return reviews.map((review) => {
        const dateMatch = review.date.match(/(?:\w+\s\w+\s)?(\w+)\s(\d{4})/);
        if (dateMatch) {
          const [_, month, year] = dateMatch;
          review.date = new Date(`${month} 1, ${year}`).toDateString();
        }

        if (review.rating) {
          const ratingMatch = review.rating.match(/(\d+(\.\d+)?)\s*of\s*\d+/);
          if (ratingMatch) {
            review.rating = parseFloat(ratingMatch[1]);
          }
        }

        return review;
      });
    }

    const filteredReview = transformReviews(reviews);
    return filteredReview;
  } catch (error) {
    console.error("Error fetching TripAdvisor reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

const makemytrip = async (url) => {
  const browser = await puppeteer.launch({
    args:[
    ...chromium.args, 
    '--disable-http2',  // Disable HTTP/2
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage', // Prevents crashes when Chromium uses too much memory
    '--disable-features=IsolateOrigins,site-per-process' // Avoids CORS-related issues
  ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  
  const page = await browser.newPage();

  // Retry logic for the page.goto call
  const gotoWithRetry = async (page, url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        return; // Exit the loop if successful
      } catch (err) {
        console.log(`Failed to navigate, attempt ${i + 1} of ${retries}`);
        if (i === retries - 1) {
          // If all attempts fail, throw the error to be handled outside
          throw new Error(`Failed to load the page after ${retries} attempts: ${err}`);
        }
      }
    }
  };

try {
     await page.setViewport({ width: 1080, height: 1024 });
   //   await page.goto(url, { waitUntil: 'networkidle2' });
   // await page.goto(url, { waitUntil: 'networkidle2' });
  await gotoWithRetry(page, url);
     await page.waitForSelector(".userRvs__item", { timeout: 30000 });

             const reviews = await page.evaluate(() => {
               return Array.from(document.querySelectorAll('.userRvs__item ')).map(element => ({
                 platform:"makemytrip",
                 image: element.querySelector('img')?.src || null,
                 date: element.querySelector('.userRvs__rvdtl span:nth-child(5)')?.textContent.trim() || null,
                 name: element.querySelector('span[class="userRvs__rvdtlPoints titText"]')?.textContent.trim() || null,
                 title: element.querySelector('.userRvs__itemHdr p')?.textContent.trim() || null,
                 review: element.querySelector('.userRvs__item p:nth-child(3)')?.textContent.trim() || null,
                 rating: element.querySelector('.userRvs__rtng')?.textContent || null,
               }));
             });
     console.log(reviews)
 
     function transformReviews(reviews) {
      return reviews.map((review) => {
        // Extract date and format it as "Tue Feb 27 2024"
        const dateMatch = review.date.match(/(\w+\s\d{1,2},\s\d{4})/);
        const dateFormatted = dateMatch
          ? new Date(dateMatch[0]).toDateString()
          : null;
    
        // Extract name after 'by' and before '.'
      //   const nameMatch = review.name.match(/by\s(.+?)\s\./);
      //   const name = nameMatch ? nameMatch[1].trim() : null;
    
        // Parse rating, round it, and ensure it's out of 5
        const rating = Math.round((parseFloat(review.rating.trim()) / 5) * 5);
    
        // Extract platform, image, title, and review
        const { platform = 'makemytrip', image = review.image, title, review: reviewText } = review;
    
        return {
          platform,
          image,
          date: dateFormatted,
          name: review.name,
          title: title.trim(),
          review: reviewText.trim(),
          rating: rating,
        };
      });
    }
 
     const filteredReview = transformReviews(reviews);
     console.log(filteredReview)
     return filteredReview;
   } catch (error) {
    console.error("Error fetching MakeMyTrip reviews:", error);
    return [];
  } finally {
    await browser.close();
  }
};

// gobigo.............
const goibibo = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  console.log("helloooooooooooooooooooooooooooooooooo")

  const page = await createPage(browser);

  try {
    await page.setViewport({ width: 1080, height: 1024 });
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url, { waitUntil: "networkidle2" });

    // await page.waitForSelector('div[data-testid="SortByTitle"]');
    // await page.click('div[data-testid="SortByTitle"]');

    // // Wait for the dropdown options to be visiblea
    // await page.waitForSelector('div[data-testid="SortByOptions"]');

 
    // const mostRecentOption = await page.$(
    //   'input[type="radio"][name="Most Recent First"]'
    // );
    // if (mostRecentOption) {
    //   await mostRecentOption.click(); 
    //   console.log('Selected "Most Recent First" option.');
    // } else {
    //   console.log('"Most Recent First" option not found.');
    // }

    // await page.waitForSelector('div[itemprop="reviews"]');

    // const reviews = await page.evaluate(() => {
    //   return Array.from(
    //     document.querySelectorAll('div[itemprop="reviews"]')
    //   ).map((element) => ({
    //     platform: "gobigo",
    //     image: element.querySelector("img")?.src || null,
    //     date: element.querySelector("div span")?.textContent.trim() || null,
    //     name:
    //       element.querySelector('span[itemprop="name"]')?.textContent.trim() ||
    //       null,
    //     title:
    //       element
    //         .querySelector('div[data-test-target="review-title"] span')
    //         ?.textContent.trim() || null,
    //     review:
    //       element.querySelector("span span span")?.textContent.trim() || null,
    //     rating:
    //       element.querySelector('span[itemprop="ratingValue"]')?.textContent ||
    //       null,
    //   }));
    // });
    await page.waitForSelector('div[itemprop="reviews"]');
  
        
        const reviews = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('div[itemprop="reviews"]')).map(element => ({
            platform:"gobigo",
            image: element.querySelector('img')?.src || null,
            date: element.querySelector('div span')?.textContent.trim() || null,
            name: element.querySelector('span[itemprop="name"]')?.textContent.trim() || null,
            title: element.querySelector('div[data-test-target="review-title"] span')?.textContent.trim() || null,
            review: element.querySelector('span span span')?.textContent.trim() || null,
            rating: element.querySelector('span[itemprop="ratingValue"]')?.textContent || null,
          }));
        });

    console.log(reviews);
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
  }
};

const google = async (place_id) => {
  if (!place_id) {
    throw new Error("place_id is required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: place_id,
          key: GOOGLE_API_KEY,
          fields: "name,rating,reviews",
          reviews_sort: 'newest'
        }
      }
    );

    const placeDetails = response.data.result;

    if (!placeDetails) {
      throw new Error("Place not found");
    }

    // Sort reviews by the time field (most recent first)
    const sortedReviews = (placeDetails.reviews || []).sort(
      (a, b) => b.time - a.time
    );

    // Format the reviews according to your request
    const formattedReviews = sortedReviews.map(review => ({
      platform:"google",
      name: review.author_name,
      image: review.profile_photo_url,
      rating: review.rating,
      date: review.relative_time_description,
      review: review.text
    }));

    return formattedReviews
    
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw new Error("Failed to fetch place reviews");
  }
};


module.exports = {
  airbnb,
  agoda,
  trustpilot,
  makemytrip,
  tripadvisor,
  booking,
  goibibo,
  google
};
