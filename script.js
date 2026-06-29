const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.result_box');
const questionText = document.querySelector('.que_text');
const optionList = document.querySelector('.option_list');
const nextBtn = document.querySelector('.next_btn');
const timerSec = document.querySelector('.timer_sec');
const totalQue = document.querySelector('.total_que');
const restartBtn = document.querySelector('.restart');
const exitBtn = document.querySelector('.exit');
const continueBtn = document.querySelector('.continue');
const scoreText = document.querySelector('.score_text');

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 15;

let questions = [
    {question: "What does HTML stand for?", options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"], answer: 1},
    {question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: 2},
    {question: "Which is a JavaScript framework?", options: ["Python", "Django", "React", "Laravel"], answer: 2},
    {question: "What does CSS stand for?", options: ["Common Style Sheet", "Colorful Style Sheet", "Cascading Style Sheet", "Computer Style Sheet"], answer: 2},
    {question: "Which HTML tag is used for linking CSS?", options: ["style", "script", "link", "css"], answer: 2},
    {question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "Apple"], answer: 0},
    {question: "What is JavaScript used for?", options: ["Styling", "Data Storage", "Web Interactivity", "Server-Side Processing"], answer: 2},
    {question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "--"], answer: 0},
    {question: "Which function prints output in JavaScript?", options: ["console.log()", "print()", "echo()", "document.write()"], answer: 0},
    {question: "Which keyword declares variables in JavaScript?", options: ["var", "let", "const", "All of the above"], answer: 3}
];

startBtn.onclick = () => {
    startBtn.parentElement.style.display = "none";
    infoBox.style.display = "block";
};

continueBtn.onclick = () => {
    infoBox.style.display = "none";
    quizBox.style.display = "block";
    startQuiz();
};

exitBtn.onclick = () => {
    infoBox.style.display = "none";
    startBtn.parentElement.style.display = "block";
};

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.style.display = "none";
    quizBox.style.display = "block";
    showQuestion();
    startTimer(timeLimit);
}

function showQuestion() {
    let q = questions[currentQuestion];
    questionText.innerHTML = `<span>${q.question}</span>`;
    optionList.innerHTML = "";

    q.options.forEach((opt, index) => {
        let div = document.createElement("div");
        div.classList.add("option");
        div.innerHTML = `<span>${opt}</span>`;
        div.onclick = () => selectOption(div, index);
        optionList.appendChild(div);
    });

    totalQue.innerHTML = `${currentQuestion + 1} of ${questions.length} Questions`;
    nextBtn.style.display = "none";
}

function selectOption(option, index) {
    let correctIndex = questions[currentQuestion].answer;
    let options = document.querySelectorAll(".option");

    options.forEach(opt => opt.onclick = null);

    if (index === correctIndex) {
        option.classList.add("correct");
        score++;
    } else {
        option.classList.add("incorrect");
    }

    clearInterval(timer);
    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        startTimer(timeLimit);
    } else {
        endQuiz();
    }
};

function startTimer(time) {
    clearInterval(timer);
    timerSec.textContent = time;
    timer = setInterval(() => {
        time--;
        timerSec.textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.innerHTML = `You scored ${score} out of ${questions.length}`;
}

restartBtn.onclick = () => {
    resultBox.style.display = "none";
    startBtn.parentElement.style.display = "block";
};
