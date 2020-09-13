//gives adam a hug
module.exports.run = async(client, message, args) => {
    try {
        let huggedMember = await message.guild.member.cache.get(args[0]);
        if(huggedMember) {
            console.channel.send("*hugs* " + huggedMember.tag);
        }
    }
    catch(err) {
        console.log(err);
    }
}