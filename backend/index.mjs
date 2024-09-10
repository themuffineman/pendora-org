import express from 'express'
import axios from 'axios'
import puppeteer from 'puppeteer'
import cors from 'cors'
import {config} from 'dotenv'
config()
const app = express()
app.listen(8080, ()=>{
    console.log('Server running')
})
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.post('/api/get-google-ads', async (req,res)=>{
    const {url} = req.body
    console.log('Received request:', url)

    const gridSelector = 'body > div:nth-child(9) > root > start-page > creative-grid > priority-creative-grid'
    const adCardSelector = 'body > div:nth-child(9) > root > start-page > creative-grid > priority-creative-grid > creative-preview'
    const allAdsButton = 'body > div:nth-child(9) > root > start-page > creative-grid > material-button > material-ripple'
    let browser
    let page
    for(let browserRetries = 0; browserRetries < 4; browserRetries++){
        try {
            browser = await puppeteer.launch()
            page = await browser.newPage();
            // await page.setRequestInterception(true);  
            // page.on('request', (request) => {  
            //     if (request.resourceType() === 'image') {  
            //         request.abort(); 
            //     } else {  
            //         request.continue();  
            //     }
            // })
            if(browser && page){
                console.log('Browser and Page opended')
                break
            }else{
                throw new Error('Browser Launch Fail, retrying... :', browserRetries)
            }
        }catch(error){
            await page?.close()
            await browser?.close()
            console.log(error.message)
            if(browserRetries === 3){
                return res.sendStatus(500)
            }
        }
    }
    try{
        await page.goto(`https://adstransparency.google.com/?region=US&domain=${url}&preset-date=Last+30+days`)
        try{
            await page.waitForSelector(gridSelector);
            console.log('Selector Found')
        }catch(error) {
            console.log('Grid selector not found');
            return res.sendStatus(404);
        }
        try{
            await page.waitForSelector(allAdsButton)
            await page.click(allAdsButton)
            console.log('Clicked Button')
            await new Promise((resolve, _)=>{
                setTimeout(()=>{
                    resolve()
                }, 5000)
            })
        }catch(error){
            console.log('Unable to click button')
        }
        const adGrid = await page.$(gridSelector);
        if (!adGrid) {
            return res.json({ adImages: [] }).status(200)
        }
        console.log('Grid found')
        const adCards = await adGrid.$$(adCardSelector);
        const adImages = [];
        for(const card of adCards){
            try {
                const adImage = await card.$('img');
                if (adImage) {
                    const adImageSrc = await adImage.getProperty('src').then(prop => prop.jsonValue());
                    console.log('Src found: ',adImageSrc)
                    adImages.push(adImageSrc);
                }
            }catch(error){
                console.log('Error processing an ad card:', error)
                continue
            }
        }
        return res.status(200).json({ adImages });
    } catch (error) {
        console.error('Error fetching ads:', error);
        return res.sendStatus(500);
    }finally{
        await page?.close()
        await browser?.close()
    }
})
app.post('/api/get-meta-ads', async (req, res)=>{
    const {username} = req.body
    console.log('Received Request: ', username)
    const gridSelector = 'div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div:nth-child(2) > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w'
    const adCardSelector = 'div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div:nth-child(2) > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div'
    const adImgSelector = 'div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div:nth-child(2) > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(3) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.x1277o0a > img'
    const adVideoSelector = 'div.x12peec7.x1dr59a3.x1kgmq87.x1ja2u2z > div > div > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div:nth-child(2) > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div:nth-child(2) > div > div.xh8yej3 > div > div > div.x6ikm8r.x10wlt62 > div.x14ju556.x1n2onr6 > div > div > div > div > div > div > video'
    let browser
    let page

    for(let browserRetries = 0; browserRetries < 4; browserRetries++){
        try {
            browser = await puppeteer.launch()
            page = await browser.newPage();
            if(browser && page){
                console.log('Browser and Page opended')
                break
            }else{
                throw new Error('Browser Launch Fail, retrying... :', browserRetries)
            }
        }catch(error){
            await page?.close()
            await browser?.close()
            console.log(error.message)
            if(browserRetries === 3){
                return res.sendStatus(500)
            }
        }
    }

    try{
        await page.goto(`https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&media_type=all&q=${username}&search_type=keyword_unordered`)
        try {
            await page.waitForSelector(gridSelector)
            console.log('Grid found')
        } catch (error) {
            console.log('Grid not found')
        }
        const adGrid = await page.$(gridSelector)
        if (!adGrid) {
            return res.json({ adImages: [] }).status(200)
        }
        const adCards = await adGrid.$$(adCardSelector)
        const adImages = []
        const adVideos = []

        for(const card of adCards){
            try {
                const adImage = await card.$(adImgSelector);
                if (adImage) {
                    const adImageSrc = await adImage.getProperty('src').then(prop => prop.jsonValue());
                    console.log('Src found: ',adImageSrc)
                    adImages.push(adImageSrc);
                }
                const adVideo = await card.$(adVideoSelector);
                if (adVideo) {
                    const adVideoSrc = await adVideo.getProperty('src').then(prop => prop.jsonValue());
                    console.log('Src found: ',adVideoSrc)
                    adVideos.push(adVideoSrc);
                }
            }catch(error){
                console.log('Error processing an ad card:', error)
                continue
            }
        }
        return res.status(200).json({ adImages, adVideos })
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500)
    }finally{
        await page?.close()
        await browser?.close()
    }
})
