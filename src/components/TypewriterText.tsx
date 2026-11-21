import React from "react";
import { useCurrentFrame } from "remotion";
import type { TitleStyle } from "../schemas/episode";

export type TypewriterTextProps = {
  readonly text: string;
  readonly color: string;
  readonly fontSize: number;
  readonly framesPerCharacter?: number;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  color,
  fontSize,
  framesPerCharacter = 1.4,
}) => {
  const frame = useCurrentFrame();
  const visibleCharacters = Math.min(
    text.length,
    Math.floor(frame / framesPerCharacter) + 1,
  );
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  return (
    <span style={{ color }}>
      {text.slice(0, visibleCharacters)}
      {cursorVisible ? (
        <span
          style={{
            display: "inline-block",
            width: fontSize * 0.06,
            height: fontSize * 0.86,
            marginLeft: fontSize * 0.05,
            background: color,
            verticalAlign: "-0.08em",
            boxShadow: `0 0 ${fontSize * 0.18}px ${color}`,
          }}
        />
      ) : null}
    </span>
  );
};

export type SlideTitleProps = {
  readonly text: string;
  readonly color: string;
  readonly fontSize: number;
  readonly titleStyle?: TitleStyle;
  readonly lineHeight?: number;
  readonly fontWeight?: number;
};

export const SlideTitle: React.FC<SlideTitleProps> = ({
  text,
  color,
  fontSize,
  titleStyle = "default",
  lineHeight = 1.12,
  fontWeight = 900,
}) => {
  const style: React.CSSProperties = {
    margin: 0,
    fontSize,
    lineHeight,
    fontWeight,
    color,
  };

  return (
    <h2 style={style}>
      {titleStyle === "typewriter" ? (
        <TypewriterText text={text} color={color} fontSize={fontSize} />
      ) : (
        text
      )}
    </h2>
  );
};
