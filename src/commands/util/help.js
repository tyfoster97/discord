const discord = require('discord.js');

module.exports.run = (client, message, args) => {
    let msg = '';
    if(args[0]) {
        console.log('oops');
    }
    else {
        msg = '**Commands**\n';
        msg = msg + 'd\n';
        msg = msg + 'flipcoin\n';
        msg = msg + 'hug\n';
        msg = msg + 'attention\n';
        msg = msg + 'potionseller\n';
    }
}