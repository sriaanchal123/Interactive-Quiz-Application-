const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option-list");
const timeLine = document.querySelector("header .time-line");
const timeText = document.querySelector(".timer .time-left-txt");
const timeCount = document.querySelector(".timer .timer-sec");
let timeValue = 15;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restartQuizBtn = resultBox.querySelector(".buttons .restart");
const quitQuizBtn = resultBox.querySelector(".buttons .quit");
const nextBtn = document.querySelector("footer .next-btn");
const bottomQuesCounter = document.querySelector("footer .total-que");
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
};

exitBtn.onclick=()=>{
    infoBox.classList.remove("activeInfo");
}

continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  initializeQuiz();
};

restartQuizBtn.onclick = () => {
    resultBox.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz");
    resetQuiz();
    initializeQuiz();
  };
  
  quitQuizBtn.onclick = () => {
    window.location.reload();
  };
  nextBtn.onclick = () => {
    if (queCount < questions.length - 1) {
      queCount++;
      queNumb++;
      updateQuiz();
    } else {
      clearInterval(counter);
      clearInterval(counterLine);
      showResult();
    }
  }
  function initializeQuiz() {
    showQuestions(queCount);
    queCounter(queNumb);
    startTimer(timeValue);
    startTimerLine(widthValue);
  }
  
  function resetQuiz() {
    timeValue = 15;
    queCount = 0;
  queNumb = 1;
  userScore = 0;
  widthValue = 0;
}

function updateQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  nextBtn.classList.remove("show");
}

function showQuestions(index) {
  const queText = document.querySelector(".que-text");
  let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let optionTag = questions[index].options.map(option => `<div class="option"><span>${option}</span></div>`).join('');
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  optionList.querySelectorAll(".option").forEach(option => {
    option.onclick = () => optionSelected(option);
  });
}
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns === correctAns) {
      userScore++;
      answer.classList.add("correct");
      answer.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        highlightCorrectAnswer(correctAns);
      }
      disableOptions();
      nextBtn.classList.add("show");
    }
    
function highlightCorrectAnswer(correctAns) {
    for (let i = 0; i < optionList.children.length; i++) {
      if (optionList.children[i].textContent === correctAns) {
        optionList.children[i].classList.add("correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }
  function disableOptions() {
    for (let i = 0; i < optionList.children.length; i++) {
      optionList.children[i].classList.add("disabled");
    }
  }
  
  function showResult() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag = '';
  if (userScore > 3) {
    scoreTag = `<span>and congrats! , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else if (userScore > 1) {
    scoreTag = `<span>and nice , You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  } else {
    scoreTag = `<span>and sorry , You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
  }
  scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
  counter = setInterval(() => {
    timeCount.textContent = time > 9 ? time : `0${time}`;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      highlightCorrectAnswer(questions[queCount].answer);
      disableOptions();
      nextBtn.classList.add("show");
    }
  }, 1000);
}
function startTimerLine(time) {
    const totalTime = 550; 
    counterLine = setInterval(() => {
      time += 1;
      let progressPercentage = (time / totalTime) * 100;
      timeLine.style.width = `${progressPercentage}%`;
      if (time >= totalTime) {
        clearInterval(counterLine);
      }
    }, 29);
  }
  function queCounter(index) {
    let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    bottomQuesCounter.innerHTML = totalQueCounTag;
  }
  
  const tickIconTag = '<div class="icon tick"><i class="fas fa-solid fa-check"></i></div>';
  const crossIconTag = '<div class="icon cross"><i class="fas fa-solid fa-times"></i></div>';
  