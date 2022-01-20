import { reactive } from 'vue';

function StorageWatcher() {

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
     * @param {any} state can be any kind of data
     * @param {'local' | 'session'} [type = 'local']
     * @returns {void} nothing is returned!
     */
    function set(name, state, type = 'local') {
        if (typeof state === 'string') {
            localStorage.setItem(name, state);
            return
        }
        if (typeof name !== 'string') {
            const err = new Error
            err.name = 'SetItem Key Error'
            err.message = `'${name}' can't be used as key name, use a 'string' instead`;
            throw err
        }
        let data = JSON.stringify(state)
        localStorage.setItem(name, data)
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
    function get(key) {
        /** @type {Object} */
        const data = JSON.stringify(localStorage.getItem(key));
        if (key in localStorage) {
            return reactive(data)
        } else {
            const err = new Error
            err.name = 'GetItem Key Error'
            err.message = `returned data can't be '${data}', this happens if theres no key with the of '${key}'`;
            throw err
        }
    }

    /**
     * 
     * @param {string} key 
     */
    function remove(key) {
        if (key in localStorage) {
            localStorage.removeItem(key)
        } else {
            const err = new Error
            err.name = 'RemoveItem Key Error'
            err.message = `data can't be removed if isn't there, try changing '${key}' to another thing`;
            throw err
        }
    }

    function clear() {
        localStorage.clear();
    }

    return {
        set,
        get,
        remove,
        clear,
    }
}

export { StorageWatcher as useJSIStorage }