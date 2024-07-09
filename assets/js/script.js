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
let timerInterval; 

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
    {
        question: 'Which club has won the most UEFA Champions League titles as of 2024?',
        choice1: 'Barcelona',
        choice2: 'AC Milan',
        choice3: 'Bayern Munich',
        choice4: 'Real Madrid',
        answer: 4,
    },
    {
        question: 'Who is the heighest goal scorer in history',
        choice1: 'Lionel Messi',
        choice2: 'Maradonna',
        choice3: 'Pele',
        choice4: 'Cristiano Ronaldo',
        answer: 4,
    },
    {
        question: 'Who won the first ever Premier League title in 1992/93?',
        choice1: 'Manchester United',
        choice2: 'Liverpool',
        choice3: 'Newcastle',
        choice4: 'Arsenal',
        answer: 1,
    },
    {
        question: 'In which year did England win their only World Cup title?',
        choice1: '1963',
        choice2: '1956',
        choice3: '1966',
        choice4: '1968',
        answer: 3,
    },
    {
        question: 'Who holds the record for most goals scored in the Premier League?',
        choice1: 'Thierry Henry',
        choice2: 'Alan Shearer',
        choice3: 'Wayne Rooney',
        choice4: 'Mohammed Salah',
        answer: 2,
    },
]

const SCORE_POINTS = 1000;
const MAX_QUESTIONS = 10;
const TIME_LIMIT = 10;

let timeLeft = TIME_LIMIT;

/**
 * Function to start the game
 **/ 
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

/**
 *  Main function 
 */
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

/**
 *  Checks if quiz is over by verifying if there are no more questions or counter has exceeded maximum
 */
function isQuizOver() {
    return availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS;
}

/**
 * Handles logic for ending quiz, displaying score, redirecting to end page
 */
function endQuiz() {
    localStorage.setItem('mostRecentScore', score);
    window.location.assign('/end.html');
    displayFinalScore();
}

/**
 * Increment question counter 
 */
function incrementQuestionCounter() {
    questionCounter++;
}

/**
 * Updates progress text and progress bar
 */
// Tutorial followed in more detail for progress bar with slight changes made to code 
function updateProgress() {
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
}

/**
 * Selects a new question, updates choices displayed and removes old question
 */
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

/**
 * Allows user to submit an answer
 */
function enableAnswering() {
    acceptingAnswers = true;
}

/**
 * Click event for choices
 */
function setupEventListener(choices) {
    choices.forEach(choice => {
        choice.addEventListener('click', handleChoiceClick);
    });
}

/**
 * Handle click event for a choice
 */
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

/** 
 * Determine class to apply based on selected answer
 */
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

function updateTimer() {
    timerText.innerText = `${timeLeft}s`
}

/**
 * Resets timer to beginning
 */
function resetTimer() {
    clearInterval(timerInterval); // Clear existing timer
    timeLeft = TIME_LIMIT;
    updateTimer(); // Call updateTimer function to display initial time and show decrementing
    startTimer();
}

/**
 * Function to start timer countdown
 */
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            handleTimeExpired();
        }

    }, 1000); // Decrement timer every 1 second
}

function handleTimeExpired() {
    acceptingAnswers = false;
    clearInterval(timerInterval); // Clear timer when time expires
    getNewQuestion(); // Move to next question
}

/**
 * Display final score
 */
if (window.location.pathname === '/end.html') {
    const finalScore = document.querySelector('#final-score');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    finalScore.innerText = mostRecentScore;
} else {
    setupEventListener(choices); // Call click event listener
    startGame(); // Call start function
}


setupEventListener(choices); // Call click event listener
startGame(); // Call start function