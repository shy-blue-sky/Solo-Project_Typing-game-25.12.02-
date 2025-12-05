// Player deets variables
let playerScore = 0;
let playerLife = 5;

const scoreDisplay = document.getElementById("score");
const lifeDisplay = document.getElementById("lifeLeft");

  
// For Game Board image & color changing
const background = document.getElementById('lifeAt5');
const fillerColor = document.body
function changeBG() {
  if (playerLife === 5){
    background.src = "src/Life1.jpeg"
    fillerColor.style.backgroundColor = "aliceblue"
  }
  if (playerLife === 4){
    background.src = "src/Life2.jpeg"
  }
  if (playerLife === 3){
    background.src = "src/Life3.jpeg"
  }
  if (playerLife === 2){
    background.src = "src/Life4.jpeg"
    // fillerColor.style.backgroundColor = "#990000"
    // fillerColor.style.backgroundColor = "#f7a642ff"
    // fillerColor.style.backgroundColor = "#aa6f7dff"
    fillerColor.style.backgroundColor = "#A4475D"
  }
  if (playerLife === 1){
    background.src = "src/Life5.jpeg"
    // fillerColor.style.backgroundColor = "#990000"
    fillerColor.style.backgroundColor = "#990000d5"
  }
  if (playerLife === 0){
    background.src = "src/GameOver.png"
    fillerColor.style.backgroundColor = "#100E3B"
  }
}

// List of words to rain (for creating randomized words)
// const rainWordArray = ['aaa', 'bbb', 'ccc']; // Stretch goals: Maybe can add a randomized API?

const rainWordArray = [
  "shelter",
  "water",
  "canteen",
  "ration",
  "supplies",
  "medkit",
  "bandage",
  "firstaid",
  "rescue",
  "signal",
  "beacon",
  "compass",
  "map",
  "blanket",
  "firewood",
  "lantern",
  "flashlight",
  "matches",
  "purifier",
  "hygiene",
  "sanitize",
  "gloves",
  "goggles",
  "boots",
  "jacket",
  "backpack",
  "storage",
  "toolkit",
  "rope",
  "poncho",
  "whistle",
  "radio",
  "charger",
  "battery",
  "heatpack",
  "cookset",
  "canister",
  "shelter",
  "maskfilter",
  "lifeline",
  "safezone",
  "recon",
  "camo",
  "armor",
  "patrol",
  "bunker",
  "drone",
  "squad",
  "rations",
  "barracks",
  "airbase",
  "helmet",
  "mission",
  "secure",
  "target",
  "radar",
  "captain",
  "sergeant",
  "brigade",
  "outpost",
  "overwatch",
  "intel",
  "comms",
  "operator",
  "support",
  "tactics",
  "seawatch",
  "grounder",
  "dispatch",
  "defender",
  "sentry",
  "lookout",
  "fortress",
  "briefing"
];

let rainWord;

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
  // For having the dropping words generate randomly
  let randoNum = Math.floor(Math.random() * rainWordArray.length);
  rainWord = rainWordArray[randoNum];
  
  // Adding list of words to actual rain
  const rainInner = document.getElementById('words');
  rainInner.innerText = rainWord;
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
  }, 200);
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
}

// Game start initiator

function gameStarter() {
  textInputBox.disabled = false;
  playerLife = 5;
  playerScore = 0;
  scoreDisplay.innerHTML = "Score: " + playerScore;
  lifeDisplay.innerHTML = "Lives: " + playerLife;
  changeBG()
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
textInputBox.disabled = true;

textInputBox.addEventListener('keydown', (event) => {
  // If input answer is correct
  if (event.key === 'Enter' && textInputBox.value === rainWord) {
    stopWordDrop();
    resetTextInputBox();
    scoreUp();
    wordDrop();
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
  scoreDisplay.innerHTML = "Score: " + playerScore;
  if (playerScore === 3) {
    speed += 10
  } if (playerScore === 5) {
    speed += 10
  } if (playerScore === 7) {
    speed += 10
  }
}

// Func for decreasing Player life

function ouch() {
  playerLife--;
  lifeDisplay.innerHTML = "Lives: " + playerLife;
  changeBG();
  resetTextInputBox();
  console.log('You lost a life! Current life:', playerLife);
  if (playerLife <= 0) {
    youDie();
  } else {
    wordDrop();
  }
}

// Func when player dies

function youDie() {
  clearInterval(intervalId);
  raindrop.hidden = true; // Clears corresponding raindrop & resets position
  startButton.disabled = false;
  textInputBox.disabled = true;
  resetTextInputBox();
  console.log('Game Over');
}

// For clearing out input
function resetTextInputBox() {
  textInputBox.value = '';
}

// ----------- -----------


















//////////////// TRYING TO MAKE THE FULL GAME



// // Player deets
// let playerScore = 0;
// let playerLife = 5;

// // List of words to rain (for creating randomized words)
// let rainWordArray = ['aaa', 'bbb', 'ccc']; // Stretch goals: Maybe can add a randomized API?

// // // For having the dropping words generate randomly
// // let randoNum = Math.floor(Math.random() * rainWordArray.length);
// // let rainWord = rainWordArray[randoNum];

// // // Adding list of words to actual rain
// // const rainInner = document.getElementById('words');
// // rainInner.innerText = rainWord;

// // // const rainingArray = [];
// // // rainingArray.push(rainWord)

// // // For grabbing raindrop deets from HTML
// // const raindrop = document.getElementById('raindrop');
// // const rainLocation = raindrop.getBoundingClientRect(); // getBoundingClientRect returns DOMRect (the size and position of a rectangular item in the viewport)
// // let xPosition = rainLocation.x;
// // let yPosition = rainLocation.y; // <-- This returns absolute screen coordinates, not coordinates relative to the parent (gameBox). This is bc rainLocation.y comes from getBoundingClientRect(). ->-
// // let speed = 10;


// // Creating index for raindrop div id
// let rainIndex = 0;

// // Creating array to track each individual raindrop ID created
// const rainingArray = [];

// //For creating multiple raindrops (Makes new div for each indiv raindrop)
// function raindropCreator() {
//   const ogDiv = document.getElementById('original');
//   const clonedDiv = ogDiv.content.firstElementChild.cloneNode(true); // Deeply clones, including children
//   clonedDiv.id = "raindrop" + rainIndex++; // For tracking each indiv raindrop

//   gameBoxOutline.appendChild(clonedDiv); // Appending the clone, so that it exists in the DOM

//   // For having the dropping words generate randomly
//   let randoNum = Math.floor(Math.random() * rainWordArray.length);
//   let rainWord = rainWordArray[randoNum];

//   // Adding list of words to actual rain
//   const rainInner = clonedDiv.querySelector('.words');
//   rainInner.innerText = rainWord;

//   rainingArray.push(clonedDiv)

//   const raindrop = clonedDiv;

//   return raindrop;
// }


// // For having each of the "Raindrops" fall
// let intervalIdRainDrop; // For storing intervalID
// const gameBoxOutline = document.getElementById('gameBox'); // For setting limit for border

// function wordDrop() {
//   //clearInterval(intervalIdRainDrop); // For clearing up previously running wordDrops

//   const raindrop = raindropCreator();   // For grabbing raindrop deets from HTML

//   const rainLocation = raindrop.getBoundingClientRect(); // getBoundingClientRect returns DOMRect (the size and position of a rectangular item in the viewport)
//   let xPosition = rainLocation.x;
//   let yPosition = rainLocation.y; // <-- This returns absolute screen coordinates, not coordinates relative to the parent (gameBox). This is bc rainLocation.y comes from getBoundingClientRect(). ->-
//   let speed = 10;

//   raindrop.hidden = false;
//   const widthLimit = gameBoxOutline.clientWidth - raindrop.clientWidth;
//   const heightLimit = gameBoxOutline.clientHeight - raindrop.clientHeight;

//   xPosition = Math.floor(Math.random() * (widthLimit - 0 + 1)) + 0;

//   raindrop.style.left = xPosition + 'px';
//   yPosition = 0; // <-- Resetting to top inside gameBox!
//   raindrop.style.top = yPosition + 'px';

//   intervalIdRainDrop = setInterval(() => {
//     yPosition += speed;
//     raindrop.style.top = yPosition + 'px'; // <--  ->- HOWEVER, style.top is relative to the #gameBox, because #raindrop is position: absolute inside #gameBox. THEREFORE we need to reset yPosition to top of gameBox before running the setInterval animation!
//     if (yPosition >= heightLimit) {
//       stopWordDrop();
//       ouch();
//     }
//   }, 50);
//   console.log('test:', heightLimit);
// }

// // For having the "Raindrops" fall -- Ver. Blizzard (Moves more irradically; maybe can be updated so that the X axis inches forward only little bits at a time?)
// // function wordDrop () {
// //     xPosition = Math.floor(Math.random() * (425 - 0 + 1)) + 0;
// //     yPosition += speed;
// //     raindrop.style.left = xPosition + "px";
// //     raindrop.style.top = yPosition + "px";
// //     // setInterval( () => {
// //     // yPosition += speed;
// //     // raindrop.style.top = yPosition + "px";
// //     // }, 250)
// //     console.log("test")
// // }

// // setInterval(wordDrop, 250); // Starts the raindrop

// // // For having the "Raindrops" fall -- Ver. Snowdrop (Adjusted version of "Blizzard") --> !!Still needs more readjusting so that it doesn't go outside of the box!!
// // function wordDrop () {
// //     xPosition = Math.floor(Math.random() * (425 - 0 + 1)) + 0;
// //     raindrop.style.left = xPosition + "px";
// //     raindrop.style.top = yPosition + "px";
// //     setInterval( () => {
// //         yPosition += speed;
// //         raindrop.style.top = yPosition + "px";

// //     let randoNum = Math.floor(Math.random() * 10);

// //     if (randoNum < 5) {
// //         xPosition += speed;
// //         raindrop.style.left = xPosition + "px";
// //     } else {
// //         xPosition -= speed;
// //         raindrop.style.left = xPosition + "px";
// //     }
// //     }, 250)
// //     console.log("test")
// // }

// // wordDrop() // Starts the raindrop

// // For continuous raindrop fall
// let regenSpeed = 500; // Starting speed for raindrop generation

// function wordDropInit() {
//   setInterval(() => {
//     wordDrop();
//   }, 500);
// }

// // wordDropInit()

// // For stopping raindrop
// function stopWordDrop() {
//   const raindrop = raindropCreator();

//   clearInterval(intervalIdRainDrop);
//   console.log('Stopping the rain.');
//   raindrop.hidden = true; // Clears corresponding raindrop & resets position
//   startButton.disabled = false;
// }

// // For Game Start Button
// const startButton = document.getElementById('startButton');

// startButton.addEventListener('click', () => {
//   gameStarter();

//   startButton.disabled = true; // For making the start button clickable only once
// });

// // For Game start initiator
// function gameStarter() {
//   playerLife = 5;
//   playerScore = 0;
//   console.log('Player Score:', playerScore, 'Player Life: ', playerLife);
//   // if (playerLife > 0) {
//   //     for (let i = 0; i < 5; i++) {
//   wordDrop();
//   // }
//   // }
// }

// // For submitting Player Response
// const textInputBox = document.getElementById('textArea');

// textInputBox.addEventListener('keydown', (event) => {
//   // If input answer is correct
//   if (event.key === 'Enter' && textInputBox.value === rainWord) {
//     stopWordDrop();
//     resetTextInputBox();
//     scoreUp();
//     console.log('You got it! Current score:', playerScore);
//   }
//   // If input answer is wrong
//   else if (event.key === 'Enter') {
//     stopWordDrop();
//     ouch();
//     resetTextInputBox();
//   }
// });

// // ----------- Reusable generic functions -----------

// // Func for increasing Score + displaying it

// function scoreUp() {
//   playerScore++;
// }

// // Func for decreasing Player life

// function ouch() {
//   playerLife--;
//   console.log('You lost a life! Current life:', playerLife);
//   if (playerLife == 0) {
//     youDie();
//   }
// }

// // Func when player dies

// function youDie() {
//   clearInterval(intervalIdRainDrop);
//   raindrop.hidden = true; // Clears corresponding raindrop & resets position
//   startButton.disabled = false;
//   console.log('Game Over');
//   return 'Game Over';
// }

// // For clearing out input
// function resetTextInputBox() {
//   textInputBox.value = '';
// }

// // ----------- -----------
