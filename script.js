// cause everyone should say hello
console.log("HOWDY!");

// VAR declorations for page objects
var startButton = document.querySelector('#start_btn')
var questionElement = document.querySelector("#question-text");
var buttonArea = document.querySelector("#answer-buttons-area")
var timeBar = document.querySelector("#timer-bar");


// stage vars
var questionNumber = 0;
var timeLimit = 300;


// start button listener for kicking off the quiz
startButton.addEventListener('click', function(event) {
    event.stopPropagation();
    // remove the start button and the text-header from the DOM  when the quiz starts
    document.querySelector('#start_btn').remove()
    document.querySelector('#text-header').innerText = "";
    setQuestion(questionNumber);
    startTimer();
});


// gets the first question from the quesitons array and  then calls show answers function to place the question onthe page

function setQuestion(questionNumber) {
    // event.stopPropagation();

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

    // buttonArea.appendChild(answerButton);
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
        buttonArea.appendChild(answerButton);


    });
    // no idea why this works, but without it the second set of questions will not display! however it causes an reference error that stops everything else
    // buttonArea.appendChild(answerButton);

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

        document.querySelector('#text-header').innerText = "CORRECT A MUNDO";
    } else {

        document.querySelector('#text-header').innerText = "NO WAY";
        // decrement the timer by 30sec. 
        timeLimit = timeLimit - 30;
    }
}

function cleanupButtons() {
    while (buttonArea.firstChild) {
        buttonArea.removeChild(buttonArea.firstChild)
    }
}


// Start the timer
function startTimer() {
    var startingTime = timeLimit;
    setInterval(function() {
        timeLimit = timeLimit - 1;
        console.log(timeLimit);
        timeBar.innerText = timeLimit;
        percent = (timeLimit / startingTime) * 100;
        percent = Math.floor(percent);
        percent = (percent + "%");
        console.log("percent is:" + percent);
        timeBar.style.width = percent;

    }, 1000);
}

// function updateTimerBar(time) {
//     var startingTime = timeLimit;
//     timeBar.innerText = time;
//     percent = (time / startingTime) * 100;
//     percent = Math.floor(percent);
//     percent = (percent + "%");
//     console.log("percent is:" + percent);
//     timeBar.style.width = percent;

// }
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