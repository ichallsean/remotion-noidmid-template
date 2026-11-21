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

export const VERTICAL_REELS_CONFIG = {
  fps: 30,
  width: 1080,
  height: 1920,
} as const satisfies CompositionConfig;

export const VERTICAL_SAFE_ZONE: SafeZone = {
  top: 220,
  right: 140,
  bottom: 320,
  left: 140,
};

export const calculateVerticalReelsMetadata: CalculateMetadataFunction<EpisodeCompositionProps> =
  getEpisodeMetadata(VERTICAL_REELS_CONFIG);

export const VerticalReels: React.FC<EpisodeCompositionProps> = (props) => {
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
          safeZone={VERTICAL_SAFE_ZONE}
          isPortrait
          episodeTitle={props.title}
          episodeSubtitle={props.subtitle}
          watermark={props.watermark}
          watermarkMode={props.watermarkMode}
        />
      </EpisodeVideo>
    </>
  );
};
