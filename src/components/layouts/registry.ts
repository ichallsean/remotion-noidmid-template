import type React from "react";
import type { SlideLayout } from "../../schemas/episode";
import { AnalogySplit } from "./AnalogySplit";
import { CtaOutro } from "./CtaOutro";
import { HookCover } from "./HookCover";
import { SpecCard } from "./SpecCard";
import { StatHighlight } from "./StatHighlight";
import type { SlideLayoutProps } from "./types";

export const LAYOUT_COMPONENTS: Record<
  SlideLayout,
  React.FC<SlideLayoutProps>
> = {
  "hook-cover": HookCover,
  "analogy-split": AnalogySplit,
  "stat-highlight": StatHighlight,
  "spec-card": SpecCard,
  "cta-outro": CtaOutro,
};
