import { ALL_FORMATS, Input, UrlSource } from "mediabunny";
import { staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import type { Episode } from "../schemas/episode";
import { getSlidesDurationInFrames } from "../schemas/episode";

export type EpisodeCompositionProps = Episode & {
  readonly audioAvailable?: boolean;
};

export type CompositionConfig = {
  readonly fps: number;
  readonly width: number;
  readonly height: number;
};

const getAudioDurationInSeconds = async (
  audioFile: string,
): Promise<number | null> => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(staticFile(audioFile)),
  });

  try {
    const duration = await input.computeDuration();
    if (!Number.isFinite(duration) || duration <= 0) {
      return null;
    }
    return duration;
  } catch {
    return null;
  } finally {
    input.dispose();
  }
};

export const measureEpisode = async (
  episode: Episode,
  fps: number,
): Promise<{ durationInFrames: number; audioAvailable: boolean }> => {
  const slidesDuration = getSlidesDurationInFrames(episode, fps);

  if (!episode.audioFile) {
    return { durationInFrames: slidesDuration, audioAvailable: false };
  }

  const audioDuration = await getAudioDurationInSeconds(episode.audioFile);

  if (audioDuration === null) {
    return { durationInFrames: slidesDuration, audioAvailable: false };
  }

  return {
    durationInFrames: Math.max(1, Math.ceil(audioDuration * fps)),
    audioAvailable: true,
  };
};

export const getEpisodeMetadata = (
  config: CompositionConfig,
): CalculateMetadataFunction<EpisodeCompositionProps> => {
  return async ({ props }) => {
    const { durationInFrames, audioAvailable } = await measureEpisode(
      props,
      config.fps,
    );

    return {
      durationInFrames,
      fps: config.fps,
      width: config.width,
      height: config.height,
      props: {
        ...props,
        audioAvailable,
      },
    };
  };
};
