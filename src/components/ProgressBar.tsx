import React from "react";
import { interpolate } from "remotion";

export type ProgressBarProps = {
  readonly progress: number;
  readonly themeColor: string;
  readonly height?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  themeColor,
  height = 8,
}) => {
  const clampedProgress = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height,
        background: "rgba(255, 255, 255, 0.12)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${clampedProgress * 100}%`,
          background: themeColor,
          boxShadow: `0 0 24px ${themeColor}`,
        }}
      />
    </div>
  );
};
