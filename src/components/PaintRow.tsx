import "./styles/PaintRow.css";
import {PaintCell} from "./PaintCell";

import {CellColor} from "../types/CellColor";
import type {Pattern} from "../types/Pattern";

interface Props {
    pattern: Pattern;
    word: string;
    dark_cells: boolean;
    on_pattern_change: (pattern: Pattern) => void;
    on_reroll: () => void;
}

export function PaintRow(
    {
        pattern,
        word,
        dark_cells,
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
            case CellColor.GREY:
                return CellColor.YELLOW;
            case CellColor.YELLOW:
                return CellColor.GREEN;
            default:
                return CellColor.GREY;
        }
    }

    return (
        <div className="paint-row">
            {letters.map((letter, col) => (
                <PaintCell
                    key={col}
                    letter={letter}
                    color={pattern.cells[0][col]}
                    dark_cells={dark_cells}
                    on_click={() => update_cells(col)}
                />
            ))}
            <button onClick={on_reroll}>
                🎲 Reroll
            </button>
        </div>
    );
}