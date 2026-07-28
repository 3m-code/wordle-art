import type { Constraint } from "../models/Constraint";
import type { Pattern } from "../models/Pattern";
import { CellColor } from "../models/CellColor";

export class ConstraintBuilder {
    static build(answer: string, pattern: Pattern): Constraint {
        const letters = Array.from(answer);
        const positions = letters.map((letter, index) => {
            const cell = pattern.cells[0][index];
            if (cell === CellColor.YELLOW) {
                return {
                    allowedMask: create_mask(
                        letters.filter(
                            l => l !== letter
                        )
                    )
                };

            }
            
            return {
                allowedMask: create_mask(
                    get_alphabet()
                        .filter(
                            l => !letters.includes(l)
                        )
                )
            };

        });
        
        return {
            positions,
            letters: []
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