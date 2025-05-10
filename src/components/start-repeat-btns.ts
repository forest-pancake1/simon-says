 import { createElement } from "../utils/create-elemetnt";
 
 export function createStartRapeatBtns (
  container: HTMLElement
 ){
  const buttons = createElement('div', 'buttons', container);
  const startBtn = createElement('button', 'start', buttons, 'START') as HTMLButtonElement;
  const repeatBtn = createElement('button', 'repeat', buttons, 'repeat') as HTMLButtonElement;

  startBtn.disabled = true;
  repeatBtn.disabled = true;

  const disabledStart = () => {
      startBtn.disabled = true;
      startBtn.classList.add('disable');
    };
  
  const enabledStart = () =>{
      startBtn.disabled = false;
       startBtn.classList.remove('disable');
    };
    
  const enableRepeat = () => {
      repeatBtn.disabled = false;
      repeatBtn.classList.add('active');
    };

  const disableRepeat = () => {
     repeatBtn.disabled = true;
     repeatBtn.classList.remove('active');
   };

   return{
    elements: {
      startBtn,
      repeatBtn
    },
    controls:{
      disabledStart,
      enabledStart,
      disableRepeat,
      enableRepeat
    }

   };

 }