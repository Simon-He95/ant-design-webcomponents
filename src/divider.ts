import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwDivider extends BaseWebComponent {
  name = 'adw-divider'
  css(): string {
    return `
        :host{
          width:100%;
        }
        .${this.name} {
          display: flex;
          align-items: center;
          margin: 16px 0;
          color: rgba(0,0,0,.88);
          font-weight: 500;
          font-size: 16px;
          white-space: nowrap;
          text-align: center;
          border-block-start: 0 rgba(5,5,5,.06);
          clear: both;
          width: 100%;
          min-width: 100%;
        }
        .${this.name}[dashed]{
          background: 0 0;
          border-color: rgba(5,5,5,.06);
          border-style: dashed;
          border-width: 1px 0 0;
        }
        .${this.name}[dashed]:before{
          width:0
        }
        .${this.name}[dashed]:after{
          width:0
        }
        .${this.name}::before{
          position: relative;
          width: 50%;
          border-block-start: 1px solid transparent;
          border-block-start-color: inherit;
          border-block-end: 0;
          transform: translateY(50%);
          content: '';
        }
        .${this.name}::after{
          position: relative;
          width: 50%;
          border-block-start: 1px solid transparent;
          border-block-start-color: inherit;
          border-block-end: 0;
          transform: translateY(50%);
          content: '';
        }
        .${this.name}-left::before{
          width: 5%;
        }
        .${this.name}-left::after{
          width: 95%;
        }
        .${this.name}-right::before{
          width: 95%;
        }
        .${this.name}-right::after{
          width: 5%;
        }
        .${this.name} span{
          color: rgba(0,0,0,.88);
          font-weight: 400;
          font-size: 14px;
          display: inline-block;
          padding: 0 1em;
        }
        `
  }

  template(): string {
    const { orientation = 'center', className = '' } = this.props
    const attributes = getAttributes(this.props)
    const dividerClass = this.lintClass(
      `${this.name} ${this.name}-${orientation} ${className}`,
    )
    if (this.props.plain !== undefined)
      return `<div class="${dividerClass}" ${attributes}><span><slot></slot></span></div>`
    return `<div class="${dividerClass}" ${attributes}><slot></slot></div>`
  }
}

export function registerDivider(name = 'adw-divider') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwDivider)
}
