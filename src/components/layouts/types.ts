import type { Slide, ThemePreset } from "../../schemas/episode";

export type SafeZone = {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
};

export type SlideLayoutProps = {
  readonly slide: Slide;
  readonly index: number;
  readonly total: number;
  readonly durationInFrames: number;
  readonly themeColor: string;
  readonly themePreset?: ThemePreset;
  readonly safeZone: SafeZone;
  readonly isPortrait: boolean;
  readonly episodeTitle: string;
  readonly episodeSubtitle?: string;
};
