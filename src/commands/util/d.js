//rolls a d20 for a user
const { rollDice } = require('../../utils/roll');

const { d } = require('./help');

module.exports.run = async (client, message, args) => {
  //if args is a valid number of sides
  if (args > 0 && args <= 100) {
    message.reply("rolled a " + rollDice(args));
  } else {
    await d(client, message); //inform user of proper usage
  }
};