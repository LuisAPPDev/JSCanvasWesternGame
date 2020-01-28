class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 800
        this.height = 400
        this.image = new Image()
        this.image.src = "img/game_bg_0.png"
        this.posX = 0
        this.posY = 0


    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }


}