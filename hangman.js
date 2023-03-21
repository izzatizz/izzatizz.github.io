// Define an array of words to use in the game
const words = [
    "javascript",
    "programming",
    "html",
    "css",
    "github",
    "hangman",
    "website"
  ];
  
  // Choose a random word from the array
  let word = words[Math.floor(Math.random() * words.length)];
  
  // Create an array to store the correct guesses
  let correctGuesses = [];
  
  // Create an array to store the incorrect guesses
  let incorrectGuesses = [];
  
  // Create a variable to keep track of the number of incorrect guesses
  let incorrectGuessCount = 0;
  
  // Create a variable to keep track of whether the game is over
  let gameover = false;
  
  // Loop through the letters of the word and replace them with underscores
  let hiddenWord = "";
  for (let i = 0; i < word.length; i++) {
    hiddenWord += "_";
  }
  
  // Display the initial state of the game
  updateGame();
  
  // Listen for keyboard input
  document.addEventListener("keydown", function(event) {
    // Only process input if the game is not over
    if (!gameover) {
      // Check if the key pressed is a letter
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        let letter = event.key.toLowerCase();
        // Check if the letter has already been guessed
        if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
          // Do nothing
        } else if (word.includes(letter)) {
          // Update the hidden word and correct guesses
          for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
              hiddenWord = hiddenWord.substring(0, i) + letter + hiddenWord.substring(i + 1);
            }
          }
          correctGuesses.push(letter);
          // Check if the game is over (all letters have been guessed)
          if (hiddenWord.indexOf("_") === -1) {
            gameover = true;
            updateGame();
            alert("You win!");
          }
        } else {
          // Update the incorrect guesses
          incorrectGuesses.push(letter);
          incorrectGuessCount++;
          // Check if the game is over (too many incorrect guesses)
          if (incorrectGuessCount >= 6) {
            gameover = true;
            updateGame();
            alert("You lose! The word was " + word + ".");
          }
        }
        updateGame();
      }
    }
  });
  
  function updateGame() {
    // Display the hidden word
    let hiddenWordContainer = document.getElementById("hidden-word");
    hiddenWordContainer.textContent = hiddenWord.split("").join(" ");
    // Display the incorrect guesses
    let incorrectGuessesContainer = document.getElementById("incorrect-guesses");
    incorrectGuessesContainer.textContent = incorrectGuesses.join(" ");
    // Display the hangman image based on the number of incorrect guesses
    let hangmanImage = document.getElementById("hangman-image");
    hangmanImage.src = "hangman-" + incorrectGuessCount + ".png";
  }
  