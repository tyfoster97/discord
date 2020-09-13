//gives adam a hug
module.exports.run = async(client, message, args) => {
    try {
        let huggedMember = message.guild.members.fetch(args[0]);
        if(huggedMember) {
            message.channel.send("*hugs* " + args[0]);
        }
    }
    catch(err) {
        console.log(err);
    }
}