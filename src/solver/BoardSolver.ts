import type { Board } from "../models/Board";
import type {Pattern} from "../models/Pattern.ts";

import { Solver } from "./Solver";

export class BoardSolver {
    private solver: Solver;

    constructor(solver: Solver) {
        this.solver = solver;
    }

    solve(answer: string, board: Board): string[][] | null{
        const results: string[][] = [];

        for (const pattern of board) {
            const words: string[] = this.solver.solve(answer, pattern);

            results.push(words);
        }
        return results;
    }

    solve_row(answer: string, pattern: Pattern): string[]{
        return this.solver.solve(answer, pattern);
    }
}