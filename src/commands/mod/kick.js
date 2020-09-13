module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermissions("KICK_MEMBERS")) {
        message.reply("you do not have permission to do that.");
    }
    else {
        try {
            let bannedMember = await message.guild.members.kick(args[0]);
            if(bannedMember) {
                console.log.apply(args[0] + " was banned");
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}