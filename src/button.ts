import { BaseWebComponent } from '@simon_he/base-webcomponent'

export class AdwButton extends BaseWebComponent {
  prefix = 'adw-button'
  css(): string {
    return `
        button {
          outline: none;
          position: relative;
          display: inline-block;
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          background-image: none;
          background-color: transparent;
          cursor: pointer;
          touch-action: manipulation;
          line-height: 1.5714285714285714;
          color: rgba(0,0,0,.88);
          transition: all .2s cubic-bezier(.645,.045,.355,1);
          font-size: 14px;
          padding: 4px 15px;
          border-radius: 6px;
          height:32px;
          border: 1px solid transparent;
        }
        .${this.prefix}-default {
          background-color: #fff;
          border-color: #d9d9d9;
          box-shadow: 0 2px 0 rgba(0,0,0,.02);
        }
        .${this.prefix}-default:hover {
          color: #4096ff;
          border-color: #4096ff;
        }

        .${this.prefix}-primary {
          color: #fff;
          background-color: #1677ff;
          box-shadow: 0 2px 0 rgba(5,145,255,.1);
        }
        .${this.prefix}-primary:hover {
          background-color: #4096ff;
        }

        .${this.prefix}-dashed {
          background-color: #fff;
          border-color: #d9d9d9;
          box-shadow: 0 2px 0 rgba(0,0,0,.02);
          border-style: dashed;
        }
        .${this.prefix}-dashed:hover {
          color: #4096ff;
          border-color: #4096ff;
        }

        .${this.prefix}-text {

        }
        .${this.prefix}-text:hover {
          background-color: rgba(0,0,0,.06);
        }

        .${this.prefix}-link {
          color: #1677ff;
        }
        .${this.prefix}-link:hover {
          color: #69b1ff;
        }

        .${this.prefix}[danger] {
          color: #ff4d4f;
        }
        .${this.prefix}-primary[danger],.${this.prefix}-default[danger],.${this.prefix}-dashed[danger] {
          border-color: #ff4d4f;
          background-color:transparent;
        }
        .${this.prefix}-primary[danger],.${this.prefix}-default[danger],.${this.prefix}-dashed[danger] {
          border-color: #ffa39e;
        }
        .${this.prefix}[danger]:hover {
          color: #ff7875;
        }
        .${this.prefix}-text[danger]:hover {
          color: #ff7875;
          background-color: #fff2f0;
        }

        .${this.prefix}[disabled]{
          cursor: not-allowed;
          color: rgba(0,0,0,.25);
          background-color: transparent;
        }
        .${this.prefix}-primary[disabled],.${this.prefix}-default[disabled],.${this.prefix}-dashed[disabled]{
          border-color: #d9d9d9;
          background-color: rgba(0,0,0,.04);
          box-shadow: none;
        }

        .${this.prefix}[ghost]{
          box-shadow:none;
          background-color: transparent;
        }
        .${this.prefix}-primary[ghost]{
          color: rgb(22, 119, 255);
          border-color: rgb(22, 119, 255);
        }
        .${this.prefix}-primary[ghost]:hover{
          color: rgb(64, 150, 255);
          border-color: rgb(64, 150, 255);
        }
        .${this.prefix}[shape="round"]{
          border-radius: 8px;
        }
        .${this.prefix}[shape="circle"]{
          border-radius: 50%;
        }

        .${this.prefix}[size="large"]{
          padding: 6.42857px 15px;
          height:40px;
          font-size:16px;
        }
        .${this.prefix}[size="small"]{
          padding: 0px 7px;
          height: 24px;
        }

        .${this.prefix}[block]{
          width:100%;
        }
        `
  }

  template(): string {
    const { type = 'default' } = this.props
    const attributes = Object.keys(this.props)
      .map((key) => {
        const value = this.props[key]
        if (value === '')
          return key
        return `${key}="${value}"`
      })
      .join(' ')

    const btnClass = `${this.prefix} ${this.prefix}-${type}`
    return `<button class="${btnClass}" ${attributes}><slot></slot></button>`
  }
}

export function registerButton(name = 'adw-button') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwButton)
}
