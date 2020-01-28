const game = {
    name: 'Western Bar',
    description: 'Western Bar Game',
    author: 'Luis Alberto Peña',
    license: undefined,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    wSize: {
        width: undefined,
        height: undefined
    },
    background: undefined,
    framesCounter: 0,
    fps: 60,
    score: undefined,
    sheriff: undefined,
    guest1: undefined,
    guest2: undefined,
    obstaclesUp: [],
    obstaclesMed: [],
    obstaclesDown: [],
    obstaclesBoom: [],
    shoots: [],
    init() {
        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setListeners();
        this.start();



    },
    setDimensions() {
        this.wSize.width = this.canvasDom.width
        this.wSize.height = this.canvasDom.height
    },
    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.clear();
            this.framesCounter++;
            this.drawAll();
            this.moveAll();
            this.generateObstacles();
            //this.score += this.framesCounter / 1000
            // eliminamos obstáculos fuera del canvas
            this.clearObstacles(); // Limpiamos del array de obstaculos los que salgan de la pantalla



        }, 1000 / this.fps);

    },
    reset() {


        this.background = new Background(this.ctx, this.wSize, this.imgBackSource)
        this.sheriff = new Player(this.ctx, this.canvasDom.width, this.canvasDom.height)
        this.guest1 = new Guest(this.ctx, this.wSize.width, this.wSize.height, "img/guest1.png", 80, 80)
        this.guest2 = new Guest(this.ctx, this.wSize.width + 190, this.wSize.height, "img/guest2.png", 80, 80)
        this.obstaclesUp = [];
        this.obstaclesMed = [];
        this.obstaclesDown = [];
        this.obstaclesBoom = [];
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;

    },

    drawAll() {
        this.background.draw();
        this.sheriff.draw();
        this.guest1.draw(this.framesCounter);
        this.guest2.draw(this.framesCounter);
        this.obstaclesUp.forEach(obs => obs.draw());
        this.obstaclesMed.forEach(obs => obs.draw());
        this.obstaclesDown.forEach(obs => obs.draw());
        this.obstaclesBoom.forEach(obs => obs.drawBoom(this.framesCounter));
        this.drawScore();
        this.shoots.forEach(bullet => bullet.draw());


    },
    drawScore() {
        //Pintamos el marcador
        this.scoreboard.update(this.score);
    },

    moveAll() {
        this.shoots.forEach(bull => bull.move());
        if (this.framesCounter % 95 == 0) {
            this.obstaclesUp.forEach(obs => obs.move());
            this.obstaclesMed.forEach(obs => obs.move());
            this.obstaclesDown.forEach(obs => obs.move());
            this.obstaclesBoom.forEach(obs => obs.moveBoom());


        }
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    },
    setListeners() {
        document.onkeydown = e => {

            e.keyCode == 37 ? this.sheriff.moveLeft() : null
            e.keyCode == 39 ? this.sheriff.moveRight() : null
            e.keyCode == 32 ? this.shoots.push(new Bullet(this.ctx, this.sheriff._sheriffPosX, this.wSize.height, 20, 20, "img/icon_fire.png")) : null

        }
    },

    generateObstacles() {

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesUp.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 290, 30, 30, "img/glass1.png")): null;

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesMed.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 335, 30, 30, "img/bottle1.png")): null;

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesDown.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 380, 30, 30, "img/dart1.png")): null;

        (this.framesCounter % (this.randomInt(500, 800)) == 0) ? this.obstaclesBoom.push(new Obstacles(this.ctx, this.wSize.width - 750, this.wSize.height - 380, 30, 30, "img/throw_bomb12.png")): null;

    },

    clearObstacles() {
        //funcion para limpiar obstaculos

        this.obstaclesUp.forEach((obs, idx) => {
            (obs.posX <= this.wSize.width - 640) ? this.obstaclesUp.splice(idx, 1): null
        });

        this.obstaclesMed.forEach((obs, idx) => {
            (obs.posX <= this.wSize.width - 640) ? this.obstaclesMed.splice(idx, 1): null
        });

        this.obstaclesDown.forEach((obs, idx) => {
            (obs.posX <= this.wSize.width - 640) ? this.obstaclesDown.splice(idx, 1): null
        });

        this.obstaclesBoom.forEach((obs, idx) => {
            (obs.posX > this.wSize.width) ? this.obstaclesDown.splice(idx, 1): null
        });


    },
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },




}