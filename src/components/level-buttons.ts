
export function createLevelButtons (container: HTMLElement) {
  return{
    easy: createlevels('easy', container, true),
    medium: createlevels('medium', container),
    hard: createlevels('hard', container),
    start: createlevels('START', container, false, 'start_menu')
  };
}


function createlevels (
  text: string,
  container: HTMLElement,
  isActive = false,
  extraClass = ''
): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = `level_button ${extraClass} ${isActive ? 'active' : ''}`.trim();
  button.textContent = text;
  container.append(button);
  return button;
}

import { keyBoardArray, numberArray } from "./config";
import { playSound } from "./sounds";

type Difficulty = 'easy' | 'medium' | 'hard';
// type StartButton = 'start' | Difficulty;

interface LevelConfig {
  update: (_difficulty: Difficulty, _newChars: string[]) => void;
  onStart?: () => void;
}

export function setupLevelHandlers (
  elements: ReturnType<typeof createLevelButtons>,
  config: LevelConfig
){
const handleLevelClick = (difficulty: Difficulty) => {
  Object.values(elements).forEach(level => {
    level.classList.remove('active');
  });
  elements[difficulty].classList.add('active');
  let newArray: string[];
  switch(difficulty){
    case 'easy': newArray = numberArray; break;
    case 'medium': newArray = keyBoardArray; break;
    case 'hard': newArray = [...numberArray, ...keyBoardArray]; break;
  }
  config.update(difficulty, newArray);
  playSound('tipe');
};
const handleStartClick = () =>{
  elements.start.classList.add('active1');
  if(config.onStart) config.onStart();
  playSound('click');
};
elements.easy.addEventListener('click', () => handleLevelClick('easy'));
elements.medium.addEventListener('click', () => handleLevelClick('medium'));
elements.hard.addEventListener('click', () => handleLevelClick('hard'));
elements.start.addEventListener('click',handleStartClick);
}
