import { numberArray } from "../components/config";

// TODO: Рассмотреть использование паттерна Observer для обновления UI
// TODO: Вынести бизнес-логику в отдельный слой (domain)
export const gameState = {
  numberOfChars: 2,
  outPut: [] as string[],
  charsArray: [...numberArray] as string[],
  score: 0,
  tryCount: 0,
  maxCount: 2,

  // FIXME: Нарушение принципа единой ответственности (SRP) - метод делает слишком много
  updateNumberChars(newChars: number) {
    this.numberOfChars = newChars;
  },

  // TODO: Рассмотреть использование immutable state management
  updateOutPut(newSequence: string[]) {
    this.outPut = newSequence.map(char => 
      char.replace('Key', '').replace('Digit', '').toUpperCase()
    );
  },

  // FIXME: Отсутствует валидация входных данных
  updateCharsArray(newChars: string[]) {
    this.charsArray = newChars;
  },

  // TODO: Добавить обработку переполнения счета
  incrementScore() {
    this.score += 1;
    return this.score;
  },

  // FIXME: Нарушение принципа открытости/закрытости (OCP) - логика попыток захардкожена
  incrementCount() {
    this.tryCount += 1;
    return this.tryCount;
  },

  resetCount() {
    this.tryCount = 0;
    return this.tryCount;
  }
};

// TODO: Вынести в отдельный конфиг-файл
export const LEVEL_DISPLAY_NAMES = {
  easy: 'easy',
  medium: 'medium',
  hard: 'HARD'
} as const;

