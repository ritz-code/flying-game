let plane = document.querySelector('.plane');
let display = document.querySelector('.container');
let gameFinished = document.querySelector('.game-over');
let score = document.querySelector('.score');

document.addEventListener('keyup', control);

//Plane attributes
let planeLeft = 200;
let planeBottom = 400;
let gravity = 1;
let gameScore = 0;
let gameOverIndicator = false;

//Start the game
function startGame() {
    gameFinished.style.display = 'none';
    planeBottom -= gravity;
    plane.style.left = planeLeft + 'px';
    plane.style.bottom = planeBottom + 'px';

    //if plane falls to the bottom, game over
    if (planeBottom < -40) {
        gameOver();
    }
}

//Introducing clouds which move and stops game if cloud hits the planes
function makeClouds() {
    let cloudLeft = 800;
    let randomHeight = Math.random() * 700;
    let cloudBottom = randomHeight;

    let clouds = document.createElement('div');

    clouds.style.left = cloudLeft + 'px';
    clouds.style.bottom = cloudBottom + 'px';
    clouds.classList.add('cloud');

    if (!gameOverIndicator) {
        display.appendChild(clouds);
    }

    //moves the generated cloud to the left 
    function moveClouds() {
        cloudLeft -= 5;
        clouds.style.left = cloudLeft + 'px';

        if (cloudLeft < 0 && !gameOverIndicator) {
            display.removeChild(clouds);
        }

        //check for hit with plane, if hit occurs game over!
        if (cloudLeft > 175 && cloudLeft <= 275 && (planeBottom > cloudBottom && planeBottom < cloudBottom + 70 || planeBottom === 0)) {
            clearInterval(cloudMoveTimer);
            gameOver();
        }
    }
    let cloudMoveTimer = setInterval(moveClouds, 20);
}
setInterval(makeClouds, 2000);

//Introducing red gem rewards which add points
function makeRewards() {
    let rewardLeft = 800;
    let randomHeight = Math.random() * 900;
    let rewardBottom = randomHeight;

    let rewards = document.createElement('div');

    rewards.style.left = rewardLeft + 'px';
    rewards.style.bottom = rewardBottom + 'px';
    rewards.classList.add('reward');

    if (!gameOverIndicator) {
        display.appendChild(rewards);
    }

    //move the gems to the left
    function moveRewards() {
        rewardLeft -= 60;
        rewards.style.left = rewardLeft + 'px';

        if (rewardLeft < -20 && !gameOverIndicator) {
            display.removeChild(rewards);
        }

        if (rewardLeft > 150 && rewardLeft < 300 && (rewardBottom > planeBottom && rewardBottom < planeBottom + 100) && !gameOverIndicator) {
            gameScore += 10;
            score.innerText = gameScore;
            display.removeChild(rewards);
            clearInterval(rewardsTimer);
        }

    }
    let rewardsTimer = setInterval(moveRewards, 300);
}
setInterval(makeRewards, 3000);

//if upward arrow key is pressed, make the plane move up
function control(e) {
    if (e.keyCode === 38) jump();
}

//keyup event makes the plane go up
function jump() {
    if (planeBottom <= window.innerHeight - 100) planeBottom += 50;
    plane.style.transform = "rotate(340deg)";
    plane.style.bottom = planeBottom + 'px';
}

//Game over
function gameOver() {
    gameOverIndicator = true;
    clearInterval(gameTimer);
    gameFinished.style.display = 'flex';
}

let gameTimer = setInterval(startGame, 20);
