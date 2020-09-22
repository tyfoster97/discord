//gives adam a hug
module.exports.run = async (client, message, args) => {
  message.channel.send('*hugs ' + args.join(' ') + '*');
};