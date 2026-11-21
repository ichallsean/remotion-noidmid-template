import React from "react";
import { Audio, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
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

export const calculateLandscapeVideoMetadata: CalculateMetadataFunction<EpisodeCompositionProps> =
  getEpisodeMetadata(LANDSCAPE_VIDEO_CONFIG);

export const LandscapeVideo: React.FC<EpisodeCompositionProps> = (props) => {
  const audioAvailable = Boolean(props.audioAvailable && props.audioFile);

  return (
    <>
      {audioAvailable && props.audioFile ? (
        <Audio src={staticFile(props.audioFile)} />
      ) : null}
      <EpisodeVideo {...props} audioAvailable={false} layout="landscape" />
    </>
  );
};
