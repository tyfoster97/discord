const { attention } = require('../util/help');

//gives user attention
module.exports.run = async (client, message, args) => {
  //if user gave arguments
  if (args[0]) {
    await attention(message); //inform proper usage
  } else {
    message.reply("here is some attention :heart:");
  }
};