import type { GameState } from '../stores/gameStore';
import { initialState } from '../stores/gameStore';
import type { CultivationState } from '../systems/realmSystem';

const SAVE_KEY = 'pixel-xiuxian-save';

// Validate cultivation state structure
function isValidCultivationState(data: unknown): data is CultivationState {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.realm === 'string' &&
    typeof candidate.level === 'number' &&
    typeof candidate.exp === 'number' &&
    typeof candidate.maxExp === 'number'
  );
}

// Validate save data structure
function isValidSaveData(data: unknown): data is GameState {
  if (!data || typeof data !== 'object') return false;

  const candidate = data as Record<string, unknown>;

  // Check required top-level keys
  const requiredKeys = ['cultivation', 'deck', 'unlockedCards', 'equipment', 'spiritualRoot', 'talents', 'resources'];
  for (const key of requiredKeys) {
    if (!(key in candidate)) return false;
  }

  // Check types of simple fields
  if (!isValidCultivationState(candidate.cultivation)) return false;
  if (typeof candidate.spiritualRoot !== 'string') return false;
  if (!Array.isArray(candidate.deck)) return false;
  if (!Array.isArray(candidate.unlockedCards)) return false;
  if (!Array.isArray(candidate.equipment)) return false;
  if (!Array.isArray(candidate.talents)) return false;

  // Check resources is an object with number values
  if (!candidate.resources || typeof candidate.resources !== 'object') return false;
  const resources = candidate.resources as Record<string, unknown>;
  for (const [key, value] of Object.entries(resources)) {
    if (typeof value !== 'number') return false;
  }

  return true;
}

// Save game state to localStorage
export function saveGame(state: GameState): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save game:', error);
    // Optionally, we could show a user-friendly error here
  }
}

// Load game state from localStorage
export function loadGame(): GameState {
  try {
    const serialized = localStorage.getItem(SAVE_KEY);
    if (!serialized) {
      return { ...initialState };
    }

    const parsed = JSON.parse(serialized);
    if (isValidSaveData(parsed)) {
      return parsed;
    } else {
      console.warn('Corrupted save data detected, resetting to initial state');
      return { ...initialState };
    }
  } catch (error) {
    console.error('Failed to load game, resetting to initial state:', error);
    return { ...initialState };
  }
}

// Clear save data from localStorage
export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Failed to clear save:', error);
  }
}
