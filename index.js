// The keyboard has been rendered for you
import { renderKeyboard } from '/keyboard'
const keyboard = document.getElementById('keyboard-container')
keyboard.addEventListener('click', checkGuess)
window.addEventListener('keydown', function () { checkGuess(event, true) })

// Some useful elements
const guessContainer = document.getElementById('guess-container')
const snowmanParts = document.getElementsByClassName('snowman-part')

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
const word = "santa"
// 6 guesses for the 6 parts of the snowman
let guesses = 6
// Track how many letters have been correctly guessed
let nCorrectGuess = 0

// Insert dashes for each character of the word
const guessChars = Array.from(word).map((char, pos) => `
    <span id='pos-${pos}'>-</span>
`).join('')
guessContainer.innerHTML = guessChars

function checkGuess(event, keyPressed = false) {
  // Check if the game is already over in the beginning, if yes, do nothing
  if (guesses === 0 || nCorrectGuess === word.length) return

  const selectedLetter = keyPressed ? event.key : event.target.getAttribute('id')

  // Actions when any match is found, including duplicates
  for (let i = 0; i < word.length; i++) {
    if (selectedLetter === word.charAt(i)) {
      ++nCorrectGuess
      event.target.disabled = 'true'
      document.getElementById(`pos-${i}`).textContent = selectedLetter.toUpperCase()
    }
  }

  // Actions when no match is found
  if (!word.includes(selectedLetter)) {
    guesses && --guesses
    snowmanParts[guesses].classList.add('hide')
  }

  // If the game is over, run these actions
  checkIfGameOver()
}

const checkIfGameOver = () => {
  if (guesses === 0) {
    guessContainer.textContent = "You Lose!"
    keyboard.classList.add('disabled')
  }
  if (nCorrectGuess === word.length) {
    keyboard.classList.add('disabled')
    guessContainer.textContent = "You Win!"
    document.querySelector('.sunglasses').classList.remove('hide')
    for (let i = 0; i < snowmanParts.length; i++) {
      snowmanParts[i].classList.remove('hide')
    }
  }
}

renderKeyboard()
