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

export const AnalogySplit: React.FC<SlideLayoutProps> = ({
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
    config: { damping: 18, stiffness: 110, mass: 0.9 },
  });
  const topTranslate = interpolate(enter, [0, 1], [-unit * 0.2, 0]);
  const bottomTranslate = interpolate(enter, [0, 1], [unit * 0.2, 0]);
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card = (label: string, text: string | undefined, translate: number, accent: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: unit * 0.04,
        width: "100%",
        padding: `${unit * 0.035}px ${unit * 0.045}px`,
        boxSizing: "border-box",
        borderRadius: unit * 0.035,
        borderLeft: `${unit * 0.01}px solid ${accent}`,
        background: "rgba(255, 255, 255, 0.07)",
        opacity,
        transform: `translateX(${translate}px)`,
        textAlign: "left",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: unit * 0.075,
          height: unit * 0.075,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: accent,
          color: colors.base,
          fontSize: unit * 0.04,
          fontWeight: 900,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: unit * 0.052,
          lineHeight: 1.15,
          fontWeight: 800,
          color: "#ffffff",
        }}
      >
        {text}
      </div>
    </div>
  );

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
          <SlideHeader
            slide={slide}
            colors={colors}
            unit={unit}
            titleFontSize={unit * 0.075}
          />
          <SlideInlineMedia
            slide={slide}
            colors={colors}
            themeColor={themeColor}
            themePreset={themePreset}
            durationInFrames={durationInFrames}
          />
          {card("A", slide.highlightText, topTranslate, colors.secondary)}
          {card("B", slide.secondaryText, bottomTranslate, colors.tertiary)}
          {slide.body ? (
            <p
              style={{
                margin: 0,
                maxWidth: "92%",
                fontSize: unit * 0.035,
                lineHeight: 1.35,
                color: "rgba(255, 255, 255, 0.78)",
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
