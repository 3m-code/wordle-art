import type { Board } from "../models/Board";
import { Solver } from "./Solver";

export class BoardSolver {
    private solver: Solver;

    constructor(solver: Solver) {
        this.solver = solver;
    }

    solve(answer: string, board: Board): string[] | null{
        const results: string[] = [];

        for (const pattern of board) {
            const word: string = this.solver.solve(answer, pattern);

            if (word === null) {return null;}

            results.push(word);
        }
        return results;
    }
}