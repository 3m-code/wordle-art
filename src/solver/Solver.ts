import { Dictionary } from "./Dictionary";
import { WordleEngine } from "../services/WordleEngine.ts";
import type { Pattern } from "../models/Pattern";

export class Solver {
    private readonly dictionary: Dictionary;

    constructor(dictionary: Dictionary) {
        this.dictionary = dictionary;
    }

    solve(answer: string, expected_pattern: Pattern): string[] {
        const result: string[] = [];

        for (const word of this.dictionary.get_words()) {
            const actual_pattern = WordleEngine.evaluate(answer, word);

            if (this.patterns_equal(actual_pattern, expected_pattern)) {
                result.push(word);
            }
        }
        return result;
    }

    private patterns_equal(a: Pattern, b: Pattern): boolean {
        for (let i = 0; i < 5; i++) {
            if (a.cells[0][i] !== b.cells[0][i]) {
                return false;
            }
        }
        return true;
    }
}