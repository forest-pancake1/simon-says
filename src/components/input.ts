import { createElement } from "../utils/create-elemetnt";

export function createInput(container: HTMLElement){
const input = createElement('input', 'input') as HTMLInputElement;
container.prepend(input);
input.disabled = true;
let isInputLocked = false;


// активное поле
function enableInput() {
  input.disabled = false;
  input.classList.add('active');
  input.focus();
  isInputLocked = true;
  input.addEventListener('blur', () => {
    if (isInputLocked) {
      input.focus();
    }
  });
}
// заблокированное поле
function disableInput() {
  input.disabled = true;
  input.classList.remove('active');
  input.blur();
  isInputLocked = true;
};
return{
  Element: input,
  enableInput,
  disableInput
};
}
export type InputController = {
  element: HTMLInputElement;
  enableInput: () => void;
  disableInput: () => void;
};