import { jsx } from "hono/jsx";

const sites = [
  { value: "https://www.yahoo.co.jp/", label: "yahoo.co.jp" },
  { value: "https://example.com/", label: "example.com" },
  { value: "https://news.ycombinator.com/", label: "news.ycombinator.com" },
  { value: "https://blog.cloudflare.com/", label: "blog.cloudflare.com" },
];

const devices = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];

export const ScreenshotPage = ({
  url,
  device,
  image,
}: {
  url: string | null;
  device: string | null;
  image?: { base64Data: string; mimeType: string };
}) => {
  return (
    <html>
      <body>
        <form method="GET">
          <select name="url" style={{ fontSize: "large", padding: 4 }}>
            <option value="">select site</option>
            {sites.map((site) => (
              <option value={site.value} selected={site.value === url}>
                {site.label}
              </option>
            ))}
          </select>
          <select name="device" style={{ fontSize: "large", padding: 4 }}>
            {devices.map((site) => (
              <option value={site.value} selected={site.value === device}>
                {site.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{ fontSize: "large", padding: 4, marginLeft: 4 }}
          >
            Capture!
          </button>
        </form>
        {image && (
          <img
            src={`data:${image.mimeType};base64,${image.base64Data}`}
            alt={url}
          />
        )}
      </body>
    </html>
  );
};
