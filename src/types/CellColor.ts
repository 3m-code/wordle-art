export const CellColor = {
    BLACK:  "BLACK",
    GREY: "GREY",
    YELLOW: "YELLOW",
    GREEN: "GREEN",
} as const;

export type CellColor =
    typeof CellColor[keyof typeof CellColor];