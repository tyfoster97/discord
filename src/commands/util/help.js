const discord = require('discord.js');
const { errorLog } = require('../../utils/errorlog');

const color = process.env.COLOR; //bot color in server

module.exports = {
  run: async (client, message, args) => {
    if (args[0]) {
      //if there is a command being checked for help
      if (args[0] == 'd') {
        //if command is d
        await d(client, message);
      } else if (args[0] == 'flipcoin') {
        //if command is flipcoin
        await flipcoin(client, message);
      } else if (args[0] == 'attention') {
        //if command is attention
        await attention(client, message);
      } else if (args[0] == 'hug') {
        //if command is hug
        await hug(client, message);
      } else if (args[0] == 'potionseller') {
        //if command is potionseller
        await potionseller(client, message);
      } else {
        await commands(client, message);
      }
    } else {
      await commands(client, message);
    }
  },
  commands,
  d,
  flipcoin,
  potionseller,
  hug,
  attention
};

/* print all commands in embed message */
async function commands(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('Commands')
    .setDescription('Valid commands for _mombot\nuse /help <command> for more info')
    .addFields(
      { name: 'Example', value: '/help attention' },
      { name: 'd', value: 'roll a many sided die' },
      { name: 'flipcoin', value: 'flip a coin' },
      { name: 'attention', value: 'have _mombot give you attention' },
      { name: 'hug', value: 'give someone a hug from _mombot' }
    );
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};

/* send embed message for d */
async function d(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/d <num_sides>')
    .setDescription('rolls a <num_sides> sided die')
    .addFields(
      { name: 'Note', value: 'The die must be 1 to 100 sided.' },
      { name: 'Example', value: '/d 100' }
    );
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};

/* send embed message for flipcoin */
async function flipcoin(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/flipcoin')
    .setDescription('flips a coin')
    .addField('Example', '/flipcoin');
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};

/* send embed message for attention */
async function attention(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/attention')
    .setDescription('gives the user attention')
    .addField('Example', '/attention');
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};

/* send embed message for hug */
async function hug(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/hug <hugged>')
    .setDescription('gives a hug to the <hugged>')
    .addField('Example', '/hug a cactus');
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};

/* send embed message for potion seller */
async function potionseller(client, message) {
  const msg = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/potionseller')
    .setDescription('Provides youtube links to 3 of the best YouTube videos of all time')
    .addField('Example', '/potionseller');
  let m = await message.channel.send(msg);
  await m.delete({ timeout: 30000 })
    .catch(err => errorLog(client, message, err));
};