import errLogger from "./ErrorLog.js";

/**
 * @param {string} key 
 * @param {Storage} storage 
 */
export function parseObj(key, storage) {
    const c = storage.getItem(key);
    const data = JSON.parse(c);
    if (c === null || c == undefined) {
        errLogger.log({
            name: 'GetItem Key Error!',
            message: `returned data can't be '${c}', this happens if theres no key with the of '${key}'`
        })
    } else {
        if (data.expTime == null) {
            return data.value
        } else if (data.expTime <= new Date().getTime()) {
            errLogger.log({
                name: 'Key Expired Error!',
                message: `the key is expired :( try setting a new one :)`
            })
        }
        return data.value
    }
}

/**
 * @param {any} payload 
 * @param {null | number} expire 
 */
export function stringifyObj(payload, expire = null) {
    return JSON.stringify({
        value: payload,
        expTime: expire !== null ? calcExpTime(expire) : null
    })
}

/**
 * @param {number} expire
 */
export function calcExpTime(expire) {
    return new Date().getTime() + expire;
}

/**
 * @param {'local' | 'session'} type 
 */
export function isLocalOrSession(type){
    if (type == 'local') {
        return localStorage
    } else {
        return sessionStorage
    }
}