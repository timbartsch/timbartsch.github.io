BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    scoreTextStyle: { font: "100 60px Helvetica Neue", fontWeight: "100", fill: "#ffffff", align: "center" },
    levelTextStyle: { font: "bold 300px Helvetica Neue", fontWeight: "100", fill: "#ffffff", align: "center" }

};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'images/preloader_background.png?3');
        this.load.image('preloaderBar', 'images/preloader_bar.png?3');

    },

    create: function () {

        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.game.stage.scale.minWidth = 480;
            this.game.stage.scale.minHeight = 260;
            this.game.stage.scale.maxWidth = 2048;
            this.game.stage.scale.maxHeight = 1536;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.stage.scale.setScreenSize(true);
        }
        else
        {
            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.game.stage.scale.minWidth = 480;
            this.game.stage.scale.minHeight = 260;
            this.game.stage.scale.maxWidth = 2048;
            this.game.stage.scale.maxHeight = 1536;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.pageAlignVertically = true;
            this.game.stage.scale.forceOrientation(true, false);
            this.game.stage.scale.hasResized.add(this.gameResized, this);
            this.game.stage.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.game.stage.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.game.stage.scale.setScreenSize(true);
        }

        this.game.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
