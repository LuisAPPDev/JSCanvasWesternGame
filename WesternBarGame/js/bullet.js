class Bullet {
    constructor(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc) {

        this._ctx = ctx
        this._posSheriffX = xplayer
        this._CanvasW = xplayer;
        this._cHeight = cHeight - 100
        this._bWidth = this._posSheriffX - 100
        this._velX = 10;
        this._velY = 3;
        this._bulletW = bulletW;
        this._bulletH = bulletH;
        this._bulletImage = new Image()
        this._bulletImage.src = imgsrc

    }

    draw() {



        this._ctx.drawImage(this._bulletImage, this._bWidth, this._cHeight, this._bulletW, this._bulletH)


    }

    move() {

        this._cHeight -= this._velY
    }
}

class Things extends Bullet {

    constructor(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc) {
        super(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc);

        this._ctx = ctx
        this._cHeight = cHeight
        this._CanvasW = xplayer
        this._velX = 10;
        this._velY = 3;
        this._bulletW = bulletW;
        this._bulletH = bulletH;
        this._bulletImage = new Image()
        this._bulletImage.src = imgsrc


    }

    draw() {

        this._ctx.drawImage(this._bulletImage, this._CanvasW, this._cHeight, this._bulletW, this._bulletH)
    }



    moveMaleAttack() {
        const wPossibilities = [3, 2, 0]
        this._cHeight += 1.2
        this._CanvasW += wPossibilities[Math.floor(Math.random() * wPossibilities.length)]
        //console.log(this.CanvasW)
    }

    moveFemaleAttack() {
        const wPossibilities = [0, 1.5]
        this._cHeight += 1.25
        let random = wPossibilities[Math.floor(Math.random() * wPossibilities.length)]
        // this.CanvasW -= random
        this._CanvasW -= random
        // console.log(wPossibilities[Math.floor(Math.random() * wPossibilities.length)])
        // console.log(this.CanvasW)
        // this.CanvasW -= 1.5
    }


}