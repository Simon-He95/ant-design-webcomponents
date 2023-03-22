import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwText extends BaseWebComponent {
  name = 'adw-text'
  map: any = {
    delete: 'del',
    underline: 'u',
    keyboard: 'kbd',
    code: 'code',
    mark: 'mark',
    strong: 'strong',
    italic: 'i',
  }

  css(): string {
    return `
    .${this.name}{
      word-break: break-word;
      line-height: 1.5714285714285714;
      font-size:14px;
    }
    .${this.name}-default{
      color: rgba(0,0,0,.88);
    }
    .${this.name}-secondary{
      color: rgba(0,0,0,.45);
    }
    .${this.name}-success{
      color: #52c41a;
    }
    .${this.name}-warning{
      color: #faad14;
    }
    .${this.name}-danger{
      color: #ff4d4f;
    }
    .${this.name}[disabled]{
      color: rgba(0,0,0,.25);
      cursor: not-allowed;
      user-select: none;
    }
    .${this.name} mark{
      padding:0;
      background-color: #ffe58f;
    }
    .${this.name} code{
      margin: 0 0.2em;
      padding-inline: 0.4em;
      padding-block: 0.2em 0.1em;
      font-size: 85%;
      font-family: sfmono-regular,Consolas,liberation mono,Menlo,Courier,monospace;
      background: rgba(150,150,150,.1);
      border: 1px solid rgba(100,100,100,.2);
      border-radius: 3px;
    }
    .${this.name} kbd{
      margin: 0 0.2em;
      padding-inline: 0.4em;
      padding-block: 0.15em 0.1em;
      font-size: 90%;
      font-family: sfmono-regular,Consolas,liberation mono,Menlo,Courier,monospace;
      background: rgba(150,150,150,.06);
      border: 1px solid rgba(100,100,100,.2);
      border-bottom-width: 2px;
      border-radius: 3px;
    }
    .${this.name} u{
      text-decoration: underline;
      text-decoration-skip-ink: auto;
    }
    .${this.name} del{
      text-decoration: line-through;
    }
    .${this.name} strong{
      font-weight: 600;
    }
    .${this.name} i{
      font-style: italic;
    }
    `
  }

  template(): string {
    const { type = 'default', className = '' } = this.props
    const attributes = getAttributes(this.props)
    const btnClass = `${this.name} ${this.name}-${type} ${className}`

    for (const key in this.props) {
      const mapValue = this.map[key]
      if (!mapValue)
        continue
      return `<span class="${btnClass}" ${attributes}><${mapValue}><slot></slot></${mapValue}></span>`
    }

    return `<span class="${btnClass}" ${attributes}><slot></slot></span>`
  }
}

export function registerText(name = 'adw-text') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwText)
}
