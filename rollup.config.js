import pkg from './package.json';
import {terser} from 'rollup-plugin-terser'
/**
 * @typedef ConfigDef
 * @property {string} [input]
 * @property {string} [file]
 * @property {'es' | 'iife' | 'cjs'} [format]
 * @property {boolean} [browser]
 * @property {'development' | 'production'} [env]
 */

const banner = `
    /*!
    * JSI[just,save,it] - v${pkg.version}
    * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
    * ${new Date().getFullYear()} - RealFakeNerd
    * @license MIT
    * 
    * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
    */
`

/** @type {Array<ConfigDef>} */
const configs = [
    { file: 'dist/jsi-dev.mjs', format: 'es', env: 'development' },
    { file: 'dist/jsi-dev.cjs', format: 'cjs', env: 'development' },
    { file: 'dist/jsi-dev.iife.js', format: 'iife', env: 'development' },
    { file: 'dist/jsi.min.mjs', format: 'es', env: 'production', browser: true },
    { file: 'dist/jsi.min.js', format: 'iife', env: 'production', browser: true },
]

/**
 * @param {Array<any>} config 
 */
function createEntries(config) {
    return config.map((c) => createEntry(c))
}

/**
 * @param {ConfigDef} config 
 */
function createEntry(config) {
    const isBrowser = config.browser && config.env === 'production';

    /** @type {import('rollup').RollupOptions} */
    const c = {
        input: 'src/main.js',
        plugins: [terser({
            compress: {
                ecma: 2020,
                passes: 3,
                module: config.format === 'es' ? true : false
            },
            format: {
                comments: isBrowser ? 'some' : 'all',
            }
        })],
        output: {
            banner,
            inlineDynamicImports: true,
            file: config.file,
            format: config.format,
        },
        onwarn: (msg, warn) => {
            // @ts-ignore
            if(!/Circular/.test(msg)) {
                warn(msg)
            }
        }
    }

    if (config.format === 'iife') {
        // @ts-ignore
        c.output.name = c.output.name || 'JSI';
        // @ts-ignore
        c.output.preferConst = true 
    }
    return c
}

export default createEntries(configs)