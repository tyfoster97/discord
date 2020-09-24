const { MessageEmbed } = require("discord.js");
const { errorLog } = require('../../utils/log');
/**
 * @author Ty Foster
 * @version 2020.09.24
 * @summary handles error messages for admin commands
 */
const color = process.env.COLOR;

/**
 * @summary informs user they do not have permission to use this admin command
 * @param {Client} client discord client
 * @param {Message} message message in discord server
 * @param {string} cmd command that was invoked
 */
async function noPermission(client, message, cmd) {
    //inform
    const msg = new MessageEmbed()
        .setColor(color)
        .setTitle('Insufficient Permissions')
        .setDescription('You do not have permission to ' + cmd + ' members');
    let m = await message.reply(msg);
    //auto-delete message
    await m.delete({ timeout: 10000 })
        .catch(err => errorLog(client, message, err));
};

/**
 * @summary informs user the command cannot be used on themselves
 * @param {Client} client discord client
 * @param {Message} message message invoking command
 * @param {string} cmd invoked command
 */
async function selfUseError(client, message, cmd) {
    const msg = new MessageEmbed()
        .setColor(color)
        .setTitle('Invalid user')
        .setDescription('You cannot ' + cmd + ' yourself');
    let m = await message.reply(msg);
    await m.delete({ timeout: 10000 })
        .catch(err => errorLog(client, message, err));
}

/**
 * @summary informs the user that they called the method on a user that is not in the server
 * @param {Client} client discord client
 * @param {Message} message message invoking command
 * @param {string} cmd command that was invoked
 */
async function invalidUser(client, message, cmd) {
    const msg = new MessageEmbed()
        .setColor(color)
        .setTitle('Invalid user')
        .setDescription('Must enter a user that is a member of the server')
        .addField('Example', '/' + cmd + ' @_mombot\n/' + cmd + '@_mombot they are annoying');
    let m = await message.reply(msg);
    await m.delete({ timeout: 15000 })
        .catch(err => errorLog(client, message, err));
};

//exports
module.exports = {
    noPermission,
    selfUseError,
    invalidUser
};