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
            ErrorLog.instance = this
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
export default errLogger