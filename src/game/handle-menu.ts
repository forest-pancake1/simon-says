import { playSound } from "../components/sounds";
import { gameState } from "./game-state";
import { createStartRapeatBtns } from "../components/start-repeat-btns";

export function handleMenuClick (
 input: HTMLInputElement,
 container1: HTMLElement,
 container2: HTMLElement,
 button: HTMLElement,
 controls: ReturnType<typeof createStartRapeatBtns>['controls']
){
 playSound('click');
 input.value = '';
 gameState.numberOfChars = 2;
 container1.classList.remove('active');
 container2.classList.remove('disable');
 button.textContent = 'START';
 controls.enabledStart();
 controls.disableRepeat();
}

