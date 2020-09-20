const discord = require('discord.js');

const color = '#3499DC'; //bot color in server

module.exports.run = (client, message, args) => {
  if (args[0]) {
    if (args[0] == 'd') {
      d(message);
    } else if (args[0] == 'flipcoin') {
      flipcoin(message);
    } else if (args[0] == 'attention') {
      attention(message);
    } else if (args[0] == 'hug') {
      hug(message);
    } else if (args[0] == 'potionseller') {
      potionseller(message);
    } else {
      commands(message);
    }
  } else {
    commands(message);
  }
};

function commands(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('Commands')
    .setDescription('Valid commands for _mombot\nuse /help <command> for more info')
    .addFields(
      { name: 'd', value: 'roll a many sided die' },
      { name: 'flipcoin', value: 'flip a coin' },
      { name: 'attention', value: 'have _mombot give you attention' },
      { name: 'hug', value: 'give someone a hug from _mombot' }
    );
  message.channel.send(m);
};

function d(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/d <num_sides>')
    .setDescription('rolls a <num_sides> sided die')
    .addFields(
      { name: 'Note', value: 'The die must be 1 to 100 sided.' }
    );
  message.channel.send(m);
};

function flipcoin(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/flipcoin')
    .setDescription('flips a coin');
  message.channel.send(m);
};

function attention(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/attention')
    .setDescription('gives the user attention');
  message.channel.send(m);
};

function hug(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/hug <hugged>')
    .setDescription('gives a hug to the <hugged>');
  message.channel.send(m);
};

function potionseller(message) {
  const m = new discord.MessageEmbed()
    .setColor(color)
    .setTitle('/potionseller')
    .setDescription('Provides youtube links to 3 of the best YouTube videos of all time');
  message.channel.send(m);
}; 