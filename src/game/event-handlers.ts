import { playSound } from "../components/sounds";
import { initGameElements } from "./game-init";
import { gameState } from "./game-state";
import { getItRandomise } from "./random";
import { pushItOnSkreen } from "./push-on-screen";
import { handleMenuClick } from "./handle-menu";
import { createInputHandlers } from "./input-handle";

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

  const inputHandlers = createInputHandlers(input);
  
  elements.startBtn.addEventListener('click', () =>{
    playSound('click');
    gameState.resetCount();
    input.value = '';
    disableInput();
    controls.disableRepeat();
    controls.disabledStart();
    
    gameState.outPut = getItRandomise (gameState.charsArray, input); 
    const unlockDelay = gameState.outPut.length * 1000 + 500;
       
    inputHandlers.clear();
    setTimeout (() => {
      controls.enabledStart();
      elements.startBtn.textContent = 'try again';
      enableInput();
      controls.enableRepeat();
      input.focus();
      input.value = '';
      inputHandlers.set((e: Event) => {
        handleCheck({
          target: e.target as HTMLInputElement
        });
      });
    }, unlockDelay);
    
    
  });
  

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
    if(gameState.numberOfChars === 10){
      winElements.nextBtn.classList.add('disable');
      winElements.nextBtn.disabled = true;
    }
  }
  }

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
    console.log('количество знаков',gameState.numberOfChars);
  });

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