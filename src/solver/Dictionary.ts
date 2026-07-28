export class Dictionary {

    private words: string[] = [];
    async load(): Promise<void> {

        const response =
            await fetch("/dictionary.txt");

        const text =
            await response.text();

        this.words =
            text
                .split("\n")
                .map(w => w.trim().toUpperCase())
                .filter(Boolean);
    }

    get_words(): string[] {
        return this.words;
    }

}