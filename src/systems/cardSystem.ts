// Card types
export type CardType = 'attack' | 'defense' | 'support' | 'special';

// Card unlock condition
export interface CardUnlockCondition {
  realm?: string;
  resources?: Record<string, number>;
}

// Card interface
export interface Card {
  id: string;
  name: string;
  type: CardType;
  description: string;
  cost: number;
  damage?: number;
  defense?: number;
  heal?: number;
  effect?: string;
  unlockCondition: CardUnlockCondition;
}

// All available cards
export const ALL_CARDS: Card[] = [
  // Attack cards (5+)
  {
    id: 'attack-1',
    name: '火球术',
    type: 'attack',
    description: '发射火球攻击敌人',
    cost: 1,
    damage: 12,
    unlockCondition: { realm: '炼气期一层' }
  },
  {
    id: 'attack-2',
    name: '飞剑术',
    type: 'attack',
    description: '飞剑远程攻击',
    cost: 2,
    damage: 20,
    unlockCondition: { realm: '炼气期三层' }
  },
  {
    id: 'attack-3',
    name: '雷霆万钧',
    type: 'attack',
    description: '召唤雷电',
    cost: 3,
    damage: 32,
    unlockCondition: { realm: '筑基期一层' }
  },
  {
    id: 'attack-4',
    name: '烈焰风暴',
    type: 'attack',
    description: '火焰风暴席卷',
    cost: 4,
    damage: 45,
    unlockCondition: { realm: '筑基期三层' }
  },
  {
    id: 'attack-5',
    name: '天罡斩',
    type: 'attack',
    description: '威力强大的斩击',
    cost: 2,
    damage: 24,
    unlockCondition: { realm: '炼气期五层' }
  },

  // Defense cards (5+)
  {
    id: 'defense-1',
    name: '护体灵光',
    type: 'defense',
    description: '基础防御',
    cost: 1,
    defense: 6,
    unlockCondition: { realm: '炼气期一层' }
  },
  {
    id: 'defense-2',
    name: '玄武盾',
    type: 'defense',
    description: '坚固防御',
    cost: 2,
    defense: 12,
    unlockCondition: { realm: '炼气期三层' }
  },
  {
    id: 'defense-3',
    name: '金刚不坏',
    type: 'defense',
    description: '强力防护',
    cost: 3,
    defense: 20,
    unlockCondition: { realm: '筑基期一层' }
  },
  {
    id: 'defense-4',
    name: '八卦阵',
    type: 'defense',
    description: '阵法防御',
    cost: 2,
    defense: 10,
    unlockCondition: { realm: '炼气期五层' }
  },
  {
    id: 'defense-5',
    name: '乾坤罩',
    type: 'defense',
    description: '全方位防护',
    cost: 4,
    defense: 30,
    unlockCondition: { realm: '筑基期三层' }
  },

  // Support cards (5+)
  {
    id: 'support-1',
    name: '回春术',
    type: 'support',
    description: '恢复生命',
    cost: 1,
    heal: 12,
    unlockCondition: { realm: '炼气期一层' }
  },
  {
    id: 'support-2',
    name: '聚气术',
    type: 'support',
    description: '恢复灵力',
    cost: 0,
    effect: 'gain_2_energy',
    unlockCondition: { realm: '炼气期三层' }
  },
  {
    id: 'support-3',
    name: '清心诀',
    type: 'support',
    description: '清除负面效果',
    cost: 2,
    effect: 'clear_debuffs',
    unlockCondition: { realm: '筑基期一层' }
  },
  {
    id: 'support-4',
    name: '灵雨术',
    type: 'support',
    description: '大量恢复生命',
    cost: 3,
    heal: 30,
    unlockCondition: { realm: '筑基期三层' }
  },
  {
    id: 'support-5',
    name: '凝神术',
    type: 'support',
    description: '抽取卡牌',
    cost: 1,
    effect: 'draw_2_cards',
    unlockCondition: { realm: '炼气期五层' }
  },

  // Special cards (5+)
  {
    id: 'special-1',
    name: '移形换位',
    type: 'special',
    description: '下回合闪避',
    cost: 2,
    effect: 'dodge_next_turn',
    unlockCondition: { realm: '炼气期三层' }
  },
  {
    id: 'special-2',
    name: '狂暴术',
    type: 'special',
    description: '下次攻击伤害翻倍',
    cost: 2,
    effect: 'double_next_damage',
    unlockCondition: { realm: '筑基期一层' }
  },
  {
    id: 'special-3',
    name: '时间扭曲',
    type: 'special',
    description: '获得额外回合',
    cost: 4,
    effect: 'extra_turn',
    unlockCondition: { realm: '筑基期五层' }
  },
  {
    id: 'special-4',
    name: '吸星大法',
    type: 'special',
    description: '偷取敌人生命',
    cost: 3,
    damage: 18,
    heal: 18,
    unlockCondition: { realm: '筑基期三层' }
  },
  {
    id: 'special-5',
    name: '分身术',
    type: 'special',
    description: '召唤分身',
    cost: 3,
    effect: 'summon_clone',
    unlockCondition: { realm: '筑基期二层' }
  }
];

// Card system class
export class CardSystem {
  static isCardUnlocked(card: Card, realm: string, resources: Record<string, number>): boolean {
    const { unlockCondition } = card;

    // Check realm requirement
    if (unlockCondition.realm) {
      const realmOrder = [
        '炼气期一层', '炼气期二层', '炼气期三层', '炼气期四层', '炼气期五层',
        '筑基期一层', '筑基期二层', '筑基期三层', '筑基期四层', '筑基期五层'
      ];
      const playerRealmIndex = realmOrder.indexOf(realm);
      const requiredRealmIndex = realmOrder.indexOf(unlockCondition.realm);
      if (playerRealmIndex < requiredRealmIndex) {
        return false;
      }
    }

    // Check resource requirements
    if (unlockCondition.resources) {
      for (const [resource, amount] of Object.entries(unlockCondition.resources)) {
        if ((resources[resource] || 0) < amount) {
          return false;
        }
      }
    }

    return true;
  }

  // Get all unlocked cards
  static getUnlockedCards(realm: string, resources: Record<string, number>): Card[] {
    return ALL_CARDS.filter(card => this.isCardUnlocked(card, realm, resources));
  }

  // Validate deck (max 10 cards)
  static validateDeck(deck: string[]): boolean {
    return deck.length <= 10;
  }

  // Add card to deck (if not already present and deck not full)
  static addCardToDeck(deck: string[], cardId: string): string[] {
    if (deck.length >= 10) {
      return deck;
    }
    if (deck.includes(cardId)) {
      return deck;
    }
    return [...deck, cardId];
  }

  // Remove card from deck
  static removeCardFromDeck(deck: string[], cardId: string): string[] {
    return deck.filter(id => id !== cardId);
  }

  // Get card by id
  static getCardById(cardId: string): Card | undefined {
    return ALL_CARDS.find(card => card.id === cardId);
  }
}
