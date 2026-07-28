import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";
import {BoardSolver} from "./solver/BoardSolver.ts";

import type { Board } from "./models/Board.ts";
import { load_pattern } from "./services/PatternLoader";

import pattern_data from "./patterns/Flowery.json";
const answer = "SONAR";

const board: Board = load_pattern(pattern_data);

const dictionary = new Dictionary();
await dictionary.load();
const solver = new Solver(dictionary);
const board_solver = new BoardSolver(solver);

const result = board_solver.solve(answer, board);

console.log(result);