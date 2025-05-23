
import { createElement } from '../utils/create-elemetnt';

export type KeyCode = `Key${Uppercase<string>}` | `Digit${number}`;

interface keyboardConfig{
  parent: HTMLElement;
  numberArray: KeyCode[];
  keyBoardArray: KeyCode[];
}


export function createKeyboard(config: keyboardConfig){
  const keyboard = createElement('div', 'keyboard');
  const numbersRow = createElement('div', 'numbers');
  const lettersRow = createElement('div', 'letters');

keyboard.append(numbersRow, lettersRow);
config.parent.append(keyboard);

renderKeys(numbersRow, config.numberArray, 'key-number');
renderKeys(lettersRow, config.keyBoardArray, 'key-letter');

return {
  destroy: () => keyboard.remove(),
  updateKeys: (newKeys: KeyCode[], type: 'numbers' | 'letters') => {
    const target = type === 'numbers' ? numbersRow : lettersRow;
    renderKeys(target, newKeys, `key-${type}`);
  }
};
}

function renderKeys(container: HTMLElement, codes: KeyCode[], className: string) {
  container.innerHTML = codes.map(code => `
    <div class="key ${className}" data-key="${code}">
      ${code.replace(/Key|Digit/, '')}
    </div>
  `).join('');
}