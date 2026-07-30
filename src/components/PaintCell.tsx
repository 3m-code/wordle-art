import "./styles/PaintCell.css";

import {CellColor} from "../types/CellColor";

interface Props {
    color: CellColor;
    letter: string;
    dark_cells: boolean;
    on_click: () => void;
}

export function PaintCell(
    {
        color,
        letter,
        dark_cells,
        on_click
    }: Props
) {

    const display_color = dark_cells && color === CellColor.GREY ? CellColor.BLACK: color;

    return (
        <div
            className={
                "paint-cell " +
                display_color.toLowerCase()
            }
            onClick={on_click}
        >
            {letter}
        </div>
    );
}