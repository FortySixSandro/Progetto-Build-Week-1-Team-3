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
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1000; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;
let timeLeft = TIMER_DURATION;
let shuffledQuestions = [];

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la domanda corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla domanda successiva o ai risultati
*/

const container = document.querySelector(".container");

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
    "Una serie di 10 domande sul mondo dell'informativa e del web. Per ogni domanda hai 20 secondi di tempo.";

  container.appendChild(divParagraph);
  divParagraph.appendChild(paragraph);

  //Credo un div con una lista, aggiungo la classe .list al div e la appendo a container
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

  //Creo un bottone per iniziare che quando cliccato aggiorna lo stato e renderizza, fa uno shuffle dell'array delle domande in modo che siano sempre in ordine casuale
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = "Inizia";
  button.disabled = true;


  //checkbox 
  const labelConditions = document.createElement("label");
  labelConditions.classList.add("labelConditions");

  const checkboxConditions = document.createElement("input");
  checkboxConditions.type = "checkbox";
  checkboxConditions.classList.add("conditions");

  labelConditions.appendChild(checkboxConditions);
  labelConditions.textContent = "Prometto di rispondere da solo e senza l'aiuto di nessuno";

  //spunta bottone attivo
  checkboxConditions.addEventListener("change", () => {
    if (checkboxConditions.checked) {
      button.disabled = false;
      button.classList.add("buttonDisabled");
    } else {
      button.disabled = true;
    }
  });

  // aggiunto evento
  button.addEventListener("click", () => {
    shuffledQuestions = [...QUESTIONS];
    shuffledQuestions.sort(() => Math.random() - 0.5);
    // aggiorna lo stato
    currentScreen = "quiz";
    //render per aggiornare la schermata
    render()
  });

  container.appendChild(labelConditions)
  labelConditions.appendChild(checkboxConditions);
  container.appendChild(button);

  container.appendChild(labelConditions);
  container.appendChild(button);
};

window.onload = () => {
  render();
};

function renderQuiz() {
  //Pulizia del contenuto precedente (renderWelcome o una domanda precedente)
  container.textContent = "";
  //span con contatore della domanda
  const divHeader = document.createElement("div");
  divHeader.classList.add("quizHeader");

  const spanNum = document.createElement("span");
  spanNum.classList.add("questNum");
  spanNum.textContent = `Domanda ${currentQuestion + 1} di ${TOTAL_QUESTIONS}`;

  const spanTimer = document.createElement("div");
  spanTimer.classList.add("timerBox");
  spanTimer.id = "timerDisplay";

  const hourglassIcon = document.createElement("span");
  hourglassIcon.id = "hourglassIcon";

  const timerText = document.createElement("span");
  timerText.id = "timerText";

  spanTimer.appendChild(hourglassIcon);
  spanTimer.appendChild(timerText);

  //Creazione h2 titolo domanda
  const q = shuffledQuestions[currentQuestion];
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = q.question;

  //Div delle risposte con i bottoni
  const divAnswer = document.createElement("div");
  divAnswer.classList.add("quizHeader");
  divAnswer.appendChild(title);

  //Shuffle bottoni stampati delle domande
  const allAnswers = [q.correct_answer, ...q.incorrect_answers];
  allAnswers.sort(() => Math.random() - 0.5);

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

  divHeader.appendChild(spanTimer);
  divHeader.appendChild(spanNum);
  container.appendChild(divHeader);
  container.appendChild(divAnswer);

  startTimer();
}

// GESTIONE RISPOSTA
function handleAnswer(clickedBtn, answer, correctAnswer) {
  clearInterval(timerId);

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

  if (currentQuestion < TOTAL_QUESTIONS) {
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

  hourglassIcon.classList.remove("fa-hourglass-start", "fa-hourglass-half", "fa-hourglass-end");
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
    hourglassIcon.classList.remove("fa-hourglass-start", "fa-hourglass-half", "fa-spin-snap-4");
    hourglassIcon.classList.add("fa-hourglass-end", "fa-beat-fade");
  } else if (timeLeft > 5 && timeLeft <= 20) {
    display.style.backgroundColor = "#0c113bf1";
    display.style.color = "#fff";
  } else if (timeLeft === 0) {
    display.style.backgroundColor = "#ef4444";
    display.style.color = "#ffffff";
    hourglassIcon.textContent = "\uf253";
    hourglassIcon.classList.remove("fa-hourglass-start", "fa-hourglass-half", "fa-spin-snap-4", "fa-beat-fade");
    hourglassIcon.classList.add("fa-hourglass-end");
  }
}

//Funzione per visualizzare la risposta giusta allo scadere del tempo, non c'è score++ perché se non rispondi non fai punti, per questo colora soltanto la risposta verde se il tempo è scaduto senza aggiungere punti per renderResults
function handleTimeUp() {
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
  //Creazione di div che sono stilizzati in CSS con classe resultsBar (le barre colorate esterne al cerchio), resultsBarFill (un cerchio bianco interno per dare l'effetto del grafico Epicode) e resultsInfo (Le scritte all'interno del cerchio resultBarFill)

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

  const buttonRestart = document.createElement("button");
  buttonRestart.classList.add("buttonRestart");
  buttonRestart.textContent = "Ricomincia";

  buttonRestart.addEventListener("click", () => {
    currentScreen = "welcome";
    currentQuestion = 0;
    score = 0;
    clearInterval(timerId);
    timeLeft = TIMER_DURATION;
    shuffledQuestions = [];
    render();
  });

  correctAnswerNumber.textContent = `${score}/10`;
  correctAnswerText.textContent = "Risposte corrette";

  wrongAnswerNumber.textContent = `${TOTAL_QUESTIONS - score}/10`;
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
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

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

  container.appendChild(titleResult);
  container.appendChild(paragraphResult);
  container.appendChild(resultsBar);
  container.appendChild(textResults);
  container.appendChild(divContainerAnswers);
  container.appendChild(buttonRestart);
}