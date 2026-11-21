import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getThemeColors } from "../../schemas/episode";
import { LayoutFrame } from "./LayoutFrame";
import { SlideBackdrop, SlideInlineMedia } from "./SlideVisuals";
import { SlideHeader } from "./SlideHeader";
import type { SlideLayoutProps } from "./types";

export const CtaOutro: React.FC<SlideLayoutProps> = ({
  slide,
  themeColor,
  themePreset,
  safeZone,
  isPortrait,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const unit = isPortrait ? width : width * 0.34;
  const colors = getThemeColors(themeColor, themePreset);
  const enter = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.8 },
  });
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const pulse = 1 + Math.sin(frame / 5) * 0.05;

  return (
    <AbsoluteFill>
      <SlideBackdrop
        slide={slide}
        colors={colors}
        themeColor={themeColor}
        themePreset={themePreset}
        durationInFrames={durationInFrames}
      />
      <LayoutFrame safeZone={safeZone}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: unit * 0.04,
            width: "100%",
            transform: `scale(${scale})`,
          }}
        >
          <div
            style={{
              padding: `${unit * 0.018}px ${unit * 0.05}px`,
              borderRadius: 999,
              background: colors.primary,
              color: colors.base,
              fontSize: unit * 0.03,
              fontWeight: 900,
              letterSpacing: unit * 0.006,
              textTransform: "uppercase",
              transform: `scale(${pulse})`,
              boxShadow: `0 0 ${unit * 0.05}px ${colors.primary}80`,
            }}
          >
            Follow + Save
          </div>
          <SlideHeader
            slide={slide}
            colors={colors}
            unit={unit}
            titleFontSize={unit * 0.085}
          />
          <SlideInlineMedia
            slide={slide}
            colors={colors}
            themeColor={themeColor}
            themePreset={themePreset}
            durationInFrames={durationInFrames}
          />
          {slide.highlightText ? (
            <div
              style={{
                fontSize: unit * 0.075,
                fontWeight: 900,
                color: colors.tertiary,
                textShadow: `0 0 ${unit * 0.04}px ${colors.tertiary}80`,
              }}
            >
              {slide.highlightText}
            </div>
          ) : null}
          {slide.body ? (
            <p
              style={{
                margin: 0,
                maxWidth: "90%",
                fontSize: unit * 0.038,
                lineHeight: 1.4,
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              {slide.body}
            </p>
          ) : null}
          {slide.secondaryText ? (
            <div
              style={{
                marginTop: unit * 0.01,
                fontSize: unit * 0.03,
                color: colors.secondary,
                fontWeight: 700,
              }}
            >
              {slide.secondaryText}
            </div>
          ) : null}
        </div>
      </LayoutFrame>
    </AbsoluteFill>
  );
};
