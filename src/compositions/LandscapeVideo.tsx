import React from "react";
import { Audio, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { SlideSequences } from "../components/layouts";
import type { SafeZone } from "../components/layouts";
import { EpisodeVideo } from "./EpisodeVideo";
import type {
  CompositionConfig,
  EpisodeCompositionProps,
} from "./episode-metadata";
import { getEpisodeMetadata } from "./episode-metadata";

export const LANDSCAPE_VIDEO_CONFIG = {
  fps: 60,
  width: 1920,
  height: 1080,
} as const satisfies CompositionConfig;

export const LANDSCAPE_SAFE_ZONE: SafeZone = {
  top: 80,
  right: 140,
  bottom: 120,
  left: 140,
};

export const calculateLandscapeVideoMetadata: CalculateMetadataFunction<EpisodeCompositionProps> =
  getEpisodeMetadata(LANDSCAPE_VIDEO_CONFIG);

export const LandscapeVideo: React.FC<EpisodeCompositionProps> = (props) => {
  const audioAvailable = Boolean(props.audioAvailable && props.audioFile);

  return (
    <>
      {audioAvailable && props.audioFile ? (
        <Audio src={staticFile(props.audioFile)} volume={1} />
      ) : null}
      <EpisodeVideo {...props} audioAvailable={false}>
        <SlideSequences
          slides={props.slides}
          themeColor={props.themeColor}
          themePreset={props.themePreset}
          safeZone={LANDSCAPE_SAFE_ZONE}
          isPortrait={false}
          episodeTitle={props.title}
          episodeSubtitle={props.subtitle}
          watermark={props.watermark}
          watermarkMode={props.watermarkMode}
        />
      </EpisodeVideo>
    </>
  );
};
