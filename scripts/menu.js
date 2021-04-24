$(document).ready(function(){
  $("#Logout_nav").hide();
  $("#Welcome_content").show();
  $("#Game_content").hide();
  $("#Play_btn").hide();
  $("#Play_nav").hide();
  $("#Logout_nav").hide();
  $("#Login_content").hide();
  $("#Register_content").hide();
});

$("#Welcome_nav").click(function(){
  console.log("welcome");
  hide_everyhing();
  $("#Welcome_content").show();
});

$("#Login_nav, #Login_btn").click(function() {
    console.log("Login");
    hide_everyhing();
    $("#Login_content").show();
});

$("#Register_nav, #Register_btn").click(function() {
  console.log("Register");
  hide_everyhing();
  $("#Register_content").show();
});

$("#Play_btn, #Play_nav").click(function(){
  console.log("Reg");
  hide_everyhing();
  $("#Game_content").show();
});

function hide_everyhing() {
  $("#Welcome_content").hide();
  $("#Game_content").hide();
  $("#Login_content").hide();
  $("#Register_content").hide();
};
