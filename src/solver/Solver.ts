import { Dictionary } from "./Dictionary";
import type { Constraint } from "../models/Constraint";
import { Validator } from "./Validator";

export class Solver {
    private dictionary: Dictionary;

    constructor(dictionary: Dictionary) {
        this.dictionary = dictionary;
    }

    solve(
        constraint: Constraint
    ): string[] {

        return this.dictionary
            .get_words()
            .filter(word =>
                Validator.is_valid(
                    word,
                    constraint
                )
            );
    }
}