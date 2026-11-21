import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export type KineticTitleProps = {
  readonly text: string;
  readonly subtitle?: string;
  readonly color?: string;
  readonly fontSize?: number;
  readonly subtitleFontSize?: number;
};

export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  subtitle,
  color = "#ffffff",
  fontSize = 96,
  subtitleFontSize = 40,
}) => {
  const frame = useCurrentFrame();

  const titleProgress = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleProgress = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTranslateY = interpolate(titleProgress, [0, 1], [48, 0]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.92, 1]);
  const titleLetterSpacing = interpolate(titleProgress, [0, 1], [8, -1]);
  const subtitleTranslateY = interpolate(subtitleProgress, [0, 1], [24, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize,
          lineHeight: 1.05,
          fontWeight: 800,
          color,
          opacity: titleProgress,
          letterSpacing: titleLetterSpacing,
          transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
        }}
      >
        {text}
      </h1>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            fontSize: subtitleFontSize,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.72)",
            opacity: subtitleProgress,
            transform: `translateY(${subtitleTranslateY}px)`,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
