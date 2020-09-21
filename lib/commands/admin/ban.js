const {
  MessageEmbed,
  Permissions
} = require("discord.js");

const botColor = process.env.COLOR;

function getReason(args) {
  let rsn = 'They were bad'; //if a reason was given use that instead

  if (args[0]) {
    rsn = args.join(' ');
  }

  return rsn;
} //ban member


function ban(member, args) {
  member.ban({
    reason: getReason(args)
  }).catch(err => {
    console.log(err);
    return false;
  });
  return true;
}

;
/* Handles command to ban a user */

module.exports.run = async (client, message, args) => {
  //if author has permission to ban members
  if (message.author.flags.has(Permissions.BAN_MEMBERS)) {
    const user = message.mentions.users.first(); //if there is a mentioned user

    if (user) {
      const member = message.guild.member(user); //if the member exists

      if (member) {
        args.shift(); //pop user name off of args
        //if ban was successful

        if (ban(member, args)) {
          const msg = new MessageEmbed().setColor(botColor).setTitle('Member banned').setDescription(`Successfully banned ${user.tag}`).addField('Reason', getReason(args));
          message.reply(msg);
        } else {
          const msg = new MessageEmbed().setColor(botColor).setTitle('Unable to ban member').setDescription(`Could not ban ${user.tag}`);
          let m = await message.reply(msg);
          await m.delete({
            timeout: 5000
          }).catch(err => console.log(err));
        }
      } else {
        //send error message and delete after 5s
        const msg = new MessageEmbed().setColor(botColor).setTitle('User not in server').setDescription('Command should ban user in the server');
        let m = await message.reply(msg);
        await m.delete({
          timeout: 5000
        }).catch(err => console.log(err));
      }
    } else {
      //send error message and delete after 10s
      const msg = new MessageEmbed().setColor(botColor).setTitle('No user mentioned').setDescription('Command should be of the form /ban @<user> [reason]').addFields({
        name: 'Examples',
        value: '/ban @_mombot She\'s annoying\n/ban @_mombot'
      });
      let m = await message.reply(msg);
      await m.delete({
        timeout: 10000
      }).catch(err => console.log(err));
    }
  } else {
    //send error message and delete after  5s
    const msg = new MessageEmbed().setColor(botColor).setTitle('Insufficient permissions').setDescription('You do not have permission to ban members');
    let m = await message.reply(msg);
    await m.delete({
      timeout: 5000
    }).catch(err => console.log(err));
  }
};