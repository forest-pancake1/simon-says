import { playSound } from "./sounds";
import type { KeyCode } from "./keyboard";

type keyElement = HTMLElement & {
  dataset: {
    key: KeyCode
  }
}

export function setUpKeyboardLogic (input: HTMLInputElement){
  const activateKey = (key: keyElement | null, duration: number = 1000) => {
    if(!key) return;
  
    key.classList.add('active');
    setTimeout(() => {
      key.classList.remove('active');
    }, duration);
  };
  
  const handlePhisicalKey = (event: KeyboardEvent) =>{
    const keyElement = document.querySelector<keyElement>(`[data-key="${event.code}"]`);
    playSound('tipe');
    activateKey(keyElement);
  };
  const handleVirtualKey = (event: MouseEvent, key: keyElement) =>{
    event.preventDefault();
    playSound('tipe');
    activateKey(key);

    if(input.disabled) return;

  const char = key.textContent?.trim() || '';
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;

  input.value = input.value.substring(0, start) + char + input.value.substring(end);
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

  document.addEventListener('keydown', handlePhisicalKey);

  const keys = document.querySelectorAll<keyElement>('.key');
  keys.forEach(key => {
    key.addEventListener('mousedown',(e: MouseEvent) => {handleVirtualKey(e, key);});
  });
}

