import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("http://localhost:8090/en/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 900));
console.log("pre-click data-decided:", await page.$eval(".cookie-banner", (el) => el.getAttribute("data-decided")).catch(()=>"gone"));
await page.evaluate(() => {
  [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Accept all").click();
});
await new Promise((r) => setTimeout(r, 700));
console.log("post-click exists:", await page.$(".cookie-banner") !== null);
console.log("post-click data-decided:", await page.$eval(".cookie-banner", (el) => el.getAttribute("data-decided")).catch(()=>"gone"));
await browser.close();
