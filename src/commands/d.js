//rolls a d20 for a user
const { rollDice } = require('../utils/roll');

module.exports.run = async(client, message, args) => {
    message.reply("rolled a " + rollDice(args));
}