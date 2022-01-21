/*!
    * JSI[just,save,it] - v1.0.0
    * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
    * 2022 - RealFakeNerd
    * @license MIT
    * 
    * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
    */
const JSI=function(e){"use strict";return e.useJSIStorage=function(){return{set:
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
         * @returns {void} nothing is returned!
         */
function(e,t){if("string"==typeof t)return void localStorage.setItem(e,t);if("string"!=typeof e){const t=new Error;throw t.name="SetItem Key Error",t.message=`'${e}' can't be used as key name, use a 'string' instead`,t}let r=JSON.stringify(t);localStorage.setItem(e,r)}
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
         */,get:function(e){
/** @type {Object} */
const t=JSON.parse(localStorage.getItem(e));if(e in localStorage)return t;{const r=new Error;throw r.name="GetItem Key Error",r.message=`returned data can't be '${t}', this happens if theres no key with the of '${e}'`,r}}
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
         */,remove:function(e){if(!(e in localStorage)){const t=new Error;throw t.name="RemoveItem Key Error",t.message=`data can't be removed if isn't there, try changing '${e}' to another thing`,t}localStorage.removeItem(e)}
/**
         * # THE AWESOME CLEAR FUNCTION
         * ### it's self explanatory, clears all localStorage
         */,clear:function(){localStorage.clear()}}},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
