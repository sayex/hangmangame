// we need a button to start the game have an event lister on it to do the following items
var startButtonEl = document.querySelector("#startButton");
var gameAreaEl = document.querySelector("#gameArea");
var scoreEl = document.querySelector("#score");
var countdown = 30;
var interval;
var randomWord;
var blanks =[];
var blankCounter
var score = JSON.parse(localStorage.getItem("score")) || {wins: 0, losses: 0};
var words = ["apple", "banana", "orange", "pear", "grape", "pineapple", "strawberry", "blueberry", "raspberry", "blackberry", "mango", "kiwi", "watermelon", "cantaloupe", "honeydew", "lemon", "lime", "coconut", "papaya", "peach", "plum", "cherry", "apricot", "nectarine", "fig", "date", "persimmon", "pomegranate", "guava", "lychee", "dragonfruit", "starfruit", "passionfruit", "jackfruit", "breadfruit", "durian", "mangosteen", "rambutan", "longan", "carambola", "tamarind", "quince", "ugli", "tangelo", "kumquat", "salmonberry", "boysenberry", "loganberry", "lingonberry", "cloudberry", "elderberry", "gooseberry", "mulberry", "huckleberry", "cranberry", "lingonberry", "goji", "acai", "bilberry", "currant", "barberry", "chokeberry", "gooseberry", "hackberry", "honeyberry", "marionberry", "nannyberry", "olallieberry", "salmonberry", "seaberry", "serviceberry", "strawberry", "tayberry", "thimbleberry", "whiteberry", "yumberry", "yuzu", "clementine", "mandarin", "tangerine", "blood orange", "ugli", "bergamot", "kumquat", "pomelo", "tangelo", "satsuma", "cara cara", "navel", "valencia", "mandelo", "minneola"];

scoreEl.textContent = "Wins: " + score.wins + " Losses: " + score.losses;

function init(){
	countdown = 30
	randomWord = ""
	blanks = []
	blankCounter = 0
}

function startHandler() {
	init();
// start a timer
startTimer()
// we need to randomly select a word to display;
// pick a word and disply it as blanks
randomWord = randomWordSelector();
console.log(randomWord);
blankCounter = randomWord.length
console.log(randomWord);

for (var i = 0; i < randomWord.length; i++){
	blanks.push("_")
}
gameAreaEl.textContent = blanks.join(" ");
		
	//  reset button when clicked after the game endeds we need to reset the game to play again
}

function randomWordSelector (){
	var randomIndex = Math.floor(Math.random() * words.length);
	var randomWord = words[randomIndex];
	return randomWord;
}

function startTimer (){
 interval = setInterval(function(){
	 countdown --;
	 if (countdown === 0){
				 //code a timer to end the game after the time is up
		endgame("loss")
	 }
 }, 1000)
}

function guessLetter(event){
	// add a keydown event
	// needs to check if the key pressed is in the word selected
	// it needs to replace the _ with the letter pressed if it is in the word
	var letter = event.key
	console.log(letter)
	for (var i = 0; i < randomWord.length; i++){
		var currentLetter = randomWord[i]
		if (letter === currentLetter){
			blanks[i] = letter;
			gameAreaEl.textContent = blanks.join(" ");
			blankCounter--
			console.log(blankCounter);
			if (blankCounter === 0){
				console.log("win");
				endgame("win")
			}
		}
	}
	// for (var j = 0; j < blanks.length; j++){
	// 	if (blanks[j] === "_"){
	// 		return
	// 	} else {
	// 		endgame("win")
	// 	}
	// }
}

function endgame(condition){
	// we need to know what a win is and a loss is.
	// a win is if the word is completed before the timer runs out
	// a loss is if the word is incomplete before the timer runs out
	// display a message to the user when they win or lose
	// stop the timer
	// keep track of the wins and losses
		// win++
		// loss++
		// save win and losses to local storage

	clearInterval(interval)
	if (condition === "win"){
		score.wins++
		alert("You Win!")
	}
	else {
		score.losses++
		alert("You Lose!")
	}
	console.log(score);
	localStorage.setItem("score", JSON.stringify(score))
}

startButtonEl.addEventListener("click", startHandler);
document.addEventListener("keydown", guessLetter)
