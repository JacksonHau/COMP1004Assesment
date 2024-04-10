const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');
const grass = document.querySelector('.grass');
const garden = document.querySelector('.garden');
const highScoreList = document.querySelector('.highScoreList');
const fileInput = document.getElementById('fileInput');

ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

const backgroundMusic = new Audio("background_music.mp3");
backgroundMusic.loop = true;
backgroundMusic.play();

const crashSound = document.getElementById("crashSound");

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};
let player = {
    speed: 1,
    score: 0,
    highScore: 0
};

let highScores = [];

function keydown(e) {
    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        keys.ArrowUp = true;
    } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        keys.ArrowDown = true;
    } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        keys.ArrowLeft = true;
    } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        keys.ArrowRight = true;
    }
}

function keyup(e) {
    if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        keys.ArrowUp = false;
    } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        keys.ArrowDown = false;
    } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        keys.ArrowLeft = false;
    } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        keys.ArrowRight = false;
    }
}

function stopBackgroundMusic() {
    backgroundMusic.pause();
}

function restartBackgroundMusic() {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

function updateHighScores() {
    const scoresList = document.createElement('ul');
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = score;
        scoresList.appendChild(li);
    });
    highScoreList.innerHTML = '';
    const top5Label = document.createElement('h2');
    top5Label.textContent = 'Highscores:';
    highScoreList.appendChild(top5Label);
    highScoreList.appendChild(scoresList);
}

function Start() {
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    var title = document.getElementById('titleGame');
    title.style.display = 'none';
    player.isStart = true;
    player.score = 0;
    restartBackgroundMusic();

    window.requestAnimationFrame(Play);

    for (let i = 0; i < 5; i++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'roadLines');
        roadLines.y = (i * 140);
        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }

    for (let i = 0; i < 3; i++) {
        let enemyCar1 = document.createElement('div');
        enemyCar1.setAttribute('class', 'EnemyCar1');
        enemyCar1.y = ((i) * -300);
        enemyCar1.style.top = enemyCar1.y + "px";
        gameArea.appendChild(enemyCar1);
        enemyCar1.style.left = Math.floor(Math.random() * 350) + "px";
    }

    for (let i = 0; i < 2; i++) {
        let enemyCar2 = document.createElement('div');
        enemyCar2.setAttribute('class', 'EnemyCar2');
        enemyCar2.y = ((i) * -500);
        enemyCar2.style.top = enemyCar2.y + "px";
        gameArea.appendChild(enemyCar2);
        enemyCar2.style.left = Math.floor(Math.random() * 350) + "px";
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

function Play() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.isStart) {
        moveLines();
        moveEnemyCars(car);
        if ((keys.ArrowUp || keys.ArrowDown || keys.ArrowRight || keys.ArrowLeft) && player.y > (road.top + 70)) { }
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.height - 75)) { player.y += player.speed; }
        if (keys.ArrowRight && player.x < 350) { player.x += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        highScore.innerHTML = "High Score" + ":" + (player.highScore - 1);
        player.score++;
        player.speed += 0.01;
        if (player.highScore < player.score) {
            player.highScore++;
            highScore.innerHTML = "High Score" + ":" + (player.highScore - 1);
            highScore.style.top = "80px";
        }
        score.innerHTML = "Score" + ":" + (player.score - 1);
        window.requestAnimationFrame(Play);
    }
}

function moveLines() {
    let roadLines = document.querySelectorAll('.roadLines');
    roadLines.forEach(function (item) {
        if (item.y >= 700)
            item.y -= 700;
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveEnemyCars(car) {
    let enemyCars1 = document.querySelectorAll('.EnemyCar1');
    enemyCars1.forEach(function (enemyCar1) {
        if (isCollide(car, enemyCar1)) {
            endGame();
        }
        if (enemyCar1.y >= 750) {
            enemyCar1.y -= 900;
            enemyCar1.style.left = Math.floor(Math.random() * 350) + "px";
        }
        enemyCar1.y += player.speed;
        enemyCar1.style.top = enemyCar1.y + "px";
    });

    let enemyCars2 = document.querySelectorAll('.EnemyCar2');
    enemyCars2.forEach(function (enemyCar2) {
        if (isCollide(car, enemyCar2)) {
            endGame();
        }
        if (enemyCar2.y >= 750) {
            enemyCar2.y -= 900;
            enemyCar2.style.left = Math.floor(Math.random() * 350) + "px";
        }
        enemyCar2.y += player.speed;
        enemyCar2.style.top = enemyCar2.y + "px";
    });
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    if (!((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))) {
        crashSound.play();
        backgroundMusic.pause();
        return true;
    }

    return false;
}

function endGame() {
    player.isStart = false;
    player.speed = 5;
    startScreen.classList.remove('hide');
    ClickToStart.innerText = "Restart";

    highScores.push(player.score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);

    updateHighScores();
}

document.getElementById('loadButton').addEventListener('click', function () {
    fileInput.click();
});

document.getElementById('saveButton').addEventListener('click', function () {
    const jsonData = JSON.stringify(highScores);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'highScores.json';
    link.click();
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        highScores = JSON.parse(content);
        updateHighScores();
    };
    reader.readAsText(file);
}

fileInput.addEventListener('change', handleFileSelect);
updateHighScores();