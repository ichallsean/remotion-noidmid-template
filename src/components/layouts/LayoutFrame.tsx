import React from "react";
import { AbsoluteFill } from "remotion";
import type { SafeZone } from "./types";

export type LayoutFrameProps = {
  readonly safeZone: SafeZone;
  readonly children: React.ReactNode;
};

export const LayoutFrame: React.FC<LayoutFrameProps> = ({
  safeZone,
  children,
}) => (
  <AbsoluteFill
    style={{
      boxSizing: "border-box",
      paddingTop: safeZone.top,
      paddingRight: safeZone.right,
      paddingBottom: safeZone.bottom,
      paddingLeft: safeZone.left,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);
