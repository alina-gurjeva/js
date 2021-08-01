"use strict";
const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 2,
  winFoodCount: 5,
  msTimeSleepBarier: 1000,
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  validate() {
    const result = {
      isValid: true,
      errors: [],
    };

    if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getColsCount() < 10 || this.getColsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getSpeed() < 1 || this.getSpeed() > 10) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
    }

    return result;
  },
};

const map = {
  cells: {},
  usedCells: [],

  init(rowsCount, colsCount) {
    const counter = document.getElementById('Counter')
    let win = '<p class="Counter"> Win: <p id="win">0</p></p>'
    let lose = '<p class="Counter"> Lose: <p id="lose">0</p></p>'
    let eaten = '<p class="Counter"> Eaten: <p id="eaten">0</p></p>'
    counter.innerHTML = win + lose + eaten

    const table = document.getElementById('game');
    table.innerHTML = '';

    this.cells = {};
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      const tr = document.createElement('tr');
      tr.classList.add('row');
      table.appendChild(tr);

      for (let col = 0; col < colsCount; col++) {
        const td = document.createElement('td');
        td.classList.add('cell');
        tr.appendChild(td);

        this.cells[`x${col}_y${row}`] = td;
      }
    }


  },

  render(snakePointsArray, foodPoint, barierPoint) {
    for (const cell of this.usedCells) {
      cell.className = 'cell';
    }

    this.usedCells = [];

    snakePointsArray.forEach((point, index) => {
      const snakeCell = this.cells[`x${point.x}_y${point.y}`];
      snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
      this.usedCells.push(snakeCell);
    });

    const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
    foodCell.classList.add('food');
    this.usedCells.push(foodCell);

    const barierCell = this.cells[`x${barierPoint.x}_y${barierPoint.y}`];
    barierCell.classList.add('barier');
    this.usedCells.push(barierCell);
  },
};

const snake = {
  body: [],
  direction: null,
  lastStepDirection: null,
  steps: 0,

  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  },

  getLastStepDirection() {
    return this.lastStepDirection;
  },

  setDirection(direction) {
    this.direction = direction;
  },

  isOnPoint(point) {
    return this.getBody().some((snakePoint) => {
      return snakePoint.x === point.x && snakePoint.y === point.y;
    });
  },

  makeStep() {
    this.lastStepDirection = this.direction;
    this.getBody().unshift(this.getNextStepHeadPoint());
    this.getBody().pop();
    this.steps += 1;
  },

  growUp() {
    const lastBodyIdx = this.getBody().length - 1;
    const lastBodyPoint = this.getBody()[lastBodyIdx];
    const lastBodyPointClone = Object.assign({}, lastBodyPoint);

    this.getBody().push(lastBodyPointClone);
  },

  getNextStepHeadPoint() {
    const firstPoint = this.getBody()[0];
    switch(this.direction) {
      case 'up':
        return {x: firstPoint.x, y: firstPoint.y - 1};
      case 'right':
        return {x: firstPoint.x + 1, y: firstPoint.y};
      case 'down':
        return {x: firstPoint.x, y: firstPoint.y + 1};
      case 'left':
        return {x: firstPoint.x - 1, y: firstPoint.y};
    }
  },
};

const food = {
  x: null,
  y: null,

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};

const barier = {
  x: null,
  y: null,

  setTimesleep(msTime){
    this.timeSleep = msTime
  },

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },

};

const status = {
  condition: null,

  setPlaying() {
    this.condition = 'playing';
  },

  setStopped() {
    this.condition = 'stopped';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlaying() {
    return this.condition === 'playing';
  },

  isStopped() {
    return this.condition === 'stopped';
  },
};

const game = {
  config,
  map,
  snake,
  food,
  barier,
  status,
  tickInterval: null,

  init(userSettings = {}) {
    this.config.init(userSettings);
    const validation = this.config.validate();

    if (!validation.isValid) {
      for (const err of validation.errors) {
        console.error(err);
      }
      return;
    }

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());
    this.setEventHandlers();
    this.reset();
    
  },

  setEventHandlers() {
    document.getElementById('playButton').addEventListener('click', () => {
      this.playClickHandler();
    });
    document.getElementById('newGameButton').addEventListener('click', () => {
      this.newGameClickHandler();
    });
    document.addEventListener('keydown', (event) => this.keyDownHandler(event));
  },

  playClickHandler() {
    if (this.status.isPlaying()) this.stop();
    else if (this.status.isStopped()) this.play();
  },

  newGameClickHandler() {
    this.reset();
  },

  keyDownHandler(event) {
    if (!this.status.isPlaying()) return;

    const direction = this.getDirectionByCode(event.code);

    if (this.canSetDirection(direction)) this.snake.setDirection(direction);
  },

  getDirectionByCode(code) {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        return 'up';
      case 'KeyD':
      case 'ArrowRight':
        return 'right';
      case 'KeyS':
      case 'ArrowDown':
        return 'down';
      case 'KeyA':
      case 'ArrowLeft':
        return 'left';
    }
  },

  canSetDirection(direction) {
    const lastStepDirection = this.snake.getLastStepDirection();

    return direction === 'up' && lastStepDirection !== 'down' ||
        direction === 'right' && lastStepDirection !== 'left' ||
        direction === 'down' && lastStepDirection !== 'up' ||
        direction === 'left' && lastStepDirection !== 'right';
  },

  reset() {
    this.stop();
    this.snake.init(this.getStartSnakeBody(), 'up');
    this.food.setCoordinates(this.getRandomFreeCoordinates());
    this.barier.setCoordinates(this.getRandomFreeCoordinates());
    this.render()
    const counter = document.getElementById('eaten')
    counter.innerText = 0
  },

  getStartSnakeBody() {
    return [
      {
        x: Math.floor(this.config.getColsCount() / 2),
        y: Math.floor(this.config.getRowsCount() / 2),
      }
    ];
  },

  getRandomFreeCoordinates() {
    const exclude = [this.food.getCoordinates(), this.barier.getCoordinates(), ...this.snake.getBody()];

    while (true) {
      
      const rndPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      }

      if (!exclude.some((exPoint) => exPoint.x === rndPoint.x && exPoint.y === rndPoint.y)) return rndPoint;

      
    }
  },

  play() {
    this.status.setPlaying();
    this.tickInterval = setInterval(() => {
      this.tickHandler();
    }, 1000 / this.config.getSpeed());
    this.setPlayButton('Стоп');
    
  },

  stop() {
    this.status.setStopped();
    clearInterval(this.tickInterval);
    this.setPlayButton('Старт');
  },

  finish() {
    this.status.setFinished();
    clearInterval(this.tickInterval);
    this.setPlayButton('Игра закончена', true);
  },

  countLose(){
    let lose = document.getElementById('lose')
    let k_lost = Number(lose.innerText)+1
    lose.innerText = k_lost
  },

  countWin(){
    let win = document.getElementById('win')
    let k_win = Number(win.innerText)+1
    win.innerText = k_win
  },

  countEaten(){
    let eaten = document.getElementById('eaten')
    let k_eaten = Number(eaten.innerText)+1
    eaten.innerText = k_eaten
  },

  tickHandler() {
    if (!this.canMakeStep()) {
      this.countLose();
      return this.finish()};
    if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
      this.countEaten();
      this.snake.growUp();
      this.food.setCoordinates(this.getRandomFreeCoordinates());
      if (this.isGameWon()) {
        this.countWin();
        this.finish()};
    }

    if (this.barier.isOnPoint(this.snake.getNextStepHeadPoint())){
      this.countLose()
      this.finish();
    }

    this.snake.makeStep();
    if (this.snake.steps > this.counterBarier){
      this.counterBarier = Math.floor(Math.random() * 10);
      this.snake.steps = 0;
      this.barier.setCoordinates(this.getRandomFreeCoordinates());
    }
    this.render();
  },

  canMakeStep() {
    const nextHeadPoint = this.snake.getNextStepHeadPoint();
    return !this.snake.isOnPoint(nextHeadPoint) &&
        nextHeadPoint.x < this.config.getColsCount() &&
        nextHeadPoint.y < this.config.getRowsCount() &&
        nextHeadPoint.x >= 0 &&
        nextHeadPoint.y >= 0;
  },

  isGameWon() {
    return this.snake.getBody().length > this.config.getWinFoodCount();
  },

  setPlayButton(text, isDisabled = false) {
    const playButton = document.getElementById('playButton');

    playButton.textContent = text;

    isDisabled
        ? playButton.classList.add('disabled')
        : playButton.classList.remove('disabled');
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.barier.getCoordinates());
  },

  counterBarier: 1,
};

game.init();
