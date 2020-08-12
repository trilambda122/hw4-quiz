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
//get any previous scores scores and store to array
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// start button listener for kicking off the quiz
startButtonElement.addEventListener('click', function(event) {
    event.stopPropagation();

    var numberOfQuestions = questions.length;
    console.log("the number of questions is: " + numberOfQuestions);
    // remove the start button and the text-header from the DOM  when the quiz starts
    // localStorage.clear();
    playerName = nameInputElement.value;
    playerName = playerName.toUpperCase();
    checkName(playerName);

    // localStorage.setItem("PLAYER NAME", playerName);
    // localStorage.setItem("SCORE", score);

    document.querySelector('#start_btn').remove()
    nameInputElement.remove();
    // document.querySelector('#text-header').innerText = "";
    // document.querySelector('#text-header').remove();
    setScore(score);
    setQuestion(questionNumber);
    startTimer();
});


// gets the first question from the quesitons array and  then calls show answers function to place the question onthe page

function setQuestion(questionNumber) {
    // event.stopPropagation();
    checkEndOfQuestions(questionNumber);
    singleQuestion = questions[questionNumber].question;
    showQuestion(singleQuestion);
    answers = questions[questionNumber].answers
    showAnswers(answers);

}


// Expects a question oject to be passed, and will then display it on the page. 
function showQuestion(question) {
    // event.stopPropagation();
    questionElement.innerText = question;
}
// expects an answers pbject to be passed and loop through each of them creatingn and displaying a button on the page
function showAnswers(answers) {
    // event.stopPropagation();
    cleanupButtons();

    // buttonAreaElement.appendChild(answerButton);
    answers.forEach(function(answer) {
        // event.stopPropagation();
        var answerButton = document.createElement('button');

        answerButton.classList.add("btn");
        answerButton.classList.add("btn-primary");
        answerButton.classList.add("mr-2");
        answerButton.innerText = answer.possibleAnswer;

        // mark the button as correct in its data-set attribute if correct=true on the answer object
        if (answer.correct) {
            answerButton.dataset.correct = "true";
        }
        // answerButton.addEventListener("click", checkAnswer)
        answerButton.addEventListener('click', function(event) {
                event.stopPropagation();
                checkAnswer(event);
            }

        )
        buttonAreaElement.appendChild(answerButton);


    });
    // no idea why this works, but without it the second set of questions will not display! however it causes an reference error that stops everything else
    // buttonAreaElement.appendChild(answerButton);

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
    // event.stopPropagation();
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

// function checks to see if time has ran out
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

function checkName(name) {
    console.log("player name is currently: " + name);
    if (name === "") {
        alert("please enter a name!");
        location.reload();
    }
    navbarNameElement.innerText = playerName;
}

function checkEndOfQuestions(number) {

    if (number === questions.length) {
        // how to end the game?
        console.log("thats the last question:");

        endQuiz();

    }

}

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
}

function timeStamp() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
    console.log(dateTime);

}
// set the final score and save it to local storage
function setFinalScore(s) {
    var finalScore = {
        score: s,
        name: playerName
    };
    highScores.push(finalScore);

    highScores.sort(function(a, b) {
        return b.score - a.score;

    })
    highScores.splice(10);
    localStorage.setItem('highScores', JSON.stringify(highScores));

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