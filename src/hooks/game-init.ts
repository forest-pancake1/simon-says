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

// TODO: Рассмотреть использование паттерна Builder для инициализации игры
// TODO: Вынести конфигурацию в отдельный файл
export function initGameElements(){
  // FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от DOM
  const mainScreen = createElement('div', 'mainScreen', document.body);
  const startScreen = createElement('div', 'startScreen', document.body);

  // TODO: Вынести тексты в локализацию
  const logo = createElement('h1', 'logo', startScreen, 'Simon Says');
  const menuBox = createElement('div', 'menu');
  logo.after(menuBox);
  
  // TODO: Рассмотреть использование паттерна Factory для создания UI компонентов
  const levels = createLevelButtons(menuBox);

  // FIXME: Нарушение принципа единой ответственности (SRP) - слишком много инициализации
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

  // TODO: Рассмотреть использование паттерна Facade для упрощения интерфейса
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

