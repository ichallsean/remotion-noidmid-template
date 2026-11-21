import React from "react";
import { MotionIcon } from "../MotionIcon";
import { SlideTitle } from "../TypewriterText";
import type { Slide, ThemeColors } from "../../schemas/episode";

export type SlideHeaderProps = {
  readonly slide: Slide;
  readonly colors: ThemeColors;
  readonly unit: number;
  readonly align?: "center" | "left";
  readonly titleFontSize?: number;
  readonly showTitle?: boolean;
};

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  slide,
  colors,
  unit,
  align = "center",
  titleFontSize = unit * 0.07,
  showTitle = true,
}) => {
  const centered = align === "center";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
        gap: unit * 0.025,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: centered ? "center" : "flex-start",
          gap: unit * 0.03,
          width: "100%",
          textAlign: centered ? "center" : "left",
        }}
      >
        <MotionIcon
          name={slide.icon}
          color={colors.tertiary}
          glowColor={colors.primary}
          size={unit * 0.085}
        />
        {showTitle ? (
          <SlideTitle
            text={slide.title}
            titleStyle={slide.titleStyle}
            color={colors.primary}
            fontSize={titleFontSize}
          />
        ) : null}
      </div>
    </div>
  );
};
