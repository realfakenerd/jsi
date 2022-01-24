import errLogger from "./ErrorLog.js";
import { parseObj, isLocalOrSession, stringifyObj } from "./utils.js";

const defaultStorageType = localStorage
const defaultPrefix = '_JSI_';
/**
 * @typedef OptDef
 * @property {number} [expire]
 * @property {'local' | 'session'} [type]
 * @property {string} [prefix = '_jsi_']
 */

/**
 * The main class 'useJSIStorage' to do all operations.
 * @classdesc Main Storage class
 */
export default class useJSIStorage {
    /**
     * ### Set function
     * #### set data to the localStorage
     * Checks if the **name** is a string, if isn't a string.
     * it throws an error. Also checks if state is a string
     * local and session storages by default save as string, then
     * stringifying the state is not needed
     * 
     * @example
     * useStorage.set('sw', data.foo)
     * 
     * @param {string} name use it to name the storage
     * @param {any} thing the state to be saved can be any kind of data
     * @param {OptDef} [options]
     * @returns {void} nothing is returned!
     */
    // @ts-ignore
    static set(name, thing, options = {}) {

        const prefix = options.prefix ? options.prefix : defaultPrefix;
        const storageType = options.type ? isLocalOrSession(options.type) : defaultStorageType;

        if (typeof thing === 'string') {
            storageType.setItem(`${prefix}${name}`, thing);
            return
        }
        if (typeof name !== 'string') errLogger.log({
            name: 'SetItem Key Error!',
            message: `'${name}' can't be used as key name, use a 'string' instead`
        })
        if (!thing) errLogger.log({
            name: 'SetItem Value Error!',
            message: `there's no data to be saved, try adding something.`
        })
        let strData = stringifyObj(thing, options.expire)
        storageType.setItem(`${prefix}${name}`, strData)
    }

    /**
     * ### Get function
     * #### Get the data from the storage
     * It returns the data from the storage if there's
     * things to return, if return is null an Error is thrown
     * onto the console
     * 
     * @example
     * const storage = useStorage.get('sw')
     * console.log(storage) // logs {jedi: 'luke', 'starkiller'}
     * 
     * @param {string} key 
     * @returns {any}
     */
    static get(key) {
        return parseObj(`${defaultPrefix}${key}`, localStorage)
    }
    /**
     * ### Remove function
     * #### remove an key from the storage
     * It removes the given key from the localStorage,
     * if there's no key to remove an Error is thrown
     * so be sure to give the right name
     * 
     * @example
     * useStorage.remove('sw')
     * 
     * @param {string} key 
     * @returns {void}
     */
    static remove(key) {
        if (key in localStorage) {
            localStorage.removeItem(`${defaultPrefix}${key}`)
        } else errLogger.log({
            name: 'RemoveItem Key Error!',
            message: `data can't be removed if isn't there, try changing '${key}' to another thing`
        })
    }

    /**
     * # THE AWESOME CLEAR FUNCTION
     * ### it's self explanatory, clears all localStorage
     */
    static clear() {
        localStorage.clear();
    }
}