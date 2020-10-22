/**
 * @author Ty Foster
 * @version 2020.10.21
 * Command to give the user attention
 */
const { attention } = require('../util/help');

//gives user attention
module.exports.run = async (client, message, args) => {
  //if user gave arguments
  if (args[0]) {
    await attention(client, message); //inform proper usage
  } else {
    message.reply("here is some attention :heart:");
  }
};