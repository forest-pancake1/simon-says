import { numberArray } from "../components/config";

export const gameState = {
 numberOfChars: 2,
  outPut: [] as string[],
  charsArray: [...numberArray] as string[],
  score: 0,
  tryCount: 0,
  maxCount: 2,


  updateNumberChars(newChars: number){
    this.numberOfChars = newChars;
  },

  updateOutPut(newSequence: string[]){
    this.outPut = newSequence.map(char => 
      char.replace('Key', '').replace('Digit', '').toUpperCase()
    );
  },
  updateCharsArray(newChars: string[]){
    this.charsArray = newChars;
  },
  incrementScore() {
    this.score += 1;
    return this.score;
  },
  incrementCount() {
    this.tryCount += 1;
    return this.tryCount;
  },
  resetCount(){
    this.tryCount = 0;
    return this.tryCount;
  }

};

export const LEVEL_DISPLAY_NAMES = {
  easy: 'easy',
  medium: 'medium',
  hard: 'HARD'
} as const;

