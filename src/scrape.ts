import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

export const scrape = async (
  url: string,
  selector: string,
  browserEnv: BrowserWorker,
) => {
  let results: (string | null)[] = [];
  const browser = await puppeteer.launch(browserEnv);
  const page = await browser.newPage();
  await page.goto(url);

  try {
    // Wait for the results page to load and display the results.
    await Promise.race([
      page.waitForSelector(selector),
      new Promise((_, reject) =>
        setTimeout(
          reject,
          10000,
          `Timeout (10000ms) for searching "${selector}"`,
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
