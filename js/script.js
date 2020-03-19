window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    };

    function startGame() {
        game.init()
        if (document.activeElement != document.body) document.activeElement.blur();
     }

};