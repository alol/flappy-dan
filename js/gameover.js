(function() {
  'use strict';

  function GameOver() {
  }

  GameOver.prototype = {

    init: function (score) {
      this.score = score;
    },

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'PRESS SPACE TO TRY AGAIN' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'YOU DIED. SCORE: ' + this.score);
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['flappy-dan'] = window['flappy-dan'] || {};
  window['flappy-dan'].GameOver = GameOver;
}());
