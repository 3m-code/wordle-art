import "./App.css";

import { useEffect, useState } from "react";

import type { Board } from "./models/Board";
import { CellColor } from "./models/CellColor";

import { PaintBoard } from "./components/PaintBoard";

import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";
import { BoardSolver } from "./solver/BoardSolver";

import { WordleArt } from "./services/WordleArt";


function App() {


    const [board, set_board] =
        useState<Board>(
            create_empty_board()
        );


    const [words, set_words] =
        useState<string[]>([]);



    useEffect(() => {

        async function init() {


            const dictionary =
                new Dictionary();


            await dictionary.load();



            const solver =
                new Solver(dictionary);



            const board_solver =
                new BoardSolver(solver);



            const wordle_art =
                new WordleArt(
                    board_solver
                );


            await wordle_art.init();



            const result =
                wordle_art.generate(board);


            if (result === null) {
                set_words([]);
                return;
            }


            set_words(
    result.map(
        candidates =>
            candidates[
                Math.floor(
                    Math.random() * candidates.length
                )
            ]
    )
);

        }


        void init();


    }, []);




    async function update_board(new_board: Board) {

        set_board(new_board);


        const dictionary =
            new Dictionary();


        await dictionary.load();



        const solver =
            new Solver(dictionary);



        const board_solver =
            new BoardSolver(solver);



        const wordle_art =
            new WordleArt(
                board_solver
            );


        await wordle_art.init();



        const result =
            wordle_art.generate(
                new_board
            );

        if (result === null) {
            set_words([]);
            return;
        }
        set_words(
    result.map(
        candidates =>
            candidates[
                Math.floor(
                    Math.random() * candidates.length
                )
            ]
    )
);

    }




    function create_empty_board(): Board {

        return Array.from(
            { length: 6 },
            () => ({
                cells: [
                    Array(5)
                        .fill(CellColor.BLACK)
                ]
            })
        );

    }



    return (

        <div>

            <h1>
                Wordle Art
            </h1>


            <PaintBoard
                board={board}
                words={words}
                on_change={update_board}
            />


            {
                words.map(
                    (candidates,index)=>(

                        <div key={index}>

                            {candidates[0] ?? "brak"}

                        </div>

                    )
                )
            }


        </div>

    );
}


export default App;