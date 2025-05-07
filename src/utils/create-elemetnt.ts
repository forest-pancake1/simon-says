
export function createElement(
   tag: string,
   className?: string,
   parent?: HTMLElement,
   text?: string
  ): HTMLElement{
  const el = document.createElement(tag);
  if(className) el.className = className;
  if(parent) parent.append(el);
  if(text) el.textContent = text;
  return el
}