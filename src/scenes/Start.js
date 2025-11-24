export class Start extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
    // 이미지 로드
    this.load.image("background", "assets/space.png");
    this.load.image("logo", "assets/phaser.png");
    this.load.image("user", "assets/cat.png");

    // 로딩 텍스트
    this.loadingText = this.add
      .text(400, 300, "Loading...", {
        fontSize: "24px",
        color: "#fff",
      })
      .setOrigin(0.5);

    // 로딩 퍼센트 업데이트
    this.load.on("progress", (value) => {
      this.loadingText.setText(`Loading... ${Math.floor(value * 100)}%`);
    });
  }

  create() {
    // 로딩 텍스트는 이제 필요 없으니 제거
    this.loadingText.destroy();

    // 배경 (스크롤할 거면 tileSprite 사용)
    this.background = this.add.tileSprite(
      400, // x
      300, // y
      1920, // width (게임 해상도에 맞게)
      720, // height
      "background"
    );

    // 로고 / 유저 이미지 생성
    this.logo = this.add.image(400, 150, "logo");
    this.user = this.add.image(400, 350, "user");

    // 트윈 애니메이션 (this.logo / this.user 사용)
    this.tweens.add({
      targets: this.logo,
      y: 200,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      loop: -1,
    });

    this.tweens.add({
      targets: this.user,
      y: 400,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      loop: -1,
    });

    // 시작 안내 텍스트
    this.add
      .text(400, 300, "Press SPACE to Start", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("Game");
    });
  }

  update() {
    // 배경 스크롤
    this.background.tilePositionX += 2;
  }
}
