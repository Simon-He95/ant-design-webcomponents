import { BaseWebComponent } from '@simon_he/base-webcomponent'

export class AdwButton extends BaseWebComponent {
  prefix = 'adw-button'
  css(): string {
    return `
        button {
          outline: none;
          position: relative;
          display: inline-block;
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          background-image: none;
          background-color: transparent;
          cursor: pointer;
          touch-action: manipulation;
          line-height: 1.5714285714285714;
          color: rgba(0,0,0,.88);
          transition: all .2s cubic-bezier(.645,.045,.355,1);
          font-size: 14px;
          padding: 4px 15px;
          border-radius: 6px;
          height:32px;
          border: 1px solid transparent;
        }
        .${this.prefix}-default {
          background-color: #fff;
          border-color: #d9d9d9;
          box-shadow: 0 2px 0 rgba(0,0,0,.02);
        }
        .${this.prefix}-default:hover {
          color: #4096ff;
          border-color: #4096ff;
        }
        `
  }

  template(): string {
    const { type = 'default' } = this.props
    const btnClass = `${this.prefix}-${type}`
    return `<button class="${btnClass}"><slot></slot></button>`
  }
}

export function registerButton(name = 'adw-button') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwButton)
}
