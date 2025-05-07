import { createElement } from "../utils/create-elemetnt";

export function createLoseCard (
  container: HTMLElement
){
  const loseBox = createElement('div', 'lose', undefined, 'YOU LOSE!');
  container.prepend(loseBox);
  const tryAgain = createElement('button', 'try_again', loseBox, 'try again')as HTMLButtonElement;
  const menuBtn2 = createElement('button', 'menu_btn', loseBox, 'back to menu')as HTMLButtonElement;
  return {
    loseElements:{
     loseBox,
     tryAgain,
     menuBtn2
    }
  }
}