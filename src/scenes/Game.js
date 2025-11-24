export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("background", "assets/space.png");
    this.load.image("user", "assets/cat.png");
  }

  create() {
    this.background = this.add.tileSprite(400, 300, 1920, 720, "background");

    this.user = this.add.image(400, 350, "user");
    this.user.flipX = true;

    this.score = 0;
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "24px",
      color: "#fff",
    });

    // 키 입력
    this.upkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    // 장애물 배열
    this.obstacles = [];

    this.createObstacles(7);
  }

  createObstacles(count) {
    const width = this.scale.width;
    const height = this.scale.height;

    for (let i = 0; i < count; i++) {
      const dom = this.add.dom(
        width + Phaser.Math.Between(50, 500), // 초기 x 랜덤
        Phaser.Math.Between(100, height - 100), // y 랜덤
        "div"
      );

      const classes = [
        "planet-obstacle",
        "planet-obstacle2",
        "planet-obstacle3",
      ];
      dom.node.classList.add(classes[i % 3]);

      this.obstacles.push({
        dom,
        radius: 40,
        baseSpeed: Phaser.Math.FloatBetween(2, 4), // 개별 속도 랜덤
      });
    }
  }

  gameOver() {
    this.scene.start("GameOver");
  }

  update(time, delta) {
    // 배경 스크롤
    this.background.tilePositionX += 2;

    const speed = 3;

    // 플레이어 이동
    if (this.upkey.isDown) this.user.y -= speed;
    if (this.downKey.isDown) this.user.y += speed;
    if (this.leftkey.isDown) {
      this.user.x -= speed;
    }
    if (this.rightKey.isDown) {
      this.user.x += speed;
    }

    // 화면 밖 못 나가게
    const halfW = this.user.displayWidth * 0.5;
    const halfH = this.user.displayHeight * 0.5;
    const width = this.scale.width;
    const height = this.scale.height;

    this.user.x = Phaser.Math.Clamp(this.user.x, halfW, width - halfW);
    this.user.y = Phaser.Math.Clamp(this.user.y, halfH, height - halfH);

    // 점수 & 난이도
    this.score += delta * 0.01;
    this.scoreText.setText(`Score: ${Math.floor(this.score)}`);

    const difficulty = 1 + this.score / 1000; // 점수 높을수록 난이도 상승

    // 장애물들 업데이트
    const rUser = halfW;

    for (const obj of this.obstacles) {
      const dom = obj.dom;
      const rPlanet = obj.radius;

      // 장애물 이동
      dom.x -= obj.baseSpeed * difficulty;

      // 화면 밖 → 오른쪽에서 랜덤 재등장
      if (dom.x < -rPlanet) {
        dom.x = width + Phaser.Math.Between(50, 400);
        dom.y = Phaser.Math.Between(100, height - 100);
      }

      // 충돌 체크
      const dist = Phaser.Math.Distance.Between(
        this.user.x,
        this.user.y,
        dom.x,
        dom.y
      );

      if (dist < rUser + rPlanet) {
        this.gameOver();
        return;
      }
    }
  }
}
