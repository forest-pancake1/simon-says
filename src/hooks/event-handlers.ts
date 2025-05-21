import { playSound } from "../components/sounds";
import { initGameElements } from "./game-init";
import { gameState } from "./game-state";
import { getItRandomise } from "./random";
import { pushItOnSkreen } from "./push-on-screen";
import { handleMenuClick } from "./handle-menu";
import { createInputHandlers } from "./input-handle";

// TODO: Рассмотреть использование паттерна Command для обработчиков событий
// TODO: Вынести бизнес-логику в отдельный слой (domain)
export function setUpGameHandlers({
  mainScreen,
  startScreen,
  input,
  elements,
  controls,
  inputControls: enableInput, disableInput,
  winElements,
  loseElements,
  upperPanel,
  checkSequence
}: ReturnType<typeof initGameElements>){

  // FIXME: Нарушение принципа единой ответственности (SRP) - слишком много зависимостей
  const inputHandlers = createInputHandlers(input);
  
  // TODO: Вынести логику обработки событий в отдельные сервисы
  elements.startBtn.addEventListener('click', () =>{
    playSound('click');
    gameState.resetCount();
    input.value = '';
    disableInput();
    controls.disableRepeat();
    controls.disabledStart();
    
    // FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от gameState
    gameState.outPut = getItRandomise (gameState.charsArray, input); 
    const unlockDelay = gameState.outPut.length * 1000 + 500;
       
    inputHandlers.clear();
    // TODO: Вынести таймауты в конфигурацию
    setTimeout (() => {
      controls.enabledStart();
      elements.startBtn.textContent = 'try again';
      enableInput();
      controls.enableRepeat();
      input.focus();
      input.value = '';
      // FIXME: Нарушение принципа подстановки Лисков (LSP) - неявное приведение типов
      inputHandlers.set((e: Event) => {
        handleCheck({
          target: e.target as HTMLInputElement
        });
      });
    }, unlockDelay);
  });
  

  // TODO: Рассмотреть использование паттерна State для управления состоянием игры
  function handleCheck(e: { target: HTMLInputElement },) {
    const target = e.target as HTMLInputElement;
    const isCorrect=checkSequence.check(gameState.outPut);
    if(isCorrect && target.value.length === gameState.outPut.length) {
      winElements.winBox.classList.add('active');
      playSound('win');
      controls.disabledStart();
      upperPanel.menuButton.disableMenu();
      controls.disableRepeat();
      disableInput();
      // FIXME: Магическое число 10
      if(gameState.numberOfChars === 10){
        winElements.nextBtn.classList.add('disable');
        winElements.nextBtn.disabled = true;
      }
    }
  }

  // TODO: Вынести логику повторения в отдельный сервис
  elements.repeatBtn.addEventListener('click', () => {
    playSound('click');
    input.value = '';
    disableInput();
    pushItOnSkreen(gameState.outPut, input);
    controls.disableRepeat();
    const timeout = gameState.outPut.length * 1000 + 500;
    setTimeout(() => {
      input.value = '';
      enableInput();
    },timeout);
  });

  // TODO: Рассмотреть использование паттерна Mediator для коммуникации между компонентами
  winElements.nextBtn.addEventListener('click', () => {
    playSound('click');
    winElements.winBox.classList.remove('active');
    const newScore = gameState.incrementScore();
    upperPanel.update.updateScore(newScore);
    gameState.numberOfChars += 2;
    input.value = '';
    disableInput();
    controls.enabledStart();
    upperPanel.menuButton.enableMenu();
    elements.startBtn.textContent = 'START';
    upperPanel.update.updateLevel();
    // FIXME: Убрать отладочный код
    console.log('количество знаков',gameState.numberOfChars);
  });

  // TODO: Вынести общую логику обработки меню в отдельный сервис
  winElements.menuBtn.addEventListener('click', () => {
    handleMenuClick(input, mainScreen, startScreen, elements.startBtn, controls);
    winElements.winBox.classList.remove('active');
    upperPanel.menuButton.enableMenu();
    upperPanel.update.updateLevel();
  });

  loseElements.tryAgain.addEventListener('click', () => {
    playSound('click');
    loseElements.loseBox.classList.remove('active');
    controls.enabledStart();
    upperPanel.menuButton.enableMenu();
    elements.startBtn.textContent = 'START';
    input.value = '';
  });

  loseElements.menuBtn2.addEventListener('click', () => {
    handleMenuClick(input, mainScreen, startScreen, elements.startBtn, controls);
    loseElements.loseBox.classList.remove('active');
    upperPanel.menuButton.enableMenu();
    upperPanel.update.updateLevel();
  });

  upperPanel.elements.backToMenu.addEventListener('click', () => {
    handleMenuClick(input, mainScreen, startScreen, elements.startBtn, controls);
    upperPanel.menuButton.enableMenu();
    upperPanel.update.updateLevel();
  });
}