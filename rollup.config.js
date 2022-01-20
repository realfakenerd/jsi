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
    * JSI[just,save,it] for vue - v${pkg.version}
    * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
    * ${new Date().getFullYear()} - RealFakeNerd
    * @license MIT
    * 
    * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
    */
`

/** @type {Array<ConfigDef>} */
const configs = [
    { input: 'src/main.js' ,file: 'dist/jsi.esm.js', format: 'es', env: 'production' },
    { input: 'dist/jsi.esm.js' ,file: 'dist/jsi.cjs.js', format: 'cjs', env: 'production' },
    { input: 'dist/jsi.cjs.js' ,file: 'dist/jsi.global.js', format: 'iife', env: 'production' }
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
    /** @type {import('rollup').RollupOptions} */
    const c = {
        external: ['vue'],
        input: config.input,
        plugins: [terser({
            compress: {
                ecma: 2020,
                passes: 3,
                module: config.format === 'es' ? true : false
            },
            format: {
                comments: 'all',
                wrap_iife: true
            }
        })],
        output: {
            banner,
            inlineDynamicImports: true,
            file: config.file,
            format: config.format,
            globals: {
                vue: 'Vue'
            }
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