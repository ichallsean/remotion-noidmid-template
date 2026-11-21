interface ImportMeta {
  webpackContext(
    path: string,
    options?: {
      recursive?: boolean;
      regExp?: RegExp;
      mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once";
    },
  ): { keys(): string[] };
}
