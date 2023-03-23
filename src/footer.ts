import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwFooter extends BaseWebComponent {
  name = 'adw-footer'
  css(): string {
    return `
      .${this.name}{
        all: inherit;
        padding: 24px 50px;
      }
      `
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const footerClass = `${this.name} ${className}`
    return `<footer class="${footerClass}" ${attributes}><slot></slot></footer>`
  }
}

export function registerFooter(name = 'adw-footer') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwFooter)
}
