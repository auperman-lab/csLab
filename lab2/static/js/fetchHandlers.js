import { generateFrequencyTable } from './utils.js';

export async function fetchFrequencies() {
    try {
        const response = await fetch("/get-frequencies");
        if (!response.ok) {
            alert("cannot find frequencies")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();

        const letters = jsonResponse.letters;

        const letterCount = {};
        const letterFrequency = {};

        letters.forEach(({ letter, frequency, count }) => {
            letterCount[letter] = count;
            letterFrequency[letter] = frequency;
        });


        generateFrequencyTable(letterCount, letterFrequency);

    } catch (e) {
        console.error(e);
    }
}

export async function postText(text) {
    try {
        const response = await fetch("/set", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        if (response.ok) {
            await fetchFrequencies();
        }
    } catch (e) {
        alert("Not valid text input");
        console.error(e);
    }
}
