import { ImageResponse } from "next/og";

export const alt =
  "California Legal Document Excellence, LLC — LDA #87, Sonoma County";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0D1B2A";
const NAVY_MID = "#1B2D42";
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const BODY_LIGHT = "#E8E8E8";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.18), transparent 70%)`,
          padding: "80px 100px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top bar — LDA label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: GOLD,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: 64,
              height: 2,
              backgroundColor: GOLD,
            }}
          />
          Registered LDA · LDA #87 · Sonoma County
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#FFFFFF",
            marginTop: 60,
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Professional Document</span>
          <span>Preparation You Can</span>
          <span>
            <span style={{ color: GOLD }}>Count On.</span>
          </span>
        </div>

        {/* Spacer pushes footer down */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer row — business name + disclaimer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: `2px solid ${GOLD}`,
            paddingTop: 28,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              color: GOLD_LIGHT,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            California Legal Document Excellence, LLC
          </div>
          <div
            style={{
              display: "flex",
              color: BODY_LIGHT,
              fontSize: 20,
              opacity: 0.85,
            }}
          >
            Not a law firm. Document preparation at your direction. (707) 909-1240
          </div>
        </div>

        {/* Bottom-right ornament */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 8,
            height: "100%",
            backgroundColor: NAVY_MID,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 4,
            height: "100%",
            backgroundColor: GOLD,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
