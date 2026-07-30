import type { Board } from "../models/Board";
import { PaintRow } from "./PaintRow";
import type {Pattern} from "../models/Pattern.ts";

interface Props {
    board: Board;
    words: string[];
    on_row_change: (row: number, pattern: Pattern) => void;
    on_row_reroll: (row: number) => void;
}

export function PaintBoard(
    {
        board,
        words,
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