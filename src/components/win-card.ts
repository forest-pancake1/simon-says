import { createElement } from "../utils/create-elemetnt";

export function createWinCard (
  container: HTMLElement
){
  const winBox = createElement('div', 'win', undefined, 'YOU WON!');
  container.prepend(winBox);
  const nextBtn = createElement('button', 'next_btn', winBox, 'next level')as HTMLButtonElement;
  const menuBtn = createElement('button', 'menu_btn', winBox, 'back to menu')as HTMLButtonElement;
  return {
    winElements:{
     winBox,
     nextBtn,
     menuBtn
    }
  };
}
