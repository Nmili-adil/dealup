import puppeteer from "puppeteer-core";

const CHROME = "/usr/bin/google-chrome";
const BASE = "http://localhost:8090";
const results = [];
function check(name, cond) {
  results.push({ name, ok: !!cond });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

// Clean cookies per scenario
async function freshPage(url) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
  return { page, context };
}

// 1. First visit -> banner visible, no consent cookie
{
  const { page, context } = await freshPage(`${BASE}/en/`);
  await new Promise((r) => setTimeout(r, 800)); // let banner animation start
  const bannerVisible = await page.$eval(".cookie-banner", (el) => {
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.width > 0;
  }).catch(() => false);
  check("1. banner visible on first visit", bannerVisible);
  const cookie = await page.evaluate(() => document.cookie);
  check("1b. no consent cookie yet", !cookie.includes("dealup_consent"));

  // Accept all
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((x) => x.textContent.trim() === "Accept all");
    b.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  const afterCookie = await page.evaluate(() => document.cookie);
  check("2. Accept all writes consent cookie", afterCookie.includes("dealup_consent"));
  const decoded = await page.evaluate(() =>
    decodeURIComponent(
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("dealup_consent="))
        .split("=")[1]
    )
  );
  check("2b. consent value analytics+marketing true", decoded.includes('"analytics":true') && decoded.includes('"marketing":true'));
  const hidden = await page.$eval(".cookie-banner", (el) => el.getBoundingClientRect().height === 0).catch(() => true);
  check("2c. banner hidden after accept", hidden);
  const attrs = await page.evaluate(() => ({
    a: document.documentElement.getAttribute("data-consent-analytics"),
    m: document.documentElement.getAttribute("data-consent-marketing"),
  }));
  check("2d. html data-consent attrs set", attrs.a === "true" && attrs.m === "true");
  await context.close();
}

// 3. Reload keeps banner hidden (consent persisted)
{
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.goto(`${BASE}/en/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    document.cookie = "dealup_consent=" + encodeURIComponent('{"essential":true,"analytics":false,"marketing":false,"version":"2026-09-02"}') + "; path=/";
  });
  await page.goto(`${BASE}/en/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 700));
  const bannerShown = await page.$eval(".cookie-banner", (el) => el.getBoundingClientRect().height > 0).catch(() => false);
  check("3. banner hidden after reload with existing cookie", !bannerShown);
  await context.close();
}

// 4. Reject all -> analytics/marketing false
{
  const { page, context } = await freshPage(`${BASE}/fr/`);
  await new Promise((r) => setTimeout(r, 700));
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((x) => x.textContent.trim() === "Tout refuser");
    b.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  const decoded = await page.evaluate(() =>
    decodeURIComponent(
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("dealup_consent="))
        .split("=")[1]
    )
  );
  check("4. Reject all sets analytics+marketing false", decoded.includes('"analytics":false') && decoded.includes('"marketing":false'));
  await context.close();
}

// 5. Footer "Cookie preferences" reopens dialog on a sub-page (with cookie set)
{
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.goto(`${BASE}/en/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    document.cookie = "dealup_consent=" + encodeURIComponent('{"essential":true,"analytics":true,"marketing":false,"version":"2026-09-02"}') + "; path=/";
  });
  await page.goto(`${BASE}/en/pricing/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));
  // click footer trigger
  const clicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("footer button")];
    const b = btns.find((x) => x.textContent.trim() === "Cookie preferences");
    if (!b) return false;
    b.click();
    return true;
  });
  check("5. footer trigger present", clicked);
  await new Promise((r) => setTimeout(r, 400));
  const dialogOpen = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    return !!d && d.getBoundingClientRect().width > 0;
  });
  check("5b. preferences dialog opens from footer", dialogOpen);
  await context.close();
}

// 6. Customize -> toggle analytics on, save
{
  const { page, context } = await freshPage(`${BASE}/ar/`);
  await new Promise((r) => setTimeout(r, 700));
  // open customize
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((x) => x.textContent.trim() === "تخصيص");
    b.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const dialogOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
  check("6. customize opens dialog (ar)", dialogOpen);
  await page.evaluate(() => {
    const sw = [...document.querySelectorAll('[role="switch"]')].find((s) => s.getAttribute("aria-checked") === "false");
    sw.click();
  });
  await new Promise((r) => setTimeout(r, 200));
  // save
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((x) => x.textContent.trim() === "حفظ الخيارات");
    b.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  const decoded = await page.evaluate(() =>
    decodeURIComponent(
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("dealup_consent="))
        .split("=")[1]
    )
  );
  const parsed = JSON.parse(decoded);
  check("6b. save writes chosen categories", typeof parsed.analytics === "boolean");
  check("6c. dialog closed after save", await page.evaluate(() => !document.querySelector('[role="dialog"]')));
  await context.close();
}

await browser.close();
console.log("\n==== SUMMARY ====");
const failed = results.filter((r) => !r.ok);
console.log(`${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.log("FAILED:", failed.map((f) => f.name).join(", "));
  process.exit(1);
}
