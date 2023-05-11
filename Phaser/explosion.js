//For feedback when the player gets destroyed by enemy ships
class Explosion extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "explosion");
        this.setDisplaySize(65, 65);
        scene.add.existing(this);
        this.play("explode");
    }
}