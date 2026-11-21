import { z } from "zod";

export const SlideLayoutSchema = z.enum([
  "hook-cover",
  "analogy-split",
  "stat-highlight",
  "spec-card",
  "cta-outro",
]);

export const TitleStyleSchema = z.enum(["default", "typewriter"]);

export const SfxSchema = z.enum(["none", "whoosh", "pop", "type", "ding"]);

export const ImageModeSchema = z.enum([
  "hero-card",
  "backdrop",
  "floating-badge",
]);

export const WatermarkModeSchema = z.enum(["intro-outro", "always-bottom"]);

export const SlideSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().optional(),
  layout: SlideLayoutSchema.optional(),
  highlightText: z.string().optional(),
  secondaryText: z.string().optional(),
  titleStyle: TitleStyleSchema.optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  imageMode: ImageModeSchema.optional(),
  sfx: SfxSchema.optional(),
  durationInSeconds: z.number().positive().optional(),
  durationInFrames: z.number().int().positive().optional(),
});

export const ThemePresetSchema = z.enum([
  "gta6-neon",
  "cyber-yellow",
  "midnight-cyan",
]);

export const THEME_PRESETS = {
  "gta6-neon": {
    background: "linear-gradient(160deg, #160929 0%, #2d114d 100%)",
    base: "#160929",
    primary: "#ff2a85",
    secondary: "#ff9e00",
    tertiary: "#00f0ff",
  },
  "cyber-yellow": {
    background: "#090d16",
    base: "#090d16",
    primary: "#facc15",
    secondary: "#38bdf8",
    tertiary: "#facc15",
  },
  "midnight-cyan": {
    background: "linear-gradient(160deg, #050b14 0%, #0b2436 100%)",
    base: "#050b14",
    primary: "#22d3ee",
    secondary: "#3b82f6",
    tertiary: "#67e8f9",
  },
} as const;

export type SlideLayout = z.infer<typeof SlideLayoutSchema>;
export type TitleStyle = z.infer<typeof TitleStyleSchema>;
export type Sfx = z.infer<typeof SfxSchema>;
export type ImageMode = z.infer<typeof ImageModeSchema>;
export type WatermarkMode = z.infer<typeof WatermarkModeSchema>;
export type ThemePreset = z.infer<typeof ThemePresetSchema>;

export const DEFAULT_SLIDE_SFX: Sfx = "whoosh";
export const DEFAULT_IMAGE_MODE: ImageMode = "hero-card";
export const DEFAULT_WATERMARK = "@noidmid";
export const DEFAULT_WATERMARK_MODE: WatermarkMode = "intro-outro";

export type ThemeColors = {
  readonly background: string;
  readonly base: string;
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary: string;
};

export const getThemeColors = (
  themeColor: string,
  themePreset?: ThemePreset,
): ThemeColors => {
  if (themePreset) {
    return THEME_PRESETS[themePreset];
  }

  return {
    background: `radial-gradient(circle at 50% 20%, ${themeColor}2e, #08080b 60%)`,
    base: "#08080b",
    primary: themeColor,
    secondary: themeColor,
    tertiary: themeColor,
  };
};

export const EpisodeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  themeColor: z.string().default("#7c3aed"),
  themePreset: ThemePresetSchema.optional(),
  watermark: z.string().default(DEFAULT_WATERMARK),
  watermarkMode: WatermarkModeSchema.default(DEFAULT_WATERMARK_MODE),
  audioFile: z.string().optional(),
  sfxVolume: z.number().min(0).max(1).default(0.3),
  slides: z.array(SlideSchema).min(1),
});

export type Slide = z.infer<typeof SlideSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;

export const DEFAULT_SLIDE_DURATION_IN_SECONDS = 2.5;

export const getSlideDurationInFrames = (slide: Slide, fps: number): number => {
  if (slide.durationInFrames !== undefined) {
    return Math.max(1, Math.round(slide.durationInFrames));
  }

  const seconds = slide.durationInSeconds ?? DEFAULT_SLIDE_DURATION_IN_SECONDS;
  return Math.max(1, Math.round(seconds * fps));
};

export const getSlidesDurationInFrames = (
  episode: Pick<Episode, "slides">,
  fps: number,
): number => {
  return episode.slides.reduce(
    (total, slide) => total + getSlideDurationInFrames(slide, fps),
    0,
  );
};

export const parseEpisode = (input: unknown): Episode => {
  return EpisodeSchema.parse(input);
};
