import type { Pattern } from "../models/Pattern";


interface Props {
    candidates: string[];
    selected: number;
    pattern: Pattern;
    on_reroll: () => void;
}


export function WordRow(
    {
        candidates,
        selected,
        pattern,
        on_reroll
    }: Props
) {

    const word = candidates[selected];

    const letters = word.split("");


    return (
        <div className="word-container">
            <div className="word-row">
                {letters.map((letter, index) => (
                    <div
                        key={index}
                        className={
                            "cell " +
                            pattern.cells[0][index].toLowerCase()
                        }
                    >
                        {letter}
                    </div>
                ))}
            </div>

            <button className = "reroll-button" onClick={on_reroll}>
                Reroll
            </button>
        </div>
    );
}