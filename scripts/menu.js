$(document).ready(function(){
    $("#Logout_user").hide();
    $("#Welcome_content").show();
    $("#Game_content").hide();
    $("#Play_btn").hide();
    $("#Play_navbar").hide();
    $("#Login_content").hide();
    //$("#Register_content").hide();
});
// Login Handle



$("#Welcome_navbar").click(function() {
    hide_everyhing();
    $("#Logout_user").show();
    $("#Game_content").show();
});
$("RegisterLogin_btn").click(function() {
  hide_everyhing();
  $("#Welcome_content").show();
});

$("#Play_btn, #Play_navbar").click(function(){
    hide_everyhing();
    $("#Game_content").show();
});

/*$("#Login_navbar").click(function() {
    hide_everyhing();
    $("#Login_content").show();
});*/

$("#Register_navbar").click(function() {
    hide_everyhing();
    $("#Register_content").show();
});

function hide_everyhing() {
    $("#Welcome_content").hide();
    $("#Game_content").hide();
    $("#Login_content").hide();
    $("#Register_content").hide();
    //$("#About_content").hide();
};
// ---  Login + Register Scripts ---
var $loginMsg = $('.loginMsg'),
  $login = $('.login'),
  $signupMsg = $('.signupMsg'),
  $signup = $('.signup'),
  $frontbox = $('.frontbox');

$('#switch1').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.addClass("moving");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

$('#switch2').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontbox.removeClass("moving");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

setTimeout(function(){
  $('#switch1').click()
},1000)

setTimeout(function(){
  $('#switch2').click()
},3000)