import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          borderRadius: 12,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 100 100">
          <polygon
            points="50,8 87,30 87,70 50,92 13,70 13,30"
            stroke="#c8ccd1"
            strokeWidth="4"
            fill="none"
          />
          <circle cx="50" cy="50" r="12" fill="#A6FF00" />
          <line
            x1="20"
            y1="80"
            x2="80"
            y2="20"
            stroke="#A6FF00"
            strokeWidth="3"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
