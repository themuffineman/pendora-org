import express from "express";
import puppeteer from "puppeteer";
import axios from 'axios'
import cheerio from 'cheerio'
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();
app.listen(8080, () => {
  console.log("Server running");
});
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/api/get-google-ads", async (req, res) => {
  const { url, timeframe } = req.body;
  console.log("Received request:", url);

  const gridSelector =
    "body > div:nth-child(9) > root > start-page > creative-grid > priority-creative-grid";
  const adCardSelector =
    "body > div:nth-child(9) > root > start-page > creative-grid > priority-creative-grid > creative-preview";
  const allAdsButton =
    "body > div:nth-child(9) > root > start-page > creative-grid > material-button > material-ripple";
  let browser;
  let page;
  for (let browserRetries = 0; browserRetries < 4; browserRetries++) {
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      // await page.setRequestInterception(true);
      // page.on('request', (request) => {
      //     if (request.resourceType() === 'image') {
      //         request.abort();
      //     } else {
      //         request.continue();
      //     }
      // })
      if (browser && page) {
        console.log("Browser and Page opended");
        break;
      } else {
        throw new Error("Browser Launch Fail, retrying... :", browserRetries);
      }
    } catch (error) {
      await page?.close();
      await browser?.close();
      console.log(error.message);
      if (browserRetries === 3) {
        return res.sendStatus(500);
      }
    }
  }
  try {
    await page.goto(
      `https://adstransparency.google.com/?region=US&domain=${url}&preset-date=${timeframe === "30"? 'Last+30+days' : 'Last+7+days'}`
    );
    try {
      await page.waitForSelector(gridSelector);
      console.log("Selector Found");
    } catch (error) {
      console.log("Grid selector not found");
      return res.sendStatus(404);
    }
    try {
      await page.waitForSelector(allAdsButton);
      await page.click(allAdsButton);
      console.log("Clicked Button");
      await new Promise((resolve, _) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
      try {
        let previousHeight;
        while (true) {
          previousHeight = await page.evaluate("document.body.scrollHeight");

          await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
          await new Promise((resolve, _) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          }); // Wait for content to load

          let newHeight = await page.evaluate("document.body.scrollHeight");

          if (newHeight === previousHeight) {
            break; // Exit the loop if no new content is loaded
          }
        }
      } catch (error) {
        console.log("Error in scroll loop", error.message);
      }
    } catch (error) {
      console.log("Unable to click button");
    }
    const adGrid = await page.$(gridSelector);
    if (!adGrid) {
      return res.json({ adImages: [] }).status(200);
    }
    console.log("Grid found");
    const adCards = await adGrid.$$(adCardSelector);
    const adImages = [];
    for (const card of adCards) {
      try {
        const adImage = await card.$("img");
        if (adImage) {
          const adImageSrc = await adImage
            .getProperty("src")
            .then((prop) => prop.jsonValue());
          console.log("Src found: ", adImageSrc);
          adImages.push(adImageSrc);
        }
      } catch (error) {
        console.log("Error processing an ad card:", error);
        continue;
      }
    }
    return res.status(200).json({ adImages });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return res.sendStatus(500);
  } finally {
    await page?.close();
    await browser?.close();
  }
});
app.post("/api/get-meta-ads", async (req, res) => {
  const { url } = req.body;
  console.log("Received Request: ", url);
  const gridSelector =
    "div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w";
  const adCardSelector =
    "div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div";
  const adImgSelector =
    "div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > a > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.x1277o0a > img";
  const adVideoSelector =
    "div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div.x14ju556.x1n2onr6 > div > div > div > div > div > div > video";
  let browser;
  let page;
  async function getPageId(username){
    try {
      // Fetch the HTML content of the page
      const pageUrl = `https://facebook.com/${username}`
      const { data } = await axios.get(pageUrl)
      
      // Load the HTML using cheerio
      const $ = cheerio.load(data);
  
      // Extract associated_page_id from the page source
      const htmlContent = $.html();
      const associatedPageIdRegex = /"associated_page_id":"(\d+)"/;
      const match = associatedPageIdRegex.exec(htmlContent);
      
      if (match && match[1]) {
        return match[1]; // Return the page ID
      } else {
        throw new Error('associated_page_id not found');
      }
    }catch(error) {
      console.error('Error fetching associated_page_id:', error.message)
    }
  }

  for (let browserRetries = 0; browserRetries < 4; browserRetries++) {
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      if (browser && page) {
        console.log("Browser and Page opended");
        break;
      } else {
        throw new Error("Browser Launch Fail, retrying... :", browserRetries);
      }
    } catch (error) {
      await page?.close();
      await browser?.close();
      console.log(error.message);
      if (browserRetries === 3) {
        return res.sendStatus(500);
      }
    }
  }

  try {
    const pageId = await getPageId(url)
    await page.goto(
      `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=all&search_type=page&view_all_page_id=${pageId}`
    )
    try {
      await page.waitForSelector(gridSelector);
      console.log("Grid found");
    } catch (error) {
      console.log("Grid not found");
    }
    try {
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate("document.body.scrollHeight");

        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await new Promise((resolve, _) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        }); // Wait for content to load

        let newHeight = await page.evaluate("document.body.scrollHeight");

        if (newHeight === previousHeight) {
          break; // Exit the loop if no new content is loaded
        }
      }
    } catch (error) {
      console.log("Error in scroll loop", error.message);
    }
    const adGrids = await page.$$(gridSelector);
    console.log("we have: ", adGrids.length, "grids");
    if (!adGrids) {
      return res.json({ adImages: [] }).status(200);
    }
    const adImages = [];
    const adVideos = [];
    for (const grid of adGrids) {
      const adCards = await grid.$$(adCardSelector);
      console.log("Ad cards length: ", adCards.length);

      for (const card of adCards) {
        try {
          const adImage = await card.$(adImgSelector);
          if (adImage) {
            const adImageSrc = await adImage
              .getProperty("src")
              .then((prop) => prop.jsonValue());
            adImages.push(adImageSrc);
          }
          const adVideo = await card.$(adVideoSelector);
          if (adVideo) {
            const adVideoSrc = await adVideo
              .getProperty("src")
              .then((prop) => prop.jsonValue());
            adVideos.push(adVideoSrc);
          }
        } catch (error) {
          console.log("Error processing an ad card:", error);
          continue;
        }
      }
    }
    console.log("Content: ", { adImages, adVideos })
    return res.status(200).json({ adImages, adVideos });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  } finally {
    await page?.close();
    await browser?.close();
  }
});
