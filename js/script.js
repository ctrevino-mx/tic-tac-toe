// Elements selectors
const bodyTicTacToe = document.querySelectorAll('.square');
const clearBtn = document.querySelector('#clearButton');
const winnerBanner = document.querySelector("#winner");

// Data structures to define a winning combination
const winningCombinations = ['123','456','789','147','258','369','159','357'];
let playerRedGame = ['000','000','000'];
let playerBlueGame = ['000','000','000'];

// Variables for game control
let redTurn = true;
let counter = 0;
let haveAWinner = false;


// FUNCTION TO MODEL THE GAME
function modelingGame(currentSelection, colorPlayer) {
    myString = '';
    let currentRow = '';

    // Getting array element based on the row in which the square is located
    if (currentSelection >= 1 && currentSelection <= 3) {
        delta = 0;
        if (colorPlayer === 'Red') {
            currentRow = playerRedGame[0];
        } else {
            currentRow = playerBlueGame[0];            
        }
    } else if (currentSelection >= 4 && currentSelection <= 6) {
        delta = 3;
        if (colorPlayer === 'Red') {
            currentRow = playerRedGame[1];
        } else {
            currentRow = playerBlueGame[1];            
        }
    } else if (currentSelection >= 7 && currentSelection <= 9) {
        delta = 6;
        if (colorPlayer === 'Red') {
            currentRow = playerRedGame[2];
        } else {
            currentRow = playerBlueGame[2];            
        }  
    }    

    // Creating the row string based on current square position 1..9
    for (let i = 0; i < 3; i++) {
        if ((i + delta) === (currentSelection - 1)) {
            myString += currentSelection;
        } else {
            myString += currentRow[i];
        }    
    }

    // Assigning the updated row status to the proper array position
    if (delta === 0) {
        if (colorPlayer === 'Red') {
            playerRedGame[0] = myString;
        } else {
            playerBlueGame[0] = myString;
        }
    }
    if (delta === 3) {
        if (colorPlayer === 'Red') {
            playerRedGame[1] = myString;
        } else {
            playerBlueGame[1] = myString;
        }
    }
    if (delta === 6) {
        if (colorPlayer === 'Red') {
            playerRedGame[2] = myString;
        } else {
            playerBlueGame[2] = myString;
        }    
    }
}

//
// THIS FUNCTION DETERMINES IF THERE IS A WINNER BECAUSE OF THE LAST MOVE
//
function evaluatingGame(player) {
    let gameCombination = '';

// HORIZONTAL ROWS
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < winningCombinations.length; j++) {
            if (player === 'Red') {
                if (playerRedGame[i] === winningCombinations[j]) {
                    winnerBanner.innerHTML = 'PLAYER RED WINS';
                    haveAWinner = true;    
                }    
            } else {
                if (playerBlueGame[i] === winningCombinations[j]) {
                    winnerBanner.innerHTML = 'PLAYER BLUE WINS';
                    haveAWinner = true;    
                }    
            }
        }
    }

 // VERTICAL ROWS   
    if (!haveAWinner) {
        for (let i = 0; i < 3; i++) {
            if (player === 'Red') {
                gameCombination = playerRedGame[0][i] + playerRedGame[1][i] + playerRedGame[2][i];
            } else {
                gameCombination = playerBlueGame[0][i] + playerBlueGame[1][i] + playerBlueGame[2][i];
            }
            for (let j = 0; j < winningCombinations.length; j++) {
                 if (gameCombination === winningCombinations[j]) {
                    winnerBanner.innerHTML = `PLAYER ${player.toUpperCase()} WINS`;
                    haveAWinner = true;    
                }
            }    
        }    
    }

 // DIAGONAL   
    if (!haveAWinner) {
        let gameCombination = '';
            if (player === 'Red') {
                gameCombination = playerRedGame[0][0] + playerRedGame[1][1]  + playerRedGame[2][2];
            } else {
                gameCombination = playerBlueGame[0][0] + playerBlueGame[1][1]  + playerBlueGame[2][2];
            }
            for (let j = 0; j < winningCombinations.length; j++) {
                if (gameCombination === winningCombinations[j]) {
                    winnerBanner.innerHTML = `PLAYER ${player.toUpperCase()} WINS`;
                   haveAWinner = true;    
               }
           }               
    }

    // DIAGONAL INVERSE
    if (!haveAWinner) {
        let gameCombination = '';
            if (player === 'Red') {
                gameCombination = playerRedGame[0][2] + playerRedGame[1][1]  + playerRedGame[2][0];
            } else {
                gameCombination = playerBlueGame[0][2] + playerBlueGame[1][1]  + playerBlueGame[2][0];
            }
            for (let j = 0; j < winningCombinations.length; j++) {
                if (gameCombination === winningCombinations[j]) {
                    winnerBanner.innerHTML = `PLAYER ${player.toUpperCase()} WINS`;
                   haveAWinner = true;    
               }
           }               
    }
    if (!haveAWinner && counter === 9) {
        winnerBanner.innerHTML = 'WE HAVE A TIE';
    }
}

// FUNCTION TO PAINT THE SQUARES OF RED/BLUE
function paint(e) {
//    const mySquare2 = document.querySelector('#square1');
    const myTurn = document.querySelector("#playerTurn");
    const mySquare1 = event.target;
    const classListNames = mySquare1.classList.value;
    const isThisRed = classListNames.indexOf('Red');
    const isThisBlue = classListNames.indexOf('Blue');
    let currentPlayer = '';
    let currentSquare = parseInt(mySquare1.innerHTML);
   
    if (redTurn) {
        currentPlayer = 'Red';
    } else {
        currentPlayer = 'Blue';
    }
 
    if (!haveAWinner) {
        if (isThisRed < 0 && isThisBlue < 0) {
            if (redTurn) {
                mySquare1.classList.add('squareRed');
                myTurn.innerHTML = 'Blue player turn'
                redTurn = false;
                myString = '';
                counter += 1;
                modelingGame(currentSquare, 'Red');
                evaluatingGame('Red');
            } else {
                mySquare1.classList.add('squareBlue');
                myTurn.innerHTML = 'Red player turn'
                redTurn = true;
                counter += 1;
                modelingGame(currentSquare, 'Blue');
                evaluatingGame('Blue');
            }
        } else {
            alert('Option already selected! Try a new one');
        } 
    } else {
        alert('WE HAVE A WINNER! Hit the clear game button')
    }
}

// ASSIGNING THE EVENT TO PAINT SQUARES
bodyTicTacToe.forEach(mySquare => {
    mySquare.addEventListener('click',paint);
});

// FUNCTION TO CLEAR THE GAME
function clearGame() {
    let myClassList = '';
    let isThisRed = '';
    let isThisBlue = '';
    const myTurn = document.querySelector("#playerTurn");
   
    bodyTicTacToe.forEach(mySquare => {
        myclassList = mySquare.classList.value;
        isThisRed = myclassList.indexOf('Red');
        isThisBlue = myclassList.indexOf('Blue');
    
        if (isThisRed > 0) {
            mySquare.classList.remove('squareRed');
        }    
        if (isThisBlue > 0) {
            mySquare.classList.remove('squareBlue');
        }    
    });
    myTurn.innerHTML = 'Red player turn';
    winnerBanner.innerHTML = '';
    redTurn = true;
    playerRedGame = ['000','000','000'];
    playerBlueGame = ['000','000','000'];
    counter = 0;
    haveAWinner = false;
 //   mySquare.removeEventListener('click',paint);
};

// ASSIGN THE EVENT LISTENER TO CLEAR THE GAME WITH THE BUTTON
clearBtn.addEventListener('click',clearGame);