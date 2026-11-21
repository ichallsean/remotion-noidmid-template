import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Slide, ThemePreset } from "../schemas/episode";
import { getThemeColors } from "../schemas/episode";

export type SlideCardProps = {
  readonly slide: Slide;
  readonly index: number;
  readonly total: number;
  readonly durationInFrames: number;
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
};

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  index,
  total,
  durationInFrames,
  themeColor,
  themePreset,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height >= width;
  const colors = getThemeColors(themeColor, themePreset);

  const accent = themePreset ? colors.primary : themeColor;
  const secondary = themePreset ? colors.secondary : themeColor;
  const tertiary = themePreset ? colors.tertiary : themeColor;

  const enterDuration = Math.max(1, Math.round(fps * 0.55));
  const exitDuration = Math.max(1, Math.round(fps * 0.4));

  const enter = interpolate(frame, [0, enterDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exit = interpolate(
    frame,
    [Math.max(0, durationInFrames - exitDuration), durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity = Math.min(enter, exit);
  const enterTranslateY = interpolate(enter, [0, 1], [56, 0]);
  const exitTranslateY = interpolate(exit, [0, 1], [0, -32]);
  const scale = interpolate(enter, [0, 1], [0.94, 1]);

  const padding = isPortrait ? width * 0.065 : width * 0.04;
  const titleSize = isPortrait ? width * 0.07 : width * 0.034;
  const bodySize = titleSize * 0.5;
  const maxWidth = isPortrait ? width * 0.82 : width * 0.68;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          padding,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          borderRadius: 32,
          border: `2px solid ${accent}88`,
          background: themePreset
            ? `linear-gradient(135deg, ${accent}33, ${secondary}22 55%, rgba(255,255,255,0.04))`
            : `linear-gradient(135deg, ${themeColor}33, rgba(255,255,255,0.04))`,
          boxShadow: `0 40px 120px ${accent}44`,
          opacity,
          transform: `translateY(${enterTranslateY + exitTranslateY}px) scale(${scale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              width: 72,
              height: 8,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${accent}, ${secondary}, ${tertiary})`,
            }}
          />
          <span
            style={{
              fontSize: titleSize * 0.28,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
              color: tertiary,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: titleSize,
            lineHeight: 1.1,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          {slide.title}
        </h2>
        {slide.body ? (
          <p
            style={{
              margin: 0,
              fontSize: bodySize,
              lineHeight: 1.5,
              color: "rgba(255, 255, 255, 0.82)",
            }}
          >
            {slide.body}
          </p>
        ) : null}
      </div>
    </div>
  );
};
