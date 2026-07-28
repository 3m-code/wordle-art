import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";
import { ConstraintBuilder } from "./solver/ConstraintBuilder";

import { CellColor } from "./models/CellColor";
import type { Pattern } from "./models/Pattern";

const pattern: Pattern = {
    cells: [
        [
            CellColor.BLACK,
            CellColor.YELLOW,
            CellColor.BLACK,
            CellColor.BLACK,
            CellColor.BLACK
        ]
    ]
};

const constraint =
    ConstraintBuilder.build(
        "LOGAN",
        pattern
    );

console.log(
    JSON.stringify(
        constraint,
        null,
        2
    )
);

const dictionary = new Dictionary();
await dictionary.load();
const solver = new Solver(dictionary);
const result = solver.solve(constraint);

console.log(result);