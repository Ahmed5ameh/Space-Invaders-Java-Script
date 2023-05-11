class Beam extends Phaser.GameObjects.Sprite{   //inherits from sprite class
    constructor (scene){    //gets a reference to the scene
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y, "beam");
        scene.add.existing(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250 * 3;
        this.setScale(globalScale - 0.25);
        scene.projectiles.add(this);
    }

    update(){
        if(this.y < 5 ){
          this.destroy();
        }
    }
}