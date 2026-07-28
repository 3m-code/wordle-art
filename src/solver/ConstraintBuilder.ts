import type { Constraint, LetterConstraint } from "../models/Constraint";
import type { Pattern } from "../models/Pattern";
import { CellColor } from "../models/CellColor";

export class ConstraintBuilder {
    static build(answer: string, pattern: Pattern): Constraint {
        const letters = Array.from(answer);

        const letter_constraints: LetterConstraint[] =
            Array.from(
                { length: 26 },
                () => ({
                    min_occurrences: 0,
                    max_occurrences: null
                })
            );

        build_letter_constraints(answer, pattern, letter_constraints);

        const positions = letters.map((letter, index) => {
            const cell = pattern.cells[0][index];

            if (cell === CellColor.GREEN) {

                return {
                    allowed_mask: create_mask([letter]),
                    required_letter: letter
                };

            }

            if (cell === CellColor.YELLOW) {
                return {
                    allowed_mask: create_mask(
                        letters.filter(
                            l => l !== letter
                        )
                    )
                };

            }
            
            return {
                allowed_mask: create_mask(
                    get_alphabet()
                        .filter(
                            l => !letters.includes(l)
                        )
                )
            };

        });
        
        return {
            positions,
            letters: letter_constraints
        };
    }
}

function get_alphabet(): string[] {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

function create_mask(letters: string[]): number {
    let mask = 0;
    for (const letter of letters) {
        const index =
            letter.charCodeAt(0) - 65;
        mask |= (1 << index);
    }
    
    return mask;
}

function build_letter_constraints(answer: string, pattern: Pattern, letter_constraints: LetterConstraint[]): void {
    const counts: Record<string, number> = {};

    for (const letter of answer) {
        counts[letter] =
            (counts[letter] ?? 0) + 1;
    }

    for (const letter in counts) {
        const index =
            letter.charCodeAt(0) - 65;

        letter_constraints[index] = {
            min_occurrences: counts[letter],
            max_occurrences: counts[letter]
        };
    }
}