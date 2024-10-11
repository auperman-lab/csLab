let dataForm = document.getElementById("intercept");
let subtituteButton = document.getElementById("subtitute");
let text = document.getElementById("text-input");
let cipherText = document.getElementById("cipher-text");

dataForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (text.value === ""){
        alert("no text submitted");
    }else{
        console.log("data:", data.value);
    }


    try {
      const response = await fetch("/set", {
        method: "POST",
          headers: {
                  'Content-Type': 'application/json',
              },
        body: JSON.stringify({text :data.value}),
      })
      if (response.ok) {
        fetchFrequencies()
      }

    } catch (e) {
      alert("not valid text input")
      console.error(e);
    }

})

async function fetchFrequencies() {
    try {
        const response = await fetch("/get-frequencies");
        if (!response.ok) {
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

        console.log("Deserialized letterCount:", letterCount);
        console.log("Deserialized letterFrequency:", letterFrequency);

        generateFrequencyTable(letterCount, letterFrequency)

    } catch (e) {
        console.error(e);
    }
}

function generateFrequencyTable(letterCount, letterFrequency) {
    const table = document.createElement("table");
    const title = document.createElement("h2");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Set the text for the title
    title.textContent = "Frequencies";

    // Create rows for each property (Letter, Count, Frequency)
    const letterRow = document.createElement("tr");
    const countRow = document.createElement("tr");
    const frequencyRow = document.createElement("tr");
    const inputRow = document.createElement("tr");

    // Add headers for each row
    const letterHeader = document.createElement("th");
    letterHeader.textContent = "Letter";
    letterHeader.style.border = "1px solid #ddd";
    letterHeader.style.padding = "8px";
    letterRow.appendChild(letterHeader);

    const countHeader = document.createElement("th");
    countHeader.textContent = "Count";
    countHeader.style.border = "1px solid #ddd";
    countHeader.style.padding = "8px";
    countRow.appendChild(countHeader);

    const frequencyHeader = document.createElement("th");
    frequencyHeader.textContent = "Frequency";
    frequencyHeader.style.border = "1px solid #ddd";
    frequencyHeader.style.padding = "8px";
    frequencyRow.appendChild(frequencyHeader);

    const inputHeader = document.createElement("th");
    inputHeader.textContent = "Edit Values";
    inputHeader.style.border = "1px solid #ddd";
    inputHeader.style.padding = "8px";
    inputRow.appendChild(inputHeader);

    // Add data cells for each letter in the appropriate row
    for (const letter in letterCount) {
        // Letter cell
        const letterCell = document.createElement("td");
        letterCell.textContent = letter;
        letterCell.style.border = "1px solid #ddd";
        letterCell.style.padding = "8px";
        letterCell.classList.add("letter-cell");
        letterRow.appendChild(letterCell);

        // Count cell
        const countCell = document.createElement("td");
        countCell.textContent = letterCount[letter];
        countCell.style.border = "1px solid #ddd";
        countCell.style.padding = "8px";
        countRow.appendChild(countCell);

        // Frequency cell
        const frequencyCell = document.createElement("td");
        frequencyCell.textContent = letterFrequency[letter].toFixed(2); // Format frequency to 2 decimal places
        frequencyCell.style.border = "1px solid #ddd";
        frequencyCell.style.padding = "8px";
        frequencyRow.appendChild(frequencyCell);

        // Input cell
        const inputCell = document.createElement("td");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.maxLength = 1;
        inputField.style.width = "50%";
        inputField.style.padding = "2px";
        inputCell.style.border = "1px solid #ddd";
        inputCell.style.padding = "8px";
        inputCell.appendChild(inputField);
        inputRow.appendChild(inputCell);

        // Add an event listener to update the letter when the input value changes
        inputField.addEventListener("input", (e) => {
            updateLetter(letterCell, e.target.value);
        });
    }

    // Append all rows to the table
    table.appendChild(letterRow);
    table.appendChild(countRow);
    table.appendChild(frequencyRow);
    table.appendChild(inputRow);

    // Append the title and table to the frequencies output area
    const frequenciesOutput = document.getElementById("frequencies-output");
    frequenciesOutput.innerHTML = ""; // Clear previous content
    frequenciesOutput.appendChild(title);
    frequenciesOutput.appendChild(table);
}

subtituteButton.addEventListener("click", async function (e) {
  e.preventDefault();
  cipherText.innerText = text;


})

// Function to update the letter cell based on the input value
function updateLetter(letterCell, newValue) {
    letterCell.textContent = newValue;
}

