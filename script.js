// ------------------------
// VRAGEN
// ------------------------

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

// ------------------------
// VARIABELEN
// ------------------------

let currentQuestion = 0;
let score = 0;
let draggedMethod = "";
let gameLocked = false;

// Persoonlijk record ophalen
let record = localStorage.getItem("record");

if (record === null) {
    record = 0;
} else {
    record = Number(record);
}

// ------------------------
// HTML ELEMENTEN
// ------------------------

const questionElement =
    document.getElementById("question");

const feedbackElement =
    document.getElementById("feedback");

const scoreElement =
    document.getElementById("score");

const recordElement =
    document.getElementById("record");

const dropZone =
    document.getElementById("dropZone");

// ------------------------
// RECORD TONEN
// ------------------------

recordElement.textContent =
    "Record: " + record;

// ------------------------
// VRAGEN SCHUDDEN
// ------------------------

function shuffleQuestions() {

    for (
        let i = questions.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
            [questions[j], questions[i]];
    }
}

shuffleQuestions();

// ------------------------
// VRAAG LADEN
// ------------------------

function loadQuestion() {

    questionElement.textContent =
        questions[currentQuestion].mixture;

    feedbackElement.textContent = "";

    dropZone.textContent =
        "Sleep hierheen";

    dropZone.classList.remove("correct");
    dropZone.classList.remove("wrong");

    gameLocked = false;
}

// ------------------------
// SPEL HERSTARTEN
// ------------------------

function restartGame() {

    currentQuestion = 0;
    score = 0;

    scoreElement.textContent =
        "Score: 0";

    shuffleQuestions();

    loadQuestion();
}

// ------------------------
// START
// ------------------------

loadQuestion();

// ------------------------
// DRAG START
// ------------------------

document
.querySelectorAll(".method")
.forEach(method => {

    method.addEventListener(
        "dragstart",
        () => {

            if (gameLocked) return;

            draggedMethod =
                method.dataset.method;
        }
    );

});

// ------------------------
// DROP ZONE
// ------------------------

dropZone.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
    }
);

dropZone.addEventListener(
    "drop",
    () => {

        if (gameLocked) return;

        gameLocked = true;

        const correctAnswer =
            questions[currentQuestion].answer;

        // ------------------------
        // GOED ANTWOORD
        // ------------------------

        if (
            draggedMethod ===
            correctAnswer
        ) {

            score += 10;

            scoreElement.textContent =
                "Score: " + score;

            // Nieuw record?

            if (score > record) {

                record = score;

                localStorage.setItem(
                    "record",
                    record
                );

                recordElement.textContent =
                    "Record: " + record;
            }

            dropZone.classList.add(
                "correct"
            );

            feedbackElement.innerHTML =
                "✅ Goed! " +
                questions[currentQuestion]
                .explanation;

            setTimeout(() => {

                currentQuestion++;

                // ------------------------
                // ALLE VRAGEN GOED
                // ------------------------

                if (
                    currentQuestion >=
                    questions.length
                ) {

                    alert(
                        "🎉 Geweldig!\n\n" +
                        "Je hebt alle vragen goed beantwoord!\n\n" +
                        "Eindscore: " +
                        score +
                        " punten.\n\n" +
                        "Record: " +
                        record +
                        " punten."
                    );

                    restartGame();
                    return;
                }

                loadQuestion();

            }, 1500);

        }

        // ------------------------
        // FOUT ANTWOORD
        // ------------------------

        else {

            dropZone.classList.add(
                "wrong"
            );

            setTimeout(() => {

                alert(
                    "❌ Helaas!\n\n" +
                    "Je antwoord was fout.\n\n" +
                    "Behaalde score: " +
                    score +
                    " punten.\n\n" +
                    "Persoonlijk record: " +
                    record +
                    " punten.\n\n" +
                    "Je begint opnieuw."
                );

                restartGame();

            }, 500);

        }

    }
);
