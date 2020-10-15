// variables
var buttons = ["first", "second", "third", "forth"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detecting the beggining of a game
$(document).keypress(function() {
  if (!started) {
    $(".level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// detecting button click
$(".btn").click(function() {

  var userClickedButton = $(this).attr("id");
  userClickedPattern.push(userClickedButton);

  playSound(userClickedButton);
  animatePress(userClickedButton);

  checkAnswer(userClickedPattern.length-1);
});

// checking if the answer is correct
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $(".level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// generating new level
function nextSequence() {
    userClickedPattern = [];

    level++;
    $(".level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomButton = buttons[randomNumber];
    gamePattern.push(randomButton);

    $("." + randomButton).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomButton);
}

// key press animation
function animatePress(currentButton) {
  $("#" + currentButton).addClass("pressed");
  setTimeout(function () {
    $("#" + currentButton).removeClass("pressed");
  }, 100);
}

// playing the sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// starting over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
