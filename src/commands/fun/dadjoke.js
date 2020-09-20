module.exports.run = async (client, message, args) => {
    message.channel.send('Hi, ' + args.join(' ') + ' I\'m _mombot!');
};