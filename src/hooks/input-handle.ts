// TODO: Рассмотреть использование паттерна Observer для управления подписками
// TODO: Добавить типы для возвращаемого объекта
export const createInputHandlers = (input: HTMLInputElement) => {
  // FIXME: Нарушение принципа инверсии зависимостей (DIP) - прямая зависимость от DOM
  let currentHandler: ((_e: Event) => void) | null = null;

  // TODO: Рассмотреть использование паттерна Proxy для контроля доступа к обработчикам
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