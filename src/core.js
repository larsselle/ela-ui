import './core.css';

export function defineCustomElement(tagName, constructor, options) {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, constructor, options);
  }
};

export function changeCssClass(element, removeClass, addClass) {
  element.classList.add(addClass);
  element.classList.remove(removeClass);
};
