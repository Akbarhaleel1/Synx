const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function booking(url) {
    let browser;
    try {
        // Launch a new browser
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
          }); // Set to true for headless mode
        const page = await browser.newPage();

        // Navigate to the page containing the reviews
        await page.goto(url);

        // Extract average review rate and review count
        const reviewData = await page.evaluate(() => {
            const scoreElement = document.querySelector('.ac4a7896c7');
            const reviewCountElement = document.querySelector("div[class='abf093bdfe f45d8e4c32 d935416c47']");
            
            const score = scoreElement ? scoreElement.textContent.trim().split(' ')[1] : null;
            const reviewCount = reviewCountElement ? reviewCountElement.textContent.trim().split(' ')[0] : null;
            
            return {
                averageRating: score ? (parseFloat(score) / 2).toFixed(1) : null, // Convert rating to be out of 5
                reviewCount: reviewCount
            };
        });

        console.log(`Average Rating (out of 5): ${reviewData.averageRating}`);
        console.log(`Review Count: ${reviewData.reviewCount}`);
        
        const result = {
            totalReviews: Number(reviewData.reviewCount),
            averageRating: Number(reviewData.averageRating)
        };
        return result;
    } catch (error) {
        console.error('Error fetching Booking reviews:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function agoda(url) {
    let browser;
    try {
        // Launch a new browser
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
          });
        const page = await browser.newPage();

        // Navigate to the page containing the reviews
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract total review count and average rating
        const totalReviews = await page.evaluate(() => {
            const reviewsElement = document.querySelector('.review-basedon .text a');
            return reviewsElement ? parseInt(reviewsElement.innerText.match(/\d+/)[0], 10) : null;
        });

        const averageRating = await page.evaluate(() => {
            const ratingElement = document.querySelector('.ReviewScore-Number');
            return ratingElement ? (parseFloat(ratingElement.innerText) / 2).toFixed(1) : null;
        });

        console.log(`Total Reviews: ${totalReviews}`);
        console.log(`Average Rating (out of 5): ${averageRating}`);

        const result = {
            totalReviews: totalReviews,
            averageRating: Number(averageRating)
        };
        return result;
    } catch (error) {
        console.error('Error fetching Agoda reviews:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function trustpilot(url) {
    let browser;
    try {
        // Launch a new browser
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
          });
        const page = await browser.newPage();

        // Navigate to the page containing the reviews
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('#business-unit-title');

        // Extract total review count and average rating
        const data = await page.evaluate(() => {
            const reviewCountElement = document.querySelector('.styles_clickable__zQWyh span');
            const ratingElement = document.querySelector('.styles_rating__NPyeH p');

            const totalReviews = reviewCountElement ? reviewCountElement.innerText.split('•')[0].trim() : null;
            const averageRating = ratingElement ? ratingElement.innerText : null;

            return {
                totalReviews,
                averageRating
            };
        });

        console.log(data);
        
        const result = {
            totalReviews: Number(data.totalReviews.split(",").join("")),
            averageRating: Number(data.averageRating)
        };
        return result;
    } catch (error) {
        console.error('Error fetching Trustpilot reviews:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function makemytrip(url) {
    let browser;
    try {
        // Launch a new browser
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
          });
        const page = await browser.newPage();

        // Navigate to the page containing the reviews
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.ovrlRating');

        // Extract the review count and average rating
        const result = await page.evaluate(() => {
            const averageRating = document.querySelector('.ovrlRating__rating')?.innerText.trim();
            const totalReviewsText = document.querySelector('.ovrlRating__subTitle')?.innerText.trim();

            let totalRatings = 0;
            let totalReviews = 0;

            const match = totalReviewsText.match(/(\d+)\s+Ratings,\s+(\d+)\s+Reviews/);
            if (match) {
                totalRatings = parseInt(match[1]);
                totalReviews = parseInt(match[2]);
            }

            return {
                averageRating: parseFloat(averageRating),
                totalReviews
            };
        });

        return result;
    } catch (error) {
        console.error('Error fetching MakeMyTrip reviews:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = {
    booking,makemytrip,agoda,trustpilot
}
