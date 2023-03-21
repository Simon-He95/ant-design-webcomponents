import {
  require_fs,
  require_path,
  require_process,
  require_url,
} from './chunk-Z53EMXZP.js'
import { __commonJS, __publicField, __toESM } from './chunk-WQG2LZMB.js'

// browser-external:module
const require_module = __commonJS({
  'browser-external:module': function (exports, module) {
    module.exports = Object.create(
      new Proxy(
        {},
        {
          get(_, key) {
            if (
              key !== '__esModule' &&
              key !== '__proto__' &&
              key !== 'constructor' &&
              key !== 'splice'
            )
              console.warn(
                `Module "module" has been externalized for browser compatibility. Cannot access "module.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`,
              )
          },
        },
      ),
    )
  },
})

// node_modules/.pnpm/@unocss+preset-icons@0.29.6/node_modules/@unocss/preset-icons/dist/fs.mjs
const import_fs4 = __toESM(require_fs(), 1)

// node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/index.mjs
const import_path3 = __toESM(require_path(), 1)
const import_fs3 = __toESM(require_fs(), 1)
const import_module = __toESM(require_module(), 1)

// node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/dist/shared.mjs
const import_fs = __toESM(require_fs(), 1)
const import_path = __toESM(require_path(), 1)
const import_url = __toESM(require_url(), 1)
const import_process = __toESM(require_process(), 1)
const import_path2 = __toESM(require_path(), 1)
const import_fs2 = __toESM(require_fs(), 1)
const import_url2 = __toESM(require_url(), 1)
const __accessCheck = (obj, member, msg) => {
  if (!member.has(obj)) throw new TypeError(`Cannot ${msg}`)
}
const __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, 'read from private field')
  return getter ? getter.call(obj) : member.get(obj)
}
const __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw new TypeError('Cannot add the same private member more than once')
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value)
}
const __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, 'write to private field')
  setter ? setter.call(obj, value) : member.set(obj, value)
  return value
}
const __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter)
    },
    get _() {
      return __privateGet(obj, member, getter)
    },
  }
}
const Node = class {
  constructor(value) {
    __publicField(this, 'value')
    __publicField(this, 'next')
    this.value = value
  }
}
let _head
let _tail
let _size
const Queue = class {
  constructor() {
    __privateAdd(this, _head, void 0)
    __privateAdd(this, _tail, void 0)
    __privateAdd(this, _size, void 0)
    this.clear()
  }

  enqueue(value) {
    const node = new Node(value)
    if (__privateGet(this, _head)) {
      __privateGet(this, _tail).next = node
      __privateSet(this, _tail, node)
    } else {
      __privateSet(this, _head, node)
      __privateSet(this, _tail, node)
    }
    __privateWrapper(this, _size)._++
  }

  dequeue() {
    const current = __privateGet(this, _head)
    if (!current) return

    __privateSet(this, _head, __privateGet(this, _head).next)
    __privateWrapper(this, _size)._--
    return current.value
  }

  clear() {
    __privateSet(this, _head, void 0)
    __privateSet(this, _tail, void 0)
    __privateSet(this, _size, 0)
  }

  get size() {
    return __privateGet(this, _size)
  }

  *[Symbol.iterator]() {
    let current = __privateGet(this, _head)
    while (current) {
      yield current.value
      current = current.next
    }
  }
}
_head = /* @__PURE__ */ new WeakMap()
_tail = /* @__PURE__ */ new WeakMap()
_size = /* @__PURE__ */ new WeakMap()
const findUpStop = Symbol('findUpStop')

// node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/index.mjs
const _require = (0, import_module.createRequire)(import.meta.url)
function resolveModule(name, options) {
  try {
    return _require.resolve(name, options)
  } catch (e) {
    return void 0
  }
}
function isPackageExists(name, options) {
  return !!resolvePackage(name, options)
}
function resolvePackage(name, options = {}) {
  try {
    return _require.resolve(`${name}/package.json`, options)
  } catch {}
  try {
    return _require.resolve(name, options)
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') console.error(e)
    return false
  }
}

// node_modules/.pnpm/@unocss+preset-icons@0.29.6/node_modules/@unocss/preset-icons/dist/fs.mjs
const _collections = {}
const isLegacyExists = isPackageExists('@iconify/json')
async function loadCollectionFromFS(name) {
  if (!_collections[name]) _collections[name] = task()
  return _collections[name]
  async function task() {
    let jsonPath = resolveModule(`@iconify-json/${name}/icons.json`)
    if (!jsonPath && isLegacyExists)
      jsonPath = resolveModule(`@iconify/json/json/${name}.json`)
    if (jsonPath) {
      const icons = JSON.parse(
        await import_fs4.promises.readFile(jsonPath, 'utf8'),
      )
      return icons
    } else {
      return void 0
    }
  }
}
export { loadCollectionFromFS }
// # sourceMappingURL=fs-OP2BBMN6.js.map
