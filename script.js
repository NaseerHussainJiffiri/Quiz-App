let quizAnswers = [
    {
        answer: "Ada Lovelace"
    },
    {
        answer: "FORTRAN"
    },
    {
        answer: "Formula Translation"
    },
    {
        answer: "COBOL"
    },
    {
        answer: "Grace Hopper"
    },
    {
        answer: "Lisp"
    },
    {
        answer: "Beginners All-purpose Symbolic Instruction Code"
    },
    {
        answer: "C"
    },
    {
        answer: "Java"
    },
    {
        answer: "IBM"
    }
];

let quizAnsOptions = [
    {
        question: "Who is credited with writing the first-ever computer algorithm in 1843?",
        answerOptionA: "Grace Hopper",
        answerOptionB: "Ada Lovelace",
        answerOptionC: "Charles Babbage"
    },
    {
        question: "Which 1957 language is considered the first high-level language with a compiler?",
        answerOptionA: "COBOL",
        answerOptionB: "Lisp",
        answerOptionC: "FORTRAN"
    },
    {
        question: "What does the acronym 'FORTRAN' stand for?",
        answerOptionA: "Foreign Translation",
        answerOptionB: "Formula Translation",
        answerOptionC: "Formal Transaction"
    },
    {
        question: "Which language, developed in 1959, is still used for global banking systems?",
        answerOptionA: "COBOL",
        answerOptionB: "ALGOL",
        answerOptionC: "Assembly"
    },
    {
        question: "Which pioneer is famously associated with the development of COBOL?",
        answerOptionA: "John Backus",
        answerOptionB: "Dennis Ritchie",
        answerOptionC: "Grace Hopper"
    },
    {
        question: "Which 1958 language is the second-oldest high-level language still in use?",
        answerOptionA: "C",
        answerOptionB: "Lisp",
        answerOptionC: "BASIC"
    },
    {
        question: "What does the acronym 'BASIC' stand for?",
        answerOptionA: "Beginners All-purpose Symbolic Instruction Code",
        answerOptionB: "Binary Advanced System Instruction Code",
        answerOptionC: "Business Application Standard Integrated Code"
    },
    {
        question: "Which language created in 1972 is known as the 'mother of all languages'?",
        answerOptionA: "Java",
        answerOptionB: "C",
        answerOptionC: "Python"
    },
    {
        question: "Which language was the first to promote 'Write Once, Run Anywhere'?",
        answerOptionA: "Java",
        answerOptionB: "C++",
        answerOptionC: "Fortran"
    },
    {
        question: "Which company originally developed SQL in the 1970s?",
        answerOptionA: "Microsoft",
        answerOptionB: "IBM",
        answerOptionC: "Oracle"
    }
];

let $quizInfo = document.querySelector('.quizInfo');
let $welcomeScreen = document.querySelector('.welcome-screen');
let $quizSection = document.querySelector('.quiz-section')
let $startBtn = document.querySelector('.btn-start');
let $quizQus = document.querySelector('.question');
let $quizAnsA = document.querySelector('.answer-option-a');
let $quizAnsB = document.querySelector('.answer-option-b');
let $quizAnsC = document.querySelector('.answer-option-c');
let $nexBtn = document.querySelector('.btn-next-answer');
let $backBtn = document.querySelector('.btn-back-answer');

let totalQuiz = quizAnswers.length;

function loadQuiz(){
    let index = localStorage.getItem('quizNum');
    
    $quizQus.innerHTML=quizAnsOptions[index].question;
    $quizAnsA.innerText =quizAnsOptions[index].answerOptionA;
    $quizAnsB.innerText =quizAnsOptions[index].answerOptionB;
    $quizAnsC.innerText =quizAnsOptions[index].answerOptionC;
    
}

//locad quiz data if local storage have quiz data
if(localStorage.getItem('quizData')){
    $welcomeScreen.classList.add('hidden');
    $quizSection.classList.remove('hidden');
    loadQuiz();
}

$startBtn.addEventListener('click',(e)=>{
    localStorage.setItem('quizData', JSON.stringify(quizAnsOptions));
    $welcomeScreen.classList.add('hidden');
    $quizSection.classList.remove('hidden');
    localStorage.setItem('quizNum','0');
    loadQuiz();

})

$nexBtn .addEventListener('click',()=>{
    let index = localStorage.getItem('quizNum');

    if(totalQuiz>Number(localStorage.getItem('quizNum'))+1){
        index = Number(localStorage.getItem('quizNum'))+1;
    }
    localStorage.setItem('quizNum', index);
    console.log(index, localStorage.getItem('quizNum'));
    loadQuiz();
});

$backBtn .addEventListener('click',()=>{
    let index = localStorage.getItem('quizNum');
    if(Number(localStorage.getItem('quizNum'))-1>=0){
        index = Number(localStorage.getItem('quizNum'))-1;
    }
    localStorage.setItem('quizNum', index);
    console.log(index, localStorage.getItem('quizNum'));
    loadQuiz();
});