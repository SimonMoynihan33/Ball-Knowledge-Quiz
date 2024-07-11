/**
 * Display final score
 */
if (window.location.pathname.endsWith('/end.html')) {
    const finalScore = document.querySelector('#final-score');
    const lastScore = localStorage.getItem('mostRecentScore');
    if (finalScore) {
        finalScore.innerText = Number(lastScore);
    }
} else {
    setupEventListener(choices); // Call click event listener
    startGame(); // Call start function
}