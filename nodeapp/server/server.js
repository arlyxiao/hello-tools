import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { ImagePool } from '@squoosh/lib';
import { writeFileSync } from 'fs';

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

app.get("/html-to-image", async (req, res) => {
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

    const prefixPath = './public/static/temp';
    const filename = `${req.session.id}_${Date.now()}.png`;
    const fullpath = `${prefixPath}/${filename}`;
    const dataBuffer = await page.screenshot({
      path: fullpath,
      fullPage: true,
    });
    await browser.close();

    const imagePool = new ImagePool();
    const image = imagePool.ingestImage(fullpath);
    await image.encode({
      mozjpeg: {
      }
    });
    const { binary } = await image.encodedWith.mozjpeg;
    await writeFileSync(fullpath, binary);
    await imagePool.close();

    res.json({
      path: `/static/temp/${filename}`
    });
    res.end();
  } catch (execption) {
    console.log(execption.message);
    // res.send(execption.message)
  }
});

app.listen(4500);
