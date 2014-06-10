window.onload = function () {
  'use strict';

  var game
    , ns = window['flappy-dan'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, 'flappy-dan-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('gameover', ns.GameOver);
  game.state.add('story', ns.Story);

  game.state.start('boot');
};
