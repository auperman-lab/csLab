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

        const digraphsMap = readData(jsonResponse.digraphs);

        generateDigraphTable(digraphsMap, "Digraphs", 2);

    } catch (e) {
        console.error(e);
    }
}

export async function fetchTrigraphs() {
    try {
        const response = await fetch("/get-trigraphs");
        if (!response.ok) {
            alert("cannot find trigraphs")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();

        const trigraphsMap = readData(jsonResponse.trigraphs)


        generateDigraphTable(trigraphsMap, "Trigraphs", 3);

    } catch (e) {
        console.error(e);
    }
}

export async function fetchDoubles() {
    try {
        const response = await fetch("/get-doubles");
        if (!response.ok) {
            alert("cannot find doubles")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();

        const doublesMap = readData(jsonResponse.doubles);

        generateDigraphTable(doublesMap, "Doubles", 2);

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

function readData(data){

    const dataMap = {}
    data.forEach((item ) => {
        const [standard, output] = Object.entries(item)[0];
        dataMap[standard] = output;
    });
    return dataMap
}
