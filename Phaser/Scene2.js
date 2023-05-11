var globalScale = 3.13/*2.7205882352941*/;      //To remain canvas height as 740(old) 800(current)
class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");  //Scene identifier (name)
    }

    create() {
        //var globalScale = 3.13/*2.7205882352941*/;      //To remain canvas height as 740(old) 800(current)
        //this.background = this.add.image(0, 0, "background");

        //create the background as a big tile sprite
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setScale(globalScale);

        //this.ship1 = this.add.image(config.width/2 - 150, config.height/2, "ship");
        //this.ship2 = this.add.image(config.width/2, config.height/2, "ship2");
        //this.ship3 = this.add.image(config.width/2 + 150, config.height/2, "ship3");

        this.ship1 = this.add.sprite(config.width/2 - 150, config.height/2, "ship");
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 + 150, config.height/2, "ship3");
        this.ship4 = this.add.sprite(config.width/2 + 150, config.height/2, "ship2");

        this.ship1.setScale(globalScale);
        this.ship2.setScale(globalScale);
        this.ship3.setScale(globalScale);
        this.ship4.setScale(globalScale);

        //Add enemy ships to physics group
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);
        this.enemies.add(this.ship4);

        //Create a powerUps group for physics
        this.powerUps = this.physics.add.group();
        var maxObjects = 3;
        for(var i = 0; i<maxObjects; i++){
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            powerUp.setScale(globalScale - 0.5);
            this.powerUps.add(powerUp);     //Add each power up to the powerUps group
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);   //So they dont get out of the canvas scope
            powerUp.setBounce(1);
            if(Math.random() > 0.5){
                powerUp.play("red");
            } else {
                powerUp.play("grey");
            }
        }

        //Play our animations
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");
        this.ship4.play("ship2_anim");

        //Set ships to be interactive so we can enable them to recieve input
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();
        this.ship4.setInteractive();

        //Event listener - whenever an interactive object is clicked it will get destroyed
        //this.input.on('gameobjectdown', this.destroyShip, this)       /* CARE U DONT UNDERSTAND */

        //Player Setup
        this.player = this.physics.add.sprite(config.width/2 - 8, config.height - 64, "player");
        this.player.setScale(globalScale + 0.25);
        this.player.play("thrust");
        this.player.setCollideWorldBounds(true);    //so the player collide with walls

        //Keyboard events
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);   //Shooting
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
            projectile.destroy();         
        });     //add collision between groups

        //Groups overlap events
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        //SCORE text
        // var graphics = this.add.graphics();
        // graphics.fillStyle(0x00000000, 1);
        // graphics.beginPath();
        // graphics.moveTo(0, 0);
        // graphics.lineTo(config.width, 0);
        // graphics.lineTo(config.width, 40);
        // graphics.lineTo(0, 40);
        // graphics.lineTo(0, 0);
        // graphics.closePath();
        // graphics.fillPath();
        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE 000000", 16 * (globalScale - 0.5));   //bitmapText(posX, posY, fontID, "what to display?", fontSize)

        //Sound fx
        this.beamSound = this.sound.add("audio_beam");
        this.explosionSound = this.sound.add("audio_explosion");
        this.pickupSound = this.sound.add("audio_pickup");
        //Background music
        this.music = this.sound.add("music");
        var musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }
        this.music.play(musicConfig);
    }

    
                                            /*Gameplay loop*/

    update() {
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 1.25);
        this.moveShip(this.ship3, 2);
        this.moveShip(this.ship4, 2.75);

        //move the back ground tile sprite
        this.background.tilePositionY -= 0.15;

        //Listen for keyboard input
        this.movePlayerManager();

        //Event listener for space btn - JustDown => only listens once per btn pressed
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active){     //So player cant shoot while invis
                this.shootBeam();
            }
        }
        //Add all the beams to group
        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }


                                        /*Standalone Functions*/

    moveShip(ship, speed){
        ship.y += speed;
        //if the ship exceeds the vertical height of the canvas, set it back to 0 at a randomX width value 
        if(ship.y > config.height){
            this.resetShipPos(ship);
        }
    }

    //This function is to reset the ship position when it gets down out of scrren
    //So you get the looping effect &
    //Also it places its starting position to a randomX width value (after geting out of screen)
    resetShipPos(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(5, config.width - 5);
        ship.x = randomX
    }

    // destroyShip(mousePointer, gameObject) {
    //     gameObject.setTexture("explosion");     //When a ship is clicked, switch its texture
    //     gameObject.play("explode");
    // }

    movePlayerManager() {
        this.player.setVelocity(0); //to stop the player from moving once the button is up    
        //Horizontal movement
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        //Vertical movement
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }

    shootBeam(){
        var beam = new Beam(this);
        this.beamSound.play({volume: 0.1});
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
        this.pickupSound.play({volume: 0.3});
    }

    hurtPlayer(player, enemy){
        this.resetShipPos(enemy);
        if(this.player.alpha < 1){
            return;
        }
        var explosion = new Explosion(this, player.x, player.y);
        player.disableBody(true, true);     //Disable player ship and hide it (after explosion) *PLAYER CAN SHOOT WHILE INVIS*
        this.explosionSound.play({volume: 0.1});
        //player respawn delay
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,     //reset player position after 1 sec of death
            callbackScope: this,
            loop: false,
        });
    }

    hitEnemy(projectile, enemy){
        var explosion = new Explosion(this, enemy.x, enemy.y);  //Enemy explode
        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        var scoreFormatted = this.zeroPad(this.score, 6);   //Reformat the score
        this.scoreLabel.text = "SCORE " + scoreFormatted;
        this.explosionSound.play({volume: 0.1});
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    resetPlayer(){
        var x = config.width / 2 - 8;
        var y = config.height + 50;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;        //Make player transparent, so he doesnt get killed immediately after respawning
        //Tween effect
        var tweenPos = this.tweens.add({
            targets: this.player,
            y: config.height - 200,
            x: config.width / 2,
            ease: 'Power1',
            duration: 1000,
            repeat: 0,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this,
        });
        
    }
}