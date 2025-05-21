
import { createElement } from '../utils/create-elemetnt';

export type KeyCode = `Key${Uppercase<string>}` | `Digit${number}`;

interface keyboardConfig{
  parent: HTMLElement;
  numberArray: KeyCode[];
  keyBoardArray: KeyCode[];
}

// FIXME: Добавить обработку ошибок при создании элементов
export function createKeyboard(config: keyboardConfig){
  const keyboard = createElement('div', 'keyboard');
  const numbersRow = createElement('div', 'numbers');
  const lettersRow = createElement('div', 'letters');

keyboard.append(numbersRow, lettersRow);
config.parent.append(keyboard);

  // TODO: Добавить анимацию появления клавиш
renderKeys(numbersRow, config.numberArray, 'key-number');
renderKeys(lettersRow, config.keyBoardArray, 'key-letter');

return {
  destroy: () => keyboard.remove(),
      // FIXME: Добавить проверку на существование контейнера
  updateKeys: (newKeys: KeyCode[], type: 'numbers' | 'letters') => {
    const target = type === 'numbers' ? numbersRow : lettersRow;
    renderKeys(target, newKeys, `key-${type}`);
  }
};
}

// TODO: Добавить санитизацию HTML
function renderKeys(container: HTMLElement, codes: KeyCode[], className: string) {
  container.innerHTML = codes.map(code => `
    <div class="key ${className}" data-key="${code}">
      ${code.replace(/Key|Digit/, '')}
    </div>
  `).join('');
}