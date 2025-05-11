import { playSound } from "../components/sounds";
import { gameState } from "./game-state";

interface inputChecker {
  check: (_output: string[]) => boolean,
  reset: () => void
}

 export function createInputCheck(
  input: HTMLInputElement,
  controls: { disabledStart: () => void; disableRepeat: () => void },
  menuButton: {disableMenu: () => void},
  InputController: { disableInput: () => void},
  loseBox: HTMLElement
  ):inputChecker{


    function check(outPut:string[]): boolean{

    const userInput = input.value.toUpperCase();
    

  for(let i=0; i<userInput.length; i++){

    const enterdChar = userInput[i];
    const expectedChar = outPut[i].replace('Key', '').replace('Digit', '');
    console.log(enterdChar, expectedChar);

    if( expectedChar.toUpperCase() !== enterdChar.toUpperCase()){
      playSound('error');
       input.classList.add('wrong');
       InputController.disableInput();
       gameState.incrementCount();

        setTimeout(() => {
          input.value = '';
          input.classList.remove('wrong');
        },1000);

        if(gameState.tryCount === gameState.maxCount){
          loseBox.classList.add('active');
          controls.disabledStart();
          menuButton.disableMenu();
          controls.disableRepeat();
          console.log('попытки закончились');
         }
       return false;
    }
  }
  return true;
 }
 function reset (){
  gameState.resetCount();
 }
 return {check, reset};
}