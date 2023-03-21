import {
  require_fs,
  require_path,
  require_process,
  require_url,
} from './chunk-Z53EMXZP.js'
import {
  __commonJS,
  __export,
  __publicField,
  __require,
  __toESM,
} from './chunk-WQG2LZMB.js'

// node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/dist/shared.cjs
const require_shared = __commonJS({
  'node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/dist/shared.cjs':
    function (exports, module) {
      'use strict'
      const __create = Object.create
      const __defProp = Object.defineProperty
      const __getOwnPropDesc = Object.getOwnPropertyDescriptor
      const __getOwnPropNames = Object.getOwnPropertyNames
      const __getProtoOf = Object.getPrototypeOf
      const __hasOwnProp = Object.prototype.hasOwnProperty
      const __export2 = (target, all) => {
        for (const name42 in all)
          __defProp(target, name42, { get: all[name42], enumerable: true })
      }
      const __copyProps = (to, from, except, desc) => {
        if ((from && typeof from === 'object') || typeof from === 'function') {
          for (const key of __getOwnPropNames(from)) {
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, {
                get: () => from[key],
                enumerable:
                  !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
              })
          }
        }
        return to
      }
      const __toESM2 = (mod, isNodeMode, target) => (
        (target = mod != null ? __create(__getProtoOf(mod)) : {}),
        __copyProps(
          isNodeMode || !mod || !mod.__esModule
            ? __defProp(target, 'default', { value: mod, enumerable: true })
            : target,
          mod,
        )
      )
      const __toCommonJS = (mod) =>
        __copyProps(__defProp({}, '__esModule', { value: true }), mod)
      const __accessCheck = (obj, member, msg) => {
        if (!member.has(obj)) throw new TypeError(`Cannot ${msg}`)
      }
      const __privateGet = (obj, member, getter) => {
        __accessCheck(obj, member, 'read from private field')
        return getter ? getter.call(obj) : member.get(obj)
      }
      const __privateAdd = (obj, member, value) => {
        if (member.has(obj))
          throw new TypeError(
            'Cannot add the same private member more than once',
          )
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
      const shared_exports = {}
      __export2(shared_exports, {
        isPackageListed: () => isPackageListed,
        loadPackageJSON: () => loadPackageJSON,
      })
      module.exports = __toCommonJS(shared_exports)
      const import_fs = require_fs()
      const import_node_path2 = __toESM2(require_path(), 1)
      const import_node_url2 = require_url()
      const import_node_process = __toESM2(require_process(), 1)
      const import_node_path = __toESM2(require_path(), 1)
      const import_node_fs = __toESM2(require_fs(), 1)
      const import_node_url = require_url()
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
      function pLimit(concurrency) {
        if (
          !(
            (Number.isInteger(concurrency) ||
              concurrency === Number.POSITIVE_INFINITY) &&
            concurrency > 0
          )
        )
          throw new TypeError(
            'Expected `concurrency` to be a number from 1 and up',
          )

        const queue = new Queue()
        let activeCount = 0
        const next = () => {
          activeCount--
          if (queue.size > 0) queue.dequeue()()
        }
        const run = async (fn, resolve, args) => {
          activeCount++
          const result = (async () => fn(...args))()
          resolve(result)
          try {
            await result
          } catch {}
          next()
        }
        const enqueue = (fn, resolve, args) => {
          queue.enqueue(run.bind(void 0, fn, resolve, args))
          ;(async () => {
            await Promise.resolve()
            if (activeCount < concurrency && queue.size > 0) queue.dequeue()()
          })()
        }
        const generator = (fn, ...args) =>
          new Promise((resolve) => {
            enqueue(fn, resolve, args)
          })
        Object.defineProperties(generator, {
          activeCount: {
            get: () => activeCount,
          },
          pendingCount: {
            get: () => queue.size,
          },
          clearQueue: {
            value: () => {
              queue.clear()
            },
          },
        })
        return generator
      }
      const EndError = class extends Error {
        constructor(value) {
          super()
          this.value = value
        }
      }
      const testElement = async (element, tester) => tester(await element)
      const finder = async (element) => {
        const values = await Promise.all(element)
        if (values[1] === true) throw new EndError(values[0])

        return false
      }
      async function pLocate(
        iterable,
        tester,
        { concurrency = Number.POSITIVE_INFINITY, preserveOrder = true } = {},
      ) {
        const limit = pLimit(concurrency)
        const items = [...iterable].map((element) => [
          element,
          limit(testElement, element, tester),
        ])
        const checkLimit = pLimit(preserveOrder ? 1 : Number.POSITIVE_INFINITY)
        try {
          await Promise.all(items.map((element) => checkLimit(finder, element)))
        } catch (error) {
          if (error instanceof EndError) return error.value

          throw error
        }
      }
      const typeMappings = {
        directory: 'isDirectory',
        file: 'isFile',
      }
      function checkType(type) {
        if (Object.hasOwnProperty.call(typeMappings, type)) return

        throw new Error(`Invalid type specified: ${type}`)
      }
      const matchType = (type, stat) => stat[typeMappings[type]]()
      const toPath = (urlOrPath) =>
        urlOrPath instanceof URL
          ? (0, import_node_url.fileURLToPath)(urlOrPath)
          : urlOrPath
      async function locatePath(
        paths,
        {
          cwd = import_node_process.default.cwd(),
          type = 'file',
          allowSymlinks = true,
          concurrency,
          preserveOrder,
        } = {},
      ) {
        checkType(type)
        cwd = toPath(cwd)
        const statFunction = allowSymlinks
          ? import_node_fs.promises.stat
          : import_node_fs.promises.lstat
        return pLocate(
          paths,
          async (path_) => {
            try {
              const stat = await statFunction(
                import_node_path.default.resolve(cwd, path_),
              )
              return matchType(type, stat)
            } catch {
              return false
            }
          },
          { concurrency, preserveOrder },
        )
      }
      const import_node_fs2 = __toESM2(require_fs(), 1)
      const toPath2 = (urlOrPath) =>
        urlOrPath instanceof URL
          ? (0, import_node_url2.fileURLToPath)(urlOrPath)
          : urlOrPath
      const findUpStop = Symbol('findUpStop')
      async function findUpMultiple(name42, options = {}) {
        let directory = import_node_path2.default.resolve(
          toPath2(options.cwd) || '',
        )
        const { root } = import_node_path2.default.parse(directory)
        const stopAt = import_node_path2.default.resolve(
          directory,
          options.stopAt || root,
        )
        const limit = options.limit || Number.POSITIVE_INFINITY
        const paths = [name42].flat()
        const runMatcher = async (locateOptions) => {
          if (typeof name42 !== 'function')
            return locatePath(paths, locateOptions)

          const foundPath = await name42(locateOptions.cwd)
          if (typeof foundPath === 'string')
            return locatePath([foundPath], locateOptions)

          return foundPath
        }
        const matches = []
        while (true) {
          const foundPath = await runMatcher({ ...options, cwd: directory })
          if (foundPath === findUpStop) break

          if (foundPath)
            matches.push(
              import_node_path2.default.resolve(directory, foundPath),
            )

          if (directory === stopAt || matches.length >= limit) break

          directory = import_node_path2.default.dirname(directory)
        }
        return matches
      }
      async function findUp(name42, options = {}) {
        const matches = await findUpMultiple(name42, { ...options, limit: 1 })
        return matches[0]
      }
      async function loadPackageJSON(cwd = process.cwd()) {
        const path3 = await findUp('package.json', { cwd })
        if (!path3 || !(0, import_fs.existsSync)(path3)) return null
        return JSON.parse(await import_fs.promises.readFile(path3, 'utf-8'))
      }
      async function isPackageListed(name42, cwd) {
        const pkg = (await loadPackageJSON(cwd)) || {}
        return (
          name42 in (pkg.dependencies || {}) ||
          name42 in (pkg.devDependencies || {})
        )
      }
    },
})

// node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/index.cjs
const require_local_pkg = __commonJS({
  'node_modules/.pnpm/local-pkg@0.4.2/node_modules/local-pkg/index.cjs':
    function (exports, module) {
      const { dirname, join } = require_path()
      const { existsSync, readFileSync } = require_fs()
      const fs = require_fs().promises
      const { loadPackageJSON, isPackageListed } = require_shared()
      function resolveModule(name42, options) {
        try {
          return __require.resolve(name42, options)
        } catch (e2) {
          return void 0
        }
      }
      function importModule(path) {
        const mod = __require(path)
        if (mod.__esModule) return Promise.resolve(mod)
        else return Promise.resolve({ default: mod })
      }
      function isPackageExists(name42, options) {
        return !!resolvePackage(name42, options)
      }
      function getPackageJsonPath(name42, options) {
        const entry = resolvePackage(name42, options)
        if (!entry) return
        return searchPackageJSON(entry)
      }
      async function getPackageInfo(name42, options) {
        const packageJsonPath = getPackageJsonPath(name42, options)
        if (!packageJsonPath) return
        const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
        return {
          name: name42,
          version: pkg.version,
          rootPath: dirname(packageJsonPath),
          packageJsonPath,
          packageJson: pkg,
        }
      }
      function getPackageInfoSync(name42, options) {
        const packageJsonPath = getPackageJsonPath(name42, options)
        if (!packageJsonPath) return
        const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
        return {
          name: name42,
          version: pkg.version,
          rootPath: dirname(packageJsonPath),
          packageJsonPath,
          packageJson: pkg,
        }
      }
      function resolvePackage(name42, options = {}) {
        try {
          return __require.resolve(`${name42}/package.json`, options)
        } catch {}
        try {
          return __require.resolve(name42, options)
        } catch (e2) {
          if (e2.code !== 'MODULE_NOT_FOUND') throw e2
          return false
        }
      }
      function searchPackageJSON(dir) {
        let packageJsonPath
        while (true) {
          if (!dir) return
          const newDir = dirname(dir)
          if (newDir === dir) return
          dir = newDir
          packageJsonPath = join(dir, 'package.json')
          if (existsSync(packageJsonPath)) break
        }
        return packageJsonPath
      }
      module.exports = {
        resolveModule,
        importModule,
        isPackageExists,
        getPackageInfo,
        getPackageInfoSync,
        loadPackageJSON,
        isPackageListed,
      }
      Object.defineProperty(module.exports, '__esModule', {
        value: true,
        enumerable: false,
      })
    },
})

// node_modules/.pnpm/@unocss+preset-icons@0.29.6/node_modules/@unocss/preset-icons/dist/fs.cjs
const require_fs2 = __commonJS({
  'node_modules/.pnpm/@unocss+preset-icons@0.29.6/node_modules/@unocss/preset-icons/dist/fs.cjs':
    function (exports) {
      'use strict'
      Object.defineProperty(exports, '__esModule', { value: true })
      const fs = require_fs()
      const localPkg = require_local_pkg()
      const _collections = {}
      const isLegacyExists = localPkg.isPackageExists('@iconify/json')
      async function loadCollectionFromFS(name42) {
        if (!_collections[name42]) _collections[name42] = task()
        return _collections[name42]
        async function task() {
          let jsonPath = localPkg.resolveModule(
            `@iconify-json/${name42}/icons.json`,
          )
          if (!jsonPath && isLegacyExists)
            jsonPath = localPkg.resolveModule(
              `@iconify/json/json/${name42}.json`,
            )
          if (jsonPath) {
            const icons = JSON.parse(
              await fs.promises.readFile(jsonPath, 'utf8'),
            )
            return icons
          } else {
            return void 0
          }
        }
      }
      exports.loadCollectionFromFS = loadCollectionFromFS
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/base64.js
const require_base64 = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/base64.js':
    function (exports) {
      const intToCharMap =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
          '',
        )
      exports.encode = function (number3) {
        if (number3 >= 0 && number3 < intToCharMap.length)
          return intToCharMap[number3]

        throw new TypeError(`Must be between 0 and 63: ${number3}`)
      }
      exports.decode = function (charCode) {
        const bigA = 65
        const bigZ = 90
        const littleA = 97
        const littleZ = 122
        const zero2 = 48
        const nine = 57
        const plus = 43
        const slash = 47
        const littleOffset = 26
        const numberOffset = 52
        if (bigA <= charCode && charCode <= bigZ) return charCode - bigA

        if (littleA <= charCode && charCode <= littleZ)
          return charCode - littleA + littleOffset

        if (zero2 <= charCode && charCode <= nine)
          return charCode - zero2 + numberOffset

        if (charCode == plus) return 62

        if (charCode == slash) return 63

        return -1
      }
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/base64-vlq.js
const require_base64_vlq = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/base64-vlq.js':
    function (exports) {
      const base64 = require_base64()
      const VLQ_BASE_SHIFT = 5
      const VLQ_BASE = 1 << VLQ_BASE_SHIFT
      const VLQ_BASE_MASK = VLQ_BASE - 1
      const VLQ_CONTINUATION_BIT = VLQ_BASE
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0
      }
      function fromVLQSigned(aValue) {
        const isNegative = (aValue & 1) === 1
        const shifted = aValue >> 1
        return isNegative ? -shifted : shifted
      }
      exports.encode = function base64VLQ_encode(aValue) {
        let encoded = ''
        let digit
        let vlq = toVLQSigned(aValue)
        do {
          digit = vlq & VLQ_BASE_MASK
          vlq >>>= VLQ_BASE_SHIFT
          if (vlq > 0) digit |= VLQ_CONTINUATION_BIT

          encoded += base64.encode(digit)
        } while (vlq > 0)
        return encoded
      }
      exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        const strLen = aStr.length
        let result = 0
        let shift2 = 0
        let continuation, digit
        do {
          if (aIndex >= strLen)
            throw new Error('Expected more digits in base 64 VLQ value.')

          digit = base64.decode(aStr.charCodeAt(aIndex++))
          if (digit === -1)
            throw new Error(`Invalid base64 digit: ${aStr.charAt(aIndex - 1)}`)

          continuation = !!(digit & VLQ_CONTINUATION_BIT)
          digit &= VLQ_BASE_MASK
          result = result + (digit << shift2)
          shift2 += VLQ_BASE_SHIFT
        } while (continuation)
        aOutParam.value = fromVLQSigned(result)
        aOutParam.rest = aIndex
      }
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/util.js
const require_util = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/util.js':
    function (exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) return aArgs[aName]
        else if (arguments.length === 3) return aDefaultValue
        else throw new Error(`"${aName}" is a required argument.`)
      }
      exports.getArg = getArg
      const urlRegexp =
        /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/
      const dataUrlRegexp = /^data:.+\,.+$/
      function urlParse(aUrl) {
        const match = aUrl.match(urlRegexp)
        if (!match) return null

        return {
          scheme: match[1],
          auth: match[2],
          host: match[3],
          port: match[4],
          path: match[5],
        }
      }
      exports.urlParse = urlParse
      function urlGenerate(aParsedUrl) {
        let url = ''
        if (aParsedUrl.scheme) url += `${aParsedUrl.scheme}:`

        url += '//'
        if (aParsedUrl.auth) url += `${aParsedUrl.auth}@`

        if (aParsedUrl.host) url += aParsedUrl.host

        if (aParsedUrl.port) url += `:${aParsedUrl.port}`

        if (aParsedUrl.path) url += aParsedUrl.path

        return url
      }
      exports.urlGenerate = urlGenerate
      const MAX_CACHED_INPUTS = 32
      function lruMemoize(f) {
        const cache = []
        return function (input) {
          for (let i = 0; i < cache.length; i++) {
            if (cache[i].input === input) {
              const temp = cache[0]
              cache[0] = cache[i]
              cache[i] = temp
              return cache[0].result
            }
          }
          const result = f(input)
          cache.unshift({
            input,
            result,
          })
          if (cache.length > MAX_CACHED_INPUTS) cache.pop()

          return result
        }
      }
      const normalize = lruMemoize((aPath) => {
        let path = aPath
        const url = urlParse(aPath)
        if (url) {
          if (!url.path) return aPath

          path = url.path
        }
        const isAbsolute = exports.isAbsolute(path)
        const parts = []
        let start = 0
        var i = 0
        while (true) {
          start = i
          i = path.indexOf('/', start)
          if (i === -1) {
            parts.push(path.slice(start))
            break
          } else {
            parts.push(path.slice(start, i))
            while (i < path.length && path[i] === '/') i++
          }
        }
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i]
          if (part === '.') {
            parts.splice(i, 1)
          } else if (part === '..') {
            up++
          } else if (up > 0) {
            if (part === '') {
              parts.splice(i + 1, up)
              up = 0
            } else {
              parts.splice(i, 2)
              up--
            }
          }
        }
        path = parts.join('/')
        if (path === '') path = isAbsolute ? '/' : '.'

        if (url) {
          url.path = path
          return urlGenerate(url)
        }
        return path
      })
      exports.normalize = normalize
      function join(aRoot, aPath) {
        if (aRoot === '') aRoot = '.'

        if (aPath === '') aPath = '.'

        const aPathUrl = urlParse(aPath)
        const aRootUrl = urlParse(aRoot)
        if (aRootUrl) aRoot = aRootUrl.path || '/'

        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme

          return urlGenerate(aPathUrl)
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath

        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath
          return urlGenerate(aRootUrl)
        }
        const joined =
          aPath.charAt(0) === '/'
            ? aPath
            : normalize(`${aRoot.replace(/\/+$/, '')}/${aPath}`)
        if (aRootUrl) {
          aRootUrl.path = joined
          return urlGenerate(aRootUrl)
        }
        return joined
      }
      exports.join = join
      exports.isAbsolute = function (aPath) {
        return aPath.charAt(0) === '/' || urlRegexp.test(aPath)
      }
      function relative(aRoot, aPath) {
        if (aRoot === '') aRoot = '.'

        aRoot = aRoot.replace(/\/$/, '')
        let level = 0
        while (aPath.indexOf(`${aRoot}/`) !== 0) {
          const index = aRoot.lastIndexOf('/')
          if (index < 0) return aPath

          aRoot = aRoot.slice(0, index)
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath

          ++level
        }
        return Array(level + 1).join('../') + aPath.substr(aRoot.length + 1)
      }
      exports.relative = relative
      const supportsNullProto = (function () {
        const obj = /* @__PURE__ */ Object.create(null)
        return !('__proto__' in obj)
      })()
      function identity(s) {
        return s
      }
      function toSetString(aStr) {
        if (isProtoString(aStr)) return `$${aStr}`

        return aStr
      }
      exports.toSetString = supportsNullProto ? identity : toSetString
      function fromSetString(aStr) {
        if (isProtoString(aStr)) return aStr.slice(1)

        return aStr
      }
      exports.fromSetString = supportsNullProto ? identity : fromSetString
      function isProtoString(s) {
        if (!s) return false

        const length2 = s.length
        if (length2 < 9) return false

        if (
          s.charCodeAt(length2 - 1) !== 95 ||
          s.charCodeAt(length2 - 2) !== 95 ||
          s.charCodeAt(length2 - 3) !== 111 ||
          s.charCodeAt(length2 - 4) !== 116 ||
          s.charCodeAt(length2 - 5) !== 111 ||
          s.charCodeAt(length2 - 6) !== 114 ||
          s.charCodeAt(length2 - 7) !== 112 ||
          s.charCodeAt(length2 - 8) !== 95 ||
          s.charCodeAt(length2 - 9) !== 95
        )
          return false

        for (let i = length2 - 10; i >= 0; i--) {
          if (s.charCodeAt(i) !== 36) return false
        }
        return true
      }
      function compareByOriginalPositions(
        mappingA,
        mappingB,
        onlyCompareOriginal,
      ) {
        let cmp = strcmp(mappingA.source, mappingB.source)
        if (cmp !== 0) return cmp

        cmp = mappingA.originalLine - mappingB.originalLine
        if (cmp !== 0) return cmp

        cmp = mappingA.originalColumn - mappingB.originalColumn
        if (cmp !== 0 || onlyCompareOriginal) return cmp

        cmp = mappingA.generatedColumn - mappingB.generatedColumn
        if (cmp !== 0) return cmp

        cmp = mappingA.generatedLine - mappingB.generatedLine
        if (cmp !== 0) return cmp

        return strcmp(mappingA.name, mappingB.name)
      }
      exports.compareByOriginalPositions = compareByOriginalPositions
      function compareByOriginalPositionsNoSource(
        mappingA,
        mappingB,
        onlyCompareOriginal,
      ) {
        let cmp
        cmp = mappingA.originalLine - mappingB.originalLine
        if (cmp !== 0) return cmp

        cmp = mappingA.originalColumn - mappingB.originalColumn
        if (cmp !== 0 || onlyCompareOriginal) return cmp

        cmp = mappingA.generatedColumn - mappingB.generatedColumn
        if (cmp !== 0) return cmp

        cmp = mappingA.generatedLine - mappingB.generatedLine
        if (cmp !== 0) return cmp

        return strcmp(mappingA.name, mappingB.name)
      }
      exports.compareByOriginalPositionsNoSource =
        compareByOriginalPositionsNoSource
      function compareByGeneratedPositionsDeflated(
        mappingA,
        mappingB,
        onlyCompareGenerated,
      ) {
        let cmp = mappingA.generatedLine - mappingB.generatedLine
        if (cmp !== 0) return cmp

        cmp = mappingA.generatedColumn - mappingB.generatedColumn
        if (cmp !== 0 || onlyCompareGenerated) return cmp

        cmp = strcmp(mappingA.source, mappingB.source)
        if (cmp !== 0) return cmp

        cmp = mappingA.originalLine - mappingB.originalLine
        if (cmp !== 0) return cmp

        cmp = mappingA.originalColumn - mappingB.originalColumn
        if (cmp !== 0) return cmp

        return strcmp(mappingA.name, mappingB.name)
      }
      exports.compareByGeneratedPositionsDeflated =
        compareByGeneratedPositionsDeflated
      function compareByGeneratedPositionsDeflatedNoLine(
        mappingA,
        mappingB,
        onlyCompareGenerated,
      ) {
        let cmp = mappingA.generatedColumn - mappingB.generatedColumn
        if (cmp !== 0 || onlyCompareGenerated) return cmp

        cmp = strcmp(mappingA.source, mappingB.source)
        if (cmp !== 0) return cmp

        cmp = mappingA.originalLine - mappingB.originalLine
        if (cmp !== 0) return cmp

        cmp = mappingA.originalColumn - mappingB.originalColumn
        if (cmp !== 0) return cmp

        return strcmp(mappingA.name, mappingB.name)
      }
      exports.compareByGeneratedPositionsDeflatedNoLine =
        compareByGeneratedPositionsDeflatedNoLine
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) return 0

        if (aStr1 === null) return 1

        if (aStr2 === null) return -1

        if (aStr1 > aStr2) return 1

        return -1
      }
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        let cmp = mappingA.generatedLine - mappingB.generatedLine
        if (cmp !== 0) return cmp

        cmp = mappingA.generatedColumn - mappingB.generatedColumn
        if (cmp !== 0) return cmp

        cmp = strcmp(mappingA.source, mappingB.source)
        if (cmp !== 0) return cmp

        cmp = mappingA.originalLine - mappingB.originalLine
        if (cmp !== 0) return cmp

        cmp = mappingA.originalColumn - mappingB.originalColumn
        if (cmp !== 0) return cmp

        return strcmp(mappingA.name, mappingB.name)
      }
      exports.compareByGeneratedPositionsInflated =
        compareByGeneratedPositionsInflated
      function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''))
      }
      exports.parseSourceMapInput = parseSourceMapInput
      function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || ''
        if (sourceRoot) {
          if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/')
            sourceRoot += '/'

          sourceURL = sourceRoot + sourceURL
        }
        if (sourceMapURL) {
          const parsed = urlParse(sourceMapURL)
          if (!parsed) throw new Error('sourceMapURL could not be parsed')

          if (parsed.path) {
            const index = parsed.path.lastIndexOf('/')
            if (index >= 0) parsed.path = parsed.path.substring(0, index + 1)
          }
          sourceURL = join(urlGenerate(parsed), sourceURL)
        }
        return normalize(sourceURL)
      }
      exports.computeSourceURL = computeSourceURL
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/array-set.js
const require_array_set = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/array-set.js':
    function (exports) {
      const util = require_util()
      const has = Object.prototype.hasOwnProperty
      const hasNativeMap = typeof Map !== 'undefined'
      function ArraySet() {
        this._array = []
        this._set = hasNativeMap
          ? /* @__PURE__ */ new Map()
          : /* @__PURE__ */ Object.create(null)
      }
      ArraySet.fromArray = function ArraySet_fromArray(
        aArray,
        aAllowDuplicates,
      ) {
        const set = new ArraySet()
        for (let i = 0, len = aArray.length; i < len; i++)
          set.add(aArray[i], aAllowDuplicates)

        return set
      }
      ArraySet.prototype.size = function ArraySet_size() {
        return hasNativeMap
          ? this._set.size
          : Object.getOwnPropertyNames(this._set).length
      }
      ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
        const sStr = hasNativeMap ? aStr : util.toSetString(aStr)
        const isDuplicate = hasNativeMap
          ? this.has(aStr)
          : has.call(this._set, sStr)
        const idx = this._array.length
        if (!isDuplicate || aAllowDuplicates) this._array.push(aStr)

        if (!isDuplicate) {
          if (hasNativeMap) this._set.set(aStr, idx)
          else this._set[sStr] = idx
        }
      }
      ArraySet.prototype.has = function ArraySet_has(aStr) {
        if (hasNativeMap) {
          return this._set.has(aStr)
        } else {
          const sStr = util.toSetString(aStr)
          return has.call(this._set, sStr)
        }
      }
      ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
          const idx = this._set.get(aStr)
          if (idx >= 0) return idx
        } else {
          const sStr = util.toSetString(aStr)
          if (has.call(this._set, sStr)) return this._set[sStr]
        }
        throw new Error(`"${aStr}" is not in the set.`)
      }
      ArraySet.prototype.at = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx]

        throw new Error(`No element indexed by ${aIdx}`)
      }
      ArraySet.prototype.toArray = function ArraySet_toArray() {
        return this._array.slice()
      }
      exports.ArraySet = ArraySet
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/mapping-list.js
const require_mapping_list = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/mapping-list.js':
    function (exports) {
      const util = require_util()
      function generatedPositionAfter(mappingA, mappingB) {
        const lineA = mappingA.generatedLine
        const lineB = mappingB.generatedLine
        const columnA = mappingA.generatedColumn
        const columnB = mappingB.generatedColumn
        return (
          lineB > lineA ||
          (lineB == lineA && columnB >= columnA) ||
          util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0
        )
      }
      function MappingList() {
        this._array = []
        this._sorted = true
        this._last = { generatedLine: -1, generatedColumn: 0 }
      }
      MappingList.prototype.unsortedForEach = function MappingList_forEach(
        aCallback,
        aThisArg,
      ) {
        this._array.forEach(aCallback, aThisArg)
      }
      MappingList.prototype.add = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this._last, aMapping)) {
          this._last = aMapping
          this._array.push(aMapping)
        } else {
          this._sorted = false
          this._array.push(aMapping)
        }
      }
      MappingList.prototype.toArray = function MappingList_toArray() {
        if (!this._sorted) {
          this._array.sort(util.compareByGeneratedPositionsInflated)
          this._sorted = true
        }
        return this._array
      }
      exports.MappingList = MappingList
    },
})

// node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/source-map-generator.js
const require_source_map_generator = __commonJS({
  'node_modules/.pnpm/source-map-js@1.0.2/node_modules/source-map-js/lib/source-map-generator.js':
    function (exports) {
      const base64VLQ = require_base64_vlq()
      const util = require_util()
      const ArraySet = require_array_set().ArraySet
      const MappingList = require_mapping_list().MappingList
      function SourceMapGenerator2(aArgs) {
        if (!aArgs) aArgs = {}

        this._file = util.getArg(aArgs, 'file', null)
        this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null)
        this._skipValidation = util.getArg(aArgs, 'skipValidation', false)
        this._sources = new ArraySet()
        this._names = new ArraySet()
        this._mappings = new MappingList()
        this._sourcesContents = null
      }
      SourceMapGenerator2.prototype._version = 3
      SourceMapGenerator2.fromSourceMap =
        function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
          const sourceRoot = aSourceMapConsumer.sourceRoot
          const generator = new SourceMapGenerator2({
            file: aSourceMapConsumer.file,
            sourceRoot,
          })
          aSourceMapConsumer.eachMapping((mapping) => {
            const newMapping = {
              generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn,
              },
            }
            if (mapping.source != null) {
              newMapping.source = mapping.source
              if (sourceRoot != null)
                newMapping.source = util.relative(sourceRoot, newMapping.source)

              newMapping.original = {
                line: mapping.originalLine,
                column: mapping.originalColumn,
              }
              if (mapping.name != null) newMapping.name = mapping.name
            }
            generator.addMapping(newMapping)
          })
          aSourceMapConsumer.sources.forEach((sourceFile) => {
            let sourceRelative = sourceFile
            if (sourceRoot !== null)
              sourceRelative = util.relative(sourceRoot, sourceFile)

            if (!generator._sources.has(sourceRelative))
              generator._sources.add(sourceRelative)

            const content = aSourceMapConsumer.sourceContentFor(sourceFile)
            if (content != null) generator.setSourceContent(sourceFile, content)
          })
          return generator
        }
      SourceMapGenerator2.prototype.addMapping =
        function SourceMapGenerator_addMapping(aArgs) {
          const generated = util.getArg(aArgs, 'generated')
          const original = util.getArg(aArgs, 'original', null)
          let source = util.getArg(aArgs, 'source', null)
          let name42 = util.getArg(aArgs, 'name', null)
          if (!this._skipValidation)
            this._validateMapping(generated, original, source, name42)

          if (source != null) {
            source = String(source)
            if (!this._sources.has(source)) this._sources.add(source)
          }
          if (name42 != null) {
            name42 = String(name42)
            if (!this._names.has(name42)) this._names.add(name42)
          }
          this._mappings.add({
            generatedLine: generated.line,
            generatedColumn: generated.column,
            originalLine: original != null && original.line,
            originalColumn: original != null && original.column,
            source,
            name: name42,
          })
        }
      SourceMapGenerator2.prototype.setSourceContent =
        function SourceMapGenerator_setSourceContent(
          aSourceFile,
          aSourceContent,
        ) {
          let source = aSourceFile
          if (this._sourceRoot != null)
            source = util.relative(this._sourceRoot, source)

          if (aSourceContent != null) {
            if (!this._sourcesContents)
              this._sourcesContents = /* @__PURE__ */ Object.create(null)

            this._sourcesContents[util.toSetString(source)] = aSourceContent
          } else if (this._sourcesContents) {
            delete this._sourcesContents[util.toSetString(source)]
            if (Object.keys(this._sourcesContents).length === 0)
              this._sourcesContents = null
          }
        }
      SourceMapGenerator2.prototype.applySourceMap =
        function SourceMapGenerator_applySourceMap(
          aSourceMapConsumer,
          aSourceFile,
          aSourceMapPath,
        ) {
          let sourceFile = aSourceFile
          if (aSourceFile == null) {
            if (aSourceMapConsumer.file == null) {
              throw new Error(
                'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.',
              )
            }
            sourceFile = aSourceMapConsumer.file
          }
          const sourceRoot = this._sourceRoot
          if (sourceRoot != null)
            sourceFile = util.relative(sourceRoot, sourceFile)

          const newSources = new ArraySet()
          const newNames = new ArraySet()
          this._mappings.unsortedForEach((mapping) => {
            if (mapping.source === sourceFile && mapping.originalLine != null) {
              const original = aSourceMapConsumer.originalPositionFor({
                line: mapping.originalLine,
                column: mapping.originalColumn,
              })
              if (original.source != null) {
                mapping.source = original.source
                if (aSourceMapPath != null)
                  mapping.source = util.join(aSourceMapPath, mapping.source)

                if (sourceRoot != null)
                  mapping.source = util.relative(sourceRoot, mapping.source)

                mapping.originalLine = original.line
                mapping.originalColumn = original.column
                if (original.name != null) mapping.name = original.name
              }
            }
            const source = mapping.source
            if (source != null && !newSources.has(source))
              newSources.add(source)

            const name42 = mapping.name
            if (name42 != null && !newNames.has(name42)) newNames.add(name42)
          }, this)
          this._sources = newSources
          this._names = newNames
          aSourceMapConsumer.sources.forEach(function (sourceFile2) {
            const content = aSourceMapConsumer.sourceContentFor(sourceFile2)
            if (content != null) {
              if (aSourceMapPath != null)
                sourceFile2 = util.join(aSourceMapPath, sourceFile2)

              if (sourceRoot != null)
                sourceFile2 = util.relative(sourceRoot, sourceFile2)

              this.setSourceContent(sourceFile2, content)
            }
          }, this)
        }
      SourceMapGenerator2.prototype._validateMapping =
        function SourceMapGenerator_validateMapping(
          aGenerated,
          aOriginal,
          aSource,
          aName,
        ) {
          if (
            aOriginal &&
            typeof aOriginal.line !== 'number' &&
            typeof aOriginal.column !== 'number'
          ) {
            throw new Error(
              'original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.',
            )
          }
          if (
            aGenerated &&
            'line' in aGenerated &&
            'column' in aGenerated &&
            aGenerated.line > 0 &&
            aGenerated.column >= 0 &&
            !aOriginal &&
            !aSource &&
            !aName
          ) {
          } else if (
            aGenerated &&
            'line' in aGenerated &&
            'column' in aGenerated &&
            aOriginal &&
            'line' in aOriginal &&
            'column' in aOriginal &&
            aGenerated.line > 0 &&
            aGenerated.column >= 0 &&
            aOriginal.line > 0 &&
            aOriginal.column >= 0 &&
            aSource
          ) {
          } else {
            throw new Error(
              `Invalid mapping: ${JSON.stringify({
                generated: aGenerated,
                source: aSource,
                original: aOriginal,
                name: aName,
              })}`,
            )
          }
        }
      SourceMapGenerator2.prototype._serializeMappings =
        function SourceMapGenerator_serializeMappings() {
          let previousGeneratedColumn = 0
          let previousGeneratedLine = 1
          let previousOriginalColumn = 0
          let previousOriginalLine = 0
          let previousName = 0
          let previousSource = 0
          let result = ''
          let next
          let mapping
          let nameIdx
          let sourceIdx
          const mappings = this._mappings.toArray()
          for (let i = 0, len = mappings.length; i < len; i++) {
            mapping = mappings[i]
            next = ''
            if (mapping.generatedLine !== previousGeneratedLine) {
              previousGeneratedColumn = 0
              while (mapping.generatedLine !== previousGeneratedLine) {
                next += ';'
                previousGeneratedLine++
              }
            } else {
              if (i > 0) {
                if (
                  !util.compareByGeneratedPositionsInflated(
                    mapping,
                    mappings[i - 1],
                  )
                )
                  continue

                next += ','
              }
            }
            next += base64VLQ.encode(
              mapping.generatedColumn - previousGeneratedColumn,
            )
            previousGeneratedColumn = mapping.generatedColumn
            if (mapping.source != null) {
              sourceIdx = this._sources.indexOf(mapping.source)
              next += base64VLQ.encode(sourceIdx - previousSource)
              previousSource = sourceIdx
              next += base64VLQ.encode(
                mapping.originalLine - 1 - previousOriginalLine,
              )
              previousOriginalLine = mapping.originalLine - 1
              next += base64VLQ.encode(
                mapping.originalColumn - previousOriginalColumn,
              )
              previousOriginalColumn = mapping.originalColumn
              if (mapping.name != null) {
                nameIdx = this._names.indexOf(mapping.name)
                next += base64VLQ.encode(nameIdx - previousName)
                previousName = nameIdx
              }
            }
            result += next
          }
          return result
        }
      SourceMapGenerator2.prototype._generateSourcesContent =
        function SourceMapGenerator_generateSourcesContent(
          aSources,
          aSourceRoot,
        ) {
          return aSources.map(function (source) {
            if (!this._sourcesContents) return null

            if (aSourceRoot != null) source = util.relative(aSourceRoot, source)

            const key = util.toSetString(source)
            return Object.prototype.hasOwnProperty.call(
              this._sourcesContents,
              key,
            )
              ? this._sourcesContents[key]
              : null
          }, this)
        }
      SourceMapGenerator2.prototype.toJSON =
        function SourceMapGenerator_toJSON() {
          const map = {
            version: this._version,
            sources: this._sources.toArray(),
            names: this._names.toArray(),
            mappings: this._serializeMappings(),
          }
          if (this._file != null) map.file = this._file

          if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot

          if (this._sourcesContents)
            map.sourcesContent = this._generateSourcesContent(
              map.sources,
              map.sourceRoot,
            )

          return map
        }
      SourceMapGenerator2.prototype.toString =
        function SourceMapGenerator_toString() {
          return JSON.stringify(this.toJSON())
        }
      exports.SourceMapGenerator = SourceMapGenerator2
    },
})

// node_modules/.pnpm/@unocss+core@0.29.6/node_modules/@unocss/core/dist/index.mjs
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function escapeSelector(str) {
  const length2 = str.length
  let index = -1
  let codeUnit
  let result = ''
  const firstCodeUnit = str.charCodeAt(0)
  while (++index < length2) {
    codeUnit = str.charCodeAt(index)
    if (codeUnit === 0) {
      result += '�'
      continue
    }
    if (codeUnit === 44) {
      result += '\\2c '
      continue
    }
    if (
      (codeUnit >= 1 && codeUnit <= 31) ||
      codeUnit === 127 ||
      (index === 0 && codeUnit >= 48 && codeUnit <= 57) ||
      (index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45)
    ) {
      result += `\\${codeUnit.toString(16)} `
      continue
    }
    if (index === 0 && length2 === 1 && codeUnit === 45) {
      result += `\\${str.charAt(index)}`
      continue
    }
    if (
      codeUnit >= 128 ||
      codeUnit === 45 ||
      codeUnit === 95 ||
      (codeUnit >= 48 && codeUnit <= 57) ||
      (codeUnit >= 65 && codeUnit <= 90) ||
      (codeUnit >= 97 && codeUnit <= 122)
    ) {
      result += str.charAt(index)
      continue
    }
    result += `\\${str.charAt(index)}`
  }
  return result
}
const e = escapeSelector
function normalizeCSSEntries(obj) {
  return (!Array.isArray(obj) ? Object.entries(obj) : obj).filter(
    (i) => i[1] != null,
  )
}
function normalizeCSSValues(obj) {
  if (Array.isArray(obj)) {
    if (obj.find((i) => !Array.isArray(i) || Array.isArray(i[0])))
      return obj.map((i) => normalizeCSSEntries(i))
    else return [obj]
  } else {
    return [normalizeCSSEntries(obj)]
  }
}
function clearIdenticalEntries(entry) {
  return entry.filter(([k, v], idx) => {
    if (k.startsWith('$$')) return false
    for (let i = idx - 1; i >= 0; i--) {
      if (entry[i][0] === k && entry[i][1] === v) return false
    }
    return true
  })
}
function entriesToCss(arr) {
  if (arr == null) return ''
  return clearIdenticalEntries(arr)
    .map(([key, value]) => (value != null ? `${key}:${value};` : void 0))
    .filter(Boolean)
    .join('')
}
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}
function mergeDeep(original, patch) {
  const o = original
  const p = patch
  if (Array.isArray(o) && Array.isArray(p)) return [...o, ...p]
  if (Array.isArray(o)) return [...o]
  const output = { ...o }
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (isObject(p[key])) {
        if (!(key in o)) Object.assign(output, { [key]: p[key] })
        else output[key] = mergeDeep(o[key], p[key])
      } else {
        Object.assign(output, { [key]: p[key] })
      }
    })
  }
  return output
}
function clone(val) {
  let k, out, tmp
  if (Array.isArray(val)) {
    out = Array((k = val.length))
    while (k--)
      out[k] = (tmp = val[k]) && typeof tmp === 'object' ? clone(tmp) : tmp
    return out
  }
  if (Object.prototype.toString.call(val) === '[object Object]') {
    out = {}
    for (k in val) {
      if (k === '__proto__') {
        Object.defineProperty(out, k, {
          value: clone(val[k]),
          configurable: true,
          enumerable: true,
          writable: true,
        })
      } else {
        out[k] = (tmp = val[k]) && typeof tmp === 'object' ? clone(tmp) : tmp
      }
    }
    return out
  }
  return val
}
function isStaticRule(rule) {
  return typeof rule[0] === 'string'
}
function isStaticShortcut(sc) {
  return typeof sc[0] === 'string'
}
function toArray(value = []) {
  return Array.isArray(value) ? value : [value]
}
function uniq(value) {
  return Array.from(new Set(value))
}
function mergeSet(target, append) {
  append.forEach((i) => target.add(i))
  return target
}
const attributifyRE = /^\[(.+?)~?="(.*)"\]$/
const validateFilterRE = /(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-?]/
const CONTROL_SHORTCUT_NO_MERGE = '$$shortcut-no-merge'
function isAttributifySelector(selector2) {
  return selector2.match(attributifyRE)
}
function isValidSelector(selector2 = '') {
  return validateFilterRE.test(selector2)
}
function normalizeVariant(variant) {
  return typeof variant === 'function' ? { match: variant } : variant
}
function isRawUtil(util) {
  return util.length === 3
}
function notNull(value) {
  return value != null
}
const TwoKeyMap = class {
  constructor() {
    this._map = /* @__PURE__ */ new Map()
  }

  get(key1, key2) {
    const m2 = this._map.get(key1)
    if (m2) return m2.get(key2)
  }

  getFallback(key1, key2, fallback) {
    let m2 = this._map.get(key1)
    if (!m2) {
      m2 = /* @__PURE__ */ new Map()
      this._map.set(key1, m2)
    }
    if (!m2.has(key2)) m2.set(key2, fallback)
    return m2.get(key2)
  }

  set(key1, key2, value) {
    let m2 = this._map.get(key1)
    if (!m2) {
      m2 = /* @__PURE__ */ new Map()
      this._map.set(key1, m2)
    }
    m2.set(key2, value)
    return this
  }

  has(key1, key2) {
    let _a
    return (_a = this._map.get(key1)) == null ? void 0 : _a.has(key2)
  }

  delete(key1, key2) {
    let _a
    return (
      ((_a = this._map.get(key1)) == null ? void 0 : _a.delete(key2)) || false
    )
  }

  deleteTop(key1) {
    return this._map.delete(key1)
  }

  map(fn) {
    return Array.from(this._map.entries()).flatMap(([k1, m2]) =>
      Array.from(m2.entries()).map(([k2, v]) => {
        return fn(v, k1, k2)
      }),
    )
  }
}
const BetterMap = class extends Map {
  map(mapFn) {
    const result = []
    this.forEach((v, k) => {
      result.push(mapFn(v, k))
    })
    return result
  }
}
function withLayer(layer, rules3) {
  rules3.forEach((r) => {
    if (!r[2]) r[2] = { layer }
    else r[2].layer = layer
  })
  return rules3
}
const regexClassGroup =
  /([!\w+:_/-]+?)([:-])\(((?:[!\w\s:/\\,%#.$-]|\[.*?\])*?)\)/gm
function expandVariantGroup(str) {
  regexClassGroup.lastIndex = 0
  return str.replace(regexClassGroup, (_, pre, sep, body) => {
    return body
      .split(/\s/g)
      .map((i) => i.replace(/^(!?)(.*)/, `$1${pre}${sep}$2`))
      .join(' ')
  })
}
const warned = /* @__PURE__ */ new Set()
function warnOnce(msg) {
  if (warned.has(msg)) return
  console.warn('[unocss]', msg)
  warned.add(msg)
}
function createValueHandler(handlers) {
  const handler2 = function (str) {
    let _a
    const s = ((_a = this.__options) == null ? void 0 : _a.sequence) || []
    this.__options.sequence = []
    for (const n of s) {
      const res = handlers[n](str)
      if (res != null) return res
    }
  }
  function addProcessor(that, name42) {
    if (!that.__options) {
      that.__options = {
        sequence: [],
      }
    }
    that.__options.sequence.push(name42)
    return that
  }
  for (const name42 of Object.keys(handlers)) {
    Object.defineProperty(handler2, name42, {
      enumerable: true,
      get() {
        return addProcessor(this, name42)
      },
    })
  }
  return handler2
}
const splitCode = (code2) => code2.split(/[\s'"`;>=]+/g).filter(isValidSelector)
const extractorSplit = {
  name: 'split',
  order: 0,
  extract({ code: code2 }) {
    return new Set(splitCode(code2))
  },
}
const extractorSvelte = {
  name: 'svelte',
  order: 0,
  extract({ code: code2, id }) {
    let result = splitCode(code2)
    if (id && id.endsWith('.svelte')) {
      result = result.map((r) => {
        return r.startsWith('class:') ? r.slice(6) : r
      })
    }
    return new Set(result)
  },
}
function resolveShortcuts(shortcuts2) {
  return toArray(shortcuts2).flatMap((s) => {
    if (Array.isArray(s)) return [s]
    return Object.entries(s)
  })
}
const defaultLayers = {
  shortcuts: -1,
  default: 0,
}
function resolveConfig(userConfig = {}, defaults2 = {}) {
  const config = Object.assign({}, defaults2, userConfig)
  const rawPresets = (config.presets || []).flatMap(toArray)
  const sortedPresets = [
    ...rawPresets.filter((p) => p.enforce === 'pre'),
    ...rawPresets.filter((p) => !p.enforce),
    ...rawPresets.filter((p) => p.enforce === 'post'),
  ]
  const layers = Object.assign(
    defaultLayers,
    ...rawPresets.map((i) => i.layers),
    userConfig.layers,
  )
  function mergePresets(key) {
    return uniq([
      ...sortedPresets.flatMap((p) => toArray(p[key] || [])),
      ...toArray(config[key] || []),
    ])
  }
  const extractors = mergePresets('extractors')
  if (!extractors.length) extractors.push(extractorSplit)
  extractors.sort((a, b) => (a.order || 0) - (b.order || 0))
  const rules3 = mergePresets('rules')
  const rulesStaticMap = {}
  const rulesSize = rules3.length
  rules3.forEach((rule, i) => {
    if (isStaticRule(rule)) {
      rulesStaticMap[rule[0]] = [i, rule[1], rule[2]]
      delete rules3[i]
    }
  })
  const theme3 = clone(
    [...sortedPresets.map((p) => p.theme || {}), config.theme || {}].reduce(
      (a, p) => mergeDeep(a, p),
      {},
    ),
  )
  mergePresets('extendTheme').forEach((extendTheme) => extendTheme(theme3))
  return {
    mergeSelectors: true,
    warn: true,
    blocklist: [],
    safelist: [],
    sortLayers: (layers2) => layers2,
    ...config,
    presets: sortedPresets,
    envMode: config.envMode || 'build',
    shortcutsLayer: config.shortcutsLayer || 'shortcuts',
    layers,
    theme: theme3,
    rulesSize,
    rulesDynamic: rules3,
    rulesStaticMap,
    preprocess: mergePresets('preprocess'),
    postprocess: mergePresets('postprocess'),
    preflights: mergePresets('preflights'),
    autocomplete: mergePresets('autocomplete'),
    variants: mergePresets('variants').map(normalizeVariant),
    shortcuts: resolveShortcuts(mergePresets('shortcuts')),
    extractors,
  }
}
const version = '0.29.6'
const UnoGenerator = class {
  constructor(userConfig = {}, defaults2 = {}) {
    this.userConfig = userConfig
    this.defaults = defaults2
    this.version = version
    this._cache = /* @__PURE__ */ new Map()
    this.blocked = /* @__PURE__ */ new Set()
    this.parentOrders = /* @__PURE__ */ new Map()
    this.config = resolveConfig(userConfig, defaults2)
  }

  setConfig(userConfig, defaults2) {
    if (!userConfig) return
    if (defaults2) this.defaults = defaults2
    this.userConfig = userConfig
    this.config = resolveConfig(userConfig, this.defaults)
    this.blocked.clear()
    this.parentOrders.clear()
    this._cache.clear()
  }

  async applyExtractors(code2, id, set = /* @__PURE__ */ new Set()) {
    const context = {
      get original() {
        return code2
      },
      code: code2,
      id,
    }
    for (const extractor of this.config.extractors) {
      const result = await extractor.extract(context)
      result == null ? void 0 : result.forEach((t) => set.add(t))
    }
    return set
  }

  makeContext(raw, applied) {
    const context = {
      rawSelector: raw,
      currentSelector: applied[1],
      theme: this.config.theme,
      generator: this,
      variantHandlers: applied[2],
      constructCSS: (...args) => this.constructCustomCSS(context, ...args),
      variantMatch: applied,
    }
    return context
  }

  async parseToken(raw, alias) {
    let _a
    if (this.blocked.has(raw)) return
    const cacheKey = `${raw}${alias ? ` ${alias}` : ''}`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    let current = raw
    for (const p of this.config.preprocess) current = p(raw)
    if (this.isBlocked(current)) {
      this.blocked.add(raw)
      this._cache.set(cacheKey, null)
      return
    }
    const applied = this.matchVariants(raw, current)
    if (!applied || this.isBlocked(applied[1])) {
      this.blocked.add(raw)
      this._cache.set(cacheKey, null)
      return
    }
    const context = this.makeContext(raw, [
      alias || applied[0],
      applied[1],
      applied[2],
      applied[3],
    ])
    const expanded = this.expandShortcut(context.currentSelector, context)
    if (expanded) {
      const utils = await this.stringifyShortcuts(
        context.variantMatch,
        context,
        expanded[0],
        expanded[1],
      )
      if (utils == null ? void 0 : utils.length) {
        this._cache.set(cacheKey, utils)
        return utils
      }
    } else {
      const utils =
        (_a = await this.parseUtil(context.variantMatch, context)) == null
          ? void 0
          : _a.map((i) => this.stringifyUtil(i)).filter(notNull)
      if (utils == null ? void 0 : utils.length) {
        this._cache.set(cacheKey, utils)
        return utils
      }
    }
    this._cache.set(cacheKey, null)
  }

  async generate(
    input,
    { id, scope, preflights = true, safelist = true, minify = false } = {},
  ) {
    const tokens =
      typeof input === 'string' ? await this.applyExtractors(input, id) : input
    if (safelist) this.config.safelist.forEach((s) => tokens.add(s))
    const nl = minify ? '' : '\n'
    const layerSet = /* @__PURE__ */ new Set(['default'])
    const matched = /* @__PURE__ */ new Set()
    const sheet = /* @__PURE__ */ new Map()
    await Promise.all(
      Array.from(tokens).map(async (raw) => {
        let _a
        if (matched.has(raw)) return
        const payload = await this.parseToken(raw)
        if (payload == null) return
        matched.add(raw)
        for (const item of payload) {
          const parent = item[3] || ''
          if (!sheet.has(parent)) sheet.set(parent, [])
          sheet.get(parent).push(item)
          if ((_a = item[4]) == null ? void 0 : _a.layer)
            layerSet.add(item[4].layer)
        }
      }),
    )
    if (preflights) {
      this.config.preflights.forEach((i) => {
        if (i.layer) layerSet.add(i.layer)
      })
    }
    const layerCache = {}
    const layers = this.config.sortLayers(
      Array.from(layerSet).sort(
        (a, b) =>
          (this.config.layers[a] ?? 0) - (this.config.layers[b] ?? 0) ||
          a.localeCompare(b),
      ),
    )
    let preflightsMap = {}
    if (preflights) {
      const preflightContext = {
        generator: this,
        theme: this.config.theme,
      }
      preflightsMap = Object.fromEntries(
        await Promise.all(
          layers.map(async (layer) => {
            const preflights2 = await Promise.all(
              this.config.preflights
                .filter((i) => (i.layer || 'default') === layer)
                .map(async (i) => await i.getCSS(preflightContext)),
            )
            const css = preflights2.filter(Boolean).join(nl)
            return [layer, css]
          }),
        ),
      )
    }
    const getLayer = (layer) => {
      if (layerCache[layer]) return layerCache[layer]
      let css = Array.from(sheet)
        .sort((a, b) => {
          let _a
          return (
            (this.parentOrders.get(a[0]) ?? 0) -
              (this.parentOrders.get(b[0]) ?? 0) ||
            ((_a = a[0]) == null ? void 0 : _a.localeCompare(b[0] || '')) ||
            0
          )
        })
        .map(([parent, items]) => {
          const size = items.length
          const sorted = items
            .filter((i) => {
              let _a
              return (
                (((_a = i[4]) == null ? void 0 : _a.layer) || 'default') ===
                layer
              )
            })
            .sort((a, b) => {
              let _a, _b, _c
              return (
                a[0] - b[0] ||
                (((_a = a[4]) == null ? void 0 : _a.sort) || 0) -
                  (((_b = b[4]) == null ? void 0 : _b.sort) || 0) ||
                ((_c = a[1]) == null ? void 0 : _c.localeCompare(b[1] || '')) ||
                0
              )
            })
            .map((a) => {
              let _a
              return [
                a[1] ? applyScope(a[1], scope) : a[1],
                a[2],
                !!((_a = a[4]) == null ? void 0 : _a.noMerge),
              ]
            })
            .map((a) => [a[0] == null ? a[0] : [a[0]], a[1], a[2]])
          if (!sorted.length) return void 0
          const rules3 = sorted
            .reverse()
            .map(([selector2, body, noMerge], idx) => {
              if (!noMerge && selector2 && this.config.mergeSelectors) {
                for (let i = idx + 1; i < size; i++) {
                  const current = sorted[i]
                  if (
                    current &&
                    !current[2] &&
                    current[0] &&
                    current[1] === body
                  ) {
                    current[0].push(...selector2)
                    return null
                  }
                }
              }
              return selector2
                ? `${[...new Set(selector2)].join(`,${nl}`)}{${body}}`
                : body
            })
            .filter(Boolean)
            .reverse()
            .join(nl)
          return parent ? `${parent}{${nl}${rules3}${nl}}` : rules3
        })
        .filter(Boolean)
        .join(nl)
      if (preflights) css = [preflightsMap[layer], css].filter(Boolean).join(nl)

      return (layerCache[layer] =
        !minify && css ? `/* layer: ${layer} */${nl}${css}` : css)
    }
    const getLayers = (includes = layers, excludes) => {
      return includes
        .filter((i) => !(excludes == null ? void 0 : excludes.includes(i)))
        .map((i) => getLayer(i) || '')
        .filter(Boolean)
        .join(nl)
    }
    return {
      get css() {
        return getLayers()
      },
      layers,
      getLayers,
      getLayer,
      matched,
    }
  }

  matchVariants(raw, current) {
    const variants3 = /* @__PURE__ */ new Set()
    const handlers = []
    let processed = current || raw
    let applied = false
    const context = {
      rawSelector: raw,
      theme: this.config.theme,
      generator: this,
    }
    while (true) {
      applied = false
      for (const v of this.config.variants) {
        if (!v.multiPass && variants3.has(v)) continue
        let handler2 = v.match(processed, context)
        if (!handler2) continue
        if (typeof handler2 === 'string') handler2 = { matcher: handler2 }
        processed = handler2.matcher
        if (Array.isArray(handler2.parent))
          this.parentOrders.set(handler2.parent[0], handler2.parent[1])
        handlers.push(handler2)
        variants3.add(v)
        applied = true
        break
      }
      if (!applied) break
      if (handlers.length > 500)
        throw new Error(`Too many variants applied to "${raw}"`)
    }
    return [raw, processed, handlers, variants3]
  }

  applyVariants(parsed, variantHandlers = parsed[4], raw = parsed[1]) {
    const handlers = [...variantHandlers].sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    )
    const entries = handlers.reduce((p, v) => {
      let _a
      return ((_a = v.body) == null ? void 0 : _a.call(v, p)) || p
    }, parsed[2])
    const obj = {
      selector: handlers.reduce((p, v) => {
        let _a
        return (
          ((_a = v.selector) == null ? void 0 : _a.call(v, p, entries)) || p
        )
      }, toEscapedSelector(raw)),
      entries,
      parent: handlers.reduce(
        (p, v) => (Array.isArray(v.parent) ? v.parent[0] : v.parent || p),
        void 0,
      ),
      layer: handlers.reduce((p, v) => v.layer || p, void 0),
      sort: handlers.reduce((p, v) => v.sort || p, void 0),
    }
    for (const p of this.config.postprocess) p(obj)
    return obj
  }

  constructCustomCSS(context, body, overrideSelector) {
    body = normalizeCSSEntries(body)
    const {
      selector: selector2,
      entries,
      parent,
    } = this.applyVariants([
      0,
      overrideSelector || context.rawSelector,
      body,
      void 0,
      context.variantHandlers,
    ])
    const cssBody = `${selector2}{${entriesToCss(entries)}}`
    if (parent) return `${parent}{${cssBody}}`
    return cssBody
  }

  async parseUtil(input, context, internal = false) {
    let _a, _b
    const [raw, processed, variantHandlers] =
      typeof input === 'string' ? this.matchVariants(input) : input
    const staticMatch = this.config.rulesStaticMap[processed]
    if (staticMatch) {
      if (
        staticMatch[1] &&
        (internal || !((_a = staticMatch[2]) == null ? void 0 : _a.internal))
      )
        return [
          [
            staticMatch[0],
            raw,
            normalizeCSSEntries(staticMatch[1]),
            staticMatch[2],
            variantHandlers,
          ],
        ]
    }
    context.variantHandlers = variantHandlers
    const { rulesDynamic, rulesSize } = this.config
    for (let i = rulesSize - 1; i >= 0; i--) {
      const rule = rulesDynamic[i]
      if (!rule) continue
      if (((_b = rule[2]) == null ? void 0 : _b.internal) && !internal) continue
      const [matcher, handler2, meta] = rule
      const match = processed.match(matcher)
      if (!match) continue
      const result = await handler2(match, context)
      if (!result) continue
      if (typeof result === 'string') return [[i, result, meta]]
      const entries = normalizeCSSValues(result).filter((i2) => i2.length)
      if (entries.length)
        return entries.map((e2) => [i, raw, e2, meta, variantHandlers])
    }
  }

  stringifyUtil(parsed) {
    if (!parsed) return
    if (isRawUtil(parsed))
      return [parsed[0], void 0, parsed[1], void 0, parsed[2]]
    const {
      selector: selector2,
      entries,
      parent,
      layer: variantLayer2,
      sort: variantSort,
    } = this.applyVariants(parsed)
    const body = entriesToCss(entries)
    if (!body) return
    const { layer: metaLayer, sort: metaSort, ...meta } = parsed[3] ?? {}
    const ruleMeta = {
      ...meta,
      layer: variantLayer2 ?? metaLayer,
      sort: variantSort ?? metaSort,
    }
    return [parsed[0], selector2, body, parent, ruleMeta]
  }

  expandShortcut(processed, context, depth = 3) {
    if (depth === 0) return
    let meta
    let result
    for (const s of this.config.shortcuts) {
      if (isStaticShortcut(s)) {
        if (s[0] === processed) {
          meta = meta || s[2]
          result = s[1]
          break
        }
      } else {
        const match = processed.match(s[0])
        if (match) result = s[1](match, context)
        if (result) {
          meta = meta || s[2]
          break
        }
      }
    }
    if (typeof result === 'string')
      result = expandVariantGroup(result).split(/\s+/g)
    if (!result) return
    return [
      result
        .flatMap((r) => {
          let _a
          return (
            ((_a = this.expandShortcut(r, context, depth - 1)) == null
              ? void 0
              : _a[0]) || [r]
          )
        })
        .filter((r) => r !== ''),
      meta,
    ]
  }

  async stringifyShortcuts(
    parent,
    context,
    expanded,
    meta = { layer: this.config.shortcutsLayer },
  ) {
    let _a
    const selectorMap = new TwoKeyMap()
    const parsed = (
      await Promise.all(
        uniq(expanded).map(async (i) => {
          const result = await this.parseUtil(i, context, true)
          if (!result)
            warnOnce(`unmatched utility "${i}" in shortcut "${parent[1]}"`)
          return result || []
        }),
      )
    )
      .flat(1)
      .filter(Boolean)
      .sort((a, b) => a[0] - b[0])
    const [raw, , parentVariants] = parent
    for (const item of parsed) {
      if (isRawUtil(item)) continue
      const {
        selector: selector2,
        entries,
        parent: parent2,
        sort,
      } = this.applyVariants(item, [...item[4], ...parentVariants], raw)
      const mapItem = selectorMap.getFallback(selector2, parent2, [[], item[0]])
      mapItem[0].push([
        entries,
        !!((_a = item[3]) == null ? void 0 : _a.noMerge),
        sort ?? 0,
      ])
    }
    return selectorMap
      .map(([e2, index], selector2, mediaQuery) => {
        const stringify = (flatten, noMerge, entrySortPair) => {
          const maxSort = Math.max(...entrySortPair.map((e3) => e3[1]))
          const entriesList = entrySortPair.map((e3) => e3[0])
          return (flatten ? [entriesList.flat(1)] : entriesList).map(
            (entries) => {
              const body = entriesToCss(entries)
              if (body)
                return [
                  index,
                  selector2,
                  body,
                  mediaQuery,
                  { ...meta, noMerge, sort: maxSort },
                ]
              return void 0
            },
          )
        }
        const merges = [
          [
            e2
              .filter(([, noMerge]) => noMerge)
              .map(([entries, , sort]) => [entries, sort]),
            true,
          ],
          [
            e2
              .filter(([, noMerge]) => !noMerge)
              .map(([entries, , sort]) => [entries, sort]),
            false,
          ],
        ]
        return merges.map(([e3, noMerge]) => [
          ...stringify(
            false,
            noMerge,
            e3.filter(([entries]) =>
              entries.some((entry) => entry[0] === CONTROL_SHORTCUT_NO_MERGE),
            ),
          ),
          ...stringify(
            true,
            noMerge,
            e3.filter(([entries]) =>
              entries.every((entry) => entry[0] !== CONTROL_SHORTCUT_NO_MERGE),
            ),
          ),
        ])
      })
      .flat(2)
      .filter(Boolean)
  }

  isBlocked(raw) {
    return (
      !raw ||
      this.config.blocklist.some((e2) =>
        typeof e2 === 'string' ? e2 === raw : e2.test(raw),
      )
    )
  }
}
function createGenerator(config, defaults2) {
  return new UnoGenerator(config, defaults2)
}
const regexScopePlaceholder = / \$\$ /
const hasScopePlaceholder = (css) => css.match(regexScopePlaceholder)
function applyScope(css, scope) {
  if (hasScopePlaceholder(css))
    return css.replace(regexScopePlaceholder, scope ? ` ${scope} ` : ' ')
  else return scope ? `${scope} ${css}` : css
}
const attributifyRe = /^\[(.+?)(~?=)"(.*)"\]$/
function toEscapedSelector(raw) {
  if (attributifyRe.test(raw))
    return raw.replace(attributifyRe, (_, n, s, i) => `[${e(n)}${s}"${e(i)}"]`)
  return `.${e(raw)}`
}

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/colors.mjs
const colors = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  light: {
    50: '#fdfdfd',
    100: '#fcfcfc',
    200: '#fafafa',
    300: '#f8f9fa',
    400: '#f6f6f6',
    500: '#f2f2f2',
    600: '#f1f3f5',
    700: '#e9ecef',
    800: '#dee2e6',
    900: '#dde1e3',
  },
  dark: {
    50: '#4a4a4a',
    100: '#3c3c3c',
    200: '#323232',
    300: '#2d2d2d',
    400: '#222222',
    500: '#1f1f1f',
    600: '#1c1c1e',
    700: '#1b1b1b',
    800: '#181818',
    900: '#0f0f0f',
  },
  get lightblue() {
    return this.sky
  },
  get lightBlue() {
    return this.sky
  },
  get warmgray() {
    return this.stone
  },
  get warmGray() {
    return this.stone
  },
  get truegray() {
    return this.neutral
  },
  get trueGray() {
    return this.neutral
  },
  get coolgray() {
    return this.gray
  },
  get coolGray() {
    return this.gray
  },
  get bluegray() {
    return this.slate
  },
  get blueGray() {
    return this.slate
  },
}
Object.values(colors).forEach((color) => {
  if (typeof color !== 'string') {
    color.DEFAULT = color.DEFAULT || color[400]
    Object.keys(color).forEach((key) => {
      const short = +key / 100
      if (short === Math.round(short)) color[short] = color[key]
    })
  }
})

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/default.mjs
const fontFamily = {
  sans: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ].join(','),
  serif: [
    'ui-serif',
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif',
  ].join(','),
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(','),
}
const fontSize = {
  xs: ['0.75rem', '1rem'],
  sm: ['0.875rem', '1.25rem'],
  base: ['1rem', '1.5rem'],
  lg: ['1.125rem', '1.75rem'],
  xl: ['1.25rem', '1.75rem'],
  '2xl': ['1.5rem', '2rem'],
  '3xl': ['1.875rem', '2.25rem'],
  '4xl': ['2.25rem', '2.5rem'],
  '5xl': ['3rem', '1'],
  '6xl': ['3.75rem', '1'],
  '7xl': ['4.5rem', '1'],
  '8xl': ['6rem', '1'],
  '9xl': ['8rem', '1'],
}
const textIndent = {
  DEFAULT: '1.5rem',
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
  '2xl': '3rem',
  '3xl': '4rem',
}
const textStrokeWidth = {
  DEFAULT: '1.5rem',
  none: '0',
  sm: 'thin',
  md: 'medium',
  lg: 'thick',
}
const textShadow = {
  DEFAULT: ['0 0 1px rgba(0,0,0,0.2)', '0 0 1px rgba(1,0,5,0.1)'],
  none: '0 0 #0000',
  sm: '1px 1px 3px rgba(36,37,47,0.25)',
  md: ['0 1px 2px rgba(30,29,39,0.19)', '1px 2px 4px rgba(54,64,147,0.18)'],
  lg: ['3px 3px 6px rgba(0,0,0,0.26)', '0 0 5px rgba(15,3,86,0.22)'],
  xl: ['1px 1px 3px rgba(0,0,0,0.29)', '2px 4px 7px rgba(73,64,125,0.35)'],
}
const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}
const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}
const wordSpacing = letterSpacing
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
const verticalBreakpoints = { ...breakpoints }
const lineWidth = {
  DEFAULT: '1px',
  none: '0px',
}
const spacing = {
  DEFAULT: '1rem',
  none: '0rem',
  xs: '0.75rem',
  sm: '0.875rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}
const duration = {
  DEFAULT: '150ms',
  none: '0ms',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1e3: '1000ms',
}
const borderRadius = {
  DEFAULT: '0.25rem',
  none: '0rem',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}
const boxShadow = {
  DEFAULT: [
    'var(--un-shadow-inset) 0 1px 3px 0 rgba(0,0,0,0.1)',
    'var(--un-shadow-inset) 0 1px 2px -1px rgba(0,0,0,0.1)',
  ],
  none: '0 0 #0000',
  sm: 'var(--un-shadow-inset) 0 1px 2px 0 rgba(0,0,0,0.05)',
  md: [
    'var(--un-shadow-inset) 0 4px 6px -1px rgba(0,0,0,0.1)',
    'var(--un-shadow-inset) 0 2px 4px -2px rgba(0,0,0,0.1)',
  ],
  lg: [
    'var(--un-shadow-inset) 0 10px 15px -3px rgba(0,0,0,0.1)',
    'var(--un-shadow-inset) 0 4px 6px -4px rgba(0,0,0,0.1)',
  ],
  xl: [
    'var(--un-shadow-inset) 0 20px 25px -5px rgba(0,0,0,0.1)',
    'var(--un-shadow-inset) 0 8px 10px -6px rgba(0,0,0,0.1)',
  ],
  '2xl': 'var(--un-shadow-inset) 0 25px 50px -12px rgba(0,0,0,0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
}
const easing = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}
const ringWidth = {
  DEFAULT: '1px',
  none: '0px',
}
const blur = {
  DEFAULT: '8px',
  0: '0',
  sm: '4px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
}
const dropShadow = {
  DEFAULT: ['0 1px 2px rgba(0,0,0,0.1)', '0 1px 1px rgba(0,0,0,0.06)'],
  sm: '0 1px 1px rgba(0,0,0,0.05)',
  md: ['0 4px 3px rgba(0,0,0,0.07)', '0 2px 2px rgba(0,0,0,0.06)'],
  lg: ['0 10px 8px rgba(0,0,0,0.04)', '0 4px 3px rgba(0,0,0,0.1)'],
  xl: ['0 20px 13px rgba(0,0,0,0.03)', '0 8px 5px rgba(0,0,0,0.08)'],
  '2xl': '0 25px 25px rgba(0,0,0,0.15)',
  none: '0 0 #0000',
}
const baseSize = {
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  prose: '65ch',
}
const width = {
  auto: 'auto',
  ...baseSize,
  screen: '100vw',
}
const maxWidth = {
  none: 'none',
  ...baseSize,
  screen: '100vw',
}
const height = {
  auto: 'auto',
  ...baseSize,
  screen: '100vh',
}
const maxHeight = {
  none: 'none',
  ...baseSize,
  screen: '100vh',
}
const theme = {
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize: width,
  blockSize: height,
  maxInlineSize: maxWidth,
  maxBlockSize: maxHeight,
  minInlineSize: maxWidth,
  minBlockSize: maxHeight,
  colors,
  fontFamily,
  fontSize,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  lineWidth,
  spacing,
  duration,
  ringWidth,
}

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/utilities.mjs
const cssColorFunctions = [
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'rgb',
  'rgba',
]
function parseCssColor(str = '') {
  const color = parseColor$1(str)
  if (color == null || color === false) return
  const { type: casedType, components, alpha } = color
  const type = casedType.toLowerCase()
  if (components.length === 0) return
  if (['rgba', 'hsla'].includes(type) && alpha == null) return
  if (cssColorFunctions.includes(type) && ![1, 3].includes(components.length))
    return
  return { type, components, alpha }
}
function colorToString(color, alphaOverride) {
  const { components } = color
  let { alpha, type } = color
  alpha = alphaOverride ?? alpha
  type = type.toLowerCase()
  if (['hsla', 'hsl', 'rgba', 'rgb'].includes(type))
    return `${type.replace('a', '')}a(${components.join(',')}${
      alpha == null ? '' : `,${alpha}`
    })`
  alpha = alpha == null ? '' : ` / ${alpha}`
  if (cssColorFunctions.includes(type))
    return `${type}(${components.join(' ')}${alpha})`
  return `color(${type} ${components.join(' ')}${alpha})`
}
function parseColor$1(str) {
  if (!str) return
  let color = parseHexColor(str)
  if (color != null) return color
  color = cssColorKeyword(str)
  if (color != null) return color
  color = parseCssCommaColorFunction(str)
  if (color != null) return color
  color = parseCssSpaceColorFunction(str)
  if (color != null) return color
  color = parseCssColorFunction(str)
  if (color != null) return color
}
function parseHexColor(str) {
  const [, body] = str.match(/^#([\da-f]+)$/i) || []
  if (!body) return
  switch (body.length) {
    case 3:
    case 4:
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map(
        (n) => (n << 4) | n,
      )
      return {
        type: 'rgb',
        components: digits.slice(0, 3),
        alpha:
          body.length === 3
            ? void 0
            : Math.round((digits[3] / 255) * 100) / 100,
      }
    case 6:
    case 8:
      const value = Number.parseInt(body, 16)
      return {
        type: 'rgb',
        components:
          body.length === 6
            ? [(value >> 16) & 255, (value >> 8) & 255, value & 255]
            : [(value >> 24) & 255, (value >> 16) & 255, (value >> 8) & 255],
        alpha:
          body.length === 6
            ? void 0
            : Math.round(((value & 255) / 255) * 100) / 100,
      }
  }
}
function cssColorKeyword(str) {
  const color = {
    rebeccapurple: [102, 51, 153, 1],
  }[str]
  if (color != null) {
    return {
      type: 'rgb',
      components: color.slice(0, 3),
      alpha: color[3],
    }
  }
}
function parseCssCommaColorFunction(color) {
  const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i)
  if (!match) return
  const [, type, componentString] = match
  const components = getComponents(componentString, ',', 5)
  if (components) {
    if ([3, 4].includes(components.length)) {
      return {
        type,
        components: components.slice(0, 3),
        alpha: components[3],
      }
    } else if (components.length !== 1) {
      return false
    }
  }
}
const cssColorFunctionsRe = new RegExp(
  `^(${cssColorFunctions.join('|')})\\((.+)\\)$`,
  'i',
)
function parseCssSpaceColorFunction(color) {
  const match = color.match(cssColorFunctionsRe)
  if (!match) return
  const [, fn, componentString] = match
  const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`)
  if (parsed) {
    const {
      alpha,
      components: [type, ...components],
    } = parsed
    return {
      type,
      components,
      alpha,
    }
  }
}
function parseCssColorFunction(color) {
  const match = color.match(/^color\((.+)\)$/)
  if (!match) return
  const parsed = parseCssSpaceColorValues(match[1])
  if (parsed) {
    const {
      alpha,
      components: [type, ...components],
    } = parsed
    return {
      type,
      components,
      alpha,
    }
  }
}
function parseCssSpaceColorValues(componentString) {
  const components = getComponents(componentString)
  if (!components) return
  let totalComponents = components.length
  if (components[totalComponents - 2] === '/') {
    return {
      components: components.slice(0, totalComponents - 2),
      alpha: components[totalComponents - 1],
    }
  }
  if (
    components[totalComponents - 2] != null &&
    (components[totalComponents - 2].endsWith('/') ||
      components[totalComponents - 1].startsWith('/'))
  ) {
    const removed = components.splice(totalComponents - 2)
    components.push(removed.join(' '))
    --totalComponents
  }
  const withAlpha = getComponents(components[totalComponents - 1], '/', 3)
  if (!withAlpha) return
  if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === '')
    return { components }
  const alpha = withAlpha.pop()
  components[totalComponents - 1] = withAlpha.join('/')
  return {
    components,
    alpha,
  }
}
function getComponent(str, separator) {
  str = str.trim()
  if (str === '') return
  const l = str.length
  let parenthesis = 0
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case '(':
        parenthesis++
        break
      case ')':
        if (--parenthesis < 0) return
        break
      case separator:
        if (parenthesis === 0) {
          const component = str.slice(0, i).trim()
          if (component === '') return
          return [component, str.slice(i + 1).trim()]
        }
    }
  }
  return [str, '']
}
function getComponents(str, separator, limit) {
  separator = separator ?? ' '
  if (separator.length !== 1) return
  limit = limit ?? 10
  const components = []
  let i = 0
  while (str !== '') {
    if (++i > limit) return
    const componentPair = getComponent(str, separator)
    if (!componentPair) return
    const [component, rest] = componentPair
    components.push(component)
    str = rest
  }
  if (components.length > 0) return components
}
const directionMap = {
  l: ['-left'],
  r: ['-right'],
  t: ['-top'],
  b: ['-bottom'],
  s: ['-inline-start'],
  e: ['-inline-end'],
  x: ['-left', '-right'],
  y: ['-top', '-bottom'],
  '': [''],
  bs: ['-block-start'],
  be: ['-block-end'],
  is: ['-inline-start'],
  ie: ['-inline-end'],
  block: ['-block-start', '-block-end'],
  inline: ['-inline-start', '-inline-end'],
}
const insetMap = {
  ...directionMap,
  s: ['-inset-inline-start'],
  e: ['-inset-inline-end'],
  bs: ['-inset-block-start'],
  be: ['-inset-block-end'],
  is: ['-inset-inline-start'],
  ie: ['-inset-inline-end'],
  block: ['-inset-block-start', '-inset-block-end'],
  inline: ['-inset-inline-start', '-inset-inline-end'],
}
const cornerMap = {
  l: ['-top-left', '-bottom-left'],
  r: ['-top-right', '-bottom-right'],
  t: ['-top-left', '-top-right'],
  b: ['-bottom-left', '-bottom-right'],
  tl: ['-top-left'],
  lt: ['-top-left'],
  tr: ['-top-right'],
  rt: ['-top-right'],
  bl: ['-bottom-left'],
  lb: ['-bottom-left'],
  br: ['-bottom-right'],
  rb: ['-bottom-right'],
  '': [''],
  bs: ['-start-start', '-start-end'],
  be: ['-end-start', '-end-end'],
  is: ['-end-start', '-start-start'],
  ie: ['-start-end', '-end-end'],
  'bs-is': ['-start-start'],
  'is-bs': ['-start-start'],
  'bs-ie': ['-start-end'],
  'ie-bs': ['-start-end'],
  'be-is': ['-end-start'],
  'is-be': ['-end-start'],
  'be-ie': ['-end-end'],
  'ie-be': ['-end-end'],
}
const xyzMap = {
  x: ['-x'],
  y: ['-y'],
  z: ['-z'],
  '': ['-x', '-y'],
}
const basePositionMap = [
  'top',
  'top center',
  'top left',
  'top right',
  'bottom',
  'bottom center',
  'bottom left',
  'bottom right',
  'left',
  'left center',
  'left top',
  'left bottom',
  'right',
  'right center',
  'right top',
  'right bottom',
  'center',
  'center top',
  'center bottom',
  'center left',
  'center right',
  'center center',
]
const positionMap = Object.assign(
  {},
  ...basePositionMap.map((p) => ({ [p.replace(/ /, '-')]: p })),
  ...basePositionMap.map((p) => ({
    [p.replace(/\b(\w)\w+/g, '$1').replace(/ /, '')]: p,
  })),
)
const cssProps = [
  'color',
  'border-color',
  'background-color',
  'flex-grow',
  'flex',
  'flex-shrink',
  'caret-color',
  'font',
  'gap',
  'opacity',
  'visibility',
  'z-index',
  'font-weight',
  'zoom',
  'text-shadow',
  'transform',
  'box-shadow',
  'backround-position',
  'left',
  'right',
  'top',
  'bottom',
  'object-position',
  'max-height',
  'min-height',
  'max-width',
  'min-width',
  'height',
  'width',
  'border-width',
  'margin',
  'padding',
  'outline-width',
  'outline-offset',
  'font-size',
  'line-height',
  'text-indent',
  'vertical-align',
  'border-spacing',
  'letter-spacing',
  'word-spacing',
  'stroke',
  'filter',
  'backdrop-filter',
  'fill',
  'mask',
  'mask-size',
  'mask-border',
  'clip-path',
  'clip',
  'border-radius',
]
const numberWithUnitRE =
  /^(-?[0-9.]+)(px|pt|pc|rem|em|%|vh|vw|in|cm|mm|ex|ch|vmin|vmax|rpx)?$/i
const numberRE = /^(-?[0-9.]+)$/i
const unitOnlyRE = /^(px)$/i
function round(n) {
  return n
    .toFixed(10)
    .replace(/\.0+$/, '')
    .replace(/(\.\d+?)0+$/, '$1')
}
function numberWithUnit(str) {
  const match = str.match(numberWithUnitRE)
  if (!match) return
  const [, n, unit] = match
  const num = parseFloat(n)
  if (unit && !Number.isNaN(num)) return `${round(num)}${unit}`
}
function auto(str) {
  if (str === 'auto' || str === 'a') return 'auto'
}
function rem(str) {
  if (str.match(unitOnlyRE)) return `1${str}`
  const match = str.match(numberWithUnitRE)
  if (!match) return
  const [, n, unit] = match
  const num = parseFloat(n)
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num / 4)}rem`
}
function px(str) {
  if (str.match(unitOnlyRE)) return `1${str}`
  const match = str.match(numberWithUnitRE)
  if (!match) return
  const [, n, unit] = match
  const num = parseFloat(n)
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num)}px`
}
function number(str) {
  if (!numberRE.test(str)) return
  const num = parseFloat(str)
  if (!Number.isNaN(num)) return round(num)
}
function percent(str) {
  if (str.endsWith('%')) str = str.slice(0, -1)
  const num = parseFloat(str)
  if (!Number.isNaN(num)) return `${round(num / 100)}`
}
function fraction(str) {
  if (str === 'full') return '100%'
  const [left, right] = str.split('/')
  const num = parseFloat(left) / parseFloat(right)
  if (!Number.isNaN(num)) return `${round(num * 100)}%`
}
function bracketWithType(str, type) {
  if (str && str.startsWith('[') && str.endsWith(']')) {
    let base
    const match = str.match(/^\[(color|length):/i)
    if (!match) base = str.slice(1, -1)
    else if (type && match[1] === type) base = str.slice(match[0].length, -1)
    if (base !== void 0) {
      return base
        .replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, '\\_'))
        .replace(/([^\\])_/g, '$1 ')
        .replace(/calc\((.*)/g, (v) => {
          return v.replace(
            /(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,
            '$1 $2 ',
          )
        })
    }
  }
}
function bracket(str) {
  return bracketWithType(str)
}
function bracketOfColor(str) {
  return bracketWithType(str, 'color')
}
function bracketOfLength(str) {
  return bracketWithType(str, 'length')
}
function cssvar(str) {
  if (str.match(/^\$\S/)) return `var(--${escapeSelector(str.slice(1))})`
}
function time(str) {
  const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i)
  if (!match) return
  const [, n, unit] = match
  const num = parseFloat(n)
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num)}ms`
}
function degree(str) {
  const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i)
  if (!match) return
  const [, n, unit] = match
  const num = parseFloat(n)
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num)}deg`
}
function global(str) {
  if (['inherit', 'initial', 'revert', 'unset'].includes(str)) return str
}
function properties(str) {
  for (const prop of str.split(',')) {
    if (!cssProps.includes(prop)) return
  }
  return str
}
const valueHandlers = {
  __proto__: null,
  numberWithUnit,
  auto,
  rem,
  px,
  number,
  percent,
  fraction,
  bracket,
  bracketOfColor,
  bracketOfLength,
  cssvar,
  time,
  degree,
  global,
  properties,
}
const handler = createValueHandler(valueHandlers)
const directionSize =
  (propertyPrefix) =>
  ([_, direction, size], { theme: theme3 }) => {
    let _a
    const v =
      ((_a = theme3.spacing) == null ? void 0 : _a[size || 'DEFAULT']) ??
      handler.bracket.cssvar.auto.fraction.rem(size)
    if (v != null)
      return directionMap[direction].map((i) => [`${propertyPrefix}${i}`, v])
  }
const getThemeColor = (theme3, colors2) => {
  let _a
  return (_a = theme3.colors) == null
    ? void 0
    : _a[
        colors2.join('-').replace(/(-[a-z])/g, (n) => n.slice(1).toUpperCase())
      ]
}
const parseColor = (body, theme3) => {
  const split = body.split(/(?:\/|:)/)
  let main, opacity2
  if (split[0] === '[color') {
    main = split.slice(0, 2).join(':')
    opacity2 = split[2]
  } else {
    ;[main, opacity2] = split
  }
  const colors2 = main.replace(/([a-z])([0-9])/g, '$1-$2').split(/-/g)
  const [name42] = colors2
  if (!name42) return
  let color
  const bracket2 = handler.bracketOfColor(main)
  const bracketOrMain = bracket2 || main
  if (bracketOrMain.startsWith('#')) color = bracketOrMain
  else if (bracketOrMain.startsWith('hex-'))
    color = `#${bracketOrMain.slice(4)}`
  else if (main.startsWith('$')) color = handler.cssvar(main)
  color = color || bracket2
  let no = 'DEFAULT'
  if (!color) {
    let colorData
    const [scale] = colors2.slice(-1)
    if (scale.match(/^\d+$/)) {
      no = scale
      colorData = getThemeColor(theme3, colors2.slice(0, -1))
    } else {
      colorData = getThemeColor(theme3, colors2)
      if (!colorData && colors2.length <= 2) {
        ;[, no = no] = colors2
        colorData = getThemeColor(theme3, [name42])
      }
    }
    if (typeof colorData === 'string') color = colorData
    else if (no && colorData) color = colorData[no]
  }
  return {
    opacity: opacity2,
    name: name42,
    no,
    color,
    cssColor: parseCssColor(color),
    alpha: handler.bracket.cssvar.percent(opacity2 ?? ''),
  }
}
const colorResolver =
  (property2, varName) =>
  ([, body], { theme: theme3 }) => {
    const data = parseColor(body, theme3)
    if (!data) return
    const { alpha, color, cssColor } = data
    if (cssColor) {
      if (alpha != null) {
        return {
          [property2]: colorToString(cssColor, alpha),
        }
      } else {
        return {
          [`--un-${varName}-opacity`]: cssColor.alpha ?? 1,
          [property2]: colorToString(cssColor, `var(--un-${varName}-opacity)`),
        }
      }
    } else if (color) {
      return {
        [property2]: color.replace('%alpha', `${alpha ?? 1}`),
      }
    }
  }
const colorableShadows = (shadows, colorVar) => {
  const colored = []
  shadows = toArray(shadows)
  for (let i = 0; i < shadows.length; i++) {
    const components = getComponents(shadows[i], ' ', 6)
    if (!components || components.length < 3) return shadows
    const color = parseCssColor(components.pop())
    if (color == null) return shadows
    colored.push(
      `${components.join(' ')} var(${colorVar}, ${colorToString(color)})`,
    )
  }
  return colored
}
const hasParseableColor = (color, theme3) => {
  let _a
  return (
    color != null &&
    !!((_a = parseColor(color, theme3)) == null ? void 0 : _a.color)
  )
}

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/default2.mjs
const verticalAlignAlias = {
  mid: 'middle',
  base: 'baseline',
  btm: 'bottom',
}
const verticalAligns = [
  [
    /^(?:vertical|align|v)-(baseline|top|middle|bottom|text-top|text-bottom|sub|super|mid|base|btm)$/,
    ([, v]) => ({ 'vertical-align': verticalAlignAlias[v] || v }),
    {
      autocomplete:
        '(vertical|align|v)-(baseline|top|middle|bottom|text-top|text-bottom|sub|super|mid|base|btm)',
    },
  ],
]
const textAligns = [
  ['text-center', { 'text-align': 'center' }],
  ['text-left', { 'text-align': 'left' }],
  ['text-right', { 'text-align': 'right' }],
  ['text-justify', { 'text-align': 'justify' }],
]
const outline = [
  [
    /^outline-(?:width-|size-)?(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'outline-width':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.px(d),
      }
    },
    { autocomplete: 'outline-(width|size)-<num>' },
  ],
  [
    /^outline-(?:color-)?(.+)$/,
    colorResolver('outline-color', 'outline-color'),
    { autocomplete: 'outline-$colors' },
  ],
  [
    /^outline-offset-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'outline-offset':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.px(d),
      }
    },
    { autocomplete: 'outline-(offset)-<num>' },
  ],
  ['outline', { 'outline-style': 'solid' }],
  [
    /^outline-(auto|dashed|dotted|double|hidden|solid|groove|ridge|inset|outset|inherit|initial|revert|unset)$/,
    ([, c]) => ({ 'outline-style': c }),
    {
      autocomplete:
        'outline-(auto|dashed|dotted|double|hidden|solid|groove|ridge|inset|outset|inherit|initial|revert|unset)',
    },
  ],
  [
    'outline-none',
    { outline: '2px solid transparent', 'outline-offset': '2px' },
  ],
]
const appearance = [
  [
    'appearance-none',
    {
      appearance: 'none',
      '-webkit-appearance': 'none',
    },
  ],
]
const willChangeProperty = (prop) => {
  return (
    handler.properties.auto.global(prop) ??
    {
      contents: 'contents',
      scroll: 'scroll-position',
    }[prop]
  )
}
const willChange = [
  [/^will-change-(.+)/, ([, p]) => ({ 'will-change': willChangeProperty(p) })],
]
const borders = [
  [
    /^(?:border|b)()(?:-(.+))?$/,
    handlerBorder,
    { autocomplete: '(border|b)-<directions>' },
  ],
  [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorder],
  [
    /^(?:border|b)-()(?:width|size)-(.+)$/,
    handlerBorderSize,
    { autocomplete: ['(border|b)-<num>', '(border|b)-<directions>-<num>'] },
  ],
  [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],
  [
    /^(?:border|b)-()(?:color-)?(.+)$/,
    handlerBorderColor,
    { autocomplete: ['(border|b)-$colors', '(border|b)-<directions>-$colors'] },
  ],
  [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColor],
  [
    /^(?:border|b)-()op(?:acity)?-?(.+)$/,
    handlerBorderOpacity,
    { autocomplete: '(border|b)-(op|opacity)-<percent>' },
  ],
  [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [
    /^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/,
    handlerRounded,
    {
      autocomplete: [
        '(border|b)-(rounded|rd)',
        '(border|b)-(rounded|rd)-<num>',
        '(rounded|rd)',
        '(rounded|rd)-<num>',
      ],
    },
  ],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltb])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bi][se])(?:-(.+))?$/, handlerRounded],
  [
    /^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/,
    handlerRounded,
  ],
  ['border-solid', { 'border-style': 'solid' }],
  ['border-dashed', { 'border-style': 'dashed' }],
  ['border-dotted', { 'border-style': 'dotted' }],
  ['border-double', { 'border-style': 'double' }],
  ['border-hidden', { 'border-style': 'hidden' }],
  ['border-none', { 'border-style': 'none' }],
]
const borderColorResolver =
  (direction) =>
  ([, body], theme3) => {
    const data = parseColor(body, theme3)
    if (!data) return
    const { alpha, color, cssColor } = data
    if (cssColor) {
      if (alpha != null) {
        return {
          [`border${direction}-color`]: colorToString(cssColor, alpha),
        }
      }
      if (direction === '') {
        return {
          '--un-border-opacity': cssColor.alpha ?? 1,
          [`border${direction}-color`]: colorToString(
            cssColor,
            `var(--un-border${direction}-opacity)`,
          ),
        }
      } else {
        return {
          '--un-border-opacity': cssColor.alpha ?? 1,
          [`--un-border${direction}-opacity`]: 'var(--un-border-opacity)',
          [`border${direction}-color`]: colorToString(
            cssColor,
            `var(--un-border${direction}-opacity)`,
          ),
        }
      }
    } else if (color) {
      return {
        [`border${direction}-color`]: color.replace('%alpha', `${alpha ?? 1}`),
      }
    }
  }
function handlerBorder(m, ctx) {
  const borderSizes = handlerBorderSize(m, ctx)
  if (borderSizes) {
    return [...borderSizes, ['border-style', 'solid']]
  }
}
function handlerBorderSize([, a = '', b], { theme: theme3 }) {
  let _a
  const v =
    ((_a = theme3.lineWidth) == null ? void 0 : _a[b || 'DEFAULT']) ??
    handler.bracket.cssvar.px(b || '1')
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`border${i}-width`, v])
}
function handlerBorderColor([, a = '', c], { theme: theme3 }) {
  if (a in directionMap && hasParseableColor(c, theme3))
    return Object.assign(
      {},
      ...directionMap[a].map((i) => borderColorResolver(i)(['', c], theme3)),
    )
}
function handlerBorderOpacity([, a = '', opacity2]) {
  const v = handler.bracket.percent(opacity2)
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`--un-border${i}-opacity`, v])
}
function handlerRounded([, a = '', s], { theme: theme3 }) {
  let _a
  const v =
    ((_a = theme3.borderRadius) == null ? void 0 : _a[s || 'DEFAULT']) ||
    handler.bracket.cssvar.fraction.rem(s || '1')
  if (a in cornerMap && v != null)
    return cornerMap[a].map((i) => [`border${i}-radius`, v])
}
const opacity = [
  [
    /^op(?:acity)?-?(.+)$/,
    ([, d]) => ({ opacity: handler.bracket.percent.cssvar(d) }),
  ],
]
const textColors = [
  [
    /^(?:text|color|c)-(.+)$/,
    colorResolver('color', 'text'),
    { autocomplete: '(text|color|c)-$colors' },
  ],
  [
    /^(?:text|color|c)-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-text-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: '(text|color|c)-(op|opacity)-<percent>' },
  ],
]
const bgColors = [
  [
    /^bg-(.+)$/,
    colorResolver('background-color', 'bg'),
    { autocomplete: 'bg-$colors' },
  ],
  [
    /^bg-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-bg-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'bg-(op|opacity)-<percent>' },
  ],
]
const transitionPropertyGroup = {
  all: 'all',
  colors: [
    'color',
    'background-color',
    'border-color',
    'text-decoration-color',
    'fill',
    'stroke',
  ].join(','),
  none: 'none',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
}
const transitionProperty = (prop) => {
  return handler.properties(prop) ?? transitionPropertyGroup[prop]
}
const transitions = [
  [
    /^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/,
    ([, prop, d], { theme: theme3 }) => {
      let _a
      const p =
        prop != null
          ? transitionProperty(prop)
          : [
              transitionPropertyGroup.colors,
              'opacity',
              'box-shadow',
              'transform',
              'filter',
              'backdrop-filter',
            ].join(',')
      if (p) {
        const duration2 =
          ((_a = theme3.duration) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.time(d || '150')
        return {
          'transition-property': p,
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': duration2,
        }
      }
    },
    {
      autocomplete: `transition-(${Object.keys(transitionPropertyGroup).join(
        '|',
      )})`,
    },
  ],
  [
    /^(?:transition-)?duration-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'transition-duration':
          ((_a = theme3.duration) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar.time(d),
      }
    },
    { autocomplete: ['transition-duration-$duration', 'duration-$duration'] },
  ],
  [
    /^(?:transition-)?delay-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'transition-delay':
          ((_a = theme3.duration) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar.time(d),
      }
    },
    { autocomplete: ['transition-delay-$duration', 'delay-$duration'] },
  ],
  [
    /^(?:transition-)?ease(?:-(.+))?$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'transition-timing-function':
          ((_a = theme3.easing) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar(d),
      }
    },
    {
      autocomplete: [
        'transition-ease-(linear|in|out|in-out|DEFAULT)',
        'ease-(linear|in|out|in-out|DEFAULT)',
      ],
    },
  ],
  [
    /^(?:transition-)?property-(.+)$/,
    ([, v]) => ({
      'transition-property': handler.global(v) || transitionProperty(v),
    }),
    {
      autocomplete: [
        `transition-property-(${[
          'inherit',
          'initial',
          'revert',
          'unset',
          ...Object.keys(transitionPropertyGroup),
        ].join('|')})`,
      ],
    },
  ],
  ['transition-none', { transition: 'none' }],
]
const flex = [
  ['flex', { display: 'flex' }],
  ['inline-flex', { display: 'inline-flex' }],
  ['flex-inline', { display: 'inline-flex' }],
  [
    /^flex-(.*)$/,
    ([, d]) => ({
      flex:
        handler.bracket(d) != null
          ? handler
              .bracket(d)
              .split(' ')
              .map((e2) => handler.cssvar.fraction(e2) ?? e2)
              .join(' ')
          : handler.cssvar.fraction(d),
    }),
  ],
  ['flex-1', { flex: '1 1 0%' }],
  ['flex-auto', { flex: '1 1 auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-none', { flex: 'none' }],
  [/^(?:flex-)?shrink$/, () => ({ 'flex-shrink': 1 })],
  [/^(?:flex-)?shrink-0$/, () => ({ 'flex-shrink': 0 })],
  [/^(?:flex-)?grow$/, () => ({ 'flex-grow': 1 })],
  [/^(?:flex-)?grow-0$/, () => ({ 'flex-grow': 0 })],
  [
    /^(?:flex-)?basis-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'flex-basis':
          ((_a = theme3.spacing) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.auto.fraction.rem(d),
      }
    },
  ],
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
  ['flex-col', { 'flex-direction': 'column' }],
  ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
  ['flex-wrap', { 'flex-wrap': 'wrap' }],
  ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
  ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
]
const weightMap = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}
const fonts = [
  [
    /^font-(\w+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'font-family':
          ((_a = theme3.fontFamily) == null ? void 0 : _a[d]) ||
          handler.global(d),
      }
    },
    { autocomplete: 'font-$fontFamily' },
  ],
  [
    /^text-(.+)$/,
    ([, s = 'base'], { theme: theme3 }) => {
      let _a
      const themed = toArray((_a = theme3.fontSize) == null ? void 0 : _a[s])
      if (themed == null ? void 0 : themed[0]) {
        const [size, height2 = '1'] = themed
        return {
          'font-size': size,
          'line-height': height2,
        }
      }
      return { 'font-size': handler.bracketOfLength.rem(s) }
    },
    { autocomplete: 'text-$fontSize' },
  ],
  [
    /^text-size-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      const themed = toArray((_a = theme3.fontSize) == null ? void 0 : _a[s])
      const size =
        (themed == null ? void 0 : themed[0]) ?? handler.bracket.cssvar.rem(s)
      if (size != null) return { 'font-size': size }
    },
    { autocomplete: 'text-size-$fontSize' },
  ],
  [
    /^(?:font|fw)-?([^-]+)$/,
    ([, s]) => ({ 'font-weight': weightMap[s] || handler.global.number(s) }),
    {
      autocomplete: `(font|fw)-(100|200|300|400|500|600|700|800|900|${Object.keys(
        weightMap,
      ).join('|')})`,
    },
  ],
  [
    /^(?:leading|lh)-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'line-height':
          ((_a = theme3.lineHeight) == null ? void 0 : _a[s]) ||
          handler.bracket.cssvar.global.rem(s),
      }
    },
    { autocomplete: '(leading|lh)-$lineHeight' },
  ],
  [
    /^tracking-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'letter-spacing':
          ((_a = theme3.letterSpacing) == null ? void 0 : _a[s]) ||
          handler.bracket.cssvar.global.rem(s),
      }
    },
    { autocomplete: 'tracking-$letterSpacing' },
  ],
  [
    /^word-spacing-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'word-spacing':
          ((_a = theme3.wordSpacing) == null ? void 0 : _a[s]) ||
          handler.bracket.cssvar.global.rem(s),
      }
    },
    { autocomplete: 'word-spacing-$wordSpacing' },
  ],
]
const tabSizes = [
  [
    /^tab(?:-(.+))?$/,
    ([, s]) => {
      const v = handler.bracket.cssvar.global.number(s || '4')
      if (v != null) {
        return {
          '-moz-tab-size': v,
          '-o-tab-size': v,
          'tab-size': v,
        }
      }
    },
  ],
]
const textIndents = [
  [
    /^indent(?:-(.+))?$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'text-indent':
          ((_a = theme3.textIndent) == null ? void 0 : _a[s || 'DEFAULT']) ||
          handler.bracket.cssvar.global.fraction.rem(s),
      }
    },
    { autocomplete: 'indent-$textIndent' },
  ],
]
const textStrokes = [
  [
    /^text-stroke(?:-(.+))?$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        '-webkit-text-stroke-width':
          ((_a = theme3.textStrokeWidth) == null
            ? void 0
            : _a[s || 'DEFAULT']) || handler.bracket.cssvar.px(s),
      }
    },
    { autocomplete: 'text-stroke-$textStrokeWidth' },
  ],
  [
    /^text-stroke-(.+)$/,
    colorResolver('-webkit-text-stroke-color', 'text-stroke'),
    { autocomplete: 'text-stroke-$colors' },
  ],
  [
    /^text-stroke-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-text-stroke-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'text-stroke-(op|opacity)-<percent>' },
  ],
]
const textShadows = [
  [
    /^text-shadow(?:-(.+))?$/,
    ([, s], { theme: theme3 }) => {
      let _a
      const v = (_a = theme3.textShadow) == null ? void 0 : _a[s || 'DEFAULT']
      if (v != null) {
        return {
          '--un-text-shadow': colorableShadows(
            v,
            '--un-text-shadow-color',
          ).join(','),
          'text-shadow': 'var(--un-text-shadow)',
        }
      }
      return { 'text-shadow': handler.bracket.cssvar(s) }
    },
    { autocomplete: 'text-shadow-$textShadow' },
  ],
  [
    /^text-shadow-color-(.+)$/,
    colorResolver('--un-text-shadow-color', 'text-shadow'),
    { autocomplete: 'text-shadow-color-$colors' },
  ],
  [
    /^text-shadow-color-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-text-shadow-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'text-shadow-color-(op|opacity)-<percent>' },
  ],
]
const directions = {
  '': '',
  x: 'column-',
  y: 'row-',
}
const handleGap = ([, d = '', s], { theme: theme3 }) => {
  let _a
  const v =
    ((_a = theme3.spacing) == null ? void 0 : _a[s]) ??
    handler.bracket.cssvar.rem(s)
  if (v != null) {
    return {
      [`grid-${directions[d]}gap`]: v,
      [`${directions[d]}gap`]: v,
    }
  }
}
const gaps = [
  [
    /^(?:flex-|grid-)?gap-?()(.+)$/,
    handleGap,
    { autocomplete: ['gap-$spacing', 'gap-<num>'] },
  ],
  [
    /^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
    handleGap,
    { autocomplete: ['gap-(x|y)-$spacing', 'gap-(x|y)-<num>'] },
  ],
]
const rowCol = (s) => s.replace('col', 'column')
const rowColTheme = (s) => (s[0] === 'r' ? 'Row' : 'Column')
const autoDirection = (c, theme3, prop) => {
  let _a
  const v =
    (_a = theme3[`gridAuto${rowColTheme(c)}`]) == null ? void 0 : _a[prop]
  if (v != null) return v
  switch (prop) {
    case 'min':
      return 'min-content'
    case 'max':
      return 'max-content'
    case 'fr':
      return 'minmax(0,1fr)'
  }
  return handler.bracket.cssvar.auto.rem(prop)
}
const grids = [
  ['grid', { display: 'grid' }],
  ['inline-grid', { display: 'inline-grid' }],
  [
    /^(?:grid-)?(row|col)-(.+)$/,
    ([, c, v], { theme: theme3 }) => {
      let _a
      return {
        [`grid-${rowCol(c)}`]:
          ((_a = theme3[`grid${rowColTheme(c)}`]) == null ? void 0 : _a[v]) ??
          handler.bracket.cssvar.auto(v),
      }
    },
  ],
  [
    /^(?:grid-)?(row|col)-span-(.+)$/,
    ([, c, s]) => {
      if (s === 'full') return { [`grid-${rowCol(c)}`]: '1/-1' }
      const v = handler.bracket.number(s)
      if (v != null) return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` }
    },
    { autocomplete: ['grid-(row|col)-span-<num>', '(row|col)-span-<num>'] },
  ],
  [
    /^(?:grid-)?(row|col)-start-(.+)$/,
    ([, c, v]) => ({
      [`grid-${rowCol(c)}-start`]: handler.bracket.cssvar(v) ?? v,
    }),
  ],
  [
    /^(?:grid-)?(row|col)-end-(.+)$/,
    ([, c, v]) => ({
      [`grid-${rowCol(c)}-end`]: handler.bracket.cssvar(v) ?? v,
    }),
  ],
  [
    /^(?:grid-)?auto-(rows|cols)-(.+)$/,
    ([, c, v], { theme: theme3 }) => ({
      [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme3, v),
    }),
  ],
  [
    /^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/,
    ([, v]) => ({ 'grid-auto-flow': handler.bracket.cssvar(v) }),
  ],
  [
    /^(?:grid-auto-flow|auto-flow|grid-flow)-((?:row|col)(?:-dense)?)$/,
    ([, v]) => ({ 'grid-auto-flow': rowCol(v).replace('-', ' ') }),
  ],
  [
    /^grid-(rows|cols)-(.+)$/,
    ([, c, v], { theme: theme3 }) => {
      let _a
      return {
        [`grid-template-${rowCol(c)}`]:
          ((_a = theme3[`gridTemplate${rowColTheme(c)}`]) == null
            ? void 0
            : _a[v]) ?? handler.bracket.cssvar(v),
      }
    },
  ],
  [
    /^grid-(rows|cols)-minmax-([\w.-]+)$/,
    ([, c, d]) => ({
      [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))`,
    }),
  ],
  [
    /^grid-(rows|cols)-(\d+)$/,
    ([, c, d]) => ({
      [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))`,
    }),
  ],
  ['grid-rows-none', { 'grid-template-rows': 'none' }],
  ['grid-cols-none', { 'grid-template-columns': 'none' }],
]
const overflowValues = ['auto', 'hidden', 'clip', 'visible', 'scroll']
const overflows = [
  [
    /^(?:overflow|of)-(.+)$/,
    ([, v]) => (overflowValues.includes(v) ? { overflow: v } : void 0),
    {
      autocomplete: [
        `(overflow|of)-${overflowValues.join('|')}`,
        `(overflow|of)-(x|y)-${overflowValues.join('|')}`,
      ],
    },
  ],
  [
    /^(?:overflow|of)-([xy])-(.+)$/,
    ([, d, v]) =>
      overflowValues.includes(v) ? { [`overflow-${d}`]: v } : void 0,
  ],
]
const positions = [
  [
    /^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,
    ([, v]) => ({ position: v }),
  ],
  [/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })],
]
const justifies = [
  ['justify-start', { 'justify-content': 'flex-start' }],
  ['justify-end', { 'justify-content': 'flex-end' }],
  ['justify-center', { 'justify-content': 'center' }],
  ['justify-between', { 'justify-content': 'space-between' }],
  ['justify-around', { 'justify-content': 'space-around' }],
  ['justify-evenly', { 'justify-content': 'space-evenly' }],
  ['justify-items-start', { 'justify-items': 'start' }],
  ['justify-items-end', { 'justify-items': 'end' }],
  ['justify-items-center', { 'justify-items': 'center' }],
  ['justify-items-stretch', { 'justify-items': 'stretch' }],
  ['justify-self-auto', { 'justify-self': 'auto' }],
  ['justify-self-start', { 'justify-self': 'start' }],
  ['justify-self-end', { 'justify-self': 'end' }],
  ['justify-self-center', { 'justify-self': 'center' }],
  ['justify-self-stretch', { 'justify-self': 'stretch' }],
]
const orders = [
  [/^order-(.+)$/, ([, v]) => ({ order: handler.bracket.cssvar.number(v) })],
  ['order-first', { order: '-9999' }],
  ['order-last', { order: '9999' }],
  ['order-none', { order: '0' }],
]
const alignments = [
  ['content-center', { 'align-content': 'center' }],
  ['content-start', { 'align-content': 'flex-start' }],
  ['content-end', { 'align-content': 'flex-end' }],
  ['content-between', { 'align-content': 'space-between' }],
  ['content-around', { 'align-content': 'space-around' }],
  ['content-evenly', { 'align-content': 'space-evenly' }],
  ['items-start', { 'align-items': 'flex-start' }],
  ['items-end', { 'align-items': 'flex-end' }],
  ['items-center', { 'align-items': 'center' }],
  ['items-baseline', { 'align-items': 'baseline' }],
  ['items-stretch', { 'align-items': 'stretch' }],
  ['self-auto', { 'align-self': 'auto' }],
  ['self-start', { 'align-self': 'flex-start' }],
  ['self-end', { 'align-self': 'flex-end' }],
  ['self-center', { 'align-self': 'center' }],
  ['self-stretch', { 'align-self': 'stretch' }],
  ['self-baseline', { 'align-self': 'baseline' }],
]
const placements = [
  ['place-content-center', { 'place-content': 'center' }],
  ['place-content-start', { 'place-content': 'start' }],
  ['place-content-end', { 'place-content': 'end' }],
  ['place-content-between', { 'place-content': 'space-between' }],
  ['place-content-around', { 'place-content': 'space-around' }],
  ['place-content-evenly', { 'place-content': 'space-evenly' }],
  ['place-content-stretch', { 'place-content': 'stretch' }],
  ['place-items-start', { 'place-items': 'start' }],
  ['place-items-end', { 'place-items': 'end' }],
  ['place-items-center', { 'place-items': 'center' }],
  ['place-items-stretch', { 'place-items': 'stretch' }],
  ['place-self-auto', { 'place-self': 'auto' }],
  ['place-self-start', { 'place-self': 'start' }],
  ['place-self-end', { 'place-self': 'end' }],
  ['place-self-center', { 'place-self': 'center' }],
  ['place-self-stretch', { 'place-self': 'stretch' }],
]
function handleInsetValue(v, { theme: theme3 }) {
  let _a
  return (
    ((_a = theme3.spacing) == null ? void 0 : _a[v]) ??
    handler.bracket.cssvar.auto.fraction.rem(v)
  )
}
function handleInsetValues([, d, v], ctx) {
  const r = handleInsetValue(v, ctx)
  if (r != null && d in insetMap) return insetMap[d].map((i) => [i.slice(1), r])
}
const insets = [
  [
    /^(?:position-|pos-)?inset-(.+)$/,
    ([, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),
    {
      autocomplete: [
        '(position|pos)-inset-<directions>-$spacing',
        '(position|pos)-inset-(block|inline)-$spacing',
        '(position|pos)-inset-(bs|be|is|ie)-$spacing',
        '(position|pos)-(top|left|right|bottom)-$spacing',
      ],
    },
  ],
  [/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues],
  [
    /^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/,
    ([, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) }),
  ],
]
const floats = [
  ['float-left', { float: 'left' }],
  ['float-right', { float: 'right' }],
  ['float-none', { float: 'none' }],
  ['clear-left', { clear: 'left' }],
  ['clear-right', { clear: 'right' }],
  ['clear-both', { clear: 'both' }],
  ['clear-none', { clear: 'none' }],
]
const zIndexes = [
  [/^z([\d.]+)$/, ([, v]) => ({ 'z-index': handler.number(v) })],
  [
    /^z-(.+)$/,
    ([, v]) => ({ 'z-index': handler.bracket.cssvar.auto.number(v) }),
    { autocomplete: 'z-<num>' },
  ],
]
const boxSizing = [
  ['box-border', { 'box-sizing': 'border-box' }],
  ['box-content', { 'box-sizing': 'content-box' }],
]
const varEmpty = 'var(--un-empty,/*!*/ /*!*/)'
const displays = [
  ['inline', { display: 'inline' }],
  ['block', { display: 'block' }],
  ['inline-block', { display: 'inline-block' }],
  ['contents', { display: 'contents' }],
  ['flow-root', { display: 'flow-root' }],
  ['list-item', { display: 'list-item' }],
  ['hidden', { display: 'none' }],
  [/^display-(.+)$/, ([, c]) => ({ display: handler.bracket.cssvar(c) || c })],
]
const appearances = [
  ['visible', { visibility: 'visible' }],
  ['invisible', { visibility: 'hidden' }],
  ['backface-visible', { 'backface-visibility': 'visible' }],
  ['backface-hidden', { 'backface-visibility': 'hidden' }],
]
const cursors = [
  [/^cursor-(.+)$/, ([, c]) => ({ cursor: handler.bracket.cssvar(c) || c })],
]
const pointerEvents = [
  ['pointer-events-auto', { 'pointer-events': 'auto' }],
  ['pointer-events-none', { 'pointer-events': 'none' }],
]
const resizes = [
  ['resize-x', { resize: 'horizontal' }],
  ['resize-y', { resize: 'vertical' }],
  ['resize', { resize: 'both' }],
  ['resize-none', { resize: 'none' }],
]
const userSelects = [
  ['select-auto', { 'user-select': 'auto' }],
  ['select-all', { 'user-select': 'all' }],
  ['select-text', { 'user-select': 'text' }],
  ['select-none', { 'user-select': 'none' }],
]
const whitespaces = [
  [
    /^(?:whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap)$/,
    ([, v]) => ({ 'white-space': v }),
    { autocomplete: '(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap)' },
  ],
]
const contents = [
  [/^content-\[(.+)\]$/, ([, v]) => ({ content: `"${v}"` })],
  ['content-empty', { content: '""' }],
  ['content-none', { content: '""' }],
]
const breaks = [
  ['break-normal', { 'overflow-wrap': 'normal', 'word-break': 'normal' }],
  ['break-words', { 'overflow-wrap': 'break-word' }],
  ['break-all', { 'word-break': 'break-all' }],
]
const textOverflows = [
  [
    'truncate',
    {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
  ],
  ['text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['text-clip', { 'text-overflow': 'clip' }],
]
const textTransforms = [
  ['case-upper', { 'text-transform': 'uppercase' }],
  ['case-lower', { 'text-transform': 'lowercase' }],
  ['case-capital', { 'text-transform': 'capitalize' }],
  ['case-normal', { 'text-transform': 'none' }],
]
const fontStyles = [
  ['italic', { 'font-style': 'italic' }],
  ['not-italic', { 'font-style': 'normal' }],
]
const fontSmoothings = [
  [
    'antialiased',
    {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-smoothing': 'grayscale',
    },
  ],
  [
    'subpixel-antialiased',
    {
      '-webkit-font-smoothing': 'auto',
      '-moz-osx-font-smoothing': 'auto',
      'font-smoothing': 'auto',
    },
  ],
]
const rings = [
  [
    /^ring(?:-(.+))?$/,
    ([, d], { theme: theme3 }) => {
      let _a
      const value =
        ((_a = theme3.ringWidth) == null ? void 0 : _a[d || 'DEFAULT']) ??
        handler.px(d || '1')
      if (value) {
        return [
          {
            [CONTROL_SHORTCUT_NO_MERGE]: '',
            '--un-ring-inset': varEmpty,
            '--un-ring-offset-width': '0px',
            '--un-ring-offset-color': '#fff',
            '--un-ring-width': '0px',
            '--un-ring-color': 'rgba(147,197,253,0.5)',
          },
          {
            '--un-ring-width': value,
            '--un-ring-offset-shadow':
              'var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
            '--un-ring-shadow':
              'var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)',
            'box-shadow':
              'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow, 0 0 #0000)',
          },
        ]
      }
    },
    { autocomplete: 'ring-$ringWidth' },
  ],
  [
    /^ring-(?:width-|size-)(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        '--un-ring-width':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.px(d),
      }
    },
    { autocomplete: 'ring-(width|size)-$lineWidth' },
  ],
  ['ring-offset', { '--un-ring-offset-width': '1px' }],
  [
    /^ring-offset-(?:width-|size-)?(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        '--un-ring-offset-width':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.px(d),
      }
    },
    { autocomplete: 'ring-offset-(width|size)-$lineWidth' },
  ],
  [
    /^ring-(.+)$/,
    colorResolver('--un-ring-color', 'ring'),
    { autocomplete: 'ring-$colors' },
  ],
  [
    /^ring-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-ring-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'ring-(op|opacity)-<percent>' },
  ],
  [
    /^ring-offset-(.+)$/,
    colorResolver('--un-ring-offset-color', 'ring-offset'),
    { autocomplete: 'ring-offset-$colors' },
  ],
  [
    /^ring-offset-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-ring-offset-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'ring-offset-(op|opacity)-<percent>' },
  ],
  ['ring-inset', { '--un-ring-inset': 'inset' }],
]
const boxShadows = [
  [
    /^shadow(?:-(.+))?$/,
    ([, d], { theme: theme3 }) => {
      let _a
      const v = (_a = theme3.boxShadow) == null ? void 0 : _a[d || 'DEFAULT']
      if (v) {
        return [
          {
            [CONTROL_SHORTCUT_NO_MERGE]: '',
            '--un-shadow-inset': varEmpty,
            '--un-shadow': '0 0 #0000',
          },
          {
            '--un-shadow': colorableShadows(v, '--un-shadow-color').join(','),
            'box-shadow':
              'var(--un-ring-offset-shadow, 0 0 #0000), var(--un-ring-shadow, 0 0 #0000), var(--un-shadow)',
          },
        ]
      }
    },
    { autocomplete: 'shadow-$boxShadow' },
  ],
  [
    /^shadow-(.+)$/,
    colorResolver('--un-shadow-color', 'shadow'),
    { autocomplete: 'shadow-$colors' },
  ],
  [
    /^shadow-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-shadow-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'shadow-(op|opacity)-<percent>' },
  ],
  ['shadow-inset', { '--un-shadow-inset': 'inset' }],
]
const sizeMapping = {
  h: 'height',
  w: 'width',
  inline: 'inline-size',
  block: 'block-size',
}
function getPropName(minmax, hw) {
  return `${minmax || ''}${sizeMapping[hw]}`
}
function getSizeValue(minmax, hw, theme3, prop) {
  let _a
  const str = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) =>
    p.toUpperCase(),
  )
  const v = (_a = theme3[str]) == null ? void 0 : _a[prop]
  if (v != null) return v
  switch (prop) {
    case 'fit':
    case 'max':
    case 'min':
      return `${prop}-content`
  }
  return handler.bracket.cssvar.auto.fraction.rem(prop)
}
const sizes = [
  [
    /^(min-|max-)?([wh])-?(.+)$/,
    ([, m, w, s], { theme: theme3 }) => ({
      [getPropName(m, w)]: getSizeValue(m, w, theme3, s),
    }),
    {
      autocomplete: [
        '(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
        '(max|min)-(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
      ],
    },
  ],
  [
    /^(min-|max-)?(block|inline)-(.+)$/,
    ([, m, w, s], { theme: theme3 }) => ({
      [getPropName(m, w)]: getSizeValue(m, w, theme3, s),
    }),
    {
      autocomplete: [
        '(w|h)-(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
        '(max|min)-(w|h)-(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
      ],
    },
  ],
  [
    /^(min-|max-)?(h)-screen-(.+)$/,
    ([, m, w, s], { theme: theme3 }) => {
      let _a
      return {
        [getPropName(m, w)]:
          (_a = theme3.verticalBreakpoints) == null ? void 0 : _a[s],
      }
    },
    {
      autocomplete: [
        'h-screen-$verticalBreakpoints',
        '(min|max)-h-screen-$verticalBreakpoints',
      ],
    },
  ],
  [
    /^(min-|max-)?(w)-screen-(.+)$/,
    ([, m, w, s], { theme: theme3 }) => {
      let _a
      return {
        [getPropName(m, w)]: (_a = theme3.breakpoints) == null ? void 0 : _a[s],
      }
    },
    {
      autocomplete: [
        'w-screen-$breakpoints',
        '(min|max)-w-screen-$breakpoints',
      ],
    },
  ],
]
function getAspectRatio(prop) {
  if (/^\d+\/\d+$/.test(prop)) return prop
  switch (prop) {
    case 'square':
      return '1/1'
    case 'video':
      return '16/9'
  }
  return handler.bracket.cssvar.auto.number(prop)
}
const aspectRatio = [
  [
    /^aspect-(?:ratio-)?(.+)$/,
    ([, d]) => ({ 'aspect-ratio': getAspectRatio(d) }),
    { autocomplete: ['aspect-(square|video)', 'aspect-ratio-(square|video)'] },
  ],
]
const paddings = [
  [
    /^pa?()-?(-?.+)$/,
    directionSize('padding'),
    { autocomplete: ['(m|p)<num>', '(m|p)-<num>'] },
  ],
  [/^p-?([xy])-?(-?.+)$/, directionSize('padding')],
  [
    /^p-?([rltbse])-?(-?.+)$/,
    directionSize('padding'),
    { autocomplete: '(m|p)<directions>-<num>' },
  ],
  [
    /^p-(block|inline)-(-?.+)$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(block|inline)-<num>' },
  ],
  [
    /^p-?([bi][se])-?(-?.+)$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(bs|be|is|ie)-<num>' },
  ],
]
const margins = [
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-?([xy])-?(-?.+)$/, directionSize('margin')],
  [/^m-?([rltbse])-?(-?.+)$/, directionSize('margin')],
  [/^m-(block|inline)-(-?.+)$/, directionSize('margin')],
  [/^m-?([bi][se])-?(-?.+)$/, directionSize('margin')],
]
const transformGpu = {
  '--un-transform': [
    'translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))',
    'rotate(var(--un-rotate))',
    'rotateX(var(--un-rotate-x))',
    'rotateY(var(--un-rotate-y))',
    'rotateZ(var(--un-rotate-z))',
    'skewX(var(--un-skew-x))',
    'skewY(var(--un-skew-y))',
    'scaleX(var(--un-scale-x))',
    'scaleY(var(--un-scale-y))',
    'scaleZ(var(--un-scale-z))',
  ].join(' '),
}
const transformCpu = {
  '--un-transform': [
    'translateX(var(--un-translate-x))',
    'translateY(var(--un-translate-y))',
    'translateZ(var(--un-translate-z))',
    'rotate(var(--un-rotate))',
    'rotateX(var(--un-rotate-x))',
    'rotateY(var(--un-rotate-y))',
    'rotateZ(var(--un-rotate-z))',
    'skewX(var(--un-skew-x))',
    'skewY(var(--un-skew-y))',
    'scaleX(var(--un-scale-x))',
    'scaleY(var(--un-scale-y))',
    'scaleZ(var(--un-scale-z))',
  ].join(' '),
}
const transformBase = {
  '--un-rotate': 0,
  '--un-rotate-x': 0,
  '--un-rotate-y': 0,
  '--un-rotate-z': 0,
  '--un-scale-x': 1,
  '--un-scale-y': 1,
  '--un-scale-z': 1,
  '--un-skew-x': 0,
  '--un-skew-y': 0,
  '--un-translate-x': 0,
  '--un-translate-y': 0,
  '--un-translate-z': 0,
  ...transformCpu,
  [CONTROL_SHORTCUT_NO_MERGE]: '',
}
const transforms = [
  [
    /^(?:transform-)?origin-(.+)$/,
    ([, s]) => ({
      'transform-origin': positionMap[s] ?? handler.bracket.cssvar(s),
    }),
    {
      autocomplete: [
        `transform-origin-(${Object.keys(positionMap).join('|')})`,
        `origin-(${Object.keys(positionMap).join('|')})`,
      ],
    },
  ],
  [
    /^(?:transform-)?perspect(?:ive)?-(.+)$/,
    ([, s]) => {
      const v = handler.bracket.cssvar.px.numberWithUnit(s)
      if (v != null) {
        return {
          '-webkit-perspective': v,
          perspective: v,
        }
      }
    },
  ],
  [
    /^(?:transform-)?perspect(?:ive)?-origin-(.+)$/,
    ([, s]) => {
      const v =
        handler.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : void 0)
      if (v != null) {
        return {
          '-webkit-perspective-origin': v,
          'perspective-origin': v,
        }
      }
    },
  ],
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
  [/^(?:transform-)?skew-([xy])-(.+)$/, handleSkew],
  [/^(?:transform-)?scale-()(.+)$/, handleScale],
  [/^(?:transform-)?scale-([xyz])-(.+)$/, handleScale],
  [
    /^(?:transform-)?preserve-3d$/,
    () => ({ 'transform-style': 'preserve-3d' }),
  ],
  [/^(?:transform-)?preserve-flat$/, () => ({ 'transform-style': 'flat' })],
  [/^transform$/, () => [transformBase, { transform: 'var(--un-transform)' }]],
  ['transform-gpu', transformGpu],
  ['transform-cpu', transformCpu],
  ['transform-none', { transform: 'none' }],
]
function handleTranslate([, d, b], { theme: theme3 }) {
  let _a
  const v =
    ((_a = theme3.spacing) == null ? void 0 : _a[b]) ??
    handler.bracket.cssvar.fraction.rem(b)
  if (v != null) {
    return [
      transformBase,
      [
        ...xyzMap[d].map((i) => [`--un-translate${i}`, v]),
        ['transform', 'var(--un-transform)'],
      ],
    ]
  }
}
function handleScale([, d, b]) {
  const v = handler.bracket.cssvar.fraction.percent(b)
  if (v != null) {
    return [
      transformBase,
      [
        ...xyzMap[d].map((i) => [`--un-scale${i}`, v]),
        ['transform', 'var(--un-transform)'],
      ],
    ]
  }
}
function handleRotate([, d = '', b]) {
  const v = handler.bracket.cssvar.degree(b)
  if (v != null) {
    if (d) {
      return [
        transformBase,
        {
          '--un-rotate': 0,
          [`--un-rotate-${d}`]: v,
          transform: 'var(--un-transform)',
        },
      ]
    } else {
      return [
        transformBase,
        {
          '--un-rotate-x': 0,
          '--un-rotate-y': 0,
          '--un-rotate-z': 0,
          '--un-rotate': v,
          transform: 'var(--un-transform)',
        },
      ]
    }
  }
}
function handleSkew([, d, b]) {
  const v = handler.bracket.cssvar.degree(b)
  if (v != null) {
    return [
      transformBase,
      {
        [`--un-skew-${d}`]: v,
        transform: 'var(--un-transform)',
      },
    ]
  }
}
const variablesAbbrMap = {
  backface: 'backface-visibility',
  break: 'word-break',
  case: 'text-transform',
  content: 'align-content',
  fw: 'font-weight',
  items: 'align-items',
  justify: 'justify-content',
  select: 'user-select',
  self: 'align-self',
  vertical: 'vertical-align',
  visible: 'visibility',
  whitespace: 'white-space',
  ws: 'white-space',
}
const cssVariables = [
  [
    /^(.+?)-(\$.+)$/,
    ([, name42, varname]) => {
      const prop = variablesAbbrMap[name42]
      if (prop) return { [prop]: handler.cssvar(varname) }
    },
  ],
]
const cssProperty = [
  [
    /^\[([^:]+):(.+)\]$/,
    ([, prop, value]) => ({ [prop]: handler.bracket(`[${value}]`) }),
  ],
]
const questionMark = [
  [
    /^(where|\?)$/,
    (_, { constructCSS, generator }) => {
      if (generator.userConfig.envMode === 'dev') {
        return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}}
${constructCSS({ animation: '__un_qm 0.5s ease-in-out alternate infinite' })}`
      }
    },
  ],
]
const textDecorations = [
  [
    /^(?:decoration-)?(underline|overline|line-through)$/,
    ([, s]) => ({ 'text-decoration-line': s }),
    { autocomplete: 'decoration-(underline|overline|line-through)' },
  ],
  [
    /^(?:underline|decoration)-(?:size-)?(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'text-decoration-thickness':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[s]) ??
          handler.bracket.cssvar.px(s),
      }
    },
    { autocomplete: '(underline|decoration)-<num>' },
  ],
  [
    /^(?:underline|decoration)-(auto|from-font)$/,
    ([, s]) => ({ 'text-decoration-thickness': s }),
    { autocomplete: '(underline|decoration)-(auto|from-font)' },
  ],
  [
    /^(?:underline|decoration)-(.+)$/,
    (match, ctx) => {
      const result = colorResolver('text-decoration-color', 'line')(match, ctx)
      if (result) {
        return {
          '-webkit-text-decoration-color': result['text-decoration-color'],
          ...result,
        }
      }
    },
    { autocomplete: '(underline|decoration)-$colors' },
  ],
  [
    /^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-line-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: '(underline|decoration)-(op|opacity)-<percent>' },
  ],
  [
    /^(?:underline|decoration)-offset-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'text-underline-offset':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[s]) ??
          handler.auto.bracket.cssvar.px(s),
      }
    },
    { autocomplete: '(underline|decoration)-(offset)-<num>' },
  ],
  [
    /^(?:underline|decoration)-(solid|double|dotted|dashed|wavy|inherit|initial|revert|unset)$/,
    ([, d]) => ({ 'text-decoration-style': d }),
    {
      autocomplete:
        '(underline|decoration)-(solid|double|dotted|dashed|wavy|inherit|initial|revert|unset)',
    },
  ],
  ['no-underline', { 'text-decoration': 'none' }],
  ['decoration-none', { 'text-decoration': 'none' }],
]
const svgUtilities = [
  [
    /^fill-(.+)$/,
    colorResolver('fill', 'fill'),
    { autocomplete: 'fill-$colors' },
  ],
  [
    /^fill-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-fill-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'fill-(op|opacity)-<percent>' },
  ],
  ['fill-none', { fill: 'none' }],
  [
    /^stroke-(?:width-|size-)?(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'stroke-width':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[s]) ??
          handler.bracket.cssvar.fraction.px.number(s),
      }
    },
    { autocomplete: ['stroke-width-$lineWidth', 'stroke-size-$lineWidth'] },
  ],
  [
    /^stroke-dash-(.+)$/,
    ([, s]) => ({ 'stroke-dasharray': handler.bracket.cssvar.number(s) }),
    { autocomplete: 'stroke-dash-<num>' },
  ],
  [
    /^stroke-offset-(.+)$/,
    ([, s], { theme: theme3 }) => {
      let _a
      return {
        'stroke-dashoffset':
          ((_a = theme3.lineWidth) == null ? void 0 : _a[s]) ??
          handler.bracket.cssvar.px.numberWithUnit(s),
      }
    },
    { autocomplete: 'stroke-offset-$lineWidth' },
  ],
  [
    /^stroke-(.+)$/,
    colorResolver('stroke', 'stroke'),
    { autocomplete: 'stroke-$colors' },
  ],
  [
    /^stroke-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-stroke-opacity': handler.bracket.percent(opacity2),
    }),
    { autocomplete: 'stroke-(op|opacity)-<percent>' },
  ],
  ['stroke-cap-square', { 'stroke-linecap': 'square' }],
  ['stroke-cap-round', { 'stroke-linecap': 'round' }],
  ['stroke-cap-auto', { 'stroke-linecap': 'butt' }],
  ['stroke-join-arcs', { 'stroke-linejoin': 'arcs' }],
  ['stroke-join-bevel', { 'stroke-linejoin': 'bevel' }],
  ['stroke-join-clip', { 'stroke-linejoin': 'miter-clip' }],
  ['stroke-join-round', { 'stroke-linejoin': 'round' }],
  ['stroke-join-auto', { 'stroke-linejoin': 'miter' }],
  ['stroke-none', { stroke: 'none' }],
]
const rules = [
  cssVariables,
  cssProperty,
  paddings,
  margins,
  displays,
  opacity,
  bgColors,
  svgUtilities,
  borders,
  contents,
  fonts,
  tabSizes,
  textIndents,
  textOverflows,
  textDecorations,
  textStrokes,
  textShadows,
  textTransforms,
  textAligns,
  textColors,
  fontStyles,
  fontSmoothings,
  boxShadows,
  rings,
  flex,
  grids,
  gaps,
  positions,
  sizes,
  aspectRatio,
  cursors,
  appearances,
  pointerEvents,
  resizes,
  verticalAligns,
  userSelects,
  whitespaces,
  breaks,
  overflows,
  outline,
  appearance,
  positions,
  orders,
  justifies,
  alignments,
  placements,
  insets,
  floats,
  zIndexes,
  boxSizing,
  transitions,
  transforms,
  willChange,
  questionMark,
].flat(1)

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/variants.mjs
const variantMatcher = (name42, selector2) => {
  const re = new RegExp(`^${escapeRegExp(name42)}[:-]`)
  return {
    match: (input) => {
      const match = input.match(re)
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          selector: selector2,
        }
      }
    },
    autocomplete: `${name42}:`,
  }
}
const variantParentMatcher = (name42, parent) => {
  const re = new RegExp(`^${escapeRegExp(name42)}[:-]`)
  return {
    match: (input) => {
      const match = input.match(re)
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          parent,
        }
      }
    },
    autocomplete: `${name42}:`,
  }
}

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/chunks/default3.mjs
const regexCache = {}
const calcMaxWidthBySize = (size) => {
  let _a
  const value =
    ((_a = size.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : _a[0]) || ''
  const unit = size.slice(value.length)
  const maxWidth2 = parseFloat(value) - 0.1
  return Number.isNaN(maxWidth2) ? size : `${maxWidth2}${unit}`
}
const variantBreakpoints = {
  match(matcher, { theme: theme3 }) {
    const variantEntries = Object.entries(theme3.breakpoints || {}).map(
      ([point, size], idx) => [point, size, idx],
    )
    for (const [point, size, idx] of variantEntries) {
      if (!regexCache[point])
        regexCache[point] = new RegExp(`^((?:[al]t-)?${point}[:-])`)
      const match = matcher.match(regexCache[point])
      if (!match) continue
      const [, pre] = match
      const m = matcher.slice(pre.length)
      if (m === 'container') continue
      const isLtPrefix = pre.startsWith('lt-')
      const isAtPrefix = pre.startsWith('at-')
      let order = 1e3
      if (isLtPrefix) {
        order -= idx + 1
        return {
          matcher: m,
          parent: [`@media (max-width: ${calcMaxWidthBySize(size)})`, order],
        }
      }
      order += idx + 1
      if (isAtPrefix && idx < variantEntries.length - 1) {
        return {
          matcher: m,
          parent: [
            `@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(
              variantEntries[idx + 1][1],
            )})`,
            order,
          ],
        }
      }
      return {
        matcher: m,
        parent: [`@media (min-width: ${size})`, order],
      }
    }
  },
  autocomplete: '(at-|lt-|)$breakpoints:',
}
const scopeMatcher = (strict, name42, template) => {
  const re = strict
    ? new RegExp(`^${name42}(?:-\\[(.+?)\\])[:-]`)
    : new RegExp(`^${name42}(?:-\\[(.+?)\\])?[:-]`)
  return (matcher) => {
    const match = matcher.match(re)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: (s) =>
          template.replace('&&-s', s).replace('&&-c', match[1] ?? '*'),
      }
    }
  }
}
const variantCombinators = [
  scopeMatcher(false, 'all', '&&-s &&-c'),
  scopeMatcher(false, 'children', '&&-s>&&-c'),
  scopeMatcher(false, 'next', '&&-s+&&-c'),
  scopeMatcher(false, 'sibling', '&&-s+&&-c'),
  scopeMatcher(false, 'siblings', '&&-s~&&-c'),
  scopeMatcher(true, 'group', '&&-c &&-s'),
  scopeMatcher(true, 'parent', '&&-c>&&-s'),
  scopeMatcher(true, 'previous', '&&-c+&&-s'),
  scopeMatcher(true, 'peer', '&&-c~&&-s'),
]
const variantPrint = variantParentMatcher('print', '@media print')
const variantCustomMedia = (matcher, { theme: theme3 }) => {
  let _a
  const match = matcher.match(/^media-([_\d\w]+)[:-]/)
  if (match) {
    const media =
      ((_a = theme3.media) == null ? void 0 : _a[match[1]]) ?? `(--${match[1]})`
    return {
      matcher: matcher.slice(match[0].length),
      parent: `@media ${media}`,
    }
  }
}
const variantColorsMediaOrClass = (options = {}) => {
  if ((options == null ? void 0 : options.dark) === 'class') {
    return [
      variantMatcher('dark', (input) => `.dark $$ ${input}`),
      variantMatcher('light', (input) => `.light $$ ${input}`),
    ]
  }
  return [
    variantParentMatcher('dark', '@media (prefers-color-scheme: dark)'),
    variantParentMatcher('light', '@media (prefers-color-scheme: light)'),
  ]
}
const variantLanguageDirections = [
  variantMatcher('rtl', (input) => `[dir="rtl"] $$ ${input}`),
  variantMatcher('ltr', (input) => `[dir="ltr"] $$ ${input}`),
]
const variantSelector = {
  match(matcher) {
    const match = matcher.match(/^selector-\[(.+?)\][:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: () => match[1],
      }
    }
  },
}
const variantLayer = {
  match(matcher) {
    const match = matcher.match(/^layer-([_\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        layer: match[1],
      }
    }
  },
}
const variantScope = {
  match(matcher) {
    const match = matcher.match(/^scope-([_\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: (s) => `.${match[1]} $$ ${s}`,
      }
    }
  },
}
const variantImportant = {
  match(matcher) {
    if (matcher.startsWith('!')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            if (v[1]) v[1] += ' !important'
          })
          return body
        },
      }
    }
  },
}
const variantNegative = {
  match(matcher) {
    if (matcher.startsWith('-')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            let _a, _b
            if (
              v[0].startsWith('--un-scale') ||
              ((_a = v[1]) == null ? void 0 : _a.toString()) === '0'
            )
              return
            v[1] =
              (_b = v[1]) == null
                ? void 0
                : _b.toString().replace(/[0-9.]+(?:[a-z]+|%)?/, (i) => `-${i}`)
          })
          return body
        },
      }
    }
  },
}
const PseudoClasses = Object.fromEntries(
  [
    'any-link',
    'link',
    'visited',
    'target',
    ['open', '[open]'],
    'hover',
    'active',
    'focus-visible',
    'focus-within',
    'focus',
    'autofill',
    'enabled',
    'disabled',
    'read-only',
    'read-write',
    'placeholder-shown',
    'default',
    'checked',
    'indeterminate',
    'valid',
    'invalid',
    'in-range',
    'out-of-range',
    'required',
    'optional',
    'root',
    'empty',
    ['even-of-type', ':nth-of-type(even)'],
    ['even', ':nth-child(even)'],
    ['odd-of-type', ':nth-of-type(odd)'],
    ['odd', ':nth-child(odd)'],
    'first-of-type',
    ['first', ':first-child'],
    'last-of-type',
    ['last', ':last-child'],
    'only-child',
    'only-of-type',
  ].map(toArray),
)
const PseudoElements = Object.fromEntries(
  [
    'placeholder',
    'before',
    'after',
    'first-letter',
    'first-line',
    'selection',
    'marker',
    ['file', '::file-selector-button'],
  ].map(toArray),
)
const PseudoClassFunctions = ['not', 'is', 'where', 'has']
const PseudoElementsStr = Object.keys(PseudoElements).join('|')
const PseudoClassesStr = Object.keys(PseudoClasses).join('|')
const PseudoClassFunctionsStr = PseudoClassFunctions.join('|')
const PartClassesRE = /(part-\[(.+)]:)(.+)/
const PseudoElementsRE = new RegExp(`^(${PseudoElementsStr})[:-]`)
const PseudoClassesRE = new RegExp(`^(${PseudoClassesStr})[:-]`)
const PseudoClassFunctionsRE = new RegExp(
  `^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})[:-]`,
)
const sortValue = (pseudo) => {
  if (pseudo === 'active') return 1
}
const taggedPseudoClassMatcher = (tag, parent, combinator) => {
  const re = new RegExp(
    `^${tag}-((?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))[:-]`,
  )
  const rawRe = new RegExp(`^${escapeRegExp(parent)}:`)
  return (input) => {
    const match = input.match(re)
    if (match) {
      let pseudo = PseudoClasses[match[3]] || `:${match[3]}`
      if (match[2]) pseudo = `:${match[2]}(${pseudo})`
      return {
        matcher: input.slice(match[0].length),
        selector: (s) =>
          rawRe.test(s)
            ? s.replace(rawRe, `${parent}${pseudo}:`)
            : `${parent}${pseudo}${combinator}${s}`,
        sort: sortValue(match[3]),
      }
    }
  }
}
const variantPseudoElements = {
  match: (input) => {
    const match = input.match(PseudoElementsRE)
    if (match) {
      const pseudo = PseudoElements[match[1]] || `::${match[1]}`
      return {
        matcher: input.slice(match[0].length),
        selector: (s) => `${s}${pseudo}`,
      }
    }
  },
  autocomplete: `(${PseudoElementsStr}):`,
}
const variantPseudoClasses = {
  match: (input) => {
    const match = input.match(PseudoClassesRE)
    if (match) {
      const pseudo = PseudoClasses[match[1]] || `:${match[1]}`
      return {
        matcher: input.slice(match[0].length),
        selector: (s) => `${s}${pseudo}`,
        sort: sortValue(match[1]),
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassesStr}):`,
}
const variantPseudoClassFunctions = {
  match: (input) => {
    const match = input.match(PseudoClassFunctionsRE)
    if (match) {
      const fn = match[1]
      const pseudo = PseudoClasses[match[2]] || `:${match[2]}`
      return {
        matcher: input.slice(match[0].length),
        selector: (s) => `${s}:${fn}(${pseudo})`,
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}):`,
}
const variantTaggedPseudoClasses = (options = {}) => {
  const attributify = !!(options == null ? void 0 : options.attributifyPseudo)
  return [
    {
      match: taggedPseudoClassMatcher(
        'group',
        attributify ? '[group=""]' : '.group',
        ' ',
      ),
      multiPass: true,
    },
    {
      match: taggedPseudoClassMatcher(
        'peer',
        attributify ? '[peer=""]' : '.peer',
        '~',
      ),
      multiPass: true,
    },
    {
      match: taggedPseudoClassMatcher(
        'parent',
        attributify ? '[parent=""]' : '.parent',
        '>',
      ),
      multiPass: true,
    },
    {
      match: taggedPseudoClassMatcher(
        'previous',
        attributify ? '[previous=""]' : '.previous',
        '+',
      ),
      multiPass: true,
    },
  ]
}
const partClasses = {
  match: (input) => {
    const match = input.match(PartClassesRE)
    if (match) {
      const part = `part(${match[2]})`
      return {
        matcher: input.slice(match[1].length),
        selector: (s) => `${s}::${part}`,
      }
    }
  },
  multiPass: true,
}
const variants = (options) => [
  variantSelector,
  variantLayer,
  variantNegative,
  variantImportant,
  variantPrint,
  variantCustomMedia,
  variantBreakpoints,
  ...variantCombinators,
  variantPseudoClasses,
  variantPseudoClassFunctions,
  ...variantTaggedPseudoClasses(options),
  variantPseudoElements,
  partClasses,
  ...variantColorsMediaOrClass(options),
  ...variantLanguageDirections,
  variantScope,
]

// node_modules/.pnpm/@unocss+preset-mini@0.29.6/node_modules/@unocss/preset-mini/dist/index.mjs
const autocomplete = []
const presetMini = (options = {}) => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false
  return {
    name: '@unocss/preset-mini',
    theme,
    rules,
    variants: variants(options),
    options,
    autocomplete,
    postprocess:
      options.variablePrefix && options.variablePrefix !== 'un-'
        ? VarPrefixPostprocessor(options.variablePrefix)
        : void 0,
  }
}
function VarPrefixPostprocessor(prefix) {
  return (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
      if (typeof i[1] === 'string')
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
    })
  }
}

// node_modules/.pnpm/@unocss+preset-wind@0.29.6/node_modules/@unocss/preset-wind/dist/index.mjs
const animations = [
  [
    /^(?:animate-)?keyframes-(.+)$/,
    ([, name42], { theme: theme3, constructCSS }) => {
      let _a, _b
      const kf =
        (_b = (_a = theme3.animation) == null ? void 0 : _a.keyframes) == null
          ? void 0
          : _b[name42]
      if (kf) {
        return `@keyframes ${name42}${kf}
${constructCSS({ animation: `${name42}` })}`
      }
    },
  ],
  [
    /^animate-(.+)$/,
    ([, name42], { theme: theme3, constructCSS }) => {
      let _a, _b, _c, _d, _e, _f, _g, _h
      const kf =
        (_b = (_a = theme3.animation) == null ? void 0 : _a.keyframes) == null
          ? void 0
          : _b[name42]
      if (kf) {
        const duration2 =
          ((_d = (_c = theme3.animation) == null ? void 0 : _c.durations) ==
          null
            ? void 0
            : _d[name42]) ?? '1s'
        const timing =
          ((_f = (_e = theme3.animation) == null ? void 0 : _e.timingFns) ==
          null
            ? void 0
            : _f[name42]) ?? 'linear'
        const props =
          (_h = (_g = theme3.animation) == null ? void 0 : _g.properties) ==
          null
            ? void 0
            : _h[name42]
        return `@keyframes ${name42}${kf}
${constructCSS(
  Object.assign(
    { animation: `${name42} ${duration2} ${timing} infinite` },
    props,
  ),
)}`
      }
      return { animation: handler.bracket.cssvar(name42) }
    },
  ],
  [
    /^animate-name-(.+)/,
    ([, d]) => ({ 'animation-name': handler.bracket.cssvar(d) ?? d }),
  ],
  [
    /^animate-duration-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'animation-duration':
          ((_a = theme3.duration) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar.time(d),
      }
    },
  ],
  [
    /^animate-delay-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'animation-delay':
          ((_a = theme3.duration) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar.time(d),
      }
    },
  ],
  [
    /^animate-ease(?:-(.+))?$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'animation-timing-function':
          ((_a = theme3.easing) == null ? void 0 : _a[d || 'DEFAULT']) ??
          handler.bracket.cssvar(d),
      }
    },
  ],
  [
    /^animate-(?:fill-|mode-|fill-mode-)?(none|forwards|backwards|both|inherit|initial|revert|unset)$/,
    ([, d]) => ({ 'animation-fill-mode': d }),
  ],
  [
    /^animate-(?:direction-)?(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|unset)$/,
    ([, d]) => ({ 'animation-direction': d }),
  ],
  [
    /^animate-(?:iteration-|count-|iteration-count-)(.+)$/,
    ([, d]) => ({
      'animation-iteration-count':
        handler.bracket.cssvar(d) ?? d.replace(/\-/g, ','),
    }),
  ],
  [
    /^animate-(?:play-|state-|play-state-)?(paused|running|inherit|initial|revert|unset)$/,
    ([, d]) => ({ 'animation-play-state': d }),
  ],
  ['animate-none', { animation: 'none' }],
]
const bgGradientColorResolver =
  (mode) =>
  ([, body], { theme: theme3 }) => {
    const data = parseColor(body, theme3)
    if (!data) return
    const { alpha, color, cssColor } = data
    if (!color) return
    let colorString = color
    if (cssColor) {
      if (alpha != null) colorString = colorToString(cssColor, alpha)
      else
        colorString = colorToString(
          cssColor,
          `var(--un-${mode}-opacity, ${cssColor.alpha ?? 1})`,
        )
    }
    switch (mode) {
      case 'from':
        return {
          '--un-gradient-from': colorString,
          '--un-gradient-stops':
            'var(--un-gradient-from), var(--un-gradient-to, rgba(255, 255, 255, 0))',
        }
      case 'via':
        return {
          '--un-gradient-stops': `var(--un-gradient-from), ${colorString}, var(--un-gradient-to, rgba(255, 255, 255, 0))`,
        }
      case 'to':
        return {
          '--un-gradient-to': colorString,
        }
    }
  }
const backgroundStyles = [
  [/^bg-gradient-(.+)$/, ([, d]) => ({ '--un-gradient': handler.bracket(d) })],
  [
    /^(?:bg-gradient-)?stops-(\[.+\])$/,
    ([, s]) => ({ '--un-gradient-stops': handler.bracket(s) }),
  ],
  [/^(?:bg-gradient-)?from-(.+)$/, bgGradientColorResolver('from')],
  [/^(?:bg-gradient-)?to-(.+)$/, bgGradientColorResolver('to')],
  [/^(?:bg-gradient-)?via-(.+)$/, bgGradientColorResolver('via')],
  [
    /^(?:bg-gradient-)?from-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-from-opacity': handler.bracket.percent(opacity2),
    }),
  ],
  [
    /^(?:bg-gradient-)?to-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-to-opacity': handler.bracket.percent(opacity2),
    }),
  ],
  [
    /^(?:bg-gradient-)?via-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-via-opacity': handler.bracket.percent(opacity2),
    }),
  ],
  [
    /^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/,
    ([, s]) => ({
      'background-image': `${s}-gradient(var(--un-gradient, var(--un-gradient-stops, rgba(255, 255, 255, 0))))`,
    }),
  ],
  [
    /^bg-gradient-to-([rltb]{1,2})$/,
    ([, d]) => {
      if (d in positionMap) {
        return {
          '--un-gradient-shape': `to ${positionMap[d]}`,
          '--un-gradient': 'var(--un-gradient-shape), var(--un-gradient-stops)',
          'background-image': 'linear-gradient(var(--un-gradient))',
        }
      }
    },
  ],
  [
    /^(?:bg-gradient-)?shape-(.+)$/,
    ([, d]) => {
      const v = d in positionMap ? `to ${positionMap[d]}` : handler.bracket(d)
      if (v != null) {
        return {
          '--un-gradient-shape': v,
          '--un-gradient': 'var(--un-gradient-shape), var(--un-gradient-stops)',
        }
      }
    },
  ],
  ['bg-none', { 'background-image': 'none' }],
  ['box-decoration-slice', { 'box-decoration-break': 'slice' }],
  ['box-decoration-clone', { 'box-decoration-break': 'clone' }],
  ['bg-auto', { 'background-size': 'auto' }],
  ['bg-cover', { 'background-size': 'cover' }],
  ['bg-contain', { 'background-size': 'contain' }],
  ['bg-fixed', { 'background-attachment': 'fixed' }],
  ['bg-local', { 'background-attachment': 'local' }],
  ['bg-scroll', { 'background-attachment': 'scroll' }],
  [
    'bg-clip-border',
    {
      '-webkit-background-clip': 'border-box',
      'background-attachment': 'border-box',
    },
  ],
  [
    'bg-clip-content',
    {
      '-webkit-background-clip': 'content-box',
      'background-attachment': 'content-box',
    },
  ],
  [
    'bg-clip-padding',
    {
      '-webkit-background-clip': 'padding-box',
      'background-attachment': 'padding-box',
    },
  ],
  [
    'bg-clip-text',
    { '-webkit-background-clip': 'text', 'background-attachment': 'text' },
  ],
  [/^bg-([-\w]{3,})$/, ([, s]) => ({ 'background-position': positionMap[s] })],
  ['bg-repeat', { 'background-repeat': 'repeat' }],
  ['bg-no-repeat', { 'background-repeat': 'no-repeat' }],
  ['bg-repeat-x', { 'background-position': 'repeat-x' }],
  ['bg-repeat-y', { 'background-position': 'repeat-y' }],
  ['bg-repeat-round', { 'background-position': 'round' }],
  ['bg-repeat-space', { 'background-position': 'space' }],
  ['bg-origin-border', { 'background-origin': 'border-box' }],
  ['bg-origin-padding', { 'background-origin': 'padding-box' }],
  ['bg-origin-content', { 'background-origin': 'content-box' }],
]
const listStyle = [
  [
    /^list-(disc|circle|square|decimal|zero-decimal|greek|roman|upper-roman|alpha|upper-alpha)(?:-(outside|inside))?$/,
    ([, style, position]) => {
      if (position != null) {
        return {
          'list-style-position': position,
          'list-style-type': style,
        }
      }
      return { 'list-style-type': style }
    },
  ],
  ['list-outside', { 'list-style-position': 'outside' }],
  ['list-inside', { 'list-style-position': 'inside' }],
  ['list-none', { 'list-style-type': 'none' }],
]
const accents = [
  [/^accent-(.+)$/, colorResolver('accent-color', 'accent')],
  [
    /^accent-op(?:acity)?-?(.+)$/,
    ([, d]) => ({ '--un-accent-opacity': handler.bracket.percent(d) }),
  ],
]
const carets = [
  [/^caret-(.+)$/, colorResolver('caret-color', 'caret')],
  [
    /^caret-op(?:acity)?-?(.+)$/,
    ([, d]) => ({ '--un-caret-opacity': handler.bracket.percent(d) }),
  ],
]
const imageRenderings = [
  ['image-render-auto', { 'image-rendering': 'auto' }],
  ['image-render-edge', { 'image-rendering': 'crisp-edges' }],
  [
    'image-render-pixel',
    [
      ['-ms-interpolation-mode', 'nearest-neighbor'],
      ['image-rendering', '-webkit-optimize-contrast'],
      ['image-rendering', '-moz-crisp-edges'],
      ['image-rendering', '-o-pixelated'],
      ['image-rendering', 'pixelated'],
    ],
  ],
]
const overscrolls = [
  ['overscroll-auto', { 'overscroll-behavior': 'auto' }],
  ['overscroll-contain', { 'overscroll-behavior': 'contain' }],
  ['overscroll-none', { 'overscroll-behavior': 'none' }],
  ['overscroll-x-auto', { 'overscroll-behavior-x': 'auto' }],
  ['overscroll-x-contain', { 'overscroll-behavior-x': 'contain' }],
  ['overscroll-x-none', { 'overscroll-behavior-x': 'none' }],
  ['overscroll-y-auto', { 'overscroll-behavior-y': 'auto' }],
  ['overscroll-y-contain', { 'overscroll-behavior-y': 'contain' }],
  ['overscroll-y-none', { 'overscroll-behavior-y': 'none' }],
]
const scrollBehaviors = [
  ['scroll-auto', { 'scroll-behavior': 'auto' }],
  ['scroll-smooth', { 'scroll-behavior': 'smooth' }],
]
const columns = [
  [
    /^columns-(.+)$/,
    ([, v]) => ({
      columns: handler.bracket.global.number.auto.numberWithUnit(v),
    }),
  ],
  ['break-before-auto', { 'break-before': 'auto' }],
  ['break-before-avoid', { 'break-before': 'avoid' }],
  ['break-before-all', { 'break-before': 'all' }],
  ['break-before-avoid-page', { 'break-before': 'avoid-page' }],
  ['break-before-page', { 'break-before': 'page' }],
  ['break-before-left', { 'break-before': 'left' }],
  ['break-before-right', { 'break-before': 'right' }],
  ['break-before-column', { 'break-before': 'column' }],
  ['break-inside-auto', { 'break-inside': 'auto' }],
  ['break-inside-avoid', { 'break-inside': 'avoid' }],
  ['break-inside-avoid-page', { 'break-inside': 'avoid-page' }],
  ['break-inside-avoid-column', { 'break-inside': 'avoid-column' }],
  ['break-after-auto', { 'break-after': 'auto' }],
  ['break-after-avoid', { 'break-after': 'avoid' }],
  ['break-after-all', { 'break-after': 'all' }],
  ['break-after-avoid-page', { 'break-after': 'avoid-page' }],
  ['break-after-page', { 'break-after': 'page' }],
  ['break-after-left', { 'break-after': 'left' }],
  ['break-after-right', { 'break-after': 'right' }],
  ['break-after-column', { 'break-after': 'column' }],
]
const queryMatcher = /@media \(min-width: (.+)\)/
const container = [
  [
    /^__container$/,
    (m, { variantHandlers }) => {
      let _a
      let width2 = '100%'
      for (const v of variantHandlers) {
        const query = toArray(v.parent || [])[0]
        if (typeof query === 'string') {
          const match =
            (_a = query.match(queryMatcher)) == null ? void 0 : _a[1]
          if (match) width2 = match
        }
      }
      return { 'max-width': width2 }
    },
    { internal: true },
  ],
]
const containerShortcuts = [
  [
    /^(?:(\w+)[:-])?container$/,
    ([, bp], { theme: theme3 }) => {
      let points = Object.keys(theme3.breakpoints || {})
      if (bp) {
        if (!points.includes(bp)) return
        points = points.slice(points.indexOf(bp))
      }
      const shortcuts2 = points.map((p) => `${p}:__container`)
      if (!bp) shortcuts2.unshift('__container')
      return shortcuts2
    },
  ],
]
const filterBase = {
  '--un-blur': varEmpty,
  '--un-brightness': varEmpty,
  '--un-contrast': varEmpty,
  '--un-drop-shadow': varEmpty,
  '--un-grayscale': varEmpty,
  '--un-hue-rotate': varEmpty,
  '--un-invert': varEmpty,
  '--un-saturate': varEmpty,
  '--un-sepia': varEmpty,
  '--un-filter':
    'var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)',
  [CONTROL_SHORTCUT_NO_MERGE]: '',
}
const backdropFilterBase = {
  '--un-backdrop-blur': varEmpty,
  '--un-backdrop-brightness': varEmpty,
  '--un-backdrop-contrast': varEmpty,
  '--un-backdrop-grayscale': varEmpty,
  '--un-backdrop-hue-rotate': varEmpty,
  '--un-backdrop-invert': varEmpty,
  '--un-backdrop-opacity': varEmpty,
  '--un-backdrop-saturate': varEmpty,
  '--un-backdrop-sepia': varEmpty,
  '--un-backdrop-filter':
    'var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)',
  [CONTROL_SHORTCUT_NO_MERGE]: '',
}
const percentWithDefault = (str) => {
  let v = handler.bracket.cssvar(str || '')
  if (v != null) return v
  v = str ? handler.percent(str) : '1'
  if (v != null && parseFloat(v) <= 1) return v
}
const toFilter =
  (varName, resolver) =>
  ([, b, s], { theme: theme3 }) => {
    const value = resolver(s, theme3) ?? (s === 'none' ? '0' : '')
    if (value !== '') {
      if (b) {
        return [
          backdropFilterBase,
          {
            [`--un-${b}${varName}`]: `${varName}(${value})`,
            '-webkit-backdrop-filter': 'var(--un-backdrop-filter)',
            'backdrop-filter': 'var(--un-backdrop-filter)',
          },
        ]
      } else {
        return [
          filterBase,
          {
            [`--un-${varName}`]: `${varName}(${value})`,
            filter: 'var(--un-filter)',
          },
        ]
      }
    }
  }
const dropShadowResolver = ([, s], { theme: theme3 }) => {
  let _a
  let v = (_a = theme3.dropShadow) == null ? void 0 : _a[s || 'DEFAULT']
  if (v != null) {
    const shadows = colorableShadows(v, '--un-drop-shadow-color')
    return [
      filterBase,
      {
        '--un-drop-shadow': `drop-shadow(${shadows.join(') drop-shadow(')})`,
        filter: 'var(--un-filter)',
      },
    ]
  }
  v = handler.bracket.cssvar(s)
  if (v != null) {
    return [
      filterBase,
      {
        '--un-drop-shadow': `drop-shadow(${v})`,
        filter: 'var(--un-filter)',
      },
    ]
  }
}
const filters = [
  [
    /^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
    toFilter('blur', (s, theme3) => {
      let _a
      return (
        ((_a = theme3.blur) == null ? void 0 : _a[s || 'DEFAULT']) ||
        handler.bracket.cssvar.px(s)
      )
    }),
  ],
  [
    /^(?:(backdrop-)|filter-)?brightness-(.+)$/,
    toFilter('brightness', (s) => handler.bracket.cssvar.percent(s)),
  ],
  [
    /^(?:(backdrop-)|filter-)?contrast-(.+)$/,
    toFilter('contrast', (s) => handler.bracket.cssvar.percent(s)),
  ],
  [/^(?:filter-)?drop-shadow(?:-(.+))?$/, dropShadowResolver],
  [
    /^(?:filter-)?drop-shadow-color-(.+)$/,
    colorResolver('--un-drop-shadow-color', 'drop-shadow'),
  ],
  [
    /^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-drop-shadow-opacity': handler.bracket.percent(opacity2),
    }),
  ],
  [
    /^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/,
    toFilter('grayscale', percentWithDefault),
  ],
  [
    /^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/,
    toFilter('hue-rotate', (s) => handler.bracket.cssvar.degree(s)),
  ],
  [
    /^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/,
    toFilter('invert', percentWithDefault),
  ],
  [
    /^(backdrop-)opacity-(.+)$/,
    toFilter('opacity', (s) => handler.bracket.cssvar.percent(s)),
  ],
  [
    /^(?:(backdrop-)|filter-)?saturate-(.+)$/,
    toFilter('saturate', (s) => handler.bracket.cssvar.percent(s)),
  ],
  [
    /^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/,
    toFilter('sepia', percentWithDefault),
  ],
  [/^filter$/, () => [filterBase, { filter: 'var(--un-filter)' }]],
  [
    /^backdrop-filter$/,
    () => [
      backdropFilterBase,
      {
        '-webkit-backdrop-filter': 'var(--un-backdrop-filter)',
        'backdrop-filter': 'var(--un-backdrop-filter)',
      },
    ],
  ],
  ['filter-none', { filter: 'none' }],
  [
    'backdrop-filter-none',
    {
      '-webkit-backdrop-filter': 'none',
      'backdrop-filter': 'none',
    },
  ],
]
const spaces = [
  [/^space-?([xy])-?(-?.+)$/, handlerSpace],
  [/^space-?([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-(-?.+)$/, handlerSpace],
  [
    /^space-(block|inline)-reverse$/,
    ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 }),
  ],
]
function handlerSpace([, d, s], { theme: theme3 }) {
  let _a
  const v =
    ((_a = theme3.spacing) == null ? void 0 : _a[s || 'DEFAULT']) ??
    handler.bracket.cssvar.auto.fraction.rem(s || '1')
  if (v != null) {
    const results = directionMap[d].map((item) => {
      const key = `margin${item}`
      const value =
        item.endsWith('right') || item.endsWith('bottom')
          ? `calc(${v} * var(--un-space-${d}-reverse))`
          : `calc(${v} * calc(1 - var(--un-space-${d}-reverse)))`
      return [key, value]
    })
    if (results) {
      return [[`--un-space-${d}-reverse`, 0], ...results]
    }
  }
}
const textTransforms2 = [
  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['normal-case', { 'text-transform': 'none' }],
]
const hyphens = [
  [
    'hyphens-manual',
    {
      '-webkit-hyphens': 'manual',
      '-ms-hyphens': 'manual',
      hyphens: 'manual',
    },
  ],
  [
    'hyphens-auto',
    {
      '-webkit-hyphens': 'auto',
      '-ms-hyphens': 'auto',
      hyphens: 'auto',
    },
  ],
  [
    'hyphens-none',
    {
      '-webkit-hyphens': 'none',
      '-ms-hyphens': 'none',
      hyphens: 'none',
    },
  ],
]
const writingModes = [
  ['write-vertical-right', { 'writing-mode': 'vertical-rl' }],
  ['write-vertical-left', { 'writing-mode': 'vertical-lr' }],
  ['write-normal', { 'writing-mode': 'horizontal-tb' }],
]
const writingOrientations = [
  ['write-orient-mixed', { 'text-orientation': 'mixed' }],
  ['write-orient-sideways', { 'text-orientation': 'sideways' }],
  ['write-orient-upright', { 'text-orientation': 'upright' }],
]
const screenReadersAccess = [
  [
    'sr-only',
    {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      'white-space': 'nowrap',
      'border-width': 0,
    },
  ],
  [
    'not-sr-only',
    {
      position: 'static',
      width: 'auto',
      height: 'auto',
      padding: '0',
      margin: '0',
      overflow: 'visible',
      clip: 'auto',
      'white-space': 'normal',
    },
  ],
]
const contents2 = [
  [
    /^content-(.+)$/,
    ([, v]) => {
      const c = handler.bracket.cssvar(v)
      if (c != null) return { content: c }
      return { content: `"${v}"` }
    },
  ],
  ['content-empty', { content: '""' }],
  ['content-none', { content: '""' }],
]
const isolations = [
  ['isolate', { isolation: 'isolate' }],
  ['isolate-auto', { isolation: 'auto' }],
  ['isolation-auto', { isolation: 'auto' }],
]
const objectPositions = [
  ['object-cover', { 'object-fit': 'cover' }],
  ['object-contain', { 'object-fit': 'contain' }],
  ['object-fill', { 'object-fit': 'fill' }],
  ['object-scale-down', { 'object-fit': 'scale-down' }],
  ['object-none', { 'object-fit': 'none' }],
  [/^object-([-\w]+)$/, ([, s]) => ({ 'object-position': positionMap[s] })],
]
const backgroundBlendModes = [
  ['bg-blend-multiply', { 'background-blend-mode': 'multiply' }],
  ['bg-blend-screen', { 'background-blend-mode': 'screen' }],
  ['bg-blend-overlay', { 'background-blend-mode': 'overlay' }],
  ['bg-blend-darken', { 'background-blend-mode': 'darken' }],
  ['bg-blend-lighten', { 'background-blend-mode': 'lighten' }],
  ['bg-blend-color-dodge', { 'background-blend-mode': 'color-dodge' }],
  ['bg-blend-color-burn', { 'background-blend-mode': 'color-burn' }],
  ['bg-blend-hard-light', { 'background-blend-mode': 'hard-light' }],
  ['bg-blend-soft-light', { 'background-blend-mode': 'soft-light' }],
  ['bg-blend-difference', { 'background-blend-mode': 'difference' }],
  ['bg-blend-exclusion', { 'background-blend-mode': 'exclusion' }],
  ['bg-blend-hue', { 'background-blend-mode': 'hue' }],
  ['bg-blend-saturation', { 'background-blend-mode': 'saturation' }],
  ['bg-blend-color', { 'background-blend-mode': 'color' }],
  ['bg-blend-luminosity', { 'background-blend-mode': 'luminosity' }],
  ['bg-blend-normal', { 'background-blend-mode': 'normal' }],
]
const mixBlendModes = [
  ['mix-blend-multiply', { 'mix-blend-mode': 'multiply' }],
  ['mix-blend-screen', { 'mix-blend-mode': 'screen' }],
  ['mix-blend-overlay', { 'mix-blend-mode': 'overlay' }],
  ['mix-blend-darken', { 'mix-blend-mode': 'darken' }],
  ['mix-blend-lighten', { 'mix-blend-mode': 'lighten' }],
  ['mix-blend-color-dodge', { 'mix-blend-mode': 'color-dodge' }],
  ['mix-blend-color-burn', { 'mix-blend-mode': 'color-burn' }],
  ['mix-blend-hard-light', { 'mix-blend-mode': 'hard-light' }],
  ['mix-blend-soft-light', { 'mix-blend-mode': 'soft-light' }],
  ['mix-blend-difference', { 'mix-blend-mode': 'difference' }],
  ['mix-blend-exclusion', { 'mix-blend-mode': 'exclusion' }],
  ['mix-blend-hue', { 'mix-blend-mode': 'hue' }],
  ['mix-blend-saturation', { 'mix-blend-mode': 'saturation' }],
  ['mix-blend-color', { 'mix-blend-mode': 'color' }],
  ['mix-blend-luminosity', { 'mix-blend-mode': 'luminosity' }],
  ['mix-blend-normal', { 'mix-blend-mode': 'normal' }],
]
const tables = [
  ['inline-table', { display: 'inline-table' }],
  ['table', { display: 'table' }],
  ['table-caption', { display: 'table-caption' }],
  ['table-cell', { display: 'table-cell' }],
  ['table-column', { display: 'table-column' }],
  ['table-column-group', { display: 'table-column-group' }],
  ['table-footer-group', { display: 'table-footer-group' }],
  ['table-header-group', { display: 'table-header-group' }],
  ['table-row', { display: 'table-row' }],
  ['table-row-group', { display: 'table-row-group' }],
  ['border-collapse', { 'border-collapse': 'collapse' }],
  ['border-separate', { 'border-collapse': 'separate' }],
  [
    /^border-spacing-(.+)$/,
    ([, d], { theme: theme3 }) => {
      let _a
      return {
        'border-spacing':
          ((_a = theme3.spacing) == null ? void 0 : _a[d]) ??
          handler.bracket.cssvar.auto.fraction.rem(d),
      }
    },
  ],
  ['caption-top', { 'caption-side': 'top' }],
  ['caption-bottom', { 'caption-side': 'bottom' }],
  ['table-auto', { 'table-layout': 'auto' }],
  ['table-fixed', { 'table-layout': 'fixed' }],
  ['table-empty-cells-visible', { 'empty-cells': 'show' }],
  ['table-empty-cells-hidden', { 'empty-cells': 'hide' }],
]
const variablesAbbrMap2 = {
  'bg-blend': 'background-blend-mode',
  'bg-clip': '-webkit-background-clip',
  'bg-gradient': 'linear-gradient',
  'bg-image': 'background-image',
  'bg-origin': 'background-origin',
  'bg-position': 'background-position',
  'bg-repeat': 'background-repeat',
  'bg-size': 'background-size',
  'mix-blend': 'mix-blend-mode',
  object: 'object-fit',
  'object-position': 'object-position',
  write: 'writing-mode',
  'write-orient': 'text-orientation',
}
const cssVariables2 = [
  [
    /^(.+?)-(\$.+)$/,
    ([, name42, varname]) => {
      const prop = variablesAbbrMap2[name42]
      if (prop) return { [prop]: handler.cssvar(varname) }
    },
  ],
]
const divides = [
  [/^divide-?([xy])$/, handlerDivide],
  [/^divide-?([xy])-?(-?.+)$/, handlerDivide],
  [
    /^divide-?([xy])-reverse$/,
    ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 }),
  ],
  [/^divide-(block|inline)$/, handlerDivide],
  [/^divide-(block|inline)-(-?.+)$/, handlerDivide],
  [
    /^divide-(block|inline)-reverse$/,
    ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 }),
  ],
  [/^divide-(.+)$/, colorResolver('border-color', 'divide')],
  [
    /^divide-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-divide-opacity': handler.bracket.percent(opacity2),
    }),
  ],
  ['divide-solid', { 'border-style': 'solid' }],
  ['divide-dashed', { 'border-style': 'dashed' }],
  ['divide-dotted', { 'border-style': 'dotted' }],
  ['divide-double', { 'border-style': 'double' }],
  ['divide-none', { 'border-style': 'none' }],
]
function handlerDivide([, d, s], { theme: theme3 }) {
  let _a
  const v =
    ((_a = theme3.lineWidth) == null ? void 0 : _a[s || 'DEFAULT']) ??
    handler.bracket.cssvar.px(s || '1')
  if (v != null) {
    const results = directionMap[d].map((item) => {
      const key = `border${item}-width`
      const value =
        item.endsWith('right') || item.endsWith('bottom')
          ? `calc(${v} * var(--un-divide-${d}-reverse))`
          : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`
      return [key, value]
    })
    if (results) {
      return [[`--un-divide-${d}-reverse`, 0], ...results]
    }
  }
}
const lineClamps = [
  [
    /^line-clamp-(\d+)$/,
    ([, v]) => ({
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': v,
      'line-clamp': v,
    }),
  ],
  [
    'line-clamp-none',
    {
      '-webkit-line-clamp': 'unset',
      'line-clamp': 'unset',
    },
  ],
]
const fontVariantNumericBase = {
  '--un-ordinal': varEmpty,
  '--un-slashed-zero': varEmpty,
  '--un-numeric-figure': varEmpty,
  '--un-numeric-spacing': varEmpty,
  '--un-numeric-fraction': varEmpty,
  '--un-font-variant-numeric':
    'var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)',
  [CONTROL_SHORTCUT_NO_MERGE]: '',
}
const toEntries = (entry) => [
  fontVariantNumericBase,
  {
    ...entry,
    'font-variant-numeric': 'var(--un-font-variant-numeric)',
  },
]
const fontVariantNumeric = [
  [/^ordinal$/, () => toEntries({ '--un-ordinal': 'ordinal' })],
  [/^slashed-zero$/, () => toEntries({ '--un-slashed-zero': 'slashed-zero' })],
  [/^lining-nums$/, () => toEntries({ '--un-numeric-figure': 'lining-nums' })],
  [
    /^oldstyle-nums$/,
    () => toEntries({ '--un-numeric-figure': 'oldstyle-nums' }),
  ],
  [
    /^proportional-nums$/,
    () => toEntries({ '--un-numeric-spacing': 'proportional-nums' }),
  ],
  [
    /^tabular-nums$/,
    () => toEntries({ '--un-numeric-spacing': 'tabular-nums' }),
  ],
  [
    /^diagonal-fractions$/,
    () => toEntries({ '--un-numeric-fraction': 'diagonal-fractions' }),
  ],
  [
    /^stacked-fractions$/,
    () => toEntries({ '--un-numeric-fraction': 'stacked-fractions' }),
  ],
  ['normal-nums', { 'font-variant-numeric': 'normal' }],
]
const touchActionBase = {
  '--un-pan-x': varEmpty,
  '--un-pan-y': varEmpty,
  '--un-pinch-zoom': varEmpty,
  '--un-touch-action': 'var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)',
  [CONTROL_SHORTCUT_NO_MERGE]: '',
}
const touchActions = [
  [
    /^touch-pan-(x|left|right)$/,
    ([, d]) => [
      touchActionBase,
      {
        '--un-pan-x': `pan-${d}`,
        'touch-action': 'var(--un-touch-action)',
      },
    ],
  ],
  [
    /^touch-pan-(y|up|down)$/,
    ([, d]) => [
      touchActionBase,
      {
        '--un-pan-y': `pan-${d}`,
        'touch-action': 'var(--un-touch-action)',
      },
    ],
  ],
  [
    /^touch-pinch-zoom$/,
    () => [
      touchActionBase,
      {
        '--un-pinch-zoom': 'pinch-zoom',
        'touch-action': 'var(--un-touch-action)',
      },
    ],
  ],
  ['touch-auto', { 'touch-action': 'auto' }],
  ['touch-manipulation', { 'touch-action': 'manipulation' }],
  ['touch-none', { 'touch-action': 'none' }],
]
const scrolls = [
  [
    /^snap-(x|y|both)$/,
    ([, d]) => [
      {
        '--un-scroll-snap-strictness': 'proximity',
        [CONTROL_SHORTCUT_NO_MERGE]: '',
      },
      {
        'scroll-snap-type': `${d} var(--un-scroll-snap-strictness)`,
      },
    ],
  ],
  ['snap-mandatory', { '--un-scroll-snap-strictness': 'mandatory' }],
  ['snap-proximity', { '--un-scroll-snap-strictness': 'proximity' }],
  ['snap-none', { 'scroll-snap-type': 'none' }],
  ['snap-start', { 'scroll-snap-align': 'start' }],
  ['snap-end', { 'scroll-snap-align': 'end' }],
  ['snap-center', { 'scroll-snap-align': 'center' }],
  ['snap-align-none', { 'scroll-snap-align': 'none' }],
  ['snap-normal', { 'scroll-snap-stop': 'normal' }],
  ['snap-always', { 'scroll-snap-stop': 'always' }],
  [/^scroll-ma?()-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([xy])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([rltb])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-(block|inline)-(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([bi][se])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-pa?()-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([xy])-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([rltb])-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-(block|inline)-(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([bi][se])-?(-?.+)$/, directionSize('scroll-padding')],
]
const placeholders = [
  [/^\$ placeholder-(.+)$/, colorResolver('color', 'placeholder')],
  [
    /^\$ placeholder-op(?:acity)?-?(.+)$/,
    ([, opacity2]) => ({
      '--un-placeholder-opacity': handler.bracket.percent(opacity2),
    }),
  ],
]
const rules2 = [
  cssVariables,
  cssVariables2,
  cssProperty,
  container,
  screenReadersAccess,
  pointerEvents,
  appearances,
  positions,
  insets,
  lineClamps,
  isolations,
  zIndexes,
  orders,
  grids,
  floats,
  margins,
  boxSizing,
  displays,
  aspectRatio,
  sizes,
  flex,
  tables,
  transforms,
  animations,
  cursors,
  touchActions,
  userSelects,
  resizes,
  scrolls,
  listStyle,
  appearance,
  columns,
  placements,
  alignments,
  justifies,
  gaps,
  spaces,
  divides,
  overflows,
  overscrolls,
  scrollBehaviors,
  textOverflows,
  whitespaces,
  breaks,
  borders,
  bgColors,
  backgroundStyles,
  svgUtilities,
  objectPositions,
  paddings,
  textAligns,
  textIndents,
  verticalAligns,
  fonts,
  textTransforms2,
  fontStyles,
  fontVariantNumeric,
  textColors,
  textDecorations,
  fontSmoothings,
  tabSizes,
  textStrokes,
  textShadows,
  hyphens,
  writingModes,
  writingOrientations,
  carets,
  accents,
  opacity,
  backgroundBlendModes,
  mixBlendModes,
  boxShadows,
  outline,
  rings,
  imageRenderings,
  filters,
  transitions,
  willChange,
  contents2,
  placeholders,
  questionMark,
].flat(1)
const shortcuts = [...containerShortcuts]
const theme2 = {
  ...theme,
  animation: {
    keyframes: {
      pulse: '{0%, 100% {opacity:1} 50% {opacity:.5}}',
      bounce:
        '{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}',
      spin: '{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
      ping: '{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}',
      'bounce-alt':
        '{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}',
      flash: '{from,50%,to{opacity:1}25%,75%{opacity:0}}',
      'pulse-alt':
        '{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}',
      'rubber-band':
        '{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}',
      'shake-x':
        '{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}',
      'shake-y':
        '{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}',
      'head-shake':
        '{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}',
      swing:
        '{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}',
      tada: '{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}',
      wobble:
        '{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}',
      jello:
        '{from,11.1% to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}',
      'heart-beat':
        '{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}',
      hinge:
        '{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}',
      'jack-in-the-box':
        '{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}',
      'light-speed-in-left':
        '{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}',
      'light-speed-in-right':
        '{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}',
      'light-speed-out-left':
        '{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}',
      'light-speed-out-right':
        '{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}',
      flip: '{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}',
      'flip-in-x':
        '{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}',
      'flip-in-y':
        '{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}',
      'flip-out-x':
        '{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}',
      'flip-out-y':
        '{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}',
      'rotate-in':
        '{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}',
      'rotate-in-down-left':
        '{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}',
      'rotate-in-down-right':
        '{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}',
      'rotate-in-up-left':
        '{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}',
      'rotate-in-up-right':
        '{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}',
      'rotate-out':
        '{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}',
      'rotate-out-down-left':
        '{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}',
      'rotate-out-down-right':
        '{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}',
      'rotate-out-up-left':
        '{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}',
      'rotate-out-up-right':
        '{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}',
      'roll-in':
        '{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'roll-out':
        '{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}',
      'zoom-in':
        '{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}',
      'zoom-in-down':
        '{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'zoom-in-left':
        '{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'zoom-in-right':
        '{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'zoom-in-up':
        '{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'zoom-out':
        '{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}',
      'zoom-out-down':
        '{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'zoom-out-left':
        '{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}',
      'zoom-out-right':
        '{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}',
      'zoom-out-up':
        '{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}',
      'bounce-in':
        '{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}',
      'bounce-in-down':
        '{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}',
      'bounce-in-left':
        '{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}',
      'bounce-in-right':
        '{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}',
      'bounce-in-up':
        '{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}',
      'bounce-out':
        '{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}',
      'bounce-out-down':
        '{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}',
      'bounce-out-left':
        '{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}',
      'bounce-out-right':
        '{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}',
      'bounce-out-up':
        '{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}',
      'slide-in-down':
        '{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}',
      'slide-in-left':
        '{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}',
      'slide-in-right':
        '{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}',
      'slide-in-up':
        '{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}',
      'slide-out-down':
        '{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}',
      'slide-out-left':
        '{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}',
      'slide-out-right':
        '{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}',
      'slide-out-up':
        '{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}',
      'fade-in': '{from{opacity:0}to{opacity:1}}',
      'fade-in-down':
        '{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-down-big':
        '{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-left':
        '{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-left-big':
        '{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-right':
        '{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-right-big':
        '{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-up':
        '{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-up-big':
        '{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-top-left':
        '{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-top-right':
        '{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-bottom-left':
        '{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-in-bottom-right':
        '{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
      'fade-out': '{from{opacity:1}to{opacity:0}}',
      'fade-out-down':
        '{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}',
      'fade-out-down-big':
        '{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}',
      'fade-out-left':
        '{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}',
      'fade-out-left-big':
        '{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}',
      'fade-out-right':
        '{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}',
      'fade-out-right-big':
        '{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}',
      'fade-out-up':
        '{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}',
      'fade-out-up-big':
        '{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}',
      'fade-out-top-left':
        '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}',
      'fade-out-top-right':
        '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}',
      'fade-out-bottom-left':
        '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}',
      'fade-out-bottom-right':
        '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}',
      'back-in-up':
        '{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}',
      'back-in-down':
        '{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}',
      'back-in-right':
        '{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}',
      'back-in-left':
        '{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}',
      'back-out-up':
        '{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}',
      'back-out-down':
        '{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}',
      'back-out-right':
        '{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}',
      'back-out-left':
        '{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}',
    },
    durations: {
      pulse: '2s',
      'heart-beat': '1.3s',
      'bounce-in': '0.75s',
      'bounce-out': '0.75s',
      'flip-out-x': '0.75s',
      'flip-out-y': '0.75s',
      hinge: '2s',
    },
    timingFns: {
      pulse: 'cubic-bezier(0.4,0,.6,1)',
      ping: 'cubic-bezier(0,0,.2,1)',
      'head-shake': 'ease-in-out',
      'heart-beat': 'ease-in-out',
      'pulse-alt': 'ease-in-out',
      'light-speed-in-left': 'ease-out',
      'light-speed-in-right': 'ease-out',
      'light-speed-out-left': 'ease-in',
      'light-speed-out-right': 'ease-in',
    },
    properties: {
      'bounce-alt': { 'transform-origin': 'center bottom' },
      jello: { 'transform-origin': 'center' },
      swing: { 'transform-origin': 'top center' },
      flip: { 'backface-visibility': 'visible' },
      'flip-in-x': { 'backface-visibility': 'visible !important' },
      'flip-in-y': { 'backface-visibility': 'visible !important' },
      'flip-out-x': { 'backface-visibility': 'visible !important' },
      'flip-out-y': { 'backface-visibility': 'visible !important' },
      'rotate-in': { 'transform-origin': 'center' },
      'rotate-in-down-left': { 'transform-origin': 'left bottom' },
      'rotate-in-down-right': { 'transform-origin': 'right bottom' },
      'rotate-in-up-left': { 'transform-origin': 'left bottom' },
      'rotate-in-up-right': { 'transform-origin': 'right bottom' },
      'rotate-out': { 'transform-origin': 'center' },
      'rotate-out-down-left': { 'transform-origin': 'left bottom' },
      'rotate-out-down-right': { 'transform-origin': 'right bottom' },
      'rotate-out-up-left': { 'transform-origin': 'left bottom' },
      'rotate-out-up-right': { 'transform-origin': 'right bottom' },
      hinge: { 'transform-origin': 'top left' },
      'zoom-out-down': { 'transform-origin': 'center bottom' },
      'zoom-out-left': { 'transform-origin': 'left center' },
      'zoom-out-right': { 'transform-origin': 'right center' },
      'zoom-out-up': { 'transform-origin': 'center bottom' },
    },
  },
  media: {
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)',
    os_dark: '(prefers-color-scheme: dark)',
    os_light: '(prefers-color-scheme: light)',
    motion_ok: '(prefers-reduced-motion: no-preference)',
    motion_not_ok: '(prefers-reduced-motion: reduce)',
    high_contrast: '(prefers-contrast: high)',
    low_contrast: '(prefers-contrast: low)',
    opacity_ok: '(prefers-reduced-transparency: no-preference)',
    opacity_not_ok: '(prefers-reduced-transparency: reduce)',
    useData_ok: '(prefers-reduced-data: no-preference)',
    useData_not_ok: '(prefers-reduced-data: reduce)',
    touch: '(hover: none) and (pointer: coarse)',
    stylus: '(hover: none) and (pointer: fine)',
    pointer: '(hover) and (pointer: coarse)',
    mouse: '(hover) and (pointer: fine)',
    hd_color: '(dynamic-range: high)',
  },
}
const variantCombinators2 = [variantMatcher('svg', (input) => `${input} svg`)]
const variantColorsScheme = [
  variantMatcher('.dark', (input) => `.dark $$ ${input}`),
  variantMatcher('.light', (input) => `.light $$ ${input}`),
  variantParentMatcher('@dark', '@media (prefers-color-scheme: dark)'),
  variantParentMatcher('@light', '@media (prefers-color-scheme: light)'),
]
const variantMotions = [
  variantParentMatcher(
    'motion-reduce',
    '@media (prefers-reduced-motion: reduce)',
  ),
  variantParentMatcher(
    'motion-safe',
    '@media (prefers-reduced-motion: no-preference)',
  ),
]
const variantOrientations = [
  variantParentMatcher('landscape', '@media (orientation: landscape)'),
  variantParentMatcher('portrait', '@media (orientation: portrait)'),
]
const variantSpaceAndDivide = (matcher) => {
  if (
    /^space-?([xy])-?(-?.+)$/.test(matcher) ||
    matcher.startsWith('divide-')
  ) {
    return {
      matcher,
      selector: (input) => {
        return `${input}>:not([hidden])~:not([hidden])`
      },
    }
  }
}
const placeholderModifier = (input, { theme: theme3 }) => {
  const m = input.match(/^(.*)\b(placeholder-)(.+)$/)
  if (m) {
    const [, pre = '', p, body] = m
    if (hasParseableColor(body, theme3) || hasOpacityValue(body)) {
      return {
        matcher: `${pre}placeholder-$ ${p}${body}`,
      }
    }
  }
}
function hasOpacityValue(body) {
  const match = body.match(/^op(?:acity)?-?(.+)$/)
  if (match && match[1] != null)
    return handler.bracket.percent(match[1]) != null
  return false
}
const variants2 = (options) => [
  placeholderModifier,
  variantSpaceAndDivide,
  ...variants(options),
  ...variantOrientations,
  ...variantMotions,
  ...variantCombinators2,
  ...variantColorsScheme,
]
const autocomplete2 = [...autocomplete]
const presetWind = (options = {}) => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false
  return {
    name: '@unocss/preset-wind',
    theme: theme2,
    rules: rules2,
    shortcuts,
    variants: variants2(options),
    options,
    autocomplete: autocomplete2,
  }
}

// node_modules/.pnpm/@unocss+preset-uno@0.29.6/node_modules/@unocss/preset-uno/dist/index.mjs
const mixComponent = (v1, v2, w) => `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`
const mixColor = (color1, color2, weight) => {
  const colors2 = [color1, color2]
  const cssColors = []
  for (let c = 0; c < 2; ++c) {
    const color =
      typeof colors2[c] === 'string' ? parseCssColor(colors2[c]) : colors2[c]
    if (!color || !['rgb', 'rgba'].includes(color.type)) return
    cssColors.push(color)
  }
  const newComponents = []
  for (let x = 0; x < 3; ++x)
    newComponents.push(
      mixComponent(
        cssColors[0].components[x],
        cssColors[1].components[x],
        weight,
      ),
    )
  return {
    type: 'rgb',
    components: newComponents,
    alpha: mixComponent(
      cssColors[0].alpha ?? 1,
      cssColors[1].alpha ?? 1,
      weight,
    ),
  }
}
const tint = (color, weight) => mixColor('#fff', color, weight)
const shade = (color, weight) => mixColor('#000', color, weight)
const shift = (color, weight) => {
  const num = parseFloat(`${weight}`)
  if (!Number.isNaN(num))
    return num > 0 ? shade(color, weight) : tint(color, -num)
}
const fns = { tint, shade, shift }
const variantColorMix = (matcher) => {
  const m = matcher.match(/^mix-(tint|shade|shift)-(-?\d{1,3})[-:]/)
  if (m) {
    return {
      matcher: matcher.slice(m[0].length),
      body: (body) => {
        body.forEach((v) => {
          if (v[1]) {
            const color = parseCssColor(`${v[1]}`)
            if (color) {
              const mixed = fns[m[1]](color, m[2])
              if (mixed) v[1] = colorToString(mixed)
            }
          }
        })
        return body
      },
    }
  }
}
const presetUno = (options = {}) => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false
  return {
    name: '@unocss/preset-uno',
    theme: theme2,
    rules: rules2,
    shortcuts,
    variants: [...variants2(options), variantColorMix],
    options,
    autocomplete: autocomplete2,
  }
}

// node_modules/.pnpm/@unocss+preset-attributify@0.29.6/node_modules/@unocss/preset-attributify/dist/index.mjs
const strippedPrefixes = ['v-bind:', ':']
const splitterRE = /[\s'"`;]+/g
const elementRE =
  /<\w[\w:\.$-]*\s((?:'[\s\S]*?'|"[\s\S]*?"|`[\s\S]*?`|\{[\s\S]*?\}|[\s\S]*?)*?)>/g
const valuedAttributeRE =
  /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:!%-]+)(?:=(["'])([^\2]*?)\2)?/g
const extractorAttributify = (options) => {
  const ignoreAttributes =
    (options == null ? void 0 : options.ignoreAttributes) ?? []
  const nonValuedAttribute =
    (options == null ? void 0 : options.nonValuedAttribute) ?? true
  return {
    name: 'attributify',
    extract({ code: code2 }) {
      const result = Array.from(code2.matchAll(elementRE))
        .flatMap((match) =>
          Array.from((match[1] || '').matchAll(valuedAttributeRE)),
        )
        .flatMap(([, name42, _, content]) => {
          if (ignoreAttributes.includes(name42)) return []
          for (const prefix of strippedPrefixes) {
            if (name42.startsWith(prefix)) {
              name42 = name42.slice(prefix.length)
              break
            }
          }
          if (!content) {
            if (isValidSelector(name42) && nonValuedAttribute !== false)
              return [`[${name42}=""]`]
            return []
          }
          if (['class', 'className'].includes(name42))
            return content.split(splitterRE).filter(isValidSelector)
          else
            return content
              .split(splitterRE)
              .filter(Boolean)
              .map((v) => `[${name42}~="${v}"]`)
        })
      return new Set(result)
    },
  }
}
const variantsRE = /^(?!\[(?:[^:]+):(?:.+)\]$)((?:.+:)?!?)?(.*)$/
const variantAttributify = (options = {}) => {
  const prefix = options.prefix ?? 'un-'
  const prefixedOnly = options.prefixedOnly ?? false
  return (input) => {
    const match = isAttributifySelector(input)
    if (!match) return
    let name42 = match[1]
    if (name42.startsWith(prefix)) name42 = name42.slice(prefix.length)
    else if (prefixedOnly) return
    const content = match[2]
    const [, variants3 = '', body = content] = content.match(variantsRE) || []
    if (body === '~' || !body) return `${variants3}${name42}`
    else return `${variants3}${name42}-${body}`
  }
}
const preset = (options = {}) => {
  options.strict = options.strict ?? false
  options.prefix = options.prefix ?? 'un-'
  options.prefixedOnly = options.prefixedOnly ?? false
  options.nonValuedAttribute = options.nonValuedAttribute ?? true
  options.ignoreAttributes = options.ignoreAttributes ?? []
  const variants3 = [variantAttributify(options)]
  const extractors = [extractorAttributify(options)]
  if (!options.strict) extractors.unshift(extractorSplit)
  return {
    name: '@unocss/preset-attributify',
    variants: variants3,
    extractors,
    options,
  }
}

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/svg/size.mjs
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g
function calculateSize(size, ratio, precision) {
  if (ratio === 1) return size

  precision = precision === void 0 ? 100 : precision
  if (typeof size === 'number')
    return Math.ceil(size * ratio * precision) / precision

  if (typeof size !== 'string') return size

  const oldParts = size.split(unitsSplit)
  if (oldParts === null || !oldParts.length) return size

  const newParts = []
  let code2 = oldParts.shift()
  let isNumber = unitsTest.test(code2)
  while (true) {
    if (isNumber) {
      const num = parseFloat(code2)
      if (isNaN(num)) newParts.push(code2)
      else newParts.push(Math.ceil(num * ratio * precision) / precision)
    } else {
      newParts.push(code2)
    }
    code2 = oldParts.shift()
    if (code2 === void 0) return newParts.join('')

    isNumber = !isNumber
  }
}

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/svg/build.mjs
function preserveAspectRatio(props) {
  let result = ''
  switch (props.hAlign) {
    case 'left':
      result += 'xMin'
      break
    case 'right':
      result += 'xMax'
      break
    default:
      result += 'xMid'
  }
  switch (props.vAlign) {
    case 'top':
      result += 'YMin'
      break
    case 'bottom':
      result += 'YMax'
      break
    default:
      result += 'YMid'
  }
  result += props.slice ? ' slice' : ' meet'
  return result
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height,
  }
  let body = icon.body
  ;[icon, customisations].forEach((props) => {
    const transformations = []
    const hFlip = props.hFlip
    const vFlip = props.vFlip
    let rotation = props.rotate
    if (hFlip) {
      if (vFlip) {
        rotation += 2
      } else {
        transformations.push(
          `translate(${(box.width + box.left).toString()} ${(
            0 - box.top
          ).toString()})`,
        )
        transformations.push('scale(-1 1)')
        box.top = box.left = 0
      }
    } else if (vFlip) {
      transformations.push(
        `translate(${(0 - box.left).toString()} ${(
          box.height + box.top
        ).toString()})`,
      )
      transformations.push('scale(1 -1)')
      box.top = box.left = 0
    }
    let tempValue
    if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4

    rotation = rotation % 4
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top
        transformations.unshift(
          `rotate(90 ${tempValue.toString()} ${tempValue.toString()})`,
        )
        break
      case 2:
        transformations.unshift(
          `rotate(180 ${(box.width / 2 + box.left).toString()} ${(
            box.height / 2 +
            box.top
          ).toString()})`,
        )
        break
      case 3:
        tempValue = box.width / 2 + box.left
        transformations.unshift(
          `rotate(-90 ${tempValue.toString()} ${tempValue.toString()})`,
        )
        break
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left
        box.left = box.top
        box.top = tempValue
      }
      if (box.width !== box.height) {
        tempValue = box.width
        box.width = box.height
        box.height = tempValue
      }
    }
    if (transformations.length)
      body = `<g transform="${transformations.join(' ')}">${body}</g>`
  })
  let width2, height2
  if (customisations.width === null && customisations.height === null) {
    height2 = '1em'
    width2 = calculateSize(height2, box.width / box.height)
  } else if (customisations.width !== null && customisations.height !== null) {
    width2 = customisations.width
    height2 = customisations.height
  } else if (customisations.height !== null) {
    height2 = customisations.height
    width2 = calculateSize(height2, box.width / box.height)
  } else {
    width2 = customisations.width
    height2 = calculateSize(width2, box.height / box.width)
  }
  if (width2 === 'auto') width2 = box.width

  if (height2 === 'auto') height2 = box.height

  width2 = typeof width2 === 'string' ? width2 : `${width2.toString()}`
  height2 = typeof height2 === 'string' ? height2 : `${height2.toString()}`
  const result = {
    attributes: {
      width: width2,
      height: height2,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: `${box.left.toString()} ${box.top.toString()} ${box.width.toString()} ${box.height.toString()}`,
    },
    body,
  }
  if (customisations.inline) result.inline = true

  return result
}

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/customisations/index.mjs
const defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: 'center',
  vAlign: 'middle',
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0,
})

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/icon/index.mjs
const iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false,
})
function fullIcon(data) {
  return { ...iconDefaults, ...data }
}

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/icon/merge.mjs
function mergeIconData(icon, alias) {
  const result = { ...icon }
  for (const key in iconDefaults) {
    const prop = key
    if (alias[prop] !== void 0) {
      const value = alias[prop]
      if (result[prop] === void 0) {
        result[prop] = value
        continue
      }
      switch (prop) {
        case 'rotate':
          result[prop] = (result[prop] + value) % 4
          break
        case 'hFlip':
        case 'vFlip':
          result[prop] = value !== result[prop]
          break
        default:
          result[prop] = value
      }
    }
  }
  return result
}

// node_modules/.pnpm/@iconify+utils@1.0.33/node_modules/@iconify/utils/lib/icon-set/get-icon.mjs
function getIconData(data, name42, full = false) {
  function getIcon(name210, iteration) {
    if (data.icons[name210] !== void 0)
      return Object.assign({}, data.icons[name210])

    if (iteration > 5) return null

    const aliases = data.aliases
    if (aliases && aliases[name210] !== void 0) {
      const item = aliases[name210]
      const result2 = getIcon(item.parent, iteration + 1)
      if (result2) return mergeIconData(result2, item)

      return result2
    }
    const chars = data.chars
    if (!iteration && chars && chars[name210] !== void 0)
      return getIcon(chars[name210], iteration + 1)

    return null
  }
  const result = getIcon(name42, 0)
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0)
        result[key] = data[key]
    }
  }
  return result && full ? fullIcon(result) : result
}

// node_modules/.pnpm/@unocss+preset-icons@0.29.6/node_modules/@unocss/preset-icons/dist/index.mjs
const isNode = typeof process < 'u' && typeof process.stdout < 'u'
const isVSCode = isNode && !!process.env.VSCODE_CWD
function encodeSvg(svg) {
  return svg
    .replace(
      '<svg',
      ~svg.indexOf('xmlns')
        ? '<svg'
        : '<svg xmlns="http://www.w3.org/2000/svg"',
    )
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
}
const COLLECTION_NAME_PARTS_MAX = 3
async function importFsModule() {
  try {
    return await import('./fs-OP2BBMN6.js')
  } catch {
    try {
      return require_fs2()
    } catch {
      return void 0
    }
  }
}
async function searchForIcon(collection, id, collections, scale) {
  if (!collection || !id) return
  let iconSet = collections[collection]
  if (typeof iconSet === 'function') iconSet = await iconSet()
  if (!iconSet && isNode && !isVSCode) {
    try {
      const loadCollectionFromFS = await importFsModule().then((i) =>
        i == null ? void 0 : i.loadCollectionFromFS,
      )
      if (loadCollectionFromFS) iconSet = await loadCollectionFromFS(collection)
    } catch {}
  }
  if (!iconSet) return
  const iconData = getIconData(iconSet, id, true)
  if (iconData) {
    const { attributes, body } = iconToSVG(iconData, {
      ...defaults,
      height: `${scale}em`,
      width: `${scale}em`,
    })
    return body.includes('xlink:')
      ? `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${Object.entries(
          attributes,
        )
          .map((i) => `${i[0]}="${i[1]}"`)
          .join(' ')}>${body}</svg>`
      : `<svg ${Object.entries(attributes)
          .map((i) => `${i[0]}="${i[1]}"`)
          .join(' ')}>${body}</svg>`
  }
}
const preset2 = (options = {}) => {
  const {
    scale = 1,
    mode = 'auto',
    prefix = 'i-',
    warn = false,
    collections = {},
    extraProperties = {},
    layer = 'icons',
  } = options
  return {
    name: '@unocss/preset-icons',
    enforce: 'pre',
    options,
    layers: {
      icons: -10,
    },
    rules: [
      [
        new RegExp(`^${prefix}([a-z0-9:-]+)(?:\\?(mask|bg))?$`),
        async ([full, body, _mode]) => {
          let collection = ''
          let name42 = ''
          let svg
          if (body.includes(':')) {
            ;[collection, name42] = body.split(':')
            svg = await searchForIcon(collection, name42, collections, scale)
          } else {
            const parts = body.split(/-/g)
            for (let i = COLLECTION_NAME_PARTS_MAX; i >= 1; i--) {
              collection = parts.slice(0, i).join('-')
              name42 = parts.slice(i).join('-')
              svg = await searchForIcon(collection, name42, collections, scale)
              if (svg) break
            }
          }
          if (!svg) {
            if (warn) warnOnce(`failed to load icon "${full}"`)
            return
          }
          _mode = _mode || mode
          if (_mode === 'auto')
            _mode = svg.includes('currentColor') ? 'mask' : 'background-img'
          const url = `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`
          if (_mode === 'mask') {
            return {
              '--un-icon': url,
              mask: 'var(--un-icon) no-repeat',
              'mask-size': '100% 100%',
              '-webkit-mask': 'var(--un-icon) no-repeat',
              '-webkit-mask-size': '100% 100%',
              'background-color': 'currentColor',
              height: `${scale}em`,
              width: `${scale}em`,
              ...extraProperties,
            }
          } else {
            return {
              background: `${url} no-repeat`,
              'background-size': '100% 100%',
              'background-color': 'transparent',
              height: `${scale}em`,
              width: `${scale}em`,
              ...extraProperties,
            }
          }
        },
        { layer },
      ],
    ],
  }
}

// node_modules/.pnpm/@unocss+preset-web-fonts@0.29.6/node_modules/@unocss/preset-web-fonts/dist/index.mjs
const GoogleFontsProvider = {
  name: 'google',
  getImportUrl(fonts2) {
    const strings = fonts2
      .filter((i) => i.provider === 'google')
      .map((i) => {
        let _a
        let name42 = i.name.replace(/\s+/g, '+')
        if ((_a = i.weights) == null ? void 0 : _a.length)
          name42 += i.italic
            ? `:ital,wght@${i.weights
                .flatMap((i2) => [`0,${i2}`, `1,${i2}`])
                .sort()
                .join(';')}`
            : `:wght@${i.weights.sort().join(';')}`

        return `family=${name42}`
      })
      .join('&')
    return `https://fonts.googleapis.com/css2?${strings}&display=swap`
  },
  getFontName(font) {
    return `"${font.name}"`
  },
}
const NoneProvider = {
  name: 'none',
  getPreflight() {
    return ''
  },
  getFontName(font) {
    return font.name
  },
}
const layerName = '__webfonts__'
function normalizedFontMeta(meta, defaultProvider) {
  if (typeof meta !== 'string') {
    meta.provider = meta.provider ?? defaultProvider
    return meta
  }
  const [name42, weights = ''] = meta.split(':')
  return {
    name: name42,
    weights: weights.split(/[,;]\s*/).filter(Boolean),
    provider: defaultProvider,
  }
}
const providers = {
  google: GoogleFontsProvider,
  none: NoneProvider,
}
const preset3 = (options = {}) => {
  const {
    provider: defaultProvider = 'google',
    extendTheme = true,
    inlineImports = true,
    themeKey = 'fontFamily',
  } = options
  const fontObject = Object.fromEntries(
    Object.entries(options.fonts || {}).map(([name42, meta]) => [
      name42,
      toArray(meta).map((m) => normalizedFontMeta(m, defaultProvider)),
    ]),
  )
  const fonts2 = Object.values(fontObject).flatMap((i) => i)
  const importCache = {}
  async function importUrl(url) {
    if (inlineImports) {
      if (!importCache[url]) {
        try {
          const { default: axios } = await import('./axios-RVEYF6SX.js')
          const { data } = await axios.get(url, { headers: {} })
          importCache[url] = data
        } catch (e2) {
          console.error('Failed to fetch web fonts')
          console.error(e2)
          if (typeof process !== 'undefined' && process.env.CI) throw e2
        }
      }
      return importCache[url]
    } else {
      return `@import url('${url}')`
    }
  }
  const preset22 = {
    name: '@unocss/preset-web-fonts',
    layers: {
      [layerName]: -Infinity,
    },
    preflights: [
      {
        async getCSS() {
          let _a
          const names = new Set(
            fonts2.map((i) => i.provider || defaultProvider),
          )
          const preflights = []
          for (const name42 of names) {
            const fontsForProvider = fonts2.filter((i) => i.provider === name42)
            const provider = providers[name42]
            if (provider.getImportUrl) {
              const url = provider.getImportUrl(fontsForProvider)
              if (url) preflights.push(await importUrl(url))
            }
            preflights.push(
              (_a = provider.getPreflight) == null
                ? void 0
                : _a.call(provider, fontsForProvider),
            )
          }
          return preflights.filter(Boolean).join('\n')
        },
        layer: layerName,
      },
    ],
  }
  if (extendTheme) {
    preset22.extendTheme = (theme3) => {
      if (!theme3[themeKey]) theme3[themeKey] = {}
      const obj = Object.fromEntries(
        Object.entries(fontObject).map(([name42, fonts22]) => [
          name42,
          fonts22.map((f) =>
            providers[f.provider || defaultProvider].getFontName(f),
          ),
        ]),
      )
      for (const key of Object.keys(obj)) {
        if (typeof theme3[themeKey][key] === 'string')
          theme3[themeKey][key] =
            obj[key].map((i) => `${i},`).join('') + theme3[themeKey][key]
        else theme3[themeKey][key] = obj[key].join(',')
      }
    }
  }
  return preset22
}

// node_modules/.pnpm/@unocss+preset-typography@0.29.6/node_modules/@unocss/preset-typography/dist/index.mjs
const DEFAULT = {
  'h1,h2,h3,h4,h5,h6': {
    color: 'var(--un-prose-headings)',
    'font-weight': '600',
    'line-height': 1.25,
  },
  a: {
    color: 'var(--un-prose-links)',
    'text-decoration': 'underline',
    'font-weight': '500',
  },
  'a code': {
    color: 'var(--un-prose-links)',
  },
  'p,ul,ol,pre': {
    margin: '1em 0',
    'line-height': 1.75,
  },
  blockquote: {
    margin: '1em 0',
    'padding-left': '1em',
    'font-style': 'italic',
    'border-left': '.25em solid var(--un-prose-borders)',
  },
  h1: {
    margin: '1rem 0',
    'font-size': '2.25em',
  },
  h2: {
    margin: '1.75em 0 .5em',
    'font-size': '1.75em',
  },
  h3: {
    margin: '1.5em 0 .5em',
    'font-size': '1.375em',
  },
  h4: {
    margin: '1em 0',
    'font-size': '1.125em',
  },
  'img,video': {
    'max-width': '100%',
  },
  'figure,picture': {
    margin: '1em 0',
  },
  figcaption: {
    color: 'var(--un-prose-captions)',
    'font-size': '.875em',
  },
  code: {
    color: 'var(--un-prose-code)',
    'font-size': '.875em',
    'font-weight': 600,
    'font-family':
      'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation-Mono,Courier-New,monospace',
  },
  ':not(pre) > code::before,:not(pre) > code::after': {
    content: '"`"',
  },
  pre: {
    padding: '1.25rem 1.5rem',
    'overflow-x': 'auto',
    'border-radius': '.375rem',
  },
  'pre,code': {
    'white-space': 'pre',
    'word-spacing': 'normal',
    'word-break': 'normal',
    'word-wrap': 'normal',
    '-moz-tab-size': 4,
    '-o-tab-size': 4,
    'tab-size': 4,
    '-webkit-hyphens': 'none',
    '-moz-hyphens': 'none',
    hyphens: 'none',
    background: 'transparent',
  },
  'pre code': {
    'font-weight': 'inherit',
  },
  'ol,ul': {
    'padding-left': '1.25em',
  },
  ol: {
    'list-style-type': 'decimal',
  },
  'ol[type="A"]': {
    'list-style-type': 'upper-alpha',
  },
  'ol[type="a"]': {
    'list-style-type': 'lower-alpha',
  },
  'ol[type="A" s]': {
    'list-style-type': 'upper-alpha',
  },
  'ol[type="a" s]': {
    'list-style-type': 'lower-alpha',
  },
  'ol[type="I"]': {
    'list-style-type': 'upper-roman',
  },
  'ol[type="i"]': {
    'list-style-type': 'lower-roman',
  },
  'ol[type="I" s]': {
    'list-style-type': 'upper-roman',
  },
  'ol[type="i" s]': {
    'list-style-type': 'lower-roman',
  },
  'ol[type="1"]': {
    'list-style-type': 'decimal',
  },
  ul: {
    'list-style-type': 'disc',
  },
  'ol > li::marker,ul > li::marker,summary::marker': {
    color: 'var(--un-prose-lists)',
  },
  hr: {
    margin: '2em 0',
    border: '1px solid var(--un-prose-hr)',
  },
  table: {
    display: 'block',
    margin: '1em 0',
    'border-collapse': 'collapse',
    'overflow-x': 'auto',
  },
  'tr:nth-child(2n)': {
    background: 'var(--un-prose-bg-soft)',
  },
  'td,th': {
    border: '1px solid var(--un-prose-borders)',
    padding: '.625em 1em',
  },
  abbr: {
    cursor: 'help',
  },
  kbd: {
    color: 'var(--un-prose-code)',
    border: '1px solid',
    padding: '.25rem .5rem',
    'font-size': '.875em',
    'border-radius': '.25rem',
  },
  details: {
    margin: '1em 0',
    padding: '1.25rem 1.5rem',
    background: 'var(--un-prose-bg-soft)',
  },
  summary: {
    cursor: 'pointer',
    'font-weight': '600',
  },
}
function getCSS(selectorProse, className, preflights) {
  let css = ''
  for (const selector2 in preflights) {
    const cssDeclarationBlock = preflights[selector2]
    const pseudoCSSMatchArray = selector2
      .split(',')
      .map((s) => {
        const match = s.match(/::?(?:[\(\)\:\-\d\w]+)$/g)
        if (match) {
          const matchStr = match[0]
          s = s.replace(matchStr, '')
          return `${selectorProse} :where(${s}):not(.not-${className})${matchStr}`
        }
        return null
      })
      .filter((v) => v)
    if (pseudoCSSMatchArray.length) css += pseudoCSSMatchArray.join(',')
    else css += `${selectorProse} :where(${selector2}):not(.not-${className})`

    css += '{'
    for (const k in cssDeclarationBlock) {
      const v = cssDeclarationBlock[k]
      css += `${k}:${v};`
    }
    css += '}'
  }
  return css
}
function getPreflights(selectorProse, className, cssExtend) {
  if (!selectorProse.startsWith('[')) selectorProse = `.${selectorProse}`
  if (cssExtend)
    return getCSS(selectorProse, className, mergeDeep(DEFAULT, cssExtend))
  return getCSS(selectorProse, className, DEFAULT)
}
function presetTypography(options) {
  let hasProseClass = false
  let selectorProse = ''
  const className = (options == null ? void 0 : options.className) || 'prose'
  const classNameRE = new RegExp(`^${className}$`)
  const colorsRE = new RegExp(`^${className}-([-\\w]+)$`)
  const invertRE = new RegExp(`^${className}-invert$`)
  const cssExtend = options == null ? void 0 : options.cssExtend
  return {
    name: '@unocss/preset-typography',
    enforce: 'post',
    layers: { typography: -1 },
    rules: [
      [
        classNameRE,
        (_, { rawSelector }) => {
          hasProseClass = true
          selectorProse = rawSelector
          return { color: 'var(--un-prose-body)', 'max-width': '65ch' }
        },
        { layer: 'typography' },
      ],
      [
        colorsRE,
        ([, color], { theme: theme3 }) => {
          let _a
          const baseColor = (_a = theme3.colors) == null ? void 0 : _a[color]
          if (baseColor == null) return
          const colorObject = typeof baseColor === 'object' ? baseColor : {}
          return {
            '--un-prose-body': colorObject[700] ?? baseColor,
            '--un-prose-headings': colorObject[900] ?? baseColor,
            '--un-prose-links': colorObject[900] ?? baseColor,
            '--un-prose-lists': colorObject[400] ?? baseColor,
            '--un-prose-hr': colorObject[200] ?? baseColor,
            '--un-prose-captions': colorObject[500] ?? baseColor,
            '--un-prose-code': colorObject[900] ?? baseColor,
            '--un-prose-borders': colorObject[200] ?? baseColor,
            '--un-prose-bg-soft': colorObject[100] ?? baseColor,
            '--un-prose-invert-body': colorObject[200] ?? baseColor,
            '--un-prose-invert-headings': colorObject[100] ?? baseColor,
            '--un-prose-invert-links': colorObject[100] ?? baseColor,
            '--un-prose-invert-lists': colorObject[500] ?? baseColor,
            '--un-prose-invert-hr': colorObject[700] ?? baseColor,
            '--un-prose-invert-captions': colorObject[400] ?? baseColor,
            '--un-prose-invert-code': colorObject[100] ?? baseColor,
            '--un-prose-invert-borders': colorObject[700] ?? baseColor,
            '--un-prose-invert-bg-soft': colorObject[800] ?? baseColor,
          }
        },
        { layer: 'typography' },
      ],
      [
        invertRE,
        () => {
          return {
            '--un-prose-body': 'var(--un-prose-invert-body)',
            '--un-prose-headings': 'var(--un-prose-invert-headings)',
            '--un-prose-links': 'var(--un-prose-invert-links)',
            '--un-prose-lists': 'var(--un-prose-invert-lists)',
            '--un-prose-hr': 'var(--un-prose-invert-hr)',
            '--un-prose-captions': 'var(--un-prose-invert-captions)',
            '--un-prose-code': 'var(--un-prose-invert-code)',
            '--un-prose-borders': 'var(--un-prose-invert-borders)',
            '--un-prose-bg-soft': 'var(--un-prose-invert-bg-soft)',
          }
        },
        { layer: 'typography' },
      ],
    ],
    preflights: [
      {
        layer: 'typography',
        getCSS: () =>
          hasProseClass
            ? getPreflights(selectorProse, className, cssExtend)
            : void 0,
      },
    ],
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/types.js
const types_exports = {}
__export(types_exports, {
  AtKeyword: () => AtKeyword,
  BadString: () => BadString,
  BadUrl: () => BadUrl,
  CDC: () => CDC,
  CDO: () => CDO,
  Colon: () => Colon,
  Comma: () => Comma,
  Comment: () => Comment,
  Delim: () => Delim,
  Dimension: () => Dimension,
  EOF: () => EOF,
  Function: () => Function,
  Hash: () => Hash,
  Ident: () => Ident,
  LeftCurlyBracket: () => LeftCurlyBracket,
  LeftParenthesis: () => LeftParenthesis,
  LeftSquareBracket: () => LeftSquareBracket,
  Number: () => Number2,
  Percentage: () => Percentage,
  RightCurlyBracket: () => RightCurlyBracket,
  RightParenthesis: () => RightParenthesis,
  RightSquareBracket: () => RightSquareBracket,
  Semicolon: () => Semicolon,
  String: () => String2,
  Url: () => Url,
  WhiteSpace: () => WhiteSpace,
})
var EOF = 0
var Ident = 1
var Function = 2
var AtKeyword = 3
var Hash = 4
var String2 = 5
var BadString = 6
var Url = 7
var BadUrl = 8
var Delim = 9
var Number2 = 10
var Percentage = 11
var Dimension = 12
var WhiteSpace = 13
var CDO = 14
var CDC = 15
var Colon = 16
var Semicolon = 17
var Comma = 18
var LeftSquareBracket = 19
var RightSquareBracket = 20
var LeftParenthesis = 21
var RightParenthesis = 22
var LeftCurlyBracket = 23
var RightCurlyBracket = 24
var Comment = 25

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/char-code-definitions.js
const EOF2 = 0
function isDigit(code2) {
  return code2 >= 48 && code2 <= 57
}
function isHexDigit(code2) {
  return (
    isDigit(code2) || // 0 .. 9
    (code2 >= 65 && code2 <= 70) || // A .. F
    (code2 >= 97 && code2 <= 102)
  )
}
function isUppercaseLetter(code2) {
  return code2 >= 65 && code2 <= 90
}
function isLowercaseLetter(code2) {
  return code2 >= 97 && code2 <= 122
}
function isLetter(code2) {
  return isUppercaseLetter(code2) || isLowercaseLetter(code2)
}
function isNonAscii(code2) {
  return code2 >= 128
}
function isNameStart(code2) {
  return isLetter(code2) || isNonAscii(code2) || code2 === 95
}
function isName(code2) {
  return isNameStart(code2) || isDigit(code2) || code2 === 45
}
function isNonPrintable(code2) {
  return (
    (code2 >= 0 && code2 <= 8) ||
    code2 === 11 ||
    (code2 >= 14 && code2 <= 31) ||
    code2 === 127
  )
}
function isNewline(code2) {
  return code2 === 10 || code2 === 13 || code2 === 12
}
function isWhiteSpace(code2) {
  return isNewline(code2) || code2 === 32 || code2 === 9
}
function isValidEscape(first, second) {
  if (first !== 92) return false

  if (isNewline(second) || second === EOF2) return false

  return true
}
function isIdentifierStart(first, second, third) {
  if (first === 45)
    return isNameStart(second) || second === 45 || isValidEscape(second, third)

  if (isNameStart(first)) return true

  if (first === 92) return isValidEscape(first, second)

  return false
}
function isNumberStart(first, second, third) {
  if (first === 43 || first === 45) {
    if (isDigit(second)) return 2

    return second === 46 && isDigit(third) ? 3 : 0
  }
  if (first === 46) return isDigit(second) ? 2 : 0

  if (isDigit(first)) return 1

  return 0
}
function isBOM(code2) {
  if (code2 === 65279) return 1

  if (code2 === 65534) return 1

  return 0
}
const CATEGORY = new Array(128)
const EofCategory = 128
const WhiteSpaceCategory = 130
const DigitCategory = 131
const NameStartCategory = 132
const NonPrintableCategory = 133
for (let i = 0; i < CATEGORY.length; i++)
  CATEGORY[i] =
    (isWhiteSpace(i) && WhiteSpaceCategory) ||
    (isDigit(i) && DigitCategory) ||
    (isNameStart(i) && NameStartCategory) ||
    (isNonPrintable(i) && NonPrintableCategory) ||
    i ||
    EofCategory

function charCodeCategory(code2) {
  return code2 < 128 ? CATEGORY[code2] : NameStartCategory
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/utils.js
function getCharCode(source, offset) {
  return offset < source.length ? source.charCodeAt(offset) : 0
}
function getNewlineLength(source, offset, code2) {
  if (code2 === 13 && getCharCode(source, offset + 1) === 10) return 2

  return 1
}
function cmpChar(testStr, offset, referenceCode) {
  let code2 = testStr.charCodeAt(offset)
  if (isUppercaseLetter(code2)) code2 = code2 | 32

  return code2 === referenceCode
}
function cmpStr(testStr, start, end, referenceStr) {
  if (end - start !== referenceStr.length) return false

  if (start < 0 || end > testStr.length) return false

  for (let i = start; i < end; i++) {
    const referenceCode = referenceStr.charCodeAt(i - start)
    let testCode = testStr.charCodeAt(i)
    if (isUppercaseLetter(testCode)) testCode = testCode | 32

    if (testCode !== referenceCode) return false
  }
  return true
}
function findWhiteSpaceStart(source, offset) {
  for (; offset >= 0; offset--) {
    if (!isWhiteSpace(source.charCodeAt(offset))) break
  }
  return offset + 1
}
function findWhiteSpaceEnd(source, offset) {
  for (; offset < source.length; offset++) {
    if (!isWhiteSpace(source.charCodeAt(offset))) break
  }
  return offset
}
function findDecimalNumberEnd(source, offset) {
  for (; offset < source.length; offset++) {
    if (!isDigit(source.charCodeAt(offset))) break
  }
  return offset
}
function consumeEscaped(source, offset) {
  offset += 2
  if (isHexDigit(getCharCode(source, offset - 1))) {
    for (
      const maxOffset = Math.min(source.length, offset + 5);
      offset < maxOffset;
      offset++
    ) {
      if (!isHexDigit(getCharCode(source, offset))) break
    }
    const code2 = getCharCode(source, offset)
    if (isWhiteSpace(code2)) offset += getNewlineLength(source, offset, code2)
  }
  return offset
}
function consumeName(source, offset) {
  for (; offset < source.length; offset++) {
    const code2 = source.charCodeAt(offset)
    if (isName(code2)) continue

    if (isValidEscape(code2, getCharCode(source, offset + 1))) {
      offset = consumeEscaped(source, offset) - 1
      continue
    }
    break
  }
  return offset
}
function consumeNumber(source, offset) {
  let code2 = source.charCodeAt(offset)
  if (code2 === 43 || code2 === 45) code2 = source.charCodeAt((offset += 1))

  if (isDigit(code2)) {
    offset = findDecimalNumberEnd(source, offset + 1)
    code2 = source.charCodeAt(offset)
  }
  if (code2 === 46 && isDigit(source.charCodeAt(offset + 1))) {
    offset += 2
    offset = findDecimalNumberEnd(source, offset)
  }
  if (
    cmpChar(
      source,
      offset,
      101,
      /* e */
    )
  ) {
    let sign = 0
    code2 = source.charCodeAt(offset + 1)
    if (code2 === 45 || code2 === 43) {
      sign = 1
      code2 = source.charCodeAt(offset + 2)
    }
    if (isDigit(code2))
      offset = findDecimalNumberEnd(source, offset + 1 + sign + 1)
  }
  return offset
}
function consumeBadUrlRemnants(source, offset) {
  for (; offset < source.length; offset++) {
    const code2 = source.charCodeAt(offset)
    if (code2 === 41) {
      offset++
      break
    }
    if (isValidEscape(code2, getCharCode(source, offset + 1)))
      offset = consumeEscaped(source, offset)
  }
  return offset
}
function decodeEscaped(escaped) {
  if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0)))
    return escaped[0]

  let code2 = parseInt(escaped, 16)
  if (
    code2 === 0 || // If this number is zero,
    (code2 >= 55296 && code2 <= 57343) || // or is for a surrogate,
    code2 > 1114111
  )
    code2 = 65533

  return String.fromCodePoint(code2)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/names.js
const names_default = [
  'EOF-token',
  'ident-token',
  'function-token',
  'at-keyword-token',
  'hash-token',
  'string-token',
  'bad-string-token',
  'url-token',
  'bad-url-token',
  'delim-token',
  'number-token',
  'percentage-token',
  'dimension-token',
  'whitespace-token',
  'CDO-token',
  'CDC-token',
  'colon-token',
  'semicolon-token',
  'comma-token',
  '[-token',
  ']-token',
  '(-token',
  ')-token',
  '{-token',
  '}-token',
]

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/adopt-buffer.js
const MIN_SIZE = 16 * 1024
function adoptBuffer(buffer = null, size) {
  if (buffer === null || buffer.length < size)
    return new Uint32Array(Math.max(size + 1024, MIN_SIZE))

  return buffer
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
const N = 10
const F = 12
const R = 13
function computeLinesAndColumns(host) {
  const source = host.source
  const sourceLength = source.length
  const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0
  const lines = adoptBuffer(host.lines, sourceLength)
  const columns2 = adoptBuffer(host.columns, sourceLength)
  let line = host.startLine
  let column = host.startColumn
  for (let i = startOffset; i < sourceLength; i++) {
    const code2 = source.charCodeAt(i)
    lines[i] = line
    columns2[i] = column++
    if (code2 === N || code2 === R || code2 === F) {
      if (
        code2 === R &&
        i + 1 < sourceLength &&
        source.charCodeAt(i + 1) === N
      ) {
        i++
        lines[i] = line
        columns2[i] = column
      }
      line++
      column = 1
    }
  }
  lines[sourceLength] = line
  columns2[sourceLength] = column
  host.lines = lines
  host.columns = columns2
  host.computed = true
}
const OffsetToLocation = class {
  constructor() {
    this.lines = null
    this.columns = null
    this.computed = false
  }

  setSource(source, startOffset = 0, startLine = 1, startColumn = 1) {
    this.source = source
    this.startOffset = startOffset
    this.startLine = startLine
    this.startColumn = startColumn
    this.computed = false
  }

  getLocation(offset, filename) {
    if (!this.computed) computeLinesAndColumns(this)

    return {
      source: filename,
      offset: this.startOffset + offset,
      line: this.lines[offset],
      column: this.columns[offset],
    }
  }

  getLocationRange(start, end, filename) {
    if (!this.computed) computeLinesAndColumns(this)

    return {
      source: filename,
      start: {
        offset: this.startOffset + start,
        line: this.lines[start],
        column: this.columns[start],
      },
      end: {
        offset: this.startOffset + end,
        line: this.lines[end],
        column: this.columns[end],
      },
    }
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/TokenStream.js
const OFFSET_MASK = 16777215
const TYPE_SHIFT = 24
const balancePair = /* @__PURE__ */ new Map([
  [Function, RightParenthesis],
  [LeftParenthesis, RightParenthesis],
  [LeftSquareBracket, RightSquareBracket],
  [LeftCurlyBracket, RightCurlyBracket],
])
const TokenStream = class {
  constructor(source, tokenize3) {
    this.setSource(source, tokenize3)
  }

  reset() {
    this.eof = false
    this.tokenIndex = -1
    this.tokenType = 0
    this.tokenStart = this.firstCharOffset
    this.tokenEnd = this.firstCharOffset
  }

  setSource(source = '', tokenize3 = () => {}) {
    source = String(source || '')
    const sourceLength = source.length
    const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1)
    const balance = adoptBuffer(this.balance, source.length + 1)
    let tokenCount = 0
    let balanceCloseType = 0
    let balanceStart = 0
    let firstCharOffset = -1
    this.offsetAndType = null
    this.balance = null
    tokenize3(source, (type, start, end) => {
      switch (type) {
        default:
          balance[tokenCount] = sourceLength
          break
        case balanceCloseType: {
          let balancePrev = balanceStart & OFFSET_MASK
          balanceStart = balance[balancePrev]
          balanceCloseType = balanceStart >> TYPE_SHIFT
          balance[tokenCount] = balancePrev
          balance[balancePrev++] = tokenCount
          for (; balancePrev < tokenCount; balancePrev++) {
            if (balance[balancePrev] === sourceLength)
              balance[balancePrev] = tokenCount
          }
          break
        }
        case LeftParenthesis:
        case Function:
        case LeftSquareBracket:
        case LeftCurlyBracket:
          balance[tokenCount] = balanceStart
          balanceCloseType = balancePair.get(type)
          balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount
          break
      }
      offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | end
      if (firstCharOffset === -1) firstCharOffset = start
    })
    offsetAndType[tokenCount] = (EOF << TYPE_SHIFT) | sourceLength
    balance[tokenCount] = sourceLength
    balance[sourceLength] = sourceLength
    while (balanceStart !== 0) {
      const balancePrev = balanceStart & OFFSET_MASK
      balanceStart = balance[balancePrev]
      balance[balancePrev] = sourceLength
    }
    this.source = source
    this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset
    this.tokenCount = tokenCount
    this.offsetAndType = offsetAndType
    this.balance = balance
    this.reset()
    this.next()
  }

  lookupType(offset) {
    offset += this.tokenIndex
    if (offset < this.tokenCount)
      return this.offsetAndType[offset] >> TYPE_SHIFT

    return EOF
  }

  lookupOffset(offset) {
    offset += this.tokenIndex
    if (offset < this.tokenCount)
      return this.offsetAndType[offset - 1] & OFFSET_MASK

    return this.source.length
  }

  lookupValue(offset, referenceStr) {
    offset += this.tokenIndex
    if (offset < this.tokenCount) {
      return cmpStr(
        this.source,
        this.offsetAndType[offset - 1] & OFFSET_MASK,
        this.offsetAndType[offset] & OFFSET_MASK,
        referenceStr,
      )
    }
    return false
  }

  getTokenStart(tokenIndex) {
    if (tokenIndex === this.tokenIndex) return this.tokenStart

    if (tokenIndex > 0)
      return tokenIndex < this.tokenCount
        ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK
        : this.offsetAndType[this.tokenCount] & OFFSET_MASK

    return this.firstCharOffset
  }

  substrToCursor(start) {
    return this.source.substring(start, this.tokenStart)
  }

  isBalanceEdge(pos) {
    return this.balance[this.tokenIndex] < pos
  }

  isDelim(code2, offset) {
    if (offset)
      return (
        this.lookupType(offset) === Delim &&
        this.source.charCodeAt(this.lookupOffset(offset)) === code2
      )

    return (
      this.tokenType === Delim &&
      this.source.charCodeAt(this.tokenStart) === code2
    )
  }

  skip(tokenCount) {
    let next = this.tokenIndex + tokenCount
    if (next < this.tokenCount) {
      this.tokenIndex = next
      this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK
      next = this.offsetAndType[next]
      this.tokenType = next >> TYPE_SHIFT
      this.tokenEnd = next & OFFSET_MASK
    } else {
      this.tokenIndex = this.tokenCount
      this.next()
    }
  }

  next() {
    let next = this.tokenIndex + 1
    if (next < this.tokenCount) {
      this.tokenIndex = next
      this.tokenStart = this.tokenEnd
      next = this.offsetAndType[next]
      this.tokenType = next >> TYPE_SHIFT
      this.tokenEnd = next & OFFSET_MASK
    } else {
      this.eof = true
      this.tokenIndex = this.tokenCount
      this.tokenType = EOF
      this.tokenStart = this.tokenEnd = this.source.length
    }
  }

  skipSC() {
    while (this.tokenType === WhiteSpace || this.tokenType === Comment)
      this.next()
  }

  skipUntilBalanced(startToken, stopConsume) {
    let cursor = startToken
    let balanceEnd
    let offset
    loop: for (; cursor < this.tokenCount; cursor++) {
      balanceEnd = this.balance[cursor]
      if (balanceEnd < startToken) break loop

      offset =
        cursor > 0
          ? this.offsetAndType[cursor - 1] & OFFSET_MASK
          : this.firstCharOffset
      switch (stopConsume(this.source.charCodeAt(offset))) {
        case 1:
          break loop
        case 2:
          cursor++
          break loop
        default:
          if (this.balance[balanceEnd] === cursor) cursor = balanceEnd
      }
    }
    this.skip(cursor - this.tokenIndex)
  }

  forEachToken(fn) {
    for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
      const start = offset
      const item = this.offsetAndType[i]
      const end = item & OFFSET_MASK
      const type = item >> TYPE_SHIFT
      offset = end
      fn(type, start, end, i)
    }
  }

  dump() {
    const tokens = new Array(this.tokenCount)
    this.forEachToken((type, start, end, index) => {
      tokens[index] = {
        idx: index,
        type: names_default[type],
        chunk: this.source.substring(start, end),
        balance: this.balance[index],
      }
    })
    return tokens
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/tokenizer/index.js
function tokenize(source, onToken) {
  function getCharCode2(offset2) {
    return offset2 < sourceLength ? source.charCodeAt(offset2) : 0
  }
  function consumeNumericToken() {
    offset = consumeNumber(source, offset)
    if (
      isIdentifierStart(
        getCharCode2(offset),
        getCharCode2(offset + 1),
        getCharCode2(offset + 2),
      )
    ) {
      type = Dimension
      offset = consumeName(source, offset)
      return
    }
    if (getCharCode2(offset) === 37) {
      type = Percentage
      offset++
      return
    }
    type = Number2
  }
  function consumeIdentLikeToken() {
    const nameStartOffset = offset
    offset = consumeName(source, offset)
    if (
      cmpStr(source, nameStartOffset, offset, 'url') &&
      getCharCode2(offset) === 40
    ) {
      offset = findWhiteSpaceEnd(source, offset + 1)
      if (getCharCode2(offset) === 34 || getCharCode2(offset) === 39) {
        type = Function
        offset = nameStartOffset + 4
        return
      }
      consumeUrlToken()
      return
    }
    if (getCharCode2(offset) === 40) {
      type = Function
      offset++
      return
    }
    type = Ident
  }
  function consumeStringToken(endingCodePoint) {
    if (!endingCodePoint) endingCodePoint = getCharCode2(offset++)

    type = String2
    for (; offset < source.length; offset++) {
      const code2 = source.charCodeAt(offset)
      switch (charCodeCategory(code2)) {
        case endingCodePoint:
          offset++
          return
        case WhiteSpaceCategory:
          if (isNewline(code2)) {
            offset += getNewlineLength(source, offset, code2)
            type = BadString
            return
          }
          break
        case 92:
          if (offset === source.length - 1) break

          const nextCode = getCharCode2(offset + 1)
          if (isNewline(nextCode))
            offset += getNewlineLength(source, offset + 1, nextCode)
          else if (isValidEscape(code2, nextCode))
            offset = consumeEscaped(source, offset) - 1

          break
      }
    }
  }
  function consumeUrlToken() {
    type = Url
    offset = findWhiteSpaceEnd(source, offset)
    for (; offset < source.length; offset++) {
      const code2 = source.charCodeAt(offset)
      switch (charCodeCategory(code2)) {
        case 41:
          offset++
          return
        case WhiteSpaceCategory:
          offset = findWhiteSpaceEnd(source, offset)
          if (getCharCode2(offset) === 41 || offset >= source.length) {
            if (offset < source.length) offset++

            return
          }
          offset = consumeBadUrlRemnants(source, offset)
          type = BadUrl
          return
        case 34:
        case 39:
        case 40:
        case NonPrintableCategory:
          offset = consumeBadUrlRemnants(source, offset)
          type = BadUrl
          return
        case 92:
          if (isValidEscape(code2, getCharCode2(offset + 1))) {
            offset = consumeEscaped(source, offset) - 1
            break
          }
          offset = consumeBadUrlRemnants(source, offset)
          type = BadUrl
          return
      }
    }
  }
  source = String(source || '')
  const sourceLength = source.length
  let start = isBOM(getCharCode2(0))
  let offset = start
  let type
  while (offset < sourceLength) {
    const code2 = source.charCodeAt(offset)
    switch (charCodeCategory(code2)) {
      case WhiteSpaceCategory:
        type = WhiteSpace
        offset = findWhiteSpaceEnd(source, offset + 1)
        break
      case 34:
        consumeStringToken()
        break
      case 35:
        if (
          isName(getCharCode2(offset + 1)) ||
          isValidEscape(getCharCode2(offset + 1), getCharCode2(offset + 2))
        ) {
          type = Hash
          offset = consumeName(source, offset + 1)
        } else {
          type = Delim
          offset++
        }
        break
      case 39:
        consumeStringToken()
        break
      case 40:
        type = LeftParenthesis
        offset++
        break
      case 41:
        type = RightParenthesis
        offset++
        break
      case 43:
        if (
          isNumberStart(
            code2,
            getCharCode2(offset + 1),
            getCharCode2(offset + 2),
          )
        ) {
          consumeNumericToken()
        } else {
          type = Delim
          offset++
        }
        break
      case 44:
        type = Comma
        offset++
        break
      case 45:
        if (
          isNumberStart(
            code2,
            getCharCode2(offset + 1),
            getCharCode2(offset + 2),
          )
        ) {
          consumeNumericToken()
        } else {
          if (
            getCharCode2(offset + 1) === 45 &&
            getCharCode2(offset + 2) === 62
          ) {
            type = CDC
            offset = offset + 3
          } else {
            if (
              isIdentifierStart(
                code2,
                getCharCode2(offset + 1),
                getCharCode2(offset + 2),
              )
            ) {
              consumeIdentLikeToken()
            } else {
              type = Delim
              offset++
            }
          }
        }
        break
      case 46:
        if (
          isNumberStart(
            code2,
            getCharCode2(offset + 1),
            getCharCode2(offset + 2),
          )
        ) {
          consumeNumericToken()
        } else {
          type = Delim
          offset++
        }
        break
      case 47:
        if (getCharCode2(offset + 1) === 42) {
          type = Comment
          offset = source.indexOf('*/', offset + 2)
          offset = offset === -1 ? source.length : offset + 2
        } else {
          type = Delim
          offset++
        }
        break
      case 58:
        type = Colon
        offset++
        break
      case 59:
        type = Semicolon
        offset++
        break
      case 60:
        if (
          getCharCode2(offset + 1) === 33 &&
          getCharCode2(offset + 2) === 45 &&
          getCharCode2(offset + 3) === 45
        ) {
          type = CDO
          offset = offset + 4
        } else {
          type = Delim
          offset++
        }
        break
      case 64:
        if (
          isIdentifierStart(
            getCharCode2(offset + 1),
            getCharCode2(offset + 2),
            getCharCode2(offset + 3),
          )
        ) {
          type = AtKeyword
          offset = consumeName(source, offset + 1)
        } else {
          type = Delim
          offset++
        }
        break
      case 91:
        type = LeftSquareBracket
        offset++
        break
      case 92:
        if (isValidEscape(code2, getCharCode2(offset + 1))) {
          consumeIdentLikeToken()
        } else {
          type = Delim
          offset++
        }
        break
      case 93:
        type = RightSquareBracket
        offset++
        break
      case 123:
        type = LeftCurlyBracket
        offset++
        break
      case 125:
        type = RightCurlyBracket
        offset++
        break
      case DigitCategory:
        consumeNumericToken()
        break
      case NameStartCategory:
        consumeIdentLikeToken()
        break
      default:
        type = Delim
        offset++
    }
    onToken(type, start, (start = offset))
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/List.js
let releasedCursors = null
var List = class {
  static createItem(data) {
    return {
      prev: null,
      next: null,
      data,
    }
  }

  constructor() {
    this.head = null
    this.tail = null
    this.cursor = null
  }

  createItem(data) {
    return List.createItem(data)
  }

  // cursor helpers
  allocateCursor(prev, next) {
    let cursor
    if (releasedCursors !== null) {
      cursor = releasedCursors
      releasedCursors = releasedCursors.cursor
      cursor.prev = prev
      cursor.next = next
      cursor.cursor = this.cursor
    } else {
      cursor = {
        prev,
        next,
        cursor: this.cursor,
      }
    }
    this.cursor = cursor
    return cursor
  }

  releaseCursor() {
    const { cursor } = this
    this.cursor = cursor.cursor
    cursor.prev = null
    cursor.next = null
    cursor.cursor = releasedCursors
    releasedCursors = cursor
  }

  updateCursors(prevOld, prevNew, nextOld, nextNew) {
    let { cursor } = this
    while (cursor !== null) {
      if (cursor.prev === prevOld) cursor.prev = prevNew

      if (cursor.next === nextOld) cursor.next = nextNew

      cursor = cursor.cursor
    }
  }

  *[Symbol.iterator]() {
    for (let cursor = this.head; cursor !== null; cursor = cursor.next)
      yield cursor.data
  }

  // getters
  get size() {
    let size = 0
    for (let cursor = this.head; cursor !== null; cursor = cursor.next) size++

    return size
  }

  get isEmpty() {
    return this.head === null
  }

  get first() {
    return this.head && this.head.data
  }

  get last() {
    return this.tail && this.tail.data
  }

  // convertors
  fromArray(array) {
    let cursor = null
    this.head = null
    for (const data of array) {
      const item = List.createItem(data)
      if (cursor !== null) cursor.next = item
      else this.head = item

      item.prev = cursor
      cursor = item
    }
    this.tail = cursor
    return this
  }

  toArray() {
    return [...this]
  }

  toJSON() {
    return [...this]
  }

  // array-like methods
  forEach(fn, thisArg = this) {
    const cursor = this.allocateCursor(null, this.head)
    while (cursor.next !== null) {
      const item = cursor.next
      cursor.next = item.next
      fn.call(thisArg, item.data, item, this)
    }
    this.releaseCursor()
  }

  forEachRight(fn, thisArg = this) {
    const cursor = this.allocateCursor(this.tail, null)
    while (cursor.prev !== null) {
      const item = cursor.prev
      cursor.prev = item.prev
      fn.call(thisArg, item.data, item, this)
    }
    this.releaseCursor()
  }

  reduce(fn, initialValue, thisArg = this) {
    const cursor = this.allocateCursor(null, this.head)
    let acc = initialValue
    let item
    while (cursor.next !== null) {
      item = cursor.next
      cursor.next = item.next
      acc = fn.call(thisArg, acc, item.data, item, this)
    }
    this.releaseCursor()
    return acc
  }

  reduceRight(fn, initialValue, thisArg = this) {
    const cursor = this.allocateCursor(this.tail, null)
    let acc = initialValue
    let item
    while (cursor.prev !== null) {
      item = cursor.prev
      cursor.prev = item.prev
      acc = fn.call(thisArg, acc, item.data, item, this)
    }
    this.releaseCursor()
    return acc
  }

  some(fn, thisArg = this) {
    for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
      if (fn.call(thisArg, cursor.data, cursor, this)) return true
    }
    return false
  }

  map(fn, thisArg = this) {
    const result = new List()
    for (let cursor = this.head; cursor !== null; cursor = cursor.next)
      result.appendData(fn.call(thisArg, cursor.data, cursor, this))

    return result
  }

  filter(fn, thisArg = this) {
    const result = new List()
    for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
      if (fn.call(thisArg, cursor.data, cursor, this))
        result.appendData(cursor.data)
    }
    return result
  }

  nextUntil(start, fn, thisArg = this) {
    if (start === null) return

    const cursor = this.allocateCursor(null, start)
    while (cursor.next !== null) {
      const item = cursor.next
      cursor.next = item.next
      if (fn.call(thisArg, item.data, item, this)) break
    }
    this.releaseCursor()
  }

  prevUntil(start, fn, thisArg = this) {
    if (start === null) return

    const cursor = this.allocateCursor(start, null)
    while (cursor.prev !== null) {
      const item = cursor.prev
      cursor.prev = item.prev
      if (fn.call(thisArg, item.data, item, this)) break
    }
    this.releaseCursor()
  }

  // mutation
  clear() {
    this.head = null
    this.tail = null
  }

  copy() {
    const result = new List()
    for (const data of this) result.appendData(data)

    return result
  }

  prepend(item) {
    this.updateCursors(null, item, this.head, item)
    if (this.head !== null) {
      this.head.prev = item
      item.next = this.head
    } else {
      this.tail = item
    }
    this.head = item
    return this
  }

  prependData(data) {
    return this.prepend(List.createItem(data))
  }

  append(item) {
    return this.insert(item)
  }

  appendData(data) {
    return this.insert(List.createItem(data))
  }

  insert(item, before = null) {
    if (before !== null) {
      this.updateCursors(before.prev, item, before, item)
      if (before.prev === null) {
        if (this.head !== before)
          throw new Error("before doesn't belong to list")

        this.head = item
        before.prev = item
        item.next = before
        this.updateCursors(null, item)
      } else {
        before.prev.next = item
        item.prev = before.prev
        before.prev = item
        item.next = before
      }
    } else {
      this.updateCursors(this.tail, item, null, item)
      if (this.tail !== null) {
        this.tail.next = item
        item.prev = this.tail
      } else {
        this.head = item
      }
      this.tail = item
    }
    return this
  }

  insertData(data, before) {
    return this.insert(List.createItem(data), before)
  }

  remove(item) {
    this.updateCursors(item, item.prev, item, item.next)
    if (item.prev !== null) {
      item.prev.next = item.next
    } else {
      if (this.head !== item) throw new Error("item doesn't belong to list")

      this.head = item.next
    }
    if (item.next !== null) {
      item.next.prev = item.prev
    } else {
      if (this.tail !== item) throw new Error("item doesn't belong to list")

      this.tail = item.prev
    }
    item.prev = null
    item.next = null
    return item
  }

  push(data) {
    this.insert(List.createItem(data))
  }

  pop() {
    return this.tail !== null ? this.remove(this.tail) : null
  }

  unshift(data) {
    this.prepend(List.createItem(data))
  }

  shift() {
    return this.head !== null ? this.remove(this.head) : null
  }

  prependList(list) {
    return this.insertList(list, this.head)
  }

  appendList(list) {
    return this.insertList(list)
  }

  insertList(list, before) {
    if (list.head === null) return this

    if (before !== void 0 && before !== null) {
      this.updateCursors(before.prev, list.tail, before, list.head)
      if (before.prev !== null) {
        before.prev.next = list.head
        list.head.prev = before.prev
      } else {
        this.head = list.head
      }
      before.prev = list.tail
      list.tail.next = before
    } else {
      this.updateCursors(this.tail, list.tail, null, list.head)
      if (this.tail !== null) {
        this.tail.next = list.head
        list.head.prev = this.tail
      } else {
        this.head = list.head
      }
      this.tail = list.tail
    }
    list.head = null
    list.tail = null
    return this
  }

  replace(oldItem, newItemOrList) {
    if ('head' in newItemOrList) this.insertList(newItemOrList, oldItem)
    else this.insert(newItemOrList, oldItem)

    this.remove(oldItem)
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/create-custom-error.js
function createCustomError(name42, message) {
  const error = Object.create(SyntaxError.prototype)
  const errorStack = new Error()
  return Object.assign(error, {
    name: name42,
    message,
    get stack() {
      return (errorStack.stack || '').replace(
        /^(.+\n){1,3}/,
        `${name42}: ${message}
`,
      )
    },
  })
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/parser/SyntaxError.js
const MAX_LINE_LENGTH = 100
const OFFSET_CORRECTION = 60
const TAB_REPLACEMENT = '    '
function sourceFragment({ source, line, column }, extraLines) {
  function processLines(start, end) {
    return lines
      .slice(start, end)
      .map(
        (line2, idx) =>
          `${String(start + idx + 1).padStart(maxNumLength)} |${line2}`,
      )
      .join('\n')
  }
  const lines = source.split(/\r\n?|\n|\f/)
  const startLine = Math.max(1, line - extraLines) - 1
  const endLine = Math.min(line + extraLines, lines.length + 1)
  const maxNumLength = Math.max(4, String(endLine).length) + 1
  let cutLeft = 0
  column +=
    (TAB_REPLACEMENT.length - 1) *
    (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length
  if (column > MAX_LINE_LENGTH) {
    cutLeft = column - OFFSET_CORRECTION + 3
    column = OFFSET_CORRECTION - 2
  }
  for (let i = startLine; i <= endLine; i++) {
    if (i >= 0 && i < lines.length) {
      lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT)
      lines[i] =
        (cutLeft > 0 && lines[i].length > cutLeft ? '…' : '') +
        lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
        (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '…' : '')
    }
  }
  return [
    processLines(startLine, line),
    `${new Array(column + maxNumLength + 2).join('-')}^`,
    processLines(line, endLine),
  ]
    .filter(Boolean)
    .join('\n')
}
function SyntaxError2(message, source, offset, line, column) {
  const error = Object.assign(createCustomError('SyntaxError', message), {
    source,
    offset,
    line,
    column,
    sourceFragment(extraLines) {
      return sourceFragment(
        { source, line, column },
        isNaN(extraLines) ? 0 : extraLines,
      )
    },
    get formattedMessage() {
      return `Parse error: ${message}
${sourceFragment({ source, line, column }, 2)}`
    },
  })
  return error
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/parser/sequence.js
function readSequence(recognizer) {
  const children = this.createList()
  let space = false
  const context = {
    recognizer,
  }
  while (!this.eof) {
    switch (this.tokenType) {
      case Comment:
        this.next()
        continue
      case WhiteSpace:
        space = true
        this.next()
        continue
    }
    const child = recognizer.getNode.call(this, context)
    if (child === void 0) break

    if (space) {
      if (recognizer.onWhiteSpace)
        recognizer.onWhiteSpace.call(this, child, children, context)

      space = false
    }
    children.push(child)
  }
  if (space && recognizer.onWhiteSpace)
    recognizer.onWhiteSpace.call(this, null, children, context)

  return children
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/parser/create.js
const NOOP = () => {}
const EXCLAMATIONMARK = 33
const NUMBERSIGN = 35
const SEMICOLON = 59
const LEFTCURLYBRACKET = 123
const NULL = 0
function createParseContext(name42) {
  return function () {
    return this[name42]()
  }
}
function fetchParseValues(dict) {
  const result = /* @__PURE__ */ Object.create(null)
  for (const name42 in dict) {
    const item = dict[name42]
    const fn = item.parse || item
    if (fn) result[name42] = fn
  }
  return result
}
function processConfig(config) {
  const parseConfig = {
    context: /* @__PURE__ */ Object.create(null),
    scope: Object.assign(/* @__PURE__ */ Object.create(null), config.scope),
    atrule: fetchParseValues(config.atrule),
    pseudo: fetchParseValues(config.pseudo),
    node: fetchParseValues(config.node),
  }
  for (const name42 in config.parseContext) {
    switch (typeof config.parseContext[name42]) {
      case 'function':
        parseConfig.context[name42] = config.parseContext[name42]
        break
      case 'string':
        parseConfig.context[name42] = createParseContext(
          config.parseContext[name42],
        )
        break
    }
  }
  return {
    config: parseConfig,
    ...parseConfig,
    ...parseConfig.node,
  }
}
function createParser(config) {
  let source = ''
  let filename = '<unknown>'
  let needPositions = false
  let onParseError = NOOP
  let onParseErrorThrow = false
  const locationMap = new OffsetToLocation()
  const parser = Object.assign(new TokenStream(), processConfig(config || {}), {
    parseAtrulePrelude: true,
    parseRulePrelude: true,
    parseValue: true,
    parseCustomProperty: false,
    readSequence,
    consumeUntilBalanceEnd: () => 0,
    consumeUntilLeftCurlyBracket(code2) {
      return code2 === LEFTCURLYBRACKET ? 1 : 0
    },
    consumeUntilLeftCurlyBracketOrSemicolon(code2) {
      return code2 === LEFTCURLYBRACKET || code2 === SEMICOLON ? 1 : 0
    },
    consumeUntilExclamationMarkOrSemicolon(code2) {
      return code2 === EXCLAMATIONMARK || code2 === SEMICOLON ? 1 : 0
    },
    consumeUntilSemicolonIncluded(code2) {
      return code2 === SEMICOLON ? 2 : 0
    },
    createList() {
      return new List()
    },
    createSingleNodeList(node) {
      return new List().appendData(node)
    },
    getFirstListNode(list) {
      return list && list.first
    },
    getLastListNode(list) {
      return list && list.last
    },
    parseWithFallback(consumer, fallback) {
      const startToken = this.tokenIndex
      try {
        return consumer.call(this)
      } catch (e2) {
        if (onParseErrorThrow) throw e2

        const fallbackNode = fallback.call(this, startToken)
        onParseErrorThrow = true
        onParseError(e2, fallbackNode)
        onParseErrorThrow = false
        return fallbackNode
      }
    },
    lookupNonWSType(offset) {
      let type
      do {
        type = this.lookupType(offset++)
        if (type !== WhiteSpace) return type
      } while (type !== NULL)
      return NULL
    },
    charCodeAt(offset) {
      return offset >= 0 && offset < source.length
        ? source.charCodeAt(offset)
        : 0
    },
    substring(offsetStart, offsetEnd) {
      return source.substring(offsetStart, offsetEnd)
    },
    substrToCursor(start) {
      return this.source.substring(start, this.tokenStart)
    },
    cmpChar(offset, charCode) {
      return cmpChar(source, offset, charCode)
    },
    cmpStr(offsetStart, offsetEnd, str) {
      return cmpStr(source, offsetStart, offsetEnd, str)
    },
    consume(tokenType2) {
      const start = this.tokenStart
      this.eat(tokenType2)
      return this.substrToCursor(start)
    },
    consumeFunctionName() {
      const name42 = source.substring(this.tokenStart, this.tokenEnd - 1)
      this.eat(Function)
      return name42
    },
    consumeNumber(type) {
      const number3 = source.substring(
        this.tokenStart,
        consumeNumber(source, this.tokenStart),
      )
      this.eat(type)
      return number3
    },
    eat(tokenType2) {
      if (this.tokenType !== tokenType2) {
        const tokenName = names_default[tokenType2]
          .slice(0, -6)
          .replace(/-/g, ' ')
          .replace(/^./, (m) => m.toUpperCase())
        let message = `${
          /[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName
        } is expected`
        let offset = this.tokenStart
        switch (tokenType2) {
          case Ident:
            if (this.tokenType === Function || this.tokenType === Url) {
              offset = this.tokenEnd - 1
              message = 'Identifier is expected but function found'
            } else {
              message = 'Identifier is expected'
            }
            break
          case Hash:
            if (this.isDelim(NUMBERSIGN)) {
              this.next()
              offset++
              message = 'Name is expected'
            }
            break
          case Percentage:
            if (this.tokenType === Number2) {
              offset = this.tokenEnd
              message = 'Percent sign is expected'
            }
            break
        }
        this.error(message, offset)
      }
      this.next()
    },
    eatIdent(name42) {
      if (this.tokenType !== Ident || this.lookupValue(0, name42) === false)
        this.error(`Identifier "${name42}" is expected`)

      this.next()
    },
    eatDelim(code2) {
      if (!this.isDelim(code2))
        this.error(`Delim "${String.fromCharCode(code2)}" is expected`)

      this.next()
    },
    getLocation(start, end) {
      if (needPositions) {
        return locationMap.getLocationRange(start, end, filename)
      }
      return null
    },
    getLocationFromList(list) {
      if (needPositions) {
        const head = this.getFirstListNode(list)
        const tail = this.getLastListNode(list)
        return locationMap.getLocationRange(
          head !== null
            ? head.loc.start.offset - locationMap.startOffset
            : this.tokenStart,
          tail !== null
            ? tail.loc.end.offset - locationMap.startOffset
            : this.tokenStart,
          filename,
        )
      }
      return null
    },
    error(message, offset) {
      const location =
        typeof offset !== 'undefined' && offset < source.length
          ? locationMap.getLocation(offset)
          : this.eof
          ? locationMap.getLocation(
              findWhiteSpaceStart(source, source.length - 1),
            )
          : locationMap.getLocation(this.tokenStart)
      throw new SyntaxError2(
        message || 'Unexpected input',
        source,
        location.offset,
        location.line,
        location.column,
      )
    },
  })
  const parse44 = function (source_, options) {
    source = source_
    options = options || {}
    parser.setSource(source, tokenize)
    locationMap.setSource(source, options.offset, options.line, options.column)
    filename = options.filename || '<unknown>'
    needPositions = Boolean(options.positions)
    onParseError =
      typeof options.onParseError === 'function' ? options.onParseError : NOOP
    onParseErrorThrow = false
    parser.parseAtrulePrelude =
      'parseAtrulePrelude' in options
        ? Boolean(options.parseAtrulePrelude)
        : true
    parser.parseRulePrelude =
      'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true
    parser.parseValue =
      'parseValue' in options ? Boolean(options.parseValue) : true
    parser.parseCustomProperty =
      'parseCustomProperty' in options
        ? Boolean(options.parseCustomProperty)
        : false
    const { context = 'default', onComment } = options
    if (context in parser.context === false)
      throw new Error(`Unknown context \`${context}\``)

    if (typeof onComment === 'function') {
      parser.forEachToken((type, start, end) => {
        if (type === Comment) {
          const loc = parser.getLocation(start, end)
          const value = cmpStr(source, end - 2, end, '*/')
            ? source.slice(start + 2, end - 2)
            : source.slice(start + 2, end)
          onComment(value, loc)
        }
      })
    }
    const ast = parser.context[context].call(parser, options)
    if (!parser.eof) parser.error()

    return ast
  }
  return Object.assign(parse44, {
    SyntaxError: SyntaxError2,
    config: parser.config,
  })
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/generator/sourceMap.js
const import_source_map_generator = __toESM(require_source_map_generator(), 1)
const trackNodes = /* @__PURE__ */ new Set([
  'Atrule',
  'Selector',
  'Declaration',
])
function generateSourceMap(handlers) {
  const map = new import_source_map_generator.SourceMapGenerator()
  const generated = {
    line: 1,
    column: 0,
  }
  const original = {
    line: 0,
    // should be zero to add first mapping
    column: 0,
  }
  const activatedGenerated = {
    line: 1,
    column: 0,
  }
  const activatedMapping = {
    generated: activatedGenerated,
  }
  let line = 1
  let column = 0
  let sourceMappingActive = false
  const origHandlersNode = handlers.node
  handlers.node = function (node) {
    if (node.loc && node.loc.start && trackNodes.has(node.type)) {
      const nodeLine = node.loc.start.line
      const nodeColumn = node.loc.start.column - 1
      if (original.line !== nodeLine || original.column !== nodeColumn) {
        original.line = nodeLine
        original.column = nodeColumn
        generated.line = line
        generated.column = column
        if (sourceMappingActive) {
          sourceMappingActive = false
          if (
            generated.line !== activatedGenerated.line ||
            generated.column !== activatedGenerated.column
          )
            map.addMapping(activatedMapping)
        }
        sourceMappingActive = true
        map.addMapping({
          source: node.loc.source,
          original,
          generated,
        })
      }
    }
    origHandlersNode.call(this, node)
    if (sourceMappingActive && trackNodes.has(node.type)) {
      activatedGenerated.line = line
      activatedGenerated.column = column
    }
  }
  const origHandlersEmit = handlers.emit
  handlers.emit = function (value, type, auto2) {
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) === 10) {
        line++
        column = 0
      } else {
        column++
      }
    }
    origHandlersEmit(value, type, auto2)
  }
  const origHandlersResult = handlers.result
  handlers.result = function () {
    if (sourceMappingActive) map.addMapping(activatedMapping)

    return {
      css: origHandlersResult(),
      map,
    }
  }
  return handlers
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/generator/token-before.js
const token_before_exports = {}
__export(token_before_exports, {
  safe: () => safe,
  spec: () => spec,
})
const PLUSSIGN = 43
const HYPHENMINUS = 45
const code = (type, value) => {
  if (type === Delim) type = value

  if (typeof type === 'string') {
    const charCode = type.charCodeAt(0)
    return charCode > 127 ? 32768 : charCode << 8
  }
  return type
}
const specPairs = [
  [Ident, Ident],
  [Ident, Function],
  [Ident, Url],
  [Ident, BadUrl],
  [Ident, '-'],
  [Ident, Number2],
  [Ident, Percentage],
  [Ident, Dimension],
  [Ident, CDC],
  [Ident, LeftParenthesis],
  [AtKeyword, Ident],
  [AtKeyword, Function],
  [AtKeyword, Url],
  [AtKeyword, BadUrl],
  [AtKeyword, '-'],
  [AtKeyword, Number2],
  [AtKeyword, Percentage],
  [AtKeyword, Dimension],
  [AtKeyword, CDC],
  [Hash, Ident],
  [Hash, Function],
  [Hash, Url],
  [Hash, BadUrl],
  [Hash, '-'],
  [Hash, Number2],
  [Hash, Percentage],
  [Hash, Dimension],
  [Hash, CDC],
  [Dimension, Ident],
  [Dimension, Function],
  [Dimension, Url],
  [Dimension, BadUrl],
  [Dimension, '-'],
  [Dimension, Number2],
  [Dimension, Percentage],
  [Dimension, Dimension],
  [Dimension, CDC],
  ['#', Ident],
  ['#', Function],
  ['#', Url],
  ['#', BadUrl],
  ['#', '-'],
  ['#', Number2],
  ['#', Percentage],
  ['#', Dimension],
  ['#', CDC],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ['-', Ident],
  ['-', Function],
  ['-', Url],
  ['-', BadUrl],
  ['-', '-'],
  ['-', Number2],
  ['-', Percentage],
  ['-', Dimension],
  ['-', CDC],
  // https://github.com/w3c/csswg-drafts/pull/6874
  [Number2, Ident],
  [Number2, Function],
  [Number2, Url],
  [Number2, BadUrl],
  [Number2, Number2],
  [Number2, Percentage],
  [Number2, Dimension],
  [Number2, '%'],
  [Number2, CDC],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ['@', Ident],
  ['@', Function],
  ['@', Url],
  ['@', BadUrl],
  ['@', '-'],
  ['@', CDC],
  // https://github.com/w3c/csswg-drafts/pull/6874
  ['.', Number2],
  ['.', Percentage],
  ['.', Dimension],
  ['+', Number2],
  ['+', Percentage],
  ['+', Dimension],
  ['/', '*'],
]
const safePairs = specPairs.concat([
  [Ident, Hash],
  [Dimension, Hash],
  [Hash, Hash],
  [AtKeyword, LeftParenthesis],
  [AtKeyword, String2],
  [AtKeyword, Colon],
  [Percentage, Percentage],
  [Percentage, Dimension],
  [Percentage, Function],
  [Percentage, '-'],
  [RightParenthesis, Ident],
  [RightParenthesis, Function],
  [RightParenthesis, Percentage],
  [RightParenthesis, Dimension],
  [RightParenthesis, Hash],
  [RightParenthesis, '-'],
])
function createMap(pairs) {
  const isWhiteSpaceRequired = new Set(
    pairs.map(([prev, next]) => (code(prev) << 16) | code(next)),
  )
  return function (prevCode, type, value) {
    const nextCode = code(type, value)
    const nextCharCode = value.charCodeAt(0)
    const emitWs =
      (nextCharCode === HYPHENMINUS &&
        type !== Ident &&
        type !== Function &&
        type !== CDC) ||
      nextCharCode === PLUSSIGN
        ? isWhiteSpaceRequired.has((prevCode << 16) | (nextCharCode << 8))
        : isWhiteSpaceRequired.has((prevCode << 16) | nextCode)
    if (emitWs) this.emit(' ', WhiteSpace, true)

    return nextCode
  }
}
var spec = createMap(specPairs)
var safe = createMap(safePairs)

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/generator/create.js
const REVERSESOLIDUS = 92
function processChildren(node, delimeter) {
  if (typeof delimeter === 'function') {
    let prev = null
    node.children.forEach((node2) => {
      if (prev !== null) delimeter.call(this, prev)

      this.node(node2)
      prev = node2
    })
    return
  }
  node.children.forEach(this.node, this)
}
function processChunk(chunk) {
  tokenize(chunk, (type, start, end) => {
    this.token(type, chunk.slice(start, end))
  })
}
function createGenerator2(config) {
  const types = /* @__PURE__ */ new Map()
  for (const name42 in config.node) {
    const item = config.node[name42]
    const fn = item.generate || item
    if (typeof fn === 'function') types.set(name42, item.generate || item)
  }
  return function (node, options) {
    let buffer = ''
    let prevCode = 0
    let handlers = {
      node(node2) {
        if (types.has(node2.type)) types.get(node2.type).call(publicApi, node2)
        else throw new Error(`Unknown node type: ${node2.type}`)
      },
      tokenBefore: safe,
      token(type, value) {
        prevCode = this.tokenBefore(prevCode, type, value)
        this.emit(value, type, false)
        if (type === Delim && value.charCodeAt(0) === REVERSESOLIDUS)
          this.emit('\n', WhiteSpace, true)
      },
      emit(value) {
        buffer += value
      },
      result() {
        return buffer
      },
    }
    if (options) {
      if (typeof options.decorator === 'function')
        handlers = options.decorator(handlers)

      if (options.sourceMap) handlers = generateSourceMap(handlers)

      if (options.mode in token_before_exports)
        handlers.tokenBefore = token_before_exports[options.mode]
    }
    const publicApi = {
      node: (node2) => handlers.node(node2),
      children: processChildren,
      token: (type, value) => handlers.token(type, value),
      tokenize: processChunk,
    }
    handlers.node(node)
    return handlers.result()
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/convertor/create.js
function createConvertor(walk3) {
  return {
    fromPlainObject(ast) {
      walk3(ast, {
        enter(node) {
          if (node.children && node.children instanceof List === false)
            node.children = new List().fromArray(node.children)
        },
      })
      return ast
    },
    toPlainObject(ast) {
      walk3(ast, {
        leave(node) {
          if (node.children && node.children instanceof List)
            node.children = node.children.toArray()
        },
      })
      return ast
    },
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/walker/create.js
const { hasOwnProperty: hasOwnProperty2 } = Object.prototype
const noop = function () {}
function ensureFunction(value) {
  return typeof value === 'function' ? value : noop
}
function invokeForType(fn, type) {
  return function (node, item, list) {
    if (node.type === type) fn.call(this, node, item, list)
  }
}
function getWalkersFromStructure(name42, nodeType) {
  const structure42 = nodeType.structure
  const walkers = []
  for (const key in structure42) {
    if (hasOwnProperty2.call(structure42, key) === false) continue

    let fieldTypes = structure42[key]
    const walker = {
      name: key,
      type: false,
      nullable: false,
    }
    if (!Array.isArray(fieldTypes)) fieldTypes = [fieldTypes]

    for (const fieldType of fieldTypes) {
      if (fieldType === null) walker.nullable = true
      else if (typeof fieldType === 'string') walker.type = 'node'
      else if (Array.isArray(fieldType)) walker.type = 'list'
    }
    if (walker.type) walkers.push(walker)
  }
  if (walkers.length) {
    return {
      context: nodeType.walkContext,
      fields: walkers,
    }
  }
  return null
}
function getTypesFromConfig(config) {
  const types = {}
  for (const name42 in config.node) {
    if (hasOwnProperty2.call(config.node, name42)) {
      const nodeType = config.node[name42]
      if (!nodeType.structure)
        throw new Error(
          `Missed \`structure\` field in \`${name42}\` node type definition`,
        )

      types[name42] = getWalkersFromStructure(name42, nodeType)
    }
  }
  return types
}
function createTypeIterator(config, reverse) {
  const fields = config.fields.slice()
  const contextName = config.context
  const useContext = typeof contextName === 'string'
  if (reverse) fields.reverse()

  return function (node, context, walk3, walkReducer) {
    let prevContextValue
    if (useContext) {
      prevContextValue = context[contextName]
      context[contextName] = node
    }
    for (const field of fields) {
      const ref = node[field.name]
      if (!field.nullable || ref) {
        if (field.type === 'list') {
          const breakWalk = reverse
            ? ref.reduceRight(walkReducer, false)
            : ref.reduce(walkReducer, false)
          if (breakWalk) return true
        } else if (walk3(ref)) {
          return true
        }
      }
    }
    if (useContext) context[contextName] = prevContextValue
  }
}
function createFastTraveralMap({
  StyleSheet,
  Atrule,
  Rule,
  Block,
  DeclarationList,
}) {
  return {
    Atrule: {
      StyleSheet,
      Atrule,
      Rule,
      Block,
    },
    Rule: {
      StyleSheet,
      Atrule,
      Rule,
      Block,
    },
    Declaration: {
      StyleSheet,
      Atrule,
      Rule,
      Block,
      DeclarationList,
    },
  }
}
function createWalker(config) {
  const types = getTypesFromConfig(config)
  const iteratorsNatural = {}
  const iteratorsReverse = {}
  const breakWalk = Symbol('break-walk')
  const skipNode = Symbol('skip-node')
  for (const name42 in types) {
    if (hasOwnProperty2.call(types, name42) && types[name42] !== null) {
      iteratorsNatural[name42] = createTypeIterator(types[name42], false)
      iteratorsReverse[name42] = createTypeIterator(types[name42], true)
    }
  }
  const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural)
  const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse)
  const walk3 = function (root, options) {
    function walkNode(node, item, list) {
      const enterRet = enter.call(context, node, item, list)
      if (enterRet === breakWalk) return true

      if (enterRet === skipNode) return false

      if (iterators.hasOwnProperty(node.type)) {
        if (iterators[node.type](node, context, walkNode, walkReducer))
          return true
      }
      if (leave.call(context, node, item, list) === breakWalk) return true

      return false
    }
    let enter = noop
    let leave = noop
    let iterators = iteratorsNatural
    let walkReducer = (ret, data, item, list) =>
      ret || walkNode(data, item, list)
    const context = {
      break: breakWalk,
      skip: skipNode,
      root,
      stylesheet: null,
      atrule: null,
      atrulePrelude: null,
      rule: null,
      selector: null,
      block: null,
      declaration: null,
      function: null,
    }
    if (typeof options === 'function') {
      enter = options
    } else if (options) {
      enter = ensureFunction(options.enter)
      leave = ensureFunction(options.leave)
      if (options.reverse) iterators = iteratorsReverse

      if (options.visit) {
        if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit))
          iterators = options.reverse
            ? fastTraversalIteratorsReverse[options.visit]
            : fastTraversalIteratorsNatural[options.visit]
        else if (!types.hasOwnProperty(options.visit))
          throw new Error(
            `Bad value \`${
              options.visit
            }\` for \`visit\` option (should be: ${Object.keys(types)
              .sort()
              .join(', ')})`,
          )

        enter = invokeForType(enter, options.visit)
        leave = invokeForType(leave, options.visit)
      }
    }
    if (enter === noop && leave === noop)
      throw new Error(
        "Neither `enter` nor `leave` walker handler is set or both aren't a function",
      )

    walkNode(root)
  }
  walk3.break = breakWalk
  walk3.skip = skipNode
  walk3.find = function (ast, fn) {
    let found = null
    walk3(ast, function (node, item, list) {
      if (fn.call(this, node, item, list)) {
        found = node
        return breakWalk
      }
    })
    return found
  }
  walk3.findLast = function (ast, fn) {
    let found = null
    walk3(ast, {
      reverse: true,
      enter(node, item, list) {
        if (fn.call(this, node, item, list)) {
          found = node
          return breakWalk
        }
      },
    })
    return found
  }
  walk3.findAll = function (ast, fn) {
    const found = []
    walk3(ast, function (node, item, list) {
      if (fn.call(this, node, item, list)) found.push(node)
    })
    return found
  }
  return walk3
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/generate.js
function noop2(value) {
  return value
}
function generateMultiplier(multiplier) {
  const { min, max, comma } = multiplier
  if (min === 0 && max === 0) return comma ? '#?' : '*'

  if (min === 0 && max === 1) return '?'

  if (min === 1 && max === 0) return comma ? '#' : '+'

  if (min === 1 && max === 1) return ''

  return (
    (comma ? '#' : '') +
    (min === max ? `{${min}}` : `{${min},${max !== 0 ? max : ''}}`)
  )
}
function generateTypeOpts(node) {
  switch (node.type) {
    case 'Range':
      return ` [${node.min === null ? '-∞' : node.min},${
        node.max === null ? '∞' : node.max
      }]`
    default:
      throw new Error(`Unknown node type \`${node.type}\``)
  }
}
function generateSequence(node, decorate, forceBraces, compact) {
  const combinator =
    node.combinator === ' ' || compact
      ? node.combinator
      : ` ${node.combinator} `
  const result = node.terms
    .map((term) => internalGenerate(term, decorate, forceBraces, compact))
    .join(combinator)
  if (node.explicit || forceBraces)
    return (
      (compact || result[0] === ',' ? '[' : '[ ') +
      result +
      (compact ? ']' : ' ]')
    )

  return result
}
function internalGenerate(node, decorate, forceBraces, compact) {
  let result
  switch (node.type) {
    case 'Group':
      result =
        generateSequence(node, decorate, forceBraces, compact) +
        (node.disallowEmpty ? '!' : '')
      break
    case 'Multiplier':
      return (
        internalGenerate(node.term, decorate, forceBraces, compact) +
        decorate(generateMultiplier(node), node)
      )
    case 'Type':
      result = `<${node.name}${
        node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : ''
      }>`
      break
    case 'Property':
      result = `<'${node.name}'>`
      break
    case 'Keyword':
      result = node.name
      break
    case 'AtKeyword':
      result = `@${node.name}`
      break
    case 'Function':
      result = `${node.name}(`
      break
    case 'String':
    case 'Token':
      result = node.value
      break
    case 'Comma':
      result = ','
      break
    default:
      throw new Error(`Unknown node type \`${node.type}\``)
  }
  return decorate(result, node)
}
function generate(node, options) {
  let decorate = noop2
  let forceBraces = false
  let compact = false
  if (typeof options === 'function') {
    decorate = options
  } else if (options) {
    forceBraces = Boolean(options.forceBraces)
    compact = Boolean(options.compact)
    if (typeof options.decorate === 'function') decorate = options.decorate
  }
  return internalGenerate(node, decorate, forceBraces, compact)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/error.js
const defaultLoc = { offset: 0, line: 1, column: 1 }
function locateMismatch(matchResult, node) {
  const tokens = matchResult.tokens
  const longestMatch = matchResult.longestMatch
  const mismatchNode =
    longestMatch < tokens.length ? tokens[longestMatch].node || null : null
  const badNode = mismatchNode !== node ? mismatchNode : null
  let mismatchOffset = 0
  let mismatchLength = 0
  let entries = 0
  let css = ''
  let start
  let end
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].value
    if (i === longestMatch) {
      mismatchLength = token.length
      mismatchOffset = css.length
    }
    if (badNode !== null && tokens[i].node === badNode) {
      if (i <= longestMatch) entries++
      else entries = 0
    }
    css += token
  }
  if (longestMatch === tokens.length || entries > 1) {
    start = fromLoc(badNode || node, 'end') || buildLoc(defaultLoc, css)
    end = buildLoc(start)
  } else {
    start =
      fromLoc(badNode, 'start') ||
      buildLoc(
        fromLoc(node, 'start') || defaultLoc,
        css.slice(0, mismatchOffset),
      )
    end =
      fromLoc(badNode, 'end') ||
      buildLoc(start, css.substr(mismatchOffset, mismatchLength))
  }
  return {
    css,
    mismatchOffset,
    mismatchLength,
    start,
    end,
  }
}
function fromLoc(node, point) {
  const value = node && node.loc && node.loc[point]
  if (value) return 'line' in value ? buildLoc(value) : value

  return null
}
function buildLoc({ offset, line, column }, extra) {
  const loc = {
    offset,
    line,
    column,
  }
  if (extra) {
    const lines = extra.split(/\n|\r\n?|\f/)
    loc.offset += extra.length
    loc.line += lines.length - 1
    loc.column =
      lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1
  }
  return loc
}
const SyntaxReferenceError = function (type, referenceName) {
  const error = createCustomError(
    'SyntaxReferenceError',
    type + (referenceName ? ` \`${referenceName}\`` : ''),
  )
  error.reference = referenceName
  return error
}
const SyntaxMatchError = function (message, syntax, node, matchResult) {
  const error = createCustomError('SyntaxMatchError', message)
  const { css, mismatchOffset, mismatchLength, start, end } = locateMismatch(
    matchResult,
    node,
  )
  error.rawMessage = message
  error.syntax = syntax ? generate(syntax) : '<generic>'
  error.css = css
  error.mismatchOffset = mismatchOffset
  error.mismatchLength = mismatchLength
  error.message = `${message}\n  syntax: ${error.syntax}\n   value: ${
    css || '<empty string>'
  }\n  --------${new Array(error.mismatchOffset + 1).join('-')}^`
  Object.assign(error, start)
  error.loc = {
    source: (node && node.loc && node.loc.source) || '<unknown>',
    start,
    end,
  }
  return error
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/names.js
const keywords = /* @__PURE__ */ new Map()
const properties2 = /* @__PURE__ */ new Map()
const HYPHENMINUS2 = 45
const keyword = getKeywordDescriptor
const property = getPropertyDescriptor
function isCustomProperty(str, offset) {
  offset = offset || 0
  return (
    str.length - offset >= 2 &&
    str.charCodeAt(offset) === HYPHENMINUS2 &&
    str.charCodeAt(offset + 1) === HYPHENMINUS2
  )
}
function getVendorPrefix(str, offset) {
  offset = offset || 0
  if (str.length - offset >= 3) {
    if (
      str.charCodeAt(offset) === HYPHENMINUS2 &&
      str.charCodeAt(offset + 1) !== HYPHENMINUS2
    ) {
      const secondDashIndex = str.indexOf('-', offset + 2)
      if (secondDashIndex !== -1)
        return str.substring(offset, secondDashIndex + 1)
    }
  }
  return ''
}
function getKeywordDescriptor(keyword2) {
  if (keywords.has(keyword2)) return keywords.get(keyword2)

  const name42 = keyword2.toLowerCase()
  let descriptor = keywords.get(name42)
  if (descriptor === void 0) {
    const custom = isCustomProperty(name42, 0)
    const vendor = !custom ? getVendorPrefix(name42, 0) : ''
    descriptor = Object.freeze({
      basename: name42.substr(vendor.length),
      name: name42,
      prefix: vendor,
      vendor,
      custom,
    })
  }
  keywords.set(keyword2, descriptor)
  return descriptor
}
function getPropertyDescriptor(property2) {
  if (properties2.has(property2)) return properties2.get(property2)

  let name42 = property2
  let hack = property2[0]
  if (hack === '/') hack = property2[1] === '/' ? '//' : '/'
  else if (
    hack !== '_' &&
    hack !== '*' &&
    hack !== '$' &&
    hack !== '#' &&
    hack !== '+' &&
    hack !== '&'
  )
    hack = ''

  const custom = isCustomProperty(name42, hack.length)
  if (!custom) {
    name42 = name42.toLowerCase()
    if (properties2.has(name42)) {
      const descriptor2 = properties2.get(name42)
      properties2.set(property2, descriptor2)
      return descriptor2
    }
  }
  const vendor = !custom ? getVendorPrefix(name42, hack.length) : ''
  const prefix = name42.substr(0, hack.length + vendor.length)
  const descriptor = Object.freeze({
    basename: name42.substr(prefix.length),
    name: name42.substr(hack.length),
    hack,
    vendor,
    prefix,
    custom,
  })
  properties2.set(property2, descriptor)
  return descriptor
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/generic-const.js
const cssWideKeywords = [
  'initial',
  'inherit',
  'unset',
  'revert',
  'revert-layer',
]

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/generic-an-plus-b.js
const PLUSSIGN2 = 43
const HYPHENMINUS3 = 45
const N2 = 110
const DISALLOW_SIGN = true
const ALLOW_SIGN = false
function isDelim(token, code2) {
  return (
    token !== null &&
    token.type === Delim &&
    token.value.charCodeAt(0) === code2
  )
}
function skipSC(token, offset, getNextToken) {
  while (
    token !== null &&
    (token.type === WhiteSpace || token.type === Comment)
  )
    token = getNextToken(++offset)

  return offset
}
function checkInteger(token, valueOffset, disallowSign, offset) {
  if (!token) return 0

  const code2 = token.value.charCodeAt(valueOffset)
  if (code2 === PLUSSIGN2 || code2 === HYPHENMINUS3) {
    if (disallowSign) return 0

    valueOffset++
  }
  for (; valueOffset < token.value.length; valueOffset++) {
    if (!isDigit(token.value.charCodeAt(valueOffset))) return 0
  }
  return offset + 1
}
function consumeB(token, offset_, getNextToken) {
  let sign = false
  let offset = skipSC(token, offset_, getNextToken)
  token = getNextToken(offset)
  if (token === null) return offset_

  if (token.type !== Number2) {
    if (isDelim(token, PLUSSIGN2) || isDelim(token, HYPHENMINUS3)) {
      sign = true
      offset = skipSC(getNextToken(++offset), offset, getNextToken)
      token = getNextToken(offset)
      if (token === null || token.type !== Number2) return 0
    } else {
      return offset_
    }
  }
  if (!sign) {
    const code2 = token.value.charCodeAt(0)
    if (code2 !== PLUSSIGN2 && code2 !== HYPHENMINUS3) return 0
  }
  return checkInteger(token, sign ? 0 : 1, sign, offset)
}
function anPlusB(token, getNextToken) {
  let offset = 0
  if (!token) return 0

  if (token.type === Number2) {
    return checkInteger(token, 0, ALLOW_SIGN, offset)
  } else if (
    token.type === Ident &&
    token.value.charCodeAt(0) === HYPHENMINUS3
  ) {
    if (!cmpChar(token.value, 1, N2)) return 0

    switch (token.value.length) {
      case 2:
        return consumeB(getNextToken(++offset), offset, getNextToken)
      case 3:
        if (token.value.charCodeAt(2) !== HYPHENMINUS3) return 0

        offset = skipSC(getNextToken(++offset), offset, getNextToken)
        token = getNextToken(offset)
        return checkInteger(token, 0, DISALLOW_SIGN, offset)
      default:
        if (token.value.charCodeAt(2) !== HYPHENMINUS3) return 0

        return checkInteger(token, 3, DISALLOW_SIGN, offset)
    }
  } else if (
    token.type === Ident ||
    (isDelim(token, PLUSSIGN2) && getNextToken(offset + 1).type === Ident)
  ) {
    if (token.type !== Ident) token = getNextToken(++offset)

    if (token === null || !cmpChar(token.value, 0, N2)) return 0

    switch (token.value.length) {
      case 1:
        return consumeB(getNextToken(++offset), offset, getNextToken)
      case 2:
        if (token.value.charCodeAt(1) !== HYPHENMINUS3) return 0

        offset = skipSC(getNextToken(++offset), offset, getNextToken)
        token = getNextToken(offset)
        return checkInteger(token, 0, DISALLOW_SIGN, offset)
      default:
        if (token.value.charCodeAt(1) !== HYPHENMINUS3) return 0

        return checkInteger(token, 2, DISALLOW_SIGN, offset)
    }
  } else if (token.type === Dimension) {
    const code2 = token.value.charCodeAt(0)
    const sign = code2 === PLUSSIGN2 || code2 === HYPHENMINUS3 ? 1 : 0
    let i = sign
    for (; i < token.value.length; i++) {
      if (!isDigit(token.value.charCodeAt(i))) break
    }
    if (i === sign) return 0

    if (!cmpChar(token.value, i, N2)) return 0

    if (i + 1 === token.value.length) {
      return consumeB(getNextToken(++offset), offset, getNextToken)
    } else {
      if (token.value.charCodeAt(i + 1) !== HYPHENMINUS3) return 0

      if (i + 2 === token.value.length) {
        offset = skipSC(getNextToken(++offset), offset, getNextToken)
        token = getNextToken(offset)
        return checkInteger(token, 0, DISALLOW_SIGN, offset)
      } else {
        return checkInteger(token, i + 2, DISALLOW_SIGN, offset)
      }
    }
  }
  return 0
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/generic-urange.js
const PLUSSIGN3 = 43
const HYPHENMINUS4 = 45
const QUESTIONMARK = 63
const U = 117
function isDelim2(token, code2) {
  return (
    token !== null &&
    token.type === Delim &&
    token.value.charCodeAt(0) === code2
  )
}
function startsWith(token, code2) {
  return token.value.charCodeAt(0) === code2
}
function hexSequence(token, offset, allowDash) {
  let hexlen = 0
  for (let pos = offset; pos < token.value.length; pos++) {
    const code2 = token.value.charCodeAt(pos)
    if (code2 === HYPHENMINUS4 && allowDash && hexlen !== 0) {
      hexSequence(token, offset + hexlen + 1, false)
      return 6
    }
    if (!isHexDigit(code2)) return 0

    if (++hexlen > 6) return 0
  }
  return hexlen
}
function withQuestionMarkSequence(consumed, length2, getNextToken) {
  if (!consumed) return 0

  while (isDelim2(getNextToken(length2), QUESTIONMARK)) {
    if (++consumed > 6) return 0

    length2++
  }
  return length2
}
function urange(token, getNextToken) {
  let length2 = 0
  if (token === null || token.type !== Ident || !cmpChar(token.value, 0, U))
    return 0

  token = getNextToken(++length2)
  if (token === null) return 0

  if (isDelim2(token, PLUSSIGN3)) {
    token = getNextToken(++length2)
    if (token === null) return 0

    if (token.type === Ident)
      return withQuestionMarkSequence(
        hexSequence(token, 0, true),
        ++length2,
        getNextToken,
      )

    if (isDelim2(token, QUESTIONMARK))
      return withQuestionMarkSequence(1, ++length2, getNextToken)

    return 0
  }
  if (token.type === Number2) {
    const consumedHexLength = hexSequence(token, 1, true)
    if (consumedHexLength === 0) return 0

    token = getNextToken(++length2)
    if (token === null) return length2

    if (token.type === Dimension || token.type === Number2) {
      if (!startsWith(token, HYPHENMINUS4) || !hexSequence(token, 1, false))
        return 0

      return length2 + 1
    }
    return withQuestionMarkSequence(consumedHexLength, length2, getNextToken)
  }
  if (token.type === Dimension)
    return withQuestionMarkSequence(
      hexSequence(token, 1, true),
      ++length2,
      getNextToken,
    )

  return 0
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/generic.js
const calcFunctionNames = ['calc(', '-moz-calc(', '-webkit-calc(']
const balancePair2 = /* @__PURE__ */ new Map([
  [Function, RightParenthesis],
  [LeftParenthesis, RightParenthesis],
  [LeftSquareBracket, RightSquareBracket],
  [LeftCurlyBracket, RightCurlyBracket],
])
function charCodeAt(str, index) {
  return index < str.length ? str.charCodeAt(index) : 0
}
function eqStr(actual, expected) {
  return cmpStr(actual, 0, actual.length, expected)
}
function eqStrAny(actual, expected) {
  for (let i = 0; i < expected.length; i++) {
    if (eqStr(actual, expected[i])) return true
  }
  return false
}
function isPostfixIeHack(str, offset) {
  if (offset !== str.length - 2) return false

  return (
    charCodeAt(str, offset) === 92 && // U+005C REVERSE SOLIDUS (\)
    isDigit(charCodeAt(str, offset + 1))
  )
}
function outOfRange(opts, value, numEnd) {
  if (opts && opts.type === 'Range') {
    const num = Number(
      numEnd !== void 0 && numEnd !== value.length
        ? value.substr(0, numEnd)
        : value,
    )
    if (isNaN(num)) return true

    if (opts.min !== null && num < opts.min && typeof opts.min !== 'string')
      return true

    if (opts.max !== null && num > opts.max && typeof opts.max !== 'string')
      return true
  }
  return false
}
function consumeFunction(token, getNextToken) {
  let balanceCloseType = 0
  const balanceStash = []
  let length2 = 0
  scan: do {
    switch (token.type) {
      case RightCurlyBracket:
      case RightParenthesis:
      case RightSquareBracket:
        if (token.type !== balanceCloseType) break scan

        balanceCloseType = balanceStash.pop()
        if (balanceStash.length === 0) {
          length2++
          break scan
        }
        break
      case Function:
      case LeftParenthesis:
      case LeftSquareBracket:
      case LeftCurlyBracket:
        balanceStash.push(balanceCloseType)
        balanceCloseType = balancePair2.get(token.type)
        break
    }
    length2++
  } while ((token = getNextToken(length2)))
  return length2
}
function calc(next) {
  return function (token, getNextToken, opts) {
    if (token === null) return 0

    if (token.type === Function && eqStrAny(token.value, calcFunctionNames))
      return consumeFunction(token, getNextToken)

    return next(token, getNextToken, opts)
  }
}
function tokenType(expectedTokenType) {
  return function (token) {
    if (token === null || token.type !== expectedTokenType) return 0

    return 1
  }
}
function customIdent(token) {
  if (token === null || token.type !== Ident) return 0

  const name42 = token.value.toLowerCase()
  if (eqStrAny(name42, cssWideKeywords)) return 0

  if (eqStr(name42, 'default')) return 0

  return 1
}
function customPropertyName(token) {
  if (token === null || token.type !== Ident) return 0

  if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45)
    return 0

  return 1
}
function hexColor(token) {
  if (token === null || token.type !== Hash) return 0

  const length2 = token.value.length
  if (length2 !== 4 && length2 !== 5 && length2 !== 7 && length2 !== 9) return 0

  for (let i = 1; i < length2; i++) {
    if (!isHexDigit(charCodeAt(token.value, i))) return 0
  }
  return 1
}
function idSelector(token) {
  if (token === null || token.type !== Hash) return 0

  if (
    !isIdentifierStart(
      charCodeAt(token.value, 1),
      charCodeAt(token.value, 2),
      charCodeAt(token.value, 3),
    )
  )
    return 0

  return 1
}
function declarationValue(token, getNextToken) {
  if (!token) return 0

  let balanceCloseType = 0
  const balanceStash = []
  let length2 = 0
  scan: do {
    switch (token.type) {
      case BadString:
      case BadUrl:
        break scan
      case RightCurlyBracket:
      case RightParenthesis:
      case RightSquareBracket:
        if (token.type !== balanceCloseType) break scan

        balanceCloseType = balanceStash.pop()
        break
      case Semicolon:
        if (balanceCloseType === 0) break scan

        break
      case Delim:
        if (balanceCloseType === 0 && token.value === '!') break scan

        break
      case Function:
      case LeftParenthesis:
      case LeftSquareBracket:
      case LeftCurlyBracket:
        balanceStash.push(balanceCloseType)
        balanceCloseType = balancePair2.get(token.type)
        break
    }
    length2++
  } while ((token = getNextToken(length2)))
  return length2
}
function anyValue(token, getNextToken) {
  if (!token) return 0

  let balanceCloseType = 0
  const balanceStash = []
  let length2 = 0
  scan: do {
    switch (token.type) {
      case BadString:
      case BadUrl:
        break scan
      case RightCurlyBracket:
      case RightParenthesis:
      case RightSquareBracket:
        if (token.type !== balanceCloseType) break scan

        balanceCloseType = balanceStash.pop()
        break
      case Function:
      case LeftParenthesis:
      case LeftSquareBracket:
      case LeftCurlyBracket:
        balanceStash.push(balanceCloseType)
        balanceCloseType = balancePair2.get(token.type)
        break
    }
    length2++
  } while ((token = getNextToken(length2)))
  return length2
}
function dimension(type) {
  if (type) type = new Set(type)

  return function (token, getNextToken, opts) {
    if (token === null || token.type !== Dimension) return 0

    const numberEnd = consumeNumber(token.value, 0)
    if (type !== null) {
      const reverseSolidusOffset = token.value.indexOf('\\', numberEnd)
      const unit =
        reverseSolidusOffset === -1 ||
        !isPostfixIeHack(token.value, reverseSolidusOffset)
          ? token.value.substr(numberEnd)
          : token.value.substring(numberEnd, reverseSolidusOffset)
      if (type.has(unit.toLowerCase()) === false) return 0
    }
    if (outOfRange(opts, token.value, numberEnd)) return 0

    return 1
  }
}
function percentage(token, getNextToken, opts) {
  if (token === null || token.type !== Percentage) return 0

  if (outOfRange(opts, token.value, token.value.length - 1)) return 0

  return 1
}
function zero(next) {
  if (typeof next !== 'function') {
    next = function () {
      return 0
    }
  }
  return function (token, getNextToken, opts) {
    if (token !== null && token.type === Number2) {
      if (Number(token.value) === 0) return 1
    }
    return next(token, getNextToken, opts)
  }
}
function number2(token, getNextToken, opts) {
  if (token === null) return 0

  const numberEnd = consumeNumber(token.value, 0)
  const isNumber = numberEnd === token.value.length
  if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) return 0

  if (outOfRange(opts, token.value, numberEnd)) return 0

  return 1
}
function integer(token, getNextToken, opts) {
  if (token === null || token.type !== Number2) return 0

  let i =
    charCodeAt(token.value, 0) === 43 || // U+002B PLUS SIGN (+)
    charCodeAt(token.value, 0) === 45
      ? 1
      : 0
  for (; i < token.value.length; i++) {
    if (!isDigit(charCodeAt(token.value, i))) return 0
  }
  if (outOfRange(opts, token.value, i)) return 0

  return 1
}
const tokenTypes = {
  'ident-token': tokenType(Ident),
  'function-token': tokenType(Function),
  'at-keyword-token': tokenType(AtKeyword),
  'hash-token': tokenType(Hash),
  'string-token': tokenType(String2),
  'bad-string-token': tokenType(BadString),
  'url-token': tokenType(Url),
  'bad-url-token': tokenType(BadUrl),
  'delim-token': tokenType(Delim),
  'number-token': tokenType(Number2),
  'percentage-token': tokenType(Percentage),
  'dimension-token': tokenType(Dimension),
  'whitespace-token': tokenType(WhiteSpace),
  'CDO-token': tokenType(CDO),
  'CDC-token': tokenType(CDC),
  'colon-token': tokenType(Colon),
  'semicolon-token': tokenType(Semicolon),
  'comma-token': tokenType(Comma),
  '[-token': tokenType(LeftSquareBracket),
  ']-token': tokenType(RightSquareBracket),
  '(-token': tokenType(LeftParenthesis),
  ')-token': tokenType(RightParenthesis),
  '{-token': tokenType(LeftCurlyBracket),
  '}-token': tokenType(RightCurlyBracket),
}
const productionTypes = {
  // token type aliases
  string: tokenType(String2),
  ident: tokenType(Ident),
  // percentage
  percentage: calc(percentage),
  // numeric
  zero: zero(),
  number: calc(number2),
  integer: calc(integer),
  // complex types
  'custom-ident': customIdent,
  'custom-property-name': customPropertyName,
  'hex-color': hexColor,
  'id-selector': idSelector,
  // element( <id-selector> )
  'an-plus-b': anPlusB,
  urange: urange,
  'declaration-value': declarationValue,
  'any-value': anyValue,
}
function createDemensionTypes(units) {
  const {
    angle: angle2,
    decibel: decibel2,
    frequency: frequency2,
    flex: flex3,
    length: length2,
    resolution: resolution2,
    semitones: semitones2,
    time: time3,
  } = units || {}
  return {
    dimension: calc(dimension(null)),
    angle: calc(dimension(angle2)),
    decibel: calc(dimension(decibel2)),
    frequency: calc(dimension(frequency2)),
    flex: calc(dimension(flex3)),
    length: calc(zero(dimension(length2))),
    resolution: calc(dimension(resolution2)),
    semitones: calc(dimension(semitones2)),
    time: calc(dimension(time3)),
  }
}
function createGenericTypes(units) {
  return {
    ...tokenTypes,
    ...productionTypes,
    ...createDemensionTypes(units),
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/units.js
const units_exports = {}
__export(units_exports, {
  angle: () => angle,
  decibel: () => decibel,
  flex: () => flex2,
  frequency: () => frequency,
  length: () => length,
  resolution: () => resolution,
  semitones: () => semitones,
  time: () => time2,
})
var length = [
  // absolute length units https://www.w3.org/TR/css-values-3/#lengths
  'cm',
  'mm',
  'q',
  'in',
  'pt',
  'pc',
  'px',
  // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
  'em',
  'rem',
  'ex',
  'rex',
  'cap',
  'rcap',
  'ch',
  'rch',
  'ic',
  'ric',
  'lh',
  'rlh',
  // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
  'vw',
  'svw',
  'lvw',
  'dvw',
  'vh',
  'svh',
  'lvh',
  'dvh',
  'vi',
  'svi',
  'lvi',
  'dvi',
  'vb',
  'svb',
  'lvb',
  'dvb',
  'vmin',
  'svmin',
  'lvmin',
  'dvmin',
  'vmax',
  'svmax',
  'lvmax',
  'dvmax',
  // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
  'cqw',
  'cqh',
  'cqi',
  'cqb',
  'cqmin',
  'cqmax',
]
var angle = ['deg', 'grad', 'rad', 'turn']
var time2 = ['s', 'ms']
var frequency = ['hz', 'khz']
var resolution = ['dpi', 'dpcm', 'dppx', 'x']
var flex2 = ['fr']
var decibel = ['db']
var semitones = ['st']

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/index.js
const definition_syntax_exports = {}
__export(definition_syntax_exports, {
  SyntaxError: () => SyntaxError3,
  generate: () => generate,
  parse: () => parse,
  walk: () => walk,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/SyntaxError.js
function SyntaxError3(message, input, offset) {
  return Object.assign(createCustomError('SyntaxError', message), {
    input,
    offset,
    rawMessage: message,
    message: `${message}\n  ${input}\n--${new Array(
      (offset || input.length) + 1,
    ).join('-')}^`,
  })
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/tokenizer.js
const TAB = 9
const N3 = 10
const F2 = 12
const R2 = 13
const SPACE = 32
const Tokenizer = class {
  constructor(str) {
    this.str = str
    this.pos = 0
  }

  charCodeAt(pos) {
    return pos < this.str.length ? this.str.charCodeAt(pos) : 0
  }

  charCode() {
    return this.charCodeAt(this.pos)
  }

  nextCharCode() {
    return this.charCodeAt(this.pos + 1)
  }

  nextNonWsCode(pos) {
    return this.charCodeAt(this.findWsEnd(pos))
  }

  findWsEnd(pos) {
    for (; pos < this.str.length; pos++) {
      const code2 = this.str.charCodeAt(pos)
      if (
        code2 !== R2 &&
        code2 !== N3 &&
        code2 !== F2 &&
        code2 !== SPACE &&
        code2 !== TAB
      )
        break
    }
    return pos
  }

  substringToPos(end) {
    return this.str.substring(this.pos, (this.pos = end))
  }

  eat(code2) {
    if (this.charCode() !== code2)
      this.error(`Expect \`${String.fromCharCode(code2)}\``)

    this.pos++
  }

  peek() {
    return this.pos < this.str.length ? this.str.charAt(this.pos++) : ''
  }

  error(message) {
    throw new SyntaxError3(message, this.str, this.pos)
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/parse.js
const TAB2 = 9
const N4 = 10
const F3 = 12
const R3 = 13
const SPACE2 = 32
const EXCLAMATIONMARK2 = 33
const NUMBERSIGN2 = 35
const AMPERSAND = 38
const APOSTROPHE = 39
const LEFTPARENTHESIS = 40
const RIGHTPARENTHESIS = 41
const ASTERISK = 42
const PLUSSIGN4 = 43
const COMMA = 44
const HYPERMINUS = 45
const LESSTHANSIGN = 60
const GREATERTHANSIGN = 62
const QUESTIONMARK2 = 63
const COMMERCIALAT = 64
const LEFTSQUAREBRACKET = 91
const RIGHTSQUAREBRACKET = 93
const LEFTCURLYBRACKET2 = 123
const VERTICALLINE = 124
const RIGHTCURLYBRACKET = 125
const INFINITY = 8734
const NAME_CHAR = new Uint8Array(128).map((_, idx) =>
  /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0,
)
const COMBINATOR_PRECEDENCE = {
  ' ': 1,
  '&&': 2,
  '||': 3,
  '|': 4,
}
function scanSpaces(tokenizer) {
  return tokenizer.substringToPos(tokenizer.findWsEnd(tokenizer.pos))
}
function scanWord(tokenizer) {
  let end = tokenizer.pos
  for (; end < tokenizer.str.length; end++) {
    const code2 = tokenizer.str.charCodeAt(end)
    if (code2 >= 128 || NAME_CHAR[code2] === 0) break
  }
  if (tokenizer.pos === end) tokenizer.error('Expect a keyword')

  return tokenizer.substringToPos(end)
}
function scanNumber(tokenizer) {
  let end = tokenizer.pos
  for (; end < tokenizer.str.length; end++) {
    const code2 = tokenizer.str.charCodeAt(end)
    if (code2 < 48 || code2 > 57) break
  }
  if (tokenizer.pos === end) tokenizer.error('Expect a number')

  return tokenizer.substringToPos(end)
}
function scanString(tokenizer) {
  const end = tokenizer.str.indexOf("'", tokenizer.pos + 1)
  if (end === -1) {
    tokenizer.pos = tokenizer.str.length
    tokenizer.error('Expect an apostrophe')
  }
  return tokenizer.substringToPos(end + 1)
}
function readMultiplierRange(tokenizer) {
  let min = null
  let max = null
  tokenizer.eat(LEFTCURLYBRACKET2)
  min = scanNumber(tokenizer)
  if (tokenizer.charCode() === COMMA) {
    tokenizer.pos++
    if (tokenizer.charCode() !== RIGHTCURLYBRACKET) max = scanNumber(tokenizer)
  } else {
    max = min
  }
  tokenizer.eat(RIGHTCURLYBRACKET)
  return {
    min: Number(min),
    max: max ? Number(max) : 0,
  }
}
function readMultiplier(tokenizer) {
  let range = null
  let comma = false
  switch (tokenizer.charCode()) {
    case ASTERISK:
      tokenizer.pos++
      range = {
        min: 0,
        max: 0,
      }
      break
    case PLUSSIGN4:
      tokenizer.pos++
      range = {
        min: 1,
        max: 0,
      }
      break
    case QUESTIONMARK2:
      tokenizer.pos++
      range = {
        min: 0,
        max: 1,
      }
      break
    case NUMBERSIGN2:
      tokenizer.pos++
      comma = true
      if (tokenizer.charCode() === LEFTCURLYBRACKET2) {
        range = readMultiplierRange(tokenizer)
      } else if (tokenizer.charCode() === QUESTIONMARK2) {
        tokenizer.pos++
        range = {
          min: 0,
          max: 0,
        }
      } else {
        range = {
          min: 1,
          max: 0,
        }
      }
      break
    case LEFTCURLYBRACKET2:
      range = readMultiplierRange(tokenizer)
      break
    default:
      return null
  }
  return {
    type: 'Multiplier',
    comma,
    min: range.min,
    max: range.max,
    term: null,
  }
}
function maybeMultiplied(tokenizer, node) {
  const multiplier = readMultiplier(tokenizer)
  if (multiplier !== null) {
    multiplier.term = node
    if (
      tokenizer.charCode() === NUMBERSIGN2 &&
      tokenizer.charCodeAt(tokenizer.pos - 1) === PLUSSIGN4
    )
      return maybeMultiplied(tokenizer, multiplier)

    return multiplier
  }
  return node
}
function maybeToken(tokenizer) {
  const ch = tokenizer.peek()
  if (ch === '') return null

  return {
    type: 'Token',
    value: ch,
  }
}
function readProperty(tokenizer) {
  let name42
  tokenizer.eat(LESSTHANSIGN)
  tokenizer.eat(APOSTROPHE)
  name42 = scanWord(tokenizer)
  tokenizer.eat(APOSTROPHE)
  tokenizer.eat(GREATERTHANSIGN)
  return maybeMultiplied(tokenizer, {
    type: 'Property',
    name: name42,
  })
}
function readTypeRange(tokenizer) {
  let min = null
  let max = null
  let sign = 1
  tokenizer.eat(LEFTSQUAREBRACKET)
  if (tokenizer.charCode() === HYPERMINUS) {
    tokenizer.peek()
    sign = -1
  }
  if (sign == -1 && tokenizer.charCode() === INFINITY) {
    tokenizer.peek()
  } else {
    min = sign * Number(scanNumber(tokenizer))
    if (NAME_CHAR[tokenizer.charCode()] !== 0) min += scanWord(tokenizer)
  }
  scanSpaces(tokenizer)
  tokenizer.eat(COMMA)
  scanSpaces(tokenizer)
  if (tokenizer.charCode() === INFINITY) {
    tokenizer.peek()
  } else {
    sign = 1
    if (tokenizer.charCode() === HYPERMINUS) {
      tokenizer.peek()
      sign = -1
    }
    max = sign * Number(scanNumber(tokenizer))
    if (NAME_CHAR[tokenizer.charCode()] !== 0) max += scanWord(tokenizer)
  }
  tokenizer.eat(RIGHTSQUAREBRACKET)
  return {
    type: 'Range',
    min,
    max,
  }
}
function readType(tokenizer) {
  let name42
  let opts = null
  tokenizer.eat(LESSTHANSIGN)
  name42 = scanWord(tokenizer)
  if (
    tokenizer.charCode() === LEFTPARENTHESIS &&
    tokenizer.nextCharCode() === RIGHTPARENTHESIS
  ) {
    tokenizer.pos += 2
    name42 += '()'
  }
  if (
    tokenizer.charCodeAt(tokenizer.findWsEnd(tokenizer.pos)) ===
    LEFTSQUAREBRACKET
  ) {
    scanSpaces(tokenizer)
    opts = readTypeRange(tokenizer)
  }
  tokenizer.eat(GREATERTHANSIGN)
  return maybeMultiplied(tokenizer, {
    type: 'Type',
    name: name42,
    opts,
  })
}
function readKeywordOrFunction(tokenizer) {
  const name42 = scanWord(tokenizer)
  if (tokenizer.charCode() === LEFTPARENTHESIS) {
    tokenizer.pos++
    return {
      type: 'Function',
      name: name42,
    }
  }
  return maybeMultiplied(tokenizer, {
    type: 'Keyword',
    name: name42,
  })
}
function regroupTerms(terms, combinators) {
  function createGroup(terms2, combinator2) {
    return {
      type: 'Group',
      terms: terms2,
      combinator: combinator2,
      disallowEmpty: false,
      explicit: false,
    }
  }
  let combinator
  combinators = Object.keys(combinators).sort(
    (a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b],
  )
  while (combinators.length > 0) {
    combinator = combinators.shift()
    let i = 0
    let subgroupStart = 0
    for (; i < terms.length; i++) {
      const term = terms[i]
      if (term.type === 'Combinator') {
        if (term.value === combinator) {
          if (subgroupStart === -1) subgroupStart = i - 1

          terms.splice(i, 1)
          i--
        } else {
          if (subgroupStart !== -1 && i - subgroupStart > 1) {
            terms.splice(
              subgroupStart,
              i - subgroupStart,
              createGroup(terms.slice(subgroupStart, i), combinator),
            )
            i = subgroupStart + 1
          }
          subgroupStart = -1
        }
      }
    }
    if (subgroupStart !== -1 && combinators.length) {
      terms.splice(
        subgroupStart,
        i - subgroupStart,
        createGroup(terms.slice(subgroupStart, i), combinator),
      )
    }
  }
  return combinator
}
function readImplicitGroup(tokenizer) {
  const terms = []
  const combinators = {}
  let token
  let prevToken = null
  let prevTokenPos = tokenizer.pos
  while ((token = peek(tokenizer))) {
    if (token.type !== 'Spaces') {
      if (token.type === 'Combinator') {
        if (prevToken === null || prevToken.type === 'Combinator') {
          tokenizer.pos = prevTokenPos
          tokenizer.error('Unexpected combinator')
        }
        combinators[token.value] = true
      } else if (prevToken !== null && prevToken.type !== 'Combinator') {
        combinators[' '] = true
        terms.push({
          type: 'Combinator',
          value: ' ',
        })
      }
      terms.push(token)
      prevToken = token
      prevTokenPos = tokenizer.pos
    }
  }
  if (prevToken !== null && prevToken.type === 'Combinator') {
    tokenizer.pos -= prevTokenPos
    tokenizer.error('Unexpected combinator')
  }
  return {
    type: 'Group',
    terms,
    combinator: regroupTerms(terms, combinators) || ' ',
    disallowEmpty: false,
    explicit: false,
  }
}
function readGroup(tokenizer) {
  let result
  tokenizer.eat(LEFTSQUAREBRACKET)
  result = readImplicitGroup(tokenizer)
  tokenizer.eat(RIGHTSQUAREBRACKET)
  result.explicit = true
  if (tokenizer.charCode() === EXCLAMATIONMARK2) {
    tokenizer.pos++
    result.disallowEmpty = true
  }
  return result
}
function peek(tokenizer) {
  let code2 = tokenizer.charCode()
  if (code2 < 128 && NAME_CHAR[code2] === 1)
    return readKeywordOrFunction(tokenizer)

  switch (code2) {
    case RIGHTSQUAREBRACKET:
      break
    case LEFTSQUAREBRACKET:
      return maybeMultiplied(tokenizer, readGroup(tokenizer))
    case LESSTHANSIGN:
      return tokenizer.nextCharCode() === APOSTROPHE
        ? readProperty(tokenizer)
        : readType(tokenizer)
    case VERTICALLINE:
      return {
        type: 'Combinator',
        value: tokenizer.substringToPos(
          tokenizer.pos + (tokenizer.nextCharCode() === VERTICALLINE ? 2 : 1),
        ),
      }
    case AMPERSAND:
      tokenizer.pos++
      tokenizer.eat(AMPERSAND)
      return {
        type: 'Combinator',
        value: '&&',
      }
    case COMMA:
      tokenizer.pos++
      return {
        type: 'Comma',
      }
    case APOSTROPHE:
      return maybeMultiplied(tokenizer, {
        type: 'String',
        value: scanString(tokenizer),
      })
    case SPACE2:
    case TAB2:
    case N4:
    case R3:
    case F3:
      return {
        type: 'Spaces',
        value: scanSpaces(tokenizer),
      }
    case COMMERCIALAT:
      code2 = tokenizer.nextCharCode()
      if (code2 < 128 && NAME_CHAR[code2] === 1) {
        tokenizer.pos++
        return {
          type: 'AtKeyword',
          name: scanWord(tokenizer),
        }
      }
      return maybeToken(tokenizer)
    case ASTERISK:
    case PLUSSIGN4:
    case QUESTIONMARK2:
    case NUMBERSIGN2:
    case EXCLAMATIONMARK2:
      break
    case LEFTCURLYBRACKET2:
      code2 = tokenizer.nextCharCode()
      if (code2 < 48 || code2 > 57) return maybeToken(tokenizer)

      break
    default:
      return maybeToken(tokenizer)
  }
}
function parse(source) {
  const tokenizer = new Tokenizer(source)
  const result = readImplicitGroup(tokenizer)
  if (tokenizer.pos !== source.length) tokenizer.error('Unexpected input')

  if (result.terms.length === 1 && result.terms[0].type === 'Group')
    return result.terms[0]

  return result
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/definition-syntax/walk.js
const noop3 = function () {}
function ensureFunction2(value) {
  return typeof value === 'function' ? value : noop3
}
function walk(node, options, context) {
  function walk3(node2) {
    enter.call(context, node2)
    switch (node2.type) {
      case 'Group':
        node2.terms.forEach(walk3)
        break
      case 'Multiplier':
        walk3(node2.term)
        break
      case 'Type':
      case 'Property':
      case 'Keyword':
      case 'AtKeyword':
      case 'Function':
      case 'String':
      case 'Token':
      case 'Comma':
        break
      default:
        throw new Error(`Unknown type: ${node2.type}`)
    }
    leave.call(context, node2)
  }
  let enter = noop3
  let leave = noop3
  if (typeof options === 'function') {
    enter = options
  } else if (options) {
    enter = ensureFunction2(options.enter)
    leave = ensureFunction2(options.leave)
  }
  if (enter === noop3 && leave === noop3)
    throw new Error(
      "Neither `enter` nor `leave` walker handler is set or both aren't a function",
    )

  walk3(node, context)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/prepare-tokens.js
const astToTokens = {
  decorator(handlers) {
    const tokens = []
    let curNode = null
    return {
      ...handlers,
      node(node) {
        const tmp = curNode
        curNode = node
        handlers.node.call(this, node)
        curNode = tmp
      },
      emit(value, type, auto2) {
        tokens.push({
          type,
          value,
          node: auto2 ? null : curNode,
        })
      },
      result() {
        return tokens
      },
    }
  },
}
function stringToTokens(str) {
  const tokens = []
  tokenize(str, (type, start, end) =>
    tokens.push({
      type,
      value: str.slice(start, end),
      node: null,
    }),
  )
  return tokens
}
function prepare_tokens_default(value, syntax) {
  if (typeof value === 'string') return stringToTokens(value)

  return syntax.generate(value, astToTokens)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/match-graph.js
const MATCH = { type: 'Match' }
const MISMATCH = { type: 'Mismatch' }
const DISALLOW_EMPTY = { type: 'DisallowEmpty' }
const LEFTPARENTHESIS2 = 40
const RIGHTPARENTHESIS2 = 41
function createCondition(match, thenBranch, elseBranch) {
  if (thenBranch === MATCH && elseBranch === MISMATCH) return match

  if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH)
    return match

  if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
    thenBranch = match.then
    match = match.match
  }
  return {
    type: 'If',
    match,
    then: thenBranch,
    else: elseBranch,
  }
}
function isFunctionType(name42) {
  return (
    name42.length > 2 &&
    name42.charCodeAt(name42.length - 2) === LEFTPARENTHESIS2 &&
    name42.charCodeAt(name42.length - 1) === RIGHTPARENTHESIS2
  )
}
function isEnumCapatible(term) {
  return (
    term.type === 'Keyword' ||
    term.type === 'AtKeyword' ||
    term.type === 'Function' ||
    (term.type === 'Type' && isFunctionType(term.name))
  )
}
function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
  switch (combinator) {
    case ' ': {
      let result = MATCH
      for (let i = terms.length - 1; i >= 0; i--) {
        const term = terms[i]
        result = createCondition(term, result, MISMATCH)
      }

      return result
    }
    case '|': {
      let result = MISMATCH
      let map = null
      for (let i = terms.length - 1; i >= 0; i--) {
        const term = terms[i]
        if (isEnumCapatible(term)) {
          if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
            map = /* @__PURE__ */ Object.create(null)
            result = createCondition(
              {
                type: 'Enum',
                map,
              },
              MATCH,
              result,
            )
          }
          if (map !== null) {
            const key = (
              isFunctionType(term.name) ? term.name.slice(0, -1) : term.name
            ).toLowerCase()
            if (key in map === false) {
              map[key] = term
              continue
            }
          }
        }
        map = null
        result = createCondition(term, MATCH, result)
      }

      return result
    }
    case '&&': {
      if (terms.length > 5) {
        return {
          type: 'MatchOnce',
          terms,
          all: true,
        }
      }
      let result = MISMATCH
      for (let i = terms.length - 1; i >= 0; i--) {
        const term = terms[i]
        let thenClause
        if (terms.length > 1) {
          thenClause = buildGroupMatchGraph(
            combinator,
            terms.filter((newGroupTerm) => {
              return newGroupTerm !== term
            }),
            false,
          )
        } else {
          thenClause = MATCH
        }
        result = createCondition(term, thenClause, result)
      }

      return result
    }
    case '||': {
      if (terms.length > 5) {
        return {
          type: 'MatchOnce',
          terms,
          all: false,
        }
      }
      let result = atLeastOneTermMatched ? MATCH : MISMATCH
      for (let i = terms.length - 1; i >= 0; i--) {
        const term = terms[i]
        let thenClause
        if (terms.length > 1) {
          thenClause = buildGroupMatchGraph(
            combinator,
            terms.filter((newGroupTerm) => {
              return newGroupTerm !== term
            }),
            true,
          )
        } else {
          thenClause = MATCH
        }
        result = createCondition(term, thenClause, result)
      }

      return result
    }
  }
}
function buildMultiplierMatchGraph(node) {
  let result = MATCH
  let matchTerm = buildMatchGraphInternal(node.term)
  if (node.max === 0) {
    matchTerm = createCondition(matchTerm, DISALLOW_EMPTY, MISMATCH)
    result = createCondition(
      matchTerm,
      null,
      // will be a loop
      MISMATCH,
    )
    result.then = createCondition(
      MATCH,
      MATCH,
      result,
      // make a loop
    )
    if (node.comma) {
      result.then.else = createCondition(
        { type: 'Comma', syntax: node },
        result,
        MISMATCH,
      )
    }
  } else {
    for (let i = node.min || 1; i <= node.max; i++) {
      if (node.comma && result !== MATCH) {
        result = createCondition(
          { type: 'Comma', syntax: node },
          result,
          MISMATCH,
        )
      }
      result = createCondition(
        matchTerm,
        createCondition(MATCH, MATCH, result),
        MISMATCH,
      )
    }
  }
  if (node.min === 0) {
    result = createCondition(MATCH, MATCH, result)
  } else {
    for (let i = 0; i < node.min - 1; i++) {
      if (node.comma && result !== MATCH) {
        result = createCondition(
          { type: 'Comma', syntax: node },
          result,
          MISMATCH,
        )
      }
      result = createCondition(matchTerm, result, MISMATCH)
    }
  }
  return result
}
function buildMatchGraphInternal(node) {
  if (typeof node === 'function') {
    return {
      type: 'Generic',
      fn: node,
    }
  }
  switch (node.type) {
    case 'Group': {
      let result = buildGroupMatchGraph(
        node.combinator,
        node.terms.map(buildMatchGraphInternal),
        false,
      )
      if (node.disallowEmpty) {
        result = createCondition(result, DISALLOW_EMPTY, MISMATCH)
      }
      return result
    }
    case 'Multiplier':
      return buildMultiplierMatchGraph(node)
    case 'Type':
    case 'Property':
      return {
        type: node.type,
        name: node.name,
        syntax: node,
      }
    case 'Keyword':
      return {
        type: node.type,
        name: node.name.toLowerCase(),
        syntax: node,
      }
    case 'AtKeyword':
      return {
        type: node.type,
        name: `@${node.name.toLowerCase()}`,
        syntax: node,
      }
    case 'Function':
      return {
        type: node.type,
        name: `${node.name.toLowerCase()}(`,
        syntax: node,
      }
    case 'String':
      if (node.value.length === 3) {
        return {
          type: 'Token',
          value: node.value.charAt(1),
          syntax: node,
        }
      }
      return {
        type: node.type,
        value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
        syntax: node,
      }
    case 'Token':
      return {
        type: node.type,
        value: node.value,
        syntax: node,
      }
    case 'Comma':
      return {
        type: node.type,
        syntax: node,
      }
    default:
      throw new Error('Unknown node type:', node.type)
  }
}
function buildMatchGraph(syntaxTree, ref) {
  if (typeof syntaxTree === 'string') syntaxTree = parse(syntaxTree)

  return {
    type: 'MatchGraph',
    match: buildMatchGraphInternal(syntaxTree),
    syntax: ref || null,
    source: syntaxTree,
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/match.js
const { hasOwnProperty: hasOwnProperty3 } = Object.prototype
const STUB = 0
const TOKEN = 1
const OPEN_SYNTAX = 2
const CLOSE_SYNTAX = 3
const EXIT_REASON_MATCH = 'Match'
const EXIT_REASON_MISMATCH = 'Mismatch'
const EXIT_REASON_ITERATION_LIMIT =
  'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)'
const ITERATION_LIMIT = 15e3
let totalIterationCount = 0
function reverseList(list) {
  let prev = null
  let next = null
  let item = list
  while (item !== null) {
    next = item.prev
    item.prev = prev
    prev = item
    item = next
  }
  return prev
}
function areStringsEqualCaseInsensitive(testStr, referenceStr) {
  if (testStr.length !== referenceStr.length) return false

  for (let i = 0; i < testStr.length; i++) {
    const referenceCode = referenceStr.charCodeAt(i)
    let testCode = testStr.charCodeAt(i)
    if (testCode >= 65 && testCode <= 90) testCode = testCode | 32

    if (testCode !== referenceCode) return false
  }
  return true
}
function isContextEdgeDelim(token) {
  if (token.type !== Delim) return false

  return token.value !== '?'
}
function isCommaContextStart(token) {
  if (token === null) return true

  return (
    token.type === Comma ||
    token.type === Function ||
    token.type === LeftParenthesis ||
    token.type === LeftSquareBracket ||
    token.type === LeftCurlyBracket ||
    isContextEdgeDelim(token)
  )
}
function isCommaContextEnd(token) {
  if (token === null) return true

  return (
    token.type === RightParenthesis ||
    token.type === RightSquareBracket ||
    token.type === RightCurlyBracket ||
    (token.type === Delim && token.value === '/')
  )
}
function internalMatch(tokens, state, syntaxes) {
  function moveToNextToken() {
    do {
      tokenIndex++
      token = tokenIndex < tokens.length ? tokens[tokenIndex] : null
    } while (
      token !== null &&
      (token.type === WhiteSpace || token.type === Comment)
    )
  }
  function getNextToken(offset) {
    const nextIndex = tokenIndex + offset
    return nextIndex < tokens.length ? tokens[nextIndex] : null
  }
  function stateSnapshotFromSyntax(nextState, prev) {
    return {
      nextState,
      matchStack,
      syntaxStack,
      thenStack,
      tokenIndex,
      prev,
    }
  }
  function pushThenStack(nextState) {
    thenStack = {
      nextState,
      matchStack,
      syntaxStack,
      prev: thenStack,
    }
  }
  function pushElseStack(nextState) {
    elseStack = stateSnapshotFromSyntax(nextState, elseStack)
  }
  function addTokenToMatch() {
    matchStack = {
      type: TOKEN,
      syntax: state.syntax,
      token,
      prev: matchStack,
    }
    moveToNextToken()
    syntaxStash = null
    if (tokenIndex > longestMatch) longestMatch = tokenIndex
  }
  function openSyntax() {
    syntaxStack = {
      syntax: state.syntax,
      opts:
        state.syntax.opts || (syntaxStack !== null && syntaxStack.opts) || null,
      prev: syntaxStack,
    }
    matchStack = {
      type: OPEN_SYNTAX,
      syntax: state.syntax,
      token: matchStack.token,
      prev: matchStack,
    }
  }
  function closeSyntax() {
    if (matchStack.type === OPEN_SYNTAX) {
      matchStack = matchStack.prev
    } else {
      matchStack = {
        type: CLOSE_SYNTAX,
        syntax: syntaxStack.syntax,
        token: matchStack.token,
        prev: matchStack,
      }
    }
    syntaxStack = syntaxStack.prev
  }
  let syntaxStack = null
  let thenStack = null
  let elseStack = null
  let syntaxStash = null
  let iterationCount = 0
  let exitReason = null
  let token = null
  let tokenIndex = -1
  let longestMatch = 0
  let matchStack = {
    type: STUB,
    syntax: null,
    token: null,
    prev: null,
  }
  moveToNextToken()
  while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
    switch (state.type) {
      case 'Match':
        if (thenStack === null) {
          if (token !== null) {
            if (
              tokenIndex !== tokens.length - 1 ||
              (token.value !== '\\0' && token.value !== '\\9')
            ) {
              state = MISMATCH
              break
            }
          }
          exitReason = EXIT_REASON_MATCH
          break
        }
        state = thenStack.nextState
        if (state === DISALLOW_EMPTY) {
          if (thenStack.matchStack === matchStack) {
            state = MISMATCH
            break
          } else {
            state = MATCH
          }
        }
        while (thenStack.syntaxStack !== syntaxStack) closeSyntax()

        thenStack = thenStack.prev
        break
      case 'Mismatch':
        if (syntaxStash !== null && syntaxStash !== false) {
          if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
            elseStack = syntaxStash
            syntaxStash = false
          }
        } else if (elseStack === null) {
          exitReason = EXIT_REASON_MISMATCH
          break
        }
        state = elseStack.nextState
        thenStack = elseStack.thenStack
        syntaxStack = elseStack.syntaxStack
        matchStack = elseStack.matchStack
        tokenIndex = elseStack.tokenIndex
        token = tokenIndex < tokens.length ? tokens[tokenIndex] : null
        elseStack = elseStack.prev
        break
      case 'MatchGraph':
        state = state.match
        break
      case 'If':
        if (state.else !== MISMATCH) pushElseStack(state.else)

        if (state.then !== MATCH) pushThenStack(state.then)

        state = state.match
        break
      case 'MatchOnce':
        state = {
          type: 'MatchOnceBuffer',
          syntax: state,
          index: 0,
          mask: 0,
        }
        break
      case 'MatchOnceBuffer': {
        const terms = state.syntax.terms
        if (state.index === terms.length) {
          if (state.mask === 0 || state.syntax.all) {
            state = MISMATCH
            break
          }
          state = MATCH
          break
        }
        if (state.mask === (1 << terms.length) - 1) {
          state = MATCH
          break
        }
        for (; state.index < terms.length; state.index++) {
          const matchFlag = 1 << state.index
          if ((state.mask & matchFlag) === 0) {
            pushElseStack(state)
            pushThenStack({
              type: 'AddMatchOnce',
              syntax: state.syntax,
              mask: state.mask | matchFlag,
            })
            state = terms[state.index++]
            break
          }
        }
        break
      }
      case 'AddMatchOnce':
        state = {
          type: 'MatchOnceBuffer',
          syntax: state.syntax,
          index: 0,
          mask: state.mask,
        }
        break
      case 'Enum':
        if (token !== null) {
          let name42 = token.value.toLowerCase()
          if (name42.includes('\\')) name42 = name42.replace(/\\[09].*$/, '')

          if (hasOwnProperty3.call(state.map, name42)) {
            state = state.map[name42]
            break
          }
        }
        state = MISMATCH
        break
      case 'Generic': {
        const opts = syntaxStack !== null ? syntaxStack.opts : null
        const lastTokenIndex2 =
          tokenIndex + Math.floor(state.fn(token, getNextToken, opts))
        if (!isNaN(lastTokenIndex2) && lastTokenIndex2 > tokenIndex) {
          while (tokenIndex < lastTokenIndex2) addTokenToMatch()

          state = MATCH
        } else {
          state = MISMATCH
        }
        break
      }
      case 'Type':
      case 'Property': {
        const syntaxDict = state.type === 'Type' ? 'types' : 'properties'
        const dictSyntax = hasOwnProperty3.call(syntaxes, syntaxDict)
          ? syntaxes[syntaxDict][state.name]
          : null
        if (!dictSyntax || !dictSyntax.match) {
          throw new Error(
            `Bad syntax reference: ${
              state.type === 'Type' ? `<${state.name}>` : `<'${state.name}'>`
            }`,
          )
        }
        if (syntaxStash !== false && token !== null && state.type === 'Type') {
          const lowPriorityMatching =
            // https://drafts.csswg.org/css-values-4/#custom-idents
            // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
            // can only claim the keyword if no other unfulfilled production can claim it.
            (state.name === 'custom-ident' && token.type === Ident) || // https://drafts.csswg.org/css-values-4/#lengths
            // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
            // it must parse as a <number>
            (state.name === 'length' && token.value === '0')
          if (lowPriorityMatching) {
            if (syntaxStash === null)
              syntaxStash = stateSnapshotFromSyntax(state, elseStack)

            state = MISMATCH
            break
          }
        }
        openSyntax()
        state = dictSyntax.match
        break
      }
      case 'Keyword': {
        const name42 = state.name
        if (token !== null) {
          let keywordName = token.value
          if (keywordName.includes('\\'))
            keywordName = keywordName.replace(/\\[09].*$/, '')

          if (areStringsEqualCaseInsensitive(keywordName, name42)) {
            addTokenToMatch()
            state = MATCH
            break
          }
        }
        state = MISMATCH
        break
      }
      case 'AtKeyword':
      case 'Function':
        if (
          token !== null &&
          areStringsEqualCaseInsensitive(token.value, state.name)
        ) {
          addTokenToMatch()
          state = MATCH
          break
        }
        state = MISMATCH
        break
      case 'Token':
        if (token !== null && token.value === state.value) {
          addTokenToMatch()
          state = MATCH
          break
        }
        state = MISMATCH
        break
      case 'Comma':
        if (token !== null && token.type === Comma) {
          if (isCommaContextStart(matchStack.token)) {
            state = MISMATCH
          } else {
            addTokenToMatch()
            state = isCommaContextEnd(token) ? MISMATCH : MATCH
          }
        } else {
          state =
            isCommaContextStart(matchStack.token) || isCommaContextEnd(token)
              ? MATCH
              : MISMATCH
        }
        break
      case 'String':
        let string = ''
        let lastTokenIndex = tokenIndex
        for (
          ;
          lastTokenIndex < tokens.length && string.length < state.value.length;
          lastTokenIndex++
        )
          string += tokens[lastTokenIndex].value

        if (areStringsEqualCaseInsensitive(string, state.value)) {
          while (tokenIndex < lastTokenIndex) addTokenToMatch()

          state = MATCH
        } else {
          state = MISMATCH
        }
        break
      default:
        throw new Error(`Unknown node type: ${state.type}`)
    }
  }
  totalIterationCount += iterationCount
  switch (exitReason) {
    case null:
      console.warn(`[csstree-match] BREAK after ${ITERATION_LIMIT} iterations`)
      exitReason = EXIT_REASON_ITERATION_LIMIT
      matchStack = null
      break
    case EXIT_REASON_MATCH:
      while (syntaxStack !== null) closeSyntax()

      break
    default:
      matchStack = null
  }
  return {
    tokens,
    reason: exitReason,
    iterations: iterationCount,
    match: matchStack,
    longestMatch,
  }
}
function matchAsTree(tokens, matchGraph, syntaxes) {
  const matchResult = internalMatch(tokens, matchGraph, syntaxes || {})
  if (matchResult.match === null) return matchResult

  let item = matchResult.match
  let host = (matchResult.match = {
    syntax: matchGraph.syntax || null,
    match: [],
  })
  const hostStack = [host]
  item = reverseList(item).prev
  while (item !== null) {
    switch (item.type) {
      case OPEN_SYNTAX:
        host.match.push(
          (host = {
            syntax: item.syntax,
            match: [],
          }),
        )
        hostStack.push(host)
        break
      case CLOSE_SYNTAX:
        hostStack.pop()
        host = hostStack[hostStack.length - 1]
        break
      default:
        host.match.push({
          syntax: item.syntax || null,
          token: item.token.value,
          node: item.token.node,
        })
    }
    item = item.prev
  }
  return matchResult
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/trace.js
const trace_exports = {}
__export(trace_exports, {
  getTrace: () => getTrace,
  isKeyword: () => isKeyword,
  isProperty: () => isProperty,
  isType: () => isType,
})
function getTrace(node) {
  function shouldPutToTrace(syntax) {
    if (syntax === null) return false

    return (
      syntax.type === 'Type' ||
      syntax.type === 'Property' ||
      syntax.type === 'Keyword'
    )
  }
  function hasMatch(matchNode) {
    if (Array.isArray(matchNode.match)) {
      for (let i = 0; i < matchNode.match.length; i++) {
        if (hasMatch(matchNode.match[i])) {
          if (shouldPutToTrace(matchNode.syntax))
            result.unshift(matchNode.syntax)

          return true
        }
      }
    } else if (matchNode.node === node) {
      result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : []
      return true
    }
    return false
  }
  let result = null
  if (this.matched !== null) hasMatch(this.matched)

  return result
}
function isType(node, type) {
  return testNode(
    this,
    node,
    (match) => match.type === 'Type' && match.name === type,
  )
}
function isProperty(node, property2) {
  return testNode(
    this,
    node,
    (match) => match.type === 'Property' && match.name === property2,
  )
}
function isKeyword(node) {
  return testNode(this, node, (match) => match.type === 'Keyword')
}
function testNode(match, node, fn) {
  const trace = getTrace.call(match, node)
  if (trace === null) return false

  return trace.some(fn)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/search.js
function getFirstMatchNode(matchNode) {
  if ('node' in matchNode) return matchNode.node

  return getFirstMatchNode(matchNode.match[0])
}
function getLastMatchNode(matchNode) {
  if ('node' in matchNode) return matchNode.node

  return getLastMatchNode(matchNode.match[matchNode.match.length - 1])
}
function matchFragments(lexer2, ast, match, type, name42) {
  function findFragments(matchNode) {
    if (
      matchNode.syntax !== null &&
      matchNode.syntax.type === type &&
      matchNode.syntax.name === name42
    ) {
      const start = getFirstMatchNode(matchNode)
      const end = getLastMatchNode(matchNode)
      lexer2.syntax.walk(ast, (node, item, list) => {
        if (node === start) {
          const nodes = new List()
          do {
            nodes.appendData(item.data)
            if (item.data === end) break

            item = item.next
          } while (item !== null)
          fragments.push({
            parent: list,
            nodes,
          })
        }
      })
    }
    if (Array.isArray(matchNode.match)) matchNode.match.forEach(findFragments)
  }
  const fragments = []
  if (match.matched !== null) findFragments(match.matched)

  return fragments
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/structure.js
const { hasOwnProperty: hasOwnProperty4 } = Object.prototype
function isValidNumber(value) {
  return (
    typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value &&
    value >= 0
  )
}
function isValidLocation(loc) {
  return (
    Boolean(loc) &&
    isValidNumber(loc.offset) &&
    isValidNumber(loc.line) &&
    isValidNumber(loc.column)
  )
}
function createNodeStructureChecker(type, fields) {
  return function checkNode(node, warn) {
    if (!node || node.constructor !== Object)
      return warn(node, 'Type of node should be an Object')

    for (let key in node) {
      let valid = true
      if (hasOwnProperty4.call(node, key) === false) continue

      if (key === 'type') {
        if (node.type !== type)
          warn(node, `Wrong node type \`${node.type}\`, expected \`${type}\``)
      } else if (key === 'loc') {
        if (node.loc === null) {
          continue
        } else if (node.loc && node.loc.constructor === Object) {
          if (typeof node.loc.source !== 'string') key += '.source'
          else if (!isValidLocation(node.loc.start)) key += '.start'
          else if (!isValidLocation(node.loc.end)) key += '.end'
          else continue
        }
        valid = false
      } else if (fields.hasOwnProperty(key)) {
        valid = false
        for (let i = 0; !valid && i < fields[key].length; i++) {
          const fieldType = fields[key][i]
          switch (fieldType) {
            case String:
              valid = typeof node[key] === 'string'
              break
            case Boolean:
              valid = typeof node[key] === 'boolean'
              break
            case null:
              valid = node[key] === null
              break
            default:
              if (typeof fieldType === 'string')
                valid = node[key] && node[key].type === fieldType
              else if (Array.isArray(fieldType))
                valid = node[key] instanceof List
          }
        }
      } else {
        warn(node, `Unknown field \`${key}\` for ${type} node type`)
      }
      if (!valid) warn(node, `Bad value for \`${type}.${key}\``)
    }
    for (const key in fields) {
      if (
        hasOwnProperty4.call(fields, key) &&
        hasOwnProperty4.call(node, key) === false
      )
        warn(node, `Field \`${type}.${key}\` is missed`)
    }
  }
}
function processStructure(name42, nodeType) {
  const structure42 = nodeType.structure
  const fields = {
    type: String,
    loc: true,
  }
  const docs = {
    type: `"${name42}"`,
  }
  for (const key in structure42) {
    if (hasOwnProperty4.call(structure42, key) === false) continue

    const docsTypes = []
    const fieldTypes = (fields[key] = Array.isArray(structure42[key])
      ? structure42[key].slice()
      : [structure42[key]])
    for (let i = 0; i < fieldTypes.length; i++) {
      const fieldType = fieldTypes[i]
      if (fieldType === String || fieldType === Boolean)
        docsTypes.push(fieldType.name)
      else if (fieldType === null) docsTypes.push('null')
      else if (typeof fieldType === 'string') docsTypes.push(`<${fieldType}>`)
      else if (Array.isArray(fieldType)) docsTypes.push('List')
      else
        throw new Error(
          `Wrong value \`${fieldType}\` in \`${name42}.${key}\` structure definition`,
        )
    }
    docs[key] = docsTypes.join(' | ')
  }
  return {
    docs,
    check: createNodeStructureChecker(name42, fields),
  }
}
function getStructureFromConfig(config) {
  const structure42 = {}
  if (config.node) {
    for (const name42 in config.node) {
      if (hasOwnProperty4.call(config.node, name42)) {
        const nodeType = config.node[name42]
        if (nodeType.structure)
          structure42[name42] = processStructure(name42, nodeType)
        else
          throw new Error(
            `Missed \`structure\` field in \`${name42}\` node type definition`,
          )
      }
    }
  }
  return structure42
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/lexer/Lexer.js
const cssWideKeywordsSyntax = buildMatchGraph(cssWideKeywords.join(' | '))
function dumpMapSyntax(map, compact, syntaxAsAst) {
  const result = {}
  for (const name42 in map) {
    if (map[name42].syntax)
      result[name42] = syntaxAsAst
        ? map[name42].syntax
        : generate(map[name42].syntax, { compact })
  }
  return result
}
function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
  const result = {}
  for (const [name42, atrule] of Object.entries(map)) {
    result[name42] = {
      prelude:
        atrule.prelude &&
        (syntaxAsAst
          ? atrule.prelude.syntax
          : generate(atrule.prelude.syntax, { compact })),
      descriptors:
        atrule.descriptors &&
        dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst),
    }
  }
  return result
}
function valueHasVar(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].value.toLowerCase() === 'var(') return true
  }
  return false
}
function buildMatchResult(matched, error, iterations) {
  return {
    matched,
    iterations,
    error,
    ...trace_exports,
  }
}
function matchSyntax(lexer2, syntax, value, useCssWideKeywords) {
  const tokens = prepare_tokens_default(value, lexer2.syntax)
  let result
  if (valueHasVar(tokens))
    return buildMatchResult(
      null,
      new Error('Matching for a tree with var() is not supported'),
    )

  if (useCssWideKeywords)
    result = matchAsTree(tokens, lexer2.cssWideKeywordsSyntax, lexer2)

  if (!useCssWideKeywords || !result.match) {
    result = matchAsTree(tokens, syntax.match, lexer2)
    if (!result.match) {
      return buildMatchResult(
        null,
        new SyntaxMatchError(result.reason, syntax.syntax, value, result),
        result.iterations,
      )
    }
  }
  return buildMatchResult(result.match, null, result.iterations)
}
const Lexer = class {
  constructor(config, syntax, structure42) {
    this.cssWideKeywordsSyntax = cssWideKeywordsSyntax
    this.syntax = syntax
    this.generic = false
    this.units = { ...units_exports }
    this.atrules = /* @__PURE__ */ Object.create(null)
    this.properties = /* @__PURE__ */ Object.create(null)
    this.types = /* @__PURE__ */ Object.create(null)
    this.structure = structure42 || getStructureFromConfig(config)
    if (config) {
      if (config.units) {
        for (const group of Object.keys(units_exports)) {
          if (Array.isArray(config.units[group]))
            this.units[group] = config.units[group]
        }
      }
      if (config.types) {
        for (const name42 in config.types)
          this.addType_(name42, config.types[name42])
      }
      if (config.generic) {
        this.generic = true
        for (const [name42, value] of Object.entries(
          createGenericTypes(this.units),
        ))
          this.addType_(name42, value)
      }
      if (config.atrules) {
        for (const name42 in config.atrules)
          this.addAtrule_(name42, config.atrules[name42])
      }
      if (config.properties) {
        for (const name42 in config.properties)
          this.addProperty_(name42, config.properties[name42])
      }
    }
  }

  checkStructure(ast) {
    function collectWarning(node, message) {
      warns.push({ node, message })
    }
    const structure42 = this.structure
    const warns = []
    this.syntax.walk(ast, (node) => {
      if (structure42.hasOwnProperty(node.type))
        structure42[node.type].check(node, collectWarning)
      else collectWarning(node, `Unknown node type \`${node.type}\``)
    })
    return warns.length ? warns : false
  }

  createDescriptor(syntax, type, name42, parent = null) {
    const ref = {
      type,
      name: name42,
    }
    const descriptor = {
      type,
      name: name42,
      parent,
      serializable:
        typeof syntax === 'string' ||
        (syntax && typeof syntax.type === 'string'),
      syntax: null,
      match: null,
    }
    if (typeof syntax === 'function') {
      descriptor.match = buildMatchGraph(syntax, ref)
    } else {
      if (typeof syntax === 'string') {
        Object.defineProperty(descriptor, 'syntax', {
          get() {
            Object.defineProperty(descriptor, 'syntax', {
              value: parse(syntax),
            })
            return descriptor.syntax
          },
        })
      } else {
        descriptor.syntax = syntax
      }
      Object.defineProperty(descriptor, 'match', {
        get() {
          Object.defineProperty(descriptor, 'match', {
            value: buildMatchGraph(descriptor.syntax, ref),
          })
          return descriptor.match
        },
      })
    }
    return descriptor
  }

  addAtrule_(name42, syntax) {
    if (!syntax) return

    this.atrules[name42] = {
      type: 'Atrule',
      name: name42,
      prelude: syntax.prelude
        ? this.createDescriptor(syntax.prelude, 'AtrulePrelude', name42)
        : null,
      descriptors: syntax.descriptors
        ? Object.keys(syntax.descriptors).reduce((map, descName) => {
            map[descName] = this.createDescriptor(
              syntax.descriptors[descName],
              'AtruleDescriptor',
              descName,
              name42,
            )
            return map
          }, /* @__PURE__ */ Object.create(null))
        : null,
    }
  }

  addProperty_(name42, syntax) {
    if (!syntax) return

    this.properties[name42] = this.createDescriptor(syntax, 'Property', name42)
  }

  addType_(name42, syntax) {
    if (!syntax) return

    this.types[name42] = this.createDescriptor(syntax, 'Type', name42)
  }

  checkAtruleName(atruleName) {
    if (!this.getAtrule(atruleName))
      return new SyntaxReferenceError('Unknown at-rule', `@${atruleName}`)
  }

  checkAtrulePrelude(atruleName, prelude) {
    const error = this.checkAtruleName(atruleName)
    if (error) return error

    const atrule = this.getAtrule(atruleName)
    if (!atrule.prelude && prelude)
      return new SyntaxError(
        `At-rule \`@${atruleName}\` should not contain a prelude`,
      )

    if (atrule.prelude && !prelude) {
      if (!matchSyntax(this, atrule.prelude, '', false).matched)
        return new SyntaxError(
          `At-rule \`@${atruleName}\` should contain a prelude`,
        )
    }
  }

  checkAtruleDescriptorName(atruleName, descriptorName) {
    const error = this.checkAtruleName(atruleName)
    if (error) return error

    const atrule = this.getAtrule(atruleName)
    const descriptor = keyword(descriptorName)
    if (!atrule.descriptors)
      return new SyntaxError(
        `At-rule \`@${atruleName}\` has no known descriptors`,
      )

    if (
      !atrule.descriptors[descriptor.name] &&
      !atrule.descriptors[descriptor.basename]
    )
      return new SyntaxReferenceError(
        'Unknown at-rule descriptor',
        descriptorName,
      )
  }

  checkPropertyName(propertyName) {
    if (!this.getProperty(propertyName))
      return new SyntaxReferenceError('Unknown property', propertyName)
  }

  matchAtrulePrelude(atruleName, prelude) {
    const error = this.checkAtrulePrelude(atruleName, prelude)
    if (error) return buildMatchResult(null, error)

    const atrule = this.getAtrule(atruleName)
    if (!atrule.prelude) return buildMatchResult(null, null)

    return matchSyntax(this, atrule.prelude, prelude || '', false)
  }

  matchAtruleDescriptor(atruleName, descriptorName, value) {
    const error = this.checkAtruleDescriptorName(atruleName, descriptorName)
    if (error) return buildMatchResult(null, error)

    const atrule = this.getAtrule(atruleName)
    const descriptor = keyword(descriptorName)
    return matchSyntax(
      this,
      atrule.descriptors[descriptor.name] ||
        atrule.descriptors[descriptor.basename],
      value,
      false,
    )
  }

  matchDeclaration(node) {
    if (node.type !== 'Declaration')
      return buildMatchResult(null, new Error('Not a Declaration node'))

    return this.matchProperty(node.property, node.value)
  }

  matchProperty(propertyName, value) {
    if (property(propertyName).custom)
      return buildMatchResult(
        null,
        new Error("Lexer matching doesn't applicable for custom properties"),
      )

    const error = this.checkPropertyName(propertyName)
    if (error) return buildMatchResult(null, error)

    return matchSyntax(this, this.getProperty(propertyName), value, true)
  }

  matchType(typeName, value) {
    const typeSyntax = this.getType(typeName)
    if (!typeSyntax)
      return buildMatchResult(
        null,
        new SyntaxReferenceError('Unknown type', typeName),
      )

    return matchSyntax(this, typeSyntax, value, false)
  }

  match(syntax, value) {
    if (typeof syntax !== 'string' && (!syntax || !syntax.type))
      return buildMatchResult(null, new SyntaxReferenceError('Bad syntax'))

    if (typeof syntax === 'string' || !syntax.match)
      syntax = this.createDescriptor(syntax, 'Type', 'anonymous')

    return matchSyntax(this, syntax, value, false)
  }

  findValueFragments(propertyName, value, type, name42) {
    return matchFragments(
      this,
      value,
      this.matchProperty(propertyName, value),
      type,
      name42,
    )
  }

  findDeclarationValueFragments(declaration, type, name42) {
    return matchFragments(
      this,
      declaration.value,
      this.matchDeclaration(declaration),
      type,
      name42,
    )
  }

  findAllFragments(ast, type, name42) {
    const result = []
    this.syntax.walk(ast, {
      visit: 'Declaration',
      enter: (declaration) => {
        result.push.apply(
          result,
          this.findDeclarationValueFragments(declaration, type, name42),
        )
      },
    })
    return result
  }

  getAtrule(atruleName, fallbackBasename = true) {
    const atrule = keyword(atruleName)
    const atruleEntry =
      atrule.vendor && fallbackBasename
        ? this.atrules[atrule.name] || this.atrules[atrule.basename]
        : this.atrules[atrule.name]
    return atruleEntry || null
  }

  getAtrulePrelude(atruleName, fallbackBasename = true) {
    const atrule = this.getAtrule(atruleName, fallbackBasename)
    return (atrule && atrule.prelude) || null
  }

  getAtruleDescriptor(atruleName, name42) {
    return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators
      ? this.atrules[atruleName].declarators[name42] || null
      : null
  }

  getProperty(propertyName, fallbackBasename = true) {
    const property2 = property(propertyName)
    const propertyEntry =
      property2.vendor && fallbackBasename
        ? this.properties[property2.name] || this.properties[property2.basename]
        : this.properties[property2.name]
    return propertyEntry || null
  }

  getType(name42) {
    return hasOwnProperty.call(this.types, name42) ? this.types[name42] : null
  }

  validate() {
    function validate(syntax, name42, broken, descriptor) {
      if (broken.has(name42)) return broken.get(name42)

      broken.set(name42, false)
      if (descriptor.syntax !== null) {
        walk(
          descriptor.syntax,
          (node) => {
            if (node.type !== 'Type' && node.type !== 'Property') return

            const map = node.type === 'Type' ? syntax.types : syntax.properties
            const brokenMap =
              node.type === 'Type' ? brokenTypes : brokenProperties
            if (
              !hasOwnProperty.call(map, node.name) ||
              validate(syntax, node.name, brokenMap, map[node.name])
            )
              broken.set(name42, true)
          },
          this,
        )
      }
    }
    let brokenTypes = /* @__PURE__ */ new Map()
    let brokenProperties = /* @__PURE__ */ new Map()
    for (const key in this.types)
      validate(this, key, brokenTypes, this.types[key])

    for (const key in this.properties)
      validate(this, key, brokenProperties, this.properties[key])

    brokenTypes = [...brokenTypes.keys()].filter((name42) =>
      brokenTypes.get(name42),
    )
    brokenProperties = [...brokenProperties.keys()].filter((name42) =>
      brokenProperties.get(name42),
    )
    if (brokenTypes.length || brokenProperties.length) {
      return {
        types: brokenTypes,
        properties: brokenProperties,
      }
    }
    return null
  }

  dump(syntaxAsAst, pretty) {
    return {
      generic: this.generic,
      units: this.units,
      types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
      properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
      atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst),
    }
  }

  toString() {
    return JSON.stringify(this.dump())
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/config/mix.js
function appendOrSet(a, b) {
  if (typeof b === 'string' && /^\s*\|/.test(b))
    return typeof a === 'string' ? a + b : b.replace(/^\s*\|\s*/, '')

  return b || null
}
function sliceProps(obj, props) {
  const result = /* @__PURE__ */ Object.create(null)
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      result[key] = {}
      for (const prop of Object.keys(value)) {
        if (props.includes(prop)) result[key][prop] = value[prop]
      }
    }
  }
  return result
}
function mix(dest, src) {
  const result = { ...dest }
  for (const [prop, value] of Object.entries(src)) {
    switch (prop) {
      case 'generic':
        result[prop] = Boolean(value)
        break
      case 'units':
        result[prop] = { ...dest[prop] }
        for (const [name42, patch] of Object.entries(value))
          result[prop][name42] = Array.isArray(patch) ? patch : []

        break
      case 'atrules':
        result[prop] = { ...dest[prop] }
        for (const [name42, atrule] of Object.entries(value)) {
          const exists = result[prop][name42] || {}
          const current = (result[prop][name42] = {
            prelude: exists.prelude || null,
            descriptors: {
              ...exists.descriptors,
            },
          })
          if (!atrule) continue

          current.prelude = atrule.prelude
            ? appendOrSet(current.prelude, atrule.prelude)
            : current.prelude || null
          for (const [descriptorName, descriptorValue] of Object.entries(
            atrule.descriptors || {},
          ))
            current.descriptors[descriptorName] = descriptorValue
              ? appendOrSet(
                  current.descriptors[descriptorName],
                  descriptorValue,
                )
              : null

          if (!Object.keys(current.descriptors).length)
            current.descriptors = null
        }
        break
      case 'types':
      case 'properties':
        result[prop] = { ...dest[prop] }
        for (const [name42, syntax] of Object.entries(value))
          result[prop][name42] = appendOrSet(result[prop][name42], syntax)

        break
      case 'scope':
        result[prop] = { ...dest[prop] }
        for (const [name42, props] of Object.entries(value))
          result[prop][name42] = { ...result[prop][name42], ...props }

        break
      case 'parseContext':
        result[prop] = {
          ...dest[prop],
          ...value,
        }
        break
      case 'atrule':
      case 'pseudo':
        result[prop] = {
          ...dest[prop],
          ...sliceProps(value, ['parse']),
        }
        break
      case 'node':
        result[prop] = {
          ...dest[prop],
          ...sliceProps(value, [
            'name',
            'structure',
            'parse',
            'generate',
            'walkContext',
          ]),
        }
        break
    }
  }
  return result
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/create.js
function createSyntax(config) {
  const parse44 = createParser(config)
  const walk3 = createWalker(config)
  const generate44 = createGenerator2(config)
  const { fromPlainObject: fromPlainObject2, toPlainObject: toPlainObject2 } =
    createConvertor(walk3)
  const syntax = {
    lexer: null,
    createLexer: (config2) =>
      new Lexer(config2, syntax, syntax.lexer.structure),
    tokenize,
    parse: parse44,
    generate: generate44,
    walk: walk3,
    find: walk3.find,
    findLast: walk3.findLast,
    findAll: walk3.findAll,
    fromPlainObject: fromPlainObject2,
    toPlainObject: toPlainObject2,
    fork(extension) {
      const base = mix({}, config)
      return createSyntax(
        typeof extension === 'function'
          ? extension(base, Object.assign)
          : mix(base, extension),
      )
    },
  }
  syntax.lexer = new Lexer(
    {
      generic: true,
      units: config.units,
      types: config.types,
      atrules: config.atrules,
      properties: config.properties,
      node: config.node,
    },
    syntax,
  )
  return syntax
}
const create_default = (config) => createSyntax(mix({}, config))

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/dist/data.js
const data_default = {
  generic: true,
  units: {
    angle: ['deg', 'grad', 'rad', 'turn'],
    decibel: ['db'],
    flex: ['fr'],
    frequency: ['hz', 'khz'],
    length: [
      'cm',
      'mm',
      'q',
      'in',
      'pt',
      'pc',
      'px',
      'em',
      'rem',
      'ex',
      'rex',
      'cap',
      'rcap',
      'ch',
      'rch',
      'ic',
      'ric',
      'lh',
      'rlh',
      'vw',
      'svw',
      'lvw',
      'dvw',
      'vh',
      'svh',
      'lvh',
      'dvh',
      'vi',
      'svi',
      'lvi',
      'dvi',
      'vb',
      'svb',
      'lvb',
      'dvb',
      'vmin',
      'svmin',
      'lvmin',
      'dvmin',
      'vmax',
      'svmax',
      'lvmax',
      'dvmax',
      'cqw',
      'cqh',
      'cqi',
      'cqb',
      'cqmin',
      'cqmax',
    ],
    resolution: ['dpi', 'dpcm', 'dppx', 'x'],
    semitones: ['st'],
    time: ['s', 'ms'],
  },
  types: {
    'abs()': 'abs( <calc-sum> )',
    'absolute-size':
      'xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large',
    'acos()': 'acos( <calc-sum> )',
    'alpha-value': '<number>|<percentage>',
    'angle-percentage': '<angle>|<percentage>',
    'angular-color-hint': '<angle-percentage>',
    'angular-color-stop': '<color>&&<color-stop-angle>?',
    'angular-color-stop-list':
      '[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>',
    'animateable-feature': 'scroll-position|contents|<custom-ident>',
    'asin()': 'asin( <calc-sum> )',
    'atan()': 'atan( <calc-sum> )',
    'atan2()': 'atan2( <calc-sum> , <calc-sum> )',
    attachment: 'scroll|fixed|local',
    'attr()': 'attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )',
    'attr-matcher': "['~'|'|'|'^'|'$'|'*']? '='",
    'attr-modifier': 'i|s',
    'attribute-selector':
      "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
    'auto-repeat':
      'repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )',
    'auto-track-list':
      '[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?',
    axis: 'block|inline|vertical|horizontal',
    'baseline-position': '[first|last]? baseline',
    'basic-shape': '<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>',
    'bg-image': 'none|<image>',
    'bg-layer':
      '<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>',
    'bg-position':
      '[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]',
    'bg-size': '[<length-percentage>|auto]{1,2}|cover|contain',
    'blur()': 'blur( <length> )',
    'blend-mode':
      'normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity',
    box: 'border-box|padding-box|content-box',
    'brightness()': 'brightness( <number-percentage> )',
    'calc()': 'calc( <calc-sum> )',
    'calc-sum': "<calc-product> [['+'|'-'] <calc-product>]*",
    'calc-product': "<calc-value> ['*' <calc-value>|'/' <number>]*",
    'calc-value':
      '<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )',
    'calc-constant': 'e|pi|infinity|-infinity|NaN',
    'cf-final-image': '<image>|<color>',
    'cf-mixing-image': '<percentage>?&&<image>',
    'circle()': 'circle( [<shape-radius>]? [at <position>]? )',
    'clamp()': 'clamp( <calc-sum>#{3} )',
    'class-selector': "'.' <ident-token>",
    'clip-source': '<url>',
    color:
      '<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<hex-color>|<named-color>|currentcolor|<deprecated-system-color>',
    'color-stop': '<color-stop-length>|<color-stop-angle>',
    'color-stop-angle': '<angle-percentage>{1,2}',
    'color-stop-length': '<length-percentage>{1,2}',
    'color-stop-list':
      '[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>',
    combinator: "'>'|'+'|'~'|['||']",
    'common-lig-values': '[common-ligatures|no-common-ligatures]',
    'compat-auto':
      'searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button',
    'composite-style':
      'clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor',
    'compositing-operator': 'add|subtract|intersect|exclude',
    'compound-selector':
      '[<type-selector>? <subclass-selector>* [<pseudo-element-selector> <pseudo-class-selector>*]*]!',
    'compound-selector-list': '<compound-selector>#',
    'complex-selector':
      '<compound-selector> [<combinator>? <compound-selector>]*',
    'complex-selector-list': '<complex-selector>#',
    'conic-gradient()':
      'conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )',
    'contextual-alt-values': '[contextual|no-contextual]',
    'content-distribution': 'space-between|space-around|space-evenly|stretch',
    'content-list':
      '[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+',
    'content-position': 'center|start|end|flex-start|flex-end',
    'content-replacement': '<image>',
    'contrast()': 'contrast( [<number-percentage>] )',
    'cos()': 'cos( <calc-sum> )',
    counter: '<counter()>|<counters()>',
    'counter()': 'counter( <counter-name> , <counter-style>? )',
    'counter-name': '<custom-ident>',
    'counter-style': '<counter-style-name>|symbols( )',
    'counter-style-name': '<custom-ident>',
    'counters()': 'counters( <counter-name> , <string> , <counter-style>? )',
    'cross-fade()': 'cross-fade( <cf-mixing-image> , <cf-final-image>? )',
    'cubic-bezier-timing-function':
      'ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )',
    'deprecated-system-color':
      'ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText',
    'discretionary-lig-values':
      '[discretionary-ligatures|no-discretionary-ligatures]',
    'display-box': 'contents|none',
    'display-inside': 'flow|flow-root|table|flex|grid|ruby',
    'display-internal':
      'table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container',
    'display-legacy':
      'inline-block|inline-list-item|inline-table|inline-flex|inline-grid',
    'display-listitem': '<display-outside>?&&[flow|flow-root]?&&list-item',
    'display-outside': 'block|inline|run-in',
    'drop-shadow()': 'drop-shadow( <length>{2,3} <color>? )',
    'east-asian-variant-values':
      '[jis78|jis83|jis90|jis04|simplified|traditional]',
    'east-asian-width-values': '[full-width|proportional-width]',
    'element()':
      'element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )',
    'ellipse()': 'ellipse( [<shape-radius>{2}]? [at <position>]? )',
    'ending-shape': 'circle|ellipse',
    'env()': 'env( <custom-ident> , <declaration-value>? )',
    'exp()': 'exp( <calc-sum> )',
    'explicit-track-list': '[<line-names>? <track-size>]+ <line-names>?',
    'family-name': '<string>|<custom-ident>+',
    'feature-tag-value': '<string> [<integer>|on|off]?',
    'feature-type':
      '@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation',
    'feature-value-block':
      "<feature-type> '{' <feature-value-declaration-list> '}'",
    'feature-value-block-list': '<feature-value-block>+',
    'feature-value-declaration': '<custom-ident> : <integer>+ ;',
    'feature-value-declaration-list': '<feature-value-declaration>',
    'feature-value-name': '<custom-ident>',
    'fill-rule': 'nonzero|evenodd',
    'filter-function':
      '<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>',
    'filter-function-list': '[<filter-function>|<url>]+',
    'final-bg-layer':
      "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
    'fixed-breadth': '<length-percentage>',
    'fixed-repeat':
      'repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )',
    'fixed-size':
      '<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )',
    'font-stretch-absolute':
      'normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>',
    'font-variant-css21': '[normal|small-caps]',
    'font-weight-absolute': 'normal|bold|<number [1,1000]>',
    'frequency-percentage': '<frequency>|<percentage>',
    'general-enclosed':
      '[<function-token> <any-value> )]|( <ident> <any-value> )',
    'generic-family':
      'serif|sans-serif|cursive|fantasy|monospace|-apple-system',
    'generic-name': 'serif|sans-serif|cursive|fantasy|monospace',
    'geometry-box': '<shape-box>|fill-box|stroke-box|view-box',
    gradient:
      '<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>',
    'grayscale()': 'grayscale( <number-percentage> )',
    'grid-line':
      'auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]',
    'historical-lig-values': '[historical-ligatures|no-historical-ligatures]',
    'hsl()':
      'hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )',
    'hsla()':
      'hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )',
    hue: '<number>|<angle>',
    'hue-rotate()': 'hue-rotate( <angle> )',
    'hwb()':
      'hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )',
    'hypot()': 'hypot( <calc-sum># )',
    image:
      '<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>',
    'image()': 'image( <image-tags>? [<image-src>? , <color>?]! )',
    'image-set()': 'image-set( <image-set-option># )',
    'image-set-option': '[<image>|<string>] [<resolution>||type( <string> )]',
    'image-src': '<url>|<string>',
    'image-tags': 'ltr|rtl',
    'inflexible-breadth': '<length-percentage>|min-content|max-content|auto',
    'inset()': "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
    'invert()': 'invert( <number-percentage> )',
    'keyframes-name': '<custom-ident>|<string>',
    'keyframe-block': '<keyframe-selector># { <declaration-list> }',
    'keyframe-block-list': '<keyframe-block>+',
    'keyframe-selector': 'from|to|<percentage>',
    'lab()':
      'lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )',
    'layer()': 'layer( <layer-name> )',
    'layer-name': "<ident> ['.' <ident>]*",
    'lch()':
      'lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )',
    'leader()': 'leader( <leader-type> )',
    'leader-type': 'dotted|solid|space|<string>',
    'length-percentage': '<length>|<percentage>',
    'line-names': "'[' <custom-ident>* ']'",
    'line-name-list': '[<line-names>|<name-repeat>]+',
    'line-style':
      'none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset',
    'line-width': '<length>|thin|medium|thick',
    'linear-color-hint': '<length-percentage>',
    'linear-color-stop': '<color> <color-stop-length>?',
    'linear-gradient()':
      'linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )',
    'log()': 'log( <calc-sum> , <calc-sum>? )',
    'mask-layer':
      '<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>',
    'mask-position':
      '[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?',
    'mask-reference': 'none|<image>|<mask-source>',
    'mask-source': '<url>',
    'masking-mode': 'alpha|luminance|match-source',
    'matrix()': 'matrix( <number>#{6} )',
    'matrix3d()': 'matrix3d( <number>#{16} )',
    'max()': 'max( <calc-sum># )',
    'media-and': '<media-in-parens> [and <media-in-parens>]+',
    'media-condition': '<media-not>|<media-and>|<media-or>|<media-in-parens>',
    'media-condition-without-or': '<media-not>|<media-and>|<media-in-parens>',
    'media-feature': '( [<mf-plain>|<mf-boolean>|<mf-range>] )',
    'media-in-parens':
      '( <media-condition> )|<media-feature>|<general-enclosed>',
    'media-not': 'not <media-in-parens>',
    'media-or': '<media-in-parens> [or <media-in-parens>]+',
    'media-query':
      '<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?',
    'media-query-list': '<media-query>#',
    'media-type': '<ident>',
    'mf-boolean': '<mf-name>',
    'mf-name': '<ident>',
    'mf-plain': '<mf-name> : <mf-value>',
    'mf-range':
      "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
    'mf-value': '<number>|<dimension>|<ident>|<ratio>',
    'min()': 'min( <calc-sum># )',
    'minmax()':
      'minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )',
    'mod()': 'mod( <calc-sum> , <calc-sum> )',
    'name-repeat': 'repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )',
    'named-color':
      'transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|<-non-standard-color>',
    'namespace-prefix': '<ident>',
    'ns-prefix': "[<ident-token>|'*']? '|'",
    'number-percentage': '<number>|<percentage>',
    'numeric-figure-values': '[lining-nums|oldstyle-nums]',
    'numeric-fraction-values': '[diagonal-fractions|stacked-fractions]',
    'numeric-spacing-values': '[proportional-nums|tabular-nums]',
    nth: '<an-plus-b>|even|odd',
    'opacity()': 'opacity( [<number-percentage>] )',
    'overflow-position': 'unsafe|safe',
    'outline-radius': '<length>|<percentage>',
    'page-body':
      '<declaration>? [; <page-body>]?|<page-margin-box> <page-body>',
    'page-margin-box': "<page-margin-box-type> '{' <declaration-list> '}'",
    'page-margin-box-type':
      '@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom',
    'page-selector-list': '[<page-selector>#]?',
    'page-selector': '<pseudo-page>+|<ident> <pseudo-page>*',
    'page-size': 'A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger',
    'path()': 'path( [<fill-rule> ,]? <string> )',
    'paint()': 'paint( <ident> , <declaration-value>? )',
    'perspective()': 'perspective( [<length [0,∞]>|none] )',
    'polygon()':
      'polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )',
    position:
      '[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]',
    'pow()': 'pow( <calc-sum> , <calc-sum> )',
    'pseudo-class-selector':
      "':' <ident-token>|':' <function-token> <any-value> ')'",
    'pseudo-element-selector': "':' <pseudo-class-selector>",
    'pseudo-page': ': [left|right|first|blank]',
    quote: 'open-quote|close-quote|no-open-quote|no-close-quote',
    'radial-gradient()':
      'radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )',
    ratio: '<number [0,∞]> [/ <number [0,∞]>]?',
    'relative-selector': '<combinator>? <complex-selector>',
    'relative-selector-list': '<relative-selector>#',
    'relative-size': 'larger|smaller',
    'rem()': 'rem( <calc-sum> , <calc-sum> )',
    'repeat-style': 'repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}',
    'repeating-conic-gradient()':
      'repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )',
    'repeating-linear-gradient()':
      'repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )',
    'repeating-radial-gradient()':
      'repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )',
    'reversed-counter-name': 'reversed( <counter-name> )',
    'rgb()':
      'rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )',
    'rgba()':
      'rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )',
    'rotate()': 'rotate( [<angle>|<zero>] )',
    'rotate3d()':
      'rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )',
    'rotateX()': 'rotateX( [<angle>|<zero>] )',
    'rotateY()': 'rotateY( [<angle>|<zero>] )',
    'rotateZ()': 'rotateZ( [<angle>|<zero>] )',
    'round()': 'round( <rounding-strategy>? , <calc-sum> , <calc-sum> )',
    'rounding-strategy': 'nearest|up|down|to-zero',
    'saturate()': 'saturate( <number-percentage> )',
    'scale()': 'scale( [<number>|<percentage>]#{1,2} )',
    'scale3d()': 'scale3d( [<number>|<percentage>]#{3} )',
    'scaleX()': 'scaleX( [<number>|<percentage>] )',
    'scaleY()': 'scaleY( [<number>|<percentage>] )',
    'scaleZ()': 'scaleZ( [<number>|<percentage>] )',
    scroller: 'root|nearest',
    'self-position': 'center|start|end|self-start|self-end|flex-start|flex-end',
    'shape-radius': '<length-percentage>|closest-side|farthest-side',
    'sign()': 'sign( <calc-sum> )',
    'skew()': 'skew( [<angle>|<zero>] , [<angle>|<zero>]? )',
    'skewX()': 'skewX( [<angle>|<zero>] )',
    'skewY()': 'skewY( [<angle>|<zero>] )',
    'sepia()': 'sepia( <number-percentage> )',
    shadow: 'inset?&&<length>{2,4}&&<color>?',
    'shadow-t': '[<length>{2,3}&&<color>?]',
    shape:
      'rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )',
    'shape-box': '<box>|margin-box',
    'side-or-corner': '[left|right]||[top|bottom]',
    'sin()': 'sin( <calc-sum> )',
    'single-animation':
      '<time>||<easing-function>||<time>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]',
    'single-animation-direction': 'normal|reverse|alternate|alternate-reverse',
    'single-animation-fill-mode': 'none|forwards|backwards|both',
    'single-animation-iteration-count': 'infinite|<number>',
    'single-animation-play-state': 'running|paused',
    'single-animation-timeline':
      'auto|none|<timeline-name>|scroll( <axis>? <scroller>? )',
    'single-transition':
      '[none|<single-transition-property>]||<time>||<easing-function>||<time>',
    'single-transition-property': 'all|<custom-ident>',
    size: 'closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}',
    'sqrt()': 'sqrt( <calc-sum> )',
    'step-position': 'jump-start|jump-end|jump-none|jump-both|start|end',
    'step-timing-function':
      'step-start|step-end|steps( <integer> [, <step-position>]? )',
    'subclass-selector':
      '<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>',
    'supports-condition':
      'not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*',
    'supports-in-parens':
      '( <supports-condition> )|<supports-feature>|<general-enclosed>',
    'supports-feature': '<supports-decl>|<supports-selector-fn>',
    'supports-decl': '( <declaration> )',
    'supports-selector-fn': 'selector( <complex-selector> )',
    symbol: '<string>|<image>|<custom-ident>',
    'tan()': 'tan( <calc-sum> )',
    target: '<target-counter()>|<target-counters()>|<target-text()>',
    'target-counter()':
      'target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )',
    'target-counters()':
      'target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )',
    'target-text()':
      'target-text( [<string>|<url>] , [content|before|after|first-letter]? )',
    'time-percentage': '<time>|<percentage>',
    'timeline-name': '<custom-ident>|<string>',
    'easing-function':
      'linear|<cubic-bezier-timing-function>|<step-timing-function>',
    'track-breadth': '<length-percentage>|<flex>|min-content|max-content|auto',
    'track-list':
      '[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?',
    'track-repeat':
      'repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )',
    'track-size':
      '<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )',
    'transform-function':
      '<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>',
    'transform-list': '<transform-function>+',
    'translate()': 'translate( <length-percentage> , <length-percentage>? )',
    'translate3d()':
      'translate3d( <length-percentage> , <length-percentage> , <length> )',
    'translateX()': 'translateX( <length-percentage> )',
    'translateY()': 'translateY( <length-percentage> )',
    'translateZ()': 'translateZ( <length> )',
    'type-or-unit':
      'string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%',
    'type-selector': "<wq-name>|<ns-prefix>? '*'",
    'var()': 'var( <custom-property-name> , <declaration-value>? )',
    'viewport-length': 'auto|<length-percentage>',
    'visual-box': 'content-box|padding-box|border-box',
    'wq-name': '<ns-prefix>? <ident-token>',
    '-legacy-gradient':
      '<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>',
    '-legacy-linear-gradient':
      '-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )',
    '-legacy-repeating-linear-gradient':
      '-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )',
    '-legacy-linear-gradient-arguments':
      '[<angle>|<side-or-corner>]? , <color-stop-list>',
    '-legacy-radial-gradient':
      '-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )',
    '-legacy-repeating-radial-gradient':
      '-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )',
    '-legacy-radial-gradient-arguments':
      '[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>',
    '-legacy-radial-gradient-size':
      'closest-side|closest-corner|farthest-side|farthest-corner|contain|cover',
    '-legacy-radial-gradient-shape': 'circle|ellipse',
    '-non-standard-font':
      '-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body',
    '-non-standard-color':
      '-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text',
    '-non-standard-image-rendering':
      'optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast',
    '-non-standard-overflow':
      '-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable',
    '-non-standard-width':
      'fill-available|min-intrinsic|intrinsic|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content|-webkit-min-content|-webkit-max-content',
    '-webkit-gradient()':
      '-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )',
    '-webkit-gradient-color-stop':
      'from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )',
    '-webkit-gradient-point':
      '[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]',
    '-webkit-gradient-radius': '<length>|<percentage>',
    '-webkit-gradient-type': 'linear|radial',
    '-webkit-mask-box-repeat': 'repeat|stretch|round',
    '-webkit-mask-clip-style':
      'border|border-box|padding|padding-box|content|content-box|text',
    '-ms-filter-function-list': '<-ms-filter-function>+',
    '-ms-filter-function':
      '<-ms-filter-function-progid>|<-ms-filter-function-legacy>',
    '-ms-filter-function-progid':
      "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
    '-ms-filter-function-legacy':
      '<ident-token>|<function-token> <any-value>? )',
    '-ms-filter': '<string>',
    age: 'child|young|old',
    'attr-name': '<wq-name>',
    'attr-fallback': '<any-value>',
    'bg-clip': '<box>|border|text',
    bottom: '<length>|auto',
    'generic-voice': '[<age>? <gender> <integer>?]',
    gender: 'male|female|neutral',
    left: '<length>|auto',
    'mask-image': '<mask-reference>#',
    paint: 'none|<color>|<url> [none|<color>]?|context-fill|context-stroke',
    right: '<length>|auto',
    'scroll-timeline-axis': 'block|inline|vertical|horizontal',
    'scroll-timeline-name': 'none|<custom-ident>',
    'single-animation-composition': 'replace|add|accumulate',
    'svg-length': '<percentage>|<length>|<number>',
    'svg-writing-mode': 'lr-tb|rl-tb|tb-rl|lr|rl|tb',
    top: '<length>|auto',
    x: '<number>',
    y: '<number>',
    declaration: "<ident-token> : <declaration-value>? ['!' important]?",
    'declaration-list': "[<declaration>? ';']* <declaration>?",
    url: 'url( <string> <url-modifier>* )|<url-token>',
    'url-modifier': '<ident>|<function-token> <any-value> )',
    'number-zero-one': '<number [0,1]>',
    'number-one-or-greater': '<number [1,∞]>',
    '-non-standard-display':
      '-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box',
  },
  properties: {
    '--*': '<declaration-value>',
    '-ms-accelerator': 'false|true',
    '-ms-block-progression': 'tb|rl|bt|lr',
    '-ms-content-zoom-chaining': 'none|chained',
    '-ms-content-zooming': 'none|zoom',
    '-ms-content-zoom-limit':
      "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
    '-ms-content-zoom-limit-max': '<percentage>',
    '-ms-content-zoom-limit-min': '<percentage>',
    '-ms-content-zoom-snap':
      "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
    '-ms-content-zoom-snap-points':
      'snapInterval( <percentage> , <percentage> )|snapList( <percentage># )',
    '-ms-content-zoom-snap-type': 'none|proximity|mandatory',
    '-ms-filter': '<string>',
    '-ms-flow-from': '[none|<custom-ident>]#',
    '-ms-flow-into': '[none|<custom-ident>]#',
    '-ms-grid-columns': 'none|<track-list>|<auto-track-list>',
    '-ms-grid-rows': 'none|<track-list>|<auto-track-list>',
    '-ms-high-contrast-adjust': 'auto|none',
    '-ms-hyphenate-limit-chars': 'auto|<integer>{1,3}',
    '-ms-hyphenate-limit-lines': 'no-limit|<integer>',
    '-ms-hyphenate-limit-zone': '<percentage>|<length>',
    '-ms-ime-align': 'auto|after',
    '-ms-overflow-style': 'auto|none|scrollbar|-ms-autohiding-scrollbar',
    '-ms-scrollbar-3dlight-color': '<color>',
    '-ms-scrollbar-arrow-color': '<color>',
    '-ms-scrollbar-base-color': '<color>',
    '-ms-scrollbar-darkshadow-color': '<color>',
    '-ms-scrollbar-face-color': '<color>',
    '-ms-scrollbar-highlight-color': '<color>',
    '-ms-scrollbar-shadow-color': '<color>',
    '-ms-scrollbar-track-color': '<color>',
    '-ms-scroll-chaining': 'chained|none',
    '-ms-scroll-limit':
      "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
    '-ms-scroll-limit-x-max': 'auto|<length>',
    '-ms-scroll-limit-x-min': '<length>',
    '-ms-scroll-limit-y-max': 'auto|<length>',
    '-ms-scroll-limit-y-min': '<length>',
    '-ms-scroll-rails': 'none|railed',
    '-ms-scroll-snap-points-x':
      'snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )',
    '-ms-scroll-snap-points-y':
      'snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )',
    '-ms-scroll-snap-type': 'none|proximity|mandatory',
    '-ms-scroll-snap-x':
      "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
    '-ms-scroll-snap-y':
      "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
    '-ms-scroll-translation': 'none|vertical-to-horizontal',
    '-ms-text-autospace':
      'none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space',
    '-ms-touch-select': 'grippers|none',
    '-ms-user-select': 'none|element|text',
    '-ms-wrap-flow': 'auto|both|start|end|maximum|clear',
    '-ms-wrap-margin': '<length>',
    '-ms-wrap-through': 'wrap|none',
    '-moz-appearance':
      'none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized',
    '-moz-binding': '<url>|none',
    '-moz-border-bottom-colors': '<color>+|none',
    '-moz-border-left-colors': '<color>+|none',
    '-moz-border-right-colors': '<color>+|none',
    '-moz-border-top-colors': '<color>+|none',
    '-moz-context-properties':
      'none|[fill|fill-opacity|stroke|stroke-opacity]#',
    '-moz-float-edge': 'border-box|content-box|margin-box|padding-box',
    '-moz-force-broken-image-icon': '0|1',
    '-moz-image-region': '<shape>|auto',
    '-moz-orient': 'inline|block|horizontal|vertical',
    '-moz-outline-radius': '<outline-radius>{1,4} [/ <outline-radius>{1,4}]?',
    '-moz-outline-radius-bottomleft': '<outline-radius>',
    '-moz-outline-radius-bottomright': '<outline-radius>',
    '-moz-outline-radius-topleft': '<outline-radius>',
    '-moz-outline-radius-topright': '<outline-radius>',
    '-moz-stack-sizing': 'ignore|stretch-to-fit',
    '-moz-text-blink': 'none|blink',
    '-moz-user-focus':
      'ignore|normal|select-after|select-before|select-menu|select-same|select-all|none',
    '-moz-user-input': 'auto|none|enabled|disabled',
    '-moz-user-modify': 'read-only|read-write|write-only',
    '-moz-window-dragging': 'drag|no-drag',
    '-moz-window-shadow': 'default|menu|tooltip|sheet|none',
    '-webkit-appearance':
      'none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button',
    '-webkit-border-before': "<'border-width'>||<'border-style'>||<color>",
    '-webkit-border-before-color': '<color>',
    '-webkit-border-before-style': "<'border-style'>",
    '-webkit-border-before-width': "<'border-width'>",
    '-webkit-box-reflect': '[above|below|right|left]? <length>? <image>?',
    '-webkit-line-clamp': 'none|<integer>',
    '-webkit-mask':
      '[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#',
    '-webkit-mask-attachment': '<attachment>#',
    '-webkit-mask-clip': '[<box>|border|padding|content|text]#',
    '-webkit-mask-composite': '<composite-style>#',
    '-webkit-mask-image': '<mask-reference>#',
    '-webkit-mask-origin': '[<box>|border|padding|content]#',
    '-webkit-mask-position': '<position>#',
    '-webkit-mask-position-x': '[<length-percentage>|left|center|right]#',
    '-webkit-mask-position-y': '[<length-percentage>|top|center|bottom]#',
    '-webkit-mask-repeat': '<repeat-style>#',
    '-webkit-mask-repeat-x': 'repeat|no-repeat|space|round',
    '-webkit-mask-repeat-y': 'repeat|no-repeat|space|round',
    '-webkit-mask-size': '<bg-size>#',
    '-webkit-overflow-scrolling': 'auto|touch',
    '-webkit-tap-highlight-color': '<color>',
    '-webkit-text-fill-color': '<color>',
    '-webkit-text-stroke': '<length>||<color>',
    '-webkit-text-stroke-color': '<color>',
    '-webkit-text-stroke-width': '<length>',
    '-webkit-touch-callout': 'default|none',
    '-webkit-user-modify': 'read-only|read-write|read-write-plaintext-only',
    'accent-color': 'auto|<color>',
    'align-content':
      'normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>',
    'align-items':
      'normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]',
    'align-self':
      'auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>',
    'align-tracks':
      '[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#',
    all: 'initial|inherit|unset|revert|revert-layer',
    animation: '<single-animation>#',
    'animation-composition': '<single-animation-composition>#',
    'animation-delay': '<time>#',
    'animation-direction': '<single-animation-direction>#',
    'animation-duration': '<time>#',
    'animation-fill-mode': '<single-animation-fill-mode>#',
    'animation-iteration-count': '<single-animation-iteration-count>#',
    'animation-name': '[none|<keyframes-name>]#',
    'animation-play-state': '<single-animation-play-state>#',
    'animation-timing-function': '<easing-function>#',
    'animation-timeline': '<single-animation-timeline>#',
    appearance: 'none|auto|textfield|menulist-button|<compat-auto>',
    'aspect-ratio': 'auto|<ratio>',
    azimuth:
      '<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards',
    'backdrop-filter': 'none|<filter-function-list>',
    'backface-visibility': 'visible|hidden',
    background: '[<bg-layer> ,]* <final-bg-layer>',
    'background-attachment': '<attachment>#',
    'background-blend-mode': '<blend-mode>#',
    'background-clip': '<bg-clip>#',
    'background-color': '<color>',
    'background-image': '<bg-image>#',
    'background-origin': '<box>#',
    'background-position': '<bg-position>#',
    'background-position-x':
      '[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#',
    'background-position-y':
      '[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#',
    'background-repeat': '<repeat-style>#',
    'background-size': '<bg-size>#',
    'block-overflow': 'clip|ellipsis|<string>',
    'block-size': "<'width'>",
    border: '<line-width>||<line-style>||<color>',
    'border-block': "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-block-color': "<'border-top-color'>{1,2}",
    'border-block-style': "<'border-top-style'>",
    'border-block-width': "<'border-top-width'>",
    'border-block-end': "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-block-end-color': "<'border-top-color'>",
    'border-block-end-style': "<'border-top-style'>",
    'border-block-end-width': "<'border-top-width'>",
    'border-block-start': "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-block-start-color': "<'border-top-color'>",
    'border-block-start-style': "<'border-top-style'>",
    'border-block-start-width': "<'border-top-width'>",
    'border-bottom': '<line-width>||<line-style>||<color>',
    'border-bottom-color': "<'border-top-color'>",
    'border-bottom-left-radius': '<length-percentage>{1,2}',
    'border-bottom-right-radius': '<length-percentage>{1,2}',
    'border-bottom-style': '<line-style>',
    'border-bottom-width': '<line-width>',
    'border-collapse': 'collapse|separate',
    'border-color': '<color>{1,4}',
    'border-end-end-radius': '<length-percentage>{1,2}',
    'border-end-start-radius': '<length-percentage>{1,2}',
    'border-image':
      "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
    'border-image-outset': '[<length>|<number>]{1,4}',
    'border-image-repeat': '[stretch|repeat|round|space]{1,2}',
    'border-image-slice': '<number-percentage>{1,4}&&fill?',
    'border-image-source': 'none|<image>',
    'border-image-width': '[<length-percentage>|<number>|auto]{1,4}',
    'border-inline': "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-inline-end': "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-inline-color': "<'border-top-color'>{1,2}",
    'border-inline-style': "<'border-top-style'>",
    'border-inline-width': "<'border-top-width'>",
    'border-inline-end-color': "<'border-top-color'>",
    'border-inline-end-style': "<'border-top-style'>",
    'border-inline-end-width': "<'border-top-width'>",
    'border-inline-start':
      "<'border-top-width'>||<'border-top-style'>||<color>",
    'border-inline-start-color': "<'border-top-color'>",
    'border-inline-start-style': "<'border-top-style'>",
    'border-inline-start-width': "<'border-top-width'>",
    'border-left': '<line-width>||<line-style>||<color>',
    'border-left-color': '<color>',
    'border-left-style': '<line-style>',
    'border-left-width': '<line-width>',
    'border-radius': '<length-percentage>{1,4} [/ <length-percentage>{1,4}]?',
    'border-right': '<line-width>||<line-style>||<color>',
    'border-right-color': '<color>',
    'border-right-style': '<line-style>',
    'border-right-width': '<line-width>',
    'border-spacing': '<length> <length>?',
    'border-start-end-radius': '<length-percentage>{1,2}',
    'border-start-start-radius': '<length-percentage>{1,2}',
    'border-style': '<line-style>{1,4}',
    'border-top': '<line-width>||<line-style>||<color>',
    'border-top-color': '<color>',
    'border-top-left-radius': '<length-percentage>{1,2}',
    'border-top-right-radius': '<length-percentage>{1,2}',
    'border-top-style': '<line-style>',
    'border-top-width': '<line-width>',
    'border-width': '<line-width>{1,4}',
    bottom: '<length>|<percentage>|auto',
    'box-align': 'start|center|end|baseline|stretch',
    'box-decoration-break': 'slice|clone',
    'box-direction': 'normal|reverse|inherit',
    'box-flex': '<number>',
    'box-flex-group': '<integer>',
    'box-lines': 'single|multiple',
    'box-ordinal-group': '<integer>',
    'box-orient': 'horizontal|vertical|inline-axis|block-axis|inherit',
    'box-pack': 'start|center|end|justify',
    'box-shadow': 'none|<shadow>#',
    'box-sizing': 'content-box|border-box',
    'break-after':
      'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',
    'break-before':
      'auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region',
    'break-inside': 'auto|avoid|avoid-page|avoid-column|avoid-region',
    'caption-side': 'top|bottom|block-start|block-end|inline-start|inline-end',
    caret: "<'caret-color'>||<'caret-shape'>",
    'caret-color': 'auto|<color>',
    'caret-shape': 'auto|bar|block|underscore',
    clear: 'none|left|right|both|inline-start|inline-end',
    clip: '<shape>|auto',
    'clip-path': '<clip-source>|[<basic-shape>||<geometry-box>]|none',
    color: '<color>',
    'print-color-adjust': 'economy|exact',
    'color-scheme': 'normal|[light|dark|<custom-ident>]+&&only?',
    'column-count': '<integer>|auto',
    'column-fill': 'auto|balance|balance-all',
    'column-gap': 'normal|<length-percentage>',
    'column-rule':
      "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
    'column-rule-color': '<color>',
    'column-rule-style': "<'border-style'>",
    'column-rule-width': "<'border-width'>",
    'column-span': 'none|all',
    'column-width': '<length>|auto',
    columns: "<'column-width'>||<'column-count'>",
    contain: 'none|strict|content|[[size||inline-size]||layout||style||paint]',
    'contain-intrinsic-size': '[none|<length>|auto <length>]{1,2}',
    'contain-intrinsic-block-size': 'none|<length>|auto <length>',
    'contain-intrinsic-height': 'none|<length>|auto <length>',
    'contain-intrinsic-inline-size': 'none|<length>|auto <length>',
    'contain-intrinsic-width': 'none|<length>|auto <length>',
    content:
      'normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?',
    'content-visibility': 'visible|auto|hidden',
    'counter-increment': '[<counter-name> <integer>?]+|none',
    'counter-reset':
      '[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none',
    'counter-set': '[<counter-name> <integer>?]+|none',
    cursor:
      '[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]',
    direction: 'ltr|rtl',
    display:
      '[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>',
    'empty-cells': 'show|hide',
    filter: 'none|<filter-function-list>|<-ms-filter-function-list>',
    flex: "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
    'flex-basis': "content|<'width'>",
    'flex-direction': 'row|row-reverse|column|column-reverse',
    'flex-flow': "<'flex-direction'>||<'flex-wrap'>",
    'flex-grow': '<number>',
    'flex-shrink': '<number>',
    'flex-wrap': 'nowrap|wrap|wrap-reverse',
    float: 'left|right|none|inline-start|inline-end',
    font: "[[<'font-style'>||<font-variant-css21>||<'font-weight'>||<'font-stretch'>]? <'font-size'> [/ <'line-height'>]? <'font-family'>]|caption|icon|menu|message-box|small-caption|status-bar",
    'font-family': '[<family-name>|<generic-family>]#',
    'font-feature-settings': 'normal|<feature-tag-value>#',
    'font-kerning': 'auto|normal|none',
    'font-language-override': 'normal|<string>',
    'font-optical-sizing': 'auto|none',
    'font-variation-settings': 'normal|[<string> <number>]#',
    'font-size': '<absolute-size>|<relative-size>|<length-percentage>',
    'font-size-adjust':
      'none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]',
    'font-smooth': 'auto|never|always|<absolute-size>|<length>',
    'font-stretch': '<font-stretch-absolute>',
    'font-style': 'normal|italic|oblique <angle>?',
    'font-synthesis': 'none|[weight||style||small-caps]',
    'font-variant':
      'normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]',
    'font-variant-alternates':
      'normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]',
    'font-variant-caps':
      'normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps',
    'font-variant-east-asian':
      'normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]',
    'font-variant-ligatures':
      'normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]',
    'font-variant-numeric':
      'normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]',
    'font-variant-position': 'normal|sub|super',
    'font-weight': '<font-weight-absolute>|bolder|lighter',
    'forced-color-adjust': 'auto|none',
    gap: "<'row-gap'> <'column-gap'>?",
    grid: "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
    'grid-area': '<grid-line> [/ <grid-line>]{0,3}',
    'grid-auto-columns': '<track-size>+',
    'grid-auto-flow': '[row|column]||dense',
    'grid-auto-rows': '<track-size>+',
    'grid-column': '<grid-line> [/ <grid-line>]?',
    'grid-column-end': '<grid-line>',
    'grid-column-gap': '<length-percentage>',
    'grid-column-start': '<grid-line>',
    'grid-gap': "<'grid-row-gap'> <'grid-column-gap'>?",
    'grid-row': '<grid-line> [/ <grid-line>]?',
    'grid-row-end': '<grid-line>',
    'grid-row-gap': '<length-percentage>',
    'grid-row-start': '<grid-line>',
    'grid-template':
      "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
    'grid-template-areas': 'none|<string>+',
    'grid-template-columns':
      'none|<track-list>|<auto-track-list>|subgrid <line-name-list>?',
    'grid-template-rows':
      'none|<track-list>|<auto-track-list>|subgrid <line-name-list>?',
    'hanging-punctuation': 'none|[first||[force-end|allow-end]||last]',
    height:
      'auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )',
    'hyphenate-character': 'auto|<string>',
    hyphens: 'none|manual|auto',
    'image-orientation': 'from-image|<angle>|[<angle>? flip]',
    'image-rendering':
      'auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>',
    'image-resolution': '[from-image||<resolution>]&&snap?',
    'ime-mode': 'auto|normal|active|inactive|disabled',
    'initial-letter': 'normal|[<number> <integer>?]',
    'initial-letter-align': '[auto|alphabetic|hanging|ideographic]',
    'inline-size': "<'width'>",
    'input-security': 'auto|none',
    inset: "<'top'>{1,4}",
    'inset-block': "<'top'>{1,2}",
    'inset-block-end': "<'top'>",
    'inset-block-start': "<'top'>",
    'inset-inline': "<'top'>{1,2}",
    'inset-inline-end': "<'top'>",
    'inset-inline-start': "<'top'>",
    isolation: 'auto|isolate',
    'justify-content':
      'normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]',
    'justify-items':
      'normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]',
    'justify-self':
      'auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]',
    'justify-tracks':
      '[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#',
    left: '<length>|<percentage>|auto',
    'letter-spacing': 'normal|<length-percentage>',
    'line-break': 'auto|loose|normal|strict|anywhere',
    'line-clamp': 'none|<integer>',
    'line-height': 'normal|<number>|<length>|<percentage>',
    'line-height-step': '<length>',
    'list-style':
      "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
    'list-style-image': '<image>|none',
    'list-style-position': 'inside|outside',
    'list-style-type': '<counter-style>|<string>|none',
    margin: '[<length>|<percentage>|auto]{1,4}',
    'margin-block': "<'margin-left'>{1,2}",
    'margin-block-end': "<'margin-left'>",
    'margin-block-start': "<'margin-left'>",
    'margin-bottom': '<length>|<percentage>|auto',
    'margin-inline': "<'margin-left'>{1,2}",
    'margin-inline-end': "<'margin-left'>",
    'margin-inline-start': "<'margin-left'>",
    'margin-left': '<length>|<percentage>|auto',
    'margin-right': '<length>|<percentage>|auto',
    'margin-top': '<length>|<percentage>|auto',
    'margin-trim': 'none|in-flow|all',
    mask: '<mask-layer>#',
    'mask-border':
      "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
    'mask-border-mode': 'luminance|alpha',
    'mask-border-outset': '[<length>|<number>]{1,4}',
    'mask-border-repeat': '[stretch|repeat|round|space]{1,2}',
    'mask-border-slice': '<number-percentage>{1,4} fill?',
    'mask-border-source': 'none|<image>',
    'mask-border-width': '[<length-percentage>|<number>|auto]{1,4}',
    'mask-clip': '[<geometry-box>|no-clip]#',
    'mask-composite': '<compositing-operator>#',
    'mask-image': '<mask-reference>#',
    'mask-mode': '<masking-mode>#',
    'mask-origin': '<geometry-box>#',
    'mask-position': '<position>#',
    'mask-repeat': '<repeat-style>#',
    'mask-size': '<bg-size>#',
    'mask-type': 'luminance|alpha',
    'masonry-auto-flow': '[pack|next]||[definite-first|ordered]',
    'math-depth': 'auto-add|add( <integer> )|<integer>',
    'math-shift': 'normal|compact',
    'math-style': 'normal|compact',
    'max-block-size': "<'max-width'>",
    'max-height':
      'none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )',
    'max-inline-size': "<'max-width'>",
    'max-lines': 'none|<integer>',
    'max-width':
      'none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>',
    'min-block-size': "<'min-width'>",
    'min-height':
      'auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )',
    'min-inline-size': "<'min-width'>",
    'min-width':
      'auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>',
    'mix-blend-mode': '<blend-mode>|plus-lighter',
    'object-fit': 'fill|contain|cover|none|scale-down',
    'object-position': '<position>',
    offset:
      "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
    'offset-anchor': 'auto|<position>',
    'offset-distance': '<length-percentage>',
    'offset-path':
      'none|ray( [<angle>&&<size>&&contain?] )|<path()>|<url>|[<basic-shape>||<geometry-box>]',
    'offset-position': 'auto|<position>',
    'offset-rotate': '[auto|reverse]||<angle>',
    opacity: '<alpha-value>',
    order: '<integer>',
    orphans: '<integer>',
    outline: "[<'outline-color'>||<'outline-style'>||<'outline-width'>]",
    'outline-color': '<color>|invert',
    'outline-offset': '<length>',
    'outline-style': "auto|<'border-style'>",
    'outline-width': '<line-width>',
    overflow: '[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>',
    'overflow-anchor': 'auto|none',
    'overflow-block': 'visible|hidden|clip|scroll|auto',
    'overflow-clip-box': 'padding-box|content-box',
    'overflow-clip-margin': '<visual-box>||<length [0,∞]>',
    'overflow-inline': 'visible|hidden|clip|scroll|auto',
    'overflow-wrap': 'normal|break-word|anywhere',
    'overflow-x': 'visible|hidden|clip|scroll|auto',
    'overflow-y': 'visible|hidden|clip|scroll|auto',
    'overscroll-behavior': '[contain|none|auto]{1,2}',
    'overscroll-behavior-block': 'contain|none|auto',
    'overscroll-behavior-inline': 'contain|none|auto',
    'overscroll-behavior-x': 'contain|none|auto',
    'overscroll-behavior-y': 'contain|none|auto',
    padding: '[<length>|<percentage>]{1,4}',
    'padding-block': "<'padding-left'>{1,2}",
    'padding-block-end': "<'padding-left'>",
    'padding-block-start': "<'padding-left'>",
    'padding-bottom': '<length>|<percentage>',
    'padding-inline': "<'padding-left'>{1,2}",
    'padding-inline-end': "<'padding-left'>",
    'padding-inline-start': "<'padding-left'>",
    'padding-left': '<length>|<percentage>',
    'padding-right': '<length>|<percentage>',
    'padding-top': '<length>|<percentage>',
    'page-break-after': 'auto|always|avoid|left|right|recto|verso',
    'page-break-before': 'auto|always|avoid|left|right|recto|verso',
    'page-break-inside': 'auto|avoid',
    'paint-order': 'normal|[fill||stroke||markers]',
    perspective: 'none|<length>',
    'perspective-origin': '<position>',
    'place-content': "<'align-content'> <'justify-content'>?",
    'place-items': "<'align-items'> <'justify-items'>?",
    'place-self': "<'align-self'> <'justify-self'>?",
    'pointer-events':
      'auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit',
    position: 'static|relative|absolute|sticky|fixed|-webkit-sticky',
    quotes: 'none|auto|[<string> <string>]+',
    resize: 'none|both|horizontal|vertical|block|inline',
    right: '<length>|<percentage>|auto',
    rotate: 'none|<angle>|[x|y|z|<number>{3}]&&<angle>',
    'row-gap': 'normal|<length-percentage>',
    'ruby-align': 'start|center|space-between|space-around',
    'ruby-merge': 'separate|collapse|auto',
    'ruby-position': '[alternate||[over|under]]|inter-character',
    scale: 'none|<number>{1,3}',
    'scrollbar-color': 'auto|<color>{2}',
    'scrollbar-gutter': 'auto|stable&&both-edges?',
    'scrollbar-width': 'auto|thin|none',
    'scroll-behavior': 'auto|smooth',
    'scroll-margin': '<length>{1,4}',
    'scroll-margin-block': '<length>{1,2}',
    'scroll-margin-block-start': '<length>',
    'scroll-margin-block-end': '<length>',
    'scroll-margin-bottom': '<length>',
    'scroll-margin-inline': '<length>{1,2}',
    'scroll-margin-inline-start': '<length>',
    'scroll-margin-inline-end': '<length>',
    'scroll-margin-left': '<length>',
    'scroll-margin-right': '<length>',
    'scroll-margin-top': '<length>',
    'scroll-padding': '[auto|<length-percentage>]{1,4}',
    'scroll-padding-block': '[auto|<length-percentage>]{1,2}',
    'scroll-padding-block-start': 'auto|<length-percentage>',
    'scroll-padding-block-end': 'auto|<length-percentage>',
    'scroll-padding-bottom': 'auto|<length-percentage>',
    'scroll-padding-inline': '[auto|<length-percentage>]{1,2}',
    'scroll-padding-inline-start': 'auto|<length-percentage>',
    'scroll-padding-inline-end': 'auto|<length-percentage>',
    'scroll-padding-left': 'auto|<length-percentage>',
    'scroll-padding-right': 'auto|<length-percentage>',
    'scroll-padding-top': 'auto|<length-percentage>',
    'scroll-snap-align': '[none|start|end|center]{1,2}',
    'scroll-snap-coordinate': 'none|<position>#',
    'scroll-snap-destination': '<position>',
    'scroll-snap-points-x': 'none|repeat( <length-percentage> )',
    'scroll-snap-points-y': 'none|repeat( <length-percentage> )',
    'scroll-snap-stop': 'normal|always',
    'scroll-snap-type': 'none|[x|y|block|inline|both] [mandatory|proximity]?',
    'scroll-snap-type-x': 'none|mandatory|proximity',
    'scroll-snap-type-y': 'none|mandatory|proximity',
    'scroll-timeline': '<scroll-timeline-name>||<scroll-timeline-axis>',
    'scroll-timeline-axis': 'block|inline|vertical|horizontal',
    'scroll-timeline-name': 'none|<custom-ident>',
    'shape-image-threshold': '<alpha-value>',
    'shape-margin': '<length-percentage>',
    'shape-outside': 'none|[<shape-box>||<basic-shape>]|<image>',
    'tab-size': '<integer>|<length>',
    'table-layout': 'auto|fixed',
    'text-align': 'start|end|left|right|center|justify|match-parent',
    'text-align-last': 'auto|start|end|left|right|center|justify',
    'text-combine-upright': 'none|all|[digits <integer>?]',
    'text-decoration':
      "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
    'text-decoration-color': '<color>',
    'text-decoration-line':
      'none|[underline||overline||line-through||blink]|spelling-error|grammar-error',
    'text-decoration-skip':
      'none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]',
    'text-decoration-skip-ink': 'auto|all|none',
    'text-decoration-style': 'solid|double|dotted|dashed|wavy',
    'text-decoration-thickness': 'auto|from-font|<length>|<percentage>',
    'text-emphasis': "<'text-emphasis-style'>||<'text-emphasis-color'>",
    'text-emphasis-color': '<color>',
    'text-emphasis-position': '[over|under]&&[right|left]',
    'text-emphasis-style':
      'none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>',
    'text-indent': '<length-percentage>&&hanging?&&each-line?',
    'text-justify': 'auto|inter-character|inter-word|none',
    'text-orientation': 'mixed|upright|sideways',
    'text-overflow': '[clip|ellipsis|<string>]{1,2}',
    'text-rendering':
      'auto|optimizeSpeed|optimizeLegibility|geometricPrecision',
    'text-shadow': 'none|<shadow-t>#',
    'text-size-adjust': 'none|auto|<percentage>',
    'text-transform':
      'none|capitalize|uppercase|lowercase|full-width|full-size-kana',
    'text-underline-offset': 'auto|<length>|<percentage>',
    'text-underline-position': 'auto|from-font|[under||[left|right]]',
    top: '<length>|<percentage>|auto',
    'touch-action':
      'auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation',
    transform: 'none|<transform-list>',
    'transform-box': 'content-box|border-box|fill-box|stroke-box|view-box',
    'transform-origin':
      '[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?',
    'transform-style': 'flat|preserve-3d',
    transition: '<single-transition>#',
    'transition-delay': '<time>#',
    'transition-duration': '<time>#',
    'transition-property': 'none|<single-transition-property>#',
    'transition-timing-function': '<easing-function>#',
    translate: 'none|<length-percentage> [<length-percentage> <length>?]?',
    'unicode-bidi':
      'normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext',
    'user-select': 'auto|text|none|contain|all',
    'vertical-align':
      'baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>',
    visibility: 'visible|hidden|collapse',
    'white-space': 'normal|pre|nowrap|pre-wrap|pre-line|break-spaces',
    widows: '<integer>',
    width:
      'auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|fill|stretch|intrinsic|-moz-max-content|-webkit-max-content|-moz-fit-content|-webkit-fit-content',
    'will-change': 'auto|<animateable-feature>#',
    'word-break': 'normal|break-all|keep-all|break-word',
    'word-spacing': 'normal|<length>',
    'word-wrap': 'normal|break-word',
    'writing-mode':
      'horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>',
    'z-index': 'auto|<integer>',
    zoom: 'normal|reset|<number>|<percentage>',
    '-moz-background-clip': 'padding|border',
    '-moz-border-radius-bottomleft': "<'border-bottom-left-radius'>",
    '-moz-border-radius-bottomright': "<'border-bottom-right-radius'>",
    '-moz-border-radius-topleft': "<'border-top-left-radius'>",
    '-moz-border-radius-topright': "<'border-bottom-right-radius'>",
    '-moz-control-character-visibility': 'visible|hidden',
    '-moz-osx-font-smoothing': 'auto|grayscale',
    '-moz-user-select': 'none|text|all|-moz-none',
    '-ms-flex-align': 'start|end|center|baseline|stretch',
    '-ms-flex-item-align': 'auto|start|end|center|baseline|stretch',
    '-ms-flex-line-pack': 'start|end|center|justify|distribute|stretch',
    '-ms-flex-negative': "<'flex-shrink'>",
    '-ms-flex-pack': 'start|end|center|justify|distribute',
    '-ms-flex-order': '<integer>',
    '-ms-flex-positive': "<'flex-grow'>",
    '-ms-flex-preferred-size': "<'flex-basis'>",
    '-ms-interpolation-mode': 'nearest-neighbor|bicubic',
    '-ms-grid-column-align': 'start|end|center|stretch',
    '-ms-grid-row-align': 'start|end|center|stretch',
    '-ms-hyphenate-limit-last': 'none|always|column|page|spread',
    '-webkit-background-clip': '[<box>|border|padding|content|text]#',
    '-webkit-column-break-after': 'always|auto|avoid',
    '-webkit-column-break-before': 'always|auto|avoid',
    '-webkit-column-break-inside': 'always|auto|avoid',
    '-webkit-font-smoothing': 'auto|none|antialiased|subpixel-antialiased',
    '-webkit-mask-box-image':
      '[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?',
    '-webkit-print-color-adjust': 'economy|exact',
    '-webkit-text-security': 'none|circle|disc|square',
    '-webkit-user-drag': 'none|element|auto',
    '-webkit-user-select': 'auto|none|text|all',
    'alignment-baseline':
      'auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical',
    'baseline-shift': 'baseline|sub|super|<svg-length>',
    behavior: '<url>+',
    'clip-rule': 'nonzero|evenodd',
    cue: "<'cue-before'> <'cue-after'>?",
    'cue-after': '<url> <decibel>?|none',
    'cue-before': '<url> <decibel>?|none',
    'dominant-baseline':
      'auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge',
    fill: '<paint>',
    'fill-opacity': '<number-zero-one>',
    'fill-rule': 'nonzero|evenodd',
    'glyph-orientation-horizontal': '<angle>',
    'glyph-orientation-vertical': '<angle>',
    kerning: 'auto|<svg-length>',
    marker: 'none|<url>',
    'marker-end': 'none|<url>',
    'marker-mid': 'none|<url>',
    'marker-start': 'none|<url>',
    pause: "<'pause-before'> <'pause-after'>?",
    'pause-after': '<time>|none|x-weak|weak|medium|strong|x-strong',
    'pause-before': '<time>|none|x-weak|weak|medium|strong|x-strong',
    rest: "<'rest-before'> <'rest-after'>?",
    'rest-after': '<time>|none|x-weak|weak|medium|strong|x-strong',
    'rest-before': '<time>|none|x-weak|weak|medium|strong|x-strong',
    'shape-rendering': 'auto|optimizeSpeed|crispEdges|geometricPrecision',
    src: '[<url> [format( <string># )]?|local( <family-name> )]#',
    speak: 'auto|none|normal',
    'speak-as':
      'normal|spell-out||digits||[literal-punctuation|no-punctuation]',
    stroke: '<paint>',
    'stroke-dasharray': 'none|[<svg-length>+]#',
    'stroke-dashoffset': '<svg-length>',
    'stroke-linecap': 'butt|round|square',
    'stroke-linejoin': 'miter|round|bevel',
    'stroke-miterlimit': '<number-one-or-greater>',
    'stroke-opacity': '<number-zero-one>',
    'stroke-width': '<svg-length>',
    'text-anchor': 'start|middle|end',
    'unicode-range': '<urange>#',
    'voice-balance': '<number>|left|center|right|leftwards|rightwards',
    'voice-duration': 'auto|<time>',
    'voice-family':
      '[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve',
    'voice-pitch':
      '<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]',
    'voice-range':
      '<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]',
    'voice-rate': '[normal|x-slow|slow|medium|fast|x-fast]||<percentage>',
    'voice-stress': 'normal|strong|moderate|none|reduced',
    'voice-volume': 'silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]',
  },
  atrules: {
    charset: {
      prelude: '<string>',
      descriptors: null,
    },
    'counter-style': {
      prelude: '<counter-style-name>',
      descriptors: {
        'additive-symbols': '[<integer>&&<symbol>]#',
        fallback: '<counter-style-name>',
        negative: '<symbol> <symbol>?',
        pad: '<integer>&&<symbol>',
        prefix: '<symbol>',
        range: '[[<integer>|infinite]{2}]#|auto',
        'speak-as': 'auto|bullets|numbers|words|spell-out|<counter-style-name>',
        suffix: '<symbol>',
        symbols: '<symbol>+',
        system:
          'cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]',
      },
    },
    document: {
      prelude:
        '[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#',
      descriptors: null,
    },
    'font-face': {
      prelude: null,
      descriptors: {
        'ascent-override': 'normal|<percentage>',
        'descent-override': 'normal|<percentage>',
        'font-display': '[auto|block|swap|fallback|optional]',
        'font-family': '<family-name>',
        'font-feature-settings': 'normal|<feature-tag-value>#',
        'font-variation-settings': 'normal|[<string> <number>]#',
        'font-stretch': '<font-stretch-absolute>{1,2}',
        'font-style': 'normal|italic|oblique <angle>{0,2}',
        'font-weight': '<font-weight-absolute>{1,2}',
        'font-variant':
          'normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]',
        'line-gap-override': 'normal|<percentage>',
        'size-adjust': '<percentage>',
        src: '[<url> [format( <string># )]?|local( <family-name> )]#',
        'unicode-range': '<urange>#',
      },
    },
    'font-feature-values': {
      prelude: '<family-name>#',
      descriptors: null,
    },
    import: {
      prelude:
        '[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?',
      descriptors: null,
    },
    keyframes: {
      prelude: '<keyframes-name>',
      descriptors: null,
    },
    layer: {
      prelude: '[<layer-name>#|<layer-name>?]',
      descriptors: null,
    },
    media: {
      prelude: '<media-query-list>',
      descriptors: null,
    },
    namespace: {
      prelude: '<namespace-prefix>? [<string>|<url>]',
      descriptors: null,
    },
    page: {
      prelude: '<page-selector-list>',
      descriptors: {
        bleed: 'auto|<length>',
        marks: 'none|[crop||cross]',
        size: '<length>{1,2}|auto|[<page-size>||[portrait|landscape]]',
      },
    },
    property: {
      prelude: '<custom-property-name>',
      descriptors: {
        syntax: '<string>',
        inherits: 'true|false',
        'initial-value': '<string>',
      },
    },
    'scroll-timeline': {
      prelude: '<timeline-name>',
      descriptors: null,
    },
    supports: {
      prelude: '<supports-condition>',
      descriptors: null,
    },
    viewport: {
      prelude: null,
      descriptors: {
        height: '<viewport-length>{1,2}',
        'max-height': '<viewport-length>',
        'max-width': '<viewport-length>',
        'max-zoom': 'auto|<number>|<percentage>',
        'min-height': '<viewport-length>',
        'min-width': '<viewport-length>',
        'min-zoom': 'auto|<number>|<percentage>',
        orientation: 'auto|portrait|landscape',
        'user-zoom': 'zoom|fixed',
        'viewport-fit': 'auto|contain|cover',
        width: '<viewport-length>{1,2}',
        zoom: 'auto|<number>|<percentage>',
      },
    },
    nest: {
      prelude: '<complex-selector-list>',
      descriptors: null,
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/index.js
const node_exports = {}
__export(node_exports, {
  AnPlusB: () => AnPlusB_exports,
  Atrule: () => Atrule_exports,
  AtrulePrelude: () => AtrulePrelude_exports,
  AttributeSelector: () => AttributeSelector_exports,
  Block: () => Block_exports,
  Brackets: () => Brackets_exports,
  CDC: () => CDC_exports,
  CDO: () => CDO_exports,
  ClassSelector: () => ClassSelector_exports,
  Combinator: () => Combinator_exports,
  Comment: () => Comment_exports,
  Declaration: () => Declaration_exports,
  DeclarationList: () => DeclarationList_exports,
  Dimension: () => Dimension_exports,
  Function: () => Function_exports,
  Hash: () => Hash_exports,
  IdSelector: () => IdSelector_exports,
  Identifier: () => Identifier_exports,
  MediaFeature: () => MediaFeature_exports,
  MediaQuery: () => MediaQuery_exports,
  MediaQueryList: () => MediaQueryList_exports,
  NestingSelector: () => NestingSelector_exports,
  Nth: () => Nth_exports,
  Number: () => Number_exports,
  Operator: () => Operator_exports,
  Parentheses: () => Parentheses_exports,
  Percentage: () => Percentage_exports,
  PseudoClassSelector: () => PseudoClassSelector_exports,
  PseudoElementSelector: () => PseudoElementSelector_exports,
  Ratio: () => Ratio_exports,
  Raw: () => Raw_exports,
  Rule: () => Rule_exports,
  Selector: () => Selector_exports,
  SelectorList: () => SelectorList_exports,
  String: () => String_exports,
  StyleSheet: () => StyleSheet_exports,
  TypeSelector: () => TypeSelector_exports,
  UnicodeRange: () => UnicodeRange_exports,
  Url: () => Url_exports,
  Value: () => Value_exports,
  WhiteSpace: () => WhiteSpace_exports,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/AnPlusB.js
var AnPlusB_exports = {}
__export(AnPlusB_exports, {
  generate: () => generate2,
  name: () => name,
  parse: () => parse2,
  structure: () => structure,
})
const PLUSSIGN5 = 43
const HYPHENMINUS5 = 45
const N5 = 110
const DISALLOW_SIGN2 = true
const ALLOW_SIGN2 = false
function checkInteger2(offset, disallowSign) {
  let pos = this.tokenStart + offset
  const code2 = this.charCodeAt(pos)
  if (code2 === PLUSSIGN5 || code2 === HYPHENMINUS5) {
    if (disallowSign) this.error('Number sign is not allowed')

    pos++
  }
  for (; pos < this.tokenEnd; pos++) {
    if (!isDigit(this.charCodeAt(pos))) this.error('Integer is expected', pos)
  }
}
function checkTokenIsInteger(disallowSign) {
  return checkInteger2.call(this, 0, disallowSign)
}
function expectCharCode(offset, code2) {
  if (!this.cmpChar(this.tokenStart + offset, code2)) {
    let msg = ''
    switch (code2) {
      case N5:
        msg = 'N is expected'
        break
      case HYPHENMINUS5:
        msg = 'HyphenMinus is expected'
        break
    }
    this.error(msg, this.tokenStart + offset)
  }
}
function consumeB2() {
  let offset = 0
  let sign = 0
  let type = this.tokenType
  while (type === WhiteSpace || type === Comment)
    type = this.lookupType(++offset)

  if (type !== Number2) {
    if (this.isDelim(PLUSSIGN5, offset) || this.isDelim(HYPHENMINUS5, offset)) {
      sign = this.isDelim(PLUSSIGN5, offset) ? PLUSSIGN5 : HYPHENMINUS5
      do type = this.lookupType(++offset)
      while (type === WhiteSpace || type === Comment)
      if (type !== Number2) {
        this.skip(offset)
        checkTokenIsInteger.call(this, DISALLOW_SIGN2)
      }
    } else {
      return null
    }
  }
  if (offset > 0) this.skip(offset)

  if (sign === 0) {
    type = this.charCodeAt(this.tokenStart)
    if (type !== PLUSSIGN5 && type !== HYPHENMINUS5)
      this.error('Number sign is expected')
  }
  checkTokenIsInteger.call(this, sign !== 0)
  return sign === HYPHENMINUS5
    ? `-${this.consume(Number2)}`
    : this.consume(Number2)
}
var name = 'AnPlusB'
var structure = {
  a: [String, null],
  b: [String, null],
}
function parse2() {
  const start = this.tokenStart
  let a = null
  let b = null
  if (this.tokenType === Number2) {
    checkTokenIsInteger.call(this, ALLOW_SIGN2)
    b = this.consume(Number2)
  } else if (
    this.tokenType === Ident &&
    this.cmpChar(this.tokenStart, HYPHENMINUS5)
  ) {
    a = '-1'
    expectCharCode.call(this, 1, N5)
    switch (this.tokenEnd - this.tokenStart) {
      case 2:
        this.next()
        b = consumeB2.call(this)
        break
      case 3:
        expectCharCode.call(this, 2, HYPHENMINUS5)
        this.next()
        this.skipSC()
        checkTokenIsInteger.call(this, DISALLOW_SIGN2)
        b = `-${this.consume(Number2)}`
        break
      default:
        expectCharCode.call(this, 2, HYPHENMINUS5)
        checkInteger2.call(this, 3, DISALLOW_SIGN2)
        this.next()
        b = this.substrToCursor(start + 2)
    }
  } else if (
    this.tokenType === Ident ||
    (this.isDelim(PLUSSIGN5) && this.lookupType(1) === Ident)
  ) {
    let sign = 0
    a = '1'
    if (this.isDelim(PLUSSIGN5)) {
      sign = 1
      this.next()
    }
    expectCharCode.call(this, 0, N5)
    switch (this.tokenEnd - this.tokenStart) {
      case 1:
        this.next()
        b = consumeB2.call(this)
        break
      case 2:
        expectCharCode.call(this, 1, HYPHENMINUS5)
        this.next()
        this.skipSC()
        checkTokenIsInteger.call(this, DISALLOW_SIGN2)
        b = `-${this.consume(Number2)}`
        break
      default:
        expectCharCode.call(this, 1, HYPHENMINUS5)
        checkInteger2.call(this, 2, DISALLOW_SIGN2)
        this.next()
        b = this.substrToCursor(start + sign + 1)
    }
  } else if (this.tokenType === Dimension) {
    const code2 = this.charCodeAt(this.tokenStart)
    const sign = code2 === PLUSSIGN5 || code2 === HYPHENMINUS5
    let i = this.tokenStart + sign
    for (; i < this.tokenEnd; i++) {
      if (!isDigit(this.charCodeAt(i))) break
    }
    if (i === this.tokenStart + sign)
      this.error('Integer is expected', this.tokenStart + sign)

    expectCharCode.call(this, i - this.tokenStart, N5)
    a = this.substring(start, i)
    if (i + 1 === this.tokenEnd) {
      this.next()
      b = consumeB2.call(this)
    } else {
      expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS5)
      if (i + 2 === this.tokenEnd) {
        this.next()
        this.skipSC()
        checkTokenIsInteger.call(this, DISALLOW_SIGN2)
        b = `-${this.consume(Number2)}`
      } else {
        checkInteger2.call(this, i - this.tokenStart + 2, DISALLOW_SIGN2)
        this.next()
        b = this.substrToCursor(i + 1)
      }
    }
  } else {
    this.error()
  }
  if (a !== null && a.charCodeAt(0) === PLUSSIGN5) a = a.substr(1)

  if (b !== null && b.charCodeAt(0) === PLUSSIGN5) b = b.substr(1)

  return {
    type: 'AnPlusB',
    loc: this.getLocation(start, this.tokenStart),
    a,
    b,
  }
}
function generate2(node) {
  if (node.a) {
    const a =
      (node.a === '+1' && 'n') ||
      (node.a === '1' && 'n') ||
      (node.a === '-1' && '-n') ||
      `${node.a}n`
    if (node.b) {
      const b = node.b[0] === '-' || node.b[0] === '+' ? node.b : `+${node.b}`
      this.tokenize(a + b)
    } else {
      this.tokenize(a)
    }
  } else {
    this.tokenize(node.b)
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Atrule.js
var Atrule_exports = {}
__export(Atrule_exports, {
  generate: () => generate3,
  name: () => name2,
  parse: () => parse3,
  structure: () => structure2,
  walkContext: () => walkContext,
})
function consumeRaw(startToken) {
  return this.Raw(
    startToken,
    this.consumeUntilLeftCurlyBracketOrSemicolon,
    true,
  )
}
function isDeclarationBlockAtrule() {
  for (let offset = 1, type; (type = this.lookupType(offset)); offset++) {
    if (type === RightCurlyBracket) return true

    if (type === LeftCurlyBracket || type === AtKeyword) return false
  }
  return false
}
var name2 = 'Atrule'
var walkContext = 'atrule'
var structure2 = {
  name: String,
  prelude: ['AtrulePrelude', 'Raw', null],
  block: ['Block', null],
}
function parse3(isDeclaration = false) {
  const start = this.tokenStart
  let name42
  let nameLowerCase
  let prelude = null
  let block = null
  this.eat(AtKeyword)
  name42 = this.substrToCursor(start + 1)
  nameLowerCase = name42.toLowerCase()
  this.skipSC()
  if (
    this.eof === false &&
    this.tokenType !== LeftCurlyBracket &&
    this.tokenType !== Semicolon
  ) {
    if (this.parseAtrulePrelude)
      prelude = this.parseWithFallback(
        this.AtrulePrelude.bind(this, name42, isDeclaration),
        consumeRaw,
      )
    else prelude = consumeRaw.call(this, this.tokenIndex)

    this.skipSC()
  }
  switch (this.tokenType) {
    case Semicolon:
      this.next()
      break
    case LeftCurlyBracket:
      if (
        hasOwnProperty.call(this.atrule, nameLowerCase) &&
        typeof this.atrule[nameLowerCase].block === 'function'
      )
        block = this.atrule[nameLowerCase].block.call(this, isDeclaration)
      else block = this.Block(isDeclarationBlockAtrule.call(this))

      break
  }
  return {
    type: 'Atrule',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    prelude,
    block,
  }
}
function generate3(node) {
  this.token(AtKeyword, `@${node.name}`)
  if (node.prelude !== null) this.node(node.prelude)

  if (node.block) this.node(node.block)
  else this.token(Semicolon, ';')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
var AtrulePrelude_exports = {}
__export(AtrulePrelude_exports, {
  generate: () => generate4,
  name: () => name3,
  parse: () => parse4,
  structure: () => structure3,
  walkContext: () => walkContext2,
})
var name3 = 'AtrulePrelude'
var walkContext2 = 'atrulePrelude'
var structure3 = {
  children: [[]],
}
function parse4(name42) {
  let children = null
  if (name42 !== null) name42 = name42.toLowerCase()

  this.skipSC()
  if (
    hasOwnProperty.call(this.atrule, name42) &&
    typeof this.atrule[name42].prelude === 'function'
  )
    children = this.atrule[name42].prelude.call(this)
  else children = this.readSequence(this.scope.AtrulePrelude)

  this.skipSC()
  if (
    this.eof !== true &&
    this.tokenType !== LeftCurlyBracket &&
    this.tokenType !== Semicolon
  )
    this.error('Semicolon or block is expected')

  return {
    type: 'AtrulePrelude',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate4(node) {
  this.children(node)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/AttributeSelector.js
var AttributeSelector_exports = {}
__export(AttributeSelector_exports, {
  generate: () => generate5,
  name: () => name4,
  parse: () => parse5,
  structure: () => structure4,
})
const DOLLARSIGN = 36
const ASTERISK2 = 42
const EQUALSSIGN = 61
const CIRCUMFLEXACCENT = 94
const VERTICALLINE2 = 124
const TILDE = 126
function getAttributeName() {
  if (this.eof) this.error('Unexpected end of input')

  const start = this.tokenStart
  let expectIdent = false
  if (this.isDelim(ASTERISK2)) {
    expectIdent = true
    this.next()
  } else if (!this.isDelim(VERTICALLINE2)) {
    this.eat(Ident)
  }
  if (this.isDelim(VERTICALLINE2)) {
    if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN) {
      this.next()
      this.eat(Ident)
    } else if (expectIdent) {
      this.error('Identifier is expected', this.tokenEnd)
    }
  } else if (expectIdent) {
    this.error('Vertical line is expected')
  }
  return {
    type: 'Identifier',
    loc: this.getLocation(start, this.tokenStart),
    name: this.substrToCursor(start),
  }
}
function getOperator() {
  const start = this.tokenStart
  const code2 = this.charCodeAt(start)
  if (
    code2 !== EQUALSSIGN && // =
    code2 !== TILDE && // ~=
    code2 !== CIRCUMFLEXACCENT && // ^=
    code2 !== DOLLARSIGN && // $=
    code2 !== ASTERISK2 && // *=
    code2 !== VERTICALLINE2
  )
    this.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected')

  this.next()
  if (code2 !== EQUALSSIGN) {
    if (!this.isDelim(EQUALSSIGN)) this.error('Equal sign is expected')

    this.next()
  }
  return this.substrToCursor(start)
}
var name4 = 'AttributeSelector'
var structure4 = {
  name: 'Identifier',
  matcher: [String, null],
  value: ['String', 'Identifier', null],
  flags: [String, null],
}
function parse5() {
  const start = this.tokenStart
  let name42
  let matcher = null
  let value = null
  let flags = null
  this.eat(LeftSquareBracket)
  this.skipSC()
  name42 = getAttributeName.call(this)
  this.skipSC()
  if (this.tokenType !== RightSquareBracket) {
    if (this.tokenType !== Ident) {
      matcher = getOperator.call(this)
      this.skipSC()
      value = this.tokenType === String2 ? this.String() : this.Identifier()
      this.skipSC()
    }
    if (this.tokenType === Ident) {
      flags = this.consume(Ident)
      this.skipSC()
    }
  }
  this.eat(RightSquareBracket)
  return {
    type: 'AttributeSelector',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    matcher,
    value,
    flags,
  }
}
function generate5(node) {
  this.token(Delim, '[')
  this.node(node.name)
  if (node.matcher !== null) {
    this.tokenize(node.matcher)
    this.node(node.value)
  }
  if (node.flags !== null) this.token(Ident, node.flags)

  this.token(Delim, ']')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Block.js
var Block_exports = {}
__export(Block_exports, {
  generate: () => generate6,
  name: () => name5,
  parse: () => parse6,
  structure: () => structure5,
  walkContext: () => walkContext3,
})
const AMPERSAND2 = 38
function consumeRaw2(startToken) {
  return this.Raw(startToken, null, true)
}
function consumeRule() {
  return this.parseWithFallback(this.Rule, consumeRaw2)
}
function consumeRawDeclaration(startToken) {
  return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true)
}
function consumeDeclaration() {
  if (this.tokenType === Semicolon)
    return consumeRawDeclaration.call(this, this.tokenIndex)

  const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration)
  if (this.tokenType === Semicolon) this.next()

  return node
}
var name5 = 'Block'
var walkContext3 = 'block'
var structure5 = {
  children: [['Atrule', 'Rule', 'Declaration']],
}
function parse6(isStyleBlock) {
  const consumer = isStyleBlock ? consumeDeclaration : consumeRule
  const start = this.tokenStart
  const children = this.createList()
  this.eat(LeftCurlyBracket)
  scan: while (!this.eof) {
    switch (this.tokenType) {
      case RightCurlyBracket:
        break scan
      case WhiteSpace:
      case Comment:
        this.next()
        break
      case AtKeyword:
        children.push(
          this.parseWithFallback(
            this.Atrule.bind(this, isStyleBlock),
            consumeRaw2,
          ),
        )
        break
      default:
        if (isStyleBlock && this.isDelim(AMPERSAND2))
          children.push(consumeRule.call(this))
        else children.push(consumer.call(this))
    }
  }
  if (!this.eof) this.eat(RightCurlyBracket)

  return {
    type: 'Block',
    loc: this.getLocation(start, this.tokenStart),
    children,
  }
}
function generate6(node) {
  this.token(LeftCurlyBracket, '{')
  this.children(node, (prev) => {
    if (prev.type === 'Declaration') this.token(Semicolon, ';')
  })
  this.token(RightCurlyBracket, '}')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Brackets.js
var Brackets_exports = {}
__export(Brackets_exports, {
  generate: () => generate7,
  name: () => name6,
  parse: () => parse7,
  structure: () => structure6,
})
var name6 = 'Brackets'
var structure6 = {
  children: [[]],
}
function parse7(readSequence3, recognizer) {
  const start = this.tokenStart
  let children = null
  this.eat(LeftSquareBracket)
  children = readSequence3.call(this, recognizer)
  if (!this.eof) this.eat(RightSquareBracket)

  return {
    type: 'Brackets',
    loc: this.getLocation(start, this.tokenStart),
    children,
  }
}
function generate7(node) {
  this.token(Delim, '[')
  this.children(node)
  this.token(Delim, ']')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/CDC.js
var CDC_exports = {}
__export(CDC_exports, {
  generate: () => generate8,
  name: () => name7,
  parse: () => parse8,
  structure: () => structure7,
})
var name7 = 'CDC'
var structure7 = []
function parse8() {
  const start = this.tokenStart
  this.eat(CDC)
  return {
    type: 'CDC',
    loc: this.getLocation(start, this.tokenStart),
  }
}
function generate8() {
  this.token(CDC, '-->')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/CDO.js
var CDO_exports = {}
__export(CDO_exports, {
  generate: () => generate9,
  name: () => name8,
  parse: () => parse9,
  structure: () => structure8,
})
var name8 = 'CDO'
var structure8 = []
function parse9() {
  const start = this.tokenStart
  this.eat(CDO)
  return {
    type: 'CDO',
    loc: this.getLocation(start, this.tokenStart),
  }
}
function generate9() {
  this.token(CDO, '<!--')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/ClassSelector.js
var ClassSelector_exports = {}
__export(ClassSelector_exports, {
  generate: () => generate10,
  name: () => name9,
  parse: () => parse10,
  structure: () => structure9,
})
const FULLSTOP = 46
var name9 = 'ClassSelector'
var structure9 = {
  name: String,
}
function parse10() {
  this.eatDelim(FULLSTOP)
  return {
    type: 'ClassSelector',
    loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
    name: this.consume(Ident),
  }
}
function generate10(node) {
  this.token(Delim, '.')
  this.token(Ident, node.name)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Combinator.js
var Combinator_exports = {}
__export(Combinator_exports, {
  generate: () => generate11,
  name: () => name10,
  parse: () => parse11,
  structure: () => structure10,
})
const PLUSSIGN6 = 43
const SOLIDUS = 47
const GREATERTHANSIGN2 = 62
const TILDE2 = 126
var name10 = 'Combinator'
var structure10 = {
  name: String,
}
function parse11() {
  const start = this.tokenStart
  let name42
  switch (this.tokenType) {
    case WhiteSpace:
      name42 = ' '
      break
    case Delim:
      switch (this.charCodeAt(this.tokenStart)) {
        case GREATERTHANSIGN2:
        case PLUSSIGN6:
        case TILDE2:
          this.next()
          break
        case SOLIDUS:
          this.next()
          this.eatIdent('deep')
          this.eatDelim(SOLIDUS)
          break
        default:
          this.error('Combinator is expected')
      }
      name42 = this.substrToCursor(start)
      break
  }
  return {
    type: 'Combinator',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
  }
}
function generate11(node) {
  this.tokenize(node.name)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Comment.js
var Comment_exports = {}
__export(Comment_exports, {
  generate: () => generate12,
  name: () => name11,
  parse: () => parse12,
  structure: () => structure11,
})
const ASTERISK3 = 42
const SOLIDUS2 = 47
var name11 = 'Comment'
var structure11 = {
  value: String,
}
function parse12() {
  const start = this.tokenStart
  let end = this.tokenEnd
  this.eat(Comment)
  if (
    end - start + 2 >= 2 &&
    this.charCodeAt(end - 2) === ASTERISK3 &&
    this.charCodeAt(end - 1) === SOLIDUS2
  )
    end -= 2

  return {
    type: 'Comment',
    loc: this.getLocation(start, this.tokenStart),
    value: this.substring(start + 2, end),
  }
}
function generate12(node) {
  this.token(Comment, `/*${node.value}*/`)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Declaration.js
var Declaration_exports = {}
__export(Declaration_exports, {
  generate: () => generate13,
  name: () => name12,
  parse: () => parse13,
  structure: () => structure12,
  walkContext: () => walkContext4,
})
const EXCLAMATIONMARK3 = 33
const NUMBERSIGN3 = 35
const DOLLARSIGN2 = 36
const AMPERSAND3 = 38
const ASTERISK4 = 42
const PLUSSIGN7 = 43
const SOLIDUS3 = 47
function consumeValueRaw(startToken) {
  return this.Raw(startToken, this.consumeUntilExclamationMarkOrSemicolon, true)
}
function consumeCustomPropertyRaw(startToken) {
  return this.Raw(
    startToken,
    this.consumeUntilExclamationMarkOrSemicolon,
    false,
  )
}
function consumeValue() {
  const startValueToken = this.tokenIndex
  const value = this.Value()
  if (
    value.type !== 'Raw' &&
    this.eof === false &&
    this.tokenType !== Semicolon &&
    this.isDelim(EXCLAMATIONMARK3) === false &&
    this.isBalanceEdge(startValueToken) === false
  )
    this.error()

  return value
}
var name12 = 'Declaration'
var walkContext4 = 'declaration'
var structure12 = {
  important: [Boolean, String],
  property: String,
  value: ['Value', 'Raw'],
}
function parse13() {
  const start = this.tokenStart
  const startToken = this.tokenIndex
  const property2 = readProperty2.call(this)
  const customProperty = isCustomProperty(property2)
  const parseValue = customProperty ? this.parseCustomProperty : this.parseValue
  const consumeRaw7 = customProperty
    ? consumeCustomPropertyRaw
    : consumeValueRaw
  let important = false
  let value
  this.skipSC()
  this.eat(Colon)
  const valueStart = this.tokenIndex
  if (!customProperty) this.skipSC()

  if (parseValue) value = this.parseWithFallback(consumeValue, consumeRaw7)
  else value = consumeRaw7.call(this, this.tokenIndex)

  if (customProperty && value.type === 'Value' && value.children.isEmpty) {
    for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
      if (this.lookupType(offset) === WhiteSpace) {
        value.children.appendData({
          type: 'WhiteSpace',
          loc: null,
          value: ' ',
        })
        break
      }
    }
  }
  if (this.isDelim(EXCLAMATIONMARK3)) {
    important = getImportant.call(this)
    this.skipSC()
  }
  if (
    this.eof === false &&
    this.tokenType !== Semicolon &&
    this.isBalanceEdge(startToken) === false
  )
    this.error()

  return {
    type: 'Declaration',
    loc: this.getLocation(start, this.tokenStart),
    important,
    property: property2,
    value,
  }
}
function generate13(node) {
  this.token(Ident, node.property)
  this.token(Colon, ':')
  this.node(node.value)
  if (node.important) {
    this.token(Delim, '!')
    this.token(Ident, node.important === true ? 'important' : node.important)
  }
}
function readProperty2() {
  const start = this.tokenStart
  if (this.tokenType === Delim) {
    switch (this.charCodeAt(this.tokenStart)) {
      case ASTERISK4:
      case DOLLARSIGN2:
      case PLUSSIGN7:
      case NUMBERSIGN3:
      case AMPERSAND3:
        this.next()
        break
      case SOLIDUS3:
        this.next()
        if (this.isDelim(SOLIDUS3)) this.next()

        break
    }
  }
  if (this.tokenType === Hash) this.eat(Hash)
  else this.eat(Ident)

  return this.substrToCursor(start)
}
function getImportant() {
  this.eat(Delim)
  this.skipSC()
  const important = this.consume(Ident)
  return important === 'important' ? true : important
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/DeclarationList.js
var DeclarationList_exports = {}
__export(DeclarationList_exports, {
  generate: () => generate14,
  name: () => name13,
  parse: () => parse14,
  structure: () => structure13,
})
const AMPERSAND4 = 38
function consumeRaw3(startToken) {
  return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true)
}
var name13 = 'DeclarationList'
var structure13 = {
  children: [['Declaration', 'Atrule', 'Rule']],
}
function parse14() {
  const children = this.createList()
  scan: while (!this.eof) {
    switch (this.tokenType) {
      case WhiteSpace:
      case Comment:
      case Semicolon:
        this.next()
        break
      case AtKeyword:
        children.push(
          this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw3),
        )
        break
      default:
        if (this.isDelim(AMPERSAND4))
          children.push(this.parseWithFallback(this.Rule, consumeRaw3))
        else
          children.push(this.parseWithFallback(this.Declaration, consumeRaw3))
    }
  }
  return {
    type: 'DeclarationList',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate14(node) {
  this.children(node, (prev) => {
    if (prev.type === 'Declaration') this.token(Semicolon, ';')
  })
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Dimension.js
var Dimension_exports = {}
__export(Dimension_exports, {
  generate: () => generate15,
  name: () => name14,
  parse: () => parse15,
  structure: () => structure14,
})
var name14 = 'Dimension'
var structure14 = {
  value: String,
  unit: String,
}
function parse15() {
  const start = this.tokenStart
  const value = this.consumeNumber(Dimension)
  return {
    type: 'Dimension',
    loc: this.getLocation(start, this.tokenStart),
    value,
    unit: this.substring(start + value.length, this.tokenStart),
  }
}
function generate15(node) {
  this.token(Dimension, node.value + node.unit)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Function.js
var Function_exports = {}
__export(Function_exports, {
  generate: () => generate16,
  name: () => name15,
  parse: () => parse16,
  structure: () => structure15,
  walkContext: () => walkContext5,
})
var name15 = 'Function'
var walkContext5 = 'function'
var structure15 = {
  name: String,
  children: [[]],
}
function parse16(readSequence3, recognizer) {
  const start = this.tokenStart
  const name42 = this.consumeFunctionName()
  const nameLowerCase = name42.toLowerCase()
  let children
  children = recognizer.hasOwnProperty(nameLowerCase)
    ? recognizer[nameLowerCase].call(this, recognizer)
    : readSequence3.call(this, recognizer)
  if (!this.eof) this.eat(RightParenthesis)

  return {
    type: 'Function',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    children,
  }
}
function generate16(node) {
  this.token(Function, `${node.name}(`)
  this.children(node)
  this.token(RightParenthesis, ')')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Hash.js
var Hash_exports = {}
__export(Hash_exports, {
  generate: () => generate17,
  name: () => name16,
  parse: () => parse17,
  structure: () => structure16,
  xxx: () => xxx,
})
var xxx = 'XXX'
var name16 = 'Hash'
var structure16 = {
  value: String,
}
function parse17() {
  const start = this.tokenStart
  this.eat(Hash)
  return {
    type: 'Hash',
    loc: this.getLocation(start, this.tokenStart),
    value: this.substrToCursor(start + 1),
  }
}
function generate17(node) {
  this.token(Hash, `#${node.value}`)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Identifier.js
var Identifier_exports = {}
__export(Identifier_exports, {
  generate: () => generate18,
  name: () => name17,
  parse: () => parse18,
  structure: () => structure17,
})
var name17 = 'Identifier'
var structure17 = {
  name: String,
}
function parse18() {
  return {
    type: 'Identifier',
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    name: this.consume(Ident),
  }
}
function generate18(node) {
  this.token(Ident, node.name)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/IdSelector.js
var IdSelector_exports = {}
__export(IdSelector_exports, {
  generate: () => generate19,
  name: () => name18,
  parse: () => parse19,
  structure: () => structure18,
})
var name18 = 'IdSelector'
var structure18 = {
  name: String,
}
function parse19() {
  const start = this.tokenStart
  this.eat(Hash)
  return {
    type: 'IdSelector',
    loc: this.getLocation(start, this.tokenStart),
    name: this.substrToCursor(start + 1),
  }
}
function generate19(node) {
  this.token(Delim, `#${node.name}`)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/MediaFeature.js
var MediaFeature_exports = {}
__export(MediaFeature_exports, {
  generate: () => generate20,
  name: () => name19,
  parse: () => parse20,
  structure: () => structure19,
})
var name19 = 'MediaFeature'
var structure19 = {
  name: String,
  value: ['Identifier', 'Number', 'Dimension', 'Ratio', null],
}
function parse20() {
  const start = this.tokenStart
  let name42
  let value = null
  this.eat(LeftParenthesis)
  this.skipSC()
  name42 = this.consume(Ident)
  this.skipSC()
  if (this.tokenType !== RightParenthesis) {
    this.eat(Colon)
    this.skipSC()
    switch (this.tokenType) {
      case Number2:
        if (this.lookupNonWSType(1) === Delim) value = this.Ratio()
        else value = this.Number()

        break
      case Dimension:
        value = this.Dimension()
        break
      case Ident:
        value = this.Identifier()
        break
      default:
        this.error('Number, dimension, ratio or identifier is expected')
    }
    this.skipSC()
  }
  this.eat(RightParenthesis)
  return {
    type: 'MediaFeature',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    value,
  }
}
function generate20(node) {
  this.token(LeftParenthesis, '(')
  this.token(Ident, node.name)
  if (node.value !== null) {
    this.token(Colon, ':')
    this.node(node.value)
  }
  this.token(RightParenthesis, ')')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/MediaQuery.js
var MediaQuery_exports = {}
__export(MediaQuery_exports, {
  generate: () => generate21,
  name: () => name20,
  parse: () => parse21,
  structure: () => structure20,
})
var name20 = 'MediaQuery'
var structure20 = {
  children: [['Identifier', 'MediaFeature', 'WhiteSpace']],
}
function parse21() {
  const children = this.createList()
  let child = null
  this.skipSC()
  scan: while (!this.eof) {
    switch (this.tokenType) {
      case Comment:
      case WhiteSpace:
        this.next()
        continue
      case Ident:
        child = this.Identifier()
        break
      case LeftParenthesis:
        child = this.MediaFeature()
        break
      default:
        break scan
    }
    children.push(child)
  }
  if (child === null) this.error('Identifier or parenthesis is expected')

  return {
    type: 'MediaQuery',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate21(node) {
  this.children(node)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/MediaQueryList.js
var MediaQueryList_exports = {}
__export(MediaQueryList_exports, {
  generate: () => generate22,
  name: () => name21,
  parse: () => parse22,
  structure: () => structure21,
})
var name21 = 'MediaQueryList'
var structure21 = {
  children: [['MediaQuery']],
}
function parse22() {
  const children = this.createList()
  this.skipSC()
  while (!this.eof) {
    children.push(this.MediaQuery())
    if (this.tokenType !== Comma) break

    this.next()
  }
  return {
    type: 'MediaQueryList',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate22(node) {
  this.children(node, () => this.token(Comma, ','))
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/NestingSelector.js
var NestingSelector_exports = {}
__export(NestingSelector_exports, {
  generate: () => generate23,
  name: () => name22,
  parse: () => parse23,
  structure: () => structure22,
})
const AMPERSAND5 = 38
var name22 = 'NestingSelector'
var structure22 = {}
function parse23() {
  const start = this.tokenStart
  this.eatDelim(AMPERSAND5)
  return {
    type: 'NestingSelector',
    loc: this.getLocation(start, this.tokenStart),
  }
}
function generate23() {
  this.token(Delim, '&')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Nth.js
var Nth_exports = {}
__export(Nth_exports, {
  generate: () => generate24,
  name: () => name23,
  parse: () => parse24,
  structure: () => structure23,
})
var name23 = 'Nth'
var structure23 = {
  nth: ['AnPlusB', 'Identifier'],
  selector: ['SelectorList', null],
}
function parse24() {
  this.skipSC()
  const start = this.tokenStart
  let end = start
  let selector2 = null
  let nth2
  if (this.lookupValue(0, 'odd') || this.lookupValue(0, 'even'))
    nth2 = this.Identifier()
  else nth2 = this.AnPlusB()

  end = this.tokenStart
  this.skipSC()
  if (this.lookupValue(0, 'of')) {
    this.next()
    selector2 = this.SelectorList()
    end = this.tokenStart
  }
  return {
    type: 'Nth',
    loc: this.getLocation(start, end),
    nth: nth2,
    selector: selector2,
  }
}
function generate24(node) {
  this.node(node.nth)
  if (node.selector !== null) {
    this.token(Ident, 'of')
    this.node(node.selector)
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Number.js
var Number_exports = {}
__export(Number_exports, {
  generate: () => generate25,
  name: () => name24,
  parse: () => parse25,
  structure: () => structure24,
})
var name24 = 'Number'
var structure24 = {
  value: String,
}
function parse25() {
  return {
    type: 'Number',
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consume(Number2),
  }
}
function generate25(node) {
  this.token(Number2, node.value)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Operator.js
var Operator_exports = {}
__export(Operator_exports, {
  generate: () => generate26,
  name: () => name25,
  parse: () => parse26,
  structure: () => structure25,
})
var name25 = 'Operator'
var structure25 = {
  value: String,
}
function parse26() {
  const start = this.tokenStart
  this.next()
  return {
    type: 'Operator',
    loc: this.getLocation(start, this.tokenStart),
    value: this.substrToCursor(start),
  }
}
function generate26(node) {
  this.tokenize(node.value)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Parentheses.js
var Parentheses_exports = {}
__export(Parentheses_exports, {
  generate: () => generate27,
  name: () => name26,
  parse: () => parse27,
  structure: () => structure26,
})
var name26 = 'Parentheses'
var structure26 = {
  children: [[]],
}
function parse27(readSequence3, recognizer) {
  const start = this.tokenStart
  let children = null
  this.eat(LeftParenthesis)
  children = readSequence3.call(this, recognizer)
  if (!this.eof) this.eat(RightParenthesis)

  return {
    type: 'Parentheses',
    loc: this.getLocation(start, this.tokenStart),
    children,
  }
}
function generate27(node) {
  this.token(LeftParenthesis, '(')
  this.children(node)
  this.token(RightParenthesis, ')')
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Percentage.js
var Percentage_exports = {}
__export(Percentage_exports, {
  generate: () => generate28,
  name: () => name27,
  parse: () => parse28,
  structure: () => structure27,
})
var name27 = 'Percentage'
var structure27 = {
  value: String,
}
function parse28() {
  return {
    type: 'Percentage',
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: this.consumeNumber(Percentage),
  }
}
function generate28(node) {
  this.token(Percentage, `${node.value}%`)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
var PseudoClassSelector_exports = {}
__export(PseudoClassSelector_exports, {
  generate: () => generate29,
  name: () => name28,
  parse: () => parse29,
  structure: () => structure28,
  walkContext: () => walkContext6,
})
var name28 = 'PseudoClassSelector'
var walkContext6 = 'function'
var structure28 = {
  name: String,
  children: [['Raw'], null],
}
function parse29() {
  const start = this.tokenStart
  let children = null
  let name42
  let nameLowerCase
  this.eat(Colon)
  if (this.tokenType === Function) {
    name42 = this.consumeFunctionName()
    nameLowerCase = name42.toLowerCase()
    if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
      this.skipSC()
      children = this.pseudo[nameLowerCase].call(this)
      this.skipSC()
    } else {
      children = this.createList()
      children.push(this.Raw(this.tokenIndex, null, false))
    }
    this.eat(RightParenthesis)
  } else {
    name42 = this.consume(Ident)
  }
  return {
    type: 'PseudoClassSelector',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    children,
  }
}
function generate29(node) {
  this.token(Colon, ':')
  if (node.children === null) {
    this.token(Ident, node.name)
  } else {
    this.token(Function, `${node.name}(`)
    this.children(node)
    this.token(RightParenthesis, ')')
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
var PseudoElementSelector_exports = {}
__export(PseudoElementSelector_exports, {
  generate: () => generate30,
  name: () => name29,
  parse: () => parse30,
  structure: () => structure29,
  walkContext: () => walkContext7,
})
var name29 = 'PseudoElementSelector'
var walkContext7 = 'function'
var structure29 = {
  name: String,
  children: [['Raw'], null],
}
function parse30() {
  const start = this.tokenStart
  let children = null
  let name42
  let nameLowerCase
  this.eat(Colon)
  this.eat(Colon)
  if (this.tokenType === Function) {
    name42 = this.consumeFunctionName()
    nameLowerCase = name42.toLowerCase()
    if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
      this.skipSC()
      children = this.pseudo[nameLowerCase].call(this)
      this.skipSC()
    } else {
      children = this.createList()
      children.push(this.Raw(this.tokenIndex, null, false))
    }
    this.eat(RightParenthesis)
  } else {
    name42 = this.consume(Ident)
  }
  return {
    type: 'PseudoElementSelector',
    loc: this.getLocation(start, this.tokenStart),
    name: name42,
    children,
  }
}
function generate30(node) {
  this.token(Colon, ':')
  this.token(Colon, ':')
  if (node.children === null) {
    this.token(Ident, node.name)
  } else {
    this.token(Function, `${node.name}(`)
    this.children(node)
    this.token(RightParenthesis, ')')
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Ratio.js
var Ratio_exports = {}
__export(Ratio_exports, {
  generate: () => generate31,
  name: () => name30,
  parse: () => parse31,
  structure: () => structure30,
})
const SOLIDUS4 = 47
const FULLSTOP2 = 46
function consumeNumber2() {
  this.skipSC()
  const value = this.consume(Number2)
  for (let i = 0; i < value.length; i++) {
    const code2 = value.charCodeAt(i)
    if (!isDigit(code2) && code2 !== FULLSTOP2)
      this.error(
        'Unsigned number is expected',
        this.tokenStart - value.length + i,
      )
  }
  if (Number(value) === 0)
    this.error('Zero number is not allowed', this.tokenStart - value.length)

  return value
}
var name30 = 'Ratio'
var structure30 = {
  left: String,
  right: String,
}
function parse31() {
  const start = this.tokenStart
  const left = consumeNumber2.call(this)
  let right
  this.skipSC()
  this.eatDelim(SOLIDUS4)
  right = consumeNumber2.call(this)
  return {
    type: 'Ratio',
    loc: this.getLocation(start, this.tokenStart),
    left,
    right,
  }
}
function generate31(node) {
  this.token(Number2, node.left)
  this.token(Delim, '/')
  this.token(Number2, node.right)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Raw.js
var Raw_exports = {}
__export(Raw_exports, {
  generate: () => generate32,
  name: () => name31,
  parse: () => parse32,
  structure: () => structure31,
})
function getOffsetExcludeWS() {
  if (this.tokenIndex > 0) {
    if (this.lookupType(-1) === WhiteSpace)
      return this.tokenIndex > 1
        ? this.getTokenStart(this.tokenIndex - 1)
        : this.firstCharOffset
  }
  return this.tokenStart
}
var name31 = 'Raw'
var structure31 = {
  value: String,
}
function parse32(startToken, consumeUntil, excludeWhiteSpace) {
  const startOffset = this.getTokenStart(startToken)
  let endOffset
  this.skipUntilBalanced(
    startToken,
    consumeUntil || this.consumeUntilBalanceEnd,
  )
  if (excludeWhiteSpace && this.tokenStart > startOffset)
    endOffset = getOffsetExcludeWS.call(this)
  else endOffset = this.tokenStart

  return {
    type: 'Raw',
    loc: this.getLocation(startOffset, endOffset),
    value: this.substring(startOffset, endOffset),
  }
}
function generate32(node) {
  this.tokenize(node.value)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Rule.js
var Rule_exports = {}
__export(Rule_exports, {
  generate: () => generate33,
  name: () => name32,
  parse: () => parse33,
  structure: () => structure32,
  walkContext: () => walkContext8,
})
function consumeRaw4(startToken) {
  return this.Raw(startToken, this.consumeUntilLeftCurlyBracket, true)
}
function consumePrelude() {
  const prelude = this.SelectorList()
  if (
    prelude.type !== 'Raw' &&
    this.eof === false &&
    this.tokenType !== LeftCurlyBracket
  )
    this.error()

  return prelude
}
var name32 = 'Rule'
var walkContext8 = 'rule'
var structure32 = {
  prelude: ['SelectorList', 'Raw'],
  block: ['Block'],
}
function parse33() {
  const startToken = this.tokenIndex
  const startOffset = this.tokenStart
  let prelude
  let block
  if (this.parseRulePrelude)
    prelude = this.parseWithFallback(consumePrelude, consumeRaw4)
  else prelude = consumeRaw4.call(this, startToken)

  block = this.Block(true)
  return {
    type: 'Rule',
    loc: this.getLocation(startOffset, this.tokenStart),
    prelude,
    block,
  }
}
function generate33(node) {
  this.node(node.prelude)
  this.node(node.block)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Selector.js
var Selector_exports = {}
__export(Selector_exports, {
  generate: () => generate34,
  name: () => name33,
  parse: () => parse34,
  structure: () => structure33,
})
var name33 = 'Selector'
var structure33 = {
  children: [
    [
      'TypeSelector',
      'IdSelector',
      'ClassSelector',
      'AttributeSelector',
      'PseudoClassSelector',
      'PseudoElementSelector',
      'Combinator',
      'WhiteSpace',
    ],
  ],
}
function parse34() {
  const children = this.readSequence(this.scope.Selector)
  if (this.getFirstListNode(children) === null)
    this.error('Selector is expected')

  return {
    type: 'Selector',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate34(node) {
  this.children(node)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/SelectorList.js
var SelectorList_exports = {}
__export(SelectorList_exports, {
  generate: () => generate35,
  name: () => name34,
  parse: () => parse35,
  structure: () => structure34,
  walkContext: () => walkContext9,
})
var name34 = 'SelectorList'
var walkContext9 = 'selector'
var structure34 = {
  children: [['Selector', 'Raw']],
}
function parse35() {
  const children = this.createList()
  while (!this.eof) {
    children.push(this.Selector())
    if (this.tokenType === Comma) {
      this.next()
      continue
    }
    break
  }
  return {
    type: 'SelectorList',
    loc: this.getLocationFromList(children),
    children,
  }
}
function generate35(node) {
  this.children(node, () => this.token(Comma, ','))
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/String.js
var String_exports = {}
__export(String_exports, {
  generate: () => generate36,
  name: () => name35,
  parse: () => parse36,
  structure: () => structure35,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/string.js
const string_exports = {}
__export(string_exports, {
  decode: () => decode,
  encode: () => encode,
})
const REVERSE_SOLIDUS = 92
const QUOTATION_MARK = 34
const APOSTROPHE2 = 39
function decode(str) {
  const len = str.length
  const firstChar = str.charCodeAt(0)
  const start =
    firstChar === QUOTATION_MARK || firstChar === APOSTROPHE2 ? 1 : 0
  const end =
    start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar
      ? len - 2
      : len - 1
  let decoded = ''
  for (let i = start; i <= end; i++) {
    let code2 = str.charCodeAt(i)
    if (code2 === REVERSE_SOLIDUS) {
      if (i === end) {
        if (i !== len - 1) decoded = str.substr(i + 1)

        break
      }
      code2 = str.charCodeAt(++i)
      if (isValidEscape(REVERSE_SOLIDUS, code2)) {
        const escapeStart = i - 1
        const escapeEnd = consumeEscaped(str, escapeStart)
        i = escapeEnd - 1
        decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd))
      } else {
        if (code2 === 13 && str.charCodeAt(i + 1) === 10) i++
      }
    } else {
      decoded += str[i]
    }
  }
  return decoded
}
function encode(str, apostrophe) {
  const quote = apostrophe ? "'" : '"'
  const quoteCode = apostrophe ? APOSTROPHE2 : QUOTATION_MARK
  let encoded = ''
  let wsBeforeHexIsNeeded = false
  for (let i = 0; i < str.length; i++) {
    const code2 = str.charCodeAt(i)
    if (code2 === 0) {
      encoded += '�'
      continue
    }
    if (code2 <= 31 || code2 === 127) {
      encoded += `\\${code2.toString(16)}`
      wsBeforeHexIsNeeded = true
      continue
    }
    if (code2 === quoteCode || code2 === REVERSE_SOLIDUS) {
      encoded += `\\${str.charAt(i)}`
      wsBeforeHexIsNeeded = false
    } else {
      if (wsBeforeHexIsNeeded && (isHexDigit(code2) || isWhiteSpace(code2)))
        encoded += ' '

      encoded += str.charAt(i)
      wsBeforeHexIsNeeded = false
    }
  }
  return quote + encoded + quote
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/String.js
var name35 = 'String'
var structure35 = {
  value: String,
}
function parse36() {
  return {
    type: 'String',
    loc: this.getLocation(this.tokenStart, this.tokenEnd),
    value: decode(this.consume(String2)),
  }
}
function generate36(node) {
  this.token(String2, encode(node.value))
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/StyleSheet.js
var StyleSheet_exports = {}
__export(StyleSheet_exports, {
  generate: () => generate37,
  name: () => name36,
  parse: () => parse37,
  structure: () => structure36,
  walkContext: () => walkContext10,
})
const EXCLAMATIONMARK4 = 33
function consumeRaw5(startToken) {
  return this.Raw(startToken, null, false)
}
var name36 = 'StyleSheet'
var walkContext10 = 'stylesheet'
var structure36 = {
  children: [['Comment', 'CDO', 'CDC', 'Atrule', 'Rule', 'Raw']],
}
function parse37() {
  const start = this.tokenStart
  const children = this.createList()
  let child
  scan: while (!this.eof) {
    switch (this.tokenType) {
      case WhiteSpace:
        this.next()
        continue
      case Comment:
        if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK4) {
          this.next()
          continue
        }
        child = this.Comment()
        break
      case CDO:
        child = this.CDO()
        break
      case CDC:
        child = this.CDC()
        break
      case AtKeyword:
        child = this.parseWithFallback(this.Atrule, consumeRaw5)
        break
      default:
        child = this.parseWithFallback(this.Rule, consumeRaw5)
    }
    children.push(child)
  }
  return {
    type: 'StyleSheet',
    loc: this.getLocation(start, this.tokenStart),
    children,
  }
}
function generate37(node) {
  this.children(node)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/TypeSelector.js
var TypeSelector_exports = {}
__export(TypeSelector_exports, {
  generate: () => generate38,
  name: () => name37,
  parse: () => parse38,
  structure: () => structure37,
})
const ASTERISK5 = 42
const VERTICALLINE3 = 124
function eatIdentifierOrAsterisk() {
  if (this.tokenType !== Ident && this.isDelim(ASTERISK5) === false)
    this.error('Identifier or asterisk is expected')

  this.next()
}
var name37 = 'TypeSelector'
var structure37 = {
  name: String,
}
function parse38() {
  const start = this.tokenStart
  if (this.isDelim(VERTICALLINE3)) {
    this.next()
    eatIdentifierOrAsterisk.call(this)
  } else {
    eatIdentifierOrAsterisk.call(this)
    if (this.isDelim(VERTICALLINE3)) {
      this.next()
      eatIdentifierOrAsterisk.call(this)
    }
  }
  return {
    type: 'TypeSelector',
    loc: this.getLocation(start, this.tokenStart),
    name: this.substrToCursor(start),
  }
}
function generate38(node) {
  this.tokenize(node.name)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/UnicodeRange.js
var UnicodeRange_exports = {}
__export(UnicodeRange_exports, {
  generate: () => generate39,
  name: () => name38,
  parse: () => parse39,
  structure: () => structure38,
})
const PLUSSIGN8 = 43
const HYPHENMINUS6 = 45
const QUESTIONMARK3 = 63
function eatHexSequence(offset, allowDash) {
  let len = 0
  for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
    const code2 = this.charCodeAt(pos)
    if (code2 === HYPHENMINUS6 && allowDash && len !== 0) {
      eatHexSequence.call(this, offset + len + 1, false)
      return -1
    }
    if (!isHexDigit(code2)) {
      this.error(
        allowDash && len !== 0
          ? `Hyphen minus${len < 6 ? ' or hex digit' : ''} is expected`
          : len < 6
          ? 'Hex digit is expected'
          : 'Unexpected input',
        pos,
      )
    }
    if (++len > 6) this.error('Too many hex digits', pos)
  }
  this.next()
  return len
}
function eatQuestionMarkSequence(max) {
  let count = 0
  while (this.isDelim(QUESTIONMARK3)) {
    if (++count > max) this.error('Too many question marks')

    this.next()
  }
}
function startsWith2(code2) {
  if (this.charCodeAt(this.tokenStart) !== code2)
    this.error(
      `${code2 === PLUSSIGN8 ? 'Plus sign' : 'Hyphen minus'} is expected`,
    )
}
function scanUnicodeRange() {
  let hexLength = 0
  switch (this.tokenType) {
    case Number2:
      hexLength = eatHexSequence.call(this, 1, true)
      if (this.isDelim(QUESTIONMARK3)) {
        eatQuestionMarkSequence.call(this, 6 - hexLength)
        break
      }
      if (this.tokenType === Dimension || this.tokenType === Number2) {
        startsWith2.call(this, HYPHENMINUS6)
        eatHexSequence.call(this, 1, false)
        break
      }
      break
    case Dimension:
      hexLength = eatHexSequence.call(this, 1, true)
      if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength)

      break
    default:
      this.eatDelim(PLUSSIGN8)
      if (this.tokenType === Ident) {
        hexLength = eatHexSequence.call(this, 0, true)
        if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength)

        break
      }
      if (this.isDelim(QUESTIONMARK3)) {
        this.next()
        eatQuestionMarkSequence.call(this, 5)
        break
      }
      this.error('Hex digit or question mark is expected')
  }
}
var name38 = 'UnicodeRange'
var structure38 = {
  value: String,
}
function parse39() {
  const start = this.tokenStart
  this.eatIdent('u')
  scanUnicodeRange.call(this)
  return {
    type: 'UnicodeRange',
    loc: this.getLocation(start, this.tokenStart),
    value: this.substrToCursor(start),
  }
}
function generate39(node) {
  this.tokenize(node.value)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Url.js
var Url_exports = {}
__export(Url_exports, {
  generate: () => generate40,
  name: () => name39,
  parse: () => parse40,
  structure: () => structure39,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/url.js
const url_exports = {}
__export(url_exports, {
  decode: () => decode2,
  encode: () => encode2,
})
const SPACE3 = 32
const REVERSE_SOLIDUS2 = 92
const QUOTATION_MARK2 = 34
const APOSTROPHE3 = 39
const LEFTPARENTHESIS3 = 40
const RIGHTPARENTHESIS3 = 41
function decode2(str) {
  const len = str.length
  let start = 4
  let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS3 ? len - 2 : len - 1
  let decoded = ''
  while (start < end && isWhiteSpace(str.charCodeAt(start))) start++

  while (start < end && isWhiteSpace(str.charCodeAt(end))) end--

  for (let i = start; i <= end; i++) {
    let code2 = str.charCodeAt(i)
    if (code2 === REVERSE_SOLIDUS2) {
      if (i === end) {
        if (i !== len - 1) decoded = str.substr(i + 1)

        break
      }
      code2 = str.charCodeAt(++i)
      if (isValidEscape(REVERSE_SOLIDUS2, code2)) {
        const escapeStart = i - 1
        const escapeEnd = consumeEscaped(str, escapeStart)
        i = escapeEnd - 1
        decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd))
      } else {
        if (code2 === 13 && str.charCodeAt(i + 1) === 10) i++
      }
    } else {
      decoded += str[i]
    }
  }
  return decoded
}
function encode2(str) {
  let encoded = ''
  let wsBeforeHexIsNeeded = false
  for (let i = 0; i < str.length; i++) {
    const code2 = str.charCodeAt(i)
    if (code2 === 0) {
      encoded += '�'
      continue
    }
    if (code2 <= 31 || code2 === 127) {
      encoded += `\\${code2.toString(16)}`
      wsBeforeHexIsNeeded = true
      continue
    }
    if (
      code2 === SPACE3 ||
      code2 === REVERSE_SOLIDUS2 ||
      code2 === QUOTATION_MARK2 ||
      code2 === APOSTROPHE3 ||
      code2 === LEFTPARENTHESIS3 ||
      code2 === RIGHTPARENTHESIS3
    ) {
      encoded += `\\${str.charAt(i)}`
      wsBeforeHexIsNeeded = false
    } else {
      if (wsBeforeHexIsNeeded && isHexDigit(code2)) encoded += ' '

      encoded += str.charAt(i)
      wsBeforeHexIsNeeded = false
    }
  }
  return `url(${encoded})`
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Url.js
var name39 = 'Url'
var structure39 = {
  value: String,
}
function parse40() {
  const start = this.tokenStart
  let value
  switch (this.tokenType) {
    case Url:
      value = decode2(this.consume(Url))
      break
    case Function:
      if (!this.cmpStr(this.tokenStart, this.tokenEnd, 'url('))
        this.error('Function name must be `url`')

      this.eat(Function)
      this.skipSC()
      value = decode(this.consume(String2))
      this.skipSC()
      if (!this.eof) this.eat(RightParenthesis)

      break
    default:
      this.error('Url or Function is expected')
  }
  return {
    type: 'Url',
    loc: this.getLocation(start, this.tokenStart),
    value,
  }
}
function generate40(node) {
  this.token(Url, encode2(node.value))
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/Value.js
var Value_exports = {}
__export(Value_exports, {
  generate: () => generate41,
  name: () => name40,
  parse: () => parse41,
  structure: () => structure40,
})
var name40 = 'Value'
var structure40 = {
  children: [[]],
}
function parse41() {
  const start = this.tokenStart
  const children = this.readSequence(this.scope.Value)
  return {
    type: 'Value',
    loc: this.getLocation(start, this.tokenStart),
    children,
  }
}
function generate41(node) {
  this.children(node)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/WhiteSpace.js
var WhiteSpace_exports = {}
__export(WhiteSpace_exports, {
  generate: () => generate42,
  name: () => name41,
  parse: () => parse42,
  structure: () => structure41,
})
const SPACE4 = Object.freeze({
  type: 'WhiteSpace',
  loc: null,
  value: ' ',
})
var name41 = 'WhiteSpace'
var structure41 = {
  value: String,
}
function parse42() {
  this.eat(WhiteSpace)
  return SPACE4
}
function generate42(node) {
  this.token(WhiteSpace, node.value)
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/config/lexer.js
const lexer_default = {
  generic: true,
  ...data_default,
  node: node_exports,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/scope/index.js
const scope_exports = {}
__export(scope_exports, {
  AtrulePrelude: () => atrulePrelude_default,
  Selector: () => selector_default,
  Value: () => value_default,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/scope/default.js
const NUMBERSIGN4 = 35
const ASTERISK6 = 42
const PLUSSIGN9 = 43
const HYPHENMINUS7 = 45
const SOLIDUS5 = 47
const U2 = 117
function defaultRecognizer(context) {
  switch (this.tokenType) {
    case Hash:
      return this.Hash()
    case Comma:
      return this.Operator()
    case LeftParenthesis:
      return this.Parentheses(this.readSequence, context.recognizer)
    case LeftSquareBracket:
      return this.Brackets(this.readSequence, context.recognizer)
    case String2:
      return this.String()
    case Dimension:
      return this.Dimension()
    case Percentage:
      return this.Percentage()
    case Number2:
      return this.Number()
    case Function:
      return this.cmpStr(this.tokenStart, this.tokenEnd, 'url(')
        ? this.Url()
        : this.Function(this.readSequence, context.recognizer)
    case Url:
      return this.Url()
    case Ident:
      if (
        this.cmpChar(this.tokenStart, U2) &&
        this.cmpChar(this.tokenStart + 1, PLUSSIGN9)
      )
        return this.UnicodeRange()
      else return this.Identifier()

    case Delim: {
      const code2 = this.charCodeAt(this.tokenStart)
      if (
        code2 === SOLIDUS5 ||
        code2 === ASTERISK6 ||
        code2 === PLUSSIGN9 ||
        code2 === HYPHENMINUS7
      )
        return this.Operator()

      if (code2 === NUMBERSIGN4)
        this.error('Hex or identifier is expected', this.tokenStart + 1)

      break
    }
  }
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
var atrulePrelude_default = {
  getNode: defaultRecognizer,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/scope/selector.js
const NUMBERSIGN5 = 35
const AMPERSAND6 = 38
const ASTERISK7 = 42
const PLUSSIGN10 = 43
const SOLIDUS6 = 47
const FULLSTOP3 = 46
const GREATERTHANSIGN3 = 62
const VERTICALLINE4 = 124
const TILDE3 = 126
function onWhiteSpace(next, children) {
  if (
    children.last !== null &&
    children.last.type !== 'Combinator' &&
    next !== null &&
    next.type !== 'Combinator'
  ) {
    children.push({
      // FIXME: this.Combinator() should be used instead
      type: 'Combinator',
      loc: null,
      name: ' ',
    })
  }
}
function getNode() {
  switch (this.tokenType) {
    case LeftSquareBracket:
      return this.AttributeSelector()
    case Hash:
      return this.IdSelector()
    case Colon:
      if (this.lookupType(1) === Colon) return this.PseudoElementSelector()
      else return this.PseudoClassSelector()

    case Ident:
      return this.TypeSelector()
    case Number2:
    case Percentage:
      return this.Percentage()
    case Dimension:
      if (this.charCodeAt(this.tokenStart) === FULLSTOP3)
        this.error('Identifier is expected', this.tokenStart + 1)

      break
    case Delim: {
      const code2 = this.charCodeAt(this.tokenStart)
      switch (code2) {
        case PLUSSIGN10:
        case GREATERTHANSIGN3:
        case TILDE3:
        case SOLIDUS6:
          return this.Combinator()
        case FULLSTOP3:
          return this.ClassSelector()
        case ASTERISK7:
        case VERTICALLINE4:
          return this.TypeSelector()
        case NUMBERSIGN5:
          return this.IdSelector()
        case AMPERSAND6:
          return this.NestingSelector()
      }
      break
    }
  }
}
var selector_default = {
  onWhiteSpace,
  getNode,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/function/expression.js
function expression_default() {
  return this.createSingleNodeList(this.Raw(this.tokenIndex, null, false))
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/function/var.js
function var_default() {
  const children = this.createList()
  this.skipSC()
  children.push(this.Identifier())
  this.skipSC()
  if (this.tokenType === Comma) {
    children.push(this.Operator())
    const startIndex = this.tokenIndex
    const value = this.parseCustomProperty
      ? this.Value(null)
      : this.Raw(
          this.tokenIndex,
          this.consumeUntilExclamationMarkOrSemicolon,
          false,
        )
    if (value.type === 'Value' && value.children.isEmpty) {
      for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) {
        if (this.lookupType(offset) === WhiteSpace) {
          value.children.appendData({
            type: 'WhiteSpace',
            loc: null,
            value: ' ',
          })
          break
        }
      }
    }
    children.push(value)
  }
  return children
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/scope/value.js
function isPlusMinusOperator(node) {
  return (
    node !== null &&
    node.type === 'Operator' &&
    (node.value[node.value.length - 1] === '-' ||
      node.value[node.value.length - 1] === '+')
  )
}
var value_default = {
  getNode: defaultRecognizer,
  onWhiteSpace(next, children) {
    if (isPlusMinusOperator(next)) next.value = ` ${next.value}`

    if (isPlusMinusOperator(children.last)) children.last.value += ' '
  },
  expression: expression_default,
  var: var_default,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/font-face.js
const font_face_default = {
  parse: {
    prelude: null,
    block() {
      return this.Block(true)
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/import.js
const import_default6 = {
  parse: {
    prelude() {
      const children = this.createList()
      this.skipSC()
      switch (this.tokenType) {
        case String2:
          children.push(this.String())
          break
        case Url:
        case Function:
          children.push(this.Url())
          break
        default:
          this.error('String or url() is expected')
      }
      if (
        this.lookupNonWSType(0) === Ident ||
        this.lookupNonWSType(0) === LeftParenthesis
      )
        children.push(this.MediaQueryList())

      return children
    },
    block: null,
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/media.js
const media_default = {
  parse: {
    prelude() {
      return this.createSingleNodeList(this.MediaQueryList())
    },
    block(isStyleBlock = false) {
      return this.Block(isStyleBlock)
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/nest.js
const nest_default = {
  parse: {
    prelude() {
      return this.createSingleNodeList(this.SelectorList())
    },
    block() {
      return this.Block(true)
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/page.js
const page_default = {
  parse: {
    prelude() {
      return this.createSingleNodeList(this.SelectorList())
    },
    block() {
      return this.Block(true)
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/supports.js
function consumeRaw6() {
  return this.createSingleNodeList(this.Raw(this.tokenIndex, null, false))
}
function parentheses() {
  this.skipSC()
  if (this.tokenType === Ident && this.lookupNonWSType(1) === Colon) {
    return this.createSingleNodeList(this.Declaration())
  }
  return readSequence2.call(this)
}
function readSequence2() {
  const children = this.createList()
  let child
  this.skipSC()
  scan: while (!this.eof) {
    switch (this.tokenType) {
      case Comment:
      case WhiteSpace:
        this.next()
        continue
      case Function:
        child = this.Function(consumeRaw6, this.scope.AtrulePrelude)
        break
      case Ident:
        child = this.Identifier()
        break
      case LeftParenthesis:
        child = this.Parentheses(parentheses, this.scope.AtrulePrelude)
        break
      default:
        break scan
    }
    children.push(child)
  }
  return children
}
const supports_default = {
  parse: {
    prelude() {
      const children = readSequence2.call(this)
      if (this.getFirstListNode(children) === null)
        this.error('Condition is expected')

      return children
    },
    block(isStyleBlock = false) {
      return this.Block(isStyleBlock)
    },
  },
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/atrule/index.js
const atrule_default = {
  'font-face': font_face_default,
  import: import_default6,
  media: media_default,
  nest: nest_default,
  page: page_default,
  supports: supports_default,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/pseudo/index.js
const selectorList = {
  parse() {
    return this.createSingleNodeList(this.SelectorList())
  },
}
const selector = {
  parse() {
    return this.createSingleNodeList(this.Selector())
  },
}
const identList = {
  parse() {
    return this.createSingleNodeList(this.Identifier())
  },
}
const nth = {
  parse() {
    return this.createSingleNodeList(this.Nth())
  },
}
const pseudo_default = {
  dir: identList,
  has: selectorList,
  lang: identList,
  matches: selectorList,
  is: selectorList,
  '-moz-any': selectorList,
  '-webkit-any': selectorList,
  where: selectorList,
  not: selectorList,
  'nth-child': nth,
  'nth-last-child': nth,
  'nth-last-of-type': nth,
  'nth-of-type': nth,
  slotted: selector,
  host: selector,
  'host-context': selector,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/node/index-parse.js
const index_parse_exports = {}
__export(index_parse_exports, {
  AnPlusB: () => parse2,
  Atrule: () => parse3,
  AtrulePrelude: () => parse4,
  AttributeSelector: () => parse5,
  Block: () => parse6,
  Brackets: () => parse7,
  CDC: () => parse8,
  CDO: () => parse9,
  ClassSelector: () => parse10,
  Combinator: () => parse11,
  Comment: () => parse12,
  Declaration: () => parse13,
  DeclarationList: () => parse14,
  Dimension: () => parse15,
  Function: () => parse16,
  Hash: () => parse17,
  IdSelector: () => parse19,
  Identifier: () => parse18,
  MediaFeature: () => parse20,
  MediaQuery: () => parse21,
  MediaQueryList: () => parse22,
  NestingSelector: () => parse23,
  Nth: () => parse24,
  Number: () => parse25,
  Operator: () => parse26,
  Parentheses: () => parse27,
  Percentage: () => parse28,
  PseudoClassSelector: () => parse29,
  PseudoElementSelector: () => parse30,
  Ratio: () => parse31,
  Raw: () => parse32,
  Rule: () => parse33,
  Selector: () => parse34,
  SelectorList: () => parse35,
  String: () => parse36,
  StyleSheet: () => parse37,
  TypeSelector: () => parse38,
  UnicodeRange: () => parse39,
  Url: () => parse40,
  Value: () => parse41,
  WhiteSpace: () => parse42,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/config/parser.js
const parser_default = {
  parseContext: {
    default: 'StyleSheet',
    stylesheet: 'StyleSheet',
    atrule: 'Atrule',
    atrulePrelude(options) {
      return this.AtrulePrelude(options.atrule ? String(options.atrule) : null)
    },
    mediaQueryList: 'MediaQueryList',
    mediaQuery: 'MediaQuery',
    rule: 'Rule',
    selectorList: 'SelectorList',
    selector: 'Selector',
    block() {
      return this.Block(true)
    },
    declarationList: 'DeclarationList',
    declaration: 'Declaration',
    value: 'Value',
  },
  scope: scope_exports,
  atrule: atrule_default,
  pseudo: pseudo_default,
  node: index_parse_exports,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/config/walker.js
const walker_default = {
  node: node_exports,
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/syntax/index.js
const syntax_default = create_default({
  ...lexer_default,
  ...parser_default,
  ...walker_default,
})

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/clone.js
function clone2(node) {
  const result = {}
  for (const key in node) {
    let value = node[key]
    if (value) {
      if (Array.isArray(value) || value instanceof List)
        value = value.map(clone2)
      else if (value.constructor === Object) value = clone2(value)
    }
    result[key] = value
  }
  return result
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/utils/ident.js
const ident_exports = {}
__export(ident_exports, {
  decode: () => decode3,
  encode: () => encode3,
})
const REVERSE_SOLIDUS3 = 92
function decode3(str) {
  const end = str.length - 1
  let decoded = ''
  for (let i = 0; i < str.length; i++) {
    let code2 = str.charCodeAt(i)
    if (code2 === REVERSE_SOLIDUS3) {
      if (i === end) break

      code2 = str.charCodeAt(++i)
      if (isValidEscape(REVERSE_SOLIDUS3, code2)) {
        const escapeStart = i - 1
        const escapeEnd = consumeEscaped(str, escapeStart)
        i = escapeEnd - 1
        decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd))
      } else {
        if (code2 === 13 && str.charCodeAt(i + 1) === 10) i++
      }
    } else {
      decoded += str[i]
    }
  }
  return decoded
}
function encode3(str) {
  let encoded = ''
  if (str.length === 1 && str.charCodeAt(0) === 45) return '\\-'

  for (let i = 0; i < str.length; i++) {
    const code2 = str.charCodeAt(i)
    if (code2 === 0) {
      encoded += '�'
      continue
    }
    if (
      // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F ...
      // Note: Do not compare with 0x0001 since 0x0000 is precessed before
      code2 <= 31 ||
      code2 === 127 || // [or] ... is in the range [0-9] (U+0030 to U+0039),
      (code2 >= 48 &&
        code2 <= 57 && // If the character is the first character ...
        (i === 0 || // If the character is the second character ... and the first character is a "-" (U+002D)
          (i === 1 && str.charCodeAt(0) === 45)))
    ) {
      encoded += `\\${code2.toString(16)} `
      continue
    }
    if (isName(code2)) encoded += str.charAt(i)
    else encoded += `\\${str.charAt(i)}`
  }
  return encoded
}

// node_modules/.pnpm/css-tree@2.3.1/node_modules/css-tree/lib/index.js
const {
  tokenize: tokenize2,
  parse: parse43,
  generate: generate43,
  lexer,
  createLexer,
  walk: walk2,
  find,
  findLast,
  findAll,
  toPlainObject,
  fromPlainObject,
  fork,
} = syntax_default

// node_modules/.pnpm/@unocss+transformer-directives@0.29.6/node_modules/@unocss/transformer-directives/dist/index.mjs
const regexCssId = /\.(css|postcss|sass|scss|less|stylus|styl)$/
function transformerDirectives(options) {
  return {
    name: 'css-directive',
    enforce: options == null ? void 0 : options.enforce,
    idFilter: (id) => !!id.match(regexCssId),
    transform: (code2, id, ctx) => {
      return transformDirectives(code2, ctx.uno, id)
    },
  }
}
async function transformDirectives(code2, uno, filename, originalCode, offset) {
  if (!code2.original.includes('@apply')) return
  const ast = parse43(originalCode || code2.original, {
    parseAtrulePrelude: false,
    positions: true,
    filename,
  })
  const calcOffset = (pos) => (offset ? pos + offset : pos)
  if (ast.type !== 'StyleSheet') return
  const stack = []
  const processNode = async (node, _item, _list) => {
    if (node.type !== 'Rule') return
    await Promise.all(
      node.block.children
        .map(async (childNode, _childItem) => {
          if (childNode.type === 'Raw')
            return transformDirectives(
              code2,
              uno,
              filename,
              childNode.value,
              calcOffset(childNode.loc.start.offset),
            )
          if (
            !(
              childNode.type === 'Atrule' &&
              childNode.name === 'apply' &&
              childNode.prelude
            )
          )
            return
          if (childNode.prelude.type !== 'Raw') return
          const classNames = expandVariantGroup(childNode.prelude.value).split(
            /\s+/g,
          )
          const utils = (
            await Promise.all(classNames.map((i) => uno.parseToken(i, '-')))
          )
            .filter(notNull)
            .flat()
            .sort((a, b) => a[0] - b[0])
            .sort(
              (a, b) =>
                (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) -
                (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0),
            )
            .reduce((acc, item) => {
              const target = acc.find(
                (i) => i[1] === item[1] && i[3] === item[3],
              )
              if (target) target[2] += item[2]
              else acc.push([...item])
              return acc
            }, [])
          if (!utils.length) return
          for (const i of utils) {
            const [, _selector, body, parent] = i
            const selector2 =
              (_selector == null
                ? void 0
                : _selector.replace(regexScopePlaceholder, ' ')) || _selector
            if (parent || (selector2 && selector2 !== '.\\-')) {
              let newSelector = generate43(node.prelude)
              if (selector2 && selector2 !== '.\\-') {
                const selectorAST = parse43(selector2, {
                  context: 'selector',
                })
                const prelude = clone2(node.prelude)
                prelude.children.forEach((child) => {
                  const parentSelectorAst = clone2(selectorAST)
                  parentSelectorAst.children.forEach((i2) => {
                    if (i2.type === 'ClassSelector' && i2.name === '\\-')
                      Object.assign(i2, clone2(child))
                  })
                  Object.assign(child, parentSelectorAst)
                })
                newSelector = generate43(prelude)
              }
              let css = `${newSelector}{${body}}`
              if (parent) css = `${parent}{${css}}`
              code2.appendLeft(calcOffset(node.loc.end.offset), css)
            } else {
              code2.appendRight(calcOffset(childNode.loc.end.offset), body)
            }
          }
          code2.remove(
            calcOffset(childNode.loc.start.offset),
            calcOffset(childNode.loc.end.offset),
          )
        })
        .toArray(),
    )
  }
  walk2(ast, (...args) => stack.push(processNode(...args)))
  await Promise.all(stack)
}

// node_modules/.pnpm/@unocss+transformer-variant-group@0.29.6/node_modules/@unocss/transformer-variant-group/dist/index.mjs
function transformerVariantGroup() {
  return {
    name: 'variant-group',
    enforce: 'pre',
    transform(s) {
      expandVariantGroup(s)
    },
  }
}

// node_modules/.pnpm/unocss@0.29.6/node_modules/unocss/dist/index.mjs
function defineConfig(config) {
  return config
}
export {
  BetterMap,
  CONTROL_SHORTCUT_NO_MERGE,
  TwoKeyMap,
  UnoGenerator,
  attributifyRE,
  clearIdenticalEntries,
  clone,
  createGenerator,
  createValueHandler,
  defineConfig,
  e,
  entriesToCss,
  escapeRegExp,
  escapeSelector,
  expandVariantGroup,
  extractorSplit,
  extractorSvelte,
  hasScopePlaceholder,
  isAttributifySelector,
  isObject,
  isRawUtil,
  isStaticRule,
  isStaticShortcut,
  isValidSelector,
  mergeDeep,
  mergeSet,
  normalizeCSSEntries,
  normalizeCSSValues,
  normalizeVariant,
  notNull,
  preset as presetAttributify,
  preset2 as presetIcons,
  presetMini,
  presetTypography,
  presetUno,
  preset3 as presetWebFonts,
  presetWind,
  regexClassGroup,
  regexScopePlaceholder,
  toArray,
  transformerDirectives,
  transformerVariantGroup,
  uniq,
  validateFilterRE,
  warnOnce,
  withLayer,
}
// # sourceMappingURL=unocss.js.map
