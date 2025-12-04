// Player deets
let playerScore = 0;
let playerLife = 5;

// List of words to rain (for creating randomized words)
const rainWordArray = ['aaa', 'bbb', 'ccc']; // Stretch goals: Maybe can add a randomized API?

// For having the dropping words generate randomly
let rainWord;
let randoNum = Math.floor(Math.random() * rainWordArray.length);
rainWord = rainWordArray[randoNum];

// Adding list of words to actual rain
const rainInner = document.getElementById('words');
rainInner.innerText = rainWord;

// const rainingArray = [];
// rainingArray.push(rainWord)

// For grabbing raindrop deets from HTML
const raindrop = document.getElementById('raindrop');
const rainLocation = raindrop.getBoundingClientRect(); // getBoundingClientRect returns DOMRect (the size and position of a rectangular item in the viewport)
let xPosition = rainLocation.x;
let yPosition = rainLocation.y; // <-- This returns absolute screen coordinates, not coordinates relative to the parent (gameBox). This is bc rainLocation.y comes from getBoundingClientRect(). ->-
let speed = 10;

// For having the "Raindrops" fall
let intervalId; // For storing intervalID
const gameBoxOutline = document.getElementById('gameBox'); // For setting limit for border

function wordDrop() {
  //   clearInterval(intervalId); // For clearing up previously running wordDrops

  raindrop.hidden = false;
  const widthLimit = gameBoxOutline.clientWidth - raindrop.clientWidth;
  const heightLimit = gameBoxOutline.clientHeight - raindrop.clientHeight;

  xPosition = Math.floor(Math.random() * (widthLimit - 0 + 1)) + 0;

  raindrop.style.left = xPosition + 'px';
  yPosition = 0; // <-- Resetting to top inside gameBox!
  raindrop.style.top = yPosition + 'px';

  intervalId = setInterval(() => {
    yPosition += speed;
    raindrop.style.top = yPosition + 'px'; // <--  ->- HOWEVER, style.top is relative to the #gameBox, because #raindrop is position: absolute inside #gameBox. THEREFORE we need to reset yPosition to top of gameBox before running the setInterval animation!
    if (yPosition >= heightLimit) {
      stopWordDrop();
      ouch();
    }
  }, 50);
  console.log('test:', heightLimit);
}

// For having the "Raindrops" fall -- Ver. Blizzard (Moves more irradically; maybe can be updated so that the X axis inches forward only little bits at a time?)
// function wordDrop () {
//     xPosition = Math.floor(Math.random() * (425 - 0 + 1)) + 0;
//     yPosition += speed;
//     raindrop.style.left = xPosition + "px";
//     raindrop.style.top = yPosition + "px";
//     // setInterval( () => {
//     // yPosition += speed;
//     // raindrop.style.top = yPosition + "px";
//     // }, 250)
//     console.log("test")
// }

// setInterval(wordDrop, 250); // Starts the raindrop

// // For having the "Raindrops" fall -- Ver. Snowdrop (Adjusted version of "Blizzard") --> !!Still needs more readjusting so that it doesn't go outside of the box!!
// function wordDrop () {
//     xPosition = Math.floor(Math.random() * (425 - 0 + 1)) + 0;
//     raindrop.style.left = xPosition + "px";
//     raindrop.style.top = yPosition + "px";
//     setInterval( () => {
//         yPosition += speed;
//         raindrop.style.top = yPosition + "px";

//     let randoNum = Math.floor(Math.random() * 10);

//     if (randoNum < 5) {
//         xPosition += speed;
//         raindrop.style.left = xPosition + "px";
//     } else {
//         xPosition -= speed;
//         raindrop.style.left = xPosition + "px";
//     }
//     }, 250)
//     console.log("test")
// }

// wordDrop() // Starts the raindrop

// For stopping raindrop
function stopWordDrop() {
  clearInterval(intervalId);
  console.log('Stopping the rain.');
  raindrop.hidden = true; // Clears corresponding raindrop & resets position
  startButton.disabled = false;
}

// Game start initiator

function gameStarter() {
  playerLife = 5;
  playerScore = 0;
  console.log('Player Score:', playerScore, 'Player Life: ', playerLife);
  // if (playerLife > 0) {
  //     for (let i = 0; i < 5; i++) {
  wordDrop();
  // }
  // }
}

// For Game Start Button
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
  gameStarter();

  startButton.disabled = true; // For making the start button clickable only once
});

// For submitting Player Response
const textInputBox = document.getElementById('textArea');

textInputBox.addEventListener('keydown', (event) => {
  // If input answer is correct
  if (event.key === 'Enter' && textInputBox.value === rainWord) {
    stopWordDrop();
    resetTextInputBox();
    scoreUp();
    console.log('You got it! Current score:', playerScore);
  }
  // If input answer is wrong
  else if (event.key === 'Enter') {
    stopWordDrop();
    ouch();
    resetTextInputBox();
  }
});

// ----------- Reusable generic functions -----------

// Func for increasing Score + displaying it

function scoreUp() {
  playerScore++;
}

// Func for decreasing Player life

function ouch() {
  playerLife--;
  console.log('You lost a life! Current life:', playerLife);
  if (playerLife == 0) {
    youDie();
  }
}

// Func when player dies

function youDie() {
  clearInterval(intervalId);
  raindrop.hidden = true; // Clears corresponding raindrop & resets position
  startButton.disabled = false;
  console.log('Game Over');
  return 'Game Over';
}

// For clearing out input
function resetTextInputBox() {
  textInputBox.value = '';
}

// ----------- -----------
