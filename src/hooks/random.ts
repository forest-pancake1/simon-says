import { gameState } from "./game-state";
import { pushItOnSkreen } from "./push-on-screen";

// TODO: Добавить тесты для проверки генерации последовательностей
export function getItRandomise(
  charsArray: string[],
  container: HTMLInputElement
): string[] {
  // FIXME: Добавить валидацию входных данных
  gameState.updateOutPut([]);
  const newSequence: string[] = [];

  // TODO: Добавить конфигурацию длины последовательности в зависимости от уровня сложности
  for(let i=0; i<gameState.numberOfChars; i++) {
    let randomIndex = Math.floor(Math.random() * charsArray.length);
    newSequence.push(charsArray[randomIndex]);
  }

  // FIXME: Убрать отладочный код перед деплоем
  console.log('последовательность:', newSequence);
  pushItOnSkreen(newSequence, container);
  return newSequence;
}