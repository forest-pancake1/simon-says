import { setupLevelHandlers } from "./components/level-buttons";
import { gameState } from "./hooks/game-state";
import { setUpKeyboardLogic } from "./hooks/keyboard-logic";
import { initGameElements } from "./hooks/game-init";
import { setUpGameHandlers } from "./hooks/event-handlers";
import { LEVEL_DISPLAY_NAMES } from "./hooks/game-state";


const gameElements = initGameElements();
setUpGameHandlers(gameElements);

setupLevelHandlers(gameElements.levels,
  {
    update: (difficulty, newChars) => {
      gameState.updateCharsArray(newChars) ; 
      gameElements.upperPanel.update.updatelevelName(LEVEL_DISPLAY_NAMES[difficulty]);
      console.log(`Уровень: ${difficulty}, Символы:`, gameState.charsArray);
    },
    onStart: () => {
      gameElements.startScreen.classList.add('disable');
      gameElements.mainScreen.classList.add('active');
      gameElements.controls.enabledStart();
    }
  }
);

setUpKeyboardLogic(gameElements.input);
