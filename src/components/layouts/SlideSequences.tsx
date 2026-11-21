import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import type { Slide, ThemePreset, WatermarkMode } from "../../schemas/episode";
import { getSlideDurationInFrames } from "../../schemas/episode";
import { Watermark } from "../Watermark";
import { LAYOUT_COMPONENTS } from "./registry";
import type { SafeZone } from "./types";

export type SlideSequencesProps = {
  readonly slides: readonly Slide[];
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
  readonly safeZone: SafeZone;
  readonly isPortrait: boolean;
  readonly episodeTitle: string;
  readonly episodeSubtitle?: string;
  readonly watermark?: string;
  readonly watermarkMode?: WatermarkMode;
};

export const distributeSlideDurations = (
  slides: readonly Slide[],
  totalFrames: number,
  fps: number,
): number[] => {
  if (slides.length === 0) {
    return [];
  }

  const baseDurations = slides.map((slide) =>
    getSlideDurationInFrames(slide, fps),
  );
  const baseTotal = Math.max(
    1,
    baseDurations.reduce((total, value) => total + value, 0),
  );
  const durations = baseDurations.map((value) =>
    Math.max(1, Math.round((value / baseTotal) * totalFrames)),
  );
  const currentTotal = durations.reduce((total, value) => total + value, 0);
  const lastIndex = durations.length - 1;
  durations[lastIndex] = Math.max(
    1,
    durations[lastIndex] + (totalFrames - currentTotal),
  );

  return durations;
};

export const SlideSequences: React.FC<SlideSequencesProps> = ({
  slides,
  themeColor,
  themePreset,
  safeZone,
  isPortrait,
  episodeTitle,
  episodeSubtitle,
  watermark,
  watermarkMode,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const durations = distributeSlideDurations(slides, durationInFrames, fps);

  let offset = 0;

  return (
    <>
      {slides.map((slide, index) => {
        const duration = durations[index];
        const from = offset;
        offset += duration;
        const layout = slide.layout ?? "spec-card";
        const Component = LAYOUT_COMPONENTS[layout];
        const sequenceProps =
          from === 0
            ? { durationInFrames: duration }
            : { from, durationInFrames: duration };

        return (
          <Sequence key={slide.id} {...sequenceProps}>
            <Component
              slide={slide}
              index={index}
              total={slides.length}
              durationInFrames={duration}
              themeColor={themeColor}
              themePreset={themePreset}
              safeZone={safeZone}
              isPortrait={isPortrait}
              episodeTitle={episodeTitle}
              episodeSubtitle={episodeSubtitle}
            />
            <Watermark
              text={watermark}
              mode={watermarkMode}
              layout={layout}
              isPortrait={isPortrait}
            />
          </Sequence>
        );
      })}
    </>
  );
};
