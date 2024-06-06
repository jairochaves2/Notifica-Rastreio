import dotenv from "dotenv";
dotenv.config();
import puppeteer from "puppeteer";
import { sendMessage } from "./telegram.js";
import { MessageHash } from "./messageHash.js";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true, dumpio: true });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://radar.tntbrasil.com.br/radar/public/eventoNotaFiscalCliente/72381189001001/702080367.do"
  );

  //   // Set screen size
  await page.setViewport({ width: 1920, height: 1080 });
  const data = await page.evaluate(() => {
    let tables = document.querySelectorAll("table");
    tables = Array.from(tables);
    let itemsArray = [];

    tables.forEach((table, index) => {
      const rows1 = table.querySelectorAll("tr");
      rows1.forEach((table) => {
        const columns = table.querySelectorAll("td");

        const item = Array.from(columns).map((column) => {
          return column.textContent.trim();
        });

        if (index > 0) {
          item.forEach((text, index) => {
            const isDivisibleByTree = (index + 1) % 3 === 0;
            const isFirst = index === 0;

            isFirst && itemsArray.push("\n");
            text.length && itemsArray.push(text);

            if (isDivisibleByTree) {
              itemsArray.push("\n");
            }
          });
        } else {
          const text = item.join(" ");
          text.length && itemsArray.push(text);
        }
      });
    });

    return itemsArray;
  });

  const message = data.join("\n");
  const { isEqual } = await MessageHash.checkHash(message);

  if (!isEqual) {
    await sendMessage(message);
  }
  await MessageHash.close();
  await browser.close();
})();
