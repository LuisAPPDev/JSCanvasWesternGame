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
    tnt: 1,
    sheriff: undefined,
    guest1: undefined,
    guest2: undefined,
    obstaclesUp: [],
    obstaclesMed: [],
    obstaclesDown: [],
    obstaclesBoom: [],
    shoots: [],
    apples: [],
    hats: [],
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
        this.startSound = document.createElement("audio")
        this.startSound.src = "sound/start.ogg"
        this.startSound.volume = 0.9
        this.startSound.play()
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter > 1000 ? this.framesCounter = 0 : null
            this.clear();
            this.framesCounter++;
            this.generateObstacles();
            this.drawAll();
            this.moveAll();
            this.guest1._myImage.framesIndex === 1 ? this.generateGuestItems() : null;
            this.guestAttack();
            // eliminamos obstáculos fuera del canvas
            this.checkCollision(this.obstaclesDown, 0);
            this.checkCollision(this.obstaclesMed, 0);
            this.checkCollision(this.obstaclesUp, 0);
            this.checkCollision(this.obstaclesBoom, 1);
            this.checkCollisionGuest(this.apples);
            this.checkCollisionGuest(this.hats);
            this.stillAlive();
            this.clearObstacles(this.obstaclesDown);
            this.clearObstacles(this.obstaclesMed);
            this.clearObstacles(this.obstaclesUp);




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
        this.shoots = [];
        this.apples = [];
        this.hats = [];
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
        this.shoots.forEach(bullet => bullet.draw());
        this.apples.forEach(apple => apple.draw());
        this.hats.forEach(hat => hat.draw());


    },
    drawScore() {
        //Pintamos el marcador
        this.scoreboard.update(this.score, this.sheriff._lifes);
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

            if (e.keyCode == 32) {
                this.shoots.push(new Bullet(this.ctx, this.sheriff._sheriffPosX, this.wSize.height, 20, 20, "img/icon_fire.png"));
                this.fireSound = document.createElement("audio")
                this.fireSound.src = "sound/fire.mp3"
                this.fireSound.volume = 0.9
                this.fireSound.play()


            }
        }
    },

    generateObstacles() {

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesDown.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 290, 30, 30, "img/glass1.png")): null;

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesMed.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 335, 30, 30, "img/bottle1.png")): null;

        (this.framesCounter % (this.randomInt(180, 220)) == 0) ? this.obstaclesUp.push(new Obstacles(this.ctx, this.wSize.width - 100, this.wSize.height - 380, 30, 30, "img/dart1.png")): null;

        (this.framesCounter % (this.randomInt(700, 1000)) == 0) ? this.obstaclesBoom.push(new Obstacles(this.ctx, this.wSize.width - 750, this.wSize.height - 380, 30, 30, "img/throw_bomb12.png")): null;

    },

    clearObstacles(array) {
        //funcion para limpiar obstaculos
        array.forEach((obs, idx) => {
            (obs._posX <= this.wSize.width - 640) ? array.splice(idx, 1): null
        });



        this.obstaclesBoom.forEach((obs, idx) => {
            if (obs._posX > this.wSize.width) {
                // this.boomSound = document.createElement("audio")
                // this.boomSound.src = "sound/bomb.mp3"
                // this.boomSound.volume = 0.9
                // this.boomSound.play()
                this.obstaclesBoom.splice(idx, 1)
            }
        });

        this.apples.forEach((obs, idx) => {
            (obs._cHeight > this.wSize.height) ? this.apples.splice(idx, 1): null
        });

        this.hats.forEach((obs, idx) => {
            (obs._cHeight > this.wSize.height) ? this.hats.splice(idx, 1): null
        });




    },
    generateGuestItems() {

        this.apples.length === 0 ? this.apples.push(new Things(this.ctx, this.wSize.width - 360, this.wSize.height - 200, 15, 15, "img/apple.png")) : null
        this.hats.length === 0 ? this.hats.push(new Things(this.ctx, this.wSize.width - 480, this.wSize.height - 200, 15, 15, "img/hat.png")) : null;

    },

    guestAttack() {

        this.hats.length === 1 ? this.hats[0].moveMaleAttack() : null;
        this.apples.length === 1 ? this.apples[0].moveFemaleAttack() : null;


    },
    checkCollision(arr, tnt) {
        // funcion para comprobar colisiones

        arr.forEach(
            (obs, idx) =>
            this.shoots.forEach(elm => {

                if (
                    elm._bWidth + elm._bulletW >= obs._posX &&
                    elm._cHeight + elm._bulletH >= obs._posY &&
                    elm._bWidth <= obs._posX + obs._width &&
                    elm._cHeight <= obs._posY + obs._height) {

                    if (tnt === 1) {
                        this.sheriff._lifes--;
                        this.lifelost = document.createElement("audio")
                        this.lifelost.src = "sound/cry.ogg"
                        this.lifelost.volume = 0.9
                        this.lifelost.play()
                        arr.splice(idx, 1)
                    } else {
                        this.score += 10;
                        arr.splice(idx, 1)
                    }

                }
            })
        );




    },
    checkCollisionGuest(array) {

        array.forEach((elm, idx) => {


            if (
                this.sheriff._sheriffPosX + this.sheriff._width - 100 >= elm._CanvasW &&
                this.sheriff._yPos - 100 + this.sheriff._height >= elm._cHeight &&
                this.sheriff._sheriffPosX - 100 <= elm._CanvasW + elm._bulletW &&
                this.sheriff._yPos - 100 <= elm._cHeight + elm._bulletH)



            {
                this.sheriff._lifes--;
                if (this.sheriff._lifes > 0) {
                    this.lifelostg = document.createElement("audio")
                    this.lifelostg.src = "sound/cry.ogg"
                    this.lifelostg.volume = 0.9
                    this.lifelostg.play()
                }
                array.splice(idx, 1)

            }
        })

    },
    stillAlive() {
        this.drawScore();
        this.sheriff._lifes === 0 ? this.gameOver() : null

    },
    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
        this.gameOverSound = document.createElement("audio")
        this.gameOverSound.src = "sound/gameover.ogg"
        this.gameOverSound.volume = 0.9
        this.gameOverSound.play()
        setTimeout(() => {
            confirm(`¿Deseas jugar de nuevo?`) ? this.init() : window.close()
        }, 3000);


    },
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

};