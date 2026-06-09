// ---------------------
// VRAGEN
// ---------------------
const questions = [
    { mixture: "Zand + water", answer: "Filtreren", explanation: "Zand is niet opgelost en blijft achter." },
    { mixture: "Zout + water", answer: "Indampen", explanation: "Water verdampt, zout blijft over." },
    { mixture: "Alcohol + water", answer: "Destilleren", explanation: "Verschil in kookpunt." },
    { mixture: "IJzervijlsel + zand", answer: "Magnetische scheiding", explanation: "IJzer is magnetisch." },
    { mixture: "Olie + water", answer: "Bezinken", explanation: "Twee lagen door verschil in dichtheid." },
    { mixture: "Inkt", answer: "Chromatografie", explanation: "Kleurstoffen bewegen verschillend." }
];

// ---------------------
// METHODES
// ---------------------
const methods = [
    "Filtreren",
    "Indampen",
    "Destilleren",
    "Magnetische scheiding",
    "Bezinken",
    "Chromatografie"
];

// ---------------------
// VARIABELEN
// ---------------------
let currentQuestion = 0;
let score = 0;
let draggedMethod = "";
let gameLocked = false;

let record = Number(localStorage.getItem("record")) || 0;

// ---------------------
// ELEMENTEN
// ---------------------
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const recordEl = document.getElementById("record");
const dropZone = document.getElementById("dropZone");

// ---------------------
// RECORD TONEN
// ---------------------
recordEl.textContent = "Record: " + record;

// ---------------------
// SHUFFLE FUNCTIE
// ---------------------
function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ---------------------
// METHODES RENDEREN
// ---------------------
function renderMethods() {
    const container = document.getElementById("methodsContainer");
    container.innerHTML = "";

    const shuffled = shuffle(methods);

    shuffled.forEach(m => {
        const div = document.createElement("div");
        div.classList.add("method");
        div.textContent = m;
        div.dataset.method = m;
        div.draggable = true;

        div.addEventListener("dragstart", () => {
            if (gameLocked) return;
            draggedMethod = m;
        });

        container.appendChild(div);
    });
}

// ---------------------
// VRAAG LADEN
// ---------------------
function loadQuestion() {
    questionEl.textContent = questions[currentQuestion].mixture;
    feedbackEl.textContent = "";
    dropZone.textContent = "Sleep hierheen";
    dropZone.className = "drop-zone";
    gameLocked = false;
}

// ---------------------
// SPEL RESET
// ---------------------
function restartGame() {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = "Score: 0";
    renderMethods();
    loadQuestion();
}

// ---------------------
// START
// ---------------------
let shuffledQuestions = shuffle(questions);
renderMethods();
loadQuestion();

// ---------------------
// DROP
// ---------------------
dropZone.addEventListener("dragover", e => e.preventDefault());

dropZone.addEventListener("drop", () => {

    if (gameLocked) return;
    gameLocked = true;

    const correct = questions[currentQuestion].answer;

    if (draggedMethod === correct) {

        score += 10;
        scoreEl.textContent = "Score: " + score;

        if (score > record) {
            record = score;
            localStorage.setItem("record", record);
            recordEl.textContent = "Record: " + record;
        }

        dropZone.classList.add("correct");

        feedbackEl.innerHTML =
            "✅ Goed! " + questions[currentQuestion].explanation;

        setTimeout(() => {
            currentQuestion++;

            if (currentQuestion >= questions.length) {
                alert("🎉 Alles goed! Score: " + score);
                restartGame();
                return;
            }

            loadQuestion();
        }, 1200);

    } else {

        dropZone.classList.add("wrong");

        setTimeout(() => {
            alert(
                "❌ Fout!\n\nScore: " + score +
                "\nRecord: " + record +
                "\n\nJe begint opnieuw."
            );
            restartGame();
        }, 300);
    }
});
