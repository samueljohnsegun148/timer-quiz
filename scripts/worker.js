// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;
let p =0;

// add variables to reference DOM elements
// example is below
let questionsEl = document.getElementById('questions');
let questionEl = document.getElementById('question-title');
let questionTl = document.getElementById('question-title');
// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');
let startScreenEl = document.getElementById('start-screen');
let startBtn = document.querySelector('#start');

function startQuiz() {
    // hide start screen
   
    startScreenEl.style.display = "none";
  
    // un-hide questions section
    questionsEl.style.display = "block";
  
    // start timer
    timerId = setInterval(clockTick, 1000);
   
    
  
    // show starting time
    document.getElementById('time').innerHTML = time;
  
    // call a function to show the next question
    getQuestion();
  }
  