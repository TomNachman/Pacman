var users = [];
var active_user = null;
var logged_user = false;

$(document).ready(function(){
  $("#Logout_nav").hide();
  $("#Welcome_content").show();
  $("#Game_content").hide();
  $("#Play_btn").hide();
  $("#Play_nav").hide();
  $("#Logout_nav").hide();
  $("#Login_content").hide();
  $("#Register_content").hide();
  $("#alert_login").hide();
  // init first user
  const first_uesr = {
    firstname : "Pac",
    lastname : "Man",
    username : "k",
    password : "k",
    email : "k@pacman.com",
    birthday: "01/01/01",
  };
  users.push(first_uesr);
  // --- Login  functions
  
  $("#sign_in_btn").click(function () {
    var username = $('#login_username').val();
    var password = $('#login_password').val();
    var valid = false;
    var msg = "";
    $("#alert_details_login").empty();
    $("#alert_login").hide();
    if (username == "") {
      valid = false;
      msg += "Username cant be empty <br >";
    }
    if (password == "") {
      valid = false;
      msg += "Password cant be empty <br >";
    }
    users.forEach(user => {
      if(user.username === username && user.password === password){
        active_user = user;
        valid = true;   
      }
    });
    if (!logged_user){
      msg+= "Incorrect details, Try Again! <br >";
    }
    if (!valid){
      $("#alert_details_login").empty();
      $("#alert_details_login").html(msg);
      $("#alert_login").show();
    }
    else{
     hide_everyhing();
     $("#Welcome_content").show();
     $("#Play_btn").show();
     $("#Play_nav").show();
     $("#Login_nav").hide();
     $("#Login_btn").hide();
     $("#Register_nav").hide();
     $("#Register_btn").hide();
     $("#Logout_nav").show();
     console.log(active_user);
    }
  });

});

// --- Content change 
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
