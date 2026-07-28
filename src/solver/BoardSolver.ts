import type { Board } from "../models/Board";
import { Solver } from "./Solver";

export class BoardSolver {
    private solver: Solver;

    constructor(solver: Solver) {
        this.solver = solver;
    }

    solve(answer: string, board: Board): string[][] {
        const results: string[][] = [];
        for (const pattern of board) {
            const words = this.solver.solve(answer, pattern);

            results.push(words);
        }
        return results;
    }
}