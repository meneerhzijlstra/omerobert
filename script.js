const questions = [
    {
        mixture: "Zand + water",
        answer: "Filtreren",
        explanation: "Zanddeeltjes zijn groter dan de gaatjes van het filter."
    },
    {
        mixture: "Zout + water",
        answer: "Indampen",
        explanation: "Water verdampt en het zout blijft achter."
    },
    {
        mixture: "Alcohol + water",
        answer: "Destilleren",
        explanation: "Alcohol heeft een lager kookpunt dan water."
    },
    {
        mixture: "IJzervijlsel + zand",
        answer: "Magnetische scheiding",
        explanation: "IJzer wordt aangetrokken door een magneet."
    },
    {
        mixture: "Olie + water",
        answer: "Bezinken",
        explanation: "De vloeistoffen vormen twee lagen."
    },
    {
        mixture: "Inkt",
        answer: "Chromatografie",
        explanation: "De kleurstoffen bewegen verschillend over het papier."
    }
];

let currentQuestion = 0;
let score = 0;
let draggedMethod = "";

const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const dropZone = document.getElementById("dropZone");

function loadQuestion() {

    questionElement.textContent =
        questions[currentQuestion].mixture;

    feedbackElement.textContent = "";

    dropZone.textContent = "Sleep hierheen";
    dropZone.classList.remove("correct");
    dropZone.classList.remove("wrong");
}

loadQuestion();

document.querySelectorAll(".method").forEach(method => {

    method.addEventListener("dragstart", () => {
        draggedMethod = method.dataset.method;
    });

});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
});

dropZone.addEventListener("drop", () => {

    const correctAnswer =
        questions[currentQuestion].answer;

    if (draggedMethod === correctAnswer) {

        score += 10;

        dropZone.classList.add("correct");

        feedbackElement.innerHTML =
            "✅ Goed! " +
            questions[currentQuestion].explanation;

    } else {

        dropZone.classList.add("wrong");

        feedbackElement.innerHTML =
            "❌ Fout. Het juiste antwoord is: <strong>" +
            correctAnswer +
            "</strong>";
    }

    scoreElement.textContent = "Score: " + score;

});

document
.getElementById("nextBtn")
.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        alert(
            "Klaar! Eindscore: " +
            score +
            " punten."
        );

        currentQuestion = 0;
        score = 0;

        scoreElement.textContent = "Score: 0";
    }

    loadQuestion();

});
