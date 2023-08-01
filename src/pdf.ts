import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

export const pdf = async (url: string, browserEnv: BrowserWorker) => {
  let file: Buffer | null = null;
  const browser = await puppeteer.launch(browserEnv);
  const page = await browser.newPage();
  await page.goto(url);

  try {
    file = (await page.pdf()) as Buffer;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await browser.close();
  }

  return file;
};
