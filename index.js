// The keyboard has been rendered for you
import { renderKeyboard, throwConfetti } from "./components";
const keyboard = document.getElementById("keyboard-container");
keyboard.addEventListener("click", checkGuess);
window.addEventListener("keydown", function () {
  checkGuess(event, true);
});

// Some useful elements
const guessContainer = document.getElementById("guess-container");
const snowmanParts = document.getElementsByClassName("snowman-part");
const actionArea = document.getElementById("actions");
document.getElementById("new-game").addEventListener("click", start);

/*
Challenge  
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE the player would see - - - -
- The player selects a letter. 
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win! 
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times: 
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.
    
*** Stretch Goals *** 

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/

// Set the word to guess
const words = [
  "santa",
  "gifts",
  "reindeer",
  "carols",
  "ornaments",
  "mistletoe",
  "snowflakes",
  "wreath",
  "stockings",
  "nativity",
];
// 6 guesses for the 6 parts of the snowman
let guesses;
let nCorrectGuess, randNum, word, correctLetters;

function start() {
  guesses = 6;
  nCorrectGuess = 0;
  randNum = Math.floor(Math.random() * words.length);
  word = words[randNum];
  correctLetters = "";
  words.splice(randNum, 1);

  // Insert dashes for each character of the word
  const guessChars = Array.from(word).map(
    (char, pos) => `
        <span id='pos-${pos}'>-</span>
    `
  );
  guessContainer.innerHTML = guessChars.join("");
  renderKeyboard();

  keyboard.style.display = "flex";
  actionArea.style.display = "none";

  document.querySelector(".sunglasses").classList.add("hide");
  for (let i = 0; i < snowmanParts.length; i++) {
    snowmanParts[i].classList.remove("hide");
  }

  console.log("WORD LIST: ", words);
  console.log("CURRENT WORD: ", word);
}

function checkGuess(event, keyPressed = false) {
  // Check if the game is already over in the beginning, if yes, do nothing
  if (guesses === 0 || nCorrectGuess === new Set([...word]).size) return;

  const selectedLetter = keyPressed
    ? event.key
    : event.target.getAttribute("id");
  const selectedLetterBtn = document.getElementById(`${selectedLetter}`);

  // Actions when any match is found, including duplicates
  for (let i = 0; i < word.length; i++) {
    if (selectedLetter === word.charAt(i)) {
      if (!correctLetters.includes(selectedLetter)) {
        correctLetters += selectedLetter;
        ++nCorrectGuess;
        selectedLetterBtn.disabled = "true";
      }
      document.getElementById(`pos-${i}`).textContent =
        selectedLetter.toUpperCase();
    }
  }

  // Actions when no match is found
  if (!word.includes(selectedLetter)) {
    guesses && --guesses;
    snowmanParts[guesses].classList.add("hide");
  }

  // After each key press, check if the game is over
  checkIfGameOver();
}

// If the game is over, run these actions
const checkIfGameOver = () => {
  if (guesses === 0) {
    guessContainer.textContent = "You Lose!";
    actionArea.style.display = "block";
  }
  if (nCorrectGuess === new Set([...word]).size) {
    throwConfetti();
    guessContainer.textContent = "You Win!";
    document.querySelector(".sunglasses").classList.remove("hide");
    for (let i = 0; i < snowmanParts.length; i++) {
      snowmanParts[i].classList.remove("hide");
    }
    actionArea.style.display = "block";
  }
  // Common actions when a game ends
  if (guesses === 0 || nCorrectGuess === (new Set([...word]).size)) {
    keyboard.style.display = 'none'
    if (words.length === 0) {
      document.getElementById("new-game").removeEventListener("click", start);
      document.getElementById("new-game").addEventListener("click", () => {
        guessContainer.textContent = "That's all folks!"
        actionArea.style.display = 'none'
      });
    } else {
      actionArea.style.display = 'block'
    }
  }
};

start();
