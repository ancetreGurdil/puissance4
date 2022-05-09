var ROWS = 6;
var COLUMNS = 7;
var IN_A_ROW = 4;
var currentPlayerTurn = 1;
var gameEnded = false;
function changeTurn() {
    if (currentPlayerTurn == 1) {
        currentPlayerTurn = 2;
    }
    else {
        currentPlayerTurn = 1;
    }
}
var tab = [];
for (var i = 0; i < ROWS; i++) {
    tab.push([]);
    for (var j = 0; j < COLUMNS; j++) {
        tab[i].push(0);
    }
}
console.log(tab);
var maGrilleHTML = document.getElementById("grille");
var htmlGrid = "";
for (var i = 0; i < ROWS; i++) {
    htmlGrid += '<div class="row">';
    for (var j = 0; j < COLUMNS; j++) {
        var cellId = i + "," + j;
        htmlGrid += '<div class="cell" id="' + cellId + '"></div>';
    }
    htmlGrid += "</div>";
}
maGrilleHTML.innerHTML = htmlGrid;
function Digit(event) {
    if (event.key == "Enter") {
        reset(event);
    }
    var keyCode = event.code;
    if (!keyCode.includes("Digit")) {
        //La touche appuyée n'est pas un digit ! On s'arrête là, cette touche ne nous intéresse pas 
        return;
    }
    var characterIndex = keyCode.length - 1;
    var columnString = keyCode.substring(characterIndex);
    var column = parseInt(columnString);
    play(column - 1);
}
document.addEventListener("keydown", Digit);
function play(column) {
    // TODO : Gérer l'insertion de jeton
    insertCoin(column);
    // TODO : Gérer la vérification de victoire
    verificationCoin();
    // TODO : Gérer la vérification d'égalité
    isGridComplete();
    // TODO : Gérer le changement de tour
    changeTurn();
}
function insertCoin(column) {
    for (var i = 0; i < tab.length; i++) {
        if (i + 1 >= ROWS || tab[i + 1][column] != 0) {
            tab[i][column] = currentPlayerTurn;
            insertHTMLCoin(i, column);
            break;
        }
    }
    return true;
}
function insertHTMLCoin(row, column) {
    var PLAYER_COLORS = ["", "red", "yellow"];
    var currentPlayerColor = PLAYER_COLORS[currentPlayerTurn];
    document.getElementById(row + "," + column).classList.add(currentPlayerColor);
}
function foundHorizontalAlignment(row, column) {
    if (column + IN_A_ROW > COLUMNS)
        return false;
    for (var i = 0; i < IN_A_ROW; i++) {
        if (tab[row][column + i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}
function foundVerticalAlignment(row, column) {
    if (row + IN_A_ROW > ROWS)
        return false;
    for (var i = 0; i < IN_A_ROW; i++) {
        if (tab[row + i][column] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}
function foundDiagonalRightAlignment(row, column) {
    if (column + IN_A_ROW > COLUMNS || row + IN_A_ROW > ROWS)
        return false;
    for (var i = 0; i < IN_A_ROW; i++) {
        if (tab[row + i][column + i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}
function foundDiagonalLeftAlignment(row, column) {
    if (column - (IN_A_ROW - 1) < 0 || row + IN_A_ROW > ROWS)
        return false;
    for (var i = 0; i < IN_A_ROW; i++) {
        if (tab[row + i][column - i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}
function isGridComplete() {
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLUMNS; j++) {
            if (tab[i][j] == 0) {
                return false;
            }
        }
    }
    alert("Egalité");
    return true;
}
function verificationCoin() {
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLUMNS; j++) {
            if (foundHorizontalAlignment(i, j) || foundVerticalAlignment(i, j) || foundDiagonalLeftAlignment(i, j) || foundDiagonalRightAlignment(i, j)) {
                alert('Joueur ' + currentPlayerTurn + ' à gagné !');
                gameEnded = true;
                console.log(gameEnded);
                return true; //VICTOIRE, on a trouvé !
            }
        }
    }
    return false; //On est arrivés tout au bout sans rien trouver
}
function reset(event) {
    var gameEnded = event.key;
    if (gameEnded && event.key == "Enter") {
        //Reset la game
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLUMNS; j++) {
                tab[i][j] = 0;
                document.getElementById(i + "," + j)
                    .classList.remove("red");
                tab[i][j] = 0;
                document.getElementById(i + "," + j)
                    .classList.remove("yellow");
            }
        }
        //console.log(currentPlayerTurn);
        changeTurn();
        //console.log(currentPlayerTurn);
    }
    //console.log(tableau)
    //console.log(gameEnded);
}
var btnPopup = document.getElementById('btnPopup');
var overlay = document.getElementById('overlay');
btnPopup.addEventListener('click', openMoadl);
function openMoadl() {
    overlay.style.display = 'block';
}
var btnClose = document.getElementById('btnClose');
btnClose.addEventListener('click', closeModal);
function closeModal() {
    overlay.style.display = 'none';
}
