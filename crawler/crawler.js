const puppeteer = require("puppeteer");
const sheets = require("./sheets");

const getGooglePlayData = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const selectors = {
      logo: 'img[alt="Cover art"]',
      screenshots: 'img[alt="Screenshot Image"]',
      rating: ".BHMmbe",
    };
    const screenshots = Array.from(
      document.querySelectorAll(selectors.screenshots)
    ).map((e) => e.src);
    const logo = document.querySelector(selectors.logo).src;
    const rating = document.querySelector(selectors.rating).innerText;

    return {
      screenshots,
      logo,
      rating,
    };
  });

  return data;
};

const getAppleData = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const selectors = {
      logo: ".product-hero__media img",
      screenshots: ".we-artwork--screenshot-orientation-portrait img",
      rating: ".we-customer-ratings__averages__display",
    };

    const screenshots = Array.from(
      document.querySelectorAll(selectors.screenshots)
    ).map((e) => e.src);
    const logo = document.querySelector(selectors.logo).src;
    const rating = document.querySelector(selectors.rating).innerText;

    return {
      screenshots,
      logo,
      rating,
    };
  });

  return data;
};

(async () => {
  const browser = await puppeteer.launch();
  const appList = await sheets.getAppsList();

  let index = 0;
  for (const row of appList) {
    const { googleurl, appleurl } = row;
    const data = {};
    if (googleurl) {
      data["google"] = await getGooglePlayData(browser, googleurl);
    }
    if (appleurl) {
      data["apple"] = await getAppleData(browser, appleurl);
    }

    //await sheets.saveFile(JSON.stringify(data), "./data/" + name + ".json");
    appList[index]["google"] = data["google"];
    appList[index]["apple"] = data["apple"];

    index++;
  }

  await browser.close();

  await sheets.saveFile(
    JSON.stringify(sheets.formatList(appList)),
    "./data/list.json"
  );
})();
