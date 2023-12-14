var containerElement = document.querySelector(".container");
var timerElement = document.querySelector(".timer-count");
// Array of questions the user will answer
var questions = [
    {
        "title" : "Commonly used data types DO NOT include:",
        "options": [
            {
                "option": "strings",
                "value": false,
            },
            {
                "option": "booleans",
                "value": false,
            },
            {
                "option": "alerts",
                "value": true,
            },
            {
                "option": "numbers",
                "value": false,
            }
        ]
    },
    {
        "title" : "The condition in a if / else statement is enclosed within ___.",
        "options": [
            {
                "option": "quobes",
                "value": false,
            },
            {
                "option": "curly brackets",
                "value": false,
            },
            {
                "option": "parentheses",
                "value": false,
            },
            {
                "option": "square brackets",
                "value": true,
            }
        ]
    },
    {
        "title" : "Arrays in JavaScript can be use to store ____.",
        "options": [
            {
                "option": "numbers and strings",
                "value": false,
            },
            {
                "option": "other arrays",
                "value": false,
            },
            {
                "option": "booleans",
                "value": false,
            },
            {
                "option": "all of the above",
                "value": true,
            }
        ]
    },
    {
        "title" : "String values must be enclosed within ___ when being assigned to variables.",
        "options": [
            {
                "option": "commas",
                "value": false,
            },
            {
                "option": "curly brackets",
                "value": false,
            },
            {
                "option": "quotes",
                "value": true,
            },
            {
                "option": "parentheses",
                "value": false,
            }
        ]
    },
    {
        "title" : "A very useful tool used during development and debugging for printing content to the debugger is:",
        "options": [
            {
                "option": "JavaScript",
                "value": false,
            },
            {
                "option": "terminal/bash",
                "value": false,
            },
            {
                "option": "for loops",
                "value": false,
            },
            {
                "option": "console log",
                "value": true,
            }
        ]
    }
];

var timerCount;
var timer;
var scores;
var timeDiscount = 10;
var timeScore;
// The init function is called when the page loads
function init() {
    firstView();
}

// th
function firstView() {
    timerCount = 70;
    var h1El = document.createElement("h1");
    var h3El = document.createElement("h3");
    var btEl = document.createElement("button");
    h1El.textContent = "Coding Quiz Challenge";
    h1El.classList.add('h1');
    containerElement.setAttribute("style", "align-items: center;");
    h3El.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will paralize your scoretime by ten seconds !";
    h3El.classList.add('h3');
    btEl.textContent = "Start Quiz";
    btEl.classList.add('button');
    btEl.addEventListener("click", function(){
        startTimer();
        questionsView(0);
    });
    containerElement.appendChild(h1El);
    containerElement.appendChild(h3El);
    containerElement.appendChild(btEl);
}

// This function is used to show all the questions with its options
function questionsView(index) {
    
    clearContainer();
    containerElement.setAttribute("style", "align-items: flex-start;");
    var h1El = document.createElement("h1");
    h1El.textContent = questions[index].title;
    h1El.classList.add('h1');
    h1El.setAttribute("style", "text-align: left;");
    containerElement.appendChild(h1El);

    for (var i = 0; i < questions[index].options.length; i++) {
        var btEl = document.createElement("button");
        btEl.textContent = (i + 1 ).toString() + ". " + questions[index].options[i].option;
        btEl.value = questions[index].options[i].value;
        btEl.classList.add('button');
        btEl.classList.add('answer');
        containerElement.appendChild(btEl);
        btEl.addEventListener("click", function(event){
            //check if the answer is correct
            var value = event.target.value;
            if(value !== "true"){
                var timeRemain = timerCount - timeDiscount;
                if(timeRemain < 0){
                    timerCount = 0;
                    setTime(timerCount);
                }
                else{
                    timerCount = timeRemain;
                    setTime(timerCount);
                }
            }

            //check if the answer is correct
            if(index == questions.length - 1) {
                clearContainer();
                timeScore = timerCount;
                lastView();
                clearInterval(timer);
            }
            else
                questionsView(index + 1);

            var brEl = document.createElement("br");
            // var h1El1 = document.createElement("h1");
            containerElement.appendChild(brEl);
        })
    }
}

function lastView() {
    var h1El = document.createElement("h1");
    var h3El = document.createElement("h3");
    var divEl = document.createElement("div");
    var lbEl = document.createElement("label");
    var btEl = document.createElement("button");
    var inEl = document.createElement("input");

    h1El.textContent = "All done !";
    h1El.classList.add('h1');
    
    h3El.textContent = "Your final score is " + timeScore;
    h3El.classList.add('h3');
    h3El.setAttribute("style", "margin-left: 10px;");

    lbEl.textContent = "Enter initials:"
    lbEl.classList.add('label');

    inEl.classList.add('input');
    inEl.classList.add('form-control');

    btEl.textContent = "Submit";
    btEl.classList.add('button');
    btEl.addEventListener("click", function(){
        clearContainer();
        highScoresView();
    })

    divEl.appendChild(lbEl);
    divEl.appendChild(inEl);
    divEl.appendChild(btEl);

    divEl.classList.add('secondary-div');
    
    containerElement.appendChild(h1El);
    containerElement.appendChild(h3El);
    containerElement.appendChild(divEl);
}

function highScoresView() {
    timerCount = 70;
    var h1El = document.createElement("h1");
    var divEl = document.createElement("div");
    var btEl1 = document.createElement("button");
    var btEl2 = document.createElement("button");

    h1El.textContent = "Highscores";
    h1El.classList.add('h1');

    btEl1.textContent = "Go Back";
    btEl1.classList.add('button');
    btEl1.addEventListener("click", function(){
        clearContainer();
        firstView();
    })

    btEl2.textContent = "Clear Highscores";
    btEl2.classList.add('button');
    btEl2.addEventListener("click", function(){
        clearContainer();
    })
    
    divEl.appendChild(btEl1);
    divEl.appendChild(btEl2);

    containerElement.appendChild(h1El);
    containerElement.appendChild(divEl);
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      setTime(timerCount);
    //   if (timerCount >= 0) {
    //     // Tests if win condition is met
    //     if (isWin && timerCount > 0) {
    //       // Clears interval and stops timer
    //       clearInterval(timer);
    //       winGame();
    //     }
    //   }
    //   // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        clearContainer();
        timeScore = timerCount;
        lastView();
      }
    }, 1000);
  }

  function setTime(time) {
    timerElement.textContent = "Time : " + time;
  }

// The clearContainer function is used to remove all the children whthin Div container
function clearContainer() {
    
    var containerElements = document.querySelector(".container");

    while(containerElements.hasChildNodes())
    containerElements.removeChild(containerElements.firstChild);
}

// These functions are used by init
function getScores() {
    // Get stored value from client storage, if it exists
    var storedScores = localStorage.getItem("score");
    // If stored value doesn't exist, set counter to 0
    if (storedScores === null) {
      scores = {};
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      scores = storedScores;
    }
    //Render win count to page
    win.textContent = winCounter;
  }

// Calls init() so that it fires when page opened
init();