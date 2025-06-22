
import React, { useState, useEffect } from 'react';

const GermanArtikelTrainer = () => {
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

  // State
  const [mode, setMode] = useState('definite');
  const [current, setCurrent] = useState({});
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  // Generate possessive pronouns
  const generatePossessive = () => {
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
  };

  // Get new question
  const getNewQuestion = () => {
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
      // For mixed mode, randomly select from all modes
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
    setCurrent({});
    return;
  }

    const newCurrent = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(newCurrent);
    setAnswer('');
    setFeedback('');
    setFeedbackClass('');
  };

  // Check answer
  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim();
    
    if (userAnswer === "") {
      setFeedback("⚠️ Please enter an answer!");
      setFeedbackClass("show incorrect");
      return;
    }

    if (userAnswer === current.article) {
      setFeedback("🎉 Richtig!");
      setFeedbackClass("show correct");
      setScore(score + 1);
      setTimeout(() => {
        getNewQuestion();
      }, 1200);
    } else {
      setFeedback(`❌ Falsch! Richtige Antwort: "${current.article}"`);
      setFeedbackClass("show incorrect");
      setScore(0);
      setTimeout(() => {
        getNewQuestion();
      }, 2000);
    }
  };

  // Handle key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  // Handle mode change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setScore(0);
    // Hide charts when switching to mixed mode
    if (newMode === 'mixed') {
      setShowCharts(false);
    }
  };

  // Toggle charts
  const toggleCharts = () => {
    if (mode === 'mixed') return;
    setShowCharts(!showCharts);
  };

  // Initialize on component mount
  useEffect(() => {
    getNewQuestion();
  }, [mode]);

  // Render question based on type
  const renderQuestion = () => {
    if (!current.type) return "Loading...";

    if (current.type === "Personal") {
      return (
        <>
          <span className="question-element">{current.type}</span>
          <span className="question-element">{current.case}</span>
          <span className="question-element">{current.pronoun}</span>
        </>
      );
    } else if (current.type === "Possessiv") {
      return (
        <>
          <span className="question-element">{current.type}</span>
          <span className="question-element">{current.case}</span>
          <span className="question-element">{current.pronoun}</span>
          <span className="question-element">{current.gender}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="question-element">{current.type}</span>
          <span className="question-element">{current.case}</span>
          <span className="question-element">{current.gender}</span>
        </>
      );
    }
  };
