const bodyTicTacToe = document.querySelectorAll('.square');
const clearBtn = document.querySelector('#clearButton');
let redTurn = true;

function paint(e) {
//    const mySquare2 = document.querySelector('#square1');
    const myTurn = document.querySelector("#playerTurn");
    const mySquare1 = event.target;
    const classListNames = mySquare1.classList.value;
    const isThisRed = classListNames.indexOf('Red');
    const isThisBlue = classListNames.indexOf('Blue');

    if (isThisRed < 0 && isThisBlue < 0) {
        if (redTurn) {
            mySquare1.classList.add('squareRed');
            myTurn.innerHTML = '>> Blue player turn <<'
            redTurn = false;    
        } else {
            mySquare1.classList.add('squareBlue');
            redTurn = true;
            myTurn.innerHTML = '>> Red player turn <<'
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
};

clearBtn.addEventListener('click',clearGame);