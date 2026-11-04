import puppeteer from "puppeteer-core";
const CHROME = "/usr/bin/google-chrome";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const context = await browser.createBrowserContext();
const page = await context.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE ERR:", m.text()); });
page.on("pageerror", (e) => console.log("PAGE ERR:", e.message));
await page.goto("http://localhost:8090/en/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));

// Inspect the banner's React: does it have data? Check html attrs pre-click
console.log("pre-click data-consent-analytics:", await page.evaluate(() => document.documentElement.getAttribute("data-consent-analytics")));

await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Accept all");
  b.click();
});
await new Promise((r) => setTimeout(r, 600));
console.log("post-click data-consent-analytics:", await page.evaluate(() => document.documentElement.getAttribute("data-consent-analytics")));
console.log("banner in DOM after click:", await page.$(".cookie-banner") !== null);
console.log("banner height:", await page.$eval(".cookie-banner", (el) => el.getBoundingClientRect().height).catch(() => "gone"));
await context.close();
await browser.close();
