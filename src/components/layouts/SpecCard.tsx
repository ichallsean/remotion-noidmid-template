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

export const SpecCard: React.FC<SlideLayoutProps> = ({
  slide,
  index,
  total,
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
  const rise = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 90, mass: 1 },
  });
  const translateY = interpolate(rise, [0, 1], [unit * 0.2, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            width: "100%",
            boxSizing: "border-box",
            padding: unit * 0.055,
            borderRadius: unit * 0.045,
            border: `${unit * 0.003}px solid ${colors.primary}66`,
            background: "rgba(8, 8, 14, 0.55)",
            boxShadow: `0 0 ${unit * 0.07}px ${colors.primary}33`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: unit * 0.03,
            textAlign: "left",
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: unit * 0.055,
                fontWeight: 900,
                color: colors.primary,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                fontSize: unit * 0.03,
                fontWeight: 700,
                color: colors.tertiary,
              }}
            >
              {index + 1} / {total}
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: unit * 0.008,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`,
            }}
          />
          <SlideHeader
            slide={slide}
            colors={colors}
            unit={unit}
            align="left"
            titleFontSize={unit * 0.07}
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
                fontSize: unit * 0.045,
                fontWeight: 800,
                color: colors.secondary,
              }}
            >
              {slide.highlightText}
            </div>
          ) : null}
          {slide.body ? (
            <p
              style={{
                margin: 0,
                fontSize: unit * 0.036,
                lineHeight: 1.4,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {slide.body}
            </p>
          ) : null}
        </div>
      </LayoutFrame>
    </AbsoluteFill>
  );
};
