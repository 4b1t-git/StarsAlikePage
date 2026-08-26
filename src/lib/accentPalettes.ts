export const ACCENT_CYCLE_MS = 11_000;
export const ACCENT_SWEEP_FRACTION = 0.75;
export const ACCENT_SELECTION_MS = 900;

/** Exact accent order and values used by the Android app's AccentPalettes. */
export const ACCENT_PALETTES = [
  { id: "turquoise", name: "Turquesa", color: "#40E0D0" },
  { id: "rose", name: "Rosa", color: "#E38AA8" },
  { id: "aurora", name: "Aurora", color: "#4FD89B" },
  { id: "solar", name: "Solar", color: "#E6B24A" },
  { id: "lavender", name: "Lavanda", color: "#B392E6" },
  { id: "coral", name: "Coral", color: "#FF9E6B" },
  { id: "ice", name: "Hielo", color: "#6FA8FF" },
] as const;

export type AccentPaletteId = (typeof ACCENT_PALETTES)[number]["id"];
