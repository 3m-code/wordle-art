export const CellColor = {
  BLACK: "BLACK",
  YELLOW: "YELLOW",
  //GREEN: "GREEN",
} as const;

export type CellColor =
    typeof CellColor[keyof typeof CellColor];