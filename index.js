var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level)
		nextSequence()
		started = true
	}
})

$(".btn").click(function () {
	var userChosenColour = $(this).attr("id")
	userClickedPattern.push(userChosenColour)

	playSound(userChosenColour)
	animatePress(userChosenColour)
	checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			console.log("correct")

			console.log(gamePattern, userClickedPattern)
			setTimeout(() => {
				nextSequence()
			}, 1000)
		}
	} else {
		console.log("error")
		playSound("wrong")
		$("body").css("background", "red")
		setTimeout(() => {
			$("body").css("background", "  #011F3F")
		}, 200)
		$("#level-title").text("Game Over, Press Any Key to Restart")

		startOver()
	}
}
function startOver() {
	level = 0
	gamePattern = []
	started = false
}
function nextSequence() {
	//6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
	userClickedPattern = []
	level++
	$("#level-title").text("Level " + level)

	var randomNumber = Math.floor(Math.random() * 4)
	var randomChosenColour = buttonColours[randomNumber]
	gamePattern.push(randomChosenColour)

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100)
	playSound(randomChosenColour)
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3")
	audio.play()
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed")
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed")
	}, 100)
}
