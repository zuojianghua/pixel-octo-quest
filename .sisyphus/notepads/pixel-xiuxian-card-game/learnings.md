# Phaser.js + Vite Project Setup Learnings

## Key Points
- When using Phaser with TypeScript, import the full namespace: `import * as Phaser from 'phaser';`
- Phaser.AUTO requires the full Phaser import to be accessible
- For pixel art mode, set `pixelArt: true` in the game configuration
- Vite works well with Phaser out of the box - no special configuration needed
- Basic scene structure: preload, create, update functions
- Development server runs on port 5173 by default
- Production build creates optimized assets in the dist folder
- When saving game state, always validate the save data structure matches the current GameState interface
- Centralized state management (like gameStore) helps keep all scenes in sync
- Always unsubscribe store listeners when destroying scenes to prevent memory leaks

## Common Issues Encountered
1. Using `Phaser.AUTO` without importing the full Phaser namespace results in undefined
2. `this.load.rectangle` is not a valid Phaser loader method - use graphics or load actual assets
3. Agent memo comments (like "// Update logic (if any)") should be avoided as they become outdated
4. Save validation function must check for correct field names (deck/unlockedCards instead of cards)
5. Always call saveGame() whenever game state changes to persist progress
6. Initial game state should have a basic deck so players can start fighting immediately
7. Don't preload assets that don't exist - it will cause loading errors
8. Settings scene should have a reset game button for convenience

## QA Testing Findings
1. **Initial State Fixes**: Added 5 basic cards to initial deck, 50 starting spirit stones, marked initial cards as unlocked
2. **Settings Scene Enhancement**: Added reset game button with confirmation dialog
3. **Balance Adjustments**: 
   - Increased attack card damage slightly for better combat flow
   - Reduced enemy stats to make early game more accessible
   - Increased combat rewards for faster progression
   - Tweaked defense card values for better balance
4. **Asset Loading Fix**: Removed preload of non-existent spritesheet
5. **All Systems Verified**: 
   - Cultivation system works properly with level up and breakthrough
   - Card system correctly unlocks cards based on realm
   - Combat system runs smoothly with AI and rewards
   - Save/load system validates and persists data correctly
   - All scene navigation works as expected

## Verification Steps
- npm run dev starts successfully without errors
- npm run build completes and produces valid dist folder with index.html and assets
- Game container is properly created in index.html
- Complete game flow works: Main Menu → Cultivation → Deck Building → Combat → Rewards → Save
- All navigation buttons work correctly
- Game state is properly saved and loaded on restart
- 3+ complete game flow tests pass without critical bugs
- Combat balance feels fair and rewarding