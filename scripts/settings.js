/* --- Game Setting --- */

var key_left,key_right,key_down,key_up;
var ghosts_num = 2,balls_num = 50, gametime =60;
var point5C,point15C,point25C;


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
    //$("#Settings_content").hide();
    //$("#Game_content").show();
    // Start_Game();
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

    $("#btn_keyleft").val('ArrowLeft') ,key_left = 'ArrowLeft';
    $("#btn_keyright").val('ArrowRight') ,key_left = 'ArrowRight';
    $("#btn_keyup").val('ArrowUp') ,key_left = 'ArrowUp';
    $("#btn_keydown").val('ArrowDown') ,key_left = 'ArrowDown';

    alert("Random Settings Generated! \n ArrowKeys are your play keys");
    
});
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}