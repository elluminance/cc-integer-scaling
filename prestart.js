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
        let width = 0, height = 0,
            originalWidth = window.IG_WIDTH, originalHeight = window.IG_HEIGHT,
            windowWidth = $(window).width(), windowHeight = $(window).height();
        if(this.values["display-type"] == sc.DISPLAY_TYPE.INTEGER) {
            if (windowWidth > originalWidth * window.IG_GAME_SCALE && windowHeight > originalHeight * window.IG_GAME_SCALE) {
                width = originalWidth * window.IG_GAME_SCALE;
                height = originalHeight * window.IG_GAME_SCALE;
            } else if (Math.floor(windowWidth / originalWidth) == 0 || Math.floor(windowHeight / originalHeight) == 0) {
                width = originalWidth;
                height = originalHeight;
            } else {
                if (windowWidth / originalWidth < windowHeight / originalHeight) {
                    width = originalWidth * Math.floor(windowWidth / originalWidth);
                    height = originalHeight * Math.floor(windowWidth / originalWidth);
                } else {
                    width = originalWidth * Math.floor(windowHeight / originalHeight);
                    height = originalHeight * Math.floor(windowHeight / originalHeight);
                }
            }

            if (window.ig && window.ig.system) ig.system.setCanvasSize(width, height, false);
            else {
                $("#canvas").width(width);
                $("#canvas").height(height);
                $("#canvas")[0].className = ""
            }
        } else this.parent();
    }
})