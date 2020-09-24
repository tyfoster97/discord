const { MessageEmbed } = require('discord.js');
const { noPermission, selfUseError, invalidUser } = require("./errormsg");
const { errorLog } = require('../../utils/log');

const color = process.env.COLOR;

function getReason(args) {
    let rsn = 'They did a bad thing, but not bad enough to ban';
    //if a reason is given use that instead
    if (args[0]) {
        rsn = args.join(' ');
    }
    return rsn;
};

function kick(client, message, member, args) {
    member
        .kick(getReason(args))
        .catch(err => {
            errorLog(client, message, err);
            return false;
        });
    return true;
}

/* Handles kick command */
module.exports.run = async (client, message, args) => {
    const author = message.guild.member(message.author);
    //if author has permission to kick users
    if (author.hasPermission('KICK_MEMEBERS')) {
        const user = message.mentions.users.first();
        //if there is a mentioned user
        if (user) {
            //if author is trying to kick someone else
            if (message.author.username != user.username) {
                const member = message.guild.member(user);
                //if the member exists
                if (member) {
                    //pop username off of args
                    args.shift();
                    //if kick was successful
                    if (!member.hasPermission('KICK_MEMBERS') && kick(client, message, member, args)) {
                        const msg = new MessageEmbed()
                            .setColor(color)
                            .setTitle('Member kicked')
                            .setDescription(`Successfully kicked ${user.tag}`)
                            .addField('Reason', getReason(args));
                        message.reply(msg);
                    } else {
                        const msg = new MessageEmbed()
                            .setColor(color)
                            .setTitle('Unable to kick member')
                            .setDescription(`Could not kick ${user.tag}`);
                        let m = await message.reply(msg);
                        await m.delete({ timeout: 5000 })
                            .catch(err => errorLog(client, message, err));
                    }
                } else {
                    //send error message and delete after 5s
                    await invalidUser(client, message, 'kick');
                }
            } else {
                await selfUseError(client, message, 'kick');
            }
        } else {
            //send error message and delete after 10s
            await invalidUser(client, message, 'kick');
        }
    } else {
        //send error message and delete after  5s
        await noPermission(client, messsage, 'kick');
    }
};