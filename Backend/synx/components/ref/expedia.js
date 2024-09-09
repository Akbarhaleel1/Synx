

const puppeteer = require('puppeteer');

// date 
function convertToNormalDateAndExtractRating(reviews) {
  const updatedReviews = reviews.map(review => {
    // Convert date to normal date format
    if (review.date) {
      const parsedDate = Date.parse(review.date);
      if (isNaN(parsedDate)) {
        // Handle dates like '6 days ago'
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

    // Extract the rating number
    if (review.rating) {
      const ratingMatch = review.rating.match(/(\d+(?:\.\d+)?)\s+out\s+of\s+\d+/);
      if (ratingMatch) {
        review.rating = parseFloat(ratingMatch[1]);
      }
    }

    return review;
  });
  return updatedReviews;
}
const infinitescroll= async (page)=>{
  while (true) {
    previousHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`
    ); // Wait for 2 seconds for content to load
    await new Promise((resolve)=> setTimeout(resolve,1000))
  }
}
const scrollDiv = async (page, selector) => {
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollBy(0, 1000); // Scrolls down the div by 1000 pixels
    }
  }, selector);
};
// date end 

async function airbnb(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2' }); 

   
    await page.waitForSelector('div[data-review-id] ');

    
    const reviews = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('div[data-review-id] ')).map(element => ({
        platform:"airbnb",
        image: element.querySelector('a img')?.src || null,
        date: element.querySelector('div')?.textContent.trim() || "No date available",
        name: element.querySelector('h2')?.textContent.trim() || "No name available",
        title: element.querySelector('div[data-testid="review-title"]')?.textContent.trim() || null,
        review: element.querySelector('span span')?.textContent.trim() || "No review available",
        rating: element.querySelector('span')?.textContent.trim() || "No rating available",
      }));
    });
    function transformReviews(reviews) {
      return reviews.map(review => {
          
          const dateParts = review.date.split('·').map(part => part.trim());
          let formattedDate = dateParts.find(part => /[A-Za-z]+\s+\d{4}/.test(part));
  
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
              rating: rating
          };
      });
  }
  const filteredReview=transformReviews(reviews)
    console.log(filteredReview);

  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
  }
} 

async function agoda(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
   
     
      await page.waitForSelector('div[data-review-id] ');
  
       
      const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div[data-review-id] ')).map(element => ({
          platform:"agoda",
          image: element.querySelector('a img')?.src || null,
          date: element.querySelector('.Review-statusBar-date')?.textContent.trim() || null,
          name: element.querySelector('.Review-comment-reviewer strong')?.textContent.trim() || null,
          title: element.querySelector('h4[data-testid="review-title"]')?.textContent.trim() || null,
          review: element.querySelector('.Review-comment-bodyText')?.textContent.trim() || null,
          rating: element.querySelector('.Review-comment-leftHeader .Review-comment-leftScore')?.textContent.trim() || null,
        }));
      }); 
      const filteredReviews = reviews
  .filter(review => Object.values(review).some(value => value !== null))
  .map(review => {
    
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
      console.log(filteredReviews);
  
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      await browser.close();
    }
  }

async function trustpilot(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
   
     
      await page.waitForSelector('.styles_reviewCard__9HxJJ ');
  
       
      const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.styles_reviewCard__9HxJJ')).map(element => ({
          platform:"trustpilot",
          image: element.querySelector('img[data-nimg]')?.src || null,
          date: element.querySelector('time')?.textContent.trim() || null,
          name: element.querySelector('span[data-consumer-name-typography]')?.textContent.trim() || null,
          title: element.querySelector('h2[data-service-review-title-typography]')?.textContent.trim() || null,
          review: element.querySelector('p[data-service-review-text-typography]')?.textContent.trim() || null,
          rating: element.querySelector('div[data-service-review-rating] img')?.alt || null,
        }));
      }); 

      const updatedReviews = convertToNormalDateAndExtractRating(reviews);
      console.log(updatedReviews);
  
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      await browser.close();
    }
  }

async function booking(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
   
     
      await page.waitForSelector('div[data-testid="review-card"]');
  
       
      const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div[data-testid="review-card"]')).map(element => ({
          platform:"booking.com",
          image: element.querySelector('div[data-testid="review-avatar"] img[loading="lazy"]')?.src || null,
          date: element.querySelector('span[data-testid="review-date"]')?.textContent.trim() || null,
          name: element.querySelector('div[data-testid="review-avatar"] div')?.textContent.trim() || null,
          title: element.querySelector('div[data-testid="review-title"]')?.textContent.trim() || null,
          review: element.querySelector('div[data-testid="review-positive-text"]')?.textContent.trim() || null,
          rating: element.querySelector('div[data-testid="review-score"]')?.textContent || null,
        }));
      });
      function transformReviews(reviews) {
        return reviews.map(review => {
          
          const [day, month, year] = review.date.match(/(\d{1,2}) (\w+) (\d{4})/).slice(1);
          const date = new Date(`${month} ${day}, ${year}`);
          const formattedDate = date.toDateString();
          
          
          const ratingMatch = review.rating.match(/Scored (\d+(\.\d+)?) (\d+(\.\d+)?)/);
          if (ratingMatch) {
            const rating = parseFloat(ratingMatch[1]);
            const normalizedRating = Math.round(rating / 2);
            
            return {
              ...review,
              date: formattedDate,
              rating: normalizedRating
            };
          }
      
          return {
            ...review,
            date: formattedDate,
            rating: null
          };
        });
      }
      const filteredReview=transformReviews(reviews)
      console.log(filteredReview);
  
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      await browser.close();
    }
  }

async function tripadvisor(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
      page.setDefaultNavigationTimeout(60000)
      await page.goto(url, { waitUntil: 'networkidle2' });
   
     
      await page.waitForSelector('div[data-test-target="HR_CC_CARD"]');
  
       
      const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div[data-test-target="HR_CC_CARD"]')).map(element => ({
          platform:"tripadvisor",
          image: element.querySelector('img')?.src || null,
          date: element.querySelector('span span ')?.textContent.trim() || null,
          name: element.querySelector('span span a')?.textContent.trim() || null,
          title: element.querySelector('div[data-test-target="review-title"] span')?.textContent.trim() || null,
          review: element.querySelector('span[data-automation] span')?.textContent.trim() || null,
          rating: element.querySelector('div[data-test-target="review-rating"] title')?.textContent || null,
        }));
      }); 
      function transformReviews(reviews) {
        return reviews.map(review => {
            // Transform the date
            const dateMatch = review.date.match(/(?:\w+\s\w+\s)?(\w+)\s(\d{4})/);
            if (dateMatch) {
                const [_, month, year] = dateMatch;
                review.date = new Date(`${month} 1, ${year}`).toDateString();
            }
            
            // Transform the rating
            if (review.rating) {
                const ratingMatch = review.rating.match(/(\d+(\.\d+)?)\s*of\s*\d+/);
                if (ratingMatch) {
                    review.rating = parseFloat(ratingMatch[1]);
                }
            }
            
            return review;
        });
    }
      const filteredReview=transformReviews(reviews)
      console.log(filteredReview);
  
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      await browser.close();
    }
  }
async function gobigo(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let allReviews = []; // Store all reviews here

  try {
    await page.setViewport({width: 1080, height: 1024});
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url, { waitUntil: 'networkidle2' }); 

    // while (true) {
      ; // Append current page reviews to the overall list

     while( await page.$(".Paginationstyles__RightSkipStyles-sc-1xuxk5q-4")){
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
      console.log("reviiiiiiiiiiiiiiiii",reviews)
      allReviews = allReviews.concat(reviews)
      
      await page.click(".Paginationstyles__RightSkipStyles-sc-1xuxk5q-4")
      
     }

    console.log(allReviews); // Output all the reviews collected

  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
  }
}
async function makemytrip(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let allReviews = []; 

  try {
    await page.setViewport({width: 1080, height: 1024});
    page.setDefaultNavigationTimeout(60000);
    await page.goto(url, { waitUntil: 'networkidle2' });

      
      const reviews = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.reviewBox ')).map(element => ({
          platform:"makemytrip",
          image: element.querySelector('img')?.src || null,
          date: element.querySelector('.appendTop4')?.textContent.trim() || null,
          name: element.querySelector('.appendTop4')?.textContent.trim() || null,
          title: element.querySelector('.reviewBoxLeft p')?.textContent.trim() || null,
          review: element.querySelector('.font14')?.textContent.trim() || null,
          rating: element.querySelector('.reviewListingItemRating')?.textContent || null,
        }));
      });
      
      function transformReviews(reviews) {
        return reviews.map(review => {
          
          const dateMatch = review.date.match(/(\w+\s\d{1,2},\s\d{4})/);
          const dateFormatted = dateMatch ? new Date(dateMatch[0]).toDateString() : null;
      
          
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
      const filteredReview=transformReviews(reviews)
    console.log(filteredReview); 

  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
  }
}
// uncompleted scrap

async function ixigo(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    page.setDefaultNavigationTimeout(60000)
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div[data-testid="review-card"]');
 
    // await infinitescroll(page)

   

    const reviews = await page.evaluate(() => {

      return Array.from(document.querySelectorAll('div[data-testid="review-card"]')).map(element => ({
        image: element.querySelector('img')?.src || null,
        date: element.querySelector('p p')?.textContent.trim() || null,
        name: element.querySelector('p')?.textContent.trim() || null,
        title: element.querySelector('h6')?.textContent.trim() || null,
        review: element.querySelector('div div p')?.textContent.trim() || null,
        rating: element.querySelector('div p')?.textContent || null,
      }));
    }); 
 
    console.log(reviews);

  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    await browser.close();
  }
}
// async function gobigo(url) {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
  
//   try {
//     page.setDefaultNavigationTimeout(60000)
//     await page.goto(url, { waitUntil: 'networkidle2' });
 
   
//     await page.waitForSelector('div[itemprop="reviews"]');

     
//     const reviews = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('div[itemprop="reviews"]')).map(element => ({
//         image: element.querySelector('img')?.src || null,
//         date: element.querySelector('div span')?.textContent.trim() || null,
//         name: element.querySelector('span[itemprop="name"]')?.textContent.trim() || null,
//         title: element.querySelector('div[data-test-target="review-title"] span')?.textContent.trim() || null,
//         review: element.querySelector('span span span')?.textContent.trim() || null,
//         rating: element.querySelector('span[itemprop="ratingValue"]')?.textContent || null,
//       }));
//     }); 

//     console.log(reviews);

//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//   } finally {
//     await browser.close();
//   }
// }








const url = 'https://www.makemytrip.com/hotels/fairmont_jaipur-details-jaipur.html';
makemytrip(url).then(() => {
  console.log("Fetch completed");
});
