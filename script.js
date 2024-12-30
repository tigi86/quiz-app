const questions = [
  {
    question: "which one is the capital city of Ethiopia?",
    answers: [
      { text: "Awassa", correct: false },
      { text: "Addis Ababa", correct: true },
      { text: "Hossana", correct: false },
      { text: "dre dawa", correct: false },
    ],
  },
  {
    question: "which one is the the code editer?",
    answers: [
      { text: "Vs code", correct: false },
      { text: "Sublime", correct: false },
      { text: "notepad", correct: false },
      { text: "all", correct: true },
    ],
  },
  {
    question: "which one is the device is used to write code?",
    answers: [
      { text: "laptop", correct: true },
      { text: "car", correct: false },
      { text: "gitar", correct: false },
      { text: "none of them", correct: false },
    ],
  },
  {
    question: "which one the ff is frontend language?",
    answers: [
      { text: "c++", correct: false },
      { text: "react", correct: true },
      { text: "node.js", correct: false },
      { text: "none of them", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQestion();
}

function showQestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
