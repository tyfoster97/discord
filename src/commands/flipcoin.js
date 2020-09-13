//flips a coin and replies to user with the result
module.exports.run = async(client, message, args) => {
    let coin = Math.floor(Math.random() * 2);
    if(coin === 0) {
        message.reply("top"); //heads
    }
    else {
        message.reply("bottom"); //tails
    }
}