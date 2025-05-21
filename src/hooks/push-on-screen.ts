import { playSound } from "../components/sounds";

// TODO: Рассмотреть использование паттерна Iterator для последовательного отображения
// TODO: Вынести константы таймаутов в конфигурацию
export function pushItOnSkreen(
  keys: string | string[],
  container: HTMLInputElement
) {
  // FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от DOM
  container.value = '';
  const sequence = Array.isArray(keys) ? keys : [keys];
  let currentIndex = 0;

  // TODO: Рассмотреть использование паттерна State для управления анимацией
  const showNextSymbol = () => {
    if (currentIndex >= sequence.length) return;

    const currentKey = sequence[currentIndex];
    const keyElement = document.querySelector(`[data-key="${currentKey}"]`);

    if (keyElement) {
      // FIXME: Нарушение принципа единой ответственности (SRP) - смешивание логики отображения и анимации
      const displayChar = keyElement.textContent?.trim() || currentKey.replace('Key', '').replace('Digit', '');
      playSound('tipe');
      keyElement.classList.add('active');
      container.value += displayChar;
      
      setTimeout(() => {
        keyElement.classList.remove('active');
      }, 500);
      
      currentIndex++;
      setTimeout(showNextSymbol, 800);
    } else {
      // FIXME: Убрать отладочный код
      console.error('Element not found for key:', currentKey);
    }
  };

  showNextSymbol();
}
