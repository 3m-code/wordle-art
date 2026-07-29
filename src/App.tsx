import "./App.css";
import { useEffect, useState } from "react";

import flowery from "./patterns/Flowery.json";

import { load_pattern  } from "./services/PatternLoader";

import { BoardSolver } from "./solver/BoardSolver";
import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";

import type { Pattern } from "./models/Pattern";
import { WordRow } from "./components/WordRow";

function App() {

    interface ResultWord {
        candidates: string[];
        selected: number;
        pattern: Pattern;
    }


    const [words, set_words] =
        useState<ResultWord[]>([]);


    useEffect(() => {
        async function generate() {
            const response = await fetch("/answer_today.json");

            const data = await response.json();

            const answer = data.answer;

            const board = load_pattern(flowery);

            const dictionary = new Dictionary();
            await dictionary.load();

            const solver = new Solver(dictionary);
            const board_solver = new BoardSolver(solver);

            const result = board_solver.solve(answer, board);

            if (result === null) { return; }

            set_words(
                result.map(
                    (candidates, index) => ({
                        candidates,
                        selected: Math.floor(
                            Math.random() * candidates.length
                        ),
                        pattern: board[index]
                    })
                )
            );
        }

        void generate();
    }, []);

    function reroll(index: number) {
        set_words(current =>
            current.map((item, i) => {
                if (i !== index) {
                    return item;
                }

                let new_selected = Math.floor(Math.random() * item.candidates.length);

                return {
                    ...item,
                    selected: new_selected
                };
            })
        );

    }

    function reroll_all() {
        words.forEach((_, index) => {
            reroll(index);
        });
    }

    return (
        <div>

            <h1>
                Wordle Art
            </h1>

            <button onClick={reroll_all}>
                🎲 Reroll all
            </button>


            {
                words.map(
                    (item, index) => (

                        <WordRow
                            key={index}
                            candidates={item.candidates}
                            selected={item.selected}
                            pattern={item.pattern}
                            on_reroll={() => reroll(index)}
                        />

                    )
                )
            }
        </div>
    );
}


export default App;