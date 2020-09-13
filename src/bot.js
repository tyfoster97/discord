require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const discord = require('discord.js'); //discord dependency
const client = new discord.Client(); //discord client
PREFIX = process.env.PREFIX;
HELP_PREFIX = process.env.HELP_PREFIX;
client.login(process.env.BOT_TOKEN); //use bot token from env file
client.commands = new Map();
client.on('ready', () => {
    console.log(`${client.user.tag} has logged on`);
});

//check if command is in a valid format
const isCmd = (message) => message.content.startsWith(PREFIX);
const isHelp = (message) => message.content.startsWith(HELP_PREFIX);
client.on('message', function(message) {
    if(message.author.bot) return; //don't reply if bot sent the message
    if(isCmd(message)) {
        //handle command
        cmdArgs = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/[\s+\,+\-+]/));
        let cmdName = cmdArgs.shift();
        if(client.commands.get(cmdName)) {
            client.commands.get(cmdName).run(client, message, cmdArgs);
        }
        else {
            console.log("command does not exist");
        }
    }   
    else {
        console.log("Not a valid command");
    }
});

(async function registerCommands(dir = 'commands') {
    //read directory
    let files = await fs.readdir(path.join(__dirname, dir));
    console.log(files);
    //loop through files
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            }
        }
    }
})()