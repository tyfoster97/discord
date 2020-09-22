module.exports.run = async (client, message, arg) => {
  var phrase = '';

  if (arg == 1 || arg == 2) {
    //if message starts with im or i'm
    phrase = message.content.substring(message.content.indexOf(' ') + 1);
  } else if (arg == 3) {
    //if message starts with i am
    phrase = message.content.substring(message.content.indexOf(' ', 2) + 1);
  }

  message.channel.send('Hi ' + phrase + ', I\'m _mombot!');
};