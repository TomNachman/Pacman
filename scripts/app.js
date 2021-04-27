var context;
var shape = new Object();
var board,ghostboard;
var score;
var pac_color;
var start_time, gametime;
var time_elapsed;
var interval;
var movements = {up: 1, down: 2, left: 3, right: 4};
var ghosts_num ,balls_num;
var point5C,point15C,point25C;
var pos=0.15;
var maxScore;
// --- new ver vars
var canvasWidth, canvasHeight, dynamicSize;
var BOARD_HEIGHT = 20;
var BOARD_WIDTH = 19;
var pacman_remain

// load images
var wall = new Image();
wall.src = "assets/wall.svg";
// --end

$(document).ready(function() {
	context = canvas.getContext("2d");
	//Start();
});

function Start() {
	board = [];
	ghostboard = [];
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = balls_num? balls_num : 50 ;
	var food5 = Math.floor(food_remain*0.6);
	var food15 = Math.floor(food_remain*0.3);
	var food25 = Math.floor(food_remain*0.1);
	maxScore = food5 * 5 + food15 * 15 + food25 * 25
	console.log(food5);
	console.log(food15);
	console.log(food25);

	console.log(maxScore);
	pacman_remain = 3;
	canvasWidth = document.getElementById("canvas").width;
    canvasHeight = document.getElementById("canvas").height;
	start_time = new Date();
	/*
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= food_remain / cnt) {
					if(randomNum <= food5 / food_remain){
						food5--
						board[i][j] = 5;
					}
					else if( (food5 / food_remain) < randomNum <= (food15 / food_remain)){
						food15--
						board[i][j] = 15;
					}
					else if( (food15 / food_remain) < randomNum <= (food25 / food_remain)){
						food25--
						board[i][j] = 25;
					}
					food_remain--;
					//board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}*/
	
	for (var i = 0; i < BOARD_HEIGHT; i++) {
        board[i] = [];
        ghostboard[i] = [];
        // for (var j = 0; j < BOARD_WIDTH; j++) {
        //     board[i][j] = 0;
        //     ghostboard[i][j] = 0;
        // }
    }
	setBoards();	
	setGhosts();
	//set pacman
	board[10][9] = 2;
	shape.i = 10;
	shape.j = 9;
	//set food
	setFood(food5,food15,food25);

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.code] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.code] = false;
		},
		false
	);
	Draw();
	interval = setInterval(UpdatePosition, 250);
}

function Draw() {
	canvas.width = canvas.width; //clean board
	$("#lblScore").html(score);
	$("#lblTime").html(time_elapsed);
	var hearts = '&#10084;'.repeat(pacman_remain);
	$("#lblHealth").html(hearts);
	for (var i = 0; i < BOARD_HEIGHT; i++) {
		for (var j = 0; j < BOARD_WIDTH; j++) {
			var center = new Object();
			center.x = i * 55 + 30;
			center.y = j * 55 + 30;
			
			// Pacman
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 25, pos * Math.PI, (pos + 1.7) * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if (pos===1.65 || pos === 0.65)
					context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
				else 
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

			// Walls
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 25, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
				//context.drawImage(wall,center.x,center.y,30,30);
				//context.drawImage(ghost_img_yellow,center.x + 2,center.y,0.7 * (canvasWidth / 20),0.7 * (canvasHeight / 20));
			// Balls
			} else if (board[i][j] == 5) {
				putBalls(center.x, center.y, 5);	

			} else if (board[i][j] == 15) {
				putBalls(center.x, center.y, 15);

			} else if (board[i][j] == 25) {
				putBalls(center.x, center.y, 25);
			}
			// Ghosts
			
			//if (i== 19 && j == 19 )console.log("hi");
			if (ghostboard[i][j] === dict.red_g)
				DrawGhost(center.x, center.y, "red");
            else if (ghostboard[i][j] === dict.yellow_g)
				DrawGhost(center.x, center.y, "yellow");
            else if (ghostboard[i][j] === dict.blue_g)
				DrawGhost(center.x, center.y, "blue");
            else if (ghostboard[i][j] === dict.pink_g)
				DrawGhost(center.x, center.y, "pink");
				
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < BOARD_WIDTH - 1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < BOARD_HEIGHT - 1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	
	if(board[shape.i][shape.j] == 5){
		score += 5;
		pacman_remain--;
	}

	if(board[shape.i][shape.j] == 15){
		score += 15;
	}

	if(board[shape.i][shape.j] == 25){
		score += 25;
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == maxScore) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else if (pacman_remain==0){
		window.clearInterval(interval);
		window.alert("You Lose");
	} else {
		Draw();
	}
}
function findRandomEmptyCell(board) {
	/*
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
	*/
	var i = Math.floor(Math.random() * (BOARD_HEIGHT-1)+1);
	var j = Math.floor(Math.random() * (BOARD_WIDTH-1)+1);
	while (board[i][j] != 0) { // add ghostboard[i][j] != 0 when finish
		i = Math.floor(Math.random() * (BOARD_HEIGHT-1)+1);
		j = Math.floor(Math.random() * (BOARD_WIDTH-1)+1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[key_up]) {
		pos=1.65
		return 1;
	}
	if (keysDown[key_down]) {
		pos = 0.65;
		return 2;
	}
	if (keysDown[key_left]) {
		pos=1.15
		return 3;
	}
	if (keysDown[key_right]) {
		pos = 0.15;
		return 4;
	}
}

function putBalls(x_center, y_center, value){
	context.beginPath();
	if (value == 5) context.fillStyle = point5C;
	if (value == 15) context.fillStyle = point15C;
	if (value == 25) context.fillStyle = point25C;
	context.strokeStyle = "black";
	context.font = "30px";
	context.lineWidth = 10;
	context.arc(x_center, y_center, 15, 0, 2 * Math.PI); // circle
	context.fill();
	context.beginPath();
	context.fillStyle = "black";
	if (value == 5) context.fillText("5", x_center - 5 , y_center + 3);
	if (value == 15) context.fillText("15", x_center - 5 , y_center + 3);
	if (value == 25) context.fillText("25", x_center - 5 , y_center + 3);
	context.fill();
};
function setFood(food5,food15,food25){
	while (food5 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = dict.p5;
		food5--;
	}

	while (food15 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = dict.p15;
		food15--;
	}

	while (food25 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = dict.p25;
		food25--;
	} 
}

