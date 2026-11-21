import React from "react";
import { interpolate } from "remotion";
import type { ThemePreset } from "../schemas/episode";
import { getThemeColors } from "../schemas/episode";

export type ProgressBarProps = {
  readonly progress: number;
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
  readonly height?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  themeColor,
  themePreset,
  height = 8,
}) => {
  const clampedProgress = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const colors = getThemeColors(themeColor, themePreset);

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
          background: themePreset
            ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`
            : colors.primary,
          boxShadow: `0 0 24px ${colors.primary}`,
        }}
      />
    </div>
  );
};
