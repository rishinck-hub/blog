import { ImageResponse } from "next/og";

export const alt = "Mohammed Rishin C K — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", background: "#f3f1ec", color: "#111111", fontFamily: "serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: 22, letterSpacing: 2 }}><span>RISHIN®</span><span>SOFTWARE DEVELOPER — INDIA</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: .82, letterSpacing: -5, textTransform: "uppercase" }}><span>Mohammed</span><span>Rishin C K</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(17,17,17,.25)", paddingTop: 24, fontFamily: "sans-serif", fontSize: 22 }}><span>Reliable digital systems.</span><span>Refined web experiences.</span></div>
    </div>,
    size,
  );
}
