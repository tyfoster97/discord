const { MessageEmbed } = require("discord.js");
const { noPermission, selfUseError, invalidUser } = require("./errormsg");
const { errorLog } = require('../../utils/log');

const botColor = process.env.COLOR;

function getReason(args) {
    let rsn = 'They were bad';
    //if a reason was given use that instead
    if (args[0]) {
        rsn = args.join(' ');
    }
    return rsn;
}

//ban member
function ban(client, message, member, args) {
    member
        .ban({
            reason: getReason(args),
        })
        .catch(err => {
            errorLog(client, message, err);
            return false;
        });
    return true;
};

/* Handles command to ban a user */
module.exports.run = async (client, message, args) => {
    //if author has permission to ban members
    const author = message.guild.member(message.author);
    if (author.hasPermission('BAN_MEMBERS')) {
        const user = message.mentions.users.first();
        //if there is a mentioned user
        if (user) {
            //if author is trying to ban someone else
            if (message.author.username != user.username) {
                const member = message.guild.member(user);
                //if the member exists
                if (member) {
                    args.shift(); //pop user name off of args
                    //if ban was successful
                    if (!member.hasPermission('BAN_MEMBERS') && ban(member, args)) {
                        const msg = new MessageEmbed()
                            .setColor(botColor)
                            .setTitle('Member banned')
                            .setDescription(`Successfully banned ${user.tag}`)
                            .addField('Reason', getReason(args));
                        message.reply(msg);
                    } else {
                        const msg = new MessageEmbed()
                            .setColor(botColor)
                            .setTitle('Unable to ban member')
                            .setDescription(`Could not ban ${user.tag}`);
                        let m = await message.reply(msg);
                        await m.delete({ timeout: 10000 })
                            .catch(err => errorLog(client, message, err));
                    }
                } else {
                    //inform user the member could not be found
                    await invalidUser(client, message, 'ban');
                }
            } else {
                //cannot call command on yourself error
                await selfUseError(client, message, 'ban');
            }
        } else {
            //inform user the member is not in the server
            await invalidUser(client, message, 'ban');
        }
    } else {
        //inform user they do not have permissions
        await noPermission(client, message, 'ban');
    }
};