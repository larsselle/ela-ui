import {CustomElement} from './custom-element';
import * as core from '../core';

import './ela-button.css'

class ElaButton extends CustomElement{
  constructor() {
    super();

    this.addEventListener('click', this.clickEvent.bind(this));
  }

  connectedCallback() {
    if (!this.type)
      this.type = 'flat';
    if (this.text)
      this.innerText = this.text;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.clickEvent);
  }

  static get observedAttributes() {
    return ['text', 'type', 'disabled'];
  }

  get text() {
    return this._text;
  }

  set text(value){
    if (this._text !== value) {
      this._text = value;
      super._setAttribute('text', value);
      this.innerText = this._text;
    }
  }

  get type() {
    return this._type;
  }

  set type(value){
    if (this._type !== value) {
      this._type = value;
      super._setAttribute('type', value);
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value){
    super._setAttribute('disabled', value);
  }

  clickEvent(e) {
    e.stopPropagation();

    if (!this.disabled) {
      this.dispatchEvent(new Event('click'));
    }
  }
}

core.defineCustomElement('ela-button', ElaButton);
