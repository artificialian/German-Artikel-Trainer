// --- script.js (Plain JS version) ---

// Data arrays
const definiteArticles = [
  { type: "Bestimmte", case: "Nominativ", gender: "Maskulin", article: "der" },
  { type: "Bestimmte", case: "Nominativ", gender: "Feminin", article: "die" },
  { type: "Bestimmte", case: "Nominativ", gender: "Neutrum", article: "das" },
  { type: "Bestimmte", case: "Nominativ", gender: "Plural", article: "die" },
  { type: "Bestimmte", case: "Akkusativ", gender: "Maskulin", article: "den" },
  { type: "Bestimmte", case: "Akkusativ", gender: "Feminin", article: "die" },
  { type: "Bestimmte", case: "Akkusativ", gender: "Neutrum", article: "das" },
  { type: "Bestimmte", case: "Akkusativ", gender: "Plural", article: "die" },
  { type: "Bestimmte", case: "Dativ", gender: "Maskulin", article: "dem" },
  { type: "Bestimmte", case: "Dativ", gender: "Feminin", article: "der" },
  { type: "Bestimmte", case: "Dativ", gender: "Neutrum", article: "dem" },
  { type: "Bestimmte", case: "Dativ", gender: "Plural", article: "den" },
  { type: "Bestimmte", case: "Genitiv", gender: "Maskulin", article: "des" },
  { type: "Bestimmte", case: "Genitiv", gender: "Feminin", article: "der" },
  { type: "Bestimmte", case: "Genitiv", gender: "Neutrum", article: "des" },
  { type: "Bestimmte", case: "Genitiv", gender: "Plural", article: "der" },
];

const indefiniteArticles = [
  { type: "Unbestimmte", case: "Nominativ", gender: "Maskulin", article: "ein" },
  { type: "Unbestimmte", case: "Nominativ", gender: "Feminin", article: "eine" },
  { type: "Unbestimmte", case: "Nominativ", gender: "Neutrum", article: "ein" },
  { type: "Unbestimmte", case: "Akkusativ", gender: "Maskulin", article: "einen" },
  { type: "Unbestimmte", case: "Akkusativ", gender: "Feminin", article: "eine" },
  { type: "Unbestimmte", case: "Akkusativ", gender: "Neutrum", article: "ein" },
  { type: "Unbestimmte", case: "Dativ", gender: "Maskulin", article: "einem" },
  { type: "Unbestimmte", case: "Dativ", gender: "Feminin", article: "einer" },
  { type: "Unbestimmte", case: "Dativ", gender: "Neutrum", article: "einem" },
  { type: "Unbestimmte", case: "Genitiv", gender: "Maskulin", article: "eines" },
  { type: "Unbestimmte", case: "Genitiv", gender: "Feminin", article: "einer" },
  { type: "Unbestimmte", case: "Genitiv", gender: "Neutrum", article: "eines" },
];

const personalPronouns = [
  { type: "Personal", pronoun: "ich", case: "Nominativ", article: "ich" },
  { type: "Personal", pronoun: "du", case: "Nominativ", article: "du" },
  { type: "Personal", pronoun: "er", case: "Nominativ", article: "er" },
  { type: "Personal", pronoun: "sie", case: "Nominativ", article: "sie" },
  { type: "Personal", pronoun: "es", case: "Nominativ", article: "es" },
  { type: "Personal", pronoun: "wir", case: "Nominativ", article: "wir" },
  { type: "Personal", pronoun: "ihr", case: "Nominativ", article: "ihr" },
  { type: "Personal", pronoun: "sie", case: "Nominativ", article: "sie" },
  { type: "Personal", pronoun: "ich", case: "Akkusativ", article: "mich" },
  { type: "Personal", pronoun: "du", case: "Akkusativ", article: "dich" },
  { type: "Personal", pronoun: "er", case: "Akkusativ", article: "ihn" },
  { type: "Personal", pronoun: "sie", case: "Akkusativ", article: "sie" },
  { type: "Personal", pronoun: "es", case: "Akkusativ", article: "es" },
  { type: "Personal", pronoun: "wir", case: "Akkusativ", article: "uns" },
  { type: "Personal", pronoun: "ihr", case: "Akkusativ", article: "euch" },
  { type: "Personal", pronoun: "sie", case: "Akkusativ", article: "sie" },
  { type: "Personal", pronoun: "ich", case: "Dativ", article: "mir" },
  { type: "Personal", pronoun: "du", case: "Dativ", article: "dir" },
  { type: "Personal", pronoun: "er", case: "Dativ", article: "ihm" },
  { type: "Personal", pronoun: "sie", case: "Dativ", article: "ihr" },
  { type: "Personal", pronoun: "es", case: "Dativ", article: "ihm" },
  { type: "Personal", pronoun: "wir", case: "Dativ", article: "uns" },
  { type: "Personal", pronoun: "ihr", case: "Dativ", article: "euch" },
  { type: "Personal", pronoun: "sie", case: "Dativ", article: "ihnen" },
  { type: "Personal", pronoun: "ich", case: "Genitiv", article: "meiner" },
  { type: "Personal", pronoun: "du", case: "Genitiv", article: "deiner" },
  { type: "Personal", pronoun: "er", case: "Genitiv", article: "seiner" },
  { type: "Personal", pronoun: "sie", case: "Genitiv", article: "ihrer" },
  { type: "Personal", pronoun: "es", case: "Genitiv", article: "seiner" },
  { type: "Personal", pronoun: "wir", case: "Genitiv", article: "unser" },
  { type: "Personal", pronoun: "ihr", case: "Genitiv", article: "euer" },
  { type: "Personal", pronoun: "sie", case: "Genitiv", article: "ihrer" }
];

// Possessive pronouns generator (randomized)
function generatePossessive() {
  const chart = {
    Nominativ: {
      Maskulin: { ich: "mein", du: "dein", er: "sein", sie: "ihr", es: "sein", wir: "unser", ihr: "euer", sie: "ihr" },
      Feminin: { ich: "meine", du: "deine", er: "seine", sie: "ihre", es: "seine", wir: "unsere", ihr: "eure", sie: "ihre" },
      Neutrum: { ich: "mein", du: "dein", er: "sein", sie: "ihr", es: "sein", wir: "unser", ihr: "euer", sie: "ihr" },
      Plural: { ich: "meine", du: "deine", er: "seine", sie: "ihre", es: "seine", wir: "unsere", ihr: "eure", sie: "ihre" }
    },
    Akkusativ: {
      Maskulin: { ich: "meinen", du: "deinen", er: "seinen", sie: "ihren", es: "seinen", wir: "unseren", ihr: "euren", sie: "ihren" },
      Feminin: { ich: "meine", du: "deine", er: "seine", sie: "ihre", es: "seine", wir: "unsere", ihr: "eure", sie: "ihre" },
      Neutrum: { ich: "mein", du: "dein", er: "sein", sie: "ihr", es: "sein", wir: "unser", ihr: "euer", sie: "ihr" },
      Plural: { ich: "meine", du: "deine", er: "seine", sie: "ihre", es: "seine", wir: "unsere", ihr: "eure", sie: "ihre" }
    },
    Dativ: {
      Maskulin: { ich: "meinem", du: "deinem", er: "seinem", sie: "ihrem", es: "seinem", wir: "unserem", ihr: "eurem", sie: "ihrem" },
      Feminin: { ich: "meiner", du: "deiner", er: "seiner", sie: "ihrer", es: "seiner", wir: "unserer", ihr: "eurer", sie: "ihrer" },
      Neutrum: { ich: "meinem", du: "deinem", er: "seinem", sie: "ihrem", es: "seinem", wir: "unserem", ihr: "eurem", sie: "ihrem" },
      Plural: { ich: "meinen", du: "deinen", er: "seinen", sie: "ihren", es: "seinen", wir: "unseren", ihr: "euren", sie: "ihren" }
    },
    Genitiv: {
      Maskulin: { ich: "meines", du: "deines", er: "seines", sie: "ihres", es: "seines", wir: "unseres", ihr: "eures", sie: "ihres" },
      Feminin: { ich: "meiner", du: "deiner", er: "seiner", sie: "ihrer", es: "seiner", wir: "unserer", ihr: "eurer", sie: "ihrer" },
      Neutrum: { ich: "meines", du: "deines", er: "seines", sie: "ihres", es: "seines", wir: "unseres", ihr: "eures", sie: "ihres" },
      Plural: { ich: "meiner", du: "deiner", er: "seiner", sie: "ihrer", es: "seiner", wir: "unserer", ihr: "eurer", sie: "ihrer" }
    }
  };

  const cases = Object.keys(chart);
  const caseChoice = cases[Math.floor(Math.random() * cases.length)];
  const genders = Object.keys(chart[caseChoice]);
  const genderChoice = genders[Math.floor(Math.random() * genders.length)];
  const pronouns = Object.keys(chart[caseChoice][genderChoice]);
  const pronounChoice = pronouns[Math.floor(Math.random() * pronouns.length)];
  const article = chart[caseChoice][genderChoice][pronounChoice];

  return [{ type: "Possessiv", case: caseChoice, gender: genderChoice, pronoun: pronounChoice, article }];
}

// State
let mode = "definite";
let current = {};
let score = 0;

// DOM Elements
const modeSelector = document.getElementById("modeSelector");
const questionDiv = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackDiv = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");
const chartToggleButton = document.getElementById("chartToggle");
const chartContainer = document.getElementById("chartContainer");
const chartLinks = document.getElementById("chart-links");
const chartDefinite = document.getElementById("chart-definite");
const chartIndefinite = document.getElementById("chart-indefinite");
const chartPersonal = document.getElementById("chart-personal");
const chartPossessive = document.getElementById("chart-possessive");

function renderQuestion() {
  if (!current.type) {
    questionDiv.textContent = "Loading...";
    return;
  }
  questionDiv.innerHTML = ""; // clear previous

  function span(text) {
    const s = document.createElement("span");
    s.className = "question-element";
    s.textContent = text;
    return s;
  }

  if (current.type === "Personal") {
    questionDiv.appendChild(span(current.type));
    questionDiv.appendChild(span(current.case));
    questionDiv.appendChild(span(current.pronoun));
  } else if (current.type === "Possessiv") {
    questionDiv.appendChild(span(current.type));
    questionDiv.appendChild(span(current.case));
    questionDiv.appendChild(span(current.pronoun));
    questionDiv.appendChild(span(current.gender));
  } else {
    questionDiv.appendChild(span(current.type));
    questionDiv.appendChild(span(current.case));
    questionDiv.appendChild(span(current.gender));
  }
}

function getNewQuestion() {
  let pool = [];
  if (mode === "definite") {
    pool = definiteArticles;
  } else if (mode === "indefinite") {
    pool = indefiniteArticles;
  } else if (mode === "personal") {
    pool = personalPronouns;
  } else if (mode === "possessive") {
    pool = generatePossessive();
  } else if (mode === "mixed") {
    const roll = Math.random();
    if (roll < 0.25) {
      pool = definiteArticles;
    } else if (roll < 0.5) {
      pool = indefiniteArticles;
    } else if (roll < 0.75) {
      pool = personalPronouns;
    } else {
      pool = generatePossessive();
    }
  }
  if (!pool || pool.length === 0) {
    current = {};
    renderQuestion();
    return;
  }
  current = pool[Math.floor(Math.random() * pool.length)];
  answerInput.value = "";
  feedbackDiv.textContent = "";
  feedbackDiv.className = "";
  renderQuestion();
}

function checkAnswer() {
  const userAnswer = answerInput.value.toLowerCase().trim();
  if (userAnswer === "") {
    feedbackDiv.textContent = "⚠️ Please enter an answer!";
    feedbackDiv.className = "show incorrect";
    return;
  }
  if (userAnswer === current.article) {
    feedbackDiv.textContent = "🎉 Richtig!";
    feedbackDiv.className = "show correct";
    score++;
    scoreDiv.textContent = score;
    setTimeout(getNewQuestion, 1200);
  } else {
    feedbackDiv.textContent = `❌ Falsch! Richtige Antwort: "${current.article}"`;
    feedbackDiv.className = "show incorrect";
    score = 0;
    scoreDiv.textContent = score;
    setTimeout(getNewQuestion, 2000);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
}

// Chart toggling
function toggleCharts() {
  if (mode === "mixed") return;
  let show = chartContainer.style.display === "none";
  chartContainer.style.display = show ? "block" : "none";
  chartLinks.style.display = show ? "block" : "none";
  chartToggleButton.classList.toggle("active", show);

  // Hide all charts first
  chartDefinite.style.display = "none";
  chartIndefinite.style.display = "none";
  chartPersonal.style.display = "none";
  chartPossessive.style.display = "none";

  // Show the relevant chart
  if (show) {
    if (mode === "definite") chartDefinite.style.display = "block";
    if (mode === "indefinite") chartIndefinite.style.display = "block";
    if (mode === "personal") chartPersonal.style.display = "block";
    if (mode === "possessive") chartPossessive.style.display = "block";
  }
}

// On mode change
modeSelector.addEventListener("change", function () {
  mode = modeSelector.value;
  score = 0;
  scoreDiv.textContent = score;
  chartContainer.style.display = "none";
  chartLinks.style.display = "none";
  chartToggleButton.classList.remove("active");
  getNewQuestion();
});

answerInput.addEventListener("keypress", handleKeyPress);
chartToggleButton.addEventListener("click", toggleCharts);

// Initialize
window.onload = function () {
  chartContainer.style.display = "none";
  chartLinks.style.display = "none";
  getNewQuestion();
};