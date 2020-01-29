//Hacemos el marcador de puntuacion.
const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "30px sans-serif"
    },

    update: function (score, lifes) {
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score ${Math.floor(score)}`, 50, 50);
        this.ctx.fillText(`Vidas: ${lifes}`, 50, 80)
    }
};