import express from 'express'
import puppeteer from 'puppeteer'
import cors from 'cors'

const app = express()
app.listen(8080, ()=>{
    console.log('Server running')
})
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
        } catch (error) {
            await page?.close()
            await browser?.close()
            if(browserRetries === 3){
                return res.sendStatus(500)
            }
        }
    }
    try{
        await page.goto(`https://adstransparency.google.com/?region=US&domain=${url}&preset-date=Last+30+days`)
        try {
            await page.waitForSelector(gridSelector);
            console.log('Selector Found')
        } catch (error) {
            console.log('Grid selector not found');
            return res.sendStatus(404);
        }
        try{
            await page.waitForSelector(allAdsButton)
            await page.click(allAdsButton)
            console.log('Clicked Button')
        }catch(error){
            console.log('Unable to click button')
        }
        try{
            await page.waitForResponse(response =>
                response.url().includes('https://displayads-formats.googleusercontent.com/ads/preview/content.js') && response.status() === 200
            );
            console.log('Response complete')
        }catch(error){
            console.log('Error waiting for response')
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
            } catch (error) {
                console.log('Error processing an ad card:', error);
                continue;
            }
        }
        return res.status(200).json({ adImages });
    } catch (error) {
        console.error('Error fetching ads:', error);
        return res.sendStatus(500);
    }
})