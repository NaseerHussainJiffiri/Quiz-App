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
let $quizSection = document.querySelector('.quiz-section');
let $finishWindow = document.querySelector('.finish-window');
let $startBtn = document.querySelector('.btn-start');
let $quizQus = document.querySelector('.question');
let $quizAnsA = document.querySelector('.answer-option-a');
let $quizAnsB = document.querySelector('.answer-option-b');
let $quizAnsC = document.querySelector('.answer-option-c');
let $nexBtn = document.querySelector('.btn-next-answer');
let $backBtn = document.querySelector('.btn-back-answer');
let $startAgainBtn = document.querySelector('.btn-start-again');
let $answerOptions = document.querySelectorAll('.answer');

let totalQuiz = quizAnswers.length;

function loadQuiz(){
    let index = Number(localStorage.getItem('quizNum'));
    
    $quizQus.innerHTML=quizAnsOptions[index].question;
    $quizAnsA.innerText =quizAnsOptions[index].answerOptionA;
    $quizAnsB.innerText =quizAnsOptions[index].answerOptionB;
    $quizAnsC.innerText =quizAnsOptions[index].answerOptionC;

    $quizInfo.innerHTML = ` ${index+1} / ${totalQuiz} `;

    if(index+1 === totalQuiz){
        $nexBtn.innerText = "Finish";
    }else{
        $nexBtn.innerText = "Next >";
    }

    let userOption = JSON.parse(localStorage.getItem('userAnswer'))[index];
    if(userOption){
        let checkRadio = document.getElementById(userOption);
        checkRadio.checked = true;
    }
}

function checkQuizFinish(){
    let userAnswer = JSON.parse(localStorage.getItem('userAnswer'));
    let numUserAnsCount = userAnswer.filter(item => item !== null).length;

    if(totalQuiz === numUserAnsCount){
        return true;
    }else{
        return false;
    }

}

function saveUserOption(){
    $answerOptions.forEach((option)=>{
        if(option.checked){
            let userAnswer = JSON.parse(localStorage.getItem('userAnswer'));
            userAnswer[Number(localStorage.getItem('quizNum'))] = option.id;
            localStorage.setItem("userAnswer",JSON.stringify(userAnswer));
        }
    });
}



function showStartWindow(){
    $welcomeScreen.classList.remove('hidden');
    $quizSection.classList.add('hidden');
    $finishWindow.classList.add('hidden');
}

function showQuizWindow(){
    $welcomeScreen.classList.add('hidden');
    $quizSection.classList.remove('hidden');
    $finishWindow.classList.add('hidden');
}

function showFinishWindow(){
    $welcomeScreen.classList.add('hidden');
    $quizSection.classList.add('hidden');
    $finishWindow.classList.remove('hidden');
}

function startQuiz(){
    showQuizWindow();
    localStorage.setItem('quizNum','0');
    localStorage.setItem('quizStatus','start');
    let userAnswer = [];
    localStorage.setItem('userAnswer',JSON.stringify(userAnswer));
    loadQuiz();
}

//locad quiz data if local storage have quiz data
if(localStorage.getItem('quizStatus') === 'start'){
    showQuizWindow();
    loadQuiz();
}else if(localStorage.getItem('quizStatus') === 'finish'){
    showFinishWindow();
}

$startBtn.addEventListener('click',(e)=>{
    startQuiz();
});

$startAgainBtn.addEventListener('click',(e)=>{
    startQuiz();
});

$nexBtn.addEventListener('click',()=>{

    saveUserOption();

    if($nexBtn.innerText == "Next >"){
        let index = Number(localStorage.getItem('quizNum'));
    
        if(totalQuiz>index+1){
            index = index+1;
            localStorage.setItem('quizNum', index);
            loadQuiz();
        }
    }else if($nexBtn.innerText == "Finish"){
        if(checkQuizFinish()){
            if(confirm("Are you sure?")){
                showFinishWindow();
                localStorage.clear('quizData');
                localStorage.setItem("quizStatus","finish");
            }
        }else{
            alert("please finish all questions");
        }
    }
});

$backBtn .addEventListener('click',()=>{
    let index = localStorage.getItem('quizNum');
    if(Number(localStorage.getItem('quizNum'))-1>=0){
        index = Number(localStorage.getItem('quizNum'))-1;
    }
    localStorage.setItem('quizNum', index);
    loadQuiz();
});