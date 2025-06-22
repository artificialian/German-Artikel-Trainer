// German Artikel Trainer Logic
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
  { pronoun: "ich", case: "Nominativ", article: "ich" },
  { pronoun: "du", case: "Nominativ", article: "du" },
  { pronoun: "er", case: "Nominativ", article: "er" },
  { pronoun: "sie", case: "Nominativ", article: "sie" },
  { pronoun: "es", case: "Nominativ", article: "es" },
  { pronoun: "wir", case: "Nominativ", article: "wir" },
  { pronoun: "ihr", case: "Nominativ", article: "ihr" },
  { pronoun: "sie", case: "Nominativ", article: "sie" },

  { pronoun: "ich", case: "Akkusativ", article: "mich" },
  { pronoun: "du", case: "Akkusativ", article: "dich" },
  { pronoun: "er", case: "Akkusativ", article: "ihn" },
  { pronoun: "sie", case: "Akkusativ", article: "sie" },
  { pronoun: "es", case: "Akkusativ", article: "es" },
  { pronoun: "wir", case: "Akkusativ", article: "uns" },
  { pronoun: "ihr", case: "Akkusativ", article: "euch" },
  { pronoun: "sie", case: "Akkusativ", article: "sie" },

  { pronoun: "ich", case: "Dativ", article: "mir" },
  { pronoun: "du", case: "Dativ", article: "dir" },
  { pronoun: "er", case: "Dativ", article: "ihm" },
  { pronoun: "sie", case: "Dativ", article: "ihr" },
  { pronoun: "es", case: "Dativ", article: "ihm" },
  { pronoun: "wir", case: "Dativ", article: "uns" },
  { pronoun: "ihr", case: "Dativ", article: "euch" },
  { pronoun: "sie", case: "Dativ", article: "ihnen" },

  { pronoun: "ich", case: "Genitiv", article: "meiner" },
  { pronoun: "du", case: "Genitiv", article: "deiner" },
  { pronoun: "er", case: "Genitiv", article: "seiner" },
  { pronoun: "sie", case: "Genitiv", article: "ihrer" },
  { pronoun: "es", case: "Genitiv", article: "seiner" },
  { pronoun: "wir", case: "Genitiv", article: "unser" },
  { pronoun: "ihr", case: "Genitiv", article: "euer" },
  { pronoun: "sie", case: "Genitiv", article: "ihrer" }
];

// GitHub repository configuration
const GITHUB_CONFIG = {
  username: 'artificialian', // Replace with your GitHub username
  repository: 'German-Artikel-Trainer', // Replace with your repository name
  branch: 'main' // or 'master' depending on your default branch
};

// Chart image mappings
const CHART_IMAGES = {
  definite: 'definite-articles-chart.png',
  indefinite: 'indefinite-articles-chart.png', // You might want to create a separate image for indefinite articles
  personal: 'personalpronomen-chart.png',
  possessive: 'possessive-chart.png'
};

let current = {}; 
let score = 0;

function getNewQuestion() {
  const mode = document.getElementById("modeSelector").value;

  // Hide charts whenever mode is switched or new question is generated
  hideCharts();

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
    if (roll < 0.2) pool = definiteArticles;
    else if (roll < 0.4) pool = indefiniteArticles;
    else if (roll < 0.6) pool = personalPronouns;
    else pool = generatePossessive();
  }

  current = pool[Math.floor(Math.random() * pool.length)];

  let label = current.type || mode.charAt(0).toUpperCase() + mode.slice(1);
  const questionElement = document.getElementById("question");

  if (mode === "personal") {
    questionElement.innerHTML = `
      <span class="question-element">${label}</span>
      <span class="question-element">${current.case}</span>
      <span class="question-element">${current.pronoun}</span>
    `;
  } else if (mode === "possessive") {
    questionElement.innerHTML = `
      <span class="question-element">${label}</span>
      <span class="question-element">${current.case}</span>
      <span class="question-element">${current.pronoun}</span>
      <span class="question-element">${current.gender}</span>
    `;
  } else {
    questionElement.innerHTML = `
      <span class="question-element">${label}</span>
      <span class="question-element">${current.case}</span>
      <span class="question-element">${current.gender}</span>
    `;
  }

  // Update toggle button visibility and chart/links visibility based on mode
  updateToggleVisibility();

  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.toLowerCase().trim();
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score");

  // Clear previous feedback classes
  feedback.classList.remove("show", "correct", "incorrect");

  // Check if answer is empty
  if (userAnswer === "") {
    feedback.textContent = "⚠️ Please enter an answer!";
    feedback.classList.add("show", "incorrect");
    return;
  }

  if (userAnswer === current.article) {
    feedback.textContent = "🎉 Richtig!";
    feedback.classList.add("show", "correct");
    score++;
    scoreDisplay.textContent = score;
    setTimeout(getNewQuestion, 1200);
  } else {
    feedback.textContent = `❌ Falsch! Richtige Antwort: "${current.article}"`;
    feedback.classList.add("show", "incorrect");
    score = 0;
    scoreDisplay.textContent = score;
    setTimeout(getNewQuestion, 2000);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
}

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

function hideCharts() {
  const chartContainer = document.getElementById('chartContainer');
  const toggleButton = document.getElementById('chartToggle');
  
  if (chartContainer) {
    chartContainer.style.display = 'none';
  }
  
  if (toggleButton) {
    toggleButton.textContent = '📊 Show Charts';
    toggleButton.classList.remove('active');
  }
}

function toggleCharts() {
  const currentMode = document.getElementById('modeSelector').value;
  
  if (currentMode === 'mixed') {
    return;
  }
  
  const chartContainer = document.getElementById('chartContainer');
  const toggleButton = document.getElementById('chartToggle');
  
  if (chartContainer.style.display === 'none' || chartContainer.style.display === '') {
    chartContainer.style.display = 'block';
    toggleButton.textContent = '📊 Hide Charts';
    toggleButton.classList.add('active');
    
    showCurrentModeChart();
  } else {
    hideCharts();
  }
}

function getGitHubImageUrl(imageName) {
  return `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/${GITHUB_CONFIG.branch}/${imageName}`;
}

function showCurrentModeChart() {
  const currentMode = document.getElementById('modeSelector').value;
  const chartContent = document.getElementById('chart-content');
  
  let chartHTML = '';
  
  // Get the appropriate chart image for the current mode
  const imageName = CHART_IMAGES[currentMode];
  
  if (imageName) {
    const imageUrl = getGitHubImageUrl(imageName);
    
    // Create appropriate title based on mode
    let title = '';
    switch(currentMode) {
      case 'definite':
        title = 'Bestimmte Artikel (Definite Articles)';
        break;
      case 'indefinite':
        title = 'Unbestimmte Artikel (Indefinite Articles)';
        break;
      case 'personal':
        title = 'Personalpronomen (Personal Pronouns)';
        break;
      case 'possessive':
        title = 'Possessivpronomen (Possessive Pronouns)';
        break;
    }
    
    chartHTML = `
      <h3>${title}</h3>
      <div class="chart-image-container">
        <img src="${imageUrl}" alt="${title}" class="chart-image" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="chart-error" style="display:none;">
          <p>Chart image could not be loaded. Please check:</p>
          <ul>
            <li>GitHub repository is public</li>
            <li>Image file "${imageName}" exists in the repository</li>
            <li>GITHUB_CONFIG settings are correct</li>
          </ul>
        </div>
      </div>
    `;
  } else {
    chartHTML = '<p>No chart available for this mode.</p>';
  }
  
  chartContent.innerHTML = chartHTML;
  
  // Show chart links
  const chartLinks = document.getElementById('chart-links');
  if (chartLinks) {
    chartLinks.style.display = 'block';
  }
}

function updateToggleVisibility() {
  const currentMode = document.getElementById('modeSelector').value;
  const toggleButton = document.getElementById('chartToggle');
  const chartContainer = document.getElementById('chartContainer');
  
  if (currentMode === 'mixed') {
    // Hide toggle button and charts for mixed mode
    toggleButton.style.display = 'none';
    chartContainer.style.display = 'none';
  } else {
    // Show toggle button for other modes
    toggleButton.style.display = 'inline-block';
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
  getNewQuestion();
  
  // Focus on the answer input
  document.getElementById('answer').focus();
});

// Add click handler for the submit button (if you want to add one)
function submitAnswer() {
  checkAnswer();
}
