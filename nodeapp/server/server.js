const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

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
      path: `./temp/${req.session.id}_${Date.now()}.pdf`,
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
      args: ['--no-sandbox', '--disable-setuid-sandbox']
   })
    const page = await browser.newPage();
    await page.goto(req.query.url, {
      waitUntil: "networkidle2",
    });
    const dataBuffer = await page.screenshot({
      path: `./temp/${req.session.id}_${Date.now()}.png`,
      fullPage: true,
    });

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": dataBuffer.length,
    });
    res.end(dataBuffer);

    await browser.close();
  } catch (execption) {
    console.log(execption.message);
    // res.send(execption.message)
  }
});

app.listen(4500);
