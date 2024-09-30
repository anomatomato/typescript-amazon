export function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`HTML Element with selector '${selector}' not found`);
    }
    return element;
}
//# sourceMappingURL=utils.js.map