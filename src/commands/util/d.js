//rolls a d20 for a user
const { rollDice } = require('../../utils/roll');

module.exports.run = async(client, message, args) => {
    if (args <= 100) {
        message.reply("rolled a " + rollDice(args));
    }
    else {
        message.channel.send("Number of sides must be less that 100");
    }
}