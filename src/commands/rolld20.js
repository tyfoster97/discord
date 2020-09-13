//rolls a d20 for a user
module.exports.run = async(client, message, args) => {
    let roll = Math.floor(Math.random() * 20) + 1;
    message.reply("rolled a " + roll);
}