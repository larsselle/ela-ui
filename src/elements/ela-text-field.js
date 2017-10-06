import {CustomElement} from './custom-element';
import * as core from '../core';

import './ela-text-field.css'

class ElaTextField extends CustomElement{
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div>
      <label></label>
      <input type="text"/>
    </div>
    <label class="message help"></label>
    `;

    this._textField = this.querySelector('div');
    this._label = this.querySelector('div > label');
    this._input = this.querySelector('div > input');
    this._message = this.querySelector('label.message');
    this._input.addEventListener('change', this._textboxChange.bind(this));
    this._input.addEventListener('focus', this._textboxFocus.bind(this));
    this._input.addEventListener('blur', this._textboxBlur.bind(this));

    if (this.id) {
      this._label.htmlFor = this.id + 'Input';
      this._input.id = this.id + 'Input';
    }

    if (this.text) {
      this._label.innerText = this.text;
    }

    if (this.value) {
      this._input.value = this.value;
      this._label.classList.add('top');
    }

    if (this.placeholder) {
      this._input.placeholder = this.placeholder;
      this._label.classList.add('top');
    }

    if (this.help) {
      this._message.innerText = this.help;
    }

    if (this.error) {
      this._message.innerText = this.error;
      core.changeCssClass(this._message, 'help', 'error');
      this._textField.classList.add('error');
    }
  }

  disconnectedCallback() {
    this._input.removeEventListener('change', this._textboxChange);
    this._input.removeEventListener('focus', this._textboxFocus);
    this._input.removeEventListener('blur', this._textboxBlur);
  }

  static get observedAttributes() {
    return ['text', 'value', 'placeholder', 'disabled', 'help', 'error'];
  }

  focus() {
    if (this._input && !this.disabled)
      this._input.focus();
  }

  _textboxChange(e){
    this.dispatchEvent(new Event('change'));
  }

  _textboxFocus(e) {
    if (!this.disabled) {
      this._label.classList.add('top');
      this._textField.classList.add('focus');
      this.dispatchEvent(new Event('focus'));
    }
  }

  _textboxBlur(e) {
    if (!this._placeholder && !this._input.value)
      this._label.classList.remove('top');
    this._textField.classList.remove('focus');
    this.dispatchEvent(new Event('blur'));
  }

  get text() {
    return this._text;
  }

  set text(value) {
    if (this._text !== value) {
      this._text = value;
      super._setAttribute('text', value);
      if (this._label)
        this._label.innerText = value;
    }
  }

  get value() {
    return this._value;
  }

  set value(value){
    if (this._value !== value) {
      this._value = value;
      super._setAttribute('value', value);
      if (this._input) {
        this._input.value = value;
        if (this._label) {
          if (!value && !this._placeholder) {
            this._label.style.display = 'none';
            this._input.placeholder = this._label.innerText;
          }
          else {
            this._label.style.display = this._labelDisplay;
          }
        }
      }
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value){
    if (this._placeholder !== value) {
      this._placeholder = value;
      super._setAttribute('placeholder', value);
      if (this._input)
        this._input.placeholder = value;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value){
    super._setAttribute('disabled', value);
    if (this._input)
      this._input.disabled = value;
  }

  get help() {
    return this._help;
  }

  set help(value) {
    if (this._help !== value) {
      this._help = value;
      super._setAttribute('help', value);
      if (this._message && !this.error)
        this._message.innerText = value;
    }
  }

  get error() {
    return this._error;
  }

  set error(value) {
    if (this._error !== value) {
      this._error = value;
      super._setAttribute('error', value);
      if (this._message)
        if (value) {
          this._message.innerText = value;
          core.changeCssClass(this._message, 'help', 'error');
          this._textField.classList.add('error');
        }
        else {
          this._message.innerText = this._help;
          core.changeCssClass(this._message, 'error', 'help');
          this._textField.classList.remove('error');
        }
    }
  }
}

core.defineCustomElement('ela-text-field', ElaTextField);
