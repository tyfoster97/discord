const { MessageEmbed } = require("discord.js");
const { noPermission, selfUseError, invalidUser } = require("./errormsg");
const { errorLog } = require('../../utils/log');
/**
 * @author Ty Foster
 * @version 2020.09.24
 * @summary implements ban command
 */
const botColor = process.env.COLOR;

/**
 * @summary generates ban reason from arguments
 * @param {string[]} args arguments from command invokation
 */
function getReason(args) {
    let rsn = 'They were bad';
    //if a reason was given use that instead
    if (args[0]) {
        rsn = args.join(' ');
    }
    return rsn;
}

/**
 * @summary bans member from a server
 * @param {Client} client the client being used by the bot
 * @param {Message} message the message invoking the command 
 * @param {Member} member the member to ban 
 * @param {string[]} args the command arguments
 */
function ban(client, message, member, args) {
    //attenpt to ban the member
    member
        .ban({
            //assign a reason
            reason: getReason(args),
        })
        .catch(err => {
            //catch an error, log to sever
            errorLog(client, message, err);
            return false;
        });
    return true;
};

/**
 * @summary main method for command execution
 * @param {Client} client discord client used by _mombot
 * @param {Message} message message invoking command
 * @param {string[]} args command arguments
 */
module.exports.run = async (client, message, args) => {
    //get author as member
    const author = message.guild.member(message.author);
    //if author can ban members
    if (author.hasPermission('BAN_MEMBERS')) {
        //get mentioned user
        const user = message.mentions.users.first();
        //if the user is in the guild
        if (user) {
            //if author is trying to ban someone else
            if (message.author.username != user.username) {
                //get user as member
                const member = message.guild.member(user);
                //if the member exists
                if (member) {
                    args.shift(); //pop user name off of args
                    //if member being banned does not have
                    //permission to ban members
                    //and ban is successful
                    if (!member.hasPermission('BAN_MEMBERS') && ban(member, args)) {
                        //inform success
                        const msg = new MessageEmbed()
                            .setColor(botColor)
                            .setTitle('Member banned')
                            .setDescription(`Successfully banned ${user.tag}`)
                            .addField('Reason', getReason(args));
                        message.reply(msg);
                    } else {
                        //inform failure
                        const msg = new MessageEmbed()
                            .setColor(botColor)
                            .setTitle('Unable to ban member')
                            .setDescription(`Could not ban ${user.tag}`);
                        let m = await message.reply(msg);
                        await m.delete({ timeout: 10000 })
                            .catch(err => errorLog(client, message, err));
                    }
                } else {
                    //inform invalid user
                    await invalidUser(client, message, 'ban');
                }
            } else {
                //inform self use not allowed
                await selfUseError(client, message, 'ban');
            }
        } else {
            //inform invalid user
            await invalidUser(client, message, 'ban');
        }
    } else {
        //inform invalid permissions
        await noPermission(client, message, 'ban');
    }
};