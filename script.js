
// Array of objects containing question, choices and answer
var questions = [
    {
      question: "Can you pass a anonymous function as an argument to another function?",
      choices: ["true", "false"],
      answer: "true"
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choices: ["last()", "get()", "pop()", "None of the above."],
        answer: "pop()"
    },
    {
        question: "What is the JavaScript syntax for printing values in Console?",
        choices: ["print(5);", "console.log(5);", "console.print(5);", "print.console(5);"],
        answer: "console.log(5);"
    },
    {
        question: "Which of the following code creates an object?",
        choices: ["var book = Object();", "var book = new Object();", "var book = new OBJECT();", "var book = new Book();"],
        answer: "var book = new Object();"
    },
    {
        question: "Which of the following function of Array object returns a string representing the array and its elements?",
        choices: ["toSource()", "sort()", "splice()", "toString()"],
        answer: "toString()"
    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        choices: ["<javascript>", "<scripted>", "<script>", "<js>"],
        answer: "<script>"
    },
    {
        question: "What is the syntax for creating a function in JavaScript named as newFunc?",
        choices: ["function = newFunc()", "function newFunc()", "function := newFunc()", "function : newFunc()"],
        answer: "function newFunc()"
    },
    {
        question: "How is the function called in JavaScript?",
        choices: ["call newFunc();", " call function newFunc();", "newFunc();", "function newFunc()"],
        answer: "newFunc();"
    }
]

var questionDiv = document.querySelector("#question"); //Question is displayed in this div
var optionsDiv = document.querySelector("#option-list"); //List of choices are displayed in this div
var questionResDiv = document.querySelector("#question-result"); //User is notified if they answered right or wrong in this div
var timeLeftEl = document.querySelector("#timeLeft"); //Used to display Time left 
var nameFormEl = document.querySelector("#nameForm"); //This form element is pushed to the optionsDiv at the end of the Quiz
var nameSubmitBt = document.querySelector("#nameSubmit"); //Submit button in form nameFormEl

var questionIndex = 0;
var correctCount = 0;
var timer = 10;
var intervalId;
var listScores = [];

// This function renders question at index questionIndex from array questions. 
// The choices are displayed in the form of buttons that user can click on to select their answer
function renderQuestion() {
  
    questionDiv.textContent = questions[questionIndex].question;
  
    optionsDiv.innerHTML = "";
    questionResDiv.setAttribute("class", "invisible");
  
    var choicesArr = questions[questionIndex].choices;
    
    for (var i = 0; i < choicesArr.length; i++) {
        var optionsButton = document.createElement("button");
        optionsButton.setAttribute("class", "btn btn-outline-primary w-50 my-1 text-left text-wrap");
        optionsButton.textContent = choicesArr[i];
        
        optionsDiv.append(optionsButton);
    }
    intervalId = setInterval(displayTimer, 1000);
};

function displayTimer() {
    timeLeftEl.textContent = timer + " secs";
    timer--;

    if (timer < 0) {
        endQuiz();
    }
};

//Below function disables all the buttons in optionsDiv div so that user can not 
//click again until new question is rendered.
function diableOptions () {
    for (j=0; j < optionsDiv.childElementCount; j++) {
        optionsDiv.children[j].setAttribute("disabled", true);
    }
};

//Check if the user selected the right answer or wrong and display in the div questionResDiv
//Function to render Next question is also called after 2 seconds pause 
function checkAnswer (event) { 
    diableOptions();

    if (event.target.matches("button")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResDiv.textContent = "Correct Answer";
            correctCount++;
        } else {
            questionResDiv.textContent = "Wrong Answer";
            timer -= 2;
        }
        questionResDiv.setAttribute("class", "card-footer text-muted visible");
        clearInterval(intervalId);
        timeLeftEl.textContent = timer + " secs";
        
        //If user's previous answer was wrong, the timer value might be zero or negative
        //In such cases, don't call nextQuestion function.
        if (timer > 0) {
            setTimeout(nextQuestion, 2000);
        } else {
            endQuiz();
        }
    }   
};

function nextQuestion () {
    questionIndex++;

    if (questionIndex >= questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }  
};

//This function wipes out all data from questionDiv, optionsDiv and makes questionResDiv invisible.
//The card is populated with heading "Quiz Over" and user is shown his total score. 
//The optionsDiv div is also populated with a form for users to enter their name.  
function endQuiz () {
    clearInterval(intervalId);
    questionDiv.innerHTML = "";
    optionsDiv.innerHTML = "";
    questionResDiv.setAttribute("class", "invisible");
    document.querySelector("#timeDiv").setAttribute("class", "invisible");
    questionDiv.append(document.createElement("h2").textContent = "Quiz Over!!!");
    optionsDiv.append(document.createElement("p").textContent = "Your Final Score is: " + correctCount);
    nameFormEl.setAttribute("class", "visible mt-3");
    optionsDiv.append(nameFormEl);
};

// This function save user name and score in local storage. 
function saveScores() {
    listScores = JSON.parse(localStorage.getItem("scores"));
    if (listScores === null) {
        listScores = [];
    }
    var userName = document.querySelector("#inputName").value;
    var userScore = {"name" : userName, "score": correctCount };
    listScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(listScores));
    window.location.href = "highscores.html"; //Show List of High Scores once user enter their name and click Submit
};

renderQuestion();
optionsDiv.addEventListener("click", checkAnswer); 
nameSubmitBt.addEventListener("click", saveScores);
