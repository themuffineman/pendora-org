import express from "express";
import puppeteer from "puppeteer";
import { WebSocketServer } from 'ws';
import cors from "cors";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
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
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const wss = new WebSocketServer({ port: 4040 });
const clients = new Map();
function broadcastMessage(userId, message) {
  const client = clients.get(userId);

  // Check if the client is connected and open
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(message);
  } else {
    console.log(`Client with ID ${userId} is not connected.`);
  }
}
wss.on("connection", (ws) => {
  // Assign a unique ID to the connected client
  const userId = uuidv4();
  ws.userId = userId;

  // Store the WebSocket connection in the clients map
  clients.set(userId, ws);
  console.log(`Client connected with ID: ${userId}`);

  // Send a welcome message to the new client
  ws.send({ type: "id", message: userId });

  // Handle WebSocket disconnections
  ws.on("close", () => {
    console.log(`Client with ID ${userId} disconnected`);
    // Remove the client from the map on disconnect
    clients.delete(userId);
  });
});

function checkApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }
  next();
}
// app.use(checkApiKey);
app.post("/api/get-google-ads", async (req, res) => {
  const { url } = req.body;
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
      browser = await puppeteer.launch({
        protocolTimeout: 240000,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (request.resourceType() === "image") {
          request.abort();
        } else {
          request.continue();
        }
      });
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
    page.setDefaultTimeout(150000);
    await page.goto(
      `https://adstransparency.google.com/?region=US&domain=${url}&preset-date=Last+30+days`
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
        for (let count = 0; count < 5; count++) {
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
    let cardsCount = 0;
    const adCards = await adGrid.$$(adCardSelector);
    const adImages = [];
    for (const card of adCards) {
      if (cardsCount > 10) {
        break;
      }
      try {
        const adImage = await card.$("img");
        if (adImage) {
          const adImageSrc = await adImage
            .getProperty("src")
            .then((prop) => prop.jsonValue());
          broadcastMessage({ type: "imageAd", message: adImageSrc });
          cardsCount++;
        }
      } catch (error) {
        console.log("Error processing an ad card:", error.message);
        continue;
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error fetching ads:", error.message);
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
  async function getPageId(username, page) {
    try {
      // Fetch the HTML content of the page
      const pageUrl = `https://facebook.com/${username}`;
      await page.goto(pageUrl);
      const pageSource = await page.content();
      const associatedPageIdRegex = /"associated_page_id":"(\d+)"/;
      const match = associatedPageIdRegex.exec(pageSource);
      if (match && match[1]) {
        return match[1]; // Return the page ID
      } else {
        throw new Error("associated_page_id not found");
      }
    } catch (error) {
      console.error("Error fetching associated_page_id:", error.message);
    }
  }

  for (let browserRetries = 0; browserRetries < 4; browserRetries++) {
    try {
      browser = await puppeteer.launch({
        protocolTimeout: 240000,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (request.resourceType() === "image") {
          request.abort();
        } else {
          request.continue();
        }
      });
      if (browser && page) {
        console.log("Browser and Page opended");
        break;
      } else {
        throw new Error("Browser Launch Fail, retrying... :", browserRetries);
      }
    } catch (error) {
      await page?.close();
      await browser?.close();
      console.log("Browser launch error: ", error.message);
      if (browserRetries === 3) {
        return res.sendStatus(500);
      }
    }
  }

  try {
    page.setDefaultTimeout(150000);
    const pageId = await getPageId(url, page);
    if (!pageId) {
      return res.sendStatus(404);
    }
    await page.goto(
      `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=all&search_type=page&view_all_page_id=${pageId}`
    );
    try {
      await page.waitForSelector(gridSelector);
      console.log("Grid found");
    } catch (error) {
      console.log("Grid not found");
    }
    try {
      let previousHeight;
      for (let count = 0; count < 7; count++) {
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
    let cardsCount = 0;
    for (const grid of adGrids) {
      if (cardsCount > 10) {
        break;
      }
      const adCards = await grid.$$(adCardSelector);
      console.log("Ad cards length: ", adCards.length);

      for (const card of adCards) {
        try {
          const adImage = await card.$(adImgSelector);
          if (adImage) {
            const adImageSrc = await adImage
              .getProperty("src")
              .then((prop) => prop.jsonValue());
            broadcastMessage({ type: "imageAd", message: adImageSrc });
            cardsCount++;
          }
          const adVideo = await card.$(adVideoSelector);
          if (adVideo) {
            const adVideoSrc = await adVideo
              .getProperty("src")
              .then((prop) => prop.jsonValue());
            broadcastMessage({ type: "videoAd", message: adVideoSrc });
            cardsCount++;
          }
        } catch (error) {
          console.log("Error processing an ad card:", error.message);
          continue;
        }
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  } finally {
    await page?.close();
    await browser?.close();
  }
});
