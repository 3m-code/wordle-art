import type {Pattern} from "../types/Pattern.ts";
import {CellColor} from "../types/CellColor.ts";

export class WordleEngine {
    static evaluate(answer: string, guess: string): Pattern {
        const answer_letters = Array.from(answer);
        const guess_letters = Array.from(guess);

        const result: CellColor[] = Array(5).fill(CellColor.BLACK);

        const used = Array(5).fill(false);

        // GREEN
        for (let i = 0; i < 5; i++) {
            if (guess_letters[i] === answer_letters[i]) {
                result[i] = CellColor.GREEN;
                used[i] = true;
            }
        }

        // YELLOW
        for (let i = 0; i < 5; i++) {
            if (result[i] === CellColor.GREEN) {
                continue;
            }

            const index = answer_letters.findIndex(
                    (letter, index) =>
                        !used[index] &&
                        letter === guess_letters[i]
                );

            if (index !== -1) {
                result[i] = CellColor.YELLOW;
                used[index] = true;
            }
        }

        return {
            cells: [
                result
            ]
        };
    }
}