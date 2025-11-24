export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // 이미지 로드
    this.load.image("background", "assets/space.png");
    this.load.image("user", "assets/cat.png");
    this.load.image("obstacle", "assets/planet.jpg");
  }

  create() {
    this.background = this.add.tileSprite(
      400, // x
      300, // y
      1920, // width (게임 해상도에 맞게)
      720, // height
      "background"
    );
    this.user = this.add.image(400, 350, "user");

    this.tweens.add({
      targets: this.user,
      y: 400,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      loop: -1,
    });
  }

  update() {
    // 배경 스크롤
    this.background.tilePositionX += 2;
  }
}
