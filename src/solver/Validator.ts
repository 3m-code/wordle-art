import type { Constraint } from "../models/Constraint";

export class Validator {
    static is_valid(word: string, constraint: Constraint): boolean {
        if (word.length !== 5) {
            return false;
        }

        for (let i = 0; i < 5; i++) {
            const position = constraint.positions[i];

            if (position.required_letter && word[i] !== position.required_letter) {
                return false;
            }

            const letter_mask = create_mask(word[i]);
            const allowed = constraint.positions[i].allowed_mask;

            if ((allowed & letter_mask) === 0) {
                return false;
            }
        }

        return this.check_letter_counts(word, constraint);

    }

    private static check_letter_counts(word: string, constraint: Constraint): boolean {
        const counts: number[] =
            Array(26).fill(0);

        for (const letter of word) {
            const index =
                letter.charCodeAt(0) - 65;
            counts[index]++;
        }

        for(let i = 0; i < 26; i++) {
            const rule =
                constraint.letters[i];
            if(
                counts[i] < rule.min_occurrences
            ) {
                return false;
            }

            if(
                rule.max_occurrences !== null &&
                counts[i] > rule.max_occurrences
            ) {
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