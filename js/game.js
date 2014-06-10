(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.dan = this.game.add.sprite(100, 200, 'dan');
      this.game.physics.arcade.enable(this.dan);
      this.dan.body.gravity.y = 1000;

      this.pipes = this.game.add.group();
      this.pipes.enableBody = true;
      this.pipes.physicsBodyType = Phaser.Physics.ARCADE;
      this.pipes.createMultiple(20, 'pipe');
      this.pipes.setAll('checkWorldBounds', true);
      this.pipes.setAll('outOfBoundsKill', true);

      this.magnets = this.game.add.group();
      this.magnets.enableBody = true;
      this.magnets.physicsBodyType = Phaser.Physics.ARCADE;
      this.magnets.create(0, 0, 'magnet3', null, false);
      this.magnets.create(0, 0, 'magnet2', null, false);
      this.magnets.setAll('checkWorldBounds', true);
      this.magnets.setAll('outOfBoundsKill', true);

      var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(this.jump, this);

      this.pipeTimer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

      this.score = 0;
      this.scoreText = this.game.add.bitmapText(x, 20, 'minecraftia', this.score.toString());
      this.scoreText.align = 'center';
      this.scoreText.x = 50;
    },

    update: function () {
      if(this.dan.inWorld === false) {
        this.die();
      }
      this.updateScoreText();
      this.game.physics.arcade.overlap(this.dan, this.pipes, this.die, null, this);

      this.game.physics.arcade.overlap(this.dan, this.magnets, this.hitMagnet, null, this);

      if(this.dan.angle < 20) {
        this.dan.angle += 1;
      }
    },

    jump: function () {
      if(!this.dan.alive) { return false; }

      this.dan.body.velocity.y = -350;
      var animation = this.game.add.tween(this.dan);
      animation.to({angle: -20}, 100);
      animation.start();
    },

    die: function () {
      if(!this.dan.alive) { return false; }

      this.dan.alive = false;
      this.dan.angle = 0;
      this.dan.bringToTop();
      this.game.time.events.remove(this.pipeTimer);
      this.pipes.forEach (function(pipe) {
        pipe.body.velocity.y = 0;
      }, this);

      this.dan.body.velocity.y = 0;
      this.dan.body.velocity.x = 0;
      this.dan.body.gravity.y = 0;

      //var posAnimation = this.game.add.tween(this.dan);
      //posAnimation.to({x:this.game.width/2, y:this.game.height/2}, 100);
      //posAnimation.start();

      var scaleAnimation = this.game.add.tween(this.dan.scale);
      scaleAnimation.to({x:20, y:20}, 1000);
      scaleAnimation.start();
      scaleAnimation.onComplete.add(function () {
        this.game.state.start('gameover', true, false, this.score);
      }, this);
    },

    hitMagnet: function (dan, magnet) {
      if(!this.dan.alive) { return false; }
      magnet.kill();
      this.score += 1;
    },

    addOnePipe: function (x, y) {
      var pipe = this.pipes.getFirstDead();

      pipe.reset(x, y);
      pipe.body.velocity.x = -200;
    },

    addOneMagnet: function (x, y) {
      var magnet = this.magnets.getFirstDead();

      magnet.reset(x, y);
      magnet.body.velocity.x = -200;
    },

    addRowOfPipes: function () {
      var hole = Math.floor(Math.random() * 5) + 1;

      for(var i = 0; i < 8; i++) {
        if (i !== hole && i !== hole + 1) {
          this.addOnePipe(600, i * 60 + 10);
        } else if ( i === hole) {
          this.addOneMagnet(590, i * 60 + 30);
        }
      }
    },

    updateScoreText: function () {
      this.scoreText.text = this.score.toString();
    },

  };

  window['flappy-dan'] = window['flappy-dan'] || {};
  window['flappy-dan'].Game = Game;

}());
