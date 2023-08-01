import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

export const scrape = async (
  url: string,
  selector: string,
  browserEnv: BrowserWorker | string,
) => {
  let results: (string | null)[] = [];
  const browser = await (typeof browserEnv === "string"
    ? puppeteer.connect({ browserWSEndpoint: browserEnv })
    : puppeteer.launch(browserEnv));
  const page = await browser.newPage();
  await page.goto(url);

  try {
    // Wait for the results page to load and display the results.
    await Promise.race([
      page.waitForSelector(selector),
      new Promise((_, reject) =>
        setTimeout(
          reject,
          30000,
          `Timeout (30000ms) for searching "${selector}"`,
        ),
      ),
    ]);

    results = await page.evaluate((resultsSelector) => {
      const elements = Array.from(document.querySelectorAll(resultsSelector));
      return elements.map((el) => el.textContent);
    }, selector);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }

  return results;
};
