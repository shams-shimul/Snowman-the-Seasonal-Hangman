// confetti library
import confetti from "https://esm.run/canvas-confetti@1"
const keyboardContainer = document.getElementById('keyboard-container')
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function renderKeyboard() {
  const keyBoardHtml = letters.map((letter) => {
    return `<button class="letter" aria-label="Guess letter ${letter}" id=${letter}>${letter}</button>`
  })
  keyboardContainer.innerHTML = keyBoardHtml.join('')
}

// Function to throw confetti when the guess is correct
function throwConfetti() {
  confetti({
    origin: { x: 0.5, y: 0.6 },
    particleCount: 100,
    zIndex: 1,
    spread: 100,
    ticks: 175,
  })
}

export { renderKeyboard, throwConfetti }