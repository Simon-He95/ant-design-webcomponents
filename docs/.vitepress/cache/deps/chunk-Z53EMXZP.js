import { __commonJS } from './chunk-WQG2LZMB.js'

// browser-external:fs
const require_fs = __commonJS({
  'browser-external:fs': function (exports, module) {
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
                `Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`,
              )
          },
        },
      ),
    )
  },
})

// browser-external:path
const require_path = __commonJS({
  'browser-external:path': function (exports, module) {
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
                `Module "path" has been externalized for browser compatibility. Cannot access "path.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`,
              )
          },
        },
      ),
    )
  },
})

// browser-external:url
const require_url = __commonJS({
  'browser-external:url': function (exports, module) {
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
                `Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`,
              )
          },
        },
      ),
    )
  },
})

// browser-external:process
const require_process = __commonJS({
  'browser-external:process': function (exports, module) {
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
                `Module "process" has been externalized for browser compatibility. Cannot access "process.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`,
              )
          },
        },
      ),
    )
  },
})

export { require_fs, require_path, require_url, require_process }
// # sourceMappingURL=chunk-Z53EMXZP.js.map
