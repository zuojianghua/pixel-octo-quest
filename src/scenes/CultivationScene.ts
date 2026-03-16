import * as Phaser from 'phaser';
import { gameStore, cultivationHelpers } from '../stores/gameStore';

export class CultivationScene extends Phaser.Scene {
  private unsubscribeStore: (() => void) | null = null;
  private cultivationText!: Phaser.GameObjects.Text;
  private expText!: Phaser.GameObjects.Text;
  private resourcesText!: Phaser.GameObjects.Text;
  private bonusesText!: Phaser.GameObjects.Text;
  private breakthroughBtn!: Phaser.GameObjects.Text;
  private cultivateBtn!: Phaser.GameObjects.Text;

  constructor() {
    super('CultivationScene');
  }

  create() {
    this.add.text(400, 30, '修仙界面', {
      fontSize: '32px',
      color: '#fbbf24',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.cultivationText = this.add.text(400, 80, '', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.expText = this.add.text(400, 120, '', {
      fontSize: '18px',
      color: '#a78bfa',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.resourcesText = this.add.text(400, 160, '', {
      fontSize: '18px',
      color: '#4ade80',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.bonusesText = this.add.text(400, 200, '', {
      fontSize: '16px',
      color: '#60a5fa',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.cultivateBtn = this.add.text(400, 280, '修炼 (+10 经验)', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#7c3aed',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();

    this.cultivateBtn.on('pointerover', () => this.cultivateBtn.setBackgroundColor('#8b5cf6'));
    this.cultivateBtn.on('pointerout', () => this.cultivateBtn.setBackgroundColor('#7c3aed'));
    this.cultivateBtn.on('pointerdown', () => {
      const state = gameStore.getState();
      const newState = cultivationHelpers.addExp(state, 10);
      gameStore.setState(newState);
    });

    this.breakthroughBtn = this.add.text(400, 350, '突破', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#dc2626',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();

    this.breakthroughBtn.on('pointerover', () => {
      const state = gameStore.getState();
      if (cultivationHelpers.isReadyForBreakthrough(state)) {
        this.breakthroughBtn.setBackgroundColor('#ef4444');
      }
    });
    this.breakthroughBtn.on('pointerout', () => this.updateBreakthroughButton());
    this.breakthroughBtn.on('pointerdown', () => {
      const state = gameStore.getState();
      const result = cultivationHelpers.attemptBreakthrough(state);
      gameStore.setState(result.state);
      if (result.success) {
        alert('恭喜突破成功！');
      } else {
        alert('突破失败，损失部分经验...');
      }
    });

    const deckBtn = this.add.text(200, 450, '组牌', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#0891b2',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();

    deckBtn.on('pointerover', () => deckBtn.setBackgroundColor('#06b6d4'));
    deckBtn.on('pointerout', () => deckBtn.setBackgroundColor('#0891b2'));
    deckBtn.on('pointerdown', () => this.scene.start('DeckBuildingScene'));

    const combatBtn = this.add.text(600, 450, '战斗', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#059669',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setInteractive();

    combatBtn.on('pointerover', () => combatBtn.setBackgroundColor('#10b981'));
    combatBtn.on('pointerout', () => combatBtn.setBackgroundColor('#059669'));
    combatBtn.on('pointerdown', () => this.scene.start('CombatScene'));

    const backButton = this.add.text(100, 550, '返回主菜单', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerover', () => backButton.setBackgroundColor('#666666'));
    backButton.on('pointerout', () => backButton.setBackgroundColor('#444444'));
    backButton.on('pointerdown', () => this.scene.start('MainMenuScene'));

    this.unsubscribeStore = gameStore.subscribe(() => this.render());
    this.render();
  }

  render() {
    const state = gameStore.getState();
    const display = cultivationHelpers.getDisplayString(state);
    const bonuses = cultivationHelpers.getAttributeBonuses(state);

    this.cultivationText.setText(`境界: ${display}`);
    this.expText.setText(`经验: ${state.cultivation.exp}/${state.cultivation.maxExp}`);
    this.resourcesText.setText(`灵石: ${state.resources.spiritStone}`);
    this.bonusesText.setText(`攻击+${bonuses.attack} | 防御+${bonuses.defense} | 生命+${bonuses.health}`);

    this.updateBreakthroughButton();
  }

  updateBreakthroughButton() {
    const state = gameStore.getState();
    const isReady = cultivationHelpers.isReadyForBreakthrough(state);
    if (isReady) {
      this.breakthroughBtn.setText('突破（可突破！）');
      this.breakthroughBtn.setBackgroundColor('#dc2626');
      this.breakthroughBtn.setInteractive();
    } else {
      this.breakthroughBtn.setText('突破（条件不足）');
      this.breakthroughBtn.setBackgroundColor('#6b7280');
      this.breakthroughBtn.disableInteractive();
    }
  }

  destroy() {
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
    }
    super.destroy();
  }
}
