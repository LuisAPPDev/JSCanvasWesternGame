class Bullet {
    constructor(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc) {

        this.ctx = ctx
        this.posSheriffX = xplayer
        this.CanvasW = xplayer;
        this.cHeight = cHeight - 100
        this.bWidth = this.posSheriffX - 100
        this.velX = 10;
        this.velY = 3;
        this.bulletW = bulletW;
        this.bulletH = bulletH;
        this.bulletImage = new Image()
        this.bulletImage.src = imgsrc

    }

    draw() {



        this.ctx.drawImage(this.bulletImage, this.bWidth, this.cHeight, this.bulletW, this.bulletH)


    }

    move() {

        this.cHeight -= this.velY
    }
}

class Things extends Bullet {

    constructor(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc) {
        super(ctx, xplayer, cHeight, bulletW, bulletH, imgsrc);

        this.ctx = ctx
        this.cHeight = cHeight
        this.CanvasW = xplayer
        this.velX = 10;
        this.velY = 3;
        this.bulletW = bulletW;
        this.bulletH = bulletH;
        this.bulletImage = new Image()
        this.bulletImage.src = imgsrc


    }

    draw() {

        this.ctx.drawImage(this.bulletImage, this.CanvasW, this.cHeight, this.bulletW, this.bulletH)
    }



    moveMaleAttack() {
        const wPossibilities = [3, 2, 0]
        this.cHeight += 1.2
        this.CanvasW += wPossibilities[Math.floor(Math.random() * wPossibilities.length)]
        //console.log(this.CanvasW)
    }

    moveFemaleAttack() {
        const wPossibilities = [0, 1.5]
        this.cHeight += 1.25
        let random = wPossibilities[Math.floor(Math.random() * wPossibilities.length)]
        // this.CanvasW -= random
        this.CanvasW -= random
        // console.log(wPossibilities[Math.floor(Math.random() * wPossibilities.length)])
        // console.log(this.CanvasW)
        // this.CanvasW -= 1.5
    }


}