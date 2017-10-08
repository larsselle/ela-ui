import {CustomElement} from './custom-element';
import * as core from '../core';

import './ela-switch.css';

class ElaSwitch extends CustomElement {
  constructor() {
    super();

    this.addEventListener('click', this._clickEvent.bind(this));
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="track"></div>
    <div class="thumb"></div>
    `;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._clickEvent);
  }

  static get observedAttributes() {
    return ['checked', 'disabled'];
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value){
    super._setValue('checked', value);
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

  _clickEvent(e) {
    e.stopPropagation();
    this.checked = !this.checked;

    this.dispatchEvent(new CustomEvent('checked-changed', {
      detail: {checked: this.checked }, bubbles: false
    }));
  }
}

core.defineCustomElement('ela-switch', ElaSwitch);
