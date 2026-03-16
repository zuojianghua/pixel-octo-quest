import * as Phaser from 'phaser';
import { gameStore } from './stores/gameStore';
import { loadGame, saveGame } from './utils/save';
import { MainMenuScene } from './scenes/MainMenuScene';
import { CultivationScene } from './scenes/CultivationScene';
import { DeckBuildingScene } from './scenes/DeckBuildingScene';
import { CombatScene } from './scenes/CombatScene';
import { SettingsScene } from './scenes/SettingsScene';

const savedState = loadGame();
gameStore.setState(savedState);

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [MainMenuScene, CultivationScene, DeckBuildingScene, CombatScene, SettingsScene]
};

new Phaser.Game(config);
