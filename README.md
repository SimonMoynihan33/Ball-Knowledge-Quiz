# Ball Knowledge Quiz

Welcome to the Soccer Knowledge Quiz project! This quiz is designed to challenge and enhance your understanding of the world's most popular sport, soccer. Whether you're a passionate fan, a budding player, or just someone looking to test your knowledge, this quiz offers a fun and educational experience. Dive into questions covering the history of soccer, famous players, iconic matches, rules of the game, and much more. Get ready to put your soccer knowledge to the test and see how you score!

## Why 

Why did I choose this topic? Soccer as a sport is very close to me. It has truly helped me through tougher times in life as an escape, and I believe many people can resonate with that. I watch, and play, as much as I can today and it's often to high point of my day. It's the beautiful game.

## Table of Contents

- [Creation Structure](#creation-structure)
- [User Experience](#user-experience)
- [Goals](#goals)
- [Features](#features)
- [Design](#design)
- [Future Deployment](#future-deployment)
- [Testing](#testing)
- [Bugs](#bugs)
- [Deployment](#deployment)
- [Credits](#credits)

## Creation Structure
### Wireframes

## User Experience

### First Time Users

#### Goals for first time users


### Repeat Users


## Goals

## Features


## Design






## Future Deployment

## Testing 

### Manual Testing


### Lighthouse scores
- **Desktop**


- **Mobile**


### Validator Testing 

- HTML
  
- CSS
  

- WAVE
  - Each page was put through [WAVE](https://wave.webaim.org/) evaluation tool and any errors found were fixed.

## Bugs
#### Bug 1 

**Cannot get the options in the containers to show along with question.**

- Troubleshooting:

I knew this has something to do with the ```function updateQuestion()```, as this was responsible for handling the updating of the question and choices and removing the old ones. I used  ```console.log()``` in the choices section of my function and the console threw the error ```Uncaught ReferenceError: number is not defined```.

This led me to the conclusion it was due to my naming of a variable and it not being properly defined.

- To fix this the variable of:

```
const choiceNumber = choice.dataset['number];
```

Needed to be changed to

```
const number = choice.dataset['number'];
```

#### Bug 2 

**Page must be refreshed in order to pick a new answer.**
- Fix:

``` 
function enableAnswering() {
    acceptingAnswers = true;
}
```
This function was not being called due to a spelling error ```function enableAnsweringAnswering ()``` after I had changed it from ```allowAnswering()```.

#### Bug 3

**Progress bar not updating with questions.**

- Troubleshooting:

I was unable to see the issue here myself. I spent a long time looking through the code but as I had not come across this specific code before I was unable to see the issue. To trouble shoot this the only option I felt I had was to look through outside resources, I asked a question about it on a thread on stack overflow and got a reply telling me where my issue was. 

- Fix:
```
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  ```
Was:
  ```
    progressBarFull.computedStyleMap.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  ```

This was changed by Emmet autofill when typing and I had never noticed. 

#### Bug 4 

**Timer not counting down.**

- Troubleshooting:

I searched through my code implementing the timer thouroughly. Here, I turned to perplexity AI, and asked it why a timer would not be counting down. They gave me many reasons and things to check, one of which was that I had properly declared the variable in my global scope. After checking, I saw my issue was a syntax mistake in the variable ```const timerText = document.querySelector('timerText');```.

- Fix: Change variable to
```
const timerText = document.querySelector('#timer-text');
```

#### Bug 5

Timer does not reset after moving to next question
- Fix: 

Add ```resetTimer();``` function to ```getNewQuestion();``` function

#### Bug 6

**Timer increments by two seconds instead of one**

Troubleshooting: 

This bug has been the most time consuming. To trouble shoot I added multiple ```setTimeout``` in different places to make the timer increment slower, but this only made the timer of the first question take longer than 10s to reach 0, and once a question was answered the timer would decrement by 2 again. My thinking was that the ```decrementTimer();``` function calls itself twice per second within it's own function, but when this was removed it would only decrement once and not continue. 

I firstly put a second ```setTimeout``` within the function: 
```
 // Wrapped in seperate setTimeout so the timer does not decrement by two seconds
        setTimeout(() => {
            decrementTimer(); // Repeat call to continue the countdown
          }, 1000);
```
This did not work and only served to slow down the first iteration of the countdown to two seconds per one second countdown.

Secondly, I reached out to tutor support. Gemma and I spent about 30-40 minutes troubleshooting the issue together to no avail. Every possible solution led to the same result or the timer refusing to decrement at all. 

Next, I removed the ```decrementTimer();``` function within itself and called it within the ```updateTimer();``` function instead. This is cleaner as the function was not calling itself from inside itself, but did not solve the issue. I also added multiple console.log's throughout the ```decrementTimer();```, ```updateTimer();``` and ```resetTimer();``` respectively, showing that it was indeed decrementing by one second, but that was happening twice *per second*.

#### Bug 7

Issue - Could not get score to show on end.html

Cause - Code had to be activating only on end.html page, and score had to be saved to local storage

Fix - 
```
if (window.location.pathname === '/end.html') {
    const finalScore = document.querySelector('#final-score');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    finalScore.innerText = Number(mostRecentScore);
} else {
    setupEventListener(choices); // Call click event listener
    startGame(); // Call start function
}
```
#### Bug 8

Issue - Relative file path not working in JS. When the quiz is finished the end.html page won't show.


## Credits
- Photos 
- Youtube tutorial https://www.youtube.com/watch?v=f4fB9Xg2JEY&list=PLmEz6BxNwVPc-oP7rMw_oJ7yssN0jT844&index=2 By 'Brian Design'
- sports quiz photo https://www.scoopwhoop.com/sports/50-iconic-football-photos-from-through-the-ages-that-every-fan-needs-to-see/
- games quiz photo https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cnet.com%2Ftech%2Fgaming%2Fgod-of-war-ragnarok-is-bigger-better-and-less-memorable-than-its-predecessor%2F&psig=AOvVaw3xu_BN9iPzp8FkdisK9KOh&ust=1720102948747000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID1qP-Ii4cDFQAAAAAdAAAAABAK
- (background)[https://mrwallpaper.com/images/hd/hd-football-nike-black-hhdfdw95z8vh702t.jpg]