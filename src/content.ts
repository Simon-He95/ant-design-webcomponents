import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwContent extends BaseWebComponent {
  name = 'adw-content'
  css(): string {
    return `
      :host{
        flex: auto;
      }
      .${this.name}{
        all: inherit;
        min-height:120px;
      }
      `
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const contentClass = this.lintClass(`${this.name} ${className}`)
    return `<main class="${contentClass}" ${attributes}><slot></slot></main>`
  }
}

export function registerContent(name = 'adw-content') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwContent)
}
