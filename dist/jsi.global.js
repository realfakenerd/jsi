/*!
    * JSI[just,save,it] for vue - v0.0.1
    * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
    * 2022 - RealFakeNerd
    * @license MIT
    * 
    * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
    */
!(function(){"use strict";
/*!
        * JSI[just,save,it] for vue - v0.0.1
        * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
        * 2022 - RealFakeNerd
        * @license MIT
        * 
        * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
        */Object.defineProperty(exports,"__esModule",{value:!0});var e=require("vue");
/*!
        * JSI[just,save,it] for vue - v0.0.1
        * the most SUPER SUPREME of the storage wrappers (͠≖ ͜ʖ͠≖)👌
        * 2022 - RealFakeNerd
        * @license MIT
        * 
        * https://fsymbols.com/ fsymbols - symbol generator is used for the the symbols above
        */exports.useJSIStorage=function(){return{set:
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
function(e,t,r="local"){if("string"==typeof t)return void localStorage.setItem(e,t);if("string"!=typeof e){const t=new Error;throw t.name="SetItem Key Error",t.message=`'${e}' can't be used as key name, use a 'string' instead`,t}let o=JSON.stringify(t);localStorage.setItem(e,o)}
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
         */,get:function(t){
/** @type {Object} */
const r=JSON.stringify(localStorage.getItem(t));if(t in localStorage)return e.reactive(r);{const e=new Error;throw e.name="GetItem Key Error",e.message=`returned data can't be '${r}', this happens if theres no key with the of '${t}'`,e
/**
         * 
         * @param {string} key 
         */}},remove:function(e){if(!(e in localStorage)){const t=new Error;throw t.name="RemoveItem Key Error",t.message=`data can't be removed if isn't there, try changing '${e}' to another thing`,t}localStorage.removeItem(e)},clear:function(){localStorage.clear()}}}})();
