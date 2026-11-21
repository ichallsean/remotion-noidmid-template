import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { getThemeColors } from "../../schemas/episode";
import { KineticTitle } from "../KineticTitle";
import { LayoutFrame } from "./LayoutFrame";
import { SlideBackdrop, SlideInlineMedia } from "./SlideVisuals";
import { SlideHeader } from "./SlideHeader";
import type { SlideLayoutProps } from "./types";

export const HookCover: React.FC<SlideLayoutProps> = ({
  slide,
  themeColor,
  themePreset,
  safeZone,
  isPortrait,
  durationInFrames,
  episodeTitle,
  episodeSubtitle,
}) => {
  const { width } = useVideoConfig();
  const unit = isPortrait ? width : width * 0.34;
  const colors = getThemeColors(themeColor, themePreset);

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
            gap: unit * 0.045,
            width: "100%",
          }}
        >
          <div
            style={{
              padding: `${unit * 0.014}px ${unit * 0.04}px`,
              borderRadius: 999,
              border: `${unit * 0.003}px solid ${colors.tertiary}`,
              color: colors.tertiary,
              fontSize: unit * 0.03,
              fontWeight: 700,
              letterSpacing: unit * 0.006,
              textTransform: "uppercase",
            }}
          >
            {slide.secondaryText ?? "Tonton sampai habis"}
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
            titleFontSize={unit * 0.05}
          />
          <KineticTitle
            text={episodeTitle}
            subtitle={episodeSubtitle}
            color={themeColor}
            themePreset={themePreset}
            fontSize={unit * 0.082}
            subtitleFontSize={unit * 0.032}
            animate={false}
          />
          {slide.highlightText ? (
            <div
              style={{
                fontSize: unit * 0.1,
                lineHeight: 1,
                fontWeight: 900,
                color: colors.primary,
                textShadow: `0 0 ${unit * 0.04}px ${colors.primary}80`,
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
                fontSize: unit * 0.034,
                lineHeight: 1.35,
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
