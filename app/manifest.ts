import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "California Legal Document Excellence, LLC",
    short_name: "CLDE",
    description:
      "Registered Legal Document Assistant (LDA #87, Sonoma County) providing professional document preparation services in Santa Rosa, California.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0D1B2A",
    orientation: "portrait",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
