console.log('script linked...');

const bodyTicTacToe = document.querySelectorAll('.square');
let redTurn = true;

function paint(e) {
    const mySquare2 = document.querySelector('#square1');
    const mySquare1 = event.target;
    const classListNames = mySquare1.classList.value;
    const isThisRed = classListNames.indexOf('Red');
    const isThisBlue = classListNames.indexOf('Blue');

    if (isThisRed < 0 && isThisBlue < 0) {
        if (redTurn) {
            mySquare1.classList.add('squareRed');
            redTurn = false;    
        } else {
            mySquare1.classList.add('squareBlue');
            redTurn = true;
        }
    } 
}

bodyTicTacToe.forEach(mySquare => {
    mySquare.addEventListener('click',paint);
})