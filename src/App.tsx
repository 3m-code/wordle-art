import "./App.css";

import {useEffect, useState} from "react";

import type {Board} from "./types/Board";
import {CellColor} from "./types/CellColor";
import type {Pattern} from "./types/Pattern.ts";

import {PaintBoard} from "./components/PaintBoard";

import {Dictionary} from "./solver/Dictionary";
import {Solver} from "./solver/Solver";
import {BoardSolver} from "./solver/BoardSolver";

import {WordleArt} from "./services/WordleArt";
import {load_pattern} from "./services/PatternLoader.ts";

import empty from "./patterns/Empty.json";
import flowery from "./patterns/Flowery.json";
import green_flowery from "./patterns/GreenFlowery.json";

import flowery_sound from "/sounds/Flowery_voiceclip_Flowery_2.wav"

function App() {
    const [wordle_art, set_wordle_art] = useState<WordleArt>();
    const [board, set_board] = useState<Board>(create_empty_board());
    const [candidates, set_candidates] = useState<string[][]>([]);
    const [words, set_words] = useState<string[]>([]);

    const [current_pattern, set_current_pattern] = useState(0);
    const patterns_flowery = [flowery, green_flowery];

    useEffect(() => {
        async function init() {
            const wordle_art = await create_wordle_art();
            set_wordle_art(wordle_art);
            update_board(board, wordle_art);
        }

        void init();
    }, []);

    async function create_wordle_art() {
        const dictionary = new Dictionary();
        await dictionary.load();

        const solver = new Solver(dictionary);
        const board_solver = new BoardSolver(solver);

        const art = new WordleArt(board_solver);
        await art.init();

        return art;
    }

    function get_random_word(words: string[]): string {
        if (words.length <= 0) return "";
        return words[Math.floor(Math.random() * words.length)];
    }

    function create_empty_board(): Board {
        return Array.from(
            {length: 6},
            () => ({
                cells: [
                    Array(5)
                        .fill(CellColor.BLACK)
                ]
            })
        );
    }

    function clear_board() {
        const empty_board = load_pattern(empty);
        update_board(empty_board);
    }

    function update_board(new_board: Board, art: WordleArt = wordle_art!) {
        set_board(new_board);

        if (!art) return;

        const result = art.generate(new_board);

        if (!result) {
            set_candidates([]);
            set_words([]);
            return;
        }

        set_candidates(result);
        set_words(result.map(get_random_word));
    }

    function update_word(row: number, row_candidates: string[]) {
        set_words(current => {
            const copy = [...current];
            copy[row] = get_random_word(row_candidates);
            return copy;
        });
    }

    function update_candidates(row: number, row_candidates: string[]) {
        set_candidates(current => {
            const copy = [...current];
            copy[row] = row_candidates;
            return copy;
        });
    }

    function update_row(row: number, pattern: Pattern) {
        const new_board = [...board];
        new_board[row] = pattern;

        set_board(new_board);

        if (!wordle_art) return;

        const row_candidates = wordle_art.solve_row(pattern);

        update_candidates(row, row_candidates);
        update_word(row, row_candidates);
    }

    function reroll(row: number) {
        const row_candidates = candidates[row];

        if (!row_candidates || row_candidates.length === 0) {
            return;
        }

        update_word(row, row_candidates)
    }

    function reroll_all() {
        words.forEach((_, index) => {
            reroll(index);
        });
    }

    function change_flowery_pattern() {
        const next_pattern = (current_pattern + 1) % patterns_flowery.length;
        set_current_pattern(next_pattern);
        const new_board = load_pattern(patterns_flowery[next_pattern]);
        update_board(new_board);
    }

    function play_flowery_sound() {
        const audio = new Audio(flowery_sound);
        audio.play();
    }


    return (

        <div>

            <h1>
                Wordle Art
            </h1>
            <button onClick={clear_board}>
                🧹 Clear the board
            </button>
            <button onClick={reroll_all}>
                🎲 Reroll all
            </button>
            <button onClick={() => {
                play_flowery_sound();
                change_flowery_pattern();
            }}
            >
                🌸 Flowery
            </button>


            <PaintBoard
                board={board}
                words={words}
                on_row_change={update_row}
                on_row_reroll={reroll}
            />
        </div>
    );
}


export default App;