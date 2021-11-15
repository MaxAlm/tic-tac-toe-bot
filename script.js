//=== VARIABLES ===//
const tiles = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const human = 1;    // Blue
const bot = 2;      // Red
var player = human; // Contains the number of the current player
var turns = 0;      // Contains amount of turns
var gameActive = true;

//=== FUNCTIONS ===//
function TileClick(y, x, element) {
    if (gameActive && player == human) {
        // Check if clicked tile is empty
        if (tiles[y][x] == 0) {
            element.className = "cross";
            tiles[y][x] = human;
            turns++;

            // Check for winner
            if (!CheckForWinner()) {
                // Check if maximum amount of turns is reached
                if (turns == 9) {
                    // Show reset button
                    document.getElementById("reset").style.display = "block";
                    document.getElementById("reset").style.animationName = "fadeIn";

                    // Set title
                    document.getElementById("title").innerHTML = "IT'S A TIE";

                    // Stop game
                    gameActive = false;
                } else {
                    ChangePlayer();
                }
            }
        }
    }
}

function CheckForWinner() {
    var winner = false;

    // Check horizontal
    if (!winner) {
        for (let y = 0; y < tiles.length; y++) {
            if (tiles[y][0] == player &&
                tiles[y][1] == player &&
                tiles[y][2] == player) {
                    winner = true;
                    break;
                }
        }
    }

    // Check vertical
    if (!winner) {
        for (let x = 0; x < tiles.length; x++) {
            if (tiles[0][x] == player &&
                tiles[1][x] == player &&
                tiles[2][x] == player) {
                    winner = true;
                    break;
                }
        }
    }
    
    // Check diagonal
    if (!winner) {
        // Left
        if (tiles[0][2] == player &&
            tiles[1][1] == player &&
            tiles[2][0] == player) {
                winner = true;
            }
            
        // Right
        if (tiles[0][0] == player &&
            tiles[1][1] == player &&
            tiles[2][2] == player) {
                winner = true;
            }
    }

    // Check if winner was found
    if (winner) {
        gameActive = false;
        
        // Show and animate reset button
        document.getElementById("reset").style.display = "block";
        document.getElementById("reset").style.animationName = "fadeIn";

        // Set title
        if (player == human) {
            document.getElementById("title").innerHTML = "YOU WIN";
        } else {
            document.getElementById("title").innerHTML = "YOU LOSE";
        }

        return true;
    } else {
        return false;
    }
}

function ChangePlayer() {
    if (player == human) {
        player = bot;
    } else {
        player = human;
    }

    if (player == bot) {
        setTimeout(Bot, 1000 + Math.random() * 500);
    }
}

function NewGame() {
    var cross = document.getElementsByClassName("cross");
    var circle = document.getElementsByClassName("circle");

    // Reset all crosses
    for (let i = (cross.length - 1); i >= 0; i--) {
        cross[i].className = "tile";
    }

    // Reset all circles
    for (let i = (circle.length - 1); i >= 0; i--) {
        circle[i].className = "tile";
    }

    // Reset memory
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            tiles[y][x] = 0;
        }
    }

    // Reset header
    document.getElementById("title").innerHTML = "TIC-TAC-TOE";

    // Hide reset button and clear animation
    document.getElementById("reset").style.display = "none";
    document.getElementById("reset").style.animationName = "none";

    // Reset variables
    gameActive = true;
    turns = 0;
    
    ChangePlayer();
}

function Bot() {
    var moved = false;

    while (!moved) {
        loop1:
        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x] == 0) {
                    tiles[y][x] = bot;

                    var name = y.toString() + x.toString();
                    var til = document.getElementsByName(name);
                    til[0].className = "circle";
                    
                    turns++;
                    moved = true;
                    break loop1;
                }
            }
        }
    }

    if (!CheckForWinner()) {
        // Check if maximum amount of turns is reached
        if (turns == 9) {
            // Show reset button
            document.getElementById("reset").style.display = "block";
            document.getElementById("reset").style.animationName = "fadeIn";

            // Set title
            document.getElementById("title").innerHTML = "IT'S A TIE";

            // Stop game
            gameActive = false;
        } else {
            ChangePlayer();
        }
    }
}