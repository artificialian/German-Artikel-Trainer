/*<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>German Artikel Trainer</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🧠 German Artikel Trainer</h1>
    <p class="subtitle">Master German articles with style</p>
    <div class="mode-selector">
      <label for="modeSelector">Choose your challenge:</label>
      <select id="modeSelector">
        <option value="definite">Bestimmte Artikel</option>
        <option value="indefinite">Unbestimmte Artikel</option>
        <option value="possessive">Possessivpronomen</option>
        <option value="personal">Personalpronomen</option>
        <option value="mixed">Gemischt (Alle)</option>
      </select>
    </div>
    <div class="question-card">
      <div id="question">Loading...</div>
    </div>
    <div class="input-container">
      <input id="answer" placeholder="Your answer...">
    </div>
    <div class="feedback-container">
      <div id="feedback"></div>
    </div>
    <div class="score-container">
      <div class="score-label">Current Streak</div>
      <div id="score">0</div>
    </div>

    <!-- Single toggle button -->
    <div class="chart-toggle-container">
      <button id="chartToggle">Show Charts</button>
    </div>

    <!-- Chart container -->
    <div id="chartContainer" style="display: none;">
      <img id="chart-definite" class="chart" src="definite-articles-chart.png" alt="Definite Articles Chart" style="display: none;">
      <img id="chart-indefinite" class="chart" src="indefinite-articles-chart.png" alt="Indefinite Articles Chart" style="display: none;">
      <img id="chart-personal" class="chart" src="personalpronomen-chart.png" alt="Personal Pronouns Chart" style="display: none;">
      <img id="chart-possessive" class="chart" src="possessive-chart.png" alt="Possessive Chart" style="display: none;">
    </div>

    <!-- Links for mixed mode - always visible when in mixed mode -->
    <div id="chart-links" style="display: none;">
  <a href="https://germanwithlaura.com/definite-indefinite-articles/" target="_blank" class="chart-link">📘 Bestimmte & Unbestimmte Artikel</a>
  <a href="https://www.gradding.com/blog/german/possessive-pronouns" target="_blank" class="chart-link">🔐 Possessivpronomen</a>
  <a href="https://de.tingroom.com/wap/index.php?moduleid=33&itemid=51112" target="_blank" class="chart-link">👤 Personalpronomen</a>
</div>
    
  </div>
  <script src="script.js"></script>
</body>
</html>
end


//script.js
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

// State variables
let mode = "definite";
let current = {};
let score = 0;

// DOM Elements - will be initialized after DOM loads
let modeSelector, questionDiv, answerInput, feedbackDiv, scoreDiv;
let chartToggleButton, chartContainer, chartLinks;
let chartDefinite, chartIndefinite, chartPersonal, chartPossessive;

// Initialize DOM elements
function initializeDOMElements() {
  modeSelector = document.getElementById("modeSelector");
  questionDiv = document.getElementById("question");
  answerInput = document.getElementById("answer");
  feedbackDiv = document.getElementById("feedback");
  scoreDiv = document.getElementById("score");
  chartToggleButton = document.getElementById("chartToggle");
  chartContainer = document.getElementById("chartContainer");
  chartLinks = document.getElementById("chart-links");
  chartDefinite = document.getElementById("chart-definite");
  chartIndefinite = document.getElementById("chart-indefinite");
  chartPersonal = document.getElementById("chart-personal");
  chartPossessive = document.getElementById("chart-possessive");
}

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
  let isVisible = chartContainer.style.display !== "none";
  
  if (isVisible) {
    // Hide charts
    chartContainer.style.display = "none";
    chartToggleButton.classList.remove("active");
    chartToggleButton.textContent = "Show Charts";
  } else {
    // Show charts
    chartContainer.style.display = "block";
    chartToggleButton.classList.add("active");
    chartToggleButton.textContent = "Hide Charts";
    
    // Hide all charts first
    chartDefinite.style.display = "none";
    chartIndefinite.style.display = "none";
    chartPersonal.style.display = "none";
    chartPossessive.style.display = "none";

    // Show the relevant chart based on mode
    if (mode === "definite") {
      chartDefinite.style.display = "block";
    } else if (mode === "indefinite") {
      chartIndefinite.style.display = "block";
    } else if (mode === "personal") {
      chartPersonal.style.display = "block";
    } else if (mode === "possessive") {
      chartPossessive.style.display = "block";
    }
  }
}

// Event handlers
function handleModeChange() {
  mode = modeSelector.value;
  score = 0;
  scoreDiv.textContent = score;

  if (mode === "mixed") {
    // Hide chart toggle button and show links for mixed mode
    chartToggleButton.style.display = "none";
    chartContainer.style.display = "none";
    chartLinks.style.display = "block";
  } else {
    // Show chart toggle button and hide links for other modes
    chartToggleButton.style.display = "inline-block";
    chartLinks.style.display = "none";
    
    // Reset charts display
    chartContainer.style.display = "none";
    chartToggleButton.classList.remove("active");
    chartToggleButton.textContent = "Show Charts";
  }

  getNewQuestion();
}

// Initialize everything when DOM is loaded
window.onload = function() {
  initializeDOMElements();
  
  // Add event listeners
  modeSelector.addEventListener("change", handleModeChange);
  answerInput.addEventListener("keypress", handleKeyPress);
  chartToggleButton.addEventListener("click", toggleCharts);
  
  // Set initial state
  chartContainer.style.display = "none";
  chartLinks.style.display = "none";
  getNewQuestion();
};



//style.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 20px;
  color: #212529;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  text-align: center;
  color: #495057;
  font-size: 16px;
  margin-bottom: 32px;
  font-weight: 500;
}

.mode-selector {
  margin-bottom: 32px;
}

.mode-selector label {
  display: block;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #212529;
}

select {
  width: 100%;
  font-size: 17px;
  padding: 16px 20px;
  border: 2px solid #ced4da;
  border-radius: 16px;
  background: #ffffff;
  color: #212529;
  font-weight: 500;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23495057' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 16px center;
  background-repeat: no-repeat;
  background-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

select:focus {
  outline: none;
  background: #ffffff;
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.question-card {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
}

#question {
  font-size: 24px;
  font-weight: 600;
  color: white;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.question-element {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  min-width: 120px;
  backdrop-filter: blur(10px);
}

.input-container {
  position: relative;
  margin-bottom: 24px;
}

#answer {
  width: 100%;
  font-size: 18px;
  padding: 18px 20px;
  border: 2px solid #ced4da;
  border-radius: 16px;
  background: #ffffff;
  color: #212529;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

#answer:focus {
  outline: none;
  background: #ffffff;
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

#answer::placeholder {
  color: #6c757d;
  font-weight: 400;
}

.feedback-container {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

#feedback {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

#feedback.show {
  opacity: 1;
  transform: translateY(0);
}

#feedback.correct {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

#feedback.incorrect {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.score-container {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.score-label {
  font-size: 15px;
  color: #495057;
  font-weight: 500;
  margin-bottom: 4px;
}

#score {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #007bff, #0056b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  display: block;
}

.chart-container {
  text-align: center;
  margin-top: 32px;
}

#chart-links {
  margin-top: 32px;
}

.chart-link {
  display: block;
  margin-bottom: 12px;
  padding: 16px 20px;
  background: #ffffff;
  color: #212529;
  border-radius: 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.chart-link:hover {
  background: #f8f9fa;
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
  color: #007bff;
}

.chart-link:last-child {
  margin-bottom: 0;
}

Loading animation
.loading {
  display: inline-block;
  position: relative;
}

.loading::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  animation: loading 1.4s infinite ease-in-out;
  animation-fill-mode: both;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}

@keyframes loading {
  0%, 80%, 100% {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  40% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

Responsive design
@media (max-width: 900px) {
  .container {
    max-width: 600px;
    padding: 32px;
  }
}

@media (max-width: 640px) {
  body {
    padding: 16px;
  }
  
  .container {
    padding: 24px 20px;
    border-radius: 12px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  #question {
    font-size: 18px;
    flex-direction: column;
    gap: 12px;
  }
  
  .question-element {
    min-width: 100px;
  }
  
  #answer {
    font-size: 16px;
    padding: 16px 18px;
  }
}

Light theme optimization (removing dark mode)
@media (prefers-color-scheme: dark) {
  body {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #212529;
  }
  
  .container {
    background: #ffffff;
    color: #212529;
  }
  
  .mode-selector label {
    color: #212529;
  }
  
  select {
    background: #ffffff;
    color: #212529;
    border-color: #ced4da;
  }
  
  select:focus {
    background: #ffffff;
    border-color: #007bff;
  }
  
  #answer {
    background: #ffffff;
    color: #212529;
    border-color: #ced4da;
  }
  
  #answer:focus {
    background: #ffffff;
    border-color: #007bff;
  }
  
  .score-container {
    background: #f8f9fa;
    border-color: #e9ecef;
  }
  
  .chart-link {
    background: #ffffff;
    border-color: #e9ecef;
    color: #212529;
  }
  
  .chart-link:hover {
    background: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
  }
}

Chart toggle styles with switched states
.chart-toggle-container {
  text-align: center;
  margin: 20px 0;
}

#chartToggle {
  background: #e7f3ff;
  color: #0056b3;
  border: 1px solid #007bff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

#chartToggle:hover {
  background: #d1ecf1;
  border-color: #0056b3;
}

#chartToggle.active {
  background: #f8f9fa;
  color: #495057;
  border-color: #dee2e6;
}

#chartToggle.active:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

#chartContainer {
  margin-top: 20px;
  padding: 20px;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 16px;
  border: 2px solid #e9ecef;
}
