import React from "react";
import { Audio, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
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

export const calculateVerticalReelsMetadata: CalculateMetadataFunction<EpisodeCompositionProps> =
  getEpisodeMetadata(VERTICAL_REELS_CONFIG);

export const VerticalReels: React.FC<EpisodeCompositionProps> = (props) => {
  const audioAvailable = Boolean(props.audioAvailable && props.audioFile);

  return (
    <>
      {audioAvailable && props.audioFile ? (
        <Audio src={staticFile(props.audioFile)} />
      ) : null}
      <EpisodeVideo {...props} audioAvailable={false} layout="vertical" />
    </>
  );
};
