require('dotenv').config();

const fs = require('fs').promises;

const path = require('path');

const {
  Client
} = require('discord.js'); //discord dependency

/* const { ErelaClient } = require('erela.js'); //erela dependency */


const {
  testing,
  errorLog,
  infoLog,
  inform
} = require('./utils/log');
/**
 * bot.js
 * 
 * Main file for running _mombot application
 */


const client = new Client();
PREFIX = process.env.PREFIX;
client.login(process.env.BOT_TOKEN);
/* client.music = new ErelaClient(client, [
  {
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.PASSWORD
  }
]); */

client.commands = new Map();
/**
 * notify that bot has started running
 */

client.on('ready', () => {
  testing(false);
  infoLog(client, `${client.user.tag} has logged on`);
}); //check if command is in a valid format

/* client.music.on('nodeConnect', node => console.log(node)); */

const isCmd = message => message.content.toLowerCase().startsWith(PREFIX);
/*
const dadMode = message => {
  if (message.content.toLowerCase().startsWith('im')) {
    //if message starts with im
    return 1;
  } else if (message.content.toLowerCase().startsWith("i'm") || message.content.toLowerCase().startsWith("i’m")) {
    //if message starts with i'm
    return 2;
  } else if (message.content.toLowerCase().startsWith('i am')) {
    //if message starts with i am
    return 3;
  } else {
    return 0;
  }
};
*/

/**
 * Listener for message event, handles ignoring or interpreting message
 */


client.on('message', function (message) {
  //if bot sent message do nothing
  if (message.author.bot) return; //if message is a command

  if (isCmd(message)) {
    //get arguments
    cmdArgs = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/[\s+\,+\-+]/)); //get command name

    let cmdName = cmdArgs.shift(); //if the command is a valid command

    if (client.commands.get(cmdName)) {
      //run command
      client.commands.get(cmdName).run(client, message, cmdArgs);
    } else {//do nothing

      /* client.commands.get('help').run(client, message, cmdArgs); */
    }
  }
  /*else if (dadMode(message) != 0) {
  //if message can be made a dadjoke
  client.commands.get('dadjoke').run(client, message, dadMode(message));
  console.log("dad joke made");
  }*/
  else {//do nothing
    } //handle discord errors


  client.on('error', function (error) {
    errorLog(client, message, error);
    inform(message);
  }); //handle nodejs exceptions

  process.on('uncaughtException', function (error) {
    errorLog(client, message, error);
    inform(message);
  }); //handle promise rejection

  process.on('unhandledRejection', function (reason, promise) {
    errorLog(client, message, reason);
    inform(message);
  });
});
/**
 * Registers bot commands into a map
 * @param dir the path to the directory with commands for the bot
 */

(async function registerCommands(dir = 'commands') {
  //read directory
  let files = await fs.readdir(path.join(__dirname, dir));
  console.log(files); //loop through files

  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file)); //if stat is a directory

    if (stat.isDirectory()) {
      //recursive method call
      registerCommands(path.join(dir, file));
    } else {
      //if the file is a js file
      if (file.endsWith(".js")) {
        //get command name
        let cmdName = file.substring(0, file.indexOf(".js")); //get command module

        let cmdModule = require(path.join(__dirname, dir, file)); //map command names to modules


        client.commands.set(cmdName, cmdModule); //log that command was loaded
      }
    }
  }
})();