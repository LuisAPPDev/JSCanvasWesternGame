class Guest {

    constructor(ctx, cWidth, cHeight, guestimg, guestWidth, guestHeight) {

        this._width = guestWidth
        this._height = guestHeight
        this._speed = 1
        this._xPos = cWidth;
        this._yPos = cHeight;
        this._ctx = ctx
        this.myImage = new Image()
        this.myImage.src = guestimg;
        this.myImage.frames = 2; //Indicamos el numero de frames que tiene la imagen
        this.myImage.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage




    }

    draw(framesCounter) {
        this._ctx.drawImage(
            this.myImage,
            this.myImage.framesIndex * Math.floor(this.myImage.width / this.myImage.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.myImage.width / this.myImage.frames), //Punto x donde termina de recortar
            this.myImage.height, //Punto y donde termina de recortar
            this._xPos - 550,
            this._yPos - 230,
            this._width,
            this._height,
        );

        this.animate(framesCounter); //Funcion que anima los frames.


    }


    animate(framesCounter) {
        if (framesCounter % 150 == 0) {
            this.myImage.framesIndex++; //Cambiamos el frame de la imagen cada 120 fps.
            if (this.myImage.framesIndex > 1) {
                this.myImage.framesIndex = 0;
            }
        }
    }

}