require('dotenv').config();

const fs = require('fs').promises;

const path = require('path');

const discord = require('discord.js'); //discord dependency


const client = new discord.Client(); //discord client

PREFIX = process.env.PREFIX;
client.login(process.env.TEST_TOKEN); //use bot token from env file

client.commands = new Map();
client.on('ready', () => {
  console.log(`${client.user.tag} has logged on`);
}); //check if command is in a valid format

const isCmd = message => message.content.toLowerCase().startsWith(PREFIX);

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

client.on('message', function (message) {
  if (message.author.bot) return; //don't reply if bot sent the message

  if (isCmd(message)) {
    //if message is a command
    //handle command
    cmdArgs = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/[\s+\,+\-+]/));
    let cmdName = cmdArgs.shift();

    if (client.commands.get(cmdName)) {
      //if command exists
      client.commands.get(cmdName).run(client, message, cmdArgs);
    } else {
      console.log("command does not exist");
    }
  } /*else if (dadMode(message) != 0) {
    //if message can be made a dadjoke
    client.commands.get('dadjoke').run(client, message, dadMode(message));
    console.log("dad joke made");
  }*/ else {
    console.log("Not a valid command");
  }
});

(async function registerCommands(dir = 'commands') {
  //read directory
  let files = await fs.readdir(path.join(__dirname, dir));
  console.log(files); //loop through files

  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));

    if (stat.isDirectory()) {
      //if directory
      registerCommands(path.join(dir, file)); //call again
    } else {
      if (file.endsWith(".js")) {
        //if .js file
        let cmdName = file.substring(0, file.indexOf(".js")); //get cmdName

        let cmdModule = require(path.join(__dirname, dir, file)); //import command module

        client.commands.set(cmdName, cmdModule); //get cmdName
      }
    }
  }
})();