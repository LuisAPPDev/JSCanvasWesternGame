class Background {
    constructor(ctx) {
        this._ctx = ctx
        this._width = 800
        this._height = 400
        this._image = new Image()
        this._image.src = "img/game_bg_1.png"
        this._posX = 0
        this._posY = 0


    }

    draw() {

        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)

    }


}