import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";
import {BoardSolver} from "./solver/BoardSolver.ts";

import { CellColor } from "./models/CellColor";
import type { Board } from "./models/Board.ts";

const answer = "SONAR";

const board: Board = [
    {
    cells: [
        [
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.BLACK
        ]
    ]
}, {
    cells: [
        [
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.YELLOW
        ]
    ]
}, {
    cells: [
        [
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.BLACK
        ]
    ]
}, {
    cells: [
        [
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.BLACK
        ]
    ]
}, {
    cells: [
        [
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK
        ]
    ]
}, {
    cells: [
        [
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.BLACK
        ]
    ]
}];

const dictionary = new Dictionary();
await dictionary.load();
const solver = new Solver(dictionary);
const board_solver = new BoardSolver(solver);

const result = board_solver.solve(answer, board);

console.log(result);