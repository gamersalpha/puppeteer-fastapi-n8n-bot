const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

app.post('/script', async (req, res) => {
    const { url, script } = req.body;
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-gpu']
        });
        const page = await browser.newPage();
        await page.goto(url);
        if (script) {
            await page.evaluate(script);
        }
        const html = await page.content();
        await browser.close();
        res.send({ html });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.post('/screenshot', async (req, res) => {
    const { url, fullPage = false, selector, clip } = req.body;

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-gpu']
        });
        const page = await browser.newPage();
        await page.goto(url);

        let screenshotOptions = { encoding: 'base64' };

        if (fullPage) {
            screenshotOptions.fullPage = true;
        } else if (clip) {
            screenshotOptions.clip = clip;
        } else if (selector) {
            const element = await page.$(selector);
            if (!element) throw new Error("Selector not found: " + selector);
            screenshotOptions.clip = await element.boundingBox();
        }

        const screenshot = await page.screenshot(screenshotOptions);
        await browser.close();
        res.send({ screenshot });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});