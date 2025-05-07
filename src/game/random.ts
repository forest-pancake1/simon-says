import { gameState } from "./game-state";
import { pushItOnSkreen } from "./push-on-screen";

export function getItRandomise (
  charsArray: string[],
  container: HTMLInputElement
):string[] {
  gameState.updateOutPut([]);
  const newSequence: string[] = [];

   for(let i=0; i<gameState.numberOfChars; i++){
    let randomIndex = Math.floor(Math.random() * charsArray.length);
    newSequence.push(charsArray[randomIndex]);

   }
   console.log('последовательность:',newSequence);
   pushItOnSkreen(newSequence, container);
   return newSequence;
}