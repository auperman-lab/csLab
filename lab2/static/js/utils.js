export function generateFrequencyTable(letterCount, letterFrequency) {
    const table = document.createElement("table");
    const title = document.createElement("h2");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    title.textContent = "Frequencies";

    const letterRow = document.createElement("tr");
    const countRow = document.createElement("tr");
    const frequencyRow = document.createElement("tr");
    const inputRow = document.createElement("tr");

    const letterHeader = document.createElement("th");
    letterHeader.textContent = "Letter";
    letterRow.appendChild(letterHeader);

    const countHeader = document.createElement("th");
    countHeader.textContent = "Count";
    countRow.appendChild(countHeader);

    const frequencyHeader = document.createElement("th");
    frequencyHeader.textContent = "Frequency";
    frequencyRow.appendChild(frequencyHeader);

    const inputHeader = document.createElement("th");
    inputHeader.textContent = "Edit Values";
    inputRow.appendChild(inputHeader);

    for (const letter in letterCount) {
        const letterCell = document.createElement("td");
        letterCell.textContent = letter;
        letterCell.classList.add("letter-cell");
        letterRow.appendChild(letterCell);

        const countCell = document.createElement("td");
        countCell.textContent = letterCount[letter];
        countRow.appendChild(countCell);

        const frequencyCell = document.createElement("td");
        frequencyCell.textContent = letterFrequency[letter].toFixed(2);
        frequencyRow.appendChild(frequencyCell);

        const inputCell = document.createElement("td");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.maxLength = 1;
        inputCell.appendChild(inputField);
        inputRow.appendChild(inputCell);

        inputField.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-z]/g, '');
            updateLetter(letterCell.textContent, e.target.value);
        });
    }

    table.appendChild(letterRow);
    table.appendChild(countRow);
    table.appendChild(frequencyRow);
    table.appendChild(inputRow);

    const frequenciesOutput = document.getElementById("frequencies-output");
    frequenciesOutput.innerHTML = "";
    frequenciesOutput.appendChild(title);
    frequenciesOutput.appendChild(table);
}

export function updateLetter(letter, newValue) {
    if (letter) {
        substituteMap[letter.toUpperCase()] = newValue;
    }
}
