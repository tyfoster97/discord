const { flipcoin } = require("./help");

const { flipcoin } = require('./help');

//flips a coin and replies to user with the result
module.exports.run = async (client, message, args) => {
  //if arguments were given
  if (args[0]) {
    await flipcoin(message); //inform proper usage
  } else {
    let coin = Math.floor(Math.random() * 10000);

    if (coin > 5005) {
      message.reply("top"); //heads
    } else if (coin < 4995) {
      message.reply("bottom"); //tails
    } else {
      message.reply("vers"); //side
    }
  }
};