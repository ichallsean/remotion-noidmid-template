import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Cpu,
  Gpu,
  HardDrive,
  MemoryStick,
  Server,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Readonly<Record<string, LucideIcon>> = {
  cpu: Cpu,
  ram: MemoryStick,
  memory: MemoryStick,
  ssd: HardDrive,
  disk: HardDrive,
  gpu: Gpu,
  zap: Zap,
  server: Server,
  wrench: Wrench,
  terminal: Terminal,
};

export type MotionIconProps = {
  readonly name?: string;
  readonly color: string;
  readonly glowColor?: string;
  readonly size?: number;
};

export const MotionIcon: React.FC<MotionIconProps> = ({
  name,
  color,
  glowColor = color,
  size = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Icon = name ? ICONS[name.toLowerCase()] : undefined;

  if (!Icon) {
    return null;
  }

  const pop = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.5, 1]);
  const float = Math.sin(frame / 14) * size * 0.06;
  const rotate = Math.sin(frame / 22) * 4;

  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.28,
        border: `${size * 0.02}px solid ${glowColor}66`,
        background: `${glowColor}1f`,
        boxShadow: `0 0 ${size * 0.4}px ${glowColor}55`,
        transform: `translateY(${float}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      <Icon size={size * 0.52} color={color} strokeWidth={2.4} />
    </div>
  );
};

export type MotionImageProps = {
  readonly src?: string;
  readonly alt?: string;
  readonly size?: number;
  readonly glowColor?: string;
};

export const MotionImage: React.FC<MotionImageProps> = ({
  src,
  alt = "",
  size = 160,
  glowColor = "#00f0ff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!src) {
    return null;
  }

  const pop = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.55, 1]);
  const rotate = interpolate(pop, [0, 1], [-8, 0]);

  return (
    <Img
      src={staticFile(src)}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        filter: `drop-shadow(0 0 ${size * 0.08}px ${glowColor}aa)`,
      }}
    />
  );
};
