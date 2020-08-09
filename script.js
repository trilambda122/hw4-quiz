// cause everyone should say hello
console.log("HOWDY!");

// VAR declorations for page objects
var startButton = document.querySelector('#start_btn')
var questionElement = document.querySelector("#question-text");
var buttonArea = document.querySelector("#answer-buttons-area")
console.log(questionElement);




// start button listener for kicking off the quiz
startButton = addEventListener('click', startQuiz)


// funciton to start the quiz, will remvoe the start button from the DOM and set the first quesiton
function startQuiz() {
    event.stopPropagation();
    // remove the start button and the text-header from the DOM  when the quiz starts
    document.querySelector('#start_btn').remove();
    document.querySelector('#text-header').remove();

    setQuestion();
}


// gets the first question from the quesitons array and  then calls show answers function to place the question onthe page
function setQuestion() {
    event.stopPropagation();
    console.log(questions[0].question);
    singleQuestion = questions[0].question;
    showQuestion(singleQuestion);
    answers = questions[1].answers
    showAnswers(answers);
}


// Expects a question oject to be passed, and will then display it on the page. 
function showQuestion(question) {
    event.stopPropagation();
    console.log("showing the question!");
    console.log(questionElement);
    questionElement.innerText = question;
}

// expects an answers pbject to be passed and loop through each of them creatingn and displaying a button on the page
function showAnswers(answers) {
    event.stopPropagation();
    console.log(answers)

    answers.forEach(function(answer) {
        var answerButton = document.createElement('button');
        answerButton.classList.add("btn");
        answerButton.classList.add("btn-primary");
        answerButton.classList.add("mr-2");
        answerButton.innerText = answer.possibleAnswer;
        answerButton.addEventListener("click", checkAnswer)
        buttonArea.appendChild(answerButton);
    });

};

// expects a single answer object to be passed, will parse the correct parm for true or false
function checkAnswer(answer) {
    event.stopPropagation();
    console.log('Checking the answer');

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
            { possibleAnswer: "qoutes", correct: true },
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
            { possibleAnswer: "numbers", correct: true }
        ]
    }
]