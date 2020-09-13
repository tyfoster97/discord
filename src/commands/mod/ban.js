module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermissions("BAN_MEMBERS")) {
        message.reply("you do not have permission to do that.");
    }
    else {
        try {
            let bannedMember = await message.guild.members.ban(args[0]);
            if(bannedMember) {
                console.log.apply(args[0] + " was banned");
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}