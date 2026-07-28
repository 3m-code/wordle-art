export interface WordleData {
    date: string;
    answer: string;
}

export async function get_wordle(): Promise<WordleData> {
    const response =
        await fetch("/public/answer_today.json");

    return await response.json();
}