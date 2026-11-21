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

export const StatHighlight: React.FC<SlideLayoutProps> = ({
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
  const pop = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.4, 1]);

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
            gap: unit * 0.035,
            width: "100%",
          }}
        >
          <div
            style={{
              color: colors.tertiary,
              fontSize: unit * 0.032,
              fontWeight: 800,
              letterSpacing: unit * 0.008,
              textTransform: "uppercase",
            }}
          >
            Angka penting
          </div>
          <div
            style={{
              fontSize: unit * 0.3,
              lineHeight: 1,
              fontWeight: 900,
              color: colors.primary,
              textShadow: `0 0 ${unit * 0.06}px ${colors.primary}90`,
              transform: `scale(${scale})`,
            }}
          >
            {slide.highlightText ?? slide.title}
          </div>
          <SlideInlineMedia
            slide={slide}
            colors={colors}
            themeColor={themeColor}
            themePreset={themePreset}
            durationInFrames={durationInFrames}
          />
          <SlideHeader
            slide={slide}
            colors={colors}
            unit={unit}
            titleFontSize={unit * 0.065}
          />
          {slide.body ? (
            <p
              style={{
                margin: 0,
                maxWidth: "90%",
                fontSize: unit * 0.037,
                lineHeight: 1.4,
                color: "rgba(255, 255, 255, 0.82)",
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
