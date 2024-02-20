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
    // hide start scree
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
  
  
function getQuestion() {
    // get current question object from array
    let currentQuestion = questions[currentQuestionIndex];
    // update title with current question
    questionTl.innerHTML = currentQuestion.title;
    // clear out any old question choices
    // loop over the choices for each question
    // get the number of questions
    let numberOfQuestions = questions.length; // assign it the value of the length of the questions array
    let choicesContainer = [];
  
   for (choice of currentQuestion.choices) {
      // create a new button for each choice, setting the label and value for the button
      choicesContainer.push(
        `<div>
          <label>
            <input type="radio" value="${choice}" name="answer${currentQuestionIndex}">
              ${choice}
          </label>
        </div>`
      );
    }
      // display the choice button on the page *
      document.getElementById('choices').innerHTML = choicesContainer.join('');
    }


function questionClick() {
    // identify the targeted button that was clicked o
    let selected = `input[name=answer${currentQuestionIndex}]:checked`;

    // if the clicked element is not a choice button, do nothing., else do something
    let userAnswer = (document.querySelector(selected) || {}).value;

    // check if user guessed wrong
    if (!(userAnswer === questions[currentQuestionIndex].answer)) {
        
        // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
        // recall the timer is the score they get at the end
        time -= 15;
        
        // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz
        if (time <= 0) {
            time = 0;
        }
        
        // display new time on page
        document.getElementById('time').innerHTML = time;
    
        // play "wrong" sound effect
        sfxWrong.play();
    
        // display "wrong" feedback on page
        document.getElementById('feedback').innerHTML = `<p class="blinkText" style="color:red"> Wrong Choice!</p>`;
        
    } else {
    
        // play "right" sound effect
        sfxRight.play();
    
        // display "right" feedback on page by displaying the text "Correct!" in the feedback element
        // flash right feedback on page for half a second
        document.querySelector('#feedback').innerHTML = `<p class = "blinkText" style="color:green"> Correct !</p>`
    }

    // set the feedback element to have the class of "feedback"
    document.querySelector('#feedback').setAttribute("class", "feedback");
    
    // after one second, remove the "feedback" class from the feedback element
    setTimeout(() => {
    document.querySelector('.feedback').setAttribute("class", "feedback hide")
    }, 1000);
    
    currentQuestionIndex++;
    
    // check if we've run out of questions
    // if the time is less than zero and we have reached the end of the questions array,
    // call a function that ends the quiz (quizEnd function)
    if ((currentQuestionIndex === questions.length) || time === 0) {
    console.log("end quizooo");
    quizEnd();
    } else {
        // or else get the next question
        // move to next question
        getQuestion();
    }
    
}
  