const informalToFormal = {
  "hi": "hello",
  "hey": "greetings",
  "yo": "good afternoon",
  "sup": "good evening",
  "what's up": "how do you do",
  "howdy": "good day",
  "bye": "goodbye",
  "byee": "goodbye",
  "cya": "see you later",
  "later": "farewell"
};

const formalToInformal = Object.fromEntries(
  Object.entries(informalToFormal).map(([k, v]) => [v, k])
);

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : 1 + Math.min(
            matrix[i - 1][j],
            matrix[i][j - 1],
            matrix[i - 1][j - 1]
          );
    }
  }
  return matrix[a.length][b.length];
}

function autoCorrect(word, dict) {
  let closest = null;
  let minDist = Infinity;
  for (const key of Object.keys(dict)) {
    const dist = levenshtein(word, key);
    if (dist < minDist && dist <= 2) {
      minDist = dist;
      closest = key;
    }
  }
  return closest;
}

function translate(mode) {
  const input = document.getElementById('inputText').value.trim().toLowerCase();
  const output = document.getElementById('outputText');
  const popup = document.getElementById('listPopup');

  if (input === "list") {
    showWordList();
    output.textContent = "";
    return;
  } else {
    closePopup();
  }

  const dict = mode === "formal" ? informalToFormal : formalToInformal;
  let corrected = input in dict ? input : autoCorrect(input, dict);

  if (corrected && dict[corrected]) {
    let result = dict[corrected];
    if (corrected !== input) {
      result += ` (corrected from "${input}")`;
    }
    output.textContent = result;
  } else {
    output.textContent = "❌ ERROR: Greeting not recognized!";
  }
}

function showWordList() {
  const popup = document.getElementById('listPopup');
  const popupContent = document.getElementById('popupContent');
  popupContent.innerHTML = "";

  Object.entries(informalToFormal).forEach(([informal, formal]) => {
    const row = document.createElement("div");
    const informalDiv = document.createElement("div");
    informalDiv.textContent = informal;
    const formalDiv = document.createElement("div");
    formalDiv.textContent = formal;
    row.appendChild(informalDiv);
    row.appendChild(formalDiv);
    popupContent.appendChild(row);
  });

  popup.classList.remove("hidden");
}

function closePopup() {
  const popup = document.getElementById('listPopup');
  popup.classList.add("hidden");
}
