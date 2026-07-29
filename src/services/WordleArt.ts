import { BoardSolver } from "../solver/BoardSolver";
import type { Board } from "../models/Board";

import { WordleData } from "../solver/WordleAnswer";

export class WordleArt {

    private wordle_data = new WordleData();
    private board_solver: BoardSolver;

    constructor(board_solver: BoardSolver) {
        this.board_solver = board_solver;
    }

    async init() {
        await this.wordle_data.load();
    }

    generate(board: Board) {
        const answer = this.wordle_data.get_answer();

        const candidates = this.board_solver.solve(answer, board);

        if (candidates === null) {
            return null;
        }


        return candidates.map(
            words => {
                if(words.length === 0){
                    return "";
                }
                return words[Math.floor(Math.random() * words.length)];
            }
        );
    }
}