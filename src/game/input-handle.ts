
export const createInputHandlers = (input: HTMLInputElement) => {
  let currentHandler: ((e: Event) => void) | null = null;

  return {
    set(handler: (e: Event) => void) {
      this.clear();
      input.addEventListener('input', handler);
      currentHandler = handler;
    },

    clear() {
      if (currentHandler) {
        input.removeEventListener('input', currentHandler);
        currentHandler = null;
      }
    }
  };
};