//gives adam a hug
module.exports.run = async(client, message, args) => {
    try {
        let huggedMember = await message.guild.member.cache.get(args);
        if(huggedMember) {
            message.channel.send("*hugs* " + huggedMember.tag);
        }
    }
    catch(err) {
        console.log(err);
    }
}