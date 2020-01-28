class Obstacles {

    constructor(ctx, objWidthPos, objHeightPos, sizeW, sizeH, imgsrc) {

        this.ctx = ctx;
        this.width = sizeW
        this.height = sizeH
        this.posX = objWidthPos
        this.posY = objHeightPos
        this.myImage = new Image()
        this.myImage.src = imgsrc
        this.myImage.frames = 3; //Indicamos el numero de frames que tiene la imagen
        this.myImage.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
    }

    draw() {

        this.ctx.drawImage(this.myImage, this.posX, this.posY, this.width, this.height)

    }

    move() {
        this.posX -= 60
    }

    drawBoom(framesCounter) {


        this.ctx.drawImage(
            this.myImage,
            this.myImage.framesIndex * Math.floor(this.myImage.width / this.myImage.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.myImage.width / this.myImage.frames), //Punto x donde termina de recortar
            this.myImage.height, //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height,
        );

        this.animate(framesCounter); //Funcion que anima los frames.


    }


    moveBoom() {

        this.posX += 60

    }

    animate(framesCounter) {
        if (framesCounter % 120 == 0) {
            this.myImage.framesIndex++;
            if (this.myImage.framesIndex > 2) {
                this.myImage.framesIndex = 0;
            }
        }
    }

}