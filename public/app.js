document.getElementById("wordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found!");

    const data = await response.json();
    const entry = data[0];
    
    let html = `
      <h2>${entry.word}</h2>
      <p><em>${entry.phonetic || "No phonetic available"}</em></p>
    `;

    entry.meanings.forEach((meaning) => {
      html += `
        <h3>${meaning.partOfSpeech}</h3>
        <ul>
          ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join("")}
        </ul>
      `;
    });

    resultDiv.innerHTML = html;
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">${err.message}</p>`;
  }
});
