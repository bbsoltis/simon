// ** Look at scaling game without  a rewrite **

// Nothing works until power switch is on
    // LED display lights up when power switch is on
    // "Strict" LED indicator won't display until power switch is on
// "Start" button starts game
    // Randomizes a game move and stores it in a global array
    // Number of moves is displayed in digital readout
// "Strict Mode" button enables strict Mode
    // Button does not function unless switch is "on"
    // Strict mode starts over with new moves on a fail
// Game buttons light up, play sounds and are clickable
    // Each button is assigned a number which is registered in an array
    // Array is compared to the randomized game array
    // Buttons do not function unless power switch is on
// Colors from activated game lights:
    // Lit up red from digital display and LED: #DC0D29
    // Green button: #13FF7C
    // Red button: #FF4C4C
    // Blue button: #1C8CFF
    // Yellow button: #FED93F

// ====================================================
// ----------      Game "algorithm-ish"      ----------
// ====================================================
// Power switch on
    // Digital display lights up the 2 dashes
    // Start and strict buttons now function
    // Strict button sets strict mode, LED lights up (toggle)
    // Start button starts game
    // Game buttons don't function or show pointer when off
// Start game
    // Slight delay (.5s)
    // Digital display: dashes flash twice (.5s interval)
    // Slight delay (.5)
    // First button flashes and plays tone (less than 1s, start with .5s)
    // Waits 5 seconds for player to press a button, of no press then fail
    // If fail, 2 exclamation points flash 3 times (.5s interval)
    // Game resets to previous move, repeat until game turned off
    // Game buttons don't function or show pointer until after game starts and
        // after computer has displayed sequence
// Strict mode
    // Same as above, but:
        // If fail, 2 exclamation points flash 3 times (.5s interval)
        // Reset counter
        // Randomize new sequence
        // Game start sequence starts again

// ** Questions **
// 1. How to best connect power switch (checkbox) with JS without a global variable? With? 
// 2. Lots of timer stuff happening here!