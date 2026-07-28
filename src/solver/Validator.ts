import type { Constraint } from "../models/Constraint";

export class Validator {
    static is_valid(word: string, constraint: Constraint): boolean {
        if (word.length !== 5) {
            return false;
        }

        for (let i = 0; i < 5; i++) {
            const letter_mask =
                create_mask(word[i]);

            const allowed =
                constraint
                    .positions[i]
                    .allowedMask;

            if ((allowed & letter_mask) === 0) {
                return false;
            }
        }
        return true;
    }
}

function create_mask(letter: string): number {
    const index =
        letter.charCodeAt(0) - 65;

    return 1 << index;
}