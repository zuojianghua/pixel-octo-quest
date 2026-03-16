import * as Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    // No assets to load for now - keep simple
  }

  create() {
    const title = this.add.text(400, 150, '像素修仙卡牌', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    const buttonTexts = [
      { text: '修仙', scene: 'CultivationScene' },
      { text: '组牌', scene: 'DeckBuildingScene' },
      { text: '战斗', scene: 'CombatScene' },
      { text: '设置', scene: 'SettingsScene' }
    ];

    buttonTexts.forEach((btn, index) => {
      const y = 250 + index * 80;
      const button = this.add.text(400, y, btn.text, {
        fontSize: '32px',
        color: '#ffffff',
        backgroundColor: '#444444',
        padding: { x: 30, y: 15 }
      }).setOrigin(0.5).setInteractive();

      button.on('pointerover', () => {
        button.setBackgroundColor('#666666');
      });

      button.on('pointerout', () => {
        button.setBackgroundColor('#444444');
      });

      button.on('pointerdown', () => {
        this.scene.start(btn.scene);
      });
    });
  }
}
