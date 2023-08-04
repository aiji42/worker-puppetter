import type { BrowserWorker } from "@cloudflare/puppeteer";
import { Hono } from "hono";
import { Buffer } from "node:buffer";
import { screenshot } from "./screenshot";
import { scrape } from "./scrape";
import { pdf } from "./pdf";
import { jsx } from "hono/jsx";
import { ScreenshotPage } from "./pages/screenshot-page";

globalThis.Buffer = Buffer;

interface Env {
  Bindings: {
    MYBROWSER: BrowserWorker;
    BROWSERLESS: string | undefined;
  };
}

const app = new Hono<Env>();

app.get("/", async (c) => {
  const url = c.req.query("url");
  const device = c.req.query("device");
  if (!url) {
    return c.html(<ScreenshotPage url={null} device={device ?? null} />);
  }

  const img = await screenshot(
    url,
    device ?? "desktop",
    "webp",
    c.env.BROWSERLESS || c.env.MYBROWSER,
  );

  return c.html(
    <ScreenshotPage
      url={url}
      device={device ?? null}
      image={{ base64Data: img.toString("base64"), mimeType: "image/webp" }}
    />,
  );
});

app.get("/pdf", async (c) => {
  const url = c.req.query("url");
  const device = c.req.query("device");
  if (!url) {
    return c.text("Please add an ?url=https://example.com/ parameter");
  }
  const file = await pdf(
    url,
    device ?? "desktop",
    c.env.BROWSERLESS || c.env.MYBROWSER,
  );

  if (!file) return c.status(500);
  else c.header("Content-Type", "application/pdf");

  return c.body(file);
});

app.get("/scrape", async (c) => {
  const url = c.req.query("url");
  const device = c.req.query("device");
  const selector = c.req.query("selector");
  if (!url || !selector) {
    return c.text(
      "Please add an ?url=https://example.com/&selector=p parameter",
    );
  }
  const results = await scrape(
    url,
    device ?? "desktop",
    selector,
    c.env.BROWSERLESS || c.env.MYBROWSER,
  );

  return c.json(results);
});

export default app;
