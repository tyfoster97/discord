const discord = require("discord.js")
module.exports.run = (client, message, cmd) => {
    let embed = new discord.MessageEmbed();
    embed.setTitle(args);
    if (cmd === 'd') {
        embed.addField('Description', 'rolls a die with a user-specified number of sides');
        embed.addField('Use', '\/d \<number\>');
        embed.addField('Notes', 'Can only roll up to d100');
    }
    else if (cmd === 'flipcoin') {
        embed.addField('Description', 'filps a coin');
        embed.addField('Use', '\/flipcoin');
    }
    else if (cmd === 'hug') {
        embed.addField('Description', 'hugs a member');
        embed.addField('Use', '\/hug \<\@member\>');
        embed.addField('Notes', 'tag the member');
    }
    else if (cmd === 'attention') {
        embed.addField('Description', 'gives the user attention');
        embed.addField('Use', '\/attention');
    }
    else if (cmd === 'potionseller') {
        embed.addField('Description', 'returns 3 iconic youtube videos');
        embed.addField('Use', '\/potionseller');
    }
    else if (cmd === 'fratx') {
        embed.addField('Description', 'returns the titles of 6 XXX videos');
        embed.addField('Use', '\/fratx');
    }
    else {
        embed.addField('Info', 'use \?\<command\-name\> for more info:');
        embed.addField('flipcoin', '');
        embed.addField('d','');
        embed.addField('hug', '');
        embed.addField('attention', '');
        embed.addField('potionseller', '');
    }
    message.channel.send(embed);
}

const getInfo = (embed, cmd) => {
    
}