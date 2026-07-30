import "./App.css";

import { useEffect, useState } from "react";

import type { Board } from "./models/Board";
import { CellColor } from "./models/CellColor";

import { PaintBoard } from "./components/PaintBoard";

import { Dictionary } from "./solver/Dictionary";
import { Solver } from "./solver/Solver";
import { BoardSolver } from "./solver/BoardSolver";

import { WordleArt } from "./services/WordleArt";
import type {Pattern} from "./models/Pattern.ts";


function App() {

    const [wordle_art, set_wordle_art] = useState<WordleArt>();
    const [board, set_board] = useState<Board>(create_empty_board());

    const [candidates, set_candidates] = useState<string[][]>([]);

    const [words, set_words] = useState<string[]>([]);



    useEffect(() => {

        async function init() {

            const dictionary = new Dictionary();
            await dictionary.load();

            const solver = new Solver(dictionary);

            const board_solver = new BoardSolver(solver);

            const wordle_art = new WordleArt(board_solver);
            await wordle_art.init();
            set_wordle_art(wordle_art);

            const result = wordle_art.generate(board);


            if (result === null) {
                set_candidates([]);
                set_words([]);
                return;
            }

            set_candidates(result);
            set_words(
    result.map(
        row_candidates =>
            row_candidates[
                Math.floor(
                    Math.random() * row_candidates.length
                )
            ]
    )
);

        }


        void init();


    }, []);


    function random_word(words: string[]): string {
        return words[Math.floor(Math.random() * words.length)];
    }

    async function update_row(row: number, pattern: Pattern) {

        const new_board = [...board];
        new_board[row] = pattern;

        set_board(new_board);

        if(!wordle_art) return;

        const row_candidates = wordle_art.solve_row(pattern);

        set_candidates(current=>{

            const copy=[...current];

            copy[row]=row_candidates;

            return copy;

        });


        set_words(current=>{

            const copy=[...current];

            copy[row]=random_word(row_candidates);

            return copy;

        });
    }


    function reroll(row: number) {
            const row_candidates = candidates[row];

            if (!row_candidates || row_candidates.length === 0) {
                return;
            }

        set_words(current=>{

            const copy=[...current];

            copy[row] =
                row_candidates[
                    Math.floor(
                        Math.random()
                        *
                        row_candidates.length
                    )
                    ];

            return copy;

        });
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
                on_row_change={update_row}
                on_row_reroll={reroll}
            />


            {
                words.map(
                    (word,index)=>(

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