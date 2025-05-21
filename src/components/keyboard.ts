import { createElement } from '../utils/create-elemetnt';

// TODO: Рассмотреть использование паттерна Strategy для разных типов клавиатур
export type KeyCode = `Key${Uppercase<string>}` | `Digit${number}`;

// FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от DOM
interface keyboardConfig {
  parent: HTMLElement;
  numberArray: KeyCode[];
  keyBoardArray: KeyCode[];
}

// TODO: Добавить паттерн Factory для создания разных типов клавиш
export function createKeyboard(config: keyboardConfig) {
  // FIXME: Отсутствует абстракция для работы с DOM
  const keyboard = createElement('div', 'keyboard');
  const numbersRow = createElement('div', 'numbers');
  const lettersRow = createElement('div', 'letters');

  keyboard.append(numbersRow, lettersRow);
  config.parent.append(keyboard);

  // TODO: Добавить паттерн Observer для обновления UI
  renderKeys(numbersRow, config.numberArray, 'key-number');
  renderKeys(lettersRow, config.keyBoardArray, 'key-letter');

  return {
    // FIXME: Нарушение принципа единой ответственности (SRP)
    destroy: () => keyboard.remove(),
    updateKeys: (newKeys: KeyCode[], type: 'numbers' | 'letters') => {
      const target = type === 'numbers' ? numbersRow : lettersRow;
      renderKeys(target, newKeys, `key-${type}`);
    }
  };
}

// TODO: Вынести в отдельный сервис для работы с DOM
function renderKeys(container: HTMLElement, codes: KeyCode[], className: string) {
  container.innerHTML = codes.map(code => `
    <div class="key ${className}" data-key="${code}">
      ${code.replace(/Key|Digit/, '')}
    </div>
  `).join('');
}