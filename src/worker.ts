import { Hono } from "hono";
import { Buffer } from "node:buffer";
import { screenshot } from "./screenshot";
import type { BrowserWorker } from "@cloudflare/puppeteer";
import { scrape } from "./scrape";

globalThis.Buffer = Buffer;

interface Env {
  Bindings: {
    MYBROWSER: BrowserWorker;
  };
}

const app = new Hono<Env>();

app.get("/screenshot", async (c) => {
  const url = c.req.query("url");
  if (!url) {
    return c.text("Please add an ?url=https://example.com/ parameter");
  }
  const img = await screenshot(url, c.env.MYBROWSER);

  if (!img) return c.status(500);
  else c.header("Content-Type", "image/jpg");

  return c.body(img);
});

app.get("/scrape", async (c) => {
  const url = c.req.query("url");
  const selector = c.req.query("selector");
  if (!url || !selector) {
    return c.text(
      "Please add an ?url=https://example.com/&selector=p parameter",
    );
  }
  const results = await scrape(url, selector, c.env.MYBROWSER);

  return c.json(results);
});

export default app;
