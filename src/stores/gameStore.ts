import { CultivationState, initializeCultivation, getCultivationDisplay, addExp, isReadyForBreakthrough, attemptBreakthrough, calculateAttributeBonuses, AttributeBonus } from '../systems/realmSystem';
import { CardSystem, Card } from '../systems/cardSystem';
import { saveGame } from '../utils/save';

// Game state types
export interface GameState {
  cultivation: CultivationState;
  deck: string[]; // Current deck (max 10 cards)
  unlockedCards: string[]; // All unlocked card ids
  equipment: string[];
  spiritualRoot: string;
  talents: string[];
  resources: Record<string, number>;
}

// Initial default state
export const initialState: GameState = {
  cultivation: initializeCultivation(),
  deck: ['attack-1', 'attack-1', 'defense-1', 'defense-1', 'support-1'],
  unlockedCards: ['attack-1', 'defense-1', 'support-1'],
  equipment: [],
  spiritualRoot: '普通灵根',
  talents: [],
  resources: {
    spiritStone: 50,
    elixir: 0,
    spiritWood: 0,
  },
};

// Helper methods for cultivation
export const cultivationHelpers = {
  addExp: (state: GameState, exp: number): GameState => ({
    ...state,
    cultivation: addExp(state.cultivation, exp),
  }),
  attemptBreakthrough: (state: GameState): { success: boolean; state: GameState } => {
    const result = attemptBreakthrough(state.cultivation);
    return {
      success: result.success,
      state: { ...state, cultivation: result.newState },
    };
  },
  isReadyForBreakthrough: (state: GameState): boolean => {
    return isReadyForBreakthrough(state.cultivation);
  },
  getAttributeBonuses: (state: GameState): AttributeBonus => {
    return calculateAttributeBonuses(state.cultivation);
  },
  getDisplayString: (state: GameState): string => {
    return getCultivationDisplay(state.cultivation);
  },
};

// Game store for centralized state management
class GameStore {
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];

  constructor(initial: GameState = initialState) {
    this.state = { ...initial }; // Immutable initial state
  }

  // Get current state (immutable copy)
  getState(): GameState {
    return { ...this.state };
  }

  // Update state with immutable changes
  setState(partial: Partial<GameState>): void {
    const newState = {
      ...this.state,
      ...partial,
      cultivation: partial.cultivation 
        ? { ...this.state.cultivation, ...partial.cultivation }
        : { ...this.state.cultivation },
      resources: partial.resources 
        ? { ...this.state.resources, ...partial.resources }
        : { ...this.state.resources },
      deck: partial.deck ? [...partial.deck] : [...this.state.deck],
      unlockedCards: partial.unlockedCards ? [...partial.unlockedCards] : [...this.state.unlockedCards],
    };
    this.state = newState;
    this.notifyListeners();
  }

  // Card helpers
  addCardToDeck(cardId: string): void {
    const currentState = this.getState();
    const newDeck = CardSystem.addCardToDeck(currentState.deck, cardId);
    this.setState({ deck: newDeck });
  }

  removeCardFromDeck(cardId: string): void {
    const currentState = this.getState();
    const newDeck = CardSystem.removeCardFromDeck(currentState.deck, cardId);
    this.setState({ deck: newDeck });
  }

  refreshUnlockedCards(): void {
    const currentState = this.getState();
    const realm = getCultivationDisplay(currentState.cultivation);
    const unlockedCards = CardSystem.getUnlockedCards(realm, currentState.resources).map(card => card.id);
    this.setState({ unlockedCards });
  }

  // Subscribe to state changes
  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
    const currentState = this.getState();
    saveGame(currentState);
    this.listeners.forEach(listener => listener(currentState));
  }

  // Reset state to initial
  reset(): void {
    this.state = { ...initialState };
    this.notifyListeners();
  }
}

// Singleton instance
export const gameStore = new GameStore();
