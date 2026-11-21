import { z } from "zod";

export const SlideSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().optional(),
  durationInSeconds: z.number().positive().optional(),
  durationInFrames: z.number().int().positive().optional(),
});

export const EpisodeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  themeColor: z.string().default("#7c3aed"),
  audioFile: z.string().optional(),
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
