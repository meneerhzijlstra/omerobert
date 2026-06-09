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
let gameLocked = false;

const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const dropZone = document.getElementById("dropZone");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {

    questionElement.textContent =
        questions[currentQuestion].mixture;

    feedbackElement.textContent = "";

    dropZone.textContent = "Sleep hierheen";

    dropZone.classList.remove("correct");
    dropZone.classList.remove("wrong");

    gameLocked = false;
}

loadQuestion();

document.querySelectorAll(".method").forEach(method => {

    method.addEventListener("dragstart", () => {

        if (gameLocked) return;

        draggedMethod = method.dataset.method;
    });

});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
});

dropZone.addEventListener("drop", () => {

    if (gameLocked) return;

    gameLocked = true;

    const correctAnswer =
        questions[currentQuestion].answer;

    if (draggedMethod === correctAnswer) {

        score += 10;

        scoreElement.textContent =
            "Score: " + score;

        dropZone.classList.add("correct");

        feedbackElement.innerHTML =
            "✅ Goed! " +
            questions[currentQuestion].explanation;

        setTimeout(() => {

            currentQuestion++;

            if (currentQuestion >= questions.length) {

                alert(
                    "🎉 Geweldig!\n\n" +
                    "Je hebt alle vragen goed beantwoord!\n\n" +
                    "Eindscore: " + score + " punten."
                );

                currentQuestion = 0;
                score = 0;

                scoreElement.textContent =
                    "Score: 0";
            }

            loadQuestion();

        }, 1500);

    } else {

        dropZone.classList.add("wrong");

        setTimeout(() => {

            alert(
                "❌ Helaas!\n\n" +
                "Je antwoord was fout.\n\n" +
                "Behaalde score: " +
                score +
                " punten.\n\n" +
                "Je begint opnieuw."
            );

            currentQuestion = 0;
            score = 0;

            scoreElement.textContent =
                "Score: 0";

            loadQuestion();

        }, 500);
    }
});

if (nextBtn) {
    nextBtn.style.display = "none";
}
