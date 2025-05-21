import { playSound } from "../components/sounds";
import { gameState } from "./game-state";

// TODO: Добавить типы для всех параметров функций
interface inputChecker {
  check: (_output: string[]) => boolean,
  reset: () => void
}

// FIXME: Добавить обработку ошибок ввода
export function createInputCheck(
  input: HTMLInputElement,
  controls: { disabledStart: () => void; disableRepeat: () => void },
  menuButton: {disableMenu: () => void},
  InputController: { disableInput: () => void},
  loseBox: HTMLElement
): inputChecker {
  // TODO: Добавить конфигурацию количества попыток в зависимости от уровня сложности
  function check(outPut: string[]): boolean {
    const userInput = input.value.toUpperCase();
    
    for(let i=0; i<userInput.length; i++) {
      const enterdChar = userInput[i];
      const expectedChar = outPut[i].replace('Key', '').replace('Digit', '');
      // FIXME: Убрать отладочный код перед деплоем
      console.log(enterdChar, expectedChar);

      if(expectedChar.toUpperCase() !== enterdChar.toUpperCase()) {
        playSound('error');
        input.classList.add('wrong');
        InputController.disableInput();
        gameState.incrementCount();

        // TODO: Вынести константы таймаутов в конфигурацию
        setTimeout(() => {
          input.value = '';
          input.classList.remove('wrong');
        }, 1000);

        if(gameState.tryCount === gameState.maxCount) {
          loseBox.classList.add('active');
          controls.disabledStart();
          menuButton.disableMenu();
          controls.disableRepeat();
          // FIXME: Убрать отладочный код перед деплоем
          console.log('попытки закончились');
        }
        return false;
      }
    }
    return true;
  }

  // TODO: Добавить сброс всех состояний при рестарте
  function reset() {
    gameState.resetCount();
  }

  return {check, reset};
}