export type Mode = 'closed' | 'open'
export type EventName = keyof HTMLElementEventMap

export function toArray<T>(array: T) {
  if (Array.isArray(array))
    return array
  return [array]
}

export const sugarReg = /({{([\w\s\+\-_'"\*\/\$\.]+)}})/g

export class BaseWebComponent extends HTMLElement {
  props: Record<string, string> = {}
  shadowRoot: ShadowRoot
  mounted = false
  sideEffects: (() => void)[] = []
  constructor(mode: Mode = 'open') {
    super()
    this.shadowRoot = this.attachShadow({ mode })
    this.render()
  }

  initialProps() {
    const mutationObserver = new MutationObserver(() => this.setProps())
    mutationObserver.observe(this, {
      attributes: true,
    })
    // 如果没有props，也需要渲染
    Promise.resolve().then(() => !this.mounted && this.setProps())
  }

  setProps() {
    this.props = [...(this.attributes as any)].reduce((result, item) => {
      const { name, value } = item
      result[name] = value
      return result
    }, {} as Record<string, string>)
    // render propsTemplate
    const html = this.renderTemplate(this.getPropsTemplate())
    this.renderHtml(html)
    this.renderCss()
    this.mounted = true
  }

  getPropsTemplate() {
    let _template = this.template()
    for (const match of _template.matchAll(sugarReg) || []) {
      const sugar = match[2]
      const value
        = new Function(
          `const props = ${JSON.stringify(this.props)}\n return ${sugar}`,
        )() ?? ''

      _template = _template.replace(match[0], value)
    }
    return _template
  }

  getPropsValue(sugar: string) {
    try {
      return sugar
        .split('.')
        .slice(1)
        .reduce((props, key) => props[key], this.props as any)
    }
    catch (error) {
      return undefined
    }
  }

  render() {
    // todo: 不再整个render重新渲染, 按需更新
    // plan1: 借助vue 将模板编译成vnode, 比较props更新前后的vnode, 按需更新
    // plan2: 直接比较dom属性, 按需更新，后续判断节点是否可以更新
    this.initialProps()
    // this.renderHtml(this.html())
  }

  renderTemplate(templateStr: string): any {
    const div = document.createElement('div')
    div.innerHTML = templateStr

    return [...(div.childNodes as any)]
  }

  renderHtml(html: Node[] | Node) {
    if (!this.mounted) {
      this.shadowRoot.replaceChildren(...toArray(html))
    }
    else {
      const oldChildren = this.shadowRoot.childNodes as unknown as Element[]
      const newChildren = toArray(html) as Element[]
      this.patchChildren(oldChildren, newChildren)
    }
  }

  patchChildren(oldChildren: Element[], newChildren: Element[]) {
    // 目前只考虑直接更新的情况
    for (let i = 0; i < oldChildren.length; i++) {
      const oldChild = oldChildren[i]
      const newChild = newChildren[i]
      this.patchProps(oldChild, newChild)
      // 内容
      const oldTag = oldChild.nodeName
      const newTag = newChild.nodeName
      if (oldTag === newTag) {
        if (oldTag === '#text') {
          if (oldChild.textContent !== newChild.textContent)
            oldChild.textContent = newChild.textContent

          continue
        }
        else {
          this.patchChildren(
            oldChild.childNodes as unknown as Element[],
            newChild.childNodes as unknown as Element[],
          )
        }
      }
      else {
        oldChild.parentElement!.replaceChildren(newChild)
      }
    }
    // 老节点多余新节点
    for (let i = oldChildren.length; i < newChildren.length; i++) {
      const oldChild = oldChildren[i]
      oldChild.parentElement!.removeChild(oldChild)
    }

    // 新节点多余老节点
    if (oldChildren.length < newChildren.length) {
      oldChildren[0].parentElement!.append(
        ...newChildren.slice(oldChildren.length),
      )
    }
  }

  patchProps(oldChild: Element, newChild: Element) {
    const oldProps = this.getAttributes(oldChild)
    const newProps = this.getAttributes(newChild)
    for (const key in oldProps) {
      const value = oldProps[key]
      const newValue = newProps[key]
      if (key in newProps && newValue !== value)
        oldChild.setAttribute(key, newValue)
    }
    for (const key in newProps) {
      if (!(key in oldProps))
        oldChild.removeAttribute(key)
    }
  }

  getAttributes(element: Element) {
    const attrs = element.attributes
    const result: Record<string, string> = {}
    if (!attrs)
      return result
    for (let i = 0; i < attrs.length; i++) {
      const key = attrs[i].name
      const value = attrs[i].value
      result[key] = value
    }
    return result
  }

  renderCss() {
    const stylesheet: CSSStyleSheet = new CSSStyleSheet()
    stylesheet.replaceSync(this.css())
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }

  css(): string {
    throw new Error('必须重写父类 css 方法')
  }

  html(): any {
    return this.renderTemplate(this.template())
  }

  template(): string {
    throw new Error('必须重写父类 html 或者 template 方法')
  }

  registerEvent(
    emitName: string,
    selector: string,
    eventName: EventName = 'click',
  ) {
    // 绑定事件
    const event = new CustomEvent(emitName) as Event
    const effect = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      // mouseenter存在一定问题获取不到真正的元素
      const targets = e.composedPath() as Element[]
      const actualTarget = targets.find((target) => {
        const className = target.className
        return (
          typeof className === 'string'
          && className.split(' ').includes(selector)
        )
      })
      if (actualTarget)
        this.dispatchEvent(Object.assign(event, { actualTarget }))
      return false
    }
    this.addEventListener(eventName, effect, false)
    this.sideEffects.push(() =>
      this.removeEventListener(eventName, effect, false),
    )
    this.sideEffects.push(() =>
      this.removeEventListener(emitName as EventName, event as any),
    )
  }

  lintClass(className: string) {
    return className.trim().replace(/\s+/g, ' ')
  }

  disconnectedCallback() {
    // 销毁事件
    this.sideEffects.forEach(effect => effect())
    this.sideEffects.length = 0
  }

  percent(n: number | string) {
    return `${(+n / 24) * 100}%`
  }
}
