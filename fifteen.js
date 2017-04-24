var size = 100;
var minX = 0;
var maxX = minX + 3 * size;
var minY = 0;
var maxY = minY + 3 * size;
var holeY = maxY;
var holeX = maxX; 
var pieces = new Array();
window.onload = function() {
	var puzzle = document.getElementById("puzzlearea");
	document.getElementById("controls").onclick = shuffle;
	var id = 1;
	
	for (var y = 0; y < 4 && id <= 15; y++) {
		for (var x = 0; x < 4 && id <= 15; x++){
			var puzzlePiece = document.createElement("div");
			puzzlePiece.setAttribute("class", "puzzlepiece");
			puzzlePiece.setAttribute("id", id); 	
			puzzlePiece.innerHTML = id;

			var posX = minX + x * 100 + "px"; 
			var posY = minY + y * 100  + "px";

			var backgroundX = -x * 100 + "px"; 
			var backgroundY = -y * 100 + "px"; 
			puzzlePiece.style.top = posY;
			puzzlePiece.style.left = posX;
			puzzlePiece.style.backgroundPosition = backgroundX + " " + backgroundY;
			puzzlePiece.onclick = movePiece;
			puzzlePiece.onmouseover = hover;
			puzzlePiece.onmouseout = noHover;
		
			puzzle.appendChild(puzzlePiece);
			pieces.push(puzzlePiece);
			id++;
		}
	}
}

function movePiece(){
	movePieceHelper(this)
}

function movePieceHelper(movingPiece ){
	if (movable_up(movingPiece)){
		movingPiece.style.top = parseInt(movingPiece.style.top) - 100 + "px";
		holeY += size;
	}
	else if (movable_right(movingPiece)){
		movingPiece.style.left = parseInt(movingPiece.style.left) + 100 + "px";
		holeX -= size;
	}

	else if (movable_down(movingPiece)) {
		movingPiece.style.top = parseInt(movingPiece.style.top) + 100 + "px";
		holeY -= size;
	}
	else if (movable_left(movingPiece)) {
		movingPiece.style.left = parseInt(movingPiece.style.left) - 100 + "px";
		holeX += size;
	}
}

function getNeighbors(holeX, holeY, pieces) { 
	var retVal = new Array();
	for (var i = 0; i < pieces.length; i++) {
		if (movable(pieces[i])){
			retVal.push(pieces[i]);
		}
	}
	return retVal;
}

function realNumber(number){
	if (number < 0 || number > 15) {
		return 0;
	}
	return number;
}
function movable(piece){
	return (movable_down(piece) || movable_up(piece) || movable_right(piece) || movable_left(piece));
}
function movable_down(piece){
	var locY = parseInt(piece.style.top);
	var locX = parseInt(piece.style.left);
	//Bounded within square
	if (locY < maxY && (locY + 100) == holeY && locX == holeX) {
		return true;
	}
	
	return false;
	
}
function movable_up(piece){
	var locY = parseInt(piece.style.top);
	var locX = parseInt(piece.style.left);
	//Bounded within square
	if (locY > minY && (locY - 100) == holeY && locX == holeX) {
		return true;
	}
	return false;
}
function movable_left(piece){
	var locX = parseInt(piece.style.left);
	var locY = parseInt(piece.style.top);
	//Bounded within square
	if (locX > minX && (locX - 100) == holeX && locY == holeY) {
		return true;
	}
	return false;
}
function movable_right(piece){
	var locX = parseInt(piece.style.left);
	var locY = parseInt(piece.style.top);
	//Bounded within square
	if (locX < maxX && (locX + 100) == holeX && locY == holeY) {
		return true;
	}
	
	return false;
}

function shuffle(){
	for (var i = 0; i < 1000; i++){
		shuffleHelper(getNeighbors(holeX, holeY, pieces));
	}
}

function shuffleHelper(pieces){
	i = Math.floor(Math.random() * pieces.length)
	movePieceHelper(pieces[i]);
}

function hover(){
	if(movable(this)){
		this.style.borderColor = "red";
		this.style.cursor = "pointer";
	}
}

function noHover(){
	this.style.borderColor = "black";
}
