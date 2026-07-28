import { readFile } from "node:fs/promises";

export class Dictionary {
    private words: string[] = [];

    async load(): Promise<void> {
        const text =
            await readFile(
                "public/allowed_guesses.txt",
                "utf-8"
            );

        this.words =
            text
                .split("\n")
                .map(word =>
                    word.trim().toUpperCase()
                )
                .filter(Boolean);
    }

    get_words(): string[] {
        return this.words;
    }
}