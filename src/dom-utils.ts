export function getElement<K extends HTMLElement>(selector: string): K {
  const element = document.querySelector<K>(selector);
  if (!element) {
    throw new Error(`HTML Element with selector '${selector}' not found`);
  }
  return element;
}