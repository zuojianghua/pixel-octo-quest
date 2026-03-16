import * as Phaser from 'phaser';
import { gameStore } from '../stores/gameStore';
import { CardSystem, Card } from '../systems/cardSystem';

export class DeckBuildingScene extends Phaser.Scene {
  private unsubscribeStore: (() => void) | null = null;
  private unlockedCardsContainer: Phaser.GameObjects.Container;
  private deckContainer: Phaser.GameObjects.Container;

  constructor() {
    super('DeckBuildingScene');
  }

  create() {
    this.add.text(400, 50, '组牌界面', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.unlockedCardsContainer = this.add.container(50, 120);
    this.deckContainer = this.add.container(450, 120);

    const backButton = this.add.text(100, 550, '返回修仙', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#444444',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerover', () => backButton.setBackgroundColor('#666666'));
    backButton.on('pointerout', () => backButton.setBackgroundColor('#444444'));
    backButton.on('pointerdown', () => this.scene.start('CultivationScene'));

    this.unsubscribeStore = gameStore.subscribe(() => this.render());
    this.render();
  }

  render() {
    const state = gameStore.getState();
    
    // Refresh unlocked cards
    gameStore.refreshUnlockedCards();
    const updatedState = gameStore.getState();

    // Render unlocked cards
    this.unlockedCardsContainer.removeAll(true);
    this.unlockedCardsContainer.add(this.add.text(0, 0, '可用卡牌', { fontSize: '20px', color: '#ffffff' }));
    
    const unlockedCards = updatedState.unlockedCards.map(id => CardSystem.getCardById(id)).filter(Boolean) as Card[];
    unlockedCards.forEach((card, index) => {
      const y = 40 + index * 60;
      const isInDeck = updatedState.deck.includes(card.id);
      const bgColor = isInDeck ? '#2d4a2d' : '#333333';

      const cardBg = this.add.rectangle(0, y, 300, 50, bgColor).setOrigin(0).setInteractive();
      const cardText = this.add.text(10, y + 5, `${card.name} (${card.type})`, { fontSize: '16px', color: '#ffffff' });
      const cardDesc = this.add.text(10, y + 28, card.description, { fontSize: '12px', color: '#aaaaaa' });

      if (!isInDeck) {
        cardBg.on('pointerdown', () => gameStore.addCardToDeck(card.id));
        cardBg.on('pointerover', () => cardBg.fillColor = 0x555555);
        cardBg.on('pointerout', () => cardBg.fillColor = 0x333333);
      }

      this.unlockedCardsContainer.add([cardBg, cardText, cardDesc]);
    });

    // Render deck
    this.deckContainer.removeAll(true);
    this.deckContainer.add(this.add.text(0, 0, `当前卡组 (${updatedState.deck.length}/10)`, { fontSize: '20px', color: '#ffffff' }));
    
    updatedState.deck.forEach((cardId, index) => {
      const card = CardSystem.getCardById(cardId);
      if (!card) return;

      const y = 40 + index * 60;
      const cardBg = this.add.rectangle(0, y, 300, 50, 0x443333).setOrigin(0).setInteractive();
      const cardText = this.add.text(10, y + 5, `${card.name} (${card.type})`, { fontSize: '16px', color: '#ffffff' });
      const removeBtn = this.add.text(270, y + 10, '×', { fontSize: '24px', color: '#ff6666' }).setOrigin(0.5).setInteractive();

      removeBtn.on('pointerdown', () => gameStore.removeCardFromDeck(cardId));
      removeBtn.on('pointerover', () => removeBtn.setColor('#ff9999'));
      removeBtn.on('pointerout', () => removeBtn.setColor('#ff6666'));

      this.deckContainer.add([cardBg, cardText, removeBtn]);
    });
  }

  destroy() {
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
    }
    super.destroy();
  }
}
