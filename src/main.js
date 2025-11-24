import { Start } from "./scenes/Start.js";
import { Game } from "./scenes/Game.js";
import { GameOver } from "./scenes/GameOver.js";

const config = {
  type: Phaser.AUTO,
  title: "Space Cat",
  description: "",
  parent: "game-container",
  width: 1280,
  height: 720,
  backgroundColor: "#000000",
  pixelArt: false,
  dom: {
    createContainer: true,
  },
  scene: [Start, Game, GameOver],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
