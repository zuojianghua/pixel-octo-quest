import { Card, CardSystem } from './cardSystem';
import { AttributeBonus } from './realmSystem';

export interface Combatant {
  id: string;
  name: string;
  maxHealth: number;
  currentHealth: number;
  energy: number;
  maxEnergy: number;
  defense: number;
  attack: number;
  deck: Card[];
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  buffs: {
    doubleNextDamage: boolean;
    dodgeNextTurn: boolean;
  };
}

export interface CombatLogEntry {
  timestamp: number;
  actor: string;
  action: string;
  details: string;
}

export interface CombatState {
  player: Combatant;
  enemy: Combatant;
  turn: number;
  currentTurn: 'player' | 'enemy';
  logs: CombatLogEntry[];
  isOver: boolean;
  winner: 'player' | 'enemy' | null;
}

export interface CombatReward {
  exp: number;
  spiritStone: number;
}

export class CombatSystem {
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static createCombatant(
    id: string,
    name: string,
    cardIds: string[],
    bonuses: AttributeBonus,
    baseHealth: number = 100,
    baseEnergy: number = 3
  ): Combatant {
    const deck = cardIds.map(id => CardSystem.getCardById(id)).filter((card): card is Card => card !== undefined);
    const shuffledDeck = this.shuffleArray(deck);
    
    return {
      id,
      name,
      maxHealth: baseHealth + bonuses.health,
      currentHealth: baseHealth + bonuses.health,
      energy: baseEnergy,
      maxEnergy: baseEnergy,
      defense: bonuses.defense,
      attack: bonuses.attack,
      deck,
      hand: [],
      drawPile: shuffledDeck,
      discardPile: [],
      buffs: {
        doubleNextDamage: false,
        dodgeNextTurn: false,
      },
    };
  }

  static drawCards(combatant: Combatant, count: number): Combatant {
    const newCombatant = { ...combatant, hand: [...combatant.hand] };
    
    for (let i = 0; i < count; i++) {
      if (newCombatant.drawPile.length === 0) {
        if (newCombatant.discardPile.length === 0) break;
        newCombatant.drawPile = this.shuffleArray(newCombatant.discardPile);
        newCombatant.discardPile = [];
      }
      
      const card = newCombatant.drawPile.pop();
      if (card) {
        newCombatant.hand.push(card);
      }
    }
    
    return newCombatant;
  }

  static createCombatState(
    playerCardIds: string[],
    playerBonuses: AttributeBonus,
    enemyCardIds: string[],
    enemyBonuses: AttributeBonus
  ): CombatState {
    const player = this.drawCards(this.createCombatant('player', '玩家', playerCardIds, playerBonuses), 5);
    const enemy = this.drawCards(this.createCombatant('enemy', '敌人', enemyCardIds, enemyBonuses, 80, 2), 4);
    
    return {
      player,
      enemy,
      turn: 1,
      currentTurn: 'player',
      logs: [],
      isOver: false,
      winner: null,
    };
  }

  static addLog(state: CombatState, actor: string, action: string, details: string): CombatState {
    return {
      ...state,
      logs: [
        ...state.logs,
        { timestamp: Date.now(), actor, action, details },
      ],
    };
  }

  static applyCardEffect(
    state: CombatState,
    actor: 'player' | 'enemy',
    card: Card
  ): CombatState {
    let newState = { ...state };
    const attacker = newState[actor];
    const defender = newState[actor === 'player' ? 'enemy' : 'player'];
    let newAttacker = { ...attacker };
    let newDefender = { ...defender };

    // Apply card cost
    newAttacker.energy -= card.cost;

    // Process card effects
    switch (card.type) {
      case 'attack':
        if (card.damage) {
          let damage = card.damage + newAttacker.attack;
          if (newAttacker.buffs.doubleNextDamage) {
            damage *= 2;
            newAttacker.buffs.doubleNextDamage = false;
          }
          if (newDefender.buffs.dodgeNextTurn) {
            newDefender.buffs.dodgeNextTurn = false;
            newState = this.addLog(newState, newAttacker.name, '闪避', `${newDefender.name}闪避了攻击！`);
          } else {
            const actualDamage = Math.max(0, damage - newDefender.defense);
            newDefender.currentHealth = Math.max(0, newDefender.currentHealth - actualDamage);
            newState = this.addLog(newState, newAttacker.name, '攻击', `对${newDefender.name}造成${actualDamage}点伤害！`);
          }
        }
        break;
      case 'defense':
        if (card.defense) {
          newAttacker.defense += card.defense;
          newState = this.addLog(newState, newAttacker.name, '防御', `获得${card.defense}点护甲！`);
        }
        break;
      case 'support':
        if (card.heal) {
          newAttacker.currentHealth = Math.min(newAttacker.maxHealth, newAttacker.currentHealth + card.heal);
          newState = this.addLog(newState, newAttacker.name, '治疗', `恢复${card.heal}点生命！`);
        }
        if (card.effect === 'gain_2_energy') {
          newAttacker.energy += 2;
          newState = this.addLog(newState, newAttacker.name, '聚气', '获得2点灵力！');
        }
        if (card.effect === 'draw_2_cards') {
          newAttacker = this.drawCards(newAttacker, 2);
          newState = this.addLog(newState, newAttacker.name, '抽牌', '抽取2张卡牌！');
        }
        break;
      case 'special':
        if (card.effect === 'dodge_next_turn') {
          newAttacker.buffs.dodgeNextTurn = true;
          newState = this.addLog(newState, newAttacker.name, '闪避', '下回合将闪避攻击！');
        }
        if (card.effect === 'double_next_damage') {
          newAttacker.buffs.doubleNextDamage = true;
          newState = this.addLog(newState, newAttacker.name, '狂暴', '下次攻击伤害翻倍！');
        }
        if (card.damage && card.heal) {
          let damage = card.damage + newAttacker.attack;
          const actualDamage = Math.max(0, damage - newDefender.defense);
          newDefender.currentHealth = Math.max(0, newDefender.currentHealth - actualDamage);
          newAttacker.currentHealth = Math.min(newAttacker.maxHealth, newAttacker.currentHealth + card.heal);
          newState = this.addLog(newState, newAttacker.name, '吸星', `造成${actualDamage}点伤害并恢复${card.heal}点生命！`);
        }
        break;
    }

    // Discard the card
    newAttacker.hand = newAttacker.hand.filter(c => c.id !== card.id);
    newAttacker.discardPile.push(card);

    // Update state
    if (actor === 'player') {
      newState.player = newAttacker;
      newState.enemy = newDefender;
    } else {
      newState.enemy = newAttacker;
      newState.player = newDefender;
    }

    return newState;
  }

  static aiChooseCard(combatant: Combatant): Card | null {
    const playableCards = combatant.hand.filter(card => card.cost <= combatant.energy);
    if (playableCards.length === 0) return null;

    // Simple AI: prioritize attack, then defense, then support, then special
    const priorityOrder: ('attack' | 'defense' | 'support' | 'special')[] = ['attack', 'defense', 'support', 'special'];
    for (const type of priorityOrder) {
      const cardsOfType = playableCards.filter(card => card.type === type);
      if (cardsOfType.length > 0) {
        // Choose the most expensive card of this type
        return cardsOfType.reduce((a, b) => a.cost > b.cost ? a : b);
      }
    }

    return playableCards[0];
  }

  static executeTurn(state: CombatState): CombatState {
    if (state.isOver) return state;

    let newState = { ...state };
    const currentCombatant = newState[newState.currentTurn];

    // Reset energy
    let newCombatant = { ...currentCombatant, energy: currentCombatant.maxEnergy };

    // Draw a card
    newCombatant = this.drawCards(newCombatant, 1);

    // Update state with new combatant
    if (newState.currentTurn === 'player') {
      newState.player = newCombatant;
    } else {
      newState.enemy = newCombatant;
    }

    // Play cards until no more playable cards
    let shouldContinue = true;
    while (shouldContinue && !newState.isOver) {
      const combatant = newState[newState.currentTurn];
      const card = this.aiChooseCard(combatant);
      
      if (card) {
        newState = this.applyCardEffect(newState, newState.currentTurn, card);
        
        // Check if combat is over
        if (newState.player.currentHealth <= 0) {
          newState.isOver = true;
          newState.winner = 'enemy';
          newState = this.addLog(newState, '系统', '战斗结束', '敌人获胜！');
          shouldContinue = false;
        } else if (newState.enemy.currentHealth <= 0) {
          newState.isOver = true;
          newState.winner = 'player';
          newState = this.addLog(newState, '系统', '战斗结束', '玩家获胜！');
          shouldContinue = false;
        }
      } else {
        shouldContinue = false;
      }
    }

    // Switch turns if combat not over
    if (!newState.isOver) {
      newState.currentTurn = newState.currentTurn === 'player' ? 'enemy' : 'player';
      if (newState.currentTurn === 'player') {
        newState.turn += 1;
      }
    }

    return newState;
  }

  static runFullCombat(
    playerCardIds: string[],
    playerBonuses: AttributeBonus
  ): { state: CombatState; rewards: CombatReward } {
    // Create enemy deck (basic cards)
    const enemyCardIds = ['attack-1', 'attack-1', 'defense-1', 'support-1', 'attack-1'];
    const enemyBonuses = { attack: 2, defense: 1, health: 20 };

    let state = this.createCombatState(playerCardIds, playerBonuses, enemyCardIds, enemyBonuses);
    state = this.addLog(state, '系统', '战斗开始', '玩家VS敌人！');

    // Run turns until combat is over
    let turnCount = 0;
    const maxTurns = 100; // Safety limit
    while (!state.isOver && turnCount < maxTurns) {
      state = this.executeTurn(state);
      turnCount++;
    }

    // Calculate rewards
    const rewards: CombatReward = {
      exp: state.winner === 'player' ? 80 + state.turn * 5 : 20,
      spiritStone: state.winner === 'player' ? 30 + state.turn * 3 : 10,
    };

    return { state, rewards };
  }
}
