import React from "react";
import { AbsoluteFill } from "remotion";
import type { SlideLayout, WatermarkMode } from "../schemas/episode";
import { DEFAULT_WATERMARK, DEFAULT_WATERMARK_MODE } from "../schemas/episode";

export type WatermarkProps = {
  readonly text?: string;
  readonly mode?: WatermarkMode;
  readonly layout?: SlideLayout;
  readonly isPortrait?: boolean;
  readonly color?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({
  text = DEFAULT_WATERMARK,
  mode = DEFAULT_WATERMARK_MODE,
  layout,
  isPortrait = true,
  color = "#ffffff",
}) => {
  const isIntroOutro =
    layout === "hook-cover" || layout === "cta-outro";
  const visible = mode === "always-bottom" || isIntroOutro;

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: isPortrait ? 340 : 56,
      }}
    >
      <span
        style={{
          fontSize: isPortrait ? 28 : 22,
          lineHeight: 1,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color,
          opacity: 0.78,
          textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
        }}
      >
        {text}
      </span>
    </AbsoluteFill>
  );
};
