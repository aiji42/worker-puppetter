import puppeteer, { type BrowserWorker } from "@cloudflare/puppeteer";

export const pdf = async (url: string, browserEnv: BrowserWorker | string) => {
  let file: Buffer | null = null;
  const browser = await (typeof browserEnv === "string"
    ? puppeteer.connect({ browserWSEndpoint: browserEnv })
    : puppeteer.launch(browserEnv));
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
