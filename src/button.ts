import { BaseWebComponent } from '@simon_he/base-webcomponent'
import { getAttributes } from '../utils'

export class AdwButton extends BaseWebComponent {
  name = 'adw-button'
  css(): string {
    return `
        .${this.name} {
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
        .${this.name}-default {
          background-color: #fff;
          border-color: #d9d9d9;
          box-shadow: 0 2px 0 rgba(0,0,0,.02);
        }
        .${this.name}-default:hover {
          color: #4096ff;
          border-color: #4096ff;
        }

        .${this.name}-primary {
          color: #fff;
          background-color: #1677ff;
          box-shadow: 0 2px 0 rgba(5,145,255,.1);
        }
        .${this.name}-primary:hover {
          background-color: #4096ff;
        }

        .${this.name}-dashed {
          background-color: #fff;
          border-color: #d9d9d9;
          box-shadow: 0 2px 0 rgba(0,0,0,.02);
          border-style: dashed;
        }
        .${this.name}-dashed:hover {
          color: #4096ff;
          border-color: #4096ff;
        }

        .${this.name}-text {

        }
        .${this.name}-text:hover {
          background-color: rgba(0,0,0,.06);
        }

        .${this.name}-link {
          color: #1677ff;
        }
        .${this.name}-link:hover {
          color: #69b1ff;
        }

        .${this.name}[danger] {
          color: #ff4d4f;
        }
        .${this.name}-primary[danger],.${this.name}-default[danger],.${this.name}-dashed[danger] {
          border-color: #ff4d4f;
          background-color:transparent;
        }
        .${this.name}-primary[danger],.${this.name}-default[danger],.${this.name}-dashed[danger] {
          border-color: #ffa39e;
        }
        .${this.name}[danger]:hover {
          color: #ff7875;
        }
        .${this.name}-text[danger]:hover {
          color: #ff7875;
          background-color: #fff2f0;
        }

        .${this.name}[disabled]{
          cursor: not-allowed;
          color: rgba(0,0,0,.25);
          background-color: transparent;
        }
        .${this.name}-primary[disabled],.${this.name}-default[disabled],.${this.name}-dashed[disabled]{
          border-color: #d9d9d9;
          background-color: rgba(0,0,0,.04);
          box-shadow: none;
        }

        .${this.name}[ghost]{
          box-shadow:none;
          background-color: transparent;
        }
        .${this.name}-primary[ghost]{
          color: rgb(22, 119, 255);
          border-color: rgb(22, 119, 255);
        }
        .${this.name}-primary[ghost]:hover{
          color: rgb(64, 150, 255);
          border-color: rgb(64, 150, 255);
        }
        .${this.name}[shape="round"]{
          border-radius: 8px;
        }
        .${this.name}[shape="circle"]{
          border-radius: 50%;
        }

        .${this.name}[size="large"]{
          padding: 6.42857px 15px;
          height:40px;
          font-size:16px;
        }
        .${this.name}[size="small"]{
          padding: 0px 7px;
          height: 24px;
        }

        .${this.name}[block]{
          width:100%;
        }
        `
  }

  template(): string {
    const { type = 'default', className = '' } = this.props
    const attributes = getAttributes(this.props)
    const btnClass = `${this.name} ${this.name}-${type} ${className}`
    return `<button class="${btnClass}" ${attributes}><slot></slot></button>`
  }
}

export function registerButton(name = 'adw-button') {
  if (window.customElements.get(name))
    return
  window.customElements.define(name, AdwButton)
}
