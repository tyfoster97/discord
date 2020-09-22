/**
 * @author Ty Foster
 * 
 * @summary Handles logging of errors from discord bot
 * @version 2020.09.22
 */

const { MessageEmbed } = require("discord.js");

const warn = '#cc0000';
const color = process.env.COLOR; //bot color
var id = '';

/**
 * 
 * @param {boolean} bool 
 */
function testing(bool) {
    if (bool) {
        id = process.env.TEST_LOG;
    } else {
        id = process.env.LOG;
    }
};

/**
 * @summary logs user message to developer error channel
 * @param {Client} client the client currently running
 * @param {Message} message the message the user sent that caused the error
 * @param {Error} error the error thrown
 */
function errorLog(client, message, error) {
    const msg = new MessageEmbed()
        .setColor(warn)
        .setTitle('Error Log')
        .addFields(
            { name: 'User', value: `${message.author.tag}` },
            { name: 'Input', value: message.content },
            { name: 'Error', value: error.toString() }
        );
    client.channels.cache.get(id).send(msg);
    client.channels.cache.get(id).send(error.stack.toString());
};

/**
 * @summary logs information to the channel for logs
 * @param {Client} client the client being used by the bot
 * @param {string} info the information to display to the channel
 */
function infoLog(client, info) {
    const msg = new MessageEmbed()
        .setColor(color)
        .setTitle('INFO')
        .setDescription(info);
    client.channels.cache.get(id).send(msg);
};

/**
 * @summary informs user that error occured and developers may contact for more details
 * @param {Channel} channel the channel the message was sent that caused the error
 */
async function inform(message) {
    //build message embed
    const msg = new MessageEmbed()
        .setColor(color)
        .setTitle('Unexpected Error')
        .setDescription('Something happened on our end\n' + 
            'We have logged the error and may contact you if we need more details.\n\n' +
            'This message will delete after 60 seconds');
    //send
    let m = await message.channel.send(msg);
    await m.delete({timeout: 60000})
        .catch(err => console.log(err));
};

module.exports = {
    infoLog,
    inform,
    errorLog,
    testing
};