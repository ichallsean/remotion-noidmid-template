import { Audio as MediaAudio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ProgressBar } from "../components/ProgressBar";
import { isSfxAvailable } from "../components/sfx";
import { distributeSlideDurations } from "../components/layouts";
import {
  DEFAULT_SLIDE_SFX,
  getThemeColors,
} from "../schemas/episode";
import type { EpisodeCompositionProps } from "./episode-metadata";

export type EpisodeVideoProps = EpisodeCompositionProps & {
  readonly children: React.ReactNode;
};

export const EpisodeVideo: React.FC<EpisodeVideoProps> = ({
  audioAvailable,
  children,
  ...episode
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const colors = getThemeColors(episode.themeColor, episode.themePreset);
  const progress = durationInFrames <= 1 ? 0 : frame / durationInFrames;
  const slideDurations = distributeSlideDurations(
    episode.slides,
    durationInFrames,
    fps,
  );
  const slideStarts: number[] = [];
  let slideOffset = 0;

  for (const duration of slideDurations) {
    slideStarts.push(slideOffset);
    slideOffset += duration;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.base,
        color: "#ffffff",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      {children}
      {episode.slides.map((slide, index) => {
        const sfx = slide.sfx ?? DEFAULT_SLIDE_SFX;

        if (!isSfxAvailable(sfx)) {
          return null;
        }

        return (
          <Sequence
            key={`sfx-${slide.id}`}
            from={slideStarts[index]}
            durationInFrames={Math.min(20, slideDurations[index])}
          >
            <MediaAudio
              src={staticFile(`sfx/${sfx}.mp3`)}
              volume={episode.sfxVolume ?? 0.3}
            />
          </Sequence>
        );
      })}
      {audioAvailable && episode.audioFile ? (
        <Audio src={staticFile(episode.audioFile)} volume={1} />
      ) : null}
      <ProgressBar
        progress={progress}
        themeColor={episode.themeColor}
        themePreset={episode.themePreset}
      />
    </AbsoluteFill>
  );
};
