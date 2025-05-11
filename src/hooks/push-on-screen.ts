import { playSound } from "../components/sounds";

export function pushItOnSkreen(
  keys: string | string[],
  container: HTMLInputElement
) {

  container.value = '';
  const sequence = Array.isArray(keys) ? keys : [keys];
  let currentIndex = 0;

  const showNextSymbol = () => {
    if (currentIndex >= sequence.length) return;

    const currentKey = sequence[currentIndex];
    const keyElement = document.querySelector(`[data-key="${currentKey}"]`);

    if (keyElement) {
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
      console.error('Element not found for key:', currentKey);
    }
  };

  showNextSymbol();
}
