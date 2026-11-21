import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticTitle } from "../components/KineticTitle";
import { ProgressBar } from "../components/ProgressBar";
import { SlideCard } from "../components/SlideCard";
import type { Episode, Slide } from "../schemas/episode";
import { getSlideDurationInFrames } from "../schemas/episode";
import type { EpisodeCompositionProps } from "./episode-metadata";

type Layout = "vertical" | "landscape";

const INTRO_DURATION_IN_SECONDS = 1.8;

const distributeSlideDurations = (
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
  const baseTotal = baseDurations.reduce((total, value) => total + value, 0);
  const safeBaseTotal = Math.max(1, baseTotal);
  const durations = baseDurations.map((value) =>
    Math.max(1, Math.round((value / safeBaseTotal) * totalFrames)),
  );
  const currentTotal = durations.reduce((total, value) => total + value, 0);
  const lastIndex = durations.length - 1;
  durations[lastIndex] = Math.max(
    1,
    durations[lastIndex] + (totalFrames - currentTotal),
  );

  return durations;
};

const IntroTitle: React.FC<{
  readonly episode: Episode;
  readonly isPortrait: boolean;
}> = ({ episode, isPortrait }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [
      0,
      Math.round(fps * 0.2),
      Math.round(fps * 1.2),
      Math.round(fps * 1.7),
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const fontSize = isPortrait ? width * 0.11 : width * 0.05;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isPortrait ? 90 : 140,
        opacity,
        background: `radial-gradient(circle at 50% 40%, ${episode.themeColor}33, transparent 65%)`,
      }}
    >
      <KineticTitle
        text={episode.title}
        subtitle={episode.subtitle}
        color={episode.themeColor}
        fontSize={fontSize}
        subtitleFontSize={fontSize * 0.42}
      />
    </AbsoluteFill>
  );
};

export type EpisodeVideoProps = EpisodeCompositionProps & {
  readonly layout: Layout;
};

export const EpisodeVideo: React.FC<EpisodeVideoProps> = ({
  layout,
  audioAvailable,
  ...episode
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const isPortrait = layout === "vertical" || height >= width;

  const slideDurations = distributeSlideDurations(
    episode.slides,
    durationInFrames,
    fps,
  );

  const introFrames = Math.min(
    durationInFrames,
    Math.max(1, Math.round(fps * INTRO_DURATION_IN_SECONDS)),
  );

  let offset = 0;
  const slideSequences = episode.slides.map((slide, index) => {
    const from = offset;
    const duration = slideDurations[index];
    offset += duration;

    return (
      <Sequence key={slide.id} from={from} durationInFrames={duration}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: isPortrait ? 72 : 120,
          }}
        >
          <SlideCard
            slide={slide}
            index={index}
            total={episode.slides.length}
            durationInFrames={duration}
            themeColor={episode.themeColor}
          />
        </AbsoluteFill>
      </Sequence>
    );
  });

  const progress = durationInFrames <= 1 ? 0 : frame / durationInFrames;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#08080b",
        color: "#ffffff",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 20%, ${episode.themeColor}2e, #08080b 60%)`,
        }}
      />
      {slideSequences}
      <Sequence durationInFrames={introFrames}>
        <IntroTitle episode={episode} isPortrait={isPortrait} />
      </Sequence>
      {audioAvailable && episode.audioFile ? (
        <Audio src={staticFile(episode.audioFile)} />
      ) : null}
      <ProgressBar progress={progress} themeColor={episode.themeColor} />
    </AbsoluteFill>
  );
};
