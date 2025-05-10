const WIDTH = 505;
const HEIGHT = 606;
const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const numRow = 6;
const numCol = 5;
const PlayerX = 2 * CELL_WIDTH;
const PlayerY = 71 + 4 * CELL_HEIGHT;
const PlayerMAX_X = 404;
const PlayerMIN_X = 0;
const PlayerMIN_Y = -12;
const PlayerMAX_Y = 403;
let currentMode = 'normal';

let selectedCharacter = 'images/char-boy.png'; // 默认角色

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= WIDTH) {
    this.x = 0;
  }
  this.x = this.x + dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function (object) {
  return Math.abs(this.x - object.x) <= 50 && Math.abs(this.y - object.y) <= 50;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.sprite = selectedCharacter;
  this.x = x;
  this.y = y;
};

Player.prototype.update = function (dt) {};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkWin = function () {
  if (this.y <= 0) {
    alert('You won!');
    this.reset();
  }
};

Player.prototype.reset = function () {
  this.x = PlayerX;
  this.y = PlayerY;
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'up':
      this.y > PlayerMIN_Y ? (this.y -= CELL_HEIGHT) : '';
      break;
    case 'down':
      this.y < PlayerMAX_Y ? (this.y += CELL_HEIGHT) : '';
      break;
    case 'left':
      this.x > PlayerMIN_X ? (this.x -= CELL_WIDTH) : '';
      break;
    case 'right':
      this.x < PlayerMAX_X ? (this.x += CELL_WIDTH) : '';
      break;
  }
};

var Selector = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Selector.png';
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var Enemy_1 = new Enemy(83 - 12, 71 - 5, 50);
// var Enemy_2 = new Enemy(10, 71 + CELL_HEIGHT - 5, 60);
// var Enemy_3 = new Enemy(10, 71 + 2 * CELL_HEIGHT - 5, 70);
// allEnemies = [Enemy_1, Enemy_2, Enemy_3];
var player = new Player(PlayerX, PlayerY, selectedCharacter);

document.querySelectorAll('.char-option').forEach((img) => {
  img.addEventListener('click', function () {
    selectedCharacter = this.dataset.char;
    console.log(this.dataset.char);

    document
      .querySelectorAll('.char-option')
      .forEach((i) => i.classList.remove('selected'));
    this.classList.add('selected');

    player.sprite = selectedCharacter; // 更新当前玩家角色
  });
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
