const { potionseller } = require('../util/help');

module.exports.run = async (client, message, args) => {
  //if arguments were given
  if (args[0]) {
    await potionseller(client, message); //inform user of proper usage
  }
  message.channel.send("https://youtu.be/R_FQU4KzN7A");
  message.channel.send("https://www.youtube.com/watch?v=JCy_TUQJen4");
  message.channel.send("https://www.youtube.com/watch?v=DCzU9GAqcXo&ab_channel=JustinKuritzkes");
};