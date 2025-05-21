import { createElement } from "../utils/create-elemetnt";

// FIXME: Добавить типизацию для возвращаемого объекта
export function createWinCard (
  container: HTMLElement
){
  // TODO: Вынести тексты в константы
  const winBox = createElement('div', 'win', undefined, 'YOU WON!');
  container.prepend(winBox);
  // FIXME: Добавить aria-label для доступности
  const nextBtn = createElement('button', 'next_btn', winBox, 'next level')as HTMLButtonElement;
  const menuBtn = createElement('button', 'menu_btn', winBox, 'back to menu')as HTMLButtonElement;
  
  // TODO: Добавить анимацию появления
  return {
    winElements:{
     winBox,
     nextBtn,
     menuBtn
    }
  };
}
