import "./styles/PaintRow.css";
import {PaintCell} from "./PaintCell";

import {CellColor} from "../types/CellColor";
import type {Pattern} from "../types/Pattern";

interface Props {
    pattern: Pattern;
    word: string;
    on_pattern_change: (pattern: Pattern) => void;
    on_reroll: () => void;
}

export function PaintRow(
    {
        pattern,
        word,
        on_pattern_change,
        on_reroll
    }: Props
) {

    const letters = word ? word.split("") : Array(5).fill("");

    function update_cells(index: number) {
        const copy = structuredClone(pattern);
        copy.cells[0][index] = next_cell_color(copy.cells[0][index]);
        on_pattern_change(copy);
    }

    function next_cell_color(color: CellColor): CellColor {
        switch (color) {
            case CellColor.BLACK:
                return CellColor.YELLOW;
            case CellColor.YELLOW:
                return CellColor.GREEN;
            default:
                return CellColor.BLACK;
        }
    }

    return (
        <div className="paint-row">
            {letters.map((letter, col) => (
                <PaintCell
                    key={col}
                    letter={letter}
                    color={pattern.cells[0][col]}
                    on_click={() => update_cells(col)}
                />
            ))}
            <button onClick={on_reroll}>
                🎲 Reroll
            </button>
        </div>
    );
}