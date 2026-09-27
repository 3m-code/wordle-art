import fs from "fs";

const today = new Date();
const date = today.toISOString().split("T")[0];

const url = `https://www.nytimes.com/svc/wordle/v2/${date}.json`;
console.log("Fetching:", url);

const response = await fetch(url);
if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
}

const data = await response.json();
const output = {
    date: data.print_date,
    answer: data.solution.toUpperCase()
};
console.log("Fetched:", output);

const file = "public/answer_today.json";
if (fs.existsSync(file)) {
    const old = JSON.parse(fs.readFileSync(file, "utf8"));

    if (old.date === output.date && old.answer === output.answer) {
        console.log("Answer is already up to date. Nothing to do.");
        process.exit(0);
    }
}

fs.writeFileSync(file, JSON.stringify(output, null, 2));

console.log("Saved today's answer.");