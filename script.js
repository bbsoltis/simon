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

// .yellow.light #fed93f

// .blue.light #1c8cff

// .red.light #ff4c4c

// .green.light #13ff7c

// LED Light #dc0d29

let strictModeState = "off",
    moveSequenceArray = [],
    playerMoveArray = [],
    moveCounter = 18,
    gameOn = 0; 

window.onload = function () {

    // test button click function to be deleted later
    document.getElementById('test1').onclick = function() {
        playerTurn();
    }

    document.getElementById('test2').onclick = function() {
        if (moveCounter < 20) {
            moveCounter++;
        }
    }
    // end test button section

    document.getElementById('power-switch-checkbox').onclick = function() {
        powerStatus();
        hitTheLights();
    };

    document.getElementById('strict').onclick = function() {
        strictMode();
    };

    document.getElementById('start').onclick = function() {
        resetGame();
        startGame();
    };

    document.getElementById('green-btn').onclick = function() {
        if (gameOn == 1) {
            flashGreenBtn();
            playerTurn(0);
        }
    }

    document.getElementById('red-btn').onclick = function() {
        if (gameOn = 1) {
            flashRedBtn();
            playerTurn(1);
        }
    }

    document.getElementById('yellow-btn').onclick = function() {
        if (gameOn = 1) {
            flashYellowBtn();
            playerTurn(2);
        }
    }

    document.getElementById('blue-btn').onclick = function() {
        if (gameOn = 1) {
            flashBlueBtn();
            playerTurn(3);
        }
    }

    resetGame();

}

function resetGame() {
    let ledDisplay = document.getElementById('digital-readout-display'),
        strictLedDisplay = document.getElementById('strict-led-light');
    ledDisplay.innerHTML = "--";
    ledDisplay.style.color = "#430710";
    strictLedDisplay.style.background = "#430710";
    moveSequenceArray = [];
    moveCounter = 1;
}

// Turns on the simulated LEDs in the digital display
function hitTheLights() {
    let displayElem = document.getElementById('digital-readout-display'),
        strictLedElem = document.getElementById('strict-led-light');
    setTimeout(function () {
        if (powerStatus() == "on") {
            displayElem.style.color = "#dc0d29";
        } else {
            displayElem.style.color = "#430710";
            strictLedElem.style.background = "#430710";
        }
    }, 50);
}

// Sets the state of the strict mode push button toggle
function strictMode() {
    let elem = document.getElementById("strict-led-light");
    if (powerStatus() == "on") {
        if (strictModeState == "off") {
            elem.style.background = "#dc0d29";
            return strictModeState = "on";
        } else if (strictModeState == "on") {
            elem.style.background = "#430710";
            return strictModeState = "off";
        }
    }
}

// Determines the state of the virtual power switch
function powerStatus() {
    let powerSwitchState;
    let inputElements = document.getElementById('power-switch-checkbox');
    if (inputElements.checked) {
        powerSwitchState = inputElements.value;
    } else if (!inputElements.checked) {
        resetGame();
    }
    return powerSwitchState;
}

function startGame() {
    if (powerStatus() == "on") {
        gameOn = 1;
        blinkLed("--", 2);
        setTimeout(function () {
            computerTurn(0);
        }, 1200);
    }
}

function setMoveSequence() {
    let rndNum;
    if (moveSequenceArray.length < 20) {
        rndNum = Math.floor(Math.random() * (5 - 1));
        moveSequenceArray.push(rndNum);
    }
}

function blinkLed(text, count) {
    let ledDisplay = document.getElementById('digital-readout-display'),
        increment = 1;
        intervalId = setInterval(function() {
            ledDisplay.innerHTML = text;
            if (ledDisplay.style.color == "rgb(67, 7, 16)") {
                ledDisplay.style.color = "#dc0d29";
                if (increment++ === count) {
                    clearInterval(intervalId);
                }
            } else {
                ledDisplay.style.color = "#430710"
            }
        }, 250);
}

function computerTurn(index) {
    playerMoveArray = [];
    if (moveSequenceArray.length < moveCounter) {
        setMoveSequence();
    }
    let ledDisplay = document.getElementById('digital-readout-display'),
        events = [flashGreenBtn, flashRedBtn, flashYellowBtn, flashBlueBtn],
        move = moveSequenceArray[index];
    window.setTimeout( function() {
        ledDisplay.innerHTML = (moveCounter<10 ? "0" + moveCounter : moveCounter);
        events[move]();
        if (index < (moveCounter - 1)) {
            computerTurn(index + 1);
        }
    }, 1000);
}

function flashGreenBtn() {
    let greenBtn = document.getElementById('green-btn');
    greenBtn.style.background = "#13ff7c";
    document.getElementById('green-tone').play();
    setTimeout(function () {
        greenBtn.style.background = "#00A74A";
    }, 700);
}

function flashRedBtn() {
    let redBtn = document.getElementById('red-btn');
    redBtn.style.background = "#ff4c4c";
    document.getElementById('red-tone').play();
    setTimeout(function () {
        redBtn.style.background = "#9F0F17";
    }, 700);
}

function flashYellowBtn() {
    let yellowBtn = document.getElementById('yellow-btn');
    yellowBtn.style.background = "#fed93f";
    document.getElementById('yellow-tone').play();
    setTimeout(function () {
        yellowBtn.style.background = "#CCA707";
    }, 700);
}

function flashBlueBtn() {
    let blueBtn = document.getElementById('blue-btn');
    blueBtn.style.background = "#1c8cff";
    document.getElementById('blue-tone').play();
    setTimeout(function () {
        blueBtn.style.background = "#094A8F";
    }, 700);
}

function playerTurn(btn) {
    let index = playerMoveArray.length;
    if (playerMoveArray.length < moveSequenceArray.length) {
        playerMoveArray.push(btn);
    }
    if (playerMoveArray[index] == moveSequenceArray[index]) {
        console.log(playerMoveArray[index]);
        console.log(moveSequenceArray[index]);
        if (playerMoveArray.length == moveSequenceArray.length) {
            moveCounter++;
            computerTurn(0);
        }
    } else {
        playerFaultHandler();
    }
}

function playerFaultHandler() {
    blinkLed("!!", 3);
    document.getElementById('error-tone').play();
    setTimeout(function () {
        computerTurn(0);
    }, 1200);
}