import "./styles/PaintCell.css";

import {CellColor} from "../types/CellColor";

interface Props {
    color: CellColor;
    letter: string;
    on_click: () => void;
}

export function PaintCell(
    {
        color,
        letter,
        on_click
    }: Props
) {

    return (
        <div
            className={
                "paint-cell " +
                color.toLowerCase()
            }
            onClick={on_click}
        >
            {letter}
        </div>
    );
}