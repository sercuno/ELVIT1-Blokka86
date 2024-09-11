const quizData = [
    {
        image: "../media/bilder/Hoved_Etasje.jpg",
        question: "Hva er denne etasjen i denne bygningen?",
        correctAnswer: "Hoved Etasje",
        options: ["Hoved Etasje", "Tredje Etasje", "Fjerde Etasje"],
        feedback: "Riktig! Dette er hovedetasjen."
    },
    {
        image: "../media/bilder/O377.jpg",
        question: "Hvilket klasserom er dette?",
        correctAnswer: "Ø377",
        options: ["Ø377", "V412", "S101"],
        feedback: "Bra jobbet! Dette er Ø377"
    },
    {
        image: "../media/bilder/camilla_h.jpg",
        question: "Hvem er rektor ved denne skolen?",
        correctAnswer: "Camilla Hauren Leirvik",
        options: ["Espen Rueness", "Camilla Hauren Leirvik", "Kristin Olstad"],
        feedback: "Utmerket! Camilla Hauren Leirvik er rektor ved skolen."
    }
];

let currentQuestion = 0;
let score = parseInt(localStorage.getItem('score')) || 0;  

function updateQuiz() {
    const currentQuiz = quizData[currentQuestion];
    const quizContainer = document.getElementById("quiz-container");

    // Update quiz content
    document.getElementById("quiz-image").src = currentQuiz.image;
    document.getElementById("quiz-question").innerText = currentQuiz.question;
    document.getElementById("quiz-options").innerHTML = currentQuiz.options.map(option => `
        <button onclick="checkAnswer('${option}')">${option}</button>
    `).join('');
}

function checkAnswer(answer) {
    const currentQuiz = quizData[currentQuestion];

    if (answer === currentQuiz.correctAnswer) {
        var correctAudio = new Audio('../lyd/Correct_Answer_sound_effect.mp3');
        correctAudio.play();
        document.getElementById("quiz-question").innerText = currentQuiz.feedback;
        score++;  
        localStorage.setItem('score', score); 
        document.getElementById("score").innerText = `Poeng: ${score}`;  
        document.getElementById("quiz-options").innerHTML = `
            <button onclick="nextQuestion()">Neste Spørsmål</button>
        `;
    } else {
        var wrong_audio = new Audio('../lyd/Wrong_Sound_Effect.mp3');
        wrong_audio.play();
        score = score - 1;
        alert("Feil svar. Prøv igjen!");
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        updateQuiz();
    } else {
        document.getElementById("quiz-container").innerHTML = `
            <h2>Gratulerer! Du fullførte quizzen.</h2>
            <p>Din sluttpoengsum er: ${score}</p>
        `;
        localStorage.removeItem('score');  
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("score").innerText = `Poeng: ${score}`;
    updateQuiz();
});
