/*
|
---------------------------------------------------------------------
| Simon® Game 
---------------------------------------------------------------------
|
| Free Code Camp final front end project
| Completed on May 14th, 2017 by Brian B. Soltis
|
*/

// Global variables
let strictModeState = "off",
    moveSequenceArray = [],
    playerMoveArray = [],
    moveCounter = 0,
    gameOn = 0,
    lightTimer = 700,
    gapTimer = 1100, 
    playerTimer; 

window.onload = function () {

    // Turns on lights and sets power status when switch is activated
    document.getElementById('power-switch-checkbox').onclick = function() {
        powerStatus();
        hitTheLights();
    };

    // Toggles strict mode when "Strict"" button is pushed
    document.getElementById('strict').onclick = function() {
        strictMode();
    };

    // Resets and starts game play
    document.getElementById('start').onclick = function() {
        resetGame();
        startGame();
    };

    // Animates green button and registers a click on players turn
    document.getElementById('green-btn').onclick = function() {
        if (gameOn === 1) {
            flashGreenBtn();
            playerTurn(0);
        }
    }

    // Animates red button and registers a click on players turn
    document.getElementById('red-btn').onclick = function() {
        if (gameOn === 1) {
            flashRedBtn();
            playerTurn(1);
        }
    }

    // Animates yellow button and registers a click on players turn
    document.getElementById('yellow-btn').onclick = function() {
        if (gameOn === 1) {
            flashYellowBtn();
            playerTurn(2);
        }
    }

    // Animates blue button and registers a click on players turn
    document.getElementById('blue-btn').onclick = function() {
        if (gameOn === 1) {
            flashBlueBtn();
            playerTurn(3);
        }
    }

    resetGame();
    
}

// Resets game parameters to default settings
function resetGame() {
    let ledDisplay = document.getElementById('digital-readout-display');
    ledDisplay.innerHTML = "--";
    ledDisplay.style.color = "#430710";
    moveSequenceArray = [];
    playerMoveArray = [];
    moveCounter = 1, 
    gameOn = 0,
    gapTimer = 1100,
    lightTimer = 700,
    clearTimeout(playerTimer);
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

// Executes initial parameters and functions for gameplay
function startGame() {
    if (powerStatus() == "on") {
        gameOn = 1;
        blinkLed("--", 2);
        setTimeout(function () {
            computerTurn(0);
        }, 1200);
    }
}

// Determines each randomized move and stores it in an array
function setMoveSequence() {
    let rndNum;
    if (moveSequenceArray.length < 20) {
        rndNum = Math.floor(Math.random() * (5 - 1));
        moveSequenceArray.push(rndNum);
    }
}

// Creates blinking text in fake LED display
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

// Main function to run game "algorithm"
function computerTurn(index) {
    document.getElementById('green-btn').disabled = true;
    document.getElementById('red-btn').disabled = true;
    document.getElementById('yellow-btn').disabled = true;
    document.getElementById('blue-btn').disabled = true;
    if (gameOn = 1) {
        playerMoveArray = [];
        if (moveSequenceArray.length < moveCounter) {
            setMoveSequence();
        }
        if (moveCounter > 5 && moveCounter < 11) {
            gapTimer = 900;
            lightTimer = 550;
        } else if (moveCounter > 10 && moveCounter < 16) {
            gapTimer = 700;
            lightTimer = 425;
        } else if (moveCounter > 15) {
            gapTimer = 500;
            lightTimer = 300;
        }
        let ledDisplay = document.getElementById('digital-readout-display'),
            events = [flashGreenBtn, flashRedBtn, flashYellowBtn, flashBlueBtn],
            move = moveSequenceArray[index];
        window.setTimeout(function () {
            ledDisplay.innerHTML = (moveCounter < 10 ? "0" + moveCounter : moveCounter);
            events[move]();
            if (index < (moveCounter - 1)) {
                computerTurn(index + 1);
            } else {
                document.getElementById('green-btn').disabled = false;
                document.getElementById('red-btn').disabled = false;
                document.getElementById('yellow-btn').disabled = false;
                document.getElementById('blue-btn').disabled = false;
                playerTimer = setTimeout(function () {
                    playerFaultHandler();
                }, 5000);
            }
        }, gapTimer);
    }
}

// Animates game buttons
function flashGreenBtn() {
    let greenBtn = document.getElementById('green-btn');
    greenBtn.style.background = "#13ff7c";
    document.getElementById('green-tone').play();
    setTimeout(function () {
        greenBtn.style.background = "#00A74A";
    }, lightTimer);
}
function flashRedBtn() {
    let redBtn = document.getElementById('red-btn');
    redBtn.style.background = "#ff4c4c";
    document.getElementById('red-tone').play();
    setTimeout(function () {
        redBtn.style.background = "#9F0F17";
    }, lightTimer);
}
function flashYellowBtn() {
    let yellowBtn = document.getElementById('yellow-btn');
    yellowBtn.style.background = "#fed93f";
    document.getElementById('yellow-tone').play();
    setTimeout(function () {
        yellowBtn.style.background = "#CCA707";
    }, lightTimer);
}
function flashBlueBtn() {
    let blueBtn = document.getElementById('blue-btn');
    blueBtn.style.background = "#1c8cff";
    document.getElementById('blue-tone').play();
    setTimeout(function () {
        blueBtn.style.background = "#094A8F";
    }, lightTimer);
}

// Main function to handle player attempts
function playerTurn(btn) {
    let index = playerMoveArray.length;
    clearTimeout(playerTimer);
    if (playerMoveArray.length < moveSequenceArray.length) {
        playerMoveArray.push(btn);
    }
    if (playerMoveArray[index] == moveSequenceArray[index]) {
        if (playerMoveArray.length == moveSequenceArray.length) {
            if (moveCounter < 20) {
                moveCounter++;
                setTimeout(function() {
                    computerTurn(0);
                }, 500);
            } else {
                setTimeout(celebrationMode, 900);
            }
        }
    } else {
        playerFaultHandler();
    }
}

// Animation and function call when player fails or time is up
function playerFaultHandler() {
    if (strictModeState == "on") {
        resetGame();
    }
    blinkLed("!!", 3);
    document.getElementById('error-tone').play();
    setTimeout(function () {
        computerTurn(0);
    }, 1200);
}

// Animation and function call when player achieves 20 moves
function celebrationMode() {
    blinkLed("20", 6);
    document.getElementById('winner').play();
    setTimeout(function() {
        resetGame();
        startGame();
    }, 4000);
}