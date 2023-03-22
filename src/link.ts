import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwLink extends BaseWebComponent {
  name = 'adw-link'
  css(): string {
    return `
      .${this.name} {
        color: #1677ff;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color .3s;
       }
       .${this.name}:hover{
        color: #69b1ff;
       }
      `
  }

  template(): string {
    const linkClass = `${this.name}`
    const attributes = getAttributes(
      Object.assign(
        {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        this.props,
      ),
    )

    return `<a class="${linkClass}" ${attributes}><slot></slot></a>`
  }
}

export function registerLink(name = 'adw-link') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwLink)
}
