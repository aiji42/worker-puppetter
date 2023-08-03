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
  imageBase64,
}: {
  url: string | null;
  device: string | null;
  imageBase64?: string;
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
        {imageBase64 && (
          <img src={`data:image/jpg;base64,${imageBase64}`} alt={url} />
        )}
      </body>
    </html>
  );
};
