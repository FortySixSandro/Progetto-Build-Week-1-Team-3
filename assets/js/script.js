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
const PASS_THRESHOLD = 60;     // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1000;   // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20;     // secondi per ogni domanda

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;
let timeLeft = TIMER_DURATION;

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

/*const app = document.querySelector('#app');
const paragraph = document.querySelector('#paragraph');
const list = document.querySelector('#list');*/

const container = document.querySelector('.container');
const app = document.querySelector('#app');
const countDown = document.querySelector('countDown');
const containerDomande = document.querySelector('containerDomande');
const answer = document.querySelector('.answer');

function render() {
  container.textContent = '';

  if (currentScreen === 'welcome') {
    renderWelcome();
  } else if (currentScreen === 'quiz') {
    renderQuiz();
  } else if (currentScreen === 'results') {
    renderResults();
  }
}

// Funzione renderWelcome finita, da modificare e da aggiungere il click per iniziare
function renderWelcome() {
  const divTitle = document.createElement('div');
  const title = document.createElement('h1');
  divTitle.classList.add('title');
  title.textContent = 'Benvenuto al tuo esame';

  container.appendChild(divTitle);
  divTitle.appendChild(title);

  const divParagraph = document.createElement('div');
  const paragraph = document.createElement('p');
  divParagraph.classList.add('paragraph');
  paragraph.textContent = 'Una serie di 10 domande sul mondo dell\'informativa e del web. Per ogni domanda hai 20 secondi di tempo.';

  container.appendChild(divParagraph);
  divParagraph.appendChild(paragraph);

  const divList = document.createElement('div');
  divList.classList.add('list');
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  li1.textContent = 'Ogni domanda è a tempo e può ricevere una sola risposta.';
  const li2 = document.createElement('li');
  li2.textContent = 'Una volta cliccata una risposta, la domanda è chiusa.';
  const li3 = document.createElement('li');
  li3.textContent = 'Il quiz dura circa 3 minuti.';

  container.appendChild(divList);
  divList.appendChild(ul);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);


  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Inizia';
  container.appendChild(button);
  button.addEventListener('click', (e) => {
    // aggiorna lo stato
    currentScreen = 'quiz';
    //render per aggiornare la schermata
    render();
  });
}

window.onload = () => {
  render();
};

function renderQuiz() {
  //Pulizia
  container.textContent = '';
  //span con contatore della domanda
  const divHeader = document.createElement('div');
  divHeader.classList.add('quizHeader');

  const spanNum = document.createElement('span');
  spanNum.classList.add('questNum');
  spanNum.textContent = `Domanda ${currentQuestion + 1} di ${TOTAL_QUESTIONS}`;

  const spanTimer = document.createElement('span');
  spanTimer.classList.add('timerBox');
  spanTimer.id = 'timerDisplay';
  spanTimer.textContent = `${TIMER_DURATION}s`;

  //Creazione h2 titolo domanda
  const q = QUESTIONS[currentQuestion];
  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = q.question;

  //
  const divAnswer = document.createElement('div');
  divAnswer.classList.add('quizHeader');
  divAnswer.appendChild(title);


  const allAnswers = [q.correct_answer, ...q.incorrect_answers];
  allAnswers.sort(() => Math.random() - 0.5);

  allAnswers.forEach(answer => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = answer;
    divAnswer.appendChild(btn);
  });

  divAnswer.addEventListener('click', (e) => {
    if (e.target.matches('.answer')) { // matches ce lo siamo cercati, controlla se l'evento ha un selettore css
      handleAnswer(e.target, e.target.textContent, q.correct_answer);
    }
  });

  divHeader.appendChild(spanTimer);
  divHeader.appendChild(spanNum);
  container.appendChild(divHeader);
  container.appendChild(divAnswer);

  startTimer();

};

// GESTIONE RISPOSTA
function handleAnswer(clickedBtn, answer, correctAnswer) {
  clearInterval(timerId);

  setTimeout(() => {
    advance();
  }, FEEDBACK_DELAY);

  const allBtns = document.querySelectorAll('.answer');
  // Disabilita tutti i bottoni per impedire altri click
  allBtns.forEach(btn => {
    btn.disabled = true;
  });

  if (answer === correctAnswer) {
    clickedBtn.classList.add('true');
    score++;
  } else {
    clickedBtn.classList.add('false');
    allBtns.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('true');
      }
    })
  }
}

function advance() {
  currentQuestion++;

  if (currentQuestion < TOTAL_QUESTIONS) {
    renderQuiz();
  } else {
    currentScreen = 'results';
    render();
  }
}

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

function updateTimerDisplay() {
  const display = document.querySelector('#timerDisplay');
  if (display) {
    //Numero che diminiusce
    display.textContent = `${timeLeft}s`;
    // Colore urgente sotto i 5 secondi
    if (timeLeft <= 5) {
      display.style.backgroundColor = '#ef4444';
      display.style.color = '#ffffff';
    } else {
      display.style.backgroundColor = '#0c113bf1';
      display.style.color = '#fff';
    }
  }
}

function handleTimeUp() {
  const q = QUESTIONS[currentQuestion];
  const allBtns = document.querySelectorAll('.answer');

  allBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.correct_answer) {
      btn.classList.add('true');
    }
  });

  setTimeout(() => {
    advance();
  }, FEEDBACK_DELAY);
}


function renderResults() {
  const resultsBar = document.createElement('div');
  resultsBar.classList.add('results-bar');

  const resultsBarFill = document.createElement('div');
  resultsBarFill.classList.add('results-bar-fill');

  const resultsTitle = document.createElement('p');
  resultsTitle.classList.add('results-info');

  const resultsScore = document.createElement('p');
  resultsScore.classList.add('results-info');

  const resultsQuestions = document.createElement('p');
  resultsQuestions.classList.add('results-info');

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  if (percentage >= PASS_THRESHOLD) {
    resultsTitle.textContent = 'Sei stato PROMOSSO!';
    resultsTitle.classList.add('promosso');
  } else {
    resultsTitle.textContent = 'Sei stato BOCCIATO...';
    resultsTitle.classList.add('bocciato');
  }

  resultsScore.textContent = `${percentage}%`;

  resultsQuestions.textContent = `${score}/${TOTAL_QUESTIONS} corrette`;

  resultsBar.style.background = `conic-gradient( #22C55E 0% ${percentage}%, #FF6467 ${percentage}% 100% )`;

  resultsBarFill.appendChild(resultsTitle);
  resultsBarFill.appendChild(resultsScore);
  resultsBarFill.appendChild(resultsQuestions);
  resultsBar.appendChild(resultsBarFill);
  container.appendChild(resultsBar);
}

