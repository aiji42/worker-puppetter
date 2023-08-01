import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

export const screenshot = async (url: string, browserEnv: BrowserWorker) => {
  let img: Buffer | null = null;
  const browser = await puppeteer.launch(browserEnv);
  const page = await browser.newPage();
  await page.goto(url);

  try {
    img = (await page.screenshot()) as Buffer;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }

  return img;
};
