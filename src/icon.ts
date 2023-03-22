import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwIcon extends BaseWebComponent {
  name = 'adw-icon'
  css(): string {
    return `
      .${this.name} {
        display:inline-flex;
        line-height:0;
        color:inherit;
        text-align:center;
        text-transform: none;
        vertical-align: -0.125em;
       }
       .${this.name}[spin]{
        animation: loadingSpinner 1s infinite linear;
       }
       @keyframes loadingSpinner{
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
         }
       }
      `
  }

  template(): string {
    const { component } = this.props
    const iconClass = `${this.name}`
    const attributes = getAttributes(this.props, ['component'])

    return `<span class="${iconClass}" ${attributes}>${component}</span>`
  }
}

export function registerIcon(name = 'adw-icon') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwIcon)
}
