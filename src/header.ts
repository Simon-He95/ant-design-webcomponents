import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwHeader extends BaseWebComponent {
  name = 'adw-header'
  css(): string {
    return `
      .${this.name}{
        flex: 0 0 auto;
        height: 64px;
        padding-inline: 50px;
        color: inherit;
        line-height: 64px;
        background: inherit;
      }
      `
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const headerClass = `${this.name} ${className}`
    return `<header class="${headerClass}" ${attributes}><slot></slot></header>`
  }
}

export function registerHeader(name = 'adw-header') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwHeader)
}
