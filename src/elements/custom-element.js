export function defineCustomElement(tagName, constructor, options) {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, constructor, options);
  }
};

export class CustomElement extends HTMLElement{
  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (typeof this[name] === 'boolean') {
      if (newValue === '' && this[name] === false)
        this[name] = true;
    }
    else {
      if (this[name] !== newValue)
        this[name] = newValue;
    }
  }

  _setAttribut(name, value) {
    if (wert) {
      if (this.getAttribute(name) !== wert) {
        if (typeof wert === 'boolean')
          this.setAttribute(name, '');
        else
          this.setAttribute(name, wert);
      }
    }
    else {
      if (this.hasAttribute(name))
        this.removeAttribute(name);
    }
  }
}
