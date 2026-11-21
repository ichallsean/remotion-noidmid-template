import { Composition, Folder } from "remotion";
import sampleEpisodeJson from "../content/episodes/sample-01.json";
import {
  calculateLandscapeVideoMetadata,
  calculateVerticalReelsMetadata,
  LANDSCAPE_VIDEO_CONFIG,
  LandscapeVideo,
  VERTICAL_REELS_CONFIG,
  VerticalReels,
} from "./compositions";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import type { Episode } from "./schemas/episode";
import { getSlidesDurationInFrames } from "./schemas/episode";

const sampleEpisode: Episode = sampleEpisodeJson;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Episodes">
        <Composition
          id="VerticalReels"
          component={VerticalReels}
          durationInFrames={getSlidesDurationInFrames(
            sampleEpisode,
            VERTICAL_REELS_CONFIG.fps,
          )}
          fps={VERTICAL_REELS_CONFIG.fps}
          width={VERTICAL_REELS_CONFIG.width}
          height={VERTICAL_REELS_CONFIG.height}
          defaultProps={sampleEpisode}
          calculateMetadata={calculateVerticalReelsMetadata}
        />
        <Composition
          id="LandscapeVideo"
          component={LandscapeVideo}
          durationInFrames={getSlidesDurationInFrames(
            sampleEpisode,
            LANDSCAPE_VIDEO_CONFIG.fps,
          )}
          fps={LANDSCAPE_VIDEO_CONFIG.fps}
          width={LANDSCAPE_VIDEO_CONFIG.width}
          height={LANDSCAPE_VIDEO_CONFIG.height}
          defaultProps={sampleEpisode}
          calculateMetadata={calculateLandscapeVideoMetadata}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
