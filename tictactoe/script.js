// DOM elements 
const board = document.getElementById("board");
const wonBanner = document.getElementById("winner");
const controlPanel =document.getElementById("game-control");
const startButton = document.getElementById('start-button');
const resetBtn = document.getElementById('reset-button');

// player boxes
const xBox = document.getElementById('x-box');
const oBox = document.getElementById('o-box');

// player type selection dropdowns
const xSelect = document.getElementById('x-select');
const oSelect = document.getElementById('o-select');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// game board module
const gameBoard = (() => {
    const boardArray = ["","","","","","","","",""]; // squares

    // creates squares 
    const createBoard = () => {
        for (let i=0;i<9;i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i);
            square.addEventListener('click', function(){
                if (gameController.isHumanTurn()) {
                    gameController.validateTurn(this);
                };                
            });
            board.appendChild(square);
        }
    };

    // reset the board for a new game
    resetBtn.addEventListener('click', () => {
        emptyBoard();
        board.innerHTML = "";
        wonBanner.innerHTML = "";
        gameController.startGame();
    });

    const emptyBoard = () => {
        for (let i=0;i<9;i++) {
            boardArray[i] = "";
        }
    }

    // createBoard();
    return {createBoard, emptyBoard, boardArray}

})();

// display control
const displayController =(() => {
    toggleButtons = () => {
        if (controlPanel.contains(startButton)) {
            controlPanel.removeChild(startButton);
        }
        resetBtn.style.visibility = 'visible';
    }

    return {toggleButtons}
})();

// game control
const gameController = (() => {
    let xValue = '';
    let oValue = '';
    let curTurn;

    const isHumanTurn = () => {
        if ((oValue === 'Human' && curTurn === 'O') || (xValue === 'Human' && curTurn === 'X')) {
            return true;
        }
        return false;

    }

    const isComputerTurn = () => {
        if ((oValue === 'CPU' && curTurn === 'O') || (xValue === 'CPU' && curTurn === 'X')) {
            return true;
        }
        return false;
    }

    const toggleTurn = () => {
        curTurn = (curTurn==='X' ? 'O' : 'X');
        if (isComputerTurn()) {
            setTimeout(() => {
                computerTurn()
            }, 200);
        };
    }

    const computerTurn = () => {
        // needs to be done at both the start and end of the computer turn
        if (checkDraw()) { 
            wonBanner.innerHTML = 'Draw...';     
            return;
        }
        // get an array of the indices corresponding to still empty squares
        let emptySquares = gameBoard.boardArray.reduce(function(a,e,i) {
            if (e === "") {
                a.push(i);
            }
            return a;            
        }, []);

        // randomly pick one of those squares
        randomPick = emptySquares[Math.floor(Math.random()*emptySquares.length)];
        
        let sqr = document.getElementById(randomPick); // square ids are their number
        console.log(sqr);
        gameBoard.boardArray[randomPick] = curTurn;
        sqr.innerHTML = gameBoard.boardArray[randomPick]; 
        
        

        // check for a winner
        if (checkWinner()) {
            wonBanner.innerHTML = `Winner! Player ${curTurn}`;     
            return;       
        } else if (checkDraw()) { 
            wonBanner.innerHTML = 'Draw...';     
            return;
        } else {
            // only switch the turn if there is no winner
            toggleTurn();
        } 
    }

    const validateTurn = (square) => {
        // // check draw needs to be done at the start of the turn 
        if (checkDraw()) {
            wonBanner.innerHTML = 'Draw...';     
            return;
        }

        // sets square value, if empty, and if the game is still on
        if (gameBoard.boardArray[square.id] === '' && !checkWinner()) {
            gameBoard.boardArray[square.id] = curTurn;
            square.innerHTML = gameBoard.boardArray[square.id];
        }

        // check for a winner
        if (checkWinner()) {
            wonBanner.innerHTML = `Winner! Player ${curTurn}`;     
            return;       
        } else {
            // only switch the turn if there is no winner
            toggleTurn();
        } 
    }

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameBoard.boardArray[winCondition[0]];
            const b = gameBoard.boardArray[winCondition[1]];
            const c = gameBoard.boardArray[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        return roundWon;
    }

    const checkDraw = () => {
        if (gameBoard.boardArray.indexOf("") === -1) {
            return true;
        } 
        return false;
    }

    const startGame = () => {
        xValue = xSelect.options[xSelect.selectedIndex].value;
        oValue = oSelect.options[oSelect.selectedIndex].value;
        curTurn = "X"; // for restarts

        gameBoard.createBoard();
        displayController.toggleButtons();

        // isComputerTurn returns true if the current turn matches the computer's icon
        if (isComputerTurn()) {
            computerTurn();
        }
        
    }    
    startButton.addEventListener('click', startGame);

    return {checkWinner, toggleTurn, validateTurn, startGame, isHumanTurn, curTurn}
})();

// computer controller 
const cpuController = (() => {
    // TODO will have AI functionality?
});