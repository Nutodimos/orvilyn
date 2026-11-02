import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Orvilyn | Websites, apps, and tools for your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = join(process.cwd(), "public", "brand", "logo-mark.png");
  const logoBuffer = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FF6A13",
          padding: "64px 72px",
          color: "#1F1B16",
        }}
      >
        {/* Top-left brand mark and name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Orvilyn Logo"
            width="56"
            height="56"
            style={{
              width: "56px",
              height: "56px",
            }}
          />
          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#1F1B16",
            }}
          >
            Orvilyn
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#1F1B16",
              maxWidth: "1020px",
            }}
          >
            {"You've got a business. We'll handle the tech."}
          </div>
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#1F1B16",
            maxWidth: "960px",
          }}
        >
          {"Websites, apps, and tools that work, with motion that makes them feel alive."}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
