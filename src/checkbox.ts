import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwCheckbox extends BaseWebComponent {
  name = 'adw-checkbox'
  css(): string {
    return `
      :host {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        --primary-color-opacity-600:
        color-mix(in srgb, var(--primary-color) 60%, transparent);
        }
        :host([disabled]) {
          cursor: default;
          color: var(--disabled-color, rgba(0, 0, 0, 0.25));
      }
      .${this.name}:disabled {
        opacity: 0.6;
    }
        .${this.name}-wrapper {
          display:flex;
          align-items:center;
          gap: 8px;
        }
        .${this.name} {
          position: relative;
          appearance: none;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          padding: 2px;
          margin: 0px;
          cursor: inherit;
          border-radius: 4px;
          border: 1px solid var(--border-color, #d9d9d9);
          outline-color: var(--primary-color-opacity-600);
          outline-width: 2px;
          outline-offset: 1px;
          transition: var(--transition, 0.2s);
        }
        .${this.name}[checked="true"]{
          border-color: var(--primary-color, royalblue);
          background-color: var(--primary-color, royalblue);
        }
        .${this.name}::before {
          content: "";
          position: absolute;
          inset: 0px;
          background: url("data:image/svg+xml,%3Csvg%20viewBox='0%200%201024%201024'%20xmlns='http://www.w3.org/2000/svg'%20fill='%23fff'%20overflow='hidden'%3E%3Cpath%20d='M700.723%20331.008l73.984%2070.758-329.574%20344.781-192.666-190.105%2071.936-72.91%20118.63%20117.044z'/%3E%3C/svg%3E") 50% center / 150% no-repeat;
          opacity: 0;
       }
      .${this.name}:after {
          content: "";
          position: absolute;
          inset: -8px;
      }
        .${this.name}:checked::before {
          opacity: 1;
      }
        label{
          display: contents;
          cursor: inherit;
        }

        `
  }

  template(): string {
    const { className = '', disabled } = this.props
    const attributes = getAttributes(this.props)
    const checkboxClass = this.lintClass(`${this.name} ${className}`)
    if (disabled === undefined || disabled === 'false')
      this.registerEvent('click-handler', `${this.name}-wrapper`)
    return `
    <div class="${this.name}-wrapper">
      <input id="${this.name}" type="checkbox" class="${checkboxClass}" ${attributes}></input>
      <label for="${this.name}"><slot></slot></label>
    </div>
    `
  }
}

export function registerCheckbox(name = 'adw-checkbox') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwCheckbox)
}
