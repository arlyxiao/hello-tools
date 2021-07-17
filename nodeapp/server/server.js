import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { ImagePool } from '@squoosh/lib';
import { writeFileSync } from 'fs';

const imagePool = new ImagePool();
const app = express();

app.use(cors());
app.use(express.static("public"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "puppeteer",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.get("/html-to-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
   })
    const page = await browser.newPage();
    await page.goto(req.query.url, {
      waitUntil: "networkidle2",
    });
    const dataBuffer = await page.pdf({
      path: `./public/static/temp/${req.session.id}_${Date.now()}.pdf`,
      format: "letter",
    });

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": dataBuffer.length,
    });
    res.end(dataBuffer);

    await browser.close();
  } catch (execption) {
    console.log(execption.message);
    // res.send(execption.message)
  }
});

app.get("/html-to-png", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
   })
    const page = await browser.newPage();
    await page.goto(req.query.url, {
      waitUntil: "networkidle2",
    });

    const pageWidth = 1440
    const viewportHeight = 800

    await page.setViewport({
      width: pageWidth,
      height: viewportHeight
    });

    const filename = `${req.session.id}_${Date.now()}.png`;
    const fullpath = `./public/static/temp/${filename}`;
    const dataBuffer = await page.screenshot({
      path: fullpath,
      fullPage: true,
    });
    await browser.close();

    const image = imagePool.ingestImage(dataBuffer);
    const resultName = `${req.session.id}_${Date.now()}_1.png`;
    const resultPath = `./public/static/temp/${resultName}`;

    await image.encode({
      mozjpeg: {
      }
    });
    const { binary } = await image.encodedWith.mozjpeg;
    await writeFileSync(resultPath, binary);
    await imagePool.close();

    res.json({
      url: `/static/temp/${resultName}`
    });
    res.end();
  } catch (execption) {
    console.log(execption.message);
    // res.send(execption.message)
  }
});

app.listen(4500);
