const { MessageCollector, SystemChannelFlags } = require('discord.js');

const { msgFilter } = require('filter.js');

module.exports = {
    run: async (client, message, args) => {
        if (args.split('/\s+').length() != 1) { //if more than one argument
            let msg = await message.channel.send("too many arguemnts");
            await msg.delete({ timeout: 5000 }).catch(err => console.log(err));
        } else {
            try {
                let fetched = await message.channel.messages.fetch(args);
                if (fetched) {
                    let collector = new MessageCollector(message.channel, msgFilter.bind(null, message));
                    collector.on('collect', msg => {
                        console.log(`${msg.content} was collected`);
                    });
                }
            } catch (err) {
                console.log(err);
                let msg = await message.channel.send('Message not found');
                await msg.delete({ timeout: 5000 }).catch(err => console.log(err));
            }
        }
    },
    aliases: [],
    description: "Displays a message to listen for role reactions."
};