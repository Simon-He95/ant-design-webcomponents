import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwSider extends BaseWebComponent {
  name = 'adw-sider'
  css(): string {
    return `
      :host {
        flex:0 0 200px;
      }
      .${this.name}{
        all: inherit;
        position:relative;
        flex: 0 0 200px;
      }
      `
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const siderClass = this.lintClass(`${this.name} ${className}`)
    return `<aside class="${siderClass}" ${attributes}><slot></slot></aside>`
  }
}

export function registerSider(name = 'adw-sider') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwSider)
}
