class Bullet {
    constructor(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc) {

        this.ctx = ctx
        this.posSheriffX = xplayer
        this.cHeight = cHeight - 100
        this.velX = 10;
        this.velY = 3;
        this.bulletW = bulletW;
        this.bulletH = bulletH;
        this.bulletImage = new Image()
        this.bulletImage.src = imgsrc

    }

    draw() {

        //console.log(this.bulletImage, this.xplayer - 90, this.cHeight - 100, this.bulletW, this.bulletH)
        this.ctx.drawImage(this.bulletImage, this.posSheriffX - 100, this.cHeight, this.bulletW, this.bulletH)


    }

    move() {
        console.log()
        this.cHeight -= this.velY
    }
}