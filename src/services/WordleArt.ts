import type {Board} from "../types/Board";
import type {Pattern} from "../types/Pattern";

import {BoardSolver} from "../solver/BoardSolver";
import {WordleData} from "../solver/WordleAnswer";

export class WordleArt {
    private wordle_data = new WordleData();
    private board_solver: BoardSolver;

    constructor(board_solver: BoardSolver) {
        this.board_solver = board_solver;
    }

    async init() {
        await this.wordle_data.load();
    }

    generate(board: Board): string[][] | null {
        const answer = this.wordle_data.get_answer();
        const candidates = this.board_solver.solve(answer, board);
        if (!candidates) return null;

        return candidates;
    }

    solve_row(pattern: Pattern): string[] {
        const answer = this.wordle_data.get_answer();
        return this.board_solver.solve_row(answer, pattern);
    }
}