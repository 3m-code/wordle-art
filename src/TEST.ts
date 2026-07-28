import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";

import { CellColor } from "./models/CellColor";
import type { Pattern } from "./models/Pattern";

const pattern: Pattern = {
    cells: [
        [
            CellColor.GREEN,
            CellColor.GREEN,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK
        ]
    ]
};
const answer = "LEVEL";

const dictionary = new Dictionary();
await dictionary.load();
const solver = new Solver(dictionary);
const result = solver.solve(answer, pattern);

console.log(result);
