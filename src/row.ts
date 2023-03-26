import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwRow extends BaseWebComponent {
  name = 'adw-row'
  css(): string {
    const { gutter = 0 } = this.props
    return `
    :host{
      height:100%;
    }
    .${this.name}{
      margin-left: -8px;
      margin-right: -8px;
      display: flex;
      flex-flow: row wrap;
      min-width: 0;
      font-size: 14px;
      box-sizing: border-box;
      row-gap: ${gutter}px;
      margin-left:-${+gutter / 2}px;
      margin-right:-${+gutter / 2}px;
    }
      `
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const rowClass = this.lintClass(`${this.name} ${className}`)
    return `<div class="${rowClass}" ${attributes}><slot></slot></div>`
  }
}

export function registerRow(name = 'adw-row') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwRow)
}
