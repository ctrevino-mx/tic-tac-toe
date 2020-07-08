const bodyTicTacToe = document.querySelectorAll('.square');
const clearBtn = document.querySelector('#clearButton');
let redTurn = true;
const winningCombinations = ['123','456','789','147','258','369','159','357'];
let playerRedGame = ['000','000','000'];
let playerBlueGame = ['000','000','000'];

function modelingGame(currentSelection, colorPlayer) {
    myString = '';
    let currentRow = '';
    // console.log(currentSelection);
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
    // console.log('delta', delta);
    // console.log('current selection', currentSelection);

    if (currentSelection >=(delta + 1) && currentSelection <= (delta + 3)) {
        for (let i = 0; i < 3; i++) {
            if ((i + delta) === (currentSelection - 1)) {
                myString += currentSelection;
            } else {
                myString += currentRow[i];
            }    
        }
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
 //       console.log(playerRedGame); 
 //       console.log(playerBlueGame);         
    }
}

function evaluatingGame(player) {

    for (let i = 0; i < playerRedGame.length; i++) {
        for (let j = 0; j < winningCombinations.length; j++) {
            if (playerRedGame[i] === winningCombinations[j]) {
                console.log('WINNER');    
            }
        }
    }

    for (let i = 0; i < playerRedGame.length; i++) {
        let gameCombination = playerRedGame[0][i] + playerRedGame[1][i] + playerRedGame[2][i];
        for (let j = 0; j < winningCombinations.length; j++) {
            if (gameCombination === winningCombinations[j]) {
                console.log('WINNER');    
            }
        }    
    }

    let gameCombination = '';
    for (let i = 0; i < playerRedGame.length; i++) {
        gameCombination = gameCombination + playerRedGame[i][i];
    }
    console.log(gameCombination);
    gameCombination = '';
    for (let i = 0; i < playerRedGame.length; i++) {
        gameCombination = gameCombination + playerRedGame[i][playerRedGame.length - i - 1];
    }

           console.log(playerRedGame); 
        console.log(playerBlueGame);         

}

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
 
     if (isThisRed < 0 && isThisBlue < 0) {
        if (redTurn) {
            mySquare1.classList.add('squareRed');
            myTurn.innerHTML = '>> Blue player turn <<'
            redTurn = false;
            myString = '';
            console.log('current square', currentSquare);
            // Logic for modeling the game
            modelingGame(currentSquare, 'Red');
            evaluatingGame('Red');
            // if (currentSquare >=1 && currentSquare <= 3) {
            //     let currentRow = playerRedGame[0];
            //     for (let i = 0; i < currentRow.length; i++) {
            //         if (i === (currentSquare - 1)) {
            //             myString += currentSquare;
            //         } else {
            //             myString += currentRow[i];
            //         }    
            //     }
            //     console.log(myString);
            //     playerRedGame[0] = myString;
            //     console.log(playerRedGame);          
            // }
    //        modelingGame(currentSquare, 3);
            // if (currentSquare >=4 && currentSquare <= 6) {
            //     let currentRow = playerRedGame[1];
            //     console.log('Current row',currentRow);
            //     for (let i = 0; i < 3; i++) {
            //         if ((i + 3)  === (currentSquare - 1)) {
            //             myString += currentSquare;
            //         } else {
            //             myString += currentRow[i];
            //         }    
            //     }
            //     console.log(myString);
            //     playerRedGame[1] = myString;
            //     console.log(playerRedGame);          
            // }
            // if (currentSquare >=7 && currentSquare <= 9) {
            //     let currentRow = playerRedGame[2];
            //     console.log('Current row',currentRow);
            //     for (let i = 0; i < 3; i++) {
            //         if ((i + 6)  === (currentSquare - 1)) {
            //             myString += currentSquare;
            //         } else {
            //             myString += currentRow[i];
            //         }    
            //     }
            //     console.log(myString);
            //     playerRedGame[2] = myString;
            //     console.log(playerRedGame);          
            // }
            // End of logic
        } else {
            mySquare1.classList.add('squareBlue');
            redTurn = true;
            myTurn.innerHTML = '>> Red player turn <<'
            modelingGame(currentSquare, 'Blue');
        }
    } else {
        alert('Option already selected! Try a new one');
    } 
}

bodyTicTacToe.forEach(mySquare => {
    mySquare.addEventListener('click',paint);
});

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
    myTurn.innerHTML = '>> Red player turn <<';
    redTurn = true;
    playerRedGame = ['000','000','000'];
    playerBlueGame = ['000','000','000'];
};

clearBtn.addEventListener('click',clearGame);