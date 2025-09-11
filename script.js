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

function translate(mode) {
  const inputRaw = document.getElementById('inputText').value.trim().toLowerCase();
  const output = document.getElementById('output');

  if (inputRaw === '') {
    output.textContent = "Please enter a greeting or 'list'.";
    return;
  }

  if (inputRaw === 'list') {
    let listText = 'INFORMAL ↔ FORMAL\n\n';
    for (const informal in informalToFormal) {
      listText += informal + " ↔ " + informalToFormal[informal] + "\n";
    }
    output.textContent = listText;
    return;
  }

  let dictionary = mode === 'formal' ? informalToFormal : formalToInformal;

  if (inputRaw in dictionary) {
    output.textContent = dictionary[inputRaw];
  } else {
    output.textContent = "ERROR: Greeting not recognized!";
  }
}

document.getElementById('toFormalBtn').addEventListener('click', () => translate('formal'));
document.getElementById('toInformalBtn').addEventListener('click', () => translate('informal'));
