export class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.add
      .text(400, 300, "GAME OVER\nPress SPACE to Restart", {
        fontSize: "32px",
        color: "#ff5555",
        align: "center",
      })
      .setOrigin(0.5);

    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("Game"); // 실제 게임 씬 이름
    });
  }
}
