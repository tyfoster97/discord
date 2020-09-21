const { MessageEmbed, Permissions } = require('discord.js');
const botColor = process.env.COLOR;

function getReason(args) {
    let rsn = 'They did a bad thing, but not bad enough to ban';
    //if a reason is given use that instead
    if (args[0]) {
        rsn = args.join(' ');
    }
    return rsn;
};

function kick(member, args) {
    member
    .kick({
        reason: getReason(args)
    })
    .catch(err => {
        console.log(err);
        return false;
    })
    return true;
};

/* Handles kick command */
module.exports.run = async (client, message, args) => {
    //if author has permission to kick users
    if (message.author.flags.has(Permissions.KICK_MEMEBERS)) {
        const user = message.mentions.user.first();
        //if there is a mentioned user
        if (user) {
            const member = message.guild.member(user);
            //if the member exists
            if (member) {
                args.shift();
                //if kick was successful
                if (kick(member, args)) {
                    const msg = new MessageEmbed()
                    .setColor(botColor)
                    .setTitle('Member kicked')
                    .setDescription(`Successfully kicked ${user.tag}`)
                    .addField('Reason', getReason(args));
                    message.reply(msg);
                } else {
                    const msg = new MessageEmbed()
                    .setColor(botColor)
                    .setTitle('Unable to kick member')
                    .setDescription(`Could not kick ${user.tag}`);
                    let m = await message.reply(msg);
                    await m.delete({timeout: 5000})
                    .catch(err => console.log(err));
                }
            } else {
                //send error message and delete after 5s
                const msg = new MessageEmbed()
                .setColor(botColor)
                .setTitle('User not in server')
                .setDescription('Command should kick user in the server');
                let m = await message.reply(msg);
                await m.delete({timeout: 5000})
                .catch(err => console.log(err));
            }
        } else {
            //send error message and delete after 10s
            const msg = new MessageEmbed()
            .setColor(botColor)
            .setTitle('No user mentioned')
            .setDescription('Command should be of the form /kick @<user> [reason]')
            .addFields({
                name: 'Examples', value: '/kick @_mombot She posted NSFW content in a SFW channel\n/kick @_mombot'
            });
            let m = await message.reply(msg);
            await m.delete({timeout: 10000})
            .catch(err => console.log(err)); 
        }
    } else {
        //send error message and delete after  5s
        const msg = new MessageEmbed()
        .setColor(botColor)
        .setTitle('Insufficient permissions')
        .setDescription('You do not have permission to kick members');
        let m = await message.reply(msg);
        await m.delete({timeout: 5000})
        .catch(err => console.log(err));
    }
};