import * as Phaser from 'phaser';
import { gameStore, cultivationHelpers } from '../stores/gameStore';
import { CombatSystem, CombatState, CombatReward } from '../systems/combatSystem';

export class CombatScene extends Phaser.Scene {
  private combatState!: CombatState;
  private combatRewards!: CombatReward;
  private logsText!: Phaser.GameObjects.Text;
  private playerHealthText!: Phaser.GameObjects.Text;
  private enemyHealthText!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;

  constructor() {
    super('CombatScene');
  }

  create() {
    // Add background
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e).setOrigin(0.5);

    // Title
    this.add.text(400, 50, '自动战斗中...', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Player info
    this.add.text(100, 120, '玩家', {
      fontSize: '24px',
      color: '#4ade80',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.playerHealthText = this.add.text(100, 160, 'HP: 100/100', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Enemy info
    this.add.text(700, 120, '敌人', {
      fontSize: '24px',
      color: '#f87171',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.enemyHealthText = this.add.text(700, 160, 'HP: 80/80', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Logs area
    this.add.text(400, 200, '战斗日志', {
      fontSize: '20px',
      color: '#a78bfa',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.logsText = this.add.text(50, 230, '', {
      fontSize: '14px',
      color: '#e5e7eb',
      fontFamily: 'monospace',
      wordWrap: { width: 700 }
    });

    // Result text
    this.resultText = this.add.text(400, 450, '', {
      fontSize: '36px',
      color: '#fbbf24',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Start combat
    this.startCombat();
  }

  startCombat() {
    const state = gameStore.getState();
    const playerBonuses = cultivationHelpers.getAttributeBonuses(state);
    const { state: combatState, rewards } = CombatSystem.runFullCombat(state.deck, playerBonuses);
    this.combatState = combatState;
    this.combatRewards = rewards;

    // Animate the combat logs
    this.animateCombatLogs(0);
  }

  animateCombatLogs(index: number) {
    if (index < this.combatState.logs.length) {
      const log = this.combatState.logs[index];
      const currentLogs = this.logsText.text;
      this.logsText.setText(currentLogs + `[${log.actor}] ${log.action}: ${log.details}\n`);

      // Update health
      if (this.combatState.player) {
        this.playerHealthText.setText(`HP: ${this.combatState.player.currentHealth}/${this.combatState.player.maxHealth}`);
      }
      if (this.combatState.enemy) {
        this.enemyHealthText.setText(`HP: ${this.combatState.enemy.currentHealth}/${this.combatState.enemy.maxHealth}`);
      }

      // Next log with delay
      this.time.delayedCall(500, () => this.animateCombatLogs(index + 1));
    } else {
      // Combat finished, show result
      this.showCombatResult();
    }
  }

  showCombatResult() {
    if (this.combatState.winner === 'player') {
      this.resultText.setText(`战斗胜利！\n获得经验: ${this.combatRewards.exp}\n获得灵石: ${this.combatRewards.spiritStone}`);
      
      // Update game store
      const currentState = gameStore.getState();
      const newState = cultivationHelpers.addExp(currentState, this.combatRewards.exp);
      gameStore.setState({
        ...newState,
        resources: {
          ...newState.resources,
          spiritStone: newState.resources.spiritStone + this.combatRewards.spiritStone
        }
      });
    } else {
      this.resultText.setText(`战斗失败...\n获得经验: ${this.combatRewards.exp}\n获得灵石: ${this.combatRewards.spiritStone}`);
      
      // Update game store with consolation rewards
      const currentState = gameStore.getState();
      const newState = cultivationHelpers.addExp(currentState, this.combatRewards.exp);
      gameStore.setState({
        ...newState,
        resources: {
          ...newState.resources,
          spiritStone: newState.resources.spiritStone + this.combatRewards.spiritStone
        }
      });
    }

    // Back button
    const backButton = this.add.text(400, 550, '返回修炼界面', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#4f46e5',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerover', () => backButton.setBackgroundColor('#6366f1'));
    backButton.on('pointerout', () => backButton.setBackgroundColor('#4f46e5'));
    backButton.on('pointerdown', () => this.scene.start('CultivationScene'));
  }
}
