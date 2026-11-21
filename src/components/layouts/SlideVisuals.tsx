import React from "react";
import type { Slide, ThemeColors, ThemePreset } from "../../schemas/episode";
import { SlideMedia, shouldUseBackdropMedia } from "../SlideMedia";
import { NeonBackdrop } from "./NeonBackdrop";

export type SlideVisualsProps = {
  readonly slide: Slide;
  readonly colors: ThemeColors;
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
  readonly durationInFrames: number;
};

export const SlideBackdrop: React.FC<SlideVisualsProps> = ({
  slide,
  colors,
  themeColor,
  themePreset,
  durationInFrames,
}) => {
  if (shouldUseBackdropMedia(slide)) {
    return (
      <SlideMedia
        src={slide.image}
        alt={slide.title}
        mode="backdrop"
        durationInFrames={durationInFrames}
        glowColor={colors.tertiary}
      />
    );
  }

  return <NeonBackdrop themeColor={themeColor} themePreset={themePreset} />;
};

export const SlideInlineMedia: React.FC<SlideVisualsProps> = ({
  slide,
  colors,
  durationInFrames,
}) => {
  if (shouldUseBackdropMedia(slide)) {
    return null;
  }

  return (
    <SlideMedia
      src={slide.image}
      alt={slide.title}
      mode={slide.imageMode}
      durationInFrames={durationInFrames}
      glowColor={colors.tertiary}
    />
  );
};
