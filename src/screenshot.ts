import puppeteer, { type BrowserWorker, devices } from "@cloudflare/puppeteer";

export const screenshot = async (
  url: string,
  device: string,
  browserEnv: BrowserWorker | string,
) => {
  let img: Buffer | null = null;
  const browser = await (typeof browserEnv === "string"
    ? puppeteer.connect({ browserWSEndpoint: browserEnv })
    : puppeteer.launch(browserEnv));
  const page = await browser.newPage();
  if (device === "mobile") {
    await page.emulate(devices["iPhone X"]);
  } else {
    await page.setViewport({
      width: 1366,
      height: 768,
    });
  }

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
