import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Four-point sparkle star, matching the site's teal accent.
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
          borderRadius: 7,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 0 C12 10 14 12 24 12 C14 12 12 14 12 24 C12 14 10 12 0 12 C10 12 12 10 12 0 Z"
            fill="#40E0D0"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
