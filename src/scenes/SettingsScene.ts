import * as Phaser from 'phaser';
import { gameStore } from '../stores/gameStore';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super('SettingsScene');
  }

  create() {
    this.add.text(400, 100, '设置界面', {
      fontSize: '40px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    const resetButton = this.add.text(400, 280, '重置游戏', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#dc2626',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();

    resetButton.on('pointerover', () => resetButton.setBackgroundColor('#ef4444'));
    resetButton.on('pointerout', () => resetButton.setBackgroundColor('#dc2626'));
    resetButton.on('pointerdown', () => {
      if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
        gameStore.reset();
        alert('游戏已重置！');
        this.scene.start('MainMenuScene');
      }
    });

    const backButton = this.add.text(100, 550, '返回主菜单', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerover', () => backButton.setBackgroundColor('#666666'));
    backButton.on('pointerout', () => backButton.setBackgroundColor('#444444'));
    backButton.on('pointerdown', () => this.scene.start('MainMenuScene'));
  }
}
