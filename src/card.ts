import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwCard extends BaseWebComponent {
  name = 'adw-card'
  css(): string {
    return `
      .${this.name}{
        margin:inherit;
        padding:inherit;
        text-align:left;
        width:inherit;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
        color: rgba(0,0,0,.88);
        font-size: 14px;
        line-height: 1.5714285714285714;
        list-style: none;
        font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
        position: relative;
        background: #fff;
        border-radius: 8px;
      }
      .${this.name}-cover{
        margin-top: -1px;
        margin-inline-start: -1px;
        margin-inline-end: -1px;
      }
      .${this.name}-hover:hover{
        border-color: transparent;
        box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09);
      }
      .${this.name}-cover img{
        border-radius: 8px 8px 0 0;
      }
      .${this.name}-cover > *{
        display: block;
        width: 100%;
        cursor:pointer;
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
    const { className = '', title = '', extra = '', cover } = this.props

    const attributes = getAttributes(this.props, ['cover'])
    console.log(this.props, attributes)

    const cardClass = `${this.name} ${className} ${
      cover ? `${this.name}-hover` : ''
    }`
    this.registerEvent('click-handler', `${this.name}-head-extra`)
    const head = cover
      ? `<div class="${this.name}-cover">${cover}</div>`
      : ` <div class="${this.name}-head">
      <div class="${this.name}-head-wrapper">
        <div class="${this.name}-head-title">${title}</div>
        <div class="${this.name}-head-extra" >${extra}</div>
      </div>
    </div>`
    return `<div class="${cardClass}" ${attributes}>
     ${head}
      <div class="${this.name}-body">
        <slot></slot>
      </div>
    </div>`
  }
}

export function registerCard(name = 'adw-card') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwCard)
}
