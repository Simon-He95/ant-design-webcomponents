import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwCard extends BaseWebComponent {
  name = 'adw-card'
  css(): string {
    return `
      .${this.name}{
        text-align:left;
        width:inherit;
        border: 1px solid #f0f0f0;
        ox-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.88);
        font-size: 14px;
        line-height: 1.5714285714285714;
        list-style: none;
        font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
        position: relative;
        background: #fff;
        border-radius: 8px;
      }
      .${this.name}-head{
        min-height: 38px;
        padding: 0 12px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: -1px;
        color: rgba(0,0,0,.88);
        font-weight: 600;
        background: 0 0;
        border-bottom: 1px solid #f0f0f0;
        border-radius: 8px 8px 0 0;
      }

      .${this.name}-head-wrapper{
        width:100%;
        display:flex;
        align-items:center;
      }

      .${this.name}-head-title{
        display: inline-block;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .${this.name}-head-extra{
        margin-inline-start: auto;
        font-weight: 400;
        font-size: 14px;
      }

      .${this.name}-body{
        padding: 12px;
        border-radius: 0 0 8px 8px;
      }
      `
  }

  template(): string {
    const { className = '', title = '', extra = '' } = this.props
    const attributes = getAttributes(this.props)
    const cardClass = `${this.name} ${className}`
    this.registerEvent('click-handler', `${this.name}-head-extra`)
    // this.registerEvent('click-handler', `${this.name}-head-extra`, 'mouseenter')
    return `<div class="${cardClass}" ${attributes}>
      <div class="${this.name}-head">
        <div class="${this.name}-head-wrapper">
          <div class="${this.name}-head-title">${title}</div>
          <div class="${this.name}-head-extra" >${extra}</div>
        </div>
      </div>
      <div class="${this.name}-body">
        <slot></slot>
      </div>
    </div>`
  }

  registerEvent(emitName: string, selector: string, eventName = 'click') {
    const event = new CustomEvent(emitName)

    this.addEventListener(
      eventName,
      (e) => {
        e.preventDefault()
        // todo: 解决鼠标事件触发元素不正确的问题
        const target = e.composedPath()[0] as Element

        if (target?.className === selector)
          this.dispatchEvent(event)
      },
      false,
    )
  }

  deactivate() {}
}

export function registerCard(name = 'adw-card') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwCard)
}
