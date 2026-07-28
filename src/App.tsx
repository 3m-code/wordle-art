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
        word: string;
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

            set_words(
                result.map(
                    (word, index) => ({
                        word,
                        pattern: board[index]
                    })
                )
            );
        }

        generate();
    }, []);


    return (
        <div>

            <h1>
                Wordle Art
            </h1>


            {
                words.map(
                    (item, index) => (

                        <WordRow
                            key={index}
                            word={item.word}
                            pattern={item.pattern}
                        />

                    )
                )
            }

        </div>
    );
}


export default App;