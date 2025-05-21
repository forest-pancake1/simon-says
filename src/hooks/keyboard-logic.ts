import { playSound } from "../components/sounds";
import type { KeyCode } from "../components/keyboard";

// TODO: Рассмотреть использование паттерна Strategy для разных типов клавиатур
type keyElement = HTMLElement & {
  dataset: {
    key: KeyCode
  }
}

// TODO: Рассмотреть использование паттерна Command для обработки нажатий
export function setUpKeyboardLogic (input: HTMLInputElement){
  // FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от DOM
  const activateKey = (key: keyElement | null, duration: number = 1000) => {
    if(!key) return;
  
    key.classList.add('active');
    setTimeout(() => {
      key.classList.remove('active');
    }, duration);
  };
  
  // TODO: Вынести логику обработки физической клавиатуры в отдельный сервис
  const handlePhisicalKey = (event: KeyboardEvent) =>{
    const keyElement = document.querySelector<keyElement>(`[data-key="${event.code}"]`);
    playSound('tipe');
    activateKey(keyElement);
  };

  // TODO: Вынести логику обработки виртуальной клавиатуры в отдельный сервис
  const handleVirtualKey = (event: MouseEvent, key: keyElement) =>{
    event.preventDefault();
    playSound('tipe');
    activateKey(key);

    if(input.disabled) return;

    // FIXME: Нарушение принципа единой ответственности (SRP) - слишком много логики
    const char = key.textContent?.trim() || '';
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    input.value = input.value.substring(0, start) + char + input.value.substring(end);
    // FIXME: Использование внутренних API браузера может быть небезопасным
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype, 
      "value"
    )?.set;
    nativeInputValueSetter?.call(input, input.value);
    
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: char
    });
    input.dispatchEvent(inputEvent);
  
    input.selectionStart = input.selectionEnd = start + char.length;
    input.focus();
  };

  // TODO: Рассмотреть использование паттерна Observer для управления подписками
  document.addEventListener('keydown', handlePhisicalKey);

  const keys = document.querySelectorAll<keyElement>('.key');
  keys.forEach(key => {
    key.addEventListener('mousedown',(e: MouseEvent) => {handleVirtualKey(e, key);});
  });
}

