/* --- Game Setting --- */

var key_left,key_right,key_down,key_up;

  /* -detects keys-  */
document.getElementById("btn_keyup").onkeydown = function (key) {
    document.getElementById('btn_keyup').value = key.code;
    key_up = key.code;
};

document.getElementById("btn_keydown").onkeydown = function (key) {
    document.getElementById('btn_keydown').value = key.code;
    key_down = key.code;
};

document.getElementById("btn_keyleft").onkeydown = function (key) {
    document.getElementById('btn_keyleft').value = key.code;
    key_left = key.code;
};

document.getElementById("btn_keyright").onkeydown = function (key) {
    document.getElementById('btn_keyright').value = key.code;
    key_right = key.code;
};

// --- get settings
$("#start_play").click(function(){
    balls_num = ($("#ball_numbers").val() >= 50 && $("#ball_numbers").val() <=90 ) ? $("#ball_numbers").val() : 50 ;
    gametime = ($("#game_time").val() >= 60 && $("#game_time").val() <= 600 ) ? $("#game_time").val() : 60 ;
    ghosts_num = ($("#ghost_numbers").val() >= 1 && $("#ghost_numbers").val() <= 4 ) ? $("#ghost_numbers").val() : 1 ;
    point5C = $("#5points").val();
    point15C = $("#15points").val();
    point25C = $("#25points").val();
    key_up = $("#btn_keyup").val();
    key_down = $("#btn_keydown").val();
    key_left = $("#btn_keyleft").val();
    key_right = $("#btn_keyright").val();

    $("#setting-balls").html(balls_num);
    $("#setting-ghosts").html(ghosts_num);
    $("#setting-time").html(gametime);
    $("#setting-up").html(key_up);
    $("#setting-down").html(key_down);
    $("#setting-left").html( key_left);
    $("#setting-right").html(key_right);
    $("#setting-5-color").val(point5C);
    $("#setting-15-color").val(point15C);
    $("#setting-25-color").val(point25C);
    $("#Settings_content").hide();
    $("#Game_content").show();
    RestartGame();
    Start();
});

$("#random").click(function(){
    $("#ball_numbers").val(randomNumber(50,90));
    $("#game_time").val(randomNumber(60,600));
    $("#ghost_numbers").val(randomNumber(1,4));
    do{
        $("#5points").val("#" + ((1<<24)*Math.random() | 0).toString(16));
        $("#15points").val("#" + ((1<<24)*Math.random() | 0).toString(16));
        $("#25points").val("#" + ((1<<24)*Math.random() | 0).toString(16));
    }while($("#5points").val() == $("#15points").val() == $("#25points").val() );

    $("#btn_keyleft").val('ArrowLeft');
    $("#btn_keyright").val('ArrowRight');
    $("#btn_keyup").val('ArrowUp');
    $("#btn_keydown").val('ArrowDown');
});
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}
function setBoards(){
    var tmp = [
        [0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0],
        [0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
        [4, 0, 4, 4, 0, 4, 0, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4],
        [4, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 4, 0, 4, 4, 4, 0, 0, 0, 4, 4, 0, 0, 0, 4, 4, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4],
        [4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 4],
        [4, 0, 4, 4, 0, 4, 4, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 4],
        [4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 4, 4, 4],
        [4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 0, 4, 4, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 4, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0],
    ];
    board = deepCopyFunction(tmp);
    ghostboard = deepCopyFunction(tmp);
    console.log(board.length);
    console.log(board[0].length);
}
const deepCopyFunction = (inObject) => {
    let outObject, value, key; 
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
  
    for (key in inObject) {
      value = inObject[key];
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value);
    }
    return outObject;
  }