const fs = require('fs');

fs.readFile('src/bot.js', (err, srcCode) => {
    if (err) throw err;

    var srcString = srcCode.toString();
    srcString = srcString.replace('bot_token', 'test_token');
    
    fs.writeFile('src/test.js', srcString, (error) => {
        if (error) throw error;
    })
});