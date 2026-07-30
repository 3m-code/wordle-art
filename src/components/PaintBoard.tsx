import "./styles/PaintBoard.css";
import {PaintRow} from "./PaintRow";

import type {Pattern} from "../types/Pattern.ts";
import type {Board} from "../types/Board";

interface Props {
    board: Board;
    words: string[];
    dark_cells: boolean;
    on_row_change: (row: number, pattern: Pattern) => void;
    on_row_reroll: (row: number) => void;
}

export function PaintBoard(
    {
        board,
        words,
        dark_cells,
        on_row_change,
        on_row_reroll
    }: Props
) {

    return (
        <div className="paint-board">
            {board.map((pattern, row) => (
                <PaintRow
                    key={row}
                    pattern={pattern}
                    word={words[row] ?? "     "}
                    dark_cells={dark_cells}
                    on_pattern_change={
                        new_pattern =>
                            on_row_change(
                                row,
                                new_pattern
                            )
                    }
                    on_reroll={() => on_row_reroll(row)}
                />

            ))}
        </div>
    );
}