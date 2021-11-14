//=== VARIABLES ===//
let tiles = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const red = 1;
const blue = 2;
var player = 1;

//=== FUNCTIONS ===//
function TileClick(y, x, element) {
    

    document.getElementById("test").innerHTML = `Row: ${y}\nCol: ${x}`;
}
