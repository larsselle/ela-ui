export class CustomElement extends HTMLElement{
  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (typeof this[name] === 'boolean')
      newValue = this[name];
    notifyValueChanged(this, name, newValue, oldValue);
  }

  _setValue(name, value) {
    if (value) {
      if (this.getAttribute(name) !== value) {
        if (typeof value === 'boolean')
          this.setAttribute(name, '');
        else
          this.setAttribute(name, value);
      }
    }
    else {
      if (this.hasAttribute(name)) {
        this.removeAttribute(name);
      }
    }
  }
};

function notifyValueChanged(object, name, newValue, oldValue) {
  let fn = `on${name.charAt(0).toUpperCase()}${name.slice(1)}Changed`;
  if (typeof object[fn] === 'function')
    object[fn](newValue, oldValue);
};
