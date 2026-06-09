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
    const methods = [
    "Filtreren",
    "Indampen",
    "Destilleren",
    "Magnetische scheiding",
    "Bezinken",
    "Chromatografie"
];
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
function renderMethods() {

    const container =
        document.getElementById(
            "methodsContainer"
        );

    container.innerHTML = "";

    const shuffledMethods =
        shuffleArray(methods);

    shuffledMethods.forEach(method => {

        const div =
            document.createElement("div");

        div.classList.add("method");

        div.draggable = true;

        div.dataset.method = method;

        div.textContent = method;

        div.addEventListener(
            "dragstart",
            () => {

                if (gameLocked) return;

                draggedMethod =
                    method;
            }
        );

        container.appendChild(div);

    });
}
function shuffleArray(array) {

    const shuffled = [...array];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}
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
renderMethods();
loadQuestion();
}

// ------------------------
// START
// ------------------------

shuffleQuestions();
renderMethods();
loadQuestion();

// ------------------------
// DRAG START
// ------------------------


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
