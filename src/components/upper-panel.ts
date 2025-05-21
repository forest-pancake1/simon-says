import { createElement } from "../utils/create-elemetnt";
import { gameState } from "@/hooks/game-state";

// FIXME: Исправить стиль именования интерфейса (upperPanelElements -> UpperPanelElements)
interface upperPanelElements {
  elements: {
    upBox: HTMLElement,
    backToMenu: HTMLButtonElement,
    level: HTMLElement,
    score: HTMLElement,
    nowLevel: HTMLElement
  },
  update: {
    updateLevel: () => void,
    updateScore: (_scoreNumber: number) => void,
    updatelevelName: (_levelName: string) => void
  }
  menuButton: {
    disableMenu: () => void,  
    enableMenu: () => void
  }
}

// TODO: Добавить валидацию входных параметров
export function createUpperPanel(
  input: HTMLInputElement,
): upperPanelElements {
  // FIXME: Добавить aria-label для доступности
  const upBox = createElement('div', 'up');
  input.before(upBox);
  
  // TODO: Вынести тексты в константы
  const backToMenu = createElement('button', 'back', upBox, 'back to menu') as HTMLButtonElement;
  const level = createElement('h2', 'level', upBox, 'Level 1');
  const score = createElement('h2', 'score', upBox, 'score: 0');
  const nowLevel = createElement('div', 'now_level', undefined, 'easy');
  upBox.before(nowLevel);

  // FIXME: Вынести логику расчета уровня в отдельную функцию
  function updateLevel() {
    let number = gameState.numberOfChars / 2;
    level.textContent = `Level ${number}`;
  }

  // TODO: Добавить форматирование числа
  function updateScore(scoreNumber: number) {
    score.textContent = `score: ${scoreNumber}`;
  }

  // FIXME: Исправить стиль именования функции (updatelevelName -> updateLevelName)
  function updatelevelName(levelName: string) {
    nowLevel.textContent = levelName;
  }

  // TODO: Вынести логику управления состоянием в отдельный хук
  function disableMenu() {
    backToMenu.disabled = true;
    backToMenu.classList.add('disabled');
  }

  function enableMenu() {
    backToMenu.disabled = false;
    backToMenu.classList.remove('disabled');
  }

  return {
    elements: {
      upBox,
      backToMenu,
      level,
      score,
      nowLevel
    },
    update: {
      updateLevel,
      updateScore,
      updatelevelName,
    },
    menuButton: {
      disableMenu,
      enableMenu
    }
  };
}



