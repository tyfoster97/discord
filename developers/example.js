/**
 * @author Ty Foster
 * 
 * @summary This is a file header
 * @version 2020.09.22
 */

/**
 * @description this method checks if a number is even or odd
 * @param bar a number
 * @returns true if bar is even
 * @throws error if bar is not a number
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