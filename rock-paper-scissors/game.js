// starting scores
let computerScore = 0;
let playerScore = 0;

// selectors
const rpsButtons = document.querySelectorAll('.selectionButton')
const roundResultsLabel = document.querySelector('#roundResults')
const playerScoreLabel = document.querySelector("#playerScoreLabel")
const computerScoreLabel = document.querySelector("#computerScoreLabel")
const playerScoreBox = document.querySelector("#playerScoreBox")
const computerScoreBox = document.querySelector("#computerScoreBox")
const resultSection = document.querySelector('#resultsSection')
const winnerLabel = document.querySelector('#winnerLabel')
const finalScore = document.querySelector('#finalScore')


// selection functions
// computer selection generates random number, returns a selection as a string
function getComputerSelection(){
    let num = Math.floor(Math.random() * 3);
    return num == 0 ? 'rock' : num == 1 ? 'scissors' : 'paper';
}

// gets the selection from the button that was pressed & animates the button
// starts the round
function getPlayerSelection(e){
    let selection = e.target.id;
    e.target.classList.add('pressed');
    playRound(selection, getComputerSelection());
}

// game functions 
// update the scores & corresponding labels, and check for winners
function playRound(playerSelection, computerSelection) {
    if (!computerSelection || !playerSelection) {
        return "Error! One of the selections is undefined"
    }
    if (computerSelection == playerSelection) {
        roundResultsLabel.textContent = "Tie Game!"
    } else if (
        // player wins round
        (computerSelection=='rock' && playerSelection=='paper') ||
        (computerSelection=='paper' && playerSelection=='scissors') ||
        (computerSelection=='scissors' && playerSelection=='rock') 
    ) {
        playerScore++;
        playerScoreLabel.textContent = playerScore;
        roundResultsLabel.textContent = `You win! ${toTitleCase(computerSelection)} beats ${toTitleCase(playerSelection)}`;
        checkWinner();
    } else {
        // computer wins round
        computerScore++;
        computerScoreLabel.textContent = computerScore; 
        roundResultsLabel.textContent = `You lose! ${toTitleCase(computerSelection)} beats ${toTitleCase(playerSelection)}`;
        checkWinner();
    }
}

function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// checks for winner; animates the corresponding score box
// disables the buttons when there's a winner
function checkWinner() {
    if (playerScore == 5 || computerScore == 5) {
        if (playerScore > computerScore) {
            playerScoreBox.classList.add('winner');
        } else {
            computerScoreBox.classList.add('winner');
        };
        updateWinnerLabel();
        rpsButtons.forEach(button => {
            button.removeEventListener('click', getPlayerSelection)
        });
    }
}

// updates winner label, adds a reset button to refresh the page
function updateWinnerLabel() {
    winnerLabel.textContent = `Game over!`
    finalScore.textContent = `You: ${playerScore}  |  Computer: ${computerScore}`
    resultSection.appendChild(resetButton);
}

// reset button
// added to the winner label once the game is over
const resetButton = document.createElement('button');
resetButton.textContent = 'Play Again?'
resetButton.setAttribute('class', 'selectionButton');
resetButton.setAttribute('onClick', 'window.location.reload(true)');

// buttons
rpsButtons.forEach(button => {
    button.addEventListener('click', getPlayerSelection)
});

// transition end event
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
};
rpsButtons.forEach(button => {
    button.addEventListener('transitionend', removeTransition)
});

