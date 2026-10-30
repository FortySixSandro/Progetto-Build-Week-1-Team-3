/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della domanda
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/
const QUESTIONS = [
  // DOMANDE CSS 10
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Creative Style System",
    ],
    category: "CSS",
  },
  {
    question: "Da quali tre parti è composta la struttura di una regola CSS?",
    correct_answer: "Selettore, proprietà e valore",
    incorrect_answers: [
      "Tag, attributo e contenuto",
      "Selettore, dichiarazione e parentesi",
      "Classe, ID e attributo",
    ],
    category: "CSS",
  },
  {
    question:
      "Dove deve essere posizionato il tag <link> al foglio di stile esterno all'interno dell'HTML?",
    correct_answer: "Alla fine del <head>",
    incorrect_answers: [
      "All'inizio del <body>",
      "Alla fine del <body>",
      "Subito dopo il <title>",
    ],
    category: "CSS",
  },
  {
    question: "Quale metodo di inclusione CSS è il più utilizzato?",
    correct_answer: "Esterno (file .css collegato con <link>)",
    incorrect_answers: [
      "Inline (attributo style)",
      "Incorporato (blocco <style> nel <head>)",
      "Importato con @import",
    ],
    category: "CSS",
  },
  {
    question:
      "Nella gerarchia della specificità CSS, quale selettore vince su tutti gli altri (escluso !important)?",
    correct_answer: "Stile inline",
    incorrect_answers: ["ID", "Classe", "Tag"],
    category: "CSS",
  },
  {
    question:
      "Quale pseudo-classe si attiva quando il puntatore del mouse passa sopra un elemento?",
    correct_answer: ":hover",
    incorrect_answers: [":focus", ":active", ":visited"],
    category: "CSS",
  },
  {
    question: "Qual è la differenza tra :first-child e :first-of-type?",
    correct_answer:
      ":first-child seleziona il primo figlio in assoluto, :first-of-type il primo figlio del suo tipo",
    incorrect_answers: [
      ":first-child seleziona il primo figlio del suo tipo, :first-of-type il primo in assoluto",
      "Sono identici",
      ":first-child funziona solo sui link, :first-of-type su tutti gli elementi",
    ],
    category: "CSS",
  },
  {
    question:
      "Quale pseudo-elemento inserisce contenuto prima di un elemento (e richiede sempre la proprietà content)?",
    correct_answer: "::before",
    incorrect_answers: ["::after", "::placeholder", "::first-letter"],
    category: "CSS",
  },
  {
    question:
      "Quale valore di box-sizing fa sì che padding e border siano inclusi nella width/height?",
    correct_answer: "border-box",
    incorrect_answers: ["content-box", "padding-box", "margin-box"],
    category: "CSS",
  },
  {
    question: "Con root a 16px, a quanto equivale 2rem?",
    correct_answer: "32px",
    incorrect_answers: ["16px", "64px", "8px"],
    category: "CSS",
  },
  // DOMANDE HTML 10
  {
    question: "Cosa significa l'acronimo HTML?",
    correct_answer: "HyperText Markup Language",
    incorrect_answers: [
      "HyperText Markdown Language",
      "HighText Markup Language",
      "HyperTool Markup Language",
    ],
    category: "HTML",
  },
  {
    question:
      "Quale attributo del tag <html> comunica la lingua della pagina ed è fondamentale per l'indicizzazione su Google?",
    correct_answer: "lang",
    incorrect_answers: ["language", "locale", "charset"],
    category: "HTML",
  },
  {
    question:
      "Quale tag HTML definisce il titolo della pagina, visibile anche nella scheda del browser?",
    correct_answer: "<title>",
    incorrect_answers: ["<h1>", "<header>", "<meta>"],
    category: "HTML",
  },
  {
    question:
      "Quale elemento semantico rappresenta il contenuto principale della pagina e deve essere unico?",
    correct_answer: "<main>",
    incorrect_answers: ["<section>", "<body>", "<content>"],
    category: "HTML",
  },
  {
    question: "Quale elemento HTML è l'unico contenitore generico inline?",
    correct_answer: "<span>",
    incorrect_answers: ["<div>", "<section>", "<inline>"],
    category: "HTML",
  },
  {
    question: "Quale differenza c'è tra <b> e <strong>?",
    correct_answer:
      "<b> è solo visivo, <strong> indica contenuto importante semanticamente",
    incorrect_answers: [
      "<b> indica contenuto importante, <strong> è solo visivo",
      "Sono identici",
      "<b> è inline, <strong> è block",
    ],
    category: "HTML",
  },
  {
    question:
      "Quale attributo di un link apre la destinazione in una nuova pagina?",
    correct_answer: "target=\"_blank\"",
    incorrect_answers: ["href=\"_blank\"", "rel=\"_blank\"", "new=\"_blank\""],
    category: "HTML",
  },
  {
    question:
      "Quale metodo HTTP mette i dati in chiaro nell'URL e non ha limite di dimensione?",
    correct_answer: "GET",
    incorrect_answers: ["POST", "PUT", "SEND"],
    category: "HTML",
  },
  {
    question:
      "Quale tag HTML raggruppa i campi di un form in un box bordato con un titolo?",
    correct_answer: "<fieldset>",
    incorrect_answers: ["<formgroup>", "<legend>", "<group>"],
    category: "HTML",
  },
  {
    question:
      "Nelle tabelle HTML, quale attributo unisce più celle orizzontalmente (colonne)?",
    correct_answer: "colspan",
    incorrect_answers: ["rowspan", "merge", "span"],
    category: "HTML",
  },
  // Domande JavaScript 10
  {
    question:
      "Quale keyword JavaScript dichiara una variabile non riassegnabile?",
    correct_answer: "const",
    incorrect_answers: ["let", "var", "final"],
    category: "JavaScript",
  },
  {
    question: "Cosa restituisce `typeof null` in JavaScript?",
    correct_answer: "\"object\"",
    incorrect_answers: ["\"null\"", "\"undefined\"", "\"boolean\""],
    category: "JavaScript",
  },
  {
    question: "Qual è la differenza tra == e === in JavaScript?",
    correct_answer:
      "== confronta solo il valore (con conversione di tipo), === confronta tipo e valore",
    incorrect_answers: [
      "== confronta tipo e valore, === solo il valore",
      "Sono identici",
      "=== è deprecato",
    ],
    category: "JavaScript",
  },
  {
    question: "Cosa restituisce l'operatore || (OR) con valori non booleani?",
    correct_answer:
      "Il primo operando che vale come true, oppure l'ultimo se nessuno è true",
    incorrect_answers: [
      "Sempre un booleano true o false",
      "Sempre il primo operando",
      "Sempre undefined",
    ],
    category: "JavaScript",
  },
  {
    question:
      "Quale metodo degli array restituisce un nuovo array applicando una funzione a ogni elemento?",
    correct_answer: "map()",
    incorrect_answers: ["forEach()", "filter()", "find()"],
    category: "JavaScript",
  },
  {
    question:
      "Quale metodo degli array restituisce solo gli elementi che soddisfano una condizione, conservando gli oggetti interi?",
    correct_answer: "filter()",
    incorrect_answers: ["map()", "find()", "some()"],
    category: "JavaScript",
  },
  {
    question:
      "Quale metodo degli array aggrega tutti gli elementi in un singolo valore (es. una somma)?",
    correct_answer: "reduce()",
    incorrect_answers: ["map()", "reduceRight()", "join()"],
    category: "JavaScript",
  },
  {
    question: "Nelle arrow function, come viene gestito il valore di `this`?",
    correct_answer:
      "Eredita `this` dall'ambiente in cui è definita (this lessicale)",
    incorrect_answers: [
      "È dinamico e dipende da come viene invocata",
      "È sempre undefined",
      "È sempre window",
    ],
    category: "JavaScript",
  },
  {
    question: "Cosa fa lo spread operator `...` applicato a un array?",
    correct_answer:
      "Espande gli elementi dell'array in un nuovo contesto (copia superficiale)",
    incorrect_answers: [
      "Crea un riferimento condiviso allo stesso array",
      "Ordina l'array",
      "Rimuove i duplicati",
    ],
    category: "JavaScript",
  },
  {
    question:
      "Quale metodo DOM restituisce solo il primo elemento che corrisponde a un selettore CSS?",
    correct_answer: "querySelector()",
    incorrect_answers: [
      "querySelectorAll()",
      "getElementById()",
      "getElementsByClassName()",
    ],
    category: "JavaScript",
  },
];

/* Costanti del quiz */
const CATEGORIES = ["JavaScript", "HTML", "CSS"];
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1000; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda
const QUIZ_LENGTH = 10; // numero totale di domande per quiz

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;
let timeLeft = TIMER_DURATION;
let shuffledQuestions = [];
let userAnswers = [];
let selectedCategories = [];

const container = document.querySelector(".container");

// Mescola un array in modo uniforme (algoritmo Fisher-Yates).
// Restituisce una COPIA mescolata e lascia intatto l'array originale.
// Sostituisce sort(() => Math.random() - 0.5), che non mescola in modo uniforme, lo avevamo usato in precedenza ma dopo una documentazione
// abbiamo visto che questo è un algoritmo più giusto per mescolare, perché da ad ogni valore la stessa probabilità di essere scelto.
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

//  Costruisce il quiz da QUIZ_LENGTH domande in base alle categorie scelte.
//  - 1 categoria  = 10 domande da quella
//  - 2 categorie  = 5 + 5
//  - 3 categorie  = 3 + 3 + 4 (la categoria con la domanda in più è scelta a caso)
function buildQuiz(categories) {
  // Quante domande minimo per ogni categoria (10 / 3 = 3) e quante "avanzano" (10 % 3 = 1)
  const base = Math.floor(QUIZ_LENGTH / categories.length);
  const remainder = QUIZ_LENGTH % categories.length;

  // Le categorie che ricevono una domanda in più vengono scelte a caso
  const luckyCategories = shuffle(categories).slice(0, remainder);

  let selected = [];

  categories.forEach((category) => {
    // Numero di domande per questa categoria: base, +1 se è fortunata
    let howMany;

    if (luckyCategories.includes(category)) {
      howMany = base + 1;
    } else {
      howMany = base;
    }

    // Tutte le domande della categoria, mescolate, e ne prendo le prime howMany
    const pool = QUESTIONS.filter((q) => q.category === category);
    selected = selected.concat(shuffle(pool).slice(0, howMany));
  });

  // Mescolo di nuovo il risultato finale, così le categorie sono in ordine casuale
  return shuffle(selected);
}

//Funzione che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
function render() {
  container.textContent = "";

  if (currentScreen === "welcome") {
    renderWelcome();
  } else if (currentScreen === "quiz") {
    renderQuiz();
  } else if (currentScreen === "results") {
    renderResults();
  }
}

// Funzione per stampare la schermata di avvio del quiz
function renderWelcome() {
  //Creo un div con un h1, gli assegno la classe .title, ci scrivo dentro e lo appendo a container
  const divTitle = document.createElement("div");
  const title = document.createElement("h1");
  divTitle.classList.add("title");
  title.textContent = "Benvenuto al tuo esame";

  container.appendChild(divTitle);
  divTitle.appendChild(title);

  //Creo un div con un paragrafo, aggiungo la classe .paragraph al paragrafo, cambio il suo contenuto testuale e lo appendo a container
  const divParagraph = document.createElement("div");
  const paragraph = document.createElement("p");
  divParagraph.classList.add("paragraph");
  paragraph.textContent =
    "Scegli una o più categorie e rispondi a una serie di domande sul mondo dell'informatica e del web.";

  container.appendChild(divParagraph);
  divParagraph.appendChild(paragraph);

  //Creo un div con una lista, aggiungo la classe .list al div e la appendo a container
  const divList = document.createElement("div");
  divList.classList.add("list");
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  li1.textContent = "Ogni domanda è a tempo e può ricevere una sola risposta.";
  const li2 = document.createElement("li");
  li2.textContent = "Una volta cliccata una risposta, la domanda è chiusa.";
  const li3 = document.createElement("li");
  li3.textContent = "Il quiz dura circa 3 minuti.";

  container.appendChild(divList);
  divList.appendChild(ul);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);

  //Creo il bottone per iniziare (parte disattivato)
  const button = document.createElement("button");
  button.classList.add("button", "buttonDisabled");
  button.textContent = "Inizia";
  button.disabled = true;

  //checkbox
  const labelConditions = document.createElement("label");
  labelConditions.classList.add("labelConditions");

  const checkboxConditions = document.createElement("input");
  checkboxConditions.type = "checkbox";
  checkboxConditions.classList.add("conditions");

  labelConditions.append(
    "Prometto di rispondere da solo e senza l'aiuto di nessuno",
    checkboxConditions,
  );

  // Inizia è attivo solo se la checkbox è spuntata e almeno una domanda nelle categorie scelte
  function updateStartButton() {
    const availableQuestions = QUESTIONS.filter((q) =>
      selectedCategories.includes(q.category),
    );
    const canStart =
      checkboxConditions.checked && availableQuestions.length > 0;
    button.disabled = !canStart;
    button.classList.toggle("buttonDisabled", !canStart);
  }

  checkboxConditions.addEventListener("change", updateStartButton);

  //Bottoni delle categorie
  const divCategories = document.createElement("div");
  divCategories.classList.add("categories");

  CATEGORIES.forEach((category) => {
    const btnCategory = document.createElement("button");
    btnCategory.classList.add("categoryBtn");
    btnCategory.textContent = category;

    if (category === "JavaScript") {
      btnCategory.classList.add("JavaScript");
    } else if (category === "HTML") {
      btnCategory.classList.add("HTML");
    } else if (category === "CSS") {
      btnCategory.classList.add("CSS");
    }

    btnCategory.addEventListener("click", () => {
      if (selectedCategories.includes(category)) {
        selectedCategories = selectedCategories.filter((c) => c !== category);
      } else {
        selectedCategories.push(category);
      }
      btnCategory.classList.toggle(
        "selected",
        selectedCategories.includes(category),
      );
      updateStartButton();
    });

    divCategories.appendChild(btnCategory);
  });

  button.addEventListener("click", () => {
    shuffledQuestions = buildQuiz(selectedCategories);
    currentScreen = "quiz";
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    render();
  });

  container.appendChild(divCategories);
  container.appendChild(labelConditions);
  container.appendChild(button);
}

window.onload = () => {
  render();
};

function renderQuiz() {
  //Pulizia del contenuto precedente
  container.textContent = "";

  const q = shuffledQuestions[currentQuestion];

  //span con contatore della domanda
  const divHeader = document.createElement("div");
  divHeader.classList.add("quizHeader");

  const spanNum = document.createElement("span");
  spanNum.classList.add("questNum");
  spanNum.textContent = `Domanda ${currentQuestion + 1} di ${shuffledQuestions.length}`;

  const questionCategory = document.createElement("span");
  questionCategory.classList.add("questionCategory");
  questionCategory.textContent = q.category;

  if (q.category === "JavaScript") {
    questionCategory.style.backgroundColor = "#739c5f";
  } else if (q.category === "HTML") {
    questionCategory.style.backgroundColor = "#d6bc6c";
  } else if (q.category === "CSS") {
    questionCategory.style.backgroundColor = "#5995af";
  }

  const spanTimer = document.createElement("div");
  spanTimer.classList.add("timerBox");
  spanTimer.id = "timerDisplay";

  const hourglassIcon = document.createElement("span");
  hourglassIcon.id = "hourglassIcon";

  const timerText = document.createElement("span");
  timerText.id = "timerText";

  spanTimer.appendChild(hourglassIcon);
  spanTimer.appendChild(timerText);

  divHeader.appendChild(spanNum);
  divHeader.appendChild(questionCategory);
  divHeader.appendChild(spanTimer);

  //Creazione h2 titolo domanda
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = q.question;

  //Div delle risposte con i bottoni
  const divAnswer = document.createElement("div");
  divAnswer.appendChild(title);

  //Shuffle bottoni stampati delle domande
  const allAnswers = [q.correct_answer, ...q.incorrect_answers];
  allAnswers.sort(() => Math.random() - 0.5);

  q.shuffledAnswers = allAnswers;

  //Ciclo per creare bottoni risposta in base al numero delle risposte necessarie
  allAnswers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    divAnswer.appendChild(btn);
  });

  // Click delle risposte
  divAnswer.addEventListener("click", (e) => {
    if (e.target.matches(".answer")) {
      // matches ce lo siamo cercati, controlla se l'evento ha un selettore css
      handleAnswer(e.target, e.target.textContent, q.correct_answer);
    }
  });

  container.appendChild(divHeader);
  container.appendChild(divAnswer);

  startTimer();
}

// GESTIONE RISPOSTA
function handleAnswer(clickedBtn, answer, correctAnswer) {
  clearInterval(timerId);
  userAnswers[currentQuestion] = answer;

  timeLeft = 0;
  updateTimerDisplay();

  setTimeout(() => {
    advance();
  }, FEEDBACK_DELAY);

  const allBtns = document.querySelectorAll(".answer");
  // Disabilita tutti i bottoni per impedire altri click
  allBtns.forEach((btn) => {
    btn.disabled = true;
  });
  // Se la risposta è corretta prende la classe true, che lo colora di verde, se è errata aggiunge la classe false alla risposta errata e la risposta giusta incrementa lo score.
  if (answer === correctAnswer) {
    clickedBtn.classList.add("true");
    score++;
  } else {
    clickedBtn.classList.add("false");
    allBtns.forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("true");
      }
    });
  }
}

//Funzione per andare avanti con le domande
function advance() {
  currentQuestion++;

  if (currentQuestion < shuffledQuestions.length) {
    renderQuiz();
  } else {
    currentScreen = "results";
    render();
  }
}

//Funzione per far iniziare il timer
function startTimer() {
  clearInterval(timerId);

  timeLeft = TIMER_DURATION;
  updateTimerDisplay();

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

//Funzione per far cambiare il colore al timer quando arriva a 5 secondi
function updateTimerDisplay() {
  const display = document.querySelector("#timerDisplay");
  const timerText = document.querySelector("#timerText");
  const hourglassIcon = document.querySelector("#hourglassIcon");

  timerText.textContent = `${timeLeft}s`;

  hourglassIcon.classList.remove(
    "fa-hourglass-start",
    "fa-hourglass-half",
    "fa-hourglass-end",
  );

  hourglassIcon.classList.add("fa-solid");

  const stepTime = (TIMER_DURATION - timeLeft) % 4;

  if (stepTime === 0) {
    hourglassIcon.textContent = "\uf251";
    hourglassIcon.classList.remove("fa-spin-snap-4");
    hourglassIcon.classList.add("fa-hourglass-start");
  } else if (stepTime === 1) {
    hourglassIcon.textContent = "\uf252";
    hourglassIcon.classList.add("fa-hourglass-half");
  } else if (stepTime === 2) {
    hourglassIcon.textContent = "\uf253";
    hourglassIcon.classList.add("fa-hourglass-end");
  } else if (stepTime === 3) {
    hourglassIcon.textContent = "\uf253";
    hourglassIcon.classList.add("fa-spin-snap-4");
  }

  if (timeLeft <= 5 && timeLeft > 0) {
    display.style.backgroundColor = "#ef4444";
    display.style.color = "#ffffff";
    hourglassIcon.classList.remove(
      "fa-hourglass-start",
      "fa-hourglass-half",
      "fa-spin-snap-4",
    );
    hourglassIcon.classList.add("fa-hourglass-end", "fa-beat-fade");
  } else if (timeLeft > 5 && timeLeft <= 20) {
    display.style.backgroundColor = "#0c113bf1";
    display.style.color = "#fff";
  } else if (timeLeft === 0) {
    display.style.backgroundColor = "#ef4444";
    display.style.color = "#ffffff";
    hourglassIcon.textContent = "\uf253";
    hourglassIcon.classList.remove(
      "fa-hourglass-start",
      "fa-hourglass-half",
      "fa-spin-snap-4",
      "fa-beat-fade",
    );
    hourglassIcon.classList.add("fa-hourglass-end");
  }
}

//Funzione per visualizzare la risposta giusta allo scadere del tempo, non c'è score++ perché se non rispondi non fai punti, per questo colora soltanto la risposta verde se il tempo è scaduto senza aggiungere punti per renderResults
function handleTimeUp() {
  userAnswers[currentQuestion] = null;
  const q = shuffledQuestions[currentQuestion];
  const allBtns = document.querySelectorAll(".answer");

  allBtns.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === q.correct_answer) {
      btn.classList.add("true");
    }
  });

  setTimeout(() => {
    advance();
  }, FEEDBACK_DELAY);
}

//Funzione che stampa a schermo i risultati del test
function renderResults() {
  const total = shuffledQuestions.length;

  const titleResult = document.createElement("h1");
  titleResult.textContent = "Risultati";
  titleResult.classList.add("title");

  const paragraphResult = document.createElement("p");
  paragraphResult.textContent = "Hai completato il quiz!";
  paragraphResult.classList.add("paragraphResult");

  const divContainerAnswers = document.createElement("div");
  divContainerAnswers.classList.add("resultsDivsContainer");

  const divCorrectAnswerNumber = document.createElement("div");
  const divWrongAnswerNumber = document.createElement("div");
  divCorrectAnswerNumber.classList.add("resultsDivs");
  divWrongAnswerNumber.classList.add("resultsDivs");

  const correctAnswerNumber = document.createElement("p");
  correctAnswerNumber.classList.add("resultsNumber");
  correctAnswerNumber.classList.add("corrette");
  const wrongAnswerNumber = document.createElement("p");
  wrongAnswerNumber.classList.add("resultsNumber");
  wrongAnswerNumber.classList.add("errate");

  const correctAnswerText = document.createElement("p");
  correctAnswerText.classList.add("resultsInfo");
  const wrongAnswerText = document.createElement("p");
  wrongAnswerText.classList.add("resultsInfo");

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttonsContainer");

  const buttonRestart = document.createElement("button");
  buttonRestart.classList.add("buttonResults");
  buttonRestart.textContent = "Ricomincia";

  buttonRestart.addEventListener("click", () => {
    currentScreen = "welcome";
    currentQuestion = 0;
    score = 0;
    clearInterval(timerId);
    timeLeft = TIMER_DURATION;
    shuffledQuestions = [];
    userAnswers = [];
    selectedCategories = [];
    render();
  });

  const buttonShowResults = document.createElement("button");
  buttonShowResults.classList.add("buttonResults");
  buttonShowResults.textContent = "Mostra risultati";

  buttonShowResults.addEventListener("click", () => {
    showResults();
  });

  buttonsContainer.appendChild(buttonShowResults);
  buttonsContainer.appendChild(buttonRestart);

  correctAnswerNumber.textContent = `${score}/${total}`;
  correctAnswerText.textContent = "Risposte corrette";

  let wrongScore = total - score;

  wrongAnswerNumber.textContent = `${wrongScore}/${total}`;
  wrongAnswerText.textContent = "Risposte errate";

  divContainerAnswers.appendChild(divCorrectAnswerNumber);
  divContainerAnswers.appendChild(divWrongAnswerNumber);
  divCorrectAnswerNumber.appendChild(correctAnswerNumber);
  divCorrectAnswerNumber.appendChild(correctAnswerText);
  divWrongAnswerNumber.appendChild(wrongAnswerNumber);
  divWrongAnswerNumber.appendChild(wrongAnswerText);

  const resultsBar = document.createElement("div");
  resultsBar.classList.add("resultsBar");

  const resultsBarFill = document.createElement("div");
  resultsBarFill.classList.add("resultsBarFill");

  const resultsScore = document.createElement("p");
  resultsScore.classList.add("resultsScore");

  //Percentuale di risposte corrette con if per la visualizzazione, se sopra 60% promosso, se sotto bocciato
  const percentage = Math.round((score / total) * 100);

  const textResults = document.createElement("p");
  textResults.classList.add("textResults");

  if (percentage >= PASS_THRESHOLD) {
    textResults.classList.add("corrette");
    textResults.textContent = "Promosso";
  } else {
    textResults.classList.add("errate");
    textResults.textContent = "Bocciato";
  }

  resultsScore.textContent = `0%`;

  let currentScore = 0;
  const durata = 1200;
  const step = 100;
  const intervallo = durata / step;
  const incremento = percentage / step;

  setTimeout(() => {
    const contIntervallo = setInterval(() => {
      currentScore += incremento;
      let scoreFinale = Math.round(currentScore);

      if (scoreFinale >= percentage) {
        scoreFinale = percentage;
        clearInterval(contIntervallo);
      }

      if (scoreFinale >= PASS_THRESHOLD) {
        resultsScore.classList.remove("percentBocciato");
        resultsScore.classList.add("percentPromosso");
      } else {
        resultsScore.classList.remove("percentPromosso");
        resultsScore.classList.add("percentBocciato");
      }

      resultsScore.textContent = `${scoreFinale}%`;
      resultsBar.style.background = `conic-gradient( #22C55E 0% ${scoreFinale}%, #FF6467 ${scoreFinale}% 100% )`;
    }, intervallo);
  }, 25);

  resultsBarFill.appendChild(resultsScore);
  resultsBar.appendChild(resultsBarFill);

  const legend = document.createElement("p");
  legend.classList.add("legendResults");
  legend.textContent = "Cliccando sul bottone \"Mostra Risultati\" vengono visualizzate le tue risposte corrette e errate. Le risposte corrette saranno evidenziate in verde, le risposte errate in rosso. Se non è stata data una risposta in tempo, sarà evidenziata di verde ma con una X rossa che sta a significare che il tuo punteggio non è aumentato con quella domanda.";

  container.appendChild(titleResult);
  container.appendChild(paragraphResult);
  container.appendChild(resultsBar);
  container.appendChild(textResults);
  container.appendChild(divContainerAnswers);
  container.appendChild(buttonsContainer);
  container.appendChild(legend);
}

function showResults() {
  const clearResults = document.querySelector(".divResults");
  if (clearResults) {
    clearResults.remove();
  }

  const divResults = document.createElement("div");
  divResults.classList.add("divResults");

  const divResultsTitle = document.createElement("h3");
  divResultsTitle.textContent = "Riepilogo delle tue risposte:";
  divResultsTitle.classList.add("divResultsTitle");
  divResults.appendChild(divResultsTitle);

  shuffledQuestions.forEach((quest, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("questionDiv");

    const questionTitle = document.createElement("p");
    questionTitle.classList.add("questionTitle");
    questionTitle.textContent = `Domanda ${index + 1}: ${quest.question}`;
    questionDiv.appendChild(questionTitle);

    const userArrayAnswer = userAnswers[index];

    quest.shuffledAnswers.forEach((answer) => {
      const chooseAnswer = document.createElement("div");
      chooseAnswer.textContent = answer;
      chooseAnswer.classList.add("chooseAnswer");

      //Se l'utente non risponde alla domanda
      if (userAnswers[index] === undefined || userAnswers[index] === null) {
        if (answer === quest.correct_answer) {
          // Si aggiunge la classe true alla domanda corretta anche se non selezionata, non si evidenzia niente di rosso (classe false) e quando viene premuto
          // il bottone Mostra Risultati nella schermata di renderResults, la risposta non data sarà visualizzata in verde con una X rossa
          chooseAnswer.classList.add("true");
          const cross = document.createElement("span");
          cross.textContent = "✖";
          cross.classList.add("cross");
          chooseAnswer.appendChild(cross);
        } else {
          chooseAnswer.classList.add("default");
        }
        // Se l'utente risponde alla domanda, se risponde correttamente si evidenzierà il bottone di verde, altrimenti si evidenzierà di rosso la risposta data
        // dall'utente e sarà evidenziata in verde la risposta corretta
      } else {
        if (answer === quest.correct_answer) {
          chooseAnswer.classList.add("correct");
        } else if (answer === userArrayAnswer && answer !== quest.correct_answer) {
          chooseAnswer.classList.add("incorrect");
        } else {
          chooseAnswer.classList.add("default");
        }
      }

      questionDiv.appendChild(chooseAnswer);
    });
    divResults.appendChild(questionDiv);
  });
  container.appendChild(divResults);
}