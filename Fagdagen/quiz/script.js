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

document.addEventListener('DOMContentLoaded', () => {
    updateScore();
    updateQuiz();
});

const getElement = id => document.getElementById(id);

const updateQuiz = () => {
    const { image, question, options } = quizData[currentQuestion];
    getElement("quiz-image").src = image;
    getElement("quiz-question").innerText = question;
    getElement("quiz-options").innerHTML = options.map(option => `
        <button onclick="checkAnswer('${option}')" class="option-btn">${option}</button>
    `).join('');
    resetButtonState();
};

const checkAnswer = answer => {
    const { correctAnswer, feedback } = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => btn.disabled = true);

    if (answer === correctAnswer) {
        playAudio('../lyd/Correct_Answer_sound_effect.mp3');
        getElement("quiz-question").innerText = feedback;
        highlightCorrectAnswer(answer);
        score++;
        updateScore();
        showButton('next');
    } else {
        playAudio('../lyd/Wrong_Sound_Effect.mp3');
        highlightWrongAnswer(answer);
        score--;
        updateScore();
        showButton('retry');
    }
};

const playAudio = src => {
    if (!src) return;
    const audio = new Audio(src);
    audio.play().catch(error => console.error('Audio playback failed:', error));
};

const highlightCorrectAnswer = correctAnswer => {
    document.querySelectorAll(".option-btn").forEach(btn => {
        if (btn.innerText === correctAnswer) btn.classList.add('correct');
    });
};

const highlightWrongAnswer = wrongAnswer => {
    document.querySelectorAll(".option-btn").forEach(btn => {
        if (btn.innerText === wrongAnswer) btn.classList.add('wrong');
    });
};

const showButton = type => {
    const buttonHtml = type === 'next'
        ? `<button onclick="nextQuestion()">Neste Spørsmål</button>`
        : `<button onclick="retryQuestion()">Prøv igjen</button>`;
    getElement("quiz-options").innerHTML += buttonHtml;
};

const resetButtonState = () => {
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
};

const retryQuestion = () => updateQuiz();

const nextQuestion = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        updateQuiz();
    } else {
        finishQuiz();
    }
};

const updateScore = () => {
    localStorage.setItem('score', score);
    getElement("score").innerText = `Poeng: ${score}`;
};

const finishQuiz = () => {
    getElement("quiz-container").innerHTML = `
        <h2>Gratulerer! Du fullførte quizzen.</h2>
        <p>Din sluttpoengsum er: ${score}</p>
        <button onclick="restartQuiz()">Start på nytt</button>
    `;
    localStorage.removeItem('score');
};

const restartQuiz = () => {
    location.reload();
};
