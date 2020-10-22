/**
 * @author Ty Foster
 * 
 * @summary This is a file header
 * @version 2020.09.22
 */

/**
 * @summary this function determines if a number is even or odd
 * @param {number} bar 
 * @returns {boolean} true if even, false if odd
 * @throws {Error} if bar is not a number
 */
function foo(bar) {
    //if bar is not a number throw an error
    if (isNaN(bar)) {
        throw err;
    }
    //if bar is even
    if (bar % 2 == 0) {
        //do stuff
        return true;
    } else {
        return false
    }
};