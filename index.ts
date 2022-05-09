const ROWS = 6;
const COLUMNS = 7;
const IN_A_ROW = 4;
let currentPlayerTurn = 1;
let gameEnded = false

function changeTurn(): void{
    if (currentPlayerTurn == 1) {
        currentPlayerTurn = 2;
    } else {
        currentPlayerTurn = 1;
    }
}


let tab : number[][] = [];
for ( let i = 0 ; i < ROWS ; i++ ) {
    tab.push([]); 
    for ( let j = 0 ; j < COLUMNS ; j++ ) {
        tab[i].push(0);
    }
}

console.log(tab);

let maGrilleHTML: HTMLElement = document.getElementById("grille");
let htmlGrid: string = "";
for(let i = 0; i < ROWS ; i++){
    htmlGrid += '<div class="row">';
    for(let j = 0 ; j < COLUMNS ; j++){
        let cellId : string = i + "," + j;
        htmlGrid += '<div class="cell" id="' + cellId + '"></div>';
    }
    htmlGrid+="</div>";
}
maGrilleHTML.innerHTML = htmlGrid


function Digit(event): void {
    if(event.key == "Enter") {
        reset(event);
    }
    let keyCode = event.code
    
    if(!keyCode.includes("Digit")) {
        //La touche appuyée n'est pas un digit ! On s'arrête là, cette touche ne nous intéresse pas 
        return
    }
    let characterIndex = keyCode.length -1;
    let columnString : string = keyCode.substring(characterIndex);
    let column : number = parseInt(columnString);
    play(column-1);
}
document.addEventListener("keydown", Digit)

function play(column: number): void {
    // TODO : Gérer l'insertion de jeton
        insertCoin(column);
    // TODO : Gérer la vérification de victoire
        verificationCoin();
    // TODO : Gérer la vérification d'égalité
        isGridComplete();
    // TODO : Gérer le changement de tour
        changeTurn();
}

function insertCoin(column: number): boolean {
    for (let i = 0; i < tab.length; i++) {
        if (i + 1 >= ROWS || tab[ i + 1 ] [ column ] != 0 ) {
            tab[i][column] = currentPlayerTurn
            insertHTMLCoin(i, column)
            break;
        }
    }
    
    return true;
}

function insertHTMLCoin(row: number, column: number): void {
    const PLAYER_COLORS:string[]=["","red","yellow"]
    const currentPlayerColor : string = PLAYER_COLORS [currentPlayerTurn]
    document.getElementById(row + "," + column).classList.add(currentPlayerColor)
}

function foundHorizontalAlignment(row, column): boolean {
    if (column + IN_A_ROW > COLUMNS)
        return false;
    
    for (let i = 0; i < IN_A_ROW; i++) {
        if (tab[row][column + i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}

function foundVerticalAlignment(row, column): boolean {
    if (row + IN_A_ROW > ROWS)
        return false;
    
    for (let i = 0; i < IN_A_ROW; i++) {
        if (tab[row + i][column] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}

function foundDiagonalRightAlignment(row, column): boolean {
    if (column + IN_A_ROW > COLUMNS || row + IN_A_ROW > ROWS)
        return false;
    
    for (let i = 0; i < IN_A_ROW; i++){
        if (tab[row + i][column + i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}

function foundDiagonalLeftAlignment(row, column): boolean{
    if (column - (IN_A_ROW - 1) < 0 || row + IN_A_ROW > ROWS)
        return false;
    
    for (let i = 0; i < IN_A_ROW; i++){
        if (tab[row + i][column - i] != currentPlayerTurn) {
            return false;
        }
    }
    return true;
}

function isGridComplete(): boolean{
    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLUMNS; j++){
            if (tab[i][j] == 0) {
                return false;
            }
        }
    }
    alert("Egalité")
    return true;
}

function verificationCoin(): boolean {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (foundHorizontalAlignment(i, j) || foundVerticalAlignment(i, j) || foundDiagonalLeftAlignment(i, j) || foundDiagonalRightAlignment(i, j)) {
                alert('Joueur '+ currentPlayerTurn +' à gagné !' )
                gameEnded = true;
                console.log(gameEnded);
                return true  //VICTOIRE, on a trouvé !
            }
        }
    }
    
    return false //On est arrivés tout au bout sans rien trouver
}

function reset(event) {
    let gameEnded = event.key;
    if(gameEnded && event.key == "Enter") {
        //Reset la game
        for (let i = 0; i < ROWS; i++) {
            for(let j = 0; j < COLUMNS; j++) {
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
btnPopup.addEventListener('click',openMoadl);
function openMoadl() {
overlay.style.display='block';
}
var btnClose = document.getElementById('btnClose');
btnClose.addEventListener('click',closeModal);
function closeModal() {
    overlay.style.display='none';
}

var i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function(){

    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";

    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}