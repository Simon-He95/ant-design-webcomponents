import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwLayout extends BaseWebComponent {
  name = 'adw-layout'
  css(): string {
    const hasSider = [...(this.childNodes as any)].some(
      item => item.name === 'adw-sider',
    )

    return `
      :host{
        width:100%;
      }
      .${this.name}{
        all: inherit;
        display: flex;
        flex: auto;
        flex-direction: ${hasSider ? 'row' : 'column'};
        min-height: 0;
        background: #f5f5f5;
      }
      `
  }

  percent(n: number | string) {
    return `${(+n / 24) * 100}%`
  }

  template(): string {
    const { className = '' } = this.props
    const attributes = getAttributes(this.props)
    const layoutClass = this.lintClass(`${this.name} ${className}`)
    return `<section class="${layoutClass}" ${attributes}><slot></slot></section>`
  }
}

export function registerLayout(name = 'adw-layout') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwLayout)
}
