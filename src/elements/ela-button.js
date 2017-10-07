import {CustomElement} from './custom-element';
import * as core from '../core';

import './ela-button.css'

class ElaButton extends CustomElement{
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.type)
      this.type = 'flat';
    if (this.text)
      this.innerText = this.text;
  }

  static get observedAttributes() {
    return ['text', 'type', 'disabled'];
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value){
    super._setValue('text', value);
  }

  onTextChanged(newValue) {
    this.innerText = newValue;
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(value){
    super._setValue('type', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value){
    super._setValue('disabled', value);
  }

  onDisabledChanged(newValue) {
    if (newValue)
      this.style.pointerEvents = 'none';
    else
      this.style.pointerEvents = 'auto';
  }
}

core.defineCustomElement('ela-button', ElaButton);
