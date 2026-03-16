// Cultivation Realm System

// Realm definitions
export enum Realm {
  LIAN_QI = '炼气期',
  ZHU_JI = '筑基期',
  JIN_DAN = '金丹期',
}

export interface RealmConfig {
  name: Realm;
  levels: number;
  baseExp: number;
  expMultiplier: number;
  breakthroughChance: number; // 0-1
  breakthroughPenalty: number; // exp loss percentage on failure 0-1
  attackBonus: number;
  defenseBonus: number;
  healthBonus: number;
}

export const REALM_CONFIGS: Record<Realm, RealmConfig> = {
  [Realm.LIAN_QI]: {
    name: Realm.LIAN_QI,
    levels: 9,
    baseExp: 100,
    expMultiplier: 1.5,
    breakthroughChance: 0.8,
    breakthroughPenalty: 0.2,
    attackBonus: 5,
    defenseBonus: 3,
    healthBonus: 20,
  },
  [Realm.ZHU_JI]: {
    name: Realm.ZHU_JI,
    levels: 9,
    baseExp: 500,
    expMultiplier: 2,
    breakthroughChance: 0.6,
    breakthroughPenalty: 0.3,
    attackBonus: 15,
    defenseBonus: 10,
    healthBonus: 50,
  },
  [Realm.JIN_DAN]: {
    name: Realm.JIN_DAN,
    levels: 9,
    baseExp: 2000,
    expMultiplier: 2.5,
    breakthroughChance: 0.4,
    breakthroughPenalty: 0.4,
    attackBonus: 30,
    defenseBonus: 20,
    healthBonus: 100,
  },
};

export const REALM_ORDER: Realm[] = [Realm.LIAN_QI, Realm.ZHU_JI, Realm.JIN_DAN];

export interface CultivationState {
  realm: Realm;
  level: number; // 1-9
  exp: number;
  maxExp: number;
}

export interface AttributeBonus {
  attack: number;
  defense: number;
  health: number;
}

// Calculate max exp for a given realm and level
export function calculateMaxExp(realm: Realm, level: number): number {
  const config = REALM_CONFIGS[realm];
  return Math.floor(config.baseExp * Math.pow(config.expMultiplier, level - 1));
}

// Initialize cultivation state
export function initializeCultivation(): CultivationState {
  const initialRealm = Realm.LIAN_QI;
  const initialLevel = 1;
  return {
    realm: initialRealm,
    level: initialLevel,
    exp: 0,
    maxExp: calculateMaxExp(initialRealm, initialLevel),
  };
}

// Get cultivation state as a display string (e.g., "炼气期一层")
export function getCultivationDisplay(state: CultivationState): string {
  return `${state.realm}${state.level}层`;
}

// Add experience and handle level up within a realm
export function addExp(state: CultivationState, exp: number): CultivationState {
  let newState = { ...state, exp: state.exp + exp };

  while (newState.exp >= newState.maxExp && newState.level < REALM_CONFIGS[newState.realm].levels) {
    newState.exp -= newState.maxExp;
    newState.level += 1;
    newState.maxExp = calculateMaxExp(newState.realm, newState.level);
  }

  return newState;
}

// Check if ready to breakthrough to next realm
export function isReadyForBreakthrough(state: CultivationState): boolean {
  const config = REALM_CONFIGS[state.realm];
  const currentRealmIndex = REALM_ORDER.indexOf(state.realm);
  return (
    state.level >= config.levels &&
    state.exp >= state.maxExp &&
    currentRealmIndex < REALM_ORDER.length - 1
  );
}

// Attempt breakthrough to next realm
export function attemptBreakthrough(state: CultivationState): {
  success: boolean;
  newState: CultivationState;
} {
  if (!isReadyForBreakthrough(state)) {
    return { success: false, newState: state };
  }

  const config = REALM_CONFIGS[state.realm];
  const currentRealmIndex = REALM_ORDER.indexOf(state.realm);
  const nextRealm = REALM_ORDER[currentRealmIndex + 1];

  const roll = Math.random();
  if (roll < config.breakthroughChance) {
    // Success!
    return {
      success: true,
      newState: {
        realm: nextRealm,
        level: 1,
        exp: 0,
        maxExp: calculateMaxExp(nextRealm, 1),
      },
    };
  } else {
    // Failure - lose some exp
    const expLoss = Math.floor(state.maxExp * config.breakthroughPenalty);
    return {
      success: false,
      newState: {
        ...state,
        exp: Math.max(0, state.exp - expLoss),
      },
    };
  }
}

// Calculate attribute bonuses based on cultivation state
export function calculateAttributeBonuses(state: CultivationState): AttributeBonus {
  const config = REALM_CONFIGS[state.realm];
  return {
    attack: config.attackBonus * state.level,
    defense: config.defenseBonus * state.level,
    health: config.healthBonus * state.level,
  };
}
