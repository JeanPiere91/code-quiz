var containerElement = document.querySelector(".container");
var timerElement = document.querySelector(".timer-count");
// Array of questions the user will answer
var questions = [
    {
        "title" : "Commonly used data types DO NOT include:",
        "options": [
            {
                "Option": "strings",
                "Value": false,
            },
            {
                "Option": "booleans",
                "Value": false,
            },
            {
                "Option": "alerts",
                "Value": true,
            },
            {
                "Option": "numbers",
                "Value": false,
            }
        ]
    },
    {
        "title" : "The condition in a if / else statement is enclosed within ___.",
        "options": [
            {
                "Option": "quobes",
                "Value": false,
            },
            {
                "Option": "curly brackets",
                "Value": false,
            },
            {
                "Option": "parentheses",
                "Value": true,
            },
            {
                "Option": "square brackets",
                "Value": true,
            }
        ]
    },
    {
        "title" : "Arrays in JavaScript can be use to store ____.",
        "options": [
            {
                "Option": "numbers and strings",
                "Value": false,
            },
            {
                "Option": "other arrays",
                "Value": false,
            },
            {
                "Option": "booleans",
                "Value": false,
            },
            {
                "Option": "all of the above",
                "Value": true,
            }
        ]
    },
    {
        "title" : "String values must be enclosed within ___ when being assigned to variables.",
        "options": [
            {
                "Option": "commas",
                "Value": false,
            },
            {
                "Option": "curly brackets",
                "Value": false,
            },
            {
                "Option": "quobes",
                "Value": true,
            },
            {
                "Option": "parentheses",
                "Value": true,
            }
        ]
    },
    {
        "title" : "A very useful tool used during development and debugging for printing content to the debugger is:",
        "options": [
            {
                "Option": "JavaScript",
                "Value": false,
            },
            {
                "Option": "terminal/bash",
                "Value": false,
            },
            {
                "Option": "for loops",
                "Value": false,
            },
            {
                "Option": "console log",
                "Value": true,
            }
        ]
    }
];

var timerCount;
var timer;
var scores;

// The init function is called when the page loads
function init() {
    firstView();
}

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
        clearContainer();
        startTimer();
        secondView();
    });
    containerElement.appendChild(h1El);
    containerElement.appendChild(h3El);
    containerElement.appendChild(btEl);
}

function secondView() {
    containerElement.setAttribute("style", "align-items: flex-start;");
    var h1El = document.createElement("h1");
    h1El.textContent = questions[0].title;
    h1El.classList.add('h1');
    h1El.setAttribute("style", "text-align: left;");
    containerElement.appendChild(h1El);

    for (var i = 0; i < questions[0].options.length; i++) {
        var btEl = document.createElement("button");
        btEl.textContent = (i + 1 ).toString() + ". " + questions[0].options[i].Option;
        btEl.classList.add('button');
        btEl.classList.add('answer');
        containerElement.appendChild(btEl);
        btEl.addEventListener("click", function(){
            clearContainer();
            lastView();
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

    h3El.textContent = "Your final score is" ;
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
      timerElement.textContent = "Time : " + timerCount;
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
        lastView();
      }
    }, 1000);
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