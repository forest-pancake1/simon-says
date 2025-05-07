import { createElement } from "../utils/create-elemetnt";
import { gameState } from "../game/game-state";
 
interface upperPanelElements{
  elements:{
  upBox: HTMLElement,
  backToMenu: HTMLButtonElement,
  level: HTMLElement,
  score: HTMLElement,
  nowLevel: HTMLElement
},
 update:{
  updateLevel: () => void,
  updateScore: (scoreNumber: number) => void,
  updatelevelName: (levelName: string) => void
}
menuButton:{
  disableMenu: () => void,  
  enableMenu: () => void
  }
}

export function createUpperPanel (
input: HTMLInputElement,

):upperPanelElements{

  const upBox = createElement('div', 'up');
  input.before(upBox);
  
  const backToMenu = createElement('button', 'back', upBox, 'back to menu') as HTMLButtonElement;
  const level = createElement('h2', 'level', upBox, 'Level 1');
  const score = createElement('h2', 'score', upBox, 'score: 0');
  const nowLevel = createElement('div', 'now_level', undefined, 'easy');
  upBox.before(nowLevel);

  function updateLevel(){
    let number = gameState.numberOfChars / 2;
    level.textContent = `Level ${number}`;
  }

  function updateScore(scoreNumber: number){
    score.textContent = `score: ${scoreNumber}`;
  }

  function updatelevelName(levelName: string) {
  nowLevel.textContent = levelName;
 }
 function disableMenu() {
  backToMenu.disabled = true;
  backToMenu.classList.add('disabled');
}

function enableMenu() {
  backToMenu.disabled = false;
  backToMenu.classList.remove('disabled');
}
 return{
  elements:{
  upBox,
  backToMenu,
  level,
  score,
  nowLevel
  },
  update:{
    updateLevel,
    updateScore,
    updatelevelName,
  },
  menuButton:{
    disableMenu,
    enableMenu
  }
 }
}



