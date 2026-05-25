import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D1B2A",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(201,168,76,0.20), transparent 70%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#C9A84C",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          CLDE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            width: 60,
            height: 2,
            backgroundColor: "#C9A84C",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 10,
            color: "#E8D5A3",
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          LDA #87
        </div>
      </div>
    ),
    { ...size },
  );
}
