var gamePattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var level = 0;

function nextSequence(){
level++;
$("#level-title").html("Level: " + level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
playSound(randomChosenColour);
console.log(gamePattern);
};

var started=false;
$(document).keypress(function(e){
    if(!started && e.key==="a"){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern);
    console.log(level);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
$("#" + currentColour).addClass("pressed");
setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
}, 100);
};

function startOver(){
level = 0;
started = false;
gamePattern = [];
};

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        userClickedPattern=[];};
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over")}, 200);
        $("#level-title").html("Game Over, Press 'A' Key to Restart");
        startOver();
    }};