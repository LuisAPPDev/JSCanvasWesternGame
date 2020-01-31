class Obstacles {

    constructor(ctx, objWidthPos, objHeightPos, sizeW, sizeH, imgsrc) {

        this._ctx = ctx;
        this._width = sizeW
        this._height = sizeH
        this._posX = objWidthPos
        this._posY = objHeightPos
        this._myImage = new Image()
        this._myImage.src = imgsrc
        this._myImage.frames = 3; //Indicamos el numero de frames que tiene la imagen
        this._myImage.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
    }

    draw() {

        this._ctx.drawImage(this._myImage, this._posX, this._posY, this._width, this._height)

    }

    move() {
        this._posX -= 60
    }

    drawBoom(framesCounter) {


        this._ctx.drawImage(
            this._myImage,
            this._myImage.framesIndex * Math.floor(this._myImage.width / this._myImage.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this._myImage.width / this._myImage.frames), //Punto x donde termina de recortar
            this._myImage.height, //Punto y donde termina de recortar
            this._posX,
            this._posY,
            this._width,
            this._height,
        );

        this.animate(framesCounter); //Funcion que anima los frames.


    }


    moveBoom() {

        this._posX += 60

    }

    animate(framesCounter) {
        if (framesCounter % 120 == 0) {
            this._myImage.framesIndex++;
            if (this._myImage.framesIndex > 2) {
                this._myImage.framesIndex = 0;
            }
        }
    }

}