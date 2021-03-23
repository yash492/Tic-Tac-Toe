'use strict';
const square = document.querySelectorAll('.square');
const submit = document.querySelector('.submit');
const formClass = document.querySelector('.form-container');
const playAgain = document.querySelector('.play-again');
const ticTacToe = document.querySelector('.tic-tac-toe');

console.log(playAgain);
const p = document.querySelector('p');
let player1Name = document.querySelector('#player-1');;
let player2Name = document.querySelector('#player-2');;


const TicTacToeClass = document.querySelector('.tic-tac-toe');
submit.addEventListener('click', function () {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    let emptyField = true;

    if (player1Name === "" && player2Name === "") {
        alert("Please enter the Player 1's and Player 2's name.");
        emptyField = false
    }

    else if (player1Name === "") {
        alert("Please enter the Player 1's name.");
        emptyField = false
    }

    else if (player2Name === "") {
        alert("Please enter the Player 2's name.");
        emptyField = false
    }

    if (emptyField === true) {
        formClass.classList.add('hidden');
        TicTacToeClass.classList.remove('hidden');
        p.textContent = `${player1Name}'s turn`;
    }
});


let x;
let o;
let isX;
let playing;
let count
let playedBox;
let remainingBox;

const init = function () {
    isX = false;
    playing = true;
    count = 0;
    x = [];
    o = [];
    playedBox = [];
    remainingBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

init();


playAgain.addEventListener('click', function () {
    console.log(playAgain);
    init();
    for (let i = 0; i < square.length; i++) {
        let element = square[i];
        element.classList.remove('o');
        element.classList.remove('x');
        element.addEventListener('click', function () {
            eventListener(this);
        });
    }
    p.textContent = `${player1Name}'s turn`;

});


const toggle = function (element) {
    const classManipulate = element.classList;
    if (isX) {
        classManipulate.remove('x');
        classManipulate.add('o');
        document.querySelector('p').textContent = `${player1Name}'s turn`;
        isX = false;
    } else {
        classManipulate.remove('o');
        classManipulate.add('x');
        document.querySelector('p').textContent = `${player2Name}'s turn`;
        isX = true;
    }
};

const eventListener = function (element) {
    if (playing && !playedBox.includes(element.id)) {
        toggle(element);
        count++;
        if (element.classList.contains('x')) x.push(Number(element.id));
        else o.push(Number(element.id));
        if (checkWinner(x)) {
            playing = false;
            document.querySelector('p').textContent = `${player1Name} is the winner!`;
        } else if (checkWinner(o)) {
            document.querySelector('p').textContent = `${player2Name} is the winner!`;
            playing = false;
        } else if (count === 9) {
            document.querySelector('p').textContent = 'Tie!';
            playing = false;
        }
        playedBox.push(element.id);
    }
    console.log(playedBox);
};

const checkWinner = function (playerArray) {
    const winningArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8], [1, 4, 7]];

    const win = function (winningArray, playerArray) {
        let countTrue = 0;
        for (let i = 0; i < playerArray.length; i++) {
            for (let j = 0; j < winningArray.length; j++) {
                if (winningArray[j] === playerArray[i])
                    countTrue++;
            }
        }

        return countTrue === 3;
    }

    if (playerArray.length < 3) return false;

    for (let i = 0; i < winningArrays.length; i++) {
        if (win(winningArrays[i], playerArray)) return true;
    }
    return false;
}

for (let i = 0; i < square.length; i++) {
    let element = square[i];
    element.addEventListener('click', function () {
        eventListener(this);
    });
}




