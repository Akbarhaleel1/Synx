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
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await createPage(browser);

  try {
    await page.setViewport({ width: 1080, height: 1024 });
    await navigateToPage(page, url);
    await page.waitForSelector(".reviewBox", { timeout: 30000 });

    const reviews = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".reviewBox")).map(
        (element) => ({
          platform: "makemytrip",
          image: element.querySelector("img")?.src || null,
          date:
            element.querySelector(".appendTop4")?.textContent.trim() || null,
          name:
            element.querySelector(".appendTop4")?.textContent.trim() || null,
          title:
            element.querySelector(".reviewBoxLeft p")?.textContent.trim() ||
            null,
          review: element.querySelector(".font14")?.textContent.trim() || null,
          rating:
            element.querySelector(".reviewListingItemRating")?.textContent ||
            null,
        })
      );
    });

    function transformReviews(reviews) {
      return reviews.map((review) => {
        const dateMatch = review.date.match(/(\w+\s\d{1,2},\s\d{4})/);
        const dateFormatted = dateMatch
          ? new Date(dateMatch[0]).toDateString()
          : null;

        const nameMatch = review.name.match(/by\s(.+?)\s\./);
        const name = nameMatch ? nameMatch[1].trim() : null;

        const rating = parseFloat(review.rating.trim());

        return {
          ...review,
          date: dateFormatted,
          name: name,
          rating: rating,
        };
      });
    }

    const filteredReview = transformReviews(reviews);
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

  const page = await createPage(browser);

  try {
    // await page.setViewport({ width: 1080, height: 1024 });
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector('div[data-testid="SortByTitle"]');
    await page.click('div[data-testid="SortByTitle"]');

    // Wait for the dropdown options to be visiblea
    await page.waitForSelector('div[data-testid="SortByOptions"]');

 
    const mostRecentOption = await page.$(
      'input[type="radio"][name="Most Recent First"]'
    );
    if (mostRecentOption) {
      await mostRecentOption.click(); 
      console.log('Selected "Most Recent First" option.');
    } else {
      console.log('"Most Recent First" option not found.');
    }

    await page.waitForSelector('div[itemprop="reviews"]');

    const reviews = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('div[itemprop="reviews"]')
      ).map((element) => ({
        platform: "gobigo",
        image: element.querySelector("img")?.src || null,
        date: element.querySelector("div span")?.textContent.trim() || null,
        name:
          element.querySelector('span[itemprop="name"]')?.textContent.trim() ||
          null,
        title:
          element
            .querySelector('div[data-test-target="review-title"] span')
            ?.textContent.trim() || null,
        review:
          element.querySelector("span span span")?.textContent.trim() || null,
        rating:
          element.querySelector('span[itemprop="ratingValue"]')?.textContent ||
          null,
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

// const google = async (url) => {
//   const browser = await puppeteer.launch({
//     args: chromium.args,
//     defaultViewport: chromium.defaultViewport,
//     executablePath: await chromium.executablePath(),
//     headless: chromium.headless,
//     ignoreHTTPSErrors: true,
//   });
//   const page = await createPage(browser);
//   console.log("live share",url)

//   try {
//     // await page.setViewport({ width: 1080, height: 1024 });
//     page.setDefaultNavigationTimeout(60000);
//     await page.goto(url, { waitUntil: "networkidle2" });

//     await page.waitForSelector('button[aria-label*="Reviews"]');

//     await page.evaluate(() => {
//       const button = Array.from(
//         document.querySelectorAll("button")
//       ).find((el) => el.getAttribute("aria-label")?.includes("Reviews"));
//       if (button) {
//         button.click();
//       }
//     });
//     await page.waitForNavigation();
//     await page.waitForSelector('button[aria-label="Sort reviews"]');
//     await page.click('button[aria-label="Sort reviews"]');
//     await page.waitForSelector(
//       'div[role="menuitemradio"][aria-checked="false"]'
//     );

//     await page.evaluate(() => {
//       const newestElement = Array.from(
//         document.querySelectorAll('div[role="menuitemradio"]')
//       ).find((el) => el.innerText.includes("Newest"));
//       if (newestElement) {
//         newestElement.click();
//       }
//     });
//     await page.waitForNavigation();
//     await page.waitForSelector("div[data-review-id]");

//     const reviews = await page.$$eval("div[data-review-id]", (reviewEls) => {
//       return reviewEls.map((reviewEl) => {
//         const platform = "google";
//         // const reviewId = reviewEl.getAttribute('data-review-id');
//         const image =
//           reviewEl.querySelector("button.WEBjve img")?.src ||
//           reviewEl.querySelector("img.NBa7we")?.src ||
//           "";
//         const name =
//           reviewEl.querySelector("div.d4r55")?.innerText ||
//           reviewEl.querySelector("div.d4r55")?.innerText ||
//           "";
//         const review =
//           reviewEl.querySelector(".MyEned")?.innerText ||
//           reviewEl.querySelector("span.wiI7pd")?.innerText ||
//           "";
//         const date =
//           reviewEl.querySelector(".rsqaWe")?.innerText ||
//           reviewEl.querySelector("span.xRkPPb")?.innerText ||
//           "";
//         const rating =
//           reviewEl.querySelectorAll(".NhBTye.elGi1d").length ||
//           reviewEl.querySelector("span.fzvQIb")?.innerText[0] ||
//           "";

//         return {
//           platform,
//           image,
//           name,
//           review,
//           date,
//           rating,
//         };
//       });
//     });

//     console.log

//     return reviews;
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//   } finally {
//     await browser.close();
//   } 
// }; 
const google = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: false, // Set to false for debugging
    ignoreHTTPSErrors: true,
  });

  const page = await createPage(browser);
  console.log("Visiting:", url);

  try {
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector('button[aria-label*="Reviews"]', { visible: true });
    console.log("Found Reviews button!");

    await page.evaluate(() => {
      const button = Array.from(document.querySelectorAll("button"))
        .find((el) => el.getAttribute("aria-label")?.includes("Reviews"));
      if (button) {
        button.click();
        console.log("Clicked Reviews button");
      }
    });

    await page.waitForNavigation({ waitUntil: "networkidle2" });
    console.log("Navigation completed.");

    await page.waitForSelector('button[aria-label="Sort reviews"]', { timeout: 60000 });
    await page.click('button[aria-label="Sort reviews"]');
    console.log("Clicked Sort reviews button.");

    await page.waitForSelector('div[role="menuitemradio"][aria-checked="false"]', { timeout: 60000 });
    await page.evaluate(() => {
      const newestElement = Array.from(document.querySelectorAll('div[role="menuitemradio"]'))
        .find((el) => el.innerText.includes("Newest"));
      if (newestElement) {
        newestElement.click();
        console.log("Clicked on Newest sort option.");
      }
    });

    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForSelector("div[data-review-id]", { timeout: 60000 });

    const reviews = await page.$$eval("div[data-review-id]", (reviewEls) => {
      return reviewEls.map((reviewEl) => {
        const platform = "google";
        const image = reviewEl.querySelector("button.WEBjve img")?.src || "";
        const name = reviewEl.querySelector("div.d4r55")?.innerText || "";
        const review = reviewEl.querySelector(".MyEned")?.innerText || "";
        const date = reviewEl.querySelector(".rsqaWe")?.innerText || "";
        const rating = reviewEl.querySelectorAll(".NhBTye.elGi1d").length || "";

        return { platform, image, name, review, date, rating };
      });
    });

    console.log("Fetched Reviews:", reviews);
    return reviews;

  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
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
