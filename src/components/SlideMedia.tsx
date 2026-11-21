import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ImageMode, Slide } from "../schemas/episode";
import { DEFAULT_IMAGE_MODE } from "../schemas/episode";

export type SlideMediaProps = {
  readonly src?: string;
  readonly alt?: string;
  readonly mode?: ImageMode;
  readonly durationInFrames: number;
  readonly glowColor?: string;
};

export const shouldUseBackdropMedia = (slide: Slide): boolean =>
  Boolean(slide.image) &&
  (slide.imageMode ?? DEFAULT_IMAGE_MODE) === "backdrop";

export const SlideMedia: React.FC<SlideMediaProps> = ({
  src,
  alt = "",
  mode = DEFAULT_IMAGE_MODE,
  durationInFrames,
  glowColor = "#00f0ff",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const landscape = width > height;

  if (!src) {
    return null;
  }

  const duration = Math.max(1, durationInFrames);
  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (mode === "backdrop") {
    const scale = interpolate(progress, [0, 1], [1.08, 1.16]);
    const translateX = interpolate(progress, [0, 1], [-2, 2]);
    const translateY = interpolate(progress, [0, 1], [1, -1]);

    return (
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(5, 3, 12, 0.5) 0%, rgba(5, 3, 12, 0.74) 52%, rgba(5, 3, 12, 0.92) 100%)",
          }}
        />
      </AbsoluteFill>
    );
  }

  if (mode === "floating-badge") {
    const pop = spring({
      frame,
      fps,
      config: { damping: 11, stiffness: 150, mass: 0.7 },
    });
    const scale = interpolate(pop, [0, 1], [0.55, 1]);
    const rotate = interpolate(pop, [0, 1], [-10, 0]);
    const float = Math.sin(frame / 18) * 8;

    return (
      <Img
        src={staticFile(src)}
        alt={alt}
        style={{
          width: landscape ? 130 : 220,
          height: landscape ? 130 : 220,
          flexShrink: 0,
          objectFit: "contain",
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${float}px)`,
          filter: `drop-shadow(0 0 30px ${glowColor}aa)`,
        }}
      />
    );
  }

  const zoom = interpolate(progress, [0, 1], [1, 1.12]);

  return (
    <div
      style={{
        position: "relative",
        width: landscape ? 760 : "100%",
        height: landscape ? 300 : 460,
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: landscape ? 18 : 28,
        border: `3px solid ${glowColor}66`,
        boxShadow: `0 0 60px ${glowColor}33`,
        background: "rgba(8, 8, 14, 0.6)",
      }}
    >
      <Img
        src={staticFile(src)}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: landscape ? "contain" : "cover",
          transform: `scale(${zoom})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />
    </div>
  );
};
