const discord = require('discord.js');

module.exports.run = (client, message, args) => {
    
    let fields = {};
    if(args[0]) {
        console.log('oops');
    }
    else {
        const embed = new discord.MessageEmbed()
        .setTitle('Help')
        .setDescription('use /help <command> for help with specific commands\n\nd \nflipcoin \nattention \nhug \npotionseller \n');
        message.channel.send(embed);
    }
}