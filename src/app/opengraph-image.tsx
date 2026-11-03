import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Orvilyn | Websites, apps, and tools for your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logoBuffer, fontJakartaBuffer, fontDmBuffer] = await Promise.all([
    readFile(join(process.cwd(), "public", "brand", "logo-mark.png")),
    readFile(
      join(process.cwd(), "src", "assets", "fonts", "PlusJakartaSans-Bold.woff")
    ),
    readFile(
      join(process.cwd(), "src", "assets", "fonts", "DMSans-Medium.woff")
    ),
  ]);

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
          backgroundColor: "#FFFAF3",
          padding: "72px 80px",
          color: "#1F1B16",
          fontFamily: "DM Sans",
        }}
      >
        {/* Top-left brand mark and name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Orvilyn Logo"
            width="64"
            height="64"
            style={{
              width: "64px",
              height: "64px",
            }}
          />
          <span
            style={{
              fontSize: "38px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#1F1B16",
              fontFamily: "Plus Jakarta Sans",
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
              fontSize: "66px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              color: "#1F1B16",
              fontFamily: "Plus Jakarta Sans",
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
            fontSize: "26px",
            fontWeight: 500,
            lineHeight: 1.45,
            color: "#6B645B",
            fontFamily: "DM Sans",
            maxWidth: "960px",
          }}
        >
          {"Websites, apps, and tools that work, with motion that makes them feel alive."}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: fontJakartaBuffer,
          style: "normal",
          weight: 700,
        },
        {
          name: "DM Sans",
          data: fontDmBuffer,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
