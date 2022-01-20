/** @typedef {import('vue').App} App */
/** @typedef {import('vue').AppConfig} AppConfig */

/**
 * 
 * @param {App} app
 * @param {AppConfig} options
 */
export default function(app, options){
    if(!localStorage || !sessionStorage) {
        const err = new Error
        err.name = 'Storage API Not Suported :(';
        err.message = 'Maybe if update your browser it works ;)'
        throw err
    }
}