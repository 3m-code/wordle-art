import type { Constraint } from "../models/Constraint";

export class Validator {
    static is_valid(
        word: string,
        constraint: Constraint
    ): boolean {
        return true;
    }

}