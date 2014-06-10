(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.game.stage.backgroundColor = '#71c5cf';

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.image('dan', 'assets/dan.png');
      this.load.image('pipe', 'assets/pipe.png');
      this.load.image('magnet1', 'assets/magnet1.png');
      this.load.image('magnet2', 'assets/magnet2.png');
      this.load.image('magnet3', 'assets/magnet3.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['flappy-dan'] = window['flappy-dan'] || {};
  window['flappy-dan'].Preloader = Preloader;

}());
