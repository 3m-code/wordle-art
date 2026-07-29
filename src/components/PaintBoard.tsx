import type { Board } from "../models/Board";
import { CellColor } from "../models/CellColor";

import { PaintCell } from "./PaintCell";


interface Props {
    board: Board;
    words: string[];
    on_change: (board: Board) => void;
}


export function PaintBoard(
    {
        board,
        words,
        on_change
    }: Props
) {


    function next_color(
        color: CellColor
    ): CellColor {

        switch(color) {
            case CellColor.BLACK: return CellColor.YELLOW;
            case CellColor.YELLOW: return CellColor.GREEN;
            default: return CellColor.BLACK;
        }
    }


    function update_cell(row: number, col: number) {
        const copy = structuredClone(board);

        copy[row].cells[0][col] = next_color(copy[row].cells[0][col]);

        on_change(copy);
    }


    return (
        <div className="paint-board">

            {
                board.map(
                    (pattern, row) => (

                        <div
                            className="paint-row"
                            key={row}
                        >

                            {
                                pattern.cells[0]
                                    .map(
                                        (color, col) => (

                                            <PaintCell
                                                color={color}
                                                letter={words[col]}
                                                on_click={() => update_cell(row, col)
                                                }
                                            />

                                        )
                                    )
                            }

                        </div>

                    )
                )
            }

        </div>
    );
}