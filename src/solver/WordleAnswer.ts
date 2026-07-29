export class WordleData {
    private answer!: string;
    private date!: string;

    async load(): Promise<void> {
        const response = await fetch("/answer_today.json");
        const data = await response.json();

        this.answer = data.answer;
        this.date = data.date;
    }

    get_answer(): string{
        return this.answer;
    }

    get_date(): string{
        return this.date;
    }


}