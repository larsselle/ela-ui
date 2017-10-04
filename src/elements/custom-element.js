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

  _setAttribute(name, value) {
    if (value) {
      if (this.getAttribute(name) !== value) {
        if (typeof wert === 'boolean')
          this.setAttribute(name, '');
        else
          this.setAttribute(name, value);
      }
    }
    else {
      if (this.hasAttribute(name))
        this.removeAttribute(name);
    }
  }
}
