const speechBubble = document.getElementById("speechBubble");
const teacherImg = document.getElementById("teacherImg");

const translations = {
    urdu: {
        hello: "ہیلو! آئیے مل کر سیکھیں!",
        study_english: "آئیے انگریزی پڑھیں!",
        study_urdu: "آئیے اردو پڑھیں!",
        study_maths: "آئیے ریاضی پڑھیں!",
        english_box: "انگریزی",
        urdu_box: "اردو",
        maths_box: "ریاضی",
        score_label: "اسکور:",
        great_job: "بہت خوب! کلاس روم صاف رکھیں!"
    },
    english: {
        hello: "Hello! Let's learn together!",
        study_english: "Let's study English!",
        study_urdu: "Let's study Urdu!",
        study_maths: "Let's study Maths!",
        english_box: "English",
        urdu_box: "Urdu",
        maths_box: "Maths",
        score_label: "Score:",
        great_job: "Great job! Keep the classroom clean!"
    }
};

let currentLanguage = 'urdu';

function toggleLanguage() {
    const isChecked = document.getElementById('langSwitch').checked;
    currentLanguage = isChecked ? 'english' : 'urdu';

    // Update texts
    document.getElementById('englishBox').innerText = translations[currentLanguage].english_box;
    document.getElementById('urduBox').innerText = translations[currentLanguage].urdu_box;
    document.getElementById('mathsBox').innerText = translations[currentLanguage].maths_box;
    document.getElementById('scoreLabel').innerText = translations[currentLanguage].score_label;

    document.getElementById('langUrdu').classList.toggle('active', !isChecked);
    document.getElementById('langEnglish').classList.toggle('active', isChecked);

    resetTeacher();
}

let currentSubject = null;

function changeTeacher(position, subject) {
    currentSubject = subject;
    if (position === "up") teacherImg.src = "./media/up.png";
    if (position === "middle") teacherImg.src = "./media/middle.png";
    if (position === "down") teacherImg.src = "./media/down.png";

    // Update and show speech bubble
    speechBubble.innerText = translations[currentLanguage]['study_' + subject];
    speechBubble.classList.add("active");
}

function resetTeacher() {
    currentSubject = null;
    teacherImg.src = "./media/middle.png";
    speechBubble.classList.remove("active");
    speechBubble.innerText = translations[currentLanguage].hello;
}

// --- Drag and Drop Paper Balls Logic ---
let score = 0;
const scoreValue = document.getElementById('scoreValue');
const dustbin = document.getElementById('dustbin');
const paperBalls = document.querySelectorAll('.paper-ball');

let draggedBall = null;
let offsetX = 0;
let offsetY = 0;

paperBalls.forEach(ball => {
    // For Desktop
    ball.addEventListener('mousedown', (e) => {
        draggedBall = ball;
        const rect = ball.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        ball.style.cursor = 'grabbing';
        ball.style.zIndex = 1000;
        ball.style.transition = 'none'; // smooth dragging
    });

    // For Touch Devices
    ball.addEventListener('touchstart', (e) => {
        draggedBall = ball;
        const touch = e.touches[0];
        const rect = ball.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        ball.style.zIndex = 1000;
        ball.style.transition = 'none';
        e.preventDefault();
    }, { passive: false });
});

function moveBall(clientX, clientY) {
    if (draggedBall) {
        draggedBall.style.left = (clientX - offsetX) + 'px';
        draggedBall.style.top = (clientY - offsetY) + 'px';
        draggedBall.style.bottom = 'auto'; // override bottom CSS
    }
}

// Mouse movement
document.addEventListener('mousemove', (e) => {
    moveBall(e.clientX, e.clientY);
});

// Touch movement
document.addEventListener('touchmove', (e) => {
    if (draggedBall) {
        moveBall(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
    }
}, { passive: false });

function releaseBall() {
    if (draggedBall) {
        draggedBall.style.cursor = 'grab';
        draggedBall.style.zIndex = 20;
        draggedBall.style.transition = 'transform 0.2s, box-shadow 0.2s';

        // Check if dropped near the dustbin
        const ballRect = draggedBall.getBoundingClientRect();
        const binRect = dustbin.getBoundingClientRect();

        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;

        const inRangeX = ballCenterX >= binRect.left - 20 && ballCenterX <= binRect.right + 20;
        const inRangeY = ballCenterY >= binRect.top - 40 && ballCenterY <= binRect.bottom + 40;

        if (inRangeX && inRangeY) {
            // Success
            let thrownBall = draggedBall;
            thrownBall.style.transform = 'scale(0)';
            setTimeout(() => {
                thrownBall.style.display = 'none';
            }, 200);

            score += 10;
            scoreValue.innerText = score;

            // Dustbin animation
            dustbin.classList.add('eat');
            setTimeout(() => {
                dustbin.classList.remove('eat');
            }, 500);

            // Teacher encourages
            speechBubble.innerText = translations[currentLanguage].great_job;
            speechBubble.classList.add("active");
            setTimeout(() => {
                resetTeacher();
            }, 3000);
        }

        draggedBall = null;
    }
}

// Mouse release
document.addEventListener('mouseup', releaseBall);

// Touch release
document.addEventListener('touchend', releaseBall);
