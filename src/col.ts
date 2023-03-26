import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwCol extends BaseWebComponent {
  name = 'adw-col'
  css(): string {
    const { span = 0, offset = 0 } = this.props
    return `
      :host{
        display:block;
        flex: 0 0 ${this.percent(span)};
        background: transparent;
        margin-inline-start: ${this.percent(offset)};
        border: 0;
        height:100%;
        min-height: 30px;
        margin: 8px 0;
      }
      .${this.name}{
        color: #fff;
        text-align: center;
        border-radius: 0;
        padding: 16px 0;
        background:transparent;
        text-align:center;
      }
      `
  }

  percent(n: number | string) {
    return `${(+n / 24) * 100}%`
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const colClass = this.lintClass(`${this.name} ${className}`)
    return `<div class="${colClass}" ${attributes}><slot></slot></div>`
  }
}

export function registerCol(name = 'adw-col') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwCol)
}
