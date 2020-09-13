require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const discord = require('discord.js'); //discord dependency
const client = new discord.Client(); //discord client
PREFIX = process.env.PREFIX;
ADMIN_PREFIX = process.env.ADMIN_PREFIX;
client.login(process.env.BOT_TOKEN); //use bot token from env file
client.commands = new Map();
client.on('ready', () => {
    console.log(`${client.user.tag} has logged on`);
});

//check if command is in a valid format
const isCmd = (message) => message.content.startsWith(PREFIX);
//flip a coin
const flipCoin = () => Math.floor(Math.random() * 2);
//roll a d20
const rollD20 = () => Math.floor(Math.random() * 20) + 1;

client.on('message', function(message) {
    if(message.author.bot) return; //don't reply if bot sent the message
    if(isCmd(message)) {
        cmdArgs = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/[\s+\,+\-+]/));
        console.log(cmdArgs);
        let cmdName = cmdArgs.shift();
        if(client.commands.get(cmdName)) {
            client.commands.get(cmdName).run(client, message, cmdArgs);
        }
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

//checks if user is 18+ and allows access to nsfw channels
function check18Plus(message) {
    let args = message.content.substring();
    let { cache } = message.guild.roles;
    let role = cache.find(role => "18+");

    //if 18+ {
        message.member.roles.add(role).catch(err => {
            console.log(err);
        });
    //}
    //else {
        //do nothing
    //}

}