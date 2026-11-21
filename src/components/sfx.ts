import type { Sfx } from "../schemas/episode";

type SfxContext = {
  readonly keys: () => string[];
};

const sfxContext: SfxContext = import.meta.webpackContext("../../public/sfx", {
  recursive: false,
  regExp: /\.mp3$/,
  mode: "eager",
});

export const AVAILABLE_SFX: ReadonlySet<Sfx> = new Set(
  sfxContext.keys().map(
    (key) => key.replace(/^\.\//, "").replace(/\.mp3$/, "") as Sfx,
  ),
);

export const isSfxAvailable = (sfx: Sfx | undefined): sfx is Sfx =>
  sfx !== undefined && sfx !== "none" && AVAILABLE_SFX.has(sfx);
