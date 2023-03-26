import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwTitle extends BaseWebComponent {
  name = 'adw-title'
  css(): string {
    return `
      .${this.name}{
        display:block;
        margin-bottom: 0.5em;
        color: rgba(0,0,0,.88);
        font-weight: 600;
      }
      `
  }

  template(): string {
    const { level = 1, className = '' } = this.props
    const attributes = getAttributes(this.props)
    const titleClass = this.lintClass(`${this.name} ${className}`)
    return `<h${level} class="${titleClass}" ${attributes}><slot></slot></h${level}>`
  }
}

export function registerTitle(name = 'adw-title') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwTitle)
}
