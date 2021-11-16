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
    let names = [];

    // Check horizontal
    if (!winner) {
        for (let y = 0; y < tiles.length; y++) {
            if (tiles[y][0] == player &&
                tiles[y][1] == player &&
                tiles[y][2] == player) {
                    names = [y.toString() + "0", y.toString() + "1", y.toString() + "2"];
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
                    names = ["0" + x.toString(), "1" + x.toString(), "2" + x.toString()];
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
                names = ["02", "11", "20"];
                winner = true;
            }
            
        // Right
        if (tiles[0][0] == player &&
            tiles[1][1] == player &&
            tiles[2][2] == player) {
                names = ["00", "11", "22"];
                winner = true;
            }
    }

    // Check if winner was found
    if (winner) {
        gameActive = false;
        
        // Set winning set background color
        for (let i = 0; i < names.length; i++) {
            var t = document.getElementsByName(names[i]);
            t[0].style.backgroundColor = "#575757";
        }

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
        cross[i].style.backgroundColor = "transparent";
        cross[i].className = "tile";
    }

    // Reset all circles
    for (let i = (circle.length - 1); i >= 0; i--) {
        circle[i].style.backgroundColor = "transparent";
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
    var name;
    var moved = false;

    // Check if bot or opponent can win
    if (turns >= 3) {
        ////////////////////////////////
        // Check for possible bot win //
        ////////////////////////////////

        // Check horizontal
        for (let y = 0; y < tiles.length; y++) {
            if (tiles[y][0] == bot &&
                tiles[y][1] == bot &&
                tiles[y][2] == 0) {
                    if (!moved) {
                        name = y.toString() + "2";
                        var t = document.getElementsByName(name);
                        t[0].className = "circle";

                        tiles[y][2] = bot;
                        moved = true;
                        break;
                    }
                }

            if (tiles[y][0] == 0 &&
                tiles[y][1] == bot &&
                tiles[y][2] == bot) {
                    if (!moved) {
                        name = y.toString() + "0";
                        var t = document.getElementsByName(name);
                        t[0].className = "circle";

                        tiles[y][0] = bot;
                        moved = true;
                        break;
                    }
                }

            if (tiles[y][0] == bot &&
                tiles[y][1] == 0 &&
                tiles[y][2] == bot) {
                    if (!moved) {
                        name = y.toString() + "1";
                        var t = document.getElementsByName(name);
                        t[0].className = "circle";

                        tiles[y][1] = bot;
                        moved = true;
                        break;
                    }
                }
        }

        // Check vertical
        if (!moved) {
            for (let x = 0; x < tiles.length; x++) {
                if (tiles[0][x] == bot &&
                    tiles[1][x] == bot &&
                    tiles[2][x] == 0) {
                        if (!moved) {
                            name = "2" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
        
                            tiles[2][x] = bot;
                            moved = true;
                            break;
                        }
                    }
        
                if (tiles[0][x] == 0 &&
                    tiles[1][x] == bot &&
                    tiles[2][x] == bot) {
                        if (!moved) {
                            name = "0" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
            
                            tiles[0][x] = bot;
                            moved = true;
                            break;
                        }
                    }

                if (tiles[0][x] == bot &&
                    tiles[1][x] == 0 &&
                    tiles[2][x] == bot) {
                        if (!moved) {
                            name = "1" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
            
                            tiles[1][x] = bot;
                            moved = true;
                            break;
                        }
                    }
            }
        }

        // Check diagonal right
        if (!moved) {
            if (tiles[0][0] == bot &&
                tiles[1][1] == bot &&
                tiles[2][2] == 0) {
                    if (!moved) {
                        var t = document.getElementsByName("22");
                        t[0].className = "circle";
    
                        tiles[2][2] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][0] == 0 &&
                tiles[1][1] == bot &&
                tiles[2][2] == bot) {
                    if (!moved) {
                        var t = document.getElementsByName("00");
                        t[0].className = "circle";
        
                        tiles[0][0] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][0] == bot &&
                tiles[1][1] == 0 &&
                tiles[2][2] == bot) {
                    if (!moved) {
                        var t = document.getElementsByName("11");
                        t[0].className = "circle";
            
                        tiles[1][1] = bot;
                        moved = true;
                    }
                }
        }

        // Check diagonal left
        if (!moved) {
            if (tiles[0][2] == bot &&
                tiles[1][1] == bot &&
                tiles[2][0] == 0) {
                    if (!moved) {
                        var t = document.getElementsByName("20");
                        t[0].className = "circle";
    
                        tiles[2][0] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][2] == 0 &&
                tiles[1][1] == bot &&
                tiles[2][0] == bot) {
                    if (!moved) {
                        var t = document.getElementsByName("02");
                        t[0].className = "circle";
        
                        tiles[0][2] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][2] == bot &&
                tiles[1][1] == 0 &&
                tiles[2][0] == bot) {
                    if (!moved) {
                        var t = document.getElementsByName("11");
                        t[0].className = "circle";
            
                        tiles[1][1] = bot;
                        moved = true;
                    }
                }
        }

        /////////////////////////////////////
        // Check for possible opponent win //
        /////////////////////////////////////

        // Check horizontal
        if (!moved) {
            for (let y = 0; y < tiles.length; y++) {
                if (tiles[y][0] == human &&
                    tiles[y][1] == human &&
                    tiles[y][2] == 0) {
                        if (!moved) {
                            name = y.toString() + "2";
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
    
                            tiles[y][2] = bot;
                            moved = true;
                            break;
                        }
                    }
    
                if (tiles[y][0] == 0 &&
                    tiles[y][1] == human &&
                    tiles[y][2] == human) {
                        if (!moved) {
                            name = y.toString() + "0";
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
    
                            tiles[y][0] = bot;
                            moved = true;
                            break;
                        }
                    }
    
                if (tiles[y][0] == human &&
                    tiles[y][1] == 0 &&
                    tiles[y][2] == human) {
                        if (!moved) {
                            name = y.toString() + "1";
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
    
                            tiles[y][1] = bot;
                            moved = true;
                            break;
                        }
                    }
            }
        }

        // Check vertical
        if (!moved) {
            for (let x = 0; x < tiles.length; x++) {
                if (tiles[0][x] == human &&
                    tiles[1][x] == human &&
                    tiles[2][x] == 0) {
                        if (!moved) {
                            name = "2" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
        
                            tiles[2][x] = bot;
                            moved = true;
                            break;
                        }
                    }
        
                if (tiles[0][x] == 0 &&
                    tiles[1][x] == human &&
                    tiles[2][x] == human) {
                        if (!moved) {
                            name = "0" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
            
                            tiles[0][x] = bot;
                            moved = true;
                            break;
                        }
                    }

                if (tiles[0][x] == human &&
                    tiles[1][x] == 0 &&
                    tiles[2][x] == human) {
                        if (!moved) {
                            name = "1" + x.toString();
                            var t = document.getElementsByName(name);
                            t[0].className = "circle";
            
                            tiles[1][x] = bot;
                            moved = true;
                            break;
                        }
                    }
            }
        }

        // Check diagonal right
        if (!moved) {
            if (tiles[0][0] == human &&
                tiles[1][1] == human &&
                tiles[2][2] == 0) {
                    if (!moved) {
                        var t = document.getElementsByName("22");
                        t[0].className = "circle";
    
                        tiles[2][2] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][0] == 0 &&
                tiles[1][1] == human &&
                tiles[2][2] == human) {
                    if (!moved) {
                        var t = document.getElementsByName("00");
                        t[0].className = "circle";
        
                        tiles[0][0] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][0] == human &&
                tiles[1][1] == 0 &&
                tiles[2][2] == human) {
                    if (!moved) {
                        var t = document.getElementsByName("11");
                        t[0].className = "circle";
            
                        tiles[1][1] = bot;
                        moved = true;
                    }
                }
        }

        // Check diagonal left
        if (!moved) {
            if (tiles[0][2] == human &&
                tiles[1][1] == human &&
                tiles[2][0] == 0) {
                    if (!moved) {
                        var t = document.getElementsByName("20");
                        t[0].className = "circle";
    
                        tiles[2][0] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][2] == 0 &&
                tiles[1][1] == human &&
                tiles[2][0] == human) {
                    if (!moved) {
                        var t = document.getElementsByName("02");
                        t[0].className = "circle";
        
                        tiles[0][2] = bot;
                        moved = true;
                    }
                }

            if (tiles[0][2] == human &&
                tiles[1][1] == 0 &&
                tiles[2][0] == human) {
                    if (!moved) {
                        var t = document.getElementsByName("11");
                        t[0].className = "circle";
            
                        tiles[1][1] = bot;
                        moved = true;
                    }
                }
        }
    }

    // If turns equals 0 or 2
    if ((turns == 0 && !moved) || (turns == 2 && !moved)) {
        if (turns == 0) {
            let strat = Math.floor(Math.random() * 2);
            let rnd = Math.floor(Math.random() * 4);
            let t;
            
            if (strat == 0) {
                t = document.getElementsByName("11");
                t[0].className = "circle";
                tiles[1][1] = bot;
                moved = true;
            } else {
                switch (rnd) {
                    case 0: // Top left
                        t = document.getElementsByName("00");
                        t[0].className = "circle";
                        tiles[0][0] = bot;
                        moved = true;
                        break;
    
                    case 1: // Bottom left
                        t = document.getElementsByName("20");
                        t[0].className = "circle";
                        tiles[2][0] = bot;
                        moved = true;
                        break;
    
                    case 2: // Bottom right
                        t = document.getElementsByName("22");
                        t[0].className = "circle";
                        tiles[2][2] = bot;
                        moved = true;
                        break;
    
                    case 3: // Top right
                        t = document.getElementsByName("02");
                        t[0].className = "circle";
                        tiles[0][2] = bot;
                        moved = true;
                        break;
                }
            }
        } else if (turns = 2) {
            do {
                let rnd = Math.floor(Math.random() * 4);
                let t;
                
                switch (rnd) {
                    case 0: // Top left
                        if (tiles[0][0] == 0){
                            t = document.getElementsByName("00");
                            t[0].className = "circle";
                            tiles[0][0] = bot;
                            moved = true;
                        }
                        break;

                    case 1: // Bottom left
                        if (tiles[2][0] == 0){
                            t = document.getElementsByName("20");
                            t[0].className = "circle";
                            tiles[2][0] = bot;
                            moved = true;
                        }    
                        break;

                    case 2: // Bottom right
                        if (tiles[2][2] == 0){
                            t = document.getElementsByName("22");
                            t[0].className = "circle";
                            tiles[2][2] = bot;
                            moved = true; 
                        }
                        break; 

                    case 3: // Top right
                        if (tiles[0][2] == 0){
                            t = document.getElementsByName("02");
                            t[0].className = "circle";
                            tiles[0][2] = bot;
                            moved = true;  
                        }    
                        break;
                }
            } while (!moved)
        }
    }

    // If turns equals 1
    if (turns == 1 && !moved) {
        if (Math.floor(Math.random() * 100) < 80) {
            if (tiles[1][1] == 0) {
                let t = document.getElementsByName("11");
                t[0].className = "circle";
                tiles[1][1] = bot;
                moved = true;
            }
        } else {
            do {
                let y = Math.floor(Math.random() * 3);
                let x = Math.floor(Math.random() * 3);
    
                if (tiles[y][x] == 0 && y.toString() + x.toString() != "11") {
                    name = y.toString() + x.toString();
                    let t = document.getElementsByName(name);
                    t[0].className = "circle";
    
                    tiles[y][x] = bot;
                    moved = true;
                }
            } while (!moved);
        }
    }

    // If turns equals 4
    if (turns == 4 && !moved) {
        // Check left
        if (tiles[0][0] == human &&
            tiles[1][0] == 0 &&
            tiles[2][0] == 0) {
                let t = document.getElementsByName("20");
                t[0].className = "circle";
                tiles[2][0] = bot;
                moved = true;
            }else if (tiles[0][0] == 0 &&
                    tiles[1][0] == 0 &&
                    tiles[2][0] == human) {
                        let t = document.getElementsByName("00");
                        t[0].className = "circle";
                        tiles[0][0] = bot;
                        moved = true;
                    }

        // Check right
        if (!moved) {
            if (tiles[0][2] == human &&
                tiles[1][2] == 0 &&
                tiles[2][2] == 0) {
                    let t = document.getElementsByName("22");
                    t[0].className = "circle";
                    tiles[2][2] = bot;
                    moved = true;
                }else if (tiles[0][2] == 0 &&
                        tiles[1][2] == 0 &&
                        tiles[2][2] == human) {
                            let t = document.getElementsByName("02");
                            t[0].className = "circle";
                            tiles[0][2] = bot;
                            moved = true;
                        }
        }

        // Check top
        if (!moved) {
            if (!moved) {
                if (tiles[0][0] == human &&
                    tiles[0][1] == 0 &&
                    tiles[0][2] == 0) {
                        let t = document.getElementsByName("02");
                        t[0].className = "circle";
                        tiles[0][2] = bot;
                        moved = true;
                    }else if (tiles[0][0] == 0 &&
                            tiles[0][1] == 0 &&
                            tiles[0][2] == human) {
                                let t = document.getElementsByName("00");
                                t[0].className = "circle";
                                tiles[0][0] = bot;
                                moved = true;
                            }
            }
        }

        // Check bottom
        if (!moved) {
            if (!moved) {
                if (tiles[2][0] == human &&
                    tiles[2][1] == 0 &&
                    tiles[2][2] == 0) {
                        let t = document.getElementsByName("22");
                        t[0].className = "circle";
                        tiles[2][2] = bot;
                        moved = true;
                    }else if (tiles[2][0] == 0 &&
                            tiles[2][1] == 0 &&
                            tiles[2][2] == human) {
                                let t = document.getElementsByName("20");
                                t[0].className = "circle";
                                tiles[2][0] = bot;
                                moved = true;
                            }
            }
        }
    }

    // Play random
    if (!moved) {
        do {
            let y = Math.floor(Math.random() * 3);
            let x = Math.floor(Math.random() * 3);

            if (tiles[y][x] == 0) {
                name = y.toString() + x.toString();
                let t = document.getElementsByName(name);
                t[0].className = "circle";

                tiles[y][x] = bot;
                moved = true;
            }
        } while (!moved);
    }

    // Increase amount of turns by one
    turns++;

    // Check if game is won or not
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