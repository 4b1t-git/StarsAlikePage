"use client";

import StarryBackground from "./StarryBackground";
import GradientMesh from "./GradientMesh";
import GrainOverlay from "./GrainOverlay";

export default function CosmicSubstrate() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-cosmos-void"
    >
      <GradientMesh />
      <div className="absolute inset-0">
        <StarryBackground showBlackHole={false} mode="ambient" />
      </div>
      <GrainOverlay />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(5,5,5,0.85) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
