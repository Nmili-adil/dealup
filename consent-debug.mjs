import puppeteer from "puppeteer-core";
const CHROME = "/usr/bin/google-chrome";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const context = await browser.createBrowserContext();
const page = await context.newPage();
await page.goto("http://localhost:8090/en/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));

console.log("before click, banner exists:", await page.$(".cookie-banner") !== null);

await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")];
  const b = btns.find((x) => x.textContent.trim() === "Accept all");
  b.click();
});
await new Promise((r) => setTimeout(r, 500));
console.log("after click, banner exists:", await page.$(".cookie-banner") !== null);
console.log("cookie:", await page.evaluate(() => document.cookie));
await context.close();
await browser.close();
