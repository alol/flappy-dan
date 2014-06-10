(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.dan = this.game.add.sprite(x - 20, y - 25, 'dan');
      this.dan.anchor.setTo(0.5, 0.5);

      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Flappy Dan' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'PRESS SPACE TO START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(this.onDown, this);
    },

    update: function () {
      this.dan.angle += 1;
    },

    onDown: function () {
      this.game.state.start('story');
    }
  };

  window['flappy-dan'] = window['flappy-dan'] || {};
  window['flappy-dan'].Menu = Menu;

}());
