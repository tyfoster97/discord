const fs = require('fs');
/**
 * @author Ty Foster
 * @version 2020.09.24
 * @summary File for building test script
 */

/**
 * @summary converts _mombot runner to testbot runner
 */
fs.readFile('src/bot.js', (err, srcCode) => {
    //if there is an error abort
    if (err) throw err;
    //get source code as a string
    var srcString = srcCode.toString();
    //replace bot token
    srcString = srcString.replace('BOT_TOKEN', 'TEST_TOKEN');
    //set testing to true
    srcString = srcString.replace('testing(false)', 'testing(true)');
    //write out file
    fs.writeFile('src/test.js', srcString, error => {
        //if there is an error abort
        if (error) throw error;
    });
});