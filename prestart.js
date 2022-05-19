sc.DISPLAY_TYPE.INTEGER = 4;

sc.PIXEL_SIZE.FIVE = 4;
sc.PIXEL_SIZE.SIX = 5;

sc.OptionModel.inject({
    _checkSystemSettings(a) {
        this.parent(a);
        if(a == "pixel-size") {
            this._setDisplaySize();
        }
    },

    _setDisplaySize() {
        let a = 0,
            c = window.IG_WIDTH,
            d = window.IG_HEIGHT,
            b = $(window).width(),
            i = $(window).height(),
            j = false,
            k = false;
        if(this.values["display-type"] == sc.DISPLAY_TYPE.INTEGER) {
            if (b > c * window.IG_GAME_SCALE && e > d * window.IG_GAME_SCALE) {
                a = c * window.IG_GAME_SCALE;
                b = d * window.IG_GAME_SCALE;
            } else if (Math.floor(b / c) == 0 || Math.floor(e / d) == 0) {
                a = c;
                b = d;
            } else {
                if (b / c < e / d) {
                    a = c * Math.floor(b / c);
                    b = d * Math.floor(b / c);
                } else {
                    a = c * Math.floor(e / d);
                    b = d * Math.floor(e / d);
                }
            }

            if (window.ig && window.ig.system) ig.system.setCanvasSize(a, b, false);
            else {
                $("#canvas").width(a);
                $("#canvas").height(b);
                $("#canvas")[0].className = ""
            }
        } else this.parent();
    }
})