(function() {
  'use strict';

  function Story() {
  }

  Story.prototype = {

    init: function (score) {
      this.score = score;
    },

    create: function () {
      var x = this.game.width / 2 - 200
        , y = this.game.height / 2;

      var story = "Dan is hungry.\nHungry for MAGNETS.\nThe only way for him to\nget them is to HURL HIMSELF\nat walls, avoiding bumping them\nusing his FLYING POWERS, and\nretrieving the precious\nferrous metals within.\n \nPress SPACE to make Dan fly."

      this.storyTxt = this.add.bitmapText(x, y, 'minecraftia', story );
      this.storyTxt.align = 'center';
      this.storyTxt.x = this.game.width / 2 - this.storyTxt.textWidth / 2;
      this.storyTxt.y = this.game.height / 2 - this.storyTxt.textHeight / 2;

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
  window['flappy-dan'].Story = Story;
}());
