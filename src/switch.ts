import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export function toArray<T>(array: T) {
  if (Array.isArray(array))
    return array
  return [array]
}
export class AdwSwitch extends BaseWebComponent {
  name = 'adw-switch'
  _sizeMap: any = {
    small: 12,
    default: 24,
  }

  css(): string {
    return `
      .${this.name}{
        box-sizing: border-box;
        margin: inherit;
        padding: inherit;
        color: rgba(0,0,0,.88);
        font-size: 0;
        line-height: 22px;
        list-style: none;
        font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
        position: relative;
        display: inline-block;
        min-width: 44px;
        height: 22px;
        vertical-align: middle;
        background: rgba(0,0,0,.25);
        border: 0;
        border-radius: 100px;
        cursor: pointer;
        transition: all .2s;
        user-select: none;
      }
      .${this.name}-checked{
        background: #1677ff;
      }
      .${this.name}-checked .${this.name}-handle{
        inset-inline-start: calc(100% - 20px);
      }
      .${this.name}-unchecked .${this.name}-handle{
        inset-inline-start: 2px;
      }
      .${this.name}-handle{
        position: absolute;
        top: 2px;
        inset-inline-start: 2px;
        width: 18px;
        height: 18px;
        transition: all .2s ease-in-out;
      }
      .${this.name}-handle::before{
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        bottom: 0;
        inset-inline-start: 0;
        background-color: #fff;
        border-radius: 9px;
        box-shadow: 0 2px 4px 0 rgba(0,35,11,.2);
        transition: all .2s ease-in-out;
        content: "";
      }
      .${this.name}-inner{
        display: block;
        overflow: hidden;
        border-radius: 100px;
        height: 100%;
        padding-inline-start: 24px;
        padding-inline-end: 9px;
        transition: padding-inline-start .2s ease-in-out,padding-inline-end .2s ease-in-out;
      }
      .${this.name}-inner-checked{
        transition: margin-inline-start .2s ease-in-out,margin-inline-end .2s ease-in-out;
      }
      .${this.name}-inner-unchecked{
        transition: margin-inline-start .2s ease-in-out,margin-inline-end .2s ease-in-out;
      }
      .${this.name}-checked:hover:not([disabled]){
        background: #4096ff;
      }
      .${this.name}:hover:not(disabled){
        background: rgba(0,0,0,.45);
      }
      `
  }

  template(): string {
    const { className = '', checked = 'false' } = this.props

    const attributes = getAttributes(this.props)

    const switchClass = this.lintClass(
      `${this.name} ${className} ${
        checked === 'true' ? `${this.name}-checked` : `${this.name}-unchecked`
      }`,
    )

    this.registerEvent('on-change', this.name)

    return `<button type="button" role="switch" aria-checked="${checked}" class="${switchClass}" ${attributes}>
      <div class="${this.name}-handle"></div>
      ${checked ? 'nihao' : ''}
      <span class="${this.name}-inner">
        <span class="${this.name}-inner-checked"></span>
        <span class="${this.name}-inner-unchecked"></span>
      </span>
    </button>`
  }
}

export function registerSwitch(name = 'adw-switch') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwSwitch)
}
