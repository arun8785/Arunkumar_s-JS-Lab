function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

Quiz.prototype.getQuestionByIndex = function () {
  /*
    var question1 = this.questions[this.questionIndex;
  */
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (ans) {
  if (this.getQuestionByIndex().isCorrectAnswer(ans)) {
    this.score++;
  }
  this.questionIndex++;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (ans) {
  return this.answer === ans;
};

var questions = [
  new Question(
    "1.JavaScript support ?",
    ["Events", "Inheritence", "File Handling", "Polymorphism"],
    "Events"
  ),
  new Question(
    "2.Which Language is used for Styling ?",
    ["Jquery", "HTML", "XML", "CSS"],
    "CSS"
  ),
  new Question(
    "3.Which is not a JS frame work ?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "4.Which is used to connect to DB ?",
    ["PHP", "HTML", "JS", "ALL"],
    "PHP"
  ),
  new Question(
    "5.JavaScript is a ?",
    ["Language", "Scripting Language", "DBMS", "ALL"],
    "Scripting Language"
  ),
];

var quiz = new Quiz(questions);

function loadQuestions() {
  //alert("In loadQues");
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Displaying questions
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    var choices = quiz.getQuestionByIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question" + currentQuestionNumber + "of" + quiz.questions.length;
}

function showScores() {
  var quizOver = "<h1>Results</h1>";
  quizOver +=
    "<h2 id='score'>Your Scores " +
    quiz.score +
    " and Percentage is " +
    (quiz.score / questions.length) * 100 +
    "%</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = quizOver;
}

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

loadQuestions();
