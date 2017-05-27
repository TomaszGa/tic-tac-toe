

	let gameboard = ["", "", "", "", "", "", "", "", ""]
	let userSymbol = "X";
	let enemySymbol = "O";
	let turns = 0;
	const victoryLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]];
	let moveCount = 0;
	let gameActive = true;

$(document).ready(function () {
	//button asisgnments
	$("#field0").click(function(){
		placeSymbol(0);
	});
	
	$("#field1").click(function(){
		placeSymbol(1);
	});
	
	$("#field2").click(function(){
		placeSymbol(2);
	});		
	
	$("#field3").click(function(){
		placeSymbol(3);
	});
	$("#field4").click(function(){
		placeSymbol(4);
	});		
	
	$("#field5").click(function(){
		placeSymbol(5);
	});	
	
	$("#field6").click(function(){
		placeSymbol(6);
	});		
	
	$("#field7").click(function(){
		placeSymbol(7);
	});		
	
	$("#field8").click(function(){
		placeSymbol(8);
	});
	$("#resetButton").click(function(){
		resetState();
	});
	$("#selectX").click(function(){
		selectUserSymbol("X");
	});	
	$("#selectO").click(function(){
		selectUserSymbol("O");
	});	
});

//use below for click instead, can use val. and value="x" for
/* $("td").click(function(){
  	var tile = $(this).attr('id');
  	if(boardArr[tile]==='#'){
  		
  		humanTurn(tile);
  		
  	}
  })*/

	//update display
	function displayGameboard(){
		var idString = "";
		for (var i = 0; i<9; i+=1) {
			idString = "#field" + i;
			$(idString).html(gameboard[i]);
		}
	}

	//check all possible victory lines
	function victoryCheck(symbol){
		for (var j = 0; j<victoryLines.length; j += 1){
			var victoryStatus = true;
			for (var k = 0; k<3; k += 1){
				if (gameboard[victoryLines[j][k]] !== symbol){victoryStatus = false;}
			}
			//if one of victory conditions was achieved show victory text and reset
			if (victoryStatus === true){
				gameActive = false;
				$(".victory-text").html(symbol + " won!").css("visibility", "visible");

				setTimeout(function(){
					resetState();
				}, 2000);
			}
		}

	}

	//if free field pressed, place user symbol
	function placeSymbol(pos) {
		if (gameboard[pos] === "" && gameActive === true){
		gameboard[pos] = userSymbol;
		incrementMoves();
		victoryCheck(userSymbol);					
		if (moveCount < 9 ){placeSymbolAI();}	
		displayGameboard();
		}

	}

	//ai randomizes fields until free field found
	function placeSymbolAI() {
		if (gameActive === true){
		var randomPosition = 0;
		do {
			randomPosition = getRandomInt(0, 8);
		} while (gameboard[randomPosition] !== "");
		gameboard[randomPosition] = enemySymbol;
		incrementMoves();
		victoryCheck(enemySymbol);
		}
	}

	//randomizer
	function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//increment move count
	function incrementMoves(){
		moveCount += 1;
	}
	//reset game
	function resetState(){
		gameboard = ["", "", "", "", "", "", "", "", ""]
		turns = 0;
		moveCount = 0;
		gameActive = true;
		$(".victory-text").css("visibility", "hidden");
		displayGameboard();
	}

	function selectUserSymbol(symbol){
		userSymbol = symbol;
		if (symbol === "X"){
			enemySymbol = "O";
		}
		else{
			enemySymbol = "X";
		}
		$(".setup-box").fadeOut(500, function(){
			$(".main-box").fadeIn(500);
		});

	}
