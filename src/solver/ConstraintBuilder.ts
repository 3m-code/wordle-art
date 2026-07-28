import type { Constraint } from "../models/Constraint";
import type { Pattern } from "../models/Pattern";

export class ConstraintBuilder {

    static build(
        answer: string,
        pattern: Pattern
    ): Constraint {
        throw new Error("Not implemented");
    }

}