////////////////////////////////////////////////////////
//  We load everything in this scene before the actual
//  start of the game
////////////////////////////////////////////////////////
class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");  //Scene identifier (name)
    }


                                        /*PRELOAD*/

    preload() {
        this.load.image("background", "assets/images/background.png");
        this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
            frameWidth: 32,
            frameHeight: 16,
        });
        this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        
        //font
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        
        //audio
        this.load.audio("audio_beam", "assets/sounds/beam.ogg")
        this.load.audio("audio_explosion", "assets/sounds/explosion.ogg")
        this.load.audio("audio_pickup", "assets/sounds/pickup.ogg")
        this.load.audio("music", "assets/sounds/sci-fi_platformer12.ogg")
        

    }


                                        /*CREATE*/

    create() {
        //this.add.text(20, 20, "Loading game...");
        //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);      //addbitmapText(pos, pos, fontID, what to display, fontSize)
        this.scene.start("playGame");

        //Create our animations
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1,
            }),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "grey",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3,
            }),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({     //player animation
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({     //beam shooting animation
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 15,
            repeat: -1,
        });

    }
}