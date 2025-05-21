import { createElement } from "../utils/create-elemetnt";

// FIXME: Добавить типизацию для возвращаемого объекта
export function createLoseCard (
  container: HTMLElement
){
  // TODO: Вынести тексты в константы
  const loseBox = createElement('div', 'lose', undefined, 'YOU LOSE!');
  container.prepend(loseBox);
  // FIXME: Добавить aria-label для доступности
  const tryAgain = createElement('button', 'try_again', loseBox, 'try again')as HTMLButtonElement;
  const menuBtn2 = createElement('button', 'menu_btn', loseBox, 'back to menu')as HTMLButtonElement;
  
  // TODO: Добавить анимацию появления
  return {
    loseElements:{
     loseBox,
     tryAgain,
     menuBtn2
    }
  };
}