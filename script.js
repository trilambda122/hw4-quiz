// cause everyone should say hello
console.log("HOWDY!");

// VAR declorations for page objects
var textHeaderElement = document.querySelector('#text-header');
var navbarNameElement = document.querySelector('#nav-name')
var startButtonElement = document.querySelector('#start_btn');
var questionElement = document.querySelector("#question-text");
var buttonAreaElement = document.querySelector("#answer-buttons-area");
var timeBar = document.querySelector("#timer-bar");
var scoreEmelent = document.querySelector("#nav-score");
var playerNameElement = document.querySelector('#player-name');
var cardTextElement = document.querySelector('#card-text');
var nameButtonElement = document.querySelector('#name-button');
var nameInputElement = document.querySelector('#name-input');
var nameInputGroupElement = document.querySelector('name-input-group');
var instructionsElement = document.querySelector('#instructions');
var messageBaordElement = document.querySelector('#message-board');
var cardImageElement = document.querySelector('#card-image');

// staged vars at the start 
var questionNumber = 0;
var timeLimit = 180;
var score = 0;
var playerName = "";
var countdownInterval;

//get any previous scores scores and store to array or create and empty array to start with
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// start button listener for kicking off the quiz
startButtonElement.addEventListener('click', function(event) {
    event.stopPropagation();

    var numberOfQuestions = questions.length;
    console.log("the number of questions is: " + numberOfQuestions);

    //get the players name or throw and error if no name is provided.
    playerName = nameInputElement.value;
    playerName = playerName.toUpperCase();
    checkName(playerName);

    // remove the start button 
    document.querySelector('#start_btn').remove()
    nameInputElement.remove();
    // set up the quiz and start the timer
    setScore(score);
    setQuestion(questionNumber);
    startTimer();
});


// gets the first question from the quesitons array and then calls show answers function to place the question on the page

function setQuestion(questionNumber) {

    checkEndOfQuestions(questionNumber);
    singleQuestion = questions[questionNumber].question;
    showQuestion(singleQuestion);
    answers = questions[questionNumber].answers
    showAnswers(answers);

}


// Expects a question object to be passed, and will then display it on the page. 
function showQuestion(question) {
    questionElement.innerText = question;
}

// expects an answers object to be passed and loop through each of them creating and displaying a button on the page
function showAnswers(answers) {
    //  clean up and old buttons 
    cleanupButtons();


    answers.forEach(function(answer) {

        var answerButton = document.createElement('button');

        answerButton.classList.add("btn");
        answerButton.classList.add("btn-primary");
        answerButton.classList.add("mr-2");
        answerButton.innerText = answer.possibleAnswer;

        // mark the button as correct in its data-set attribute if correct=true on the answer object
        if (answer.correct) {
            answerButton.dataset.correct = "true";
        }

        answerButton.addEventListener('click', function(event) {
                event.stopPropagation();
                checkAnswer(event);
            }

        )
        buttonAreaElement.appendChild(answerButton);


    });


};

// expects a single answer object to be passed, will parse the correct parm for true or false
function checkAnswer(answer) {
    // event.stopPropagation();
    var buttonSelected = answer.target;
    var answerStatus = false;
    if (buttonSelected.dataset.correct === "true") {
        answerStatus = true;
    }

    showAnswerResult(answerStatus);
    questionNumber = questionNumber + 1;
    setQuestion(questionNumber);
}

// Display the status of the selected answer to the page. 
function showAnswerResult(answerStatus) {

    if (answerStatus) {
        score = score + 1;
        setScore(score);
        document.querySelector('#text-header').innerText = "CORRECT A MUNDO";
    } else {
        document.querySelector('#text-header').innerText = "NO WAY";
        // decrement the timer by 30sec. 
        timeLimit = timeLimit - 30;
    }
}

// this function is used to remove the answer buttons before displaying new ones
function cleanupButtons() {
    while (buttonAreaElement.firstChild) {
        buttonAreaElement.removeChild(buttonAreaElement.firstChild)
    }
}


// Start the timer
function startTimer() {
    var startingTime = timeLimit;
    countdownInterval = setInterval(function() {
        timeLimit = timeLimit - 1;
        setTimebar(timeLimit, startingTime);
        checkTime(timeLimit, countdownInterval);

    }, 1000);

}

// this funciton updates the display for the progressbar/timebar
function setTimebar(time, start) {

    var percent = (time / start) * 100;
    percent = Math.floor(percent);
    percent = (percent + "%");
    timeBar.style.width = percent;
    timeBar.innerText = percent;

}

// function checks to see if time has ran out, if so it will end the game 
function checkTime(time, interval) {
    console.log("In the check time function");
    if (time < 0) {
        console.log("ran out of time!")
        clearInterval(interval);
        endQuiz();
        cleanupButtons();

    }

}

// function updates the score displayed on the page
function setScore(s) {
    s = score;
    scoreEmelent.innerText = "SCORE: " + s;
}

// function checks to see if player has entered a name
function checkName(name) {
    console.log("player name is currently: " + name);
    if (name === "") {
        alert("please enter a name!");
        location.reload();
    }
    navbarNameElement.innerText = playerName;
}

// function checks to see if the last question had been reached, if so it will end the game
function checkEndOfQuestions(number) {

    if (number === questions.length) {
        // how to end the game?
        console.log("thats the last question:");

        endQuiz();

    }

}

//  function to end the quiz.
function endQuiz() {
    //remove the answer buttons
    cleanupButtons();
    // Stop the timer
    clearInterval(countdownInterval);
    timeStamp = timeStamp();
    // save the score to local storage

    cardImageElement.src = 'Fonzie.jpg';
    localStorage.setItem(timeStamp, playerName + "," + score);
    textHeaderElement.innerText = "GAME OVER";
    instructionsElement.innerText = "Refresh the page to try again";

    messageBaordElement.innerText = playerName + "!" + " Your Score was: " + score + " AT: " + timeStamp;

    questionElement.innerText = "";
    setFinalScore(score);
    displayHighScores();
}

// timestamp funciton to get the current date and time 
function timeStamp() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;


}
// set the final score and save it to local storage
function setFinalScore(s) {
    // create finalScore object? 
    var finalScore = {
        score: s,
        name: playerName
    };

    highScores.push(finalScore);

    // sort the highscores array from highest to lowest. so that we can drop anything past the top 5. 
    highScores.sort(function(a, b) {
            return b.score - a.score;

        })
        // only keep the top 5 scores 
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

}

//  still wokring through this. 
function displayHighScores() {
    var highScoreList = JSON.parse(localStorage.getItem('highScores'));
    highScoreList = JSON.stringify(highScoreList);
    highScoreList = highScoreList.split(",");
    console.log(highScoreList[1]);
    console.log(highScoreList.length);
    console.log(typeof(highScoreList));


}
// array of objects containing questions, possible answers, and true or false values. 
var questions = [{
        question: "The condition in an if /else statement is enclosed with _____?",
        answers: [
            { possibleAnswer: "quotes", correct: false },
            { possibleAnswer: "curly braces", correct: false },
            { possibleAnswer: "parenthesis", correct: true },
            { possibleAnswer: "curly_braces", correct: false }
        ]
    },
    {
        question: "String values must be inclused within ______ when being assigned to variables.",
        answers: [
            { possibleAnswer: "commas", correct: false },
            { possibleAnswer: "curly braces", correct: false },
            { possibleAnswer: "quotes", correct: true },
            { possibleAnswer: "parenthesis", correct: false }
        ]
    },
    {
        question: "A very useful tool used durning development and debugging for printing content to the debugger is:",
        answers: [
            { possibleAnswer: "Javascript", correct: false },
            { possibleAnswer: "Termial", correct: false },
            { possibleAnswer: "for loops", correct: false },
            { possibleAnswer: "console.log", correct: true }
        ]
    },
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { possibleAnswer: "strings", correct: false },
            { possibleAnswer: "Boolean", correct: false },
            { possibleAnswer: "alerts", correct: true },
            { possibleAnswer: "numbers", correct: false }
        ]
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { possibleAnswer: "<script>", correct: true },
            { possibleAnswer: "<scripting>", correct: false },
            { possibleAnswer: "<js>", correct: false },
            { possibleAnswer: "<javascript>", correct: false }
        ]
    },

    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        answers: [
            { possibleAnswer: "<script scr=\"xxx.js\">", correct: true },
            { possibleAnswer: "<script name=\"xxx.js\>", correct: false },
            { possibleAnswer: "<script href=\"xxx.js\>", correct: false },
            { possibleAnswer: "<script loc=\"xxx.js\>", correct: false }
        ]
    },

    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            { possibleAnswer: "// This is a comment", correct: true },
            { possibleAnswer: "[this is a comment]", correct: false },
            { possibleAnswer: "*this is a comment", correct: false },
            { possibleAnswer: "-- this is a comment", correct: false }
        ]
    }
]