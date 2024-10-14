import {fetchDigraphs, postText, fetchSubstitutions} from './fetchHandlers.js';

export function setupEventListeners() {
    const dataForm = document.getElementById("intercept");
    const substituteButton = document.getElementById("substitute");
    const countDigraphs = document.getElementById("count-digraphs");
    const text = document.getElementById("text-input");
    const cipherText = document.getElementById("cipher-text");
    dataForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (text.value === "") {
            alert("No text submitted");
            return;
        }

        await postText(text.value);
    });

    countDigraphs.addEventListener("click", async function (e) {
        e.preventDefault();

        if (text.value === "") {
            alert("No text submitted");
            return;
        }

        await fetchDigraphs(text.value);

    })


    substituteButton.addEventListener("click", function (e) {
        e.preventDefault();

        let substitutedText = text.value.toUpperCase();
        let substituteMap = fetchSubstitutions();
        console.log(substituteMap);

        for (const [key, value] of Object.entries(substituteMap)) {
            const regex = new RegExp(key, 'g');
            substitutedText = substitutedText.replace(regex, value);
        }

        cipherText.innerText = substitutedText;
    });
}
