
    /*!
    * JSI[just,save,it] - v1.1.0
    * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
    * 2022 - RealFakeNerd
    * @license MIT
    * 
    * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
    */

/**
 * @typedef ErrDef 
 * @property {string} name name of the error
 * @property {string} message message of the error
 */

 class ErrorLog {
    constructor() {
        //@ts-expect-error
        if (ErrorLog.instance == null) {
            //@ts-expect-error
            ErrorLog.instance = this;
        }
        //@ts-expect-error
        return ErrorLog.instance
    }

    /**
     * @param {ErrDef} err Object containing two properties: **name** and **message**
     */
    log(err) {
        const error = new Error;
        error.name = err.name;
        error.message = err.message;
        throw error
    }
}
/**
 * @class
 * @classdesc Throw errors on console.
 */
const errLogger = new ErrorLog();
Object.freeze(errLogger);

/**
 * @param {string} key 
 * @param {Storage} storage 
 */
function parseObj(key, storage) {
    const c = storage.getItem(key);
    const data = JSON.parse(c);
    if (c === null || c == undefined) {
        errLogger.log({
            name: 'GetItem Key Error!',
            message: `returned data can't be '${c}', this happens if theres no key with the of '${key}'`
        });
    } else {
        if (data.expTime == null) {
            return data.value
        } else if (data.expTime <= new Date().getTime()) {
            errLogger.log({
                name: 'Key Expired Error!',
                message: `the key is expired :( try setting a new one :)`
            });
        }
        return data.value
    }
}

/**
 * @param {any} payload 
 * @param {null | number} expire 
 */
function stringifyObj(payload, expire = null) {
    return JSON.stringify({
        value: payload,
        expTime: expire !== null ? calcExpTime(expire) : null
    })
}

/**
 * @param {number} expire
 */
function calcExpTime(expire) {
    return new Date().getTime() + expire;
}

/**
 * @param {'local' | 'session'} type 
 */
function isLocalOrSession(type){
    if (type == 'local') {
        return localStorage
    } else {
        return sessionStorage
    }
}

const defaultStorageType = localStorage;
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
class useJSIStorage {
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
        });
        if (!thing) errLogger.log({
            name: 'SetItem Value Error!',
            message: `there's no data to be saved, try adding something.`
        });
        let strData = stringifyObj(thing, options.expire);
        storageType.setItem(`${prefix}${name}`, strData);
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
            localStorage.removeItem(`${defaultPrefix}${key}`);
        } else errLogger.log({
            name: 'RemoveItem Key Error!',
            message: `data can't be removed if isn't there, try changing '${key}' to another thing`
        });
    }

    /**
     * # THE AWESOME CLEAR FUNCTION
     * ### it's self explanatory, clears all localStorage
     */
    static clear() {
        localStorage.clear();
    }
}

export { useJSIStorage as default };
