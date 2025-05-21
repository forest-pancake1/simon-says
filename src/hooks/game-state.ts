import { numberArray } from "../components/config";

// TODO: Вынести в константы
export const gameState = {
  numberOfChars: 2, // FIXME: Сделать константой
  outPut: [] as string[],
  charsArray: [...numberArray] as string[],
  score: 0,
  tryCount: 0,
  maxCount: 2, // FIXME: Сделать константой

  // TODO: Добавить валидацию входных данных
  updateNumberChars(newChars: number){
    this.numberOfChars = newChars;
  },

  // FIXME: Вынести логику форматирования в отдельную функцию
  updateOutPut(newSequence: string[]){
    this.outPut = newSequence.map(char => 
      char.replace('Key', '').replace('Digit', '').toUpperCase()
    );
  },

  // TODO: Добавить проверку на уникальность символов
  updateCharsArray(newChars: string[]){
    this.charsArray = newChars;
  },

  // FIXME: Добавить максимальное значение счета
  incrementScore() {
    this.score += 1;
    return this.score;
  },

  // TODO: Добавить проверку на превышение максимального количества попыток
  incrementCount() {
    this.tryCount += 1;
    return this.tryCount;
  },

  resetCount(){
    this.tryCount = 0;
    return this.tryCount;
  }
};

// FIXME: Добавить локализацию
export const LEVEL_DISPLAY_NAMES = {
  easy: 'easy',
  medium: 'medium',
  hard: 'HARD'
} as const;

