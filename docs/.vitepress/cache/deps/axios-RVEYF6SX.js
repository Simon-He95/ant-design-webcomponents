import { __commonJS } from './chunk-WQG2LZMB.js'

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/bind.js
const require_bind = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/bind.js':
    function (exports, module) {
      'use strict'
      module.exports = function bind(fn, thisArg) {
        return function wrap() {
          const args = new Array(arguments.length)
          for (let i = 0; i < args.length; i++) args[i] = arguments[i]

          return fn.apply(thisArg, args)
        }
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/utils.js
const require_utils = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/utils.js': function (
    exports,
    module,
  ) {
    'use strict'
    const bind = require_bind()
    const toString = Object.prototype.toString
    function isArray(val) {
      return Array.isArray(val)
    }
    function isUndefined(val) {
      return typeof val === 'undefined'
    }
    function isBuffer(val) {
      return (
        val !== null &&
        !isUndefined(val) &&
        val.constructor !== null &&
        !isUndefined(val.constructor) &&
        typeof val.constructor.isBuffer === 'function' &&
        val.constructor.isBuffer(val)
      )
    }
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]'
    }
    function isFormData(val) {
      return toString.call(val) === '[object FormData]'
    }
    function isArrayBufferView(val) {
      let result
      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView)
        result = ArrayBuffer.isView(val)
      else result = val && val.buffer && isArrayBuffer(val.buffer)

      return result
    }
    function isString(val) {
      return typeof val === 'string'
    }
    function isNumber(val) {
      return typeof val === 'number'
    }
    function isObject(val) {
      return val !== null && typeof val === 'object'
    }
    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') return false

      const prototype = Object.getPrototypeOf(val)
      return prototype === null || prototype === Object.prototype
    }
    function isDate(val) {
      return toString.call(val) === '[object Date]'
    }
    function isFile(val) {
      return toString.call(val) === '[object File]'
    }
    function isBlob(val) {
      return toString.call(val) === '[object Blob]'
    }
    function isFunction(val) {
      return toString.call(val) === '[object Function]'
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe)
    }
    function isURLSearchParams(val) {
      return toString.call(val) === '[object URLSearchParams]'
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
    }
    function isStandardBrowserEnv() {
      if (
        typeof navigator !== 'undefined' &&
        (navigator.product === 'ReactNative' ||
          navigator.product === 'NativeScript' ||
          navigator.product === 'NS')
      )
        return false

      return typeof window !== 'undefined' && typeof document !== 'undefined'
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === 'undefined') return

      if (typeof obj !== 'object') obj = [obj]

      if (isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++)
          fn.call(null, obj[i], i, obj)
      } else {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key))
            fn.call(null, obj[key], key, obj)
        }
      }
    }
    function merge() {
      const result = {}
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val))
          result[key] = merge(result[key], val)
        else if (isPlainObject(val)) result[key] = merge({}, val)
        else if (isArray(val)) result[key] = val.slice()
        else result[key] = val
      }
      for (let i = 0, l = arguments.length; i < l; i++)
        forEach(arguments[i], assignValue)

      return result
    }
    function extend(a, b, thisArg) {
      forEach(b, (val, key) => {
        if (thisArg && typeof val === 'function') a[key] = bind(val, thisArg)
        else a[key] = val
      })
      return a
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) content = content.slice(1)

      return content
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
    }
  },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/buildURL.js
const require_buildURL = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/buildURL.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      function encode(val) {
        return encodeURIComponent(val)
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']')
      }
      module.exports = function buildURL(url, params, paramsSerializer) {
        if (!params) return url

        let serializedParams
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params)
        } else if (utils.isURLSearchParams(params)) {
          serializedParams = params.toString()
        } else {
          const parts = []
          utils.forEach(params, (val, key) => {
            if (val === null || typeof val === 'undefined') return

            if (utils.isArray(val)) key = `${key}[]`
            else val = [val]

            utils.forEach(val, (v) => {
              if (utils.isDate(v)) v = v.toISOString()
              else if (utils.isObject(v)) v = JSON.stringify(v)

              parts.push(`${encode(key)}=${encode(v)}`)
            })
          })
          serializedParams = parts.join('&')
        }
        if (serializedParams) {
          const hashmarkIndex = url.indexOf('#')
          if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex)

          url += (!url.includes('?') ? '?' : '&') + serializedParams
        }
        return url
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/InterceptorManager.js
const require_InterceptorManager = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/InterceptorManager.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      function InterceptorManager() {
        this.handlers = []
      }
      InterceptorManager.prototype.use = function use(
        fulfilled,
        rejected,
        options,
      ) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null,
        })
        return this.handlers.length - 1
      }
      InterceptorManager.prototype.eject = function eject(id) {
        if (this.handlers[id]) this.handlers[id] = null
      }
      InterceptorManager.prototype.forEach = function forEach(fn) {
        utils.forEach(this.handlers, (h) => {
          if (h !== null) fn(h)
        })
      }
      module.exports = InterceptorManager
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/normalizeHeaderName.js
const require_normalizeHeaderName = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/normalizeHeaderName.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      module.exports = function normalizeHeaderName(headers, normalizedName) {
        utils.forEach(headers, (value, name) => {
          if (
            name !== normalizedName &&
            name.toUpperCase() === normalizedName.toUpperCase()
          ) {
            headers[normalizedName] = value
            delete headers[name]
          }
        })
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/enhanceError.js
const require_enhanceError = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/enhanceError.js':
    function (exports, module) {
      'use strict'
      module.exports = function enhanceError(
        error,
        config,
        code,
        request,
        response,
      ) {
        error.config = config
        if (code) error.code = code

        error.request = request
        error.response = response
        error.isAxiosError = true
        error.toJSON = function toJSON() {
          return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code,
            status:
              this.response && this.response.status
                ? this.response.status
                : null,
          }
        }
        return error
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/defaults/transitional.js
const require_transitional = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/defaults/transitional.js':
    function (exports, module) {
      'use strict'
      module.exports = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/createError.js
const require_createError = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/createError.js':
    function (exports, module) {
      'use strict'
      const enhanceError = require_enhanceError()
      module.exports = function createError(
        message,
        config,
        code,
        request,
        response,
      ) {
        const error = new Error(message)
        return enhanceError(error, config, code, request, response)
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/settle.js
const require_settle = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/settle.js':
    function (exports, module) {
      'use strict'
      const createError = require_createError()
      module.exports = function settle(resolve, reject, response) {
        const validateStatus = response.config.validateStatus
        if (
          !response.status ||
          !validateStatus ||
          validateStatus(response.status)
        ) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              response.config,
              null,
              response.request,
              response,
            ),
          )
        }
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/cookies.js
const require_cookies = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/cookies.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      module.exports = utils.isStandardBrowserEnv()
        ? // Standard browser envs support document.cookie
          (function standardBrowserEnv() {
            return {
              write: function write(
                name,
                value,
                expires,
                path,
                domain,
                secure,
              ) {
                const cookie = []
                cookie.push(`${name}=${encodeURIComponent(value)}`)
                if (utils.isNumber(expires))
                  cookie.push(`expires=${new Date(expires).toGMTString()}`)

                if (utils.isString(path)) cookie.push(`path=${path}`)

                if (utils.isString(domain)) cookie.push(`domain=${domain}`)

                if (secure === true) cookie.push('secure')

                document.cookie = cookie.join('; ')
              },
              read: function read(name) {
                const match = document.cookie.match(
                  new RegExp(`(^|;\\s*)(${name})=([^;]*)`),
                )
                return match ? decodeURIComponent(match[3]) : null
              },
              remove: function remove(name) {
                this.write(name, '', Date.now() - 864e5)
              },
            }
          })()
        : // Non standard browser env (web workers, react-native) lack needed support.
          (function nonStandardBrowserEnv() {
            return {
              write: function write() {},
              read: function read() {
                return null
              },
              remove: function remove() {},
            }
          })()
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isAbsoluteURL.js
const require_isAbsoluteURL = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isAbsoluteURL.js':
    function (exports, module) {
      'use strict'
      module.exports = function isAbsoluteURL(url) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/combineURLs.js
const require_combineURLs = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/combineURLs.js':
    function (exports, module) {
      'use strict'
      module.exports = function combineURLs(baseURL, relativeURL) {
        return relativeURL
          ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
          : baseURL
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/buildFullPath.js
const require_buildFullPath = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/buildFullPath.js':
    function (exports, module) {
      'use strict'
      const isAbsoluteURL = require_isAbsoluteURL()
      const combineURLs = require_combineURLs()
      module.exports = function buildFullPath(baseURL, requestedURL) {
        if (baseURL && !isAbsoluteURL(requestedURL))
          return combineURLs(baseURL, requestedURL)

        return requestedURL
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/parseHeaders.js
const require_parseHeaders = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/parseHeaders.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const ignoreDuplicateOf = [
        'age',
        'authorization',
        'content-length',
        'content-type',
        'etag',
        'expires',
        'from',
        'host',
        'if-modified-since',
        'if-unmodified-since',
        'last-modified',
        'location',
        'max-forwards',
        'proxy-authorization',
        'referer',
        'retry-after',
        'user-agent',
      ]
      module.exports = function parseHeaders(headers) {
        const parsed = {}
        let key
        let val
        let i
        if (!headers) return parsed

        utils.forEach(headers.split('\n'), (line) => {
          i = line.indexOf(':')
          key = utils.trim(line.substr(0, i)).toLowerCase()
          val = utils.trim(line.substr(i + 1))
          if (key) {
            if (parsed[key] && ignoreDuplicateOf.includes(key)) return

            if (key === 'set-cookie')
              parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
            else parsed[key] = parsed[key] ? `${parsed[key]}, ${val}` : val
          }
        })
        return parsed
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isURLSameOrigin.js
const require_isURLSameOrigin = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isURLSameOrigin.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      module.exports = utils.isStandardBrowserEnv()
        ? // Standard browser envs have full support of the APIs needed to test
          // whether the request URL is of the same origin as current location.
          (function standardBrowserEnv() {
            const msie = /(msie|trident)/i.test(navigator.userAgent)
            const urlParsingNode = document.createElement('a')
            let originURL
            function resolveURL(url) {
              let href = url
              if (msie) {
                urlParsingNode.setAttribute('href', href)
                href = urlParsingNode.href
              }
              urlParsingNode.setAttribute('href', href)
              return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol
                  ? urlParsingNode.protocol.replace(/:$/, '')
                  : '',
                host: urlParsingNode.host,
                search: urlParsingNode.search
                  ? urlParsingNode.search.replace(/^\?/, '')
                  : '',
                hash: urlParsingNode.hash
                  ? urlParsingNode.hash.replace(/^#/, '')
                  : '',
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname:
                  urlParsingNode.pathname.charAt(0) === '/'
                    ? urlParsingNode.pathname
                    : `/${urlParsingNode.pathname}`,
              }
            }
            originURL = resolveURL(window.location.href)
            return function isURLSameOrigin(requestURL) {
              const parsed = utils.isString(requestURL)
                ? resolveURL(requestURL)
                : requestURL
              return (
                parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host
              )
            }
          })()
        : // Non standard browser envs (web workers, react-native) lack needed support.
          (function nonStandardBrowserEnv() {
            return function isURLSameOrigin() {
              return true
            }
          })()
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/Cancel.js
const require_Cancel = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/Cancel.js':
    function (exports, module) {
      'use strict'
      function Cancel(message) {
        this.message = message
      }
      Cancel.prototype.toString = function toString() {
        return `Cancel${this.message ? `: ${this.message}` : ''}`
      }
      Cancel.prototype.__CANCEL__ = true
      module.exports = Cancel
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/adapters/xhr.js
const require_xhr = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/adapters/xhr.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const settle = require_settle()
      const cookies = require_cookies()
      const buildURL = require_buildURL()
      const buildFullPath = require_buildFullPath()
      const parseHeaders = require_parseHeaders()
      const isURLSameOrigin = require_isURLSameOrigin()
      const createError = require_createError()
      const transitionalDefaults = require_transitional()
      const Cancel = require_Cancel()
      module.exports = function xhrAdapter(config) {
        return new Promise((resolve, reject) => {
          let requestData = config.data
          const requestHeaders = config.headers
          const responseType = config.responseType
          let onCanceled
          function done() {
            if (config.cancelToken) config.cancelToken.unsubscribe(onCanceled)

            if (config.signal)
              config.signal.removeEventListener('abort', onCanceled)
          }
          if (utils.isFormData(requestData))
            delete requestHeaders['Content-Type']

          let request = new XMLHttpRequest()
          if (config.auth) {
            const username = config.auth.username || ''
            const password = config.auth.password
              ? unescape(encodeURIComponent(config.auth.password))
              : ''
            requestHeaders.Authorization = `Basic ${btoa(
              `${username}:${password}`,
            )}`
          }
          const fullPath = buildFullPath(config.baseURL, config.url)
          request.open(
            config.method.toUpperCase(),
            buildURL(fullPath, config.params, config.paramsSerializer),
            true,
          )
          request.timeout = config.timeout
          function onloadend() {
            if (!request) return

            const responseHeaders =
              'getAllResponseHeaders' in request
                ? parseHeaders(request.getAllResponseHeaders())
                : null
            const responseData =
              !responseType ||
              responseType === 'text' ||
              responseType === 'json'
                ? request.responseText
                : request.response
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request,
            }
            settle(
              (value) => {
                resolve(value)
                done()
              },
              (err) => {
                reject(err)
                done()
              },
              response,
            )
            request = null
          }
          if ('onloadend' in request) {
            request.onloadend = onloadend
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) return

              if (
                request.status === 0 &&
                !(
                  request.responseURL &&
                  request.responseURL.indexOf('file:') === 0
                )
              )
                return

              setTimeout(onloadend)
            }
          }
          request.onabort = function handleAbort() {
            if (!request) return

            reject(
              createError('Request aborted', config, 'ECONNABORTED', request),
            )
            request = null
          }
          request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
            request = null
          }
          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = config.timeout
              ? `timeout of ${config.timeout}ms exceeded`
              : 'timeout exceeded'
            const transitional = config.transitional || transitionalDefaults
            if (config.timeoutErrorMessage)
              timeoutErrorMessage = config.timeoutErrorMessage

            reject(
              createError(
                timeoutErrorMessage,
                config,
                transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
                request,
              ),
            )
            request = null
          }
          if (utils.isStandardBrowserEnv()) {
            const xsrfValue =
              (config.withCredentials || isURLSameOrigin(fullPath)) &&
              config.xsrfCookieName
                ? cookies.read(config.xsrfCookieName)
                : void 0
            if (xsrfValue) requestHeaders[config.xsrfHeaderName] = xsrfValue
          }
          if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, (val, key) => {
              if (
                typeof requestData === 'undefined' &&
                key.toLowerCase() === 'content-type'
              )
                delete requestHeaders[key]
              else request.setRequestHeader(key, val)
            })
          }
          if (!utils.isUndefined(config.withCredentials))
            request.withCredentials = !!config.withCredentials

          if (responseType && responseType !== 'json')
            request.responseType = config.responseType

          if (typeof config.onDownloadProgress === 'function')
            request.addEventListener('progress', config.onDownloadProgress)

          if (typeof config.onUploadProgress === 'function' && request.upload)
            request.upload.addEventListener('progress', config.onUploadProgress)

          if (config.cancelToken || config.signal) {
            onCanceled = function (cancel) {
              if (!request) return

              reject(
                !cancel || (cancel && cancel.type)
                  ? new Cancel('canceled')
                  : cancel,
              )
              request.abort()
              request = null
            }
            config.cancelToken && config.cancelToken.subscribe(onCanceled)
            if (config.signal)
              config.signal.aborted
                ? onCanceled()
                : config.signal.addEventListener('abort', onCanceled)
          }
          if (!requestData) requestData = null

          request.send(requestData)
        })
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/defaults/index.js
const require_defaults = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/defaults/index.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const normalizeHeaderName = require_normalizeHeaderName()
      const enhanceError = require_enhanceError()
      const transitionalDefaults = require_transitional()
      const DEFAULT_CONTENT_TYPE = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      function setContentTypeIfUnset(headers, value) {
        if (
          !utils.isUndefined(headers) &&
          utils.isUndefined(headers['Content-Type'])
        )
          headers['Content-Type'] = value
      }
      function getDefaultAdapter() {
        let adapter
        if (typeof XMLHttpRequest !== 'undefined') adapter = require_xhr()
        else if (
          typeof process !== 'undefined' &&
          Object.prototype.toString.call(process) === '[object process]'
        )
          adapter = require_xhr()

        return adapter
      }
      function stringifySafely(rawValue, parser, encoder) {
        if (utils.isString(rawValue)) {
          try {
            ;(parser || JSON.parse)(rawValue)
            return utils.trim(rawValue)
          } catch (e) {
            if (e.name !== 'SyntaxError') throw e
          }
        }
        return (encoder || JSON.stringify)(rawValue)
      }
      var defaults = {
        transitional: transitionalDefaults,
        adapter: getDefaultAdapter(),
        transformRequest: [
          function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept')
            normalizeHeaderName(headers, 'Content-Type')
            if (
              utils.isFormData(data) ||
              utils.isArrayBuffer(data) ||
              utils.isBuffer(data) ||
              utils.isStream(data) ||
              utils.isFile(data) ||
              utils.isBlob(data)
            )
              return data

            if (utils.isArrayBufferView(data)) return data.buffer

            if (utils.isURLSearchParams(data)) {
              setContentTypeIfUnset(
                headers,
                'application/x-www-form-urlencoded;charset=utf-8',
              )
              return data.toString()
            }
            if (
              utils.isObject(data) ||
              (headers && headers['Content-Type'] === 'application/json')
            ) {
              setContentTypeIfUnset(headers, 'application/json')
              return stringifySafely(data)
            }
            return data
          },
        ],
        transformResponse: [
          function transformResponse(data) {
            const transitional = this.transitional || defaults.transitional
            const silentJSONParsing =
              transitional && transitional.silentJSONParsing
            const forcedJSONParsing =
              transitional && transitional.forcedJSONParsing
            const strictJSONParsing =
              !silentJSONParsing && this.responseType === 'json'
            if (
              strictJSONParsing ||
              (forcedJSONParsing && utils.isString(data) && data.length)
            ) {
              try {
                return JSON.parse(data)
              } catch (e) {
                if (strictJSONParsing) {
                  if (e.name === 'SyntaxError')
                    throw enhanceError(e, this, 'E_JSON_PARSE')

                  throw e
                }
              }
            }
            return data
          },
        ],
        /**
         * A timeout in milliseconds to abort a request. If set to 0 (default) a
         * timeout is not created.
         */
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300
        },
        headers: {
          common: {
            Accept: 'application/json, text/plain, */*',
          },
        },
      }
      utils.forEach(['delete', 'get', 'head'], (method) => {
        defaults.headers[method] = {}
      })
      utils.forEach(['post', 'put', 'patch'], (method) => {
        defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
      })
      module.exports = defaults
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/transformData.js
const require_transformData = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/transformData.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const defaults = require_defaults()
      module.exports = function transformData(data, headers, fns) {
        const context = this || defaults
        utils.forEach(fns, (fn) => {
          data = fn.call(context, data, headers)
        })
        return data
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/isCancel.js
const require_isCancel = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/isCancel.js':
    function (exports, module) {
      'use strict'
      module.exports = function isCancel(value) {
        return !!(value && value.__CANCEL__)
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/dispatchRequest.js
const require_dispatchRequest = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/dispatchRequest.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const transformData = require_transformData()
      const isCancel = require_isCancel()
      const defaults = require_defaults()
      const Cancel = require_Cancel()
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) config.cancelToken.throwIfRequested()

        if (config.signal && config.signal.aborted) throw new Cancel('canceled')
      }
      module.exports = function dispatchRequest(config) {
        throwIfCancellationRequested(config)
        config.headers = config.headers || {}
        config.data = transformData.call(
          config,
          config.data,
          config.headers,
          config.transformRequest,
        )
        config.headers = utils.merge(
          config.headers.common || {},
          config.headers[config.method] || {},
          config.headers,
        )
        utils.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (method) => {
            delete config.headers[method]
          },
        )
        const adapter = config.adapter || defaults.adapter
        return adapter(config).then(
          (response) => {
            throwIfCancellationRequested(config)
            response.data = transformData.call(
              config,
              response.data,
              response.headers,
              config.transformResponse,
            )
            return response
          },
          (reason) => {
            if (!isCancel(reason)) {
              throwIfCancellationRequested(config)
              if (reason && reason.response) {
                reason.response.data = transformData.call(
                  config,
                  reason.response.data,
                  reason.response.headers,
                  config.transformResponse,
                )
              }
            }
            return Promise.reject(reason)
          },
        )
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/mergeConfig.js
const require_mergeConfig = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/mergeConfig.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      module.exports = function mergeConfig(config1, config2) {
        config2 = config2 || {}
        const config = {}
        function getMergedValue(target, source) {
          if (utils.isPlainObject(target) && utils.isPlainObject(source))
            return utils.merge(target, source)
          else if (utils.isPlainObject(source)) return utils.merge({}, source)
          else if (utils.isArray(source)) return source.slice()

          return source
        }
        function mergeDeepProperties(prop) {
          if (!utils.isUndefined(config2[prop]))
            return getMergedValue(config1[prop], config2[prop])
          else if (!utils.isUndefined(config1[prop]))
            return getMergedValue(void 0, config1[prop])
        }
        function valueFromConfig2(prop) {
          if (!utils.isUndefined(config2[prop]))
            return getMergedValue(void 0, config2[prop])
        }
        function defaultToConfig2(prop) {
          if (!utils.isUndefined(config2[prop]))
            return getMergedValue(void 0, config2[prop])
          else if (!utils.isUndefined(config1[prop]))
            return getMergedValue(void 0, config1[prop])
        }
        function mergeDirectKeys(prop) {
          if (prop in config2)
            return getMergedValue(config1[prop], config2[prop])
          else if (prop in config1) return getMergedValue(void 0, config1[prop])
        }
        const mergeMap = {
          url: valueFromConfig2,
          method: valueFromConfig2,
          data: valueFromConfig2,
          baseURL: defaultToConfig2,
          transformRequest: defaultToConfig2,
          transformResponse: defaultToConfig2,
          paramsSerializer: defaultToConfig2,
          timeout: defaultToConfig2,
          timeoutMessage: defaultToConfig2,
          withCredentials: defaultToConfig2,
          adapter: defaultToConfig2,
          responseType: defaultToConfig2,
          xsrfCookieName: defaultToConfig2,
          xsrfHeaderName: defaultToConfig2,
          onUploadProgress: defaultToConfig2,
          onDownloadProgress: defaultToConfig2,
          decompress: defaultToConfig2,
          maxContentLength: defaultToConfig2,
          maxBodyLength: defaultToConfig2,
          transport: defaultToConfig2,
          httpAgent: defaultToConfig2,
          httpsAgent: defaultToConfig2,
          cancelToken: defaultToConfig2,
          socketPath: defaultToConfig2,
          responseEncoding: defaultToConfig2,
          validateStatus: mergeDirectKeys,
        }
        utils.forEach(
          Object.keys(config1).concat(Object.keys(config2)),
          (prop) => {
            const merge = mergeMap[prop] || mergeDeepProperties
            const configValue = merge(prop)
            ;(utils.isUndefined(configValue) && merge !== mergeDirectKeys) ||
              (config[prop] = configValue)
          },
        )
        return config
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/env/data.js
const require_data = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/env/data.js':
    function (exports, module) {
      module.exports = {
        version: '0.26.1',
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/validator.js
const require_validator = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/validator.js':
    function (exports, module) {
      'use strict'
      const VERSION = require_data().version
      const validators = {}
      ;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
        (type, i) => {
          validators[type] = function validator(thing) {
            return typeof thing === type || `a${i < 1 ? 'n ' : ' '}${type}`
          }
        },
      )
      const deprecatedWarnings = {}
      validators.transitional = function transitional(
        validator,
        version,
        message,
      ) {
        function formatMessage(opt, desc) {
          return `[Axios v${VERSION}] Transitional option '${opt}'${desc}${
            message ? `. ${message}` : ''
          }`
        }
        return function (value, opt, opts) {
          if (validator === false)
            throw new Error(
              formatMessage(
                opt,
                ` has been removed${version ? ` in ${version}` : ''}`,
              ),
            )

          if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true
            console.warn(
              formatMessage(
                opt,
                ` has been deprecated since v${version} and will be removed in the near future`,
              ),
            )
          }
          return validator ? validator(value, opt, opts) : true
        }
      }
      function assertOptions(options, schema, allowUnknown) {
        if (typeof options !== 'object')
          throw new TypeError('options must be an object')

        const keys = Object.keys(options)
        let i = keys.length
        while (i-- > 0) {
          const opt = keys[i]
          const validator = schema[opt]
          if (validator) {
            const value = options[opt]
            const result = value === void 0 || validator(value, opt, options)
            if (result !== true)
              throw new TypeError(`option ${opt} must be ${result}`)

            continue
          }
          if (allowUnknown !== true) throw new Error(`Unknown option ${opt}`)
        }
      }
      module.exports = {
        assertOptions,
        validators,
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/Axios.js
const require_Axios = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/core/Axios.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      const buildURL = require_buildURL()
      const InterceptorManager = require_InterceptorManager()
      const dispatchRequest = require_dispatchRequest()
      const mergeConfig = require_mergeConfig()
      const validator = require_validator()
      const validators = validator.validators
      function Axios(instanceConfig) {
        this.defaults = instanceConfig
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager(),
        }
      }
      Axios.prototype.request = function request(configOrUrl, config) {
        if (typeof configOrUrl === 'string') {
          config = config || {}
          config.url = configOrUrl
        } else {
          config = configOrUrl || {}
        }
        config = mergeConfig(this.defaults, config)
        if (config.method) config.method = config.method.toLowerCase()
        else if (this.defaults.method)
          config.method = this.defaults.method.toLowerCase()
        else config.method = 'get'

        const transitional = config.transitional
        if (transitional !== void 0) {
          validator.assertOptions(
            transitional,
            {
              silentJSONParsing: validators.transitional(validators.boolean),
              forcedJSONParsing: validators.transitional(validators.boolean),
              clarifyTimeoutError: validators.transitional(validators.boolean),
            },
            false,
          )
        }
        const requestInterceptorChain = []
        let synchronousRequestInterceptors = true
        this.interceptors.request.forEach((interceptor) => {
          if (
            typeof interceptor.runWhen === 'function' &&
            interceptor.runWhen(config) === false
          )
            return

          synchronousRequestInterceptors =
            synchronousRequestInterceptors && interceptor.synchronous
          requestInterceptorChain.unshift(
            interceptor.fulfilled,
            interceptor.rejected,
          )
        })
        const responseInterceptorChain = []
        this.interceptors.response.forEach((interceptor) => {
          responseInterceptorChain.push(
            interceptor.fulfilled,
            interceptor.rejected,
          )
        })
        let promise
        if (!synchronousRequestInterceptors) {
          let chain = [dispatchRequest, void 0]
          Array.prototype.unshift.apply(chain, requestInterceptorChain)
          chain = chain.concat(responseInterceptorChain)
          promise = Promise.resolve(config)
          while (chain.length)
            promise = promise.then(chain.shift(), chain.shift())

          return promise
        }
        let newConfig = config
        while (requestInterceptorChain.length) {
          const onFulfilled = requestInterceptorChain.shift()
          const onRejected = requestInterceptorChain.shift()
          try {
            newConfig = onFulfilled(newConfig)
          } catch (error) {
            onRejected(error)
            break
          }
        }
        try {
          promise = dispatchRequest(newConfig)
        } catch (error) {
          return Promise.reject(error)
        }
        while (responseInterceptorChain.length)
          promise = promise.then(
            responseInterceptorChain.shift(),
            responseInterceptorChain.shift(),
          )

        return promise
      }
      Axios.prototype.getUri = function getUri(config) {
        config = mergeConfig(this.defaults, config)
        return buildURL(
          config.url,
          config.params,
          config.paramsSerializer,
        ).replace(/^\?/, '')
      }
      utils.forEach(['delete', 'get', 'head', 'options'], (method) => {
        Axios.prototype[method] = function (url, config) {
          return this.request(
            mergeConfig(config || {}, {
              method,
              url,
              data: (config || {}).data,
            }),
          )
        }
      })
      utils.forEach(['post', 'put', 'patch'], (method) => {
        Axios.prototype[method] = function (url, data, config) {
          return this.request(
            mergeConfig(config || {}, {
              method,
              url,
              data,
            }),
          )
        }
      })
      module.exports = Axios
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/CancelToken.js
const require_CancelToken = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/cancel/CancelToken.js':
    function (exports, module) {
      'use strict'
      const Cancel = require_Cancel()
      function CancelToken(executor) {
        if (typeof executor !== 'function')
          throw new TypeError('executor must be a function.')

        let resolvePromise
        this.promise = new Promise((resolve) => {
          resolvePromise = resolve
        })
        const token = this
        this.promise.then((cancel) => {
          if (!token._listeners) return
          let i
          const l = token._listeners.length
          for (i = 0; i < l; i++) token._listeners[i](cancel)

          token._listeners = null
        })
        this.promise.then = function (onfulfilled) {
          let _resolve
          const promise = new Promise((resolve) => {
            token.subscribe(resolve)
            _resolve = resolve
          }).then(onfulfilled)
          promise.cancel = function reject() {
            token.unsubscribe(_resolve)
          }
          return promise
        }
        executor((message) => {
          if (token.reason) return

          token.reason = new Cancel(message)
          resolvePromise(token.reason)
        })
      }
      CancelToken.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) throw this.reason
      }
      CancelToken.prototype.subscribe = function subscribe(listener) {
        if (this.reason) {
          listener(this.reason)
          return
        }
        if (this._listeners) this._listeners.push(listener)
        else this._listeners = [listener]
      }
      CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
        if (!this._listeners) return

        const index = this._listeners.indexOf(listener)
        if (index !== -1) this._listeners.splice(index, 1)
      }
      CancelToken.source = function source() {
        let cancel
        const token = new CancelToken((c) => {
          cancel = c
        })
        return {
          token,
          cancel,
        }
      }
      module.exports = CancelToken
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/spread.js
const require_spread = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/spread.js':
    function (exports, module) {
      'use strict'
      module.exports = function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr)
        }
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isAxiosError.js
const require_isAxiosError = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/helpers/isAxiosError.js':
    function (exports, module) {
      'use strict'
      const utils = require_utils()
      module.exports = function isAxiosError(payload) {
        return utils.isObject(payload) && payload.isAxiosError === true
      }
    },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/axios.js
const require_axios = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/lib/axios.js': function (
    exports,
    module,
  ) {
    'use strict'
    const utils = require_utils()
    const bind = require_bind()
    const Axios = require_Axios()
    const mergeConfig = require_mergeConfig()
    const defaults = require_defaults()
    function createInstance(defaultConfig) {
      const context = new Axios(defaultConfig)
      const instance = bind(Axios.prototype.request, context)
      utils.extend(instance, Axios.prototype, context)
      utils.extend(instance, context)
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig))
      }
      return instance
    }
    const axios = createInstance(defaults)
    axios.Axios = Axios
    axios.Cancel = require_Cancel()
    axios.CancelToken = require_CancelToken()
    axios.isCancel = require_isCancel()
    axios.VERSION = require_data().version
    axios.all = function all(promises) {
      return Promise.all(promises)
    }
    axios.spread = require_spread()
    axios.isAxiosError = require_isAxiosError()
    module.exports = axios
    module.exports.default = axios
  },
})

// node_modules/.pnpm/axios@0.26.1/node_modules/axios/index.js
const require_axios2 = __commonJS({
  'node_modules/.pnpm/axios@0.26.1/node_modules/axios/index.js': function (
    exports,
    module,
  ) {
    module.exports = require_axios()
  },
})
export default require_axios2()
// # sourceMappingURL=axios-RVEYF6SX.js.map
