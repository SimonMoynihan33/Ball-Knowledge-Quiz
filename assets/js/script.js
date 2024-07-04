/*
/ Tutorial followed as a baseline. Link in ReadME.
/ Own changes made and improvements
*/

// Variables
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Who is the all-time top scorer in the UEFA Champions League?',
        choice1: 'Lionel Messi',
        choice2: 'Robert Lewandowski',
        choice3: 'Cristiano Ronaldo',
        choice4: 'Karom Benzema',
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

const MAX_QUESTIONS = 5;

// Function to start the game
function startGame() {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion () {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // Below code divides question counter by max questions and multiplies to get the progress bar to fill
    progressBarFull.computedStyleMap.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
}