const fs = require('fs');

fs.readFile('src/bot.js', (err, srcCode) => {
  if (err) throw err;
  var srcString = srcCode.toString();//get source code
  srcString = srcString.replace('bot_token', 'test_token');//replace bot tokens
  fs.writeFile('src/test.js', srcString, error => {
    if (error) throw error;
  });//write test file
});