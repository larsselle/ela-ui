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

    this._input.disabled = this.disabled;
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
    if (!this.placeholder && !this._input.value)
      this._label.classList.remove('top');
    this._textField.classList.remove('focus');
    this.dispatchEvent(new Event('blur'));
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    super._setValue('text', value);
  }

  onTextChanged(newValue) {
    if (this._label)
      this._label.innerText = newValue;
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value){
    super._setValue('value', value);
  }

  onValueChanged(newValue) {
    if (this._input) {
      this._input.value = newValue;
      if (this._label) {
        if (!newValue && !this.placeholder) {
          this._label.classList.remove('top');
        }
        else {
          this._label.classList.add('top');
        }
      }
    }
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(value){
    super._setValue('placeholder', value);
  }

  onPlaceholderChanged(newValue) {
    if (this._input)
      this._input.placeholder = newValue;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    super._setValue('disabled', value);
  }

  onDisabledChanged(newValue) {
    if (this._input)
      this._input.disabled = newValue;
  }

  get help() {
    return this.getAttribute('help');
  }

  set help(value) {
    super._setValue('help', value);
  }

  onHelpChanged(newValue) {
    if (this._message && !this.error)
      this._message.innerText = newValue;
  }

  get error() {
    return this.getAttribute('error');
  }

  set error(value) {
    super._setValue('error', value);
  }

  onErrorChanged(newValue) {
    if (this._message)
      if (newValue) {
        this._message.innerText = newValue;
        core.changeCssClass(this._message, 'help', 'error');
        this._textField.classList.add('error');
      }
      else {
        this._message.innerText = this.help;
        core.changeCssClass(this._message, 'error', 'help');
        this._textField.classList.remove('error');
      }
  }
}

core.defineCustomElement('ela-text-field', ElaTextField);
