import type { Board } from "../models/Board";
import { CellColor } from "../models/CellColor";

export function load_pattern(data: any): Board {

    return data.map(
        (pattern: any) => ({
            cells: [
                pattern.cells[0].map(
                    (cell: string) =>
                        CellColor[cell as keyof typeof CellColor]
                )
            ]
        })
    );
}