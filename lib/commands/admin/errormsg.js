/* Provides error message handling for functions */
const {
  MessageEmbed
} = require("discord.js");

const {
  errorLog
} = require('../../utils/log');

const color = process.env.COLOR; //handle insufficient permissions

async function noPermission(client, message, cmd) {
  const msg = new MessageEmbed().setColor(color).setTitle('Insufficient Permissions').setDescription('You do not have permission to ' + cmd + ' members');
  let m = await message.reply(msg);
  await m.delete({
    timeout: 10000
  }).catch(err => errorLog(client, message, err));
}

; //error message when user tries to ban or kick themselves

async function selfUseError(client, message, cmd) {
  const msg = new MessageEmbed().setColor(color).setTitle('Invalid user').setDescription('You cannot ' + cmd + ' yourself');
  let m = await message.reply(msg);
  await m.delete({
    timeout: 10000
  }).catch(err => errorLog(client, message, err));
} //user error message


async function invalidUser(client, message, cmd) {
  const msg = new MessageEmbed().setColor(color).setTitle('Invalid user').setDescription('Must enter a user that is a member of the server').addField('Example', '/' + cmd + ' @_mombot\n/' + cmd + '@_mombot they are annoying');
  let m = await message.reply(msg);
  await m.delete({
    timeout: 15000
  }).catch(err => errorLog(client, message, err));
}

;
module.exports = {
  noPermission,
  selfUseError,
  invalidUser
};