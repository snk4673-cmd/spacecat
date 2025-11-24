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
    this.user.flipX = true;

    this.upkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
  }

  update() {
    // 배경 스크롤
    this.background.tilePositionX += 2;

    if (this.upkey.isDown) {
      this.user.y -= 3;
    }
    if (this.downKey.isDown) {
      this.user.y += 3;
    }
    if (this.leftkey.isDown) {
      this.user.x -= 3;
    }
    if (this.rightKey.isDown) {
      this.user.x += 3;
    }
  }
}
