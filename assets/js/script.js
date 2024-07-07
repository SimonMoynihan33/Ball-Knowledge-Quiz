/*
/ Tutorial followed as a baseline. Link in ReadME.
/ Own changes made and improvements
*/

// Variables
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#timer-text');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'Who is the all-time top scorer in the UEFA Champions League?',
        choice1: 'Lionel Messi',
        choice2: 'Robert Lewandowski',
        choice3: 'Cristiano Ronaldo',
        choice4: 'Karim Benzema',
        answer: 3,
    },
    {
        question: 'Which country won the first FIFA World Cup held in 1930?',
        choice1: 'Brazil',
        choice2: 'Germany',
        choice3: 'Uruguay',
        choice4: 'Argentina',
        answer: 3,
    },
    {
        question: "Which soccer club is known as 'The Red Devils'?",
        choice1: 'Liverpool',
        choice2: 'Bayern Munich',
        choice3: 'Arsenal',
        choice4: 'Manchester United',
        answer: 4,
    },
    {
        question: 'In which year did the Premier League start?',
        choice1: '1990',
        choice2: '1992',
        choice3: '1995',
        choice4: '1998',
        answer: 2,
    },
    {
        question: 'Who won the Golden Boot in the 2018 FIFA World Cup?',
        choice1: 'Kylian Mbappe',
        choice2: 'Lionel Messi',
        choice3: 'Harry Kane',
        choice4: 'Luka Modric',
        answer: 3,
    },
]

const SCORE_POINTS = 1000;
const MAX_QUESTIONS = 5;

// Function to start the game
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

// Main function 
function getNewQuestion() {
    if (isQuizOver()) {
        endQuiz();
        return;
    }

    incrementQuestionCounter();
    updateProgress();
    updateQuestion();
    enableAnswering();
    resetTimer(); 
}

// Checks if quiz is over by verifying if there are no more questions or counter has exceeded maximum
function isQuizOver() {
    return availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS;
}

// Handles logic for ending quiz, saving score, redirecting to end page
function endQuiz() {
    localStorage.setItem('mostRecentScore', score);
    window.location.assign('/end.html');
}

// Increment question counter 
function incrementQuestionCounter() {
    questionCounter++;
}

// Updates progress text and progress bar
// Tutorial followed in more detail for progress bar with slight changes made to code 
function updateProgress() {
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
}

// Selects a new question, updates choices displayed and removes old question
function updateQuestion() {
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
}

// Allows user to submit an answer
function enableAnswering() {
    acceptingAnswers = true;
}

// Click event for choices
function setupEventListener(choices) {
    choices.forEach(choice => {
        choice.addEventListener('click', handleChoiceClick);
    });
}

// Handle click event for a choice
function handleChoiceClick(e) {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // Applies red or green css class to indicate answer
    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS);
    }

    applyClassAndContinue(selectedChoice, classToApply);
}

// Determine class to apply based on selected answer
function applyClassAndContinue(selectedChoice, classToApply) {
    selectedChoice.parentElement.classList.add(classToApply);

    // Allows time to see if answer is correct 
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

// Create Timer for each question
// Perplexity asked to explain how to create timer but custom made
const TIME_LIMIT = 10;

let timeLeft = TIME_LIMIT;

function updateTimer() {
    console.log("update Timer");
    timerText.innerText = `Time left: ${timeLeft}s`
    decrementTimer();
}

function resetTimer() {
    timeLeft = TIME_LIMIT;
    console.log('Timer reset to:', timeLeft);
    updateTimer(); // Call updateTimer function to display initial time and show decrementing
}

function decrementTimer() {
    this.setTimeout(() => {
        if (timeLeft > 0) {
            timeLeft--;
            console.log("Time Left", timeLeft);
            updateTimer();
        } else {
            handleTimeExpired();
        }

    }, 1000); // Decrement timer every 1 second
}

function handleTimeExpired() {
    acceptingAnswers = false;
    getNewQuestion(); // Move to next question
}


setupEventListener(choices); // Call click event listener
startGame(); // Call start function