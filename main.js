/*
game function:
- player must guess a number between a min and max
- player gets a cetain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer
- let player choose to play again
*/

// game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// play again event listner
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won
  if (guess === winningNum) {

    gameOver(true, `${winningNum} is correct!, YOU WIN!`)

  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {

      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

    } else {
      // game continues - answer wrong
      // tell user its wrong number

      // clear Input
      guessInput.value = '';


      setMessage(`${guess} is not correct, ${guessesLeft} guesses Left`, 'red');
      // border color
      guessInput.style.borderColor = 'red';
    }
  }


});

// game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';



  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // change  color
  message.style.color = color;
  // set message
  setMessage(msg);

  // play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';


}

// wining number
function getRandomNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}



// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}