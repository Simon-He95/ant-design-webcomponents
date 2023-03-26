import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwMeta extends BaseWebComponent {
  name = 'adw-meta'

  css(): string {
    return `
      :host{
        margin: -4px 0;
        display: flex;
      }
      .${this.name}{
        all:inherit;
      }
      .${this.name}-detail{
        overflow: hidden;
        flex: 1;
      }
      .${this.name}-detail > div:not(:last-child){
        margin-bottom:8px;
      }
      .${this.name}-title{
        color: rgba(0,0,0,.88);
        font-weight: 600;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .${this.name}-description{
        color: rgba(0,0,0,.45);
      }
      `
  }

  template(): string {
    const { className = '', title = '', description = '' } = this.props
    const attributes = getAttributes(this.props, ['cover'])
    const metaClass = this.lintClass(`${this.name} ${className}`)

    return `<div class="${metaClass}" ${attributes}>
      <div class="${this.name}-detail">
      <div class="${this.name}-title">${title}</div>
      <div class="${this.name}-description">${description}</div>
      </div>
    </div>`
  }
}

export function registerMeta(name = 'adw-meta') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwMeta)
}
