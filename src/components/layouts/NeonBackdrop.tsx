import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { ThemePreset } from "../../schemas/episode";
import { getThemeColors } from "../../schemas/episode";

export type NeonBackdropProps = {
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
};

export const NeonBackdrop: React.FC<NeonBackdropProps> = ({
  themeColor,
  themePreset,
}) => {
  const frame = useCurrentFrame();
  const colors = getThemeColors(themeColor, themePreset);
  const x1 = 28 + Math.sin(frame / 26) * 12;
  const y1 = 22 + Math.cos(frame / 31) * 10;
  const x2 = 74 + Math.cos(frame / 29) * 12;
  const y2 = 76 + Math.sin(frame / 33) * 10;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.base,
        backgroundImage: `radial-gradient(circle at ${x1}% ${y1}%, ${colors.primary}44, transparent 46%), radial-gradient(circle at ${x2}% ${y2}%, ${colors.tertiary}33, transparent 42%), linear-gradient(160deg, ${colors.base} 0%, ${colors.secondary}18 100%)`,
        overflow: "hidden",
      }}
    />
  );
};
