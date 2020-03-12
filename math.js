// created by Pentiboyina, id- 700700655

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var inputField = document.getElementById("in");
var form = document.querySelector("form");
var p = document.getElementById("p");
var q = document.getElementById("q");
var op = document.getElementById("op");
var response = document.getElementById("response");
var results = document.getElementById("results");
var category = document.getElementById("category");


var max = 20;
var num1;
var num2;
var answer;

var startTime;
var endTime;

var count; // number of correct answers
var times = [];

/* To Initialize */
inputField.className = "hide";
stopButton.className = "hide";

/* Start Evenlistener */
startButton.onclick = function() {
	// initializing the count
	count = 0;
	times = [];
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	stopButton.className = ""; // show the stop button
	startButton.className = "hide"; // hide the start button
	inputField.focus();
};

form.onsubmit = function(e) {
	// need to prevent the default form submission which reloads the page
	e.preventDefault();
	getAnswer();
};

stopButton.onclick = function() {
	var resultString;
	var categoryString;
	if (times.length > 0) {
		// getting mean time
		var total = 0;
		for (var i = 0; i < times.length; i++) {
			total += times[i];
		}
		var mean = (total / times.length) / 1000;
		resultString = "Average time: " + mean.toPrecision(4) + " sec";
		categoryString = getCategory(mean);
	} else {
		resultString = "No results recorded. Hit the Enter key to submit your answers.";
		categoryString = "";
	}

	inputField.className = "hide"; // hide the input field
	stopButton.className = "hide"; // hide the stop button
	startButton.className = ""; // show the start button

	// clear numbers and present results
	p.innerHTML = "";
	q.innerHTML = "";
	op.innerHTML = "";
	response.innerHTML = ""; // clear response in case it was set
	results.innerHTML = resultString;
	category.innerHTML = categoryString;
};

/* Start Function */
var refreshNums = function() {
	// Getting some random numbers
	num1 = Math.floor((Math.random() * max) + 1);
	num2 = Math.floor((Math.random() * max) + 1);
	// Printing numbers to user
	p.innerHTML = num1;
	op.innerHTML = "+";
	q.innerHTML = num2;
	// Starting timer
	startTime = new Date();
};

/*
* This is called in the onsubmit event
*/
var getAnswer = function() {
	var correct = num1 + num2;
	// Getting the users attempt
	answer = parseInt(inputField.value);

	if (answer === correct) {
		// Stopping the timer and adding the time to the times array
		endTime = new Date();
		times[count++] = endTime.getTime() - startTime.getTime();
		// the answer was correct, so no need for "Try Again"
		response.innerHTML = "";
		refreshNums();
	} else {
		response.innerHTML = "Try Again";
	}
	// clear the input field for the next round
	inputField.value = "";
};

var getCategory = function(mean) {
	var d;
	if (mean < 2) {
		d = "Human Computer";
	} else if (mean < 4) {
		d = "Math Wiz";
	} else if (mean < 7) {
		d = "B Student";
	} else if (mean < 10) {
		d = "Need Math Class";
	} else {
		d = "Go to School AGAIN!";
	}
	return d;
};
