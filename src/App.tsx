import { useEffect, useState } from "react";

import flowery from "./patterns/Flowery.json";

import { load_pattern  } from "./services/PatternLoader";

import { BoardSolver } from "./solver/BoardSolver";
import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";


function App() {

    const [words, set_words] =
        useState<string[]>([]);


    useEffect(() => {

        async function generate() {

            const response =
                await fetch("/answer_today.json");


            const data =
                await response.json();


            const answer =
                data.answer;


            const board =
                load_pattern(flowery);


            const dictionary =
                new Dictionary();


            await dictionary.load();


            const solver =
                new Solver(dictionary);


            const board_solver =
                new BoardSolver(
                    solver
                );


            const result =
                board_solver.solve(
                    answer,
                    board
                );


            set_words(result);

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
                    (word, index) => (
                        <div key={index}>
                            {word}
                        </div>
                    )
                )
            }

        </div>
    );
}


export default App;