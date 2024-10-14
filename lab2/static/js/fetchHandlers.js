import {generateDigraphTable, generateFrequencyTable, substituteMapFetcher} from './utils.js';

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

export async function fetchDigraphs() {
    try {
        const response = await fetch("/get-digraphs");
        if (!response.ok) {
            alert("cannot find digraphs")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();

        const digraphs = jsonResponse.digraphs;

        const digraphsMap = {};

        digraphs.forEach(({ standard, output }) => {
            digraphsMap[standard] = output;
        });


        generateDigraphTable(digraphsMap);

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

export  function fetchSubstitutions() {
    return substituteMapFetcher();

}
