import { ImageResponse } from "next/og";
import { release, site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0e9",
          color: "#16150f",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4 }}>
          <span>THRU WALLET</span>
          <span>BETANET</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>Add the extension.</span>
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>Keep the keys local.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>Chrome Web Store · v{site.listing.version}</span>
          <span>Source {release.tag} · unofficial</span>
        </div>
      </div>
    ),
    size,
  );
}
