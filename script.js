const informalToFormal = {
  "hi": "hello",
  "hey": "greetings",
  "bye": "goodbye",
  "byee": "goodbye",
  "cya": "see you later",
  "yo": "good afternoon"
};

const formalToInformal = {};
for (const key in informalToFormal) {
  formalToInformal[informalToFormal[key]] = key;
}

function doTranslate(mode) {
  const inputRaw = document.getElementById('inputText').value.trim().toLowerCase();
  const output = document.getElementById('output');

  if (inputRaw === '') {
    output.textContent = "Result: Please enter a greeting or 'list'.";
    return;
  }

  if (inputRaw === 'list') {
    let listText = 'Result:\n\nINFORMAL ↔ FORMAL\n\n';
    for (const informal in informalToFormal) {
      listText += informal + " ↔ " + informalToFormal[informal] + "\n";
    }
    output.textContent = listText;
    return;
  }

  const dictionary = mode === 'formal' ? informalToFormal : formalToInformal;

  if (dictionary[inputRaw]) {
    output.textContent = "Result: " + dictionary[inputRaw];
  } else {
    output.textContent = "Result: ERROR — Greeting not recognized!";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toFormalBtn').addEventListener('click', () => doTranslate('formal'));
  document.getElementById('toInformalBtn').addEventListener('click', () => doTranslate('informal'));
});
