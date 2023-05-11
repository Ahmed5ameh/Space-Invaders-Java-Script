var gameSettings = {
    playerSpeed: 450,
    //maxPowerups: 2,
    //powerUpVel: 50,
}

var config = {
    // width: 704,
    // height: 748,
    width: 800,/*696.47058823529,*/
    height: 740,
    //backgroundColor: "yellow",
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
            arcade: {
            //gravity: { y: 100 },
            //debug: true
        }
    }
}
var game = new Phaser.Game(config);





//#region => DAY 6 CODE 2D PLATFORMER GAME
// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 100 },
//             debug: true
//         }
//         },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// }

// var game = new Phaser.Game(config);
// var starpos = {x:100, y:200}
// var platforms;
// var player
// var scoreTxt
// function preload(){
//     this.load.image("backgroundSky", "Assets/sky.png")
//     this.load.image("platform", "Assets/platform.png")
//     this.load.image("star", "Assets/star.png")
//     this.load.spritesheet("player","Assets/dude.png", {frameWidth:32 ,frameHeight:48})      //load player sprite sheet
// }

// //Circle collider
// function create() {
//     this.add.image(400, 300, "backgroundSky");
//     platforms = this.physics.add.staticGroup();

//     platforms.create(400, 600 - (32 / 2), "platform").setScale(2.0).refreshBody();;
//     platforms.create(0, 300 - (32 / 2), "platform");
//     platforms.create(700, 450 - (32 / 2), "platform").setScale(0.5, 2).refreshBody();
//     platforms.create(750, 250 - (32 / 2), "platform")
//     platforms.create(100, 100 - (32 / 2), "platform")

//     /*
//     for (let i = 0; i < 5; i++) {
//         var star = this.physics.add.image(starpos.x, starpos.y, "star");
//         star.setCollideWorldBounds(true,0,0.5)      //add collider
//         this.physics.add.collider(star, platforms)
//         star.setBounceY(0.5)
//         starpos.x += 50 + Math.random() * 100;
//         starpos.y += Math.random() * 100;
//     }
//     */

//     stars = this.physics.add.group({    //add stars to group
//         key: "star",
//         repeat: 7,
//         setXY: {x:100, y:200, stepX: 80 + Math.random() * 100}
//     });

//     stars.children.entries.forEach((i) => {
//         i.setCollideWorldBounds(true);
//     });

//     this.physics.add.collider(stars, platforms)         //collision between stars and platforms

//     player =  this.physics.add.sprite(300, 100, "player")
//     player.setCollideWorldBounds(true, 0.5, 0.5);
//     player.setBounce(0.25)

//     this.physics.add.collider(player, platforms);       //collision between player and platforms
//     //this.physics.add.collider(player, stars);       ////collision between player and stars


//     this.anims.create({     
//         key: "left",
//         frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3}),
//         frameRate: 10,
//         repeat: -1
//     })
//     this.anims.create({
//         key: "right",
//         frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8}),
//         frameRate: 10,
//         repeat: -1
//     })
//     this.anims.create({
//         key: "idle",
//         frames: this.anims.generateFrameNumbers("player", { start: 4, end: 4}),
//         frameRate: 10,
//         repeat: -1
//     })

    
//     this.physics.add.overlap(stars, player, onPlayerOverlapEnter, null, this)
//     scoreTxt = this.add.text(625,10, "Score: 0", {font: "30px Cursive", color: "gold"})

//     userInput = this.input.keyboard.createCursorKeys();

// }

// function update(){
    
//     if (userInput.right.isDown) {
//         player.anims.play("right", true)
//         player.setVelocityX(80);
//     }
//     else if (userInput.left.isDown) {
//         player.anims.play("left", true)
//         player.setVelocityX(-80);
//     } else {
//         player.anims.play("idle", true)
//         player.setVelocityX(0);
//     }
//     if (userInput.space.isDown && player.body.touching.down) {
//         player.setVelocityY(-200);
//     }


// }

// var score = 0
// function onPlayerOverlapEnter(player, star){
//     star.disableBody(true, true)
//     scoreTxt.text = `Score: ${++score}`
// }
//#endregion