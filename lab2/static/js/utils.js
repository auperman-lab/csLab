let substituteMap = {}

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

export function generateDigraphTable(graphFrequency, graphType, maxLength) {
    const table = document.createElement("table");
    const title = document.createElement("h2");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    title.textContent = graphType + " Frequencies";

    const graphRow = document.createElement("tr");
    const outputRow = document.createElement("tr");
    const inputRow = document.createElement("tr");

    const graphHeader = document.createElement("th");
    graphHeader.textContent = graphType;
    graphRow.appendChild(graphHeader);

    const outputHeader = document.createElement("th");
    outputHeader.textContent = "Most Common Found " + graphType;
    outputRow.appendChild(outputHeader);

    const inputHeader = document.createElement("th");
    inputHeader.textContent = "Edit Values";
    inputRow.appendChild(inputHeader);

    for (const graphFrequencyKey in graphFrequency) {
        const standardCell = document.createElement("td");
        standardCell.textContent = graphFrequencyKey;
        standardCell.classList.add("letter-cell");
        graphRow.appendChild(standardCell);

        const outputCell = document.createElement("td");
        outputCell.textContent = graphFrequency[graphFrequencyKey];
        outputRow.appendChild(outputCell);

        const inputCell = document.createElement("td");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.maxLength = maxLength;
        inputCell.minLength = maxLength;
        inputCell.appendChild(inputField);
        inputRow.appendChild(inputCell);

        inputField.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-z]/g, '');
            updateLetter(outputCell.textContent, e.target.value);
        });
    }

    table.appendChild(graphRow);
    table.appendChild(outputRow);
    table.appendChild(inputRow);

    const frequenciesOutput = document.getElementById("frequencies-output");
    frequenciesOutput.innerHTML = "";
    frequenciesOutput.appendChild(title);
    frequenciesOutput.appendChild(table);
}

export function updateLetter(letterPair, newValue) {
    if (newValue) {
        if(letterPair.length === 1){
            substituteMap[letterPair.toUpperCase()] = newValue;
        }
        else if(letterPair.length === 2 && newValue.length === 2) {
            substituteMap[letterPair.toUpperCase()] = newValue;
        }
    }else{
        substituteMap[letterPair.toUpperCase()] = letterPair.toUpperCase();
    }
}

export function substituteMapFetcher(){
    return substituteMap;
}
