import { postText } from './fetchHandlers.js';

export function setupEventListeners() {
    const dataForm = document.getElementById("intercept");
    const substituteButton = document.getElementById("substitute");
    const text = document.getElementById("text-input");
    const cipherText = document.getElementById("cipher-text");
    const substituteMap = {};

    dataForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (text.value === "") {
            alert("No text submitted");
            return;
        }

        await postText(text.value);
    });

    substituteButton.addEventListener("click", function (e) {
        e.preventDefault();

        let currentText = text.value.toUpperCase();
        let substitutedText = currentText;

        for (const [key, value] of Object.entries(substituteMap)) {
            const regex = new RegExp(key, 'g');
            substitutedText = substitutedText.replace(regex, value);
        }

        cipherText.innerText = substitutedText;
    });
}
