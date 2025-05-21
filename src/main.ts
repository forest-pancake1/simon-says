// TODO: Вынести конфигурацию в отдельный файл
import { setupLevelHandlers } from "./components/level-buttons";
import { gameState } from "./hooks/game-state";
import { setUpKeyboardLogic } from "./hooks/keyboard-logic";
import { initGameElements } from "./hooks/game-init";
import { setUpGameHandlers } from "./hooks/event-handlers";
import { LEVEL_DISPLAY_NAMES } from "./hooks/game-state";

// FIXME: Добавить обработку ошибок при инициализации
const gameElements = initGameElements();
setUpGameHandlers(gameElements);

// TODO: Вынести логику обновления UI в отдельный сервис
setupLevelHandlers(gameElements.levels,
  {
    update: (difficulty, newChars) => {
      gameState.updateCharsArray(newChars) ; 
      gameElements.upperPanel.update.updatelevelName(LEVEL_DISPLAY_NAMES[difficulty]);
      // FIXME: Убрать console.log в production
      console.log(`Уровень: ${difficulty}, Символы:`, gameState.charsArray);
    },
    onStart: () => {
      // TODO: Добавить анимацию перехода
      gameElements.startScreen.classList.add('disable');
      gameElements.mainScreen.classList.add('active');
      gameElements.controls.enabledStart();
    }
  }
);

// FIXME: Добавить обработку ошибок при инициализации клавиатуры
setUpKeyboardLogic(gameElements.input);
