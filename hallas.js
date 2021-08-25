const puppeteer = require("puppeteer");

(async () => {
  let allProducts = [];
  const url = "https://shop.hallasband.com/products";
  const selector =
    "#products-page > div.wrap > main > ul > li > a > div.product_name";
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const page1 = await page.$$eval(selector, (prod) =>
      prod.map((prod) => prod.innerText)
    );

    await page.goto(`${url}?page=2`);
    const page2 = await page.$$eval(selector, (prod) =>
      prod.map((prod) => prod.innerText)
    );

    await page.goto(`${url}?page=3`);
    const page3 = await page.$$eval(selector, (prod) =>
      prod.map((prod) => prod.innerText)
    );

    await page.goto(`${url}?page=4`);
    const page4 = await page.$$eval(selector, (prod) =>
      prod.map((prod) => prod.innerText)
    );

    allProducts = [...page1, ...page2, ...page3, ...page4];
    allProducts.forEach((product) => {
      console.log(`→ ${product}`);
    });
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
