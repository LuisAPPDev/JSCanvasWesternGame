class Guest {

    constructor(ctx, cWidth, cHeight, guestimg, guestWidth, guestHeight) {

        this._width = guestWidth
        this._height = guestHeight
        this._speed = 1
        this._xPos = cWidth;
        this._yPos = cHeight;
        this._ctx = ctx
        this._myImage = new Image()
        this._myImage.src = guestimg;
        this._myImage.frames = 2; //Indicamos el numero de frames que tiene la imagen
        this._myImage.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage




    }

    draw(framesCounter) {
        this._ctx.drawImage(
            this._myImage,
            this._myImage.framesIndex * Math.floor(this._myImage.width / this._myImage.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this._myImage.width / this._myImage.frames), //Punto x donde termina de recortar
            this._myImage.height, //Punto y donde termina de recortar
            this._xPos - 550,
            this._yPos - 230,
            this._width,
            this._height,
        );

        this.animate(framesCounter); //Funcion que anima los frames.


    }


    animate(framesCounter) {
        if (framesCounter % 150 == 0) {
            this._myImage.framesIndex++; //Cambiamos el frame de la imagen cada 120 fps.
            if (this._myImage.framesIndex > 1) {
                this._myImage.framesIndex = 0;
            }
        }
    }

}