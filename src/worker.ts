import puppeteer from "@cloudflare/puppeteer";
import { Buffer } from 'node:buffer'

globalThis.Buffer = Buffer

interface Env {
  MYBROWSER: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    let img: ArrayBuffer | null = null;
    if (url) {
      url = new URL(url).toString(); // normalize
      const browser = await puppeteer.launch(env.MYBROWSER);
      const page = await browser.newPage();
      await page.goto(url);
      try {
        img = (await page.screenshot()) as ArrayBuffer;
      } catch (e) {
        console.error(e)
      } finally {
        await browser.close();
      }

      return new Response(img, {
        headers: {
          "content-type": "image/jpeg",
        },
      });

    } else {
      return new Response(
        "Please add an ?url=https://example.com/ parameter"
      );
    }
  },
};