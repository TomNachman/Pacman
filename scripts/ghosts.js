var blue_ghost=null,pink_ghost=null,yellow_ghost = null,red_ghost=null;
var blue_ghost_pos=null,pink_ghost_pos=null,yellow_ghost_pos = null,red_ghost_pos={};
const dict = {
    empty: 0,
    food: 1, //?
    PacMan: 2,
    Walls: 4,
    balls: 5,
    red_g: 6,
    yellow_g: 7,
    blue_g: 8,
    pink_g: 9,
    gift: 10,
    p5: 5,
    p15: 15,
    p25: 25,
};
// load images
var ghost_img_blue = new Image();
ghost_img_blue.src = "assets/ghosts/blue_ghost.gif"
var ghost_img_red = new Image();
ghost_img_red.src = "assets/ghosts/red_ghost.gif"
var ghost_img_yellow = new Image();
ghost_img_yellow.src = "assets/ghosts/yellow_ghost.gif"
var ghost_img_pink = new Image();
ghost_img_pink.src = "assets/ghosts/pink_ghost.gif"

function DrawGhost(x,y,color){
    //ghost_img.src = "assets/ghosts/" + color + "_ghost.gif";
    switch (color) {
        case "red":
            context.drawImage(ghost_img_red, x - 17 , y - 20 ,0.7 * (canvasWidth / 20),0.7 * (canvasHeight / 20));
            break;
        case "blue":
            context.drawImage(ghost_img_blue,x - 17 , y - 20,0.7 * (canvasWidth / 20),0.7 * (canvasHeight / 20));
            break;
        case "yellow":
            context.drawImage(ghost_img_yellow,x - 17 , y - 20,y,0.7 * (canvasWidth / 20),0.7 * (canvasHeight / 20));
            break;
        case "pink":
            context.drawImage(ghost_img_pink,x - 17 , y - 20,0.7 * (canvasWidth / 20),0.7 * (canvasHeight / 20));
            break;
    }
}
function setGhosts() {
    //init red ghost
    ghostboard[0][0] = dict.red_g;
    red_ghost_pos.i = 0;
    red_ghost_pos.j = 0;
    //init blue ghost
    if(ghosts_num === 2){
        blue_ghost_pos = {};
        ghostboard[0][BOARD_WIDTH-1] = dict.blue_g;
        blue_ghost_pos.i = 0;
        blue_ghost_pos.j = BOARD_WIDTH-1;
    }
    //init yellow ghost
    else if(ghosts_num === 3){
        yellow_ghost_pos = {}
        ghostboard[BOARD_HEIGHT-1][0] = dict.yellow_g;
        yellow_ghost_pos.i = BOARD_HEIGHT - 1;
        yellow_ghost_pos.j = 0;
    }
    //init pink ghost
    else if(ghosts_num === 4){
        pink_ghost_pos = {};
        ghostboard[BOARD_HEIGHT - 1][BOARD_WIDTH-1] = dict.pink_g;
        blue_ghost_pos.i = BOARD_HEIGHT - 1;
        blue_ghost_pos.j = BOARD_WIDTH - 1;
    }
}