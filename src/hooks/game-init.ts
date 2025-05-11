import { createElement } from "../utils/create-elemetnt";
import { createLevelButtons } from "../components/level-buttons";
import { createKeyboard } from "../components/keyboard";
import { numberArray, keyBoardArray } from "../components/config";
import { KeyCode } from "../components/keyboard";
import { createInput } from "../components/input";
import { createStartRapeatBtns } from "../components/start-repeat-btns";
import { createLoseCard } from "../components/lose-card";
import { createUpperPanel } from "../components/upper-panel";
import { createWinCard } from "../components/win-card";
import { createInputCheck } from "./check-sequence";

export function initGameElements(){
  const mainScreen = createElement('div', 'mainScreen', document.body);
  const startScreen = createElement('div', 'startScreen', document.body);

  const logo = createElement('h1', 'logo', startScreen, 'Simon Says');
  const menuBox = createElement('div', 'menu');
  logo.after(menuBox);
  
  const levels = createLevelButtons(menuBox);

  const keyboard = createKeyboard({
    parent: mainScreen,
    numberArray: numberArray as KeyCode[],
    keyBoardArray: keyBoardArray as KeyCode[]
  });
  const {Element: input, enableInput, disableInput} = createInput(mainScreen);

  const {elements, controls} = createStartRapeatBtns(mainScreen);
  const {loseElements} = createLoseCard(mainScreen);
  const {winElements} = createWinCard(mainScreen);
  const upperPanel = createUpperPanel(input);
  const checkSequence = createInputCheck(
    input,
    controls,
    upperPanel.menuButton,
    { disableInput },
    loseElements.loseBox
  );

  return{
    mainScreen,
    startScreen,
    logo,
    menuBox,
    levels,
    keyboard,
    input,
    inputControls: enableInput, disableInput,
    elements,
    controls,
    loseElements,
    winElements,
    upperPanel,
    checkSequence
  };
  
}

