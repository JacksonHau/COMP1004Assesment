const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');
const grass = document.querySelector('.grass');
const garden = document.querySelector('.garden');
const highScoreList = document.querySelector('.highScoreList'); 

ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

const backgroundMusic = new Audio("background_music.mp3");
backgroundMusic.loop = true;
backgroundMusic.play();

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}
let player = {
    speed: 1,
    score: 0,
    highScore: 0
};

let highScores = []; 
function keydown(e) {
    if (e.key === 'w') {
        keys.ArrowUp = true;
    } else if (e.key === 's') {
        keys.ArrowDown = true;
    } else if (e.key === 'a') {
        keys.ArrowLeft = true;
    } else if (e.key === 'd') {
        keys.ArrowRight = true;
    }
}

function keyup(e) {
    if (e.key === 'w') {
        keys.ArrowUp = false;
    }
    else if (e.key === 's') {
        keys.ArrowDown = false;
    }
    else if (e.key === 'a') {
        keys.ArrowLeft = false;
    }
    else if (e.key === 'd') {
        keys.ArrowRight = false;
    }
}

// Stop background music when there is a crash
function stopBackgroundMusic() {
    backgroundMusic.pause();
}

// Restart background music when game is restarted
function restartBackgroundMusic() {
    backgroundMusic.currentTime = 0; 
    backgroundMusic.play();
}

// Update and display high scores
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

// starting the game
function Start() {
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    var title = document.getElementById('titleGame');
    title.style.display = 'none';
    player.isStart = true;
    player.score = 0;
    restartBackgroundMusic(); 

    window.requestAnimationFrame(Play);

    // creating the road lines
    for (i = 0; i < 5; i++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'roadLines');
        roadLines.y = (i * 140);
        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }

    // enemy car
    for (i = 0; i < 3; i++) {
        let EnemyCar1 = document.createElement('div');
        EnemyCar1.setAttribute('class', 'EnemyCar1');
        EnemyCar1.y = ((i) * -300);
        EnemyCar1.style.top = EnemyCar1.y + "px";
        gameArea.appendChild(EnemyCar1);
        EnemyCar1.style.left = Math.floor(Math.random() * 350) + "px";
    }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

//play the game
function Play() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.isStart) {
        moveLines();
        moveEnemyCar1(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.height - 75)) { player.y += player.speed }
        if (keys.ArrowRight && player.x < 350) { player.x += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
        player.score++;
        player.speed += 0.01;
        if (player.highScore < player.score) {
            player.highScore++;
            highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
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

function moveEnemyCar1(car) {
    let EnemyCar1 = document.querySelectorAll('.EnemyCar1');
    EnemyCar1.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y -= 900;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

//check whether the cars collide or not
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    if (!((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))) {
        var crashSound = document.getElementById("crashSound");
        crashSound.play();
        backgroundMusic.pause(); // Pause background music
        return true;
    }

    return false;
}

// end game
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

updateHighScores();